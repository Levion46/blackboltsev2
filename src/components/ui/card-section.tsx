import { useEffect, useRef, useCallback, useState } from 'react'; // useState still needed for clips & asciiTexts
import { useParticleSystem } from '../useParticleSystem';
import { useParticleScanner } from '../useParticleScanner';
import { generateCode, calculateCodeDimensions, CARD_IMAGES } from '../cardUtils';

/* ─── ASCII code strings (generated once per card) ─────────── */
const CARD_COUNT = 30;
const ASCII_CACHE: string[] = Array.from({ length: 5 }, (_, i) => {
    const { width, height } = calculateCodeDimensions(400, 250);
    return generateCode(width, height);
});

/* ─── Card wrapper ──────────────────────────────────────────── */
interface CardItem {
    index: number;
    ascii: string;
    image: string;
    clipRight: number; // % clipped from right on normal card
    clipLeft: number;  // % revealed from left on ascii card
}

/* ─── Main Component ────────────────────────────────────────── */
export default function CardSection() {
    /* canvas refs */
    const particleCanvasRef = useRef<HTMLCanvasElement>(null);
    const scannerCanvasRef = useRef<HTMLCanvasElement>(null);

    /* particle hooks */
    const scanningActiveRef = useRef(false);
    useParticleSystem(particleCanvasRef);
    useParticleScanner(scannerCanvasRef, scanningActiveRef);

    /* scroll state */
    const positionRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);
    const velocityRef = useRef(120);
    const directionRef = useRef(-1);
    const isAnimatingRef = useRef(true);
    const isDraggingRef = useRef(false);
    const lastMouseXRef = useRef(0);
    const mouseVelocityRef = useRef(0);
    const lastTimeRef = useRef(0);
    const cardLineRef = useRef<HTMLDivElement>(null);
    const animIdRef = useRef(0);
    const containerWidthRef = useRef(0);
    const cardLineWidthRef = useRef(0);

    /* clip percentages per card – state so React re-renders */
    const [clips, setClips] = useState<{ right: number; left: number }[]>(
        () => Array.from({ length: CARD_COUNT }, () => ({ right: 0, left: 0 }))
    );


    /* ascii content – refreshed periodically */
    const [asciiTexts, setAsciiTexts] = useState<string[]>(
        () => Array.from({ length: CARD_COUNT }, (_, i) => ASCII_CACHE[i % 5])
    );

    /* ── clipping calc ──────────────────────────────────────── */
    const updateClipping = useCallback(() => {
        const scannerX = window.innerWidth / 2;
        const scannerWidth = 8;
        const scannerLeft = scannerX - scannerWidth / 2;
        const scannerRight = scannerX + scannerWidth / 2;
        let anyScan = false;

        const wrappers = cardLineRef.current?.querySelectorAll<HTMLElement>('.ev-card-wrapper');
        if (!wrappers) return;

        const nextClips: { right: number; left: number }[] = [];

        wrappers.forEach((wrapper) => {
            const rect = wrapper.getBoundingClientRect();
            const cw = rect.width;
            let right = 0;
            let left = 0;

            if (rect.left < scannerRight && rect.right > scannerLeft) {
                anyScan = true;
                const intLeft = Math.max(scannerLeft - rect.left, 0);
                const intRight = Math.min(scannerRight - rect.left, cw);
                right = (intLeft / cw) * 100;
                left = (intRight / cw) * 100;
            } else if (rect.right < scannerLeft) {
                right = 100;
                left = 100;
            } else {
                right = 0;
                left = 0;
            }
            nextClips.push({ right, left });
        });

        scanningActiveRef.current = anyScan;
        setClips(nextClips);
    }, []);

    /* ── position update ────────────────────────────────────── */
    const updatePosition = useCallback(() => {
        const el = cardLineRef.current;
        if (!el) return;
        const cw = containerWidthRef.current;
        const lw = cardLineWidthRef.current;
        let p = positionRef.current;
        if (p < -lw) p = cw;
        else if (p > cw) p = -lw;
        positionRef.current = p;
        el.style.transform = `translateX(${p}px)`;
        updateClipping();
    }, [updateClipping]);

    /* ── animation loop ─────────────────────────────────────── */
    const animate = useCallback((ts: number) => {
        const dt = Math.min((ts - lastTimeRef.current) / 1000, 0.05);
        lastTimeRef.current = ts;

        if (isAnimatingRef.current && !isDraggingRef.current) {
            const minV = 30;
            if (velocityRef.current > minV) velocityRef.current *= 0.999;
            else velocityRef.current = minV;

            positionRef.current += velocityRef.current * directionRef.current * dt;
            updatePosition();
        }
        animIdRef.current = requestAnimationFrame(animate);
    }, [updatePosition]);

    /* ── drag handlers ──────────────────────────────────────── */
    const startDrag = useCallback((clientX: number) => {
        isDraggingRef.current = true;
        isAnimatingRef.current = false;
        lastMouseXRef.current = clientX;
        mouseVelocityRef.current = 0;

        const el = cardLineRef.current;
        if (el) {
            const m = new DOMMatrix(window.getComputedStyle(el).transform);
            positionRef.current = m.m41;
            el.style.cursor = 'grabbing';
        }
    }, []);

    const onDrag = useCallback((clientX: number) => {
        if (!isDraggingRef.current) return;
        const dx = clientX - lastMouseXRef.current;
        positionRef.current += dx;
        mouseVelocityRef.current = dx * 60;
        lastMouseXRef.current = clientX;
        updatePosition();
    }, [updatePosition]);

    const endDrag = useCallback(() => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        const el = cardLineRef.current;
        if (el) el.style.cursor = 'grab';

        const mv = mouseVelocityRef.current;
        if (Math.abs(mv) > 30) {
            velocityRef.current = Math.abs(mv);
            directionRef.current = mv > 0 ? 1 : -1;
        } else {
            velocityRef.current = 120;
        }
        isAnimatingRef.current = true;
    }, []);

    /* ── wheel ──────────────────────────────────────────────── */
    const onWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        positionRef.current += e.deltaY > 0 ? 20 : -20;
        updatePosition();
    }, [updatePosition]);


    /* ── init ───────────────────────────────────────────────── */
    useEffect(() => {
        const el = cardLineRef.current;
        if (!el) return;

        containerWidthRef.current = window.innerWidth;
        const cardW = 400, gap = 60;
        cardLineWidthRef.current = (cardW + gap) * CARD_COUNT;
        positionRef.current = window.innerWidth;

        /* mouse */
        const onMouseDown = (e: MouseEvent) => startDrag(e.clientX);
        const onMouseMove = (e: MouseEvent) => onDrag(e.clientX);
        const onMouseUp = () => endDrag();

        /* touch */
        const onTouchStart = (e: TouchEvent) => { e.preventDefault(); startDrag(e.touches[0].clientX); };
        const onTouchMove = (e: TouchEvent) => { e.preventDefault(); onDrag(e.touches[0].clientX); };
        const onTouchEnd = () => endDrag();

        el.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        el.addEventListener('touchstart', onTouchStart, { passive: false });
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);
        el.addEventListener('wheel', onWheel, { passive: false });
        el.addEventListener('selectstart', (e) => e.preventDefault());

        const onResize = () => {
            containerWidthRef.current = window.innerWidth;
        };
        window.addEventListener('resize', onResize);

        animIdRef.current = requestAnimationFrame(animate);

        /* ascii periodic refresh */
        const asciiInterval = setInterval(() => {
            setAsciiTexts(prev => prev.map((t, i) =>
                Math.random() < 0.15
                    ? (() => { const { width, height } = calculateCodeDimensions(400, 250); return generateCode(width, height); })()
                    : t
            ));
        }, 200);

        return () => {
            el.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            el.removeEventListener('touchstart', onTouchStart);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
            el.removeEventListener('wheel', onWheel);
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animIdRef.current);
            clearInterval(asciiInterval);
        };
    }, [animate, startDrag, onDrag, endDrag, onWheel]);

    /* ── render ─────────────────────────────────────────────── */
    return (
        <section style={{
            position: 'relative',
            width: '100%',
            height: 420,
            overflow: 'hidden',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>

            {/* Three.js ambient particles */}
            <canvas ref={particleCanvasRef} style={{
                position: 'absolute', top: '50%', left: 0,
                transform: 'translateY(-50%)',
                width: '100vw', height: 250,
                zIndex: 0, pointerEvents: 'none',
            }} />

            {/* Canvas2D scanner bar + scanner particles */}
            <canvas ref={scannerCanvasRef} style={{
                position: 'absolute', top: '50%', left: 0,
                transform: 'translateY(-50%)',
                width: '100vw', height: 300,
                zIndex: 15, pointerEvents: 'none',
            }} />

            {/* Card stream */}
            <div style={{
                position: 'absolute',
                width: '100vw', height: 250,
                display: 'flex', alignItems: 'center',
                overflow: 'visible', zIndex: 5,
            }}>
                <div
                    ref={cardLineRef}
                    className="ev-card-stream"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 60,
                        whiteSpace: 'nowrap',
                        cursor: 'grab',
                        userSelect: 'none',
                        willChange: 'transform',
                    }}
                >
                    {Array.from({ length: CARD_COUNT }, (_, i) => {
                        const clip = clips[i] ?? { right: 0, left: 0 };
                        const imageUrl = CARD_IMAGES[i % CARD_IMAGES.length];
                        const ascii = asciiTexts[i] ?? '';

                        return (
                            <div key={i} className="ev-card-wrapper" style={{ position: 'relative', width: 400, height: 250, flexShrink: 0 }}>
                                {/* Normal card (image) — clipped from right as scanner passes */}
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    borderRadius: 15, overflow: 'hidden',
                                    clipPath: `inset(0 0 0 ${clip.right}%)`,
                                    zIndex: 2,
                                    boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
                                }}>
                                    <img
                                        src={imageUrl}
                                        alt="card"
                                        draggable={false}
                                        style={{
                                            width: '100%', height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: 15,
                                            filter: 'brightness(1.1) contrast(1.1)',
                                            display: 'block',
                                        }}
                                        onError={e => {
                                            const img = e.target as HTMLImageElement;
                                            img.style.display = 'none';
                                        }}
                                    />
                                </div>

                                {/* ASCII card — revealed from left as scanner passes */}
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    borderRadius: 15, overflow: 'hidden',
                                    clipPath: `inset(0 ${100 - clip.left}% 0 0)`,
                                    zIndex: 1,
                                    background: 'transparent',
                                }}>
                                    <pre style={{
                                        position: 'absolute', inset: 0,
                                        margin: 0, padding: 0,
                                        fontFamily: '"Courier New", monospace',
                                        fontSize: 11,
                                        lineHeight: '13px',
                                        color: 'rgba(220,210,255,0.6)',
                                        overflow: 'hidden',
                                        whiteSpace: 'pre',
                                        textAlign: 'left',
                                        maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.2) 100%)',
                                        WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.2) 100%)',
                                    }}>
                                        {ascii}
                                    </pre>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


        </section>
    );
}
