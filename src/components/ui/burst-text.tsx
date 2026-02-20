/**
 * BurstText – letter-by-letter bounce-in with SVG triangle + circle burst fx.
 * Inspired by the CodePen "start typing" demo.
 *
 * Props:
 *   text         – string to render
 *   color        – letter colour (keep existing brand colours)
 *   className    – extra classes on the wrapper span
 *   delay        – ms delay before the burst starts (stagger between words)
 *   onComplete   – called after last letter animates in
 */

import { useEffect, useRef } from 'react';

interface BurstTextProps {
    text: string;
    color: string;
    className?: string;
    delay?: number;
    onComplete?: () => void;
}

/* ── helpers ─────────────────────────────────── */
const SVG_NS = 'http://www.w3.org/2000/svg';

const shadeColor = (hex: string, pct: number): string => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.round((num >> 16) * (1 + pct)));
    const g = Math.min(255, Math.round(((num >> 8) & 0xff) * (1 + pct)));
    const b = Math.min(255, Math.round((num & 0xff) * (1 + pct)));
    return `rgb(${r},${g},${b})`;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn = (t: number) => t * t * t;

const tween = (
    from: number,
    to: number,
    dur: number,
    delay: number,
    ease: (t: number) => number,
    onUpdate: (v: number) => void,
    onDone?: () => void
) => {
    const start = performance.now() + delay;
    const tick = (now: number) => {
        if (now < start) { requestAnimationFrame(tick); return; }
        const t = Math.min((now - start) / dur, 1);
        onUpdate(from + (to - from) * ease(t));
        if (t < 1) requestAnimationFrame(tick);
        else onDone?.();
    };
    requestAnimationFrame(tick);
};

const spawnTri = (
    svg: SVGSVGElement,
    x0: number, y0: number,
    size: number,
    color: string
) => {
    const a = Math.random();
    const a2 = a + (-0.2 + Math.random() * 0.4);
    const r = size * 0.52;
    const r2 = r + size * (0.2 + Math.random() * 0.3);
    const x = x0 + r * Math.cos(2 * Math.PI * a);
    const y = y0 + r * Math.sin(2 * Math.PI * a);
    const x2 = x0 + r2 * Math.cos(2 * Math.PI * a2);
    const y2 = y0 + r2 * Math.sin(2 * Math.PI * a2);
    const ts = size * 0.1;
    const sc = 0.3 + Math.random() * 0.7;
    const offset = ts * sc;
    const shade = shadeColor(color, -0.2 + Math.random() * 0.4);

    const poly = document.createElementNS(SVG_NS, 'polygon');
    poly.setAttribute('points', `0,0 ${ts * 2},0 ${ts},${ts * 2}`);
    poly.style.fill = shade;
    poly.style.transformOrigin = `${offset}px ${offset}px`;
    const rot = Math.random() * 360;
    poly.style.transform = `translate(${x - offset}px, ${y - offset}px) rotate(${rot}deg) scale(${sc})`;
    poly.style.opacity = '1';
    svg.appendChild(poly);

    tween(0, 1, 600, 0, easeIn, (t) => {
        const px = x - offset + (x2 - x) * t;
        const py = y - offset + (y2 - y) * t;
        poly.style.transform = `translate(${px}px, ${py}px) rotate(${rot}deg) scale(${sc})`;
        poly.style.opacity = `${1 - t}`;
    }, () => svg.contains(poly) && svg.removeChild(poly));
};

const spawnCirc = (
    svg: SVGSVGElement,
    x0: number, y0: number,
    size: number
) => {
    const a = Math.random();
    const r = size * 0.52;
    const r2 = r + size;
    const x = x0 + r * Math.cos(2 * Math.PI * a);
    const y = y0 + r * Math.sin(2 * Math.PI * a);
    const x2 = x0 + r2 * Math.cos(2 * Math.PI * a);
    const y2 = y0 + r2 * Math.sin(2 * Math.PI * a);
    const cs = size * 0.05 * Math.random();

    const circ = document.createElementNS(SVG_NS, 'circle');
    circ.setAttribute('r', String(cs));
    circ.style.fill = '#eee';
    circ.style.transform = `translate(${x - cs}px, ${y - cs}px)`;
    circ.style.opacity = '1';
    svg.appendChild(circ);

    tween(0, 1, 600, 0, easeIn, (t) => {
        const px = x - cs + (x2 - x) * t;
        const py = y - cs + (y2 - y) * t;
        circ.style.transform = `translate(${px}px, ${py}px)`;
        circ.style.opacity = `${1 - t}`;
    }, () => svg.contains(circ) && svg.removeChild(circ));
};

