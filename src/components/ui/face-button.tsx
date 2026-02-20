/**
 * FaceButton – magnetic smiley face button.
 * Mouse tracking replaces TweenMax with rAF lerp + CSS transitions.
 */
import { useRef } from 'react';

interface FaceButtonProps {
    onClick?: () => void;
    className?: string;
}

export function FaceButton({ onClick, className = '' }: FaceButtonProps) {
    const btnRef = useRef<HTMLButtonElement>(null);
    const faceRef = useRef<HTMLSpanElement>(null);
    const rafRef = useRef<number>(0);

    const btnPos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
    const facePos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
    const looping = useRef(false);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
        const bp = btnPos.current;
        const fp = facePos.current;
        bp.x = lerp(bp.x, bp.tx, 0.15);
        bp.y = lerp(bp.y, bp.ty, 0.15);
        fp.x = lerp(fp.x, fp.tx, 0.15);
        fp.y = lerp(fp.y, fp.ty, 0.15);

        const isResting = bp.tx === 0 && bp.ty === 0;
        if (btnRef.current)
            btnRef.current.style.transform = `translate(${bp.x}px, ${bp.y}px) scale(${isResting ? 1 : 0.975})`;
        if (faceRef.current)
            faceRef.current.style.transform = `translate(${fp.x}px, ${fp.y}px)`;

        const stillMoving =
            Math.abs(bp.x - bp.tx) > 0.05 || Math.abs(bp.y - bp.ty) > 0.05 ||
            Math.abs(fp.x - fp.tx) > 0.05 || Math.abs(fp.y - fp.ty) > 0.05;

        if (stillMoving) rafRef.current = requestAnimationFrame(loop);
        else looping.current = false;
    };

    const startLoop = () => {
        if (!looping.current) {
            looping.current = true;
            rafRef.current = requestAnimationFrame(loop);
        }
    };

    const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = btnRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        btnPos.current.tx = (dx / rect.width) * 50;
        btnPos.current.ty = (dy / rect.height) * 50;
        facePos.current.tx = (dx / rect.width) * 25;
        facePos.current.ty = (dy / rect.height) * 25;
        startLoop();
    };

    const onMouseLeave = () => {
        btnPos.current.tx = 0;
        btnPos.current.ty = 0;
        facePos.current.tx = 0;
        facePos.current.ty = 0;
        startLoop();
    };

    return (
        <>
            <style>{`
                .fb-btn {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 6.25rem;
                    height: 6.25rem;
                    border-radius: 50%;
                    background: #fdda5f;
                    box-shadow: inset 2px -4px 18px #fd9744;
                    border: 0;
                    outline: none;
                    cursor: pointer;
                    will-change: transform;
                }
                .fb-face {
                    position: relative;
                    display: block;
                    width: 40px;
                    height: 20px;
                    will-change: transform;
                }
                .fb-eye {
                    position: absolute;
                    height: 0.5rem;
                    width: 0.5rem;
                    background: #2a2927;
                    border-radius: 50%;
                    box-shadow: inset 1px 2px 4px #121110;
                    animation: fbBlink 3200ms linear infinite;
                    transition: height 0.2s, width 0.2s, box-shadow 0.2s;
                }
                .fb-eye.left  { left: 0; }
                .fb-eye.right { left: 2rem; }
                .fb-mouth {
                    position: absolute;
                    top: 1.125rem;
                    left: 0.8rem;
                    width: 1rem;
                    height: 0.125rem;
                    background: #2a2927;
                    border-radius: 0;
                    box-shadow: inset 1px 2px 4px #121110;
                    transition: all 0.2s ease;
                }
                .fb-btn:hover .fb-eye,
                .fb-btn:active .fb-eye {
                    height: 0.375rem;
                    width: 0.375rem;
                    box-shadow: 0 0 0 0.25rem #fff;
                }
                .fb-btn:hover .fb-mouth,
                .fb-btn:active .fb-mouth {
                    left: 1rem;
                    width: 0.5rem;
                    height: 0.4rem;
                    border-radius: 1rem 1rem 0.125rem 0.125rem;
                }
                @keyframes fbBlink {
                    0%, 30%, 36%, 100% { transform: scale(1); }
                    32%, 34%           { transform: scale(1, 0); }
                }
            `}</style>

            <button
                ref={btnRef}
                className={`fb-btn ${className}`}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            >
                <span ref={faceRef} className="fb-face">
                    <span className="fb-eye left" />
                    <span className="fb-eye right" />
                    <span className="fb-mouth" />
                </span>
            </button>
        </>
    );
}

export default FaceButton;