const animateLetterIn = (
    el: HTMLElement,
    svgEl: SVGSVGElement,
    color: string,
    delay: number
) => {
    el.style.display = 'inline-block';
    el.style.opacity = '0';
    el.style.transform = 'scale(0) rotate(0deg)';

    const size = el.offsetHeight || 60;

    // Scale + opacity in with bounce
    tween(0, 1, 400, delay, (t) => {
        const b = 1 + 0.3 * Math.sin(Math.PI * t);
        return t < 0.7 ? easeOut(t / 0.7) * b : easeOut(t);
    }, (v) => {
        el.style.opacity = `${Math.min(v, 1)}`;
        el.style.transform = `scale(${Math.min(v, 1)}) rotate(0deg)`;
    });

    // Bounce Y
    const yOff = (0.5 + Math.random() * 0.5) * size;
    tween(0, -yOff, 200, delay, easeOut, (v) => {
        el.style.transform = `scale(1) translateY(${v}px)`;
    }, () => {
        tween(-yOff, 0, 200, 0, easeOut, (v) => {
            el.style.transform = `scale(1) translateY(${v}px)`;
        });
    });

    // Rotation wobble
    const rot = -50 + Math.random() * 100;
    tween(0, rot, 200, delay, easeOut, (v) => {
        el.style.transform = `scale(1) rotate(${v}deg)`;
    }, () => {
        tween(rot, 0, 200, 0, easeOut, (v) => {
            el.style.transform = `scale(1) rotate(${v}deg)`;
        });
    });

    // Burst particles 150ms after letter starts appearing
    setTimeout(() => {
        const rect = el.getBoundingClientRect();
        const svgRect = svgEl.getBoundingClientRect();
        const x0 = rect.left - svgRect.left + rect.width / 2;
        const y0 = rect.top - svgRect.top + rect.height / 2;
        for (let i = 0; i < 8; i++) spawnTri(svgEl, x0, y0, size, color);
        for (let i = 0; i < 8; i++) spawnCirc(svgEl, x0, y0, size);
    }, delay + 150);
};

/* ── Main component ──────────────────────────── */
export default function BurstText({
    text,
    color,
    className = '',
    delay = 0,
    onComplete,
}: BurstTextProps) {
    const wrapperRef = useRef<HTMLSpanElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const animated = useRef(false);

    useEffect(() => {
        if (animated.current) return;
        animated.current = true;

        const wrapper = wrapperRef.current;
        const svg = svgRef.current;
        if (!wrapper || !svg) return;

        const spans = Array.from(wrapper.querySelectorAll<HTMLElement>('.bl-letter'));
        spans.forEach((span, i) => {
            const letterDelay = delay + i * 60;
            animateLetterIn(span, svg, color, letterDelay);
            if (i === spans.length - 1) {
                setTimeout(() => onComplete?.(), letterDelay + 500);
            }
        });
    }, [color, delay, onComplete]);

    return (
        <span ref={wrapperRef} className={`relative inline-block ${className}`} style={{ color }}>
            {/* Fixed SVG for burst particles — covers full viewport so they fly visibly */}
            <svg
                ref={svgRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    width: '100vw',
                    height: '100vh',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    overflow: 'visible',
                }}
            />
            {text.split('').map((ch, i) => (
                <span
                    key={i}
                    className="bl-letter"
                    style={{
                        display: 'inline-block',
                        color,
                        whiteSpace: ch === ' ' ? 'pre' : undefined,
                    }}
                >
                    {ch}
                </span>
            ))}
        </span>
    );
}
