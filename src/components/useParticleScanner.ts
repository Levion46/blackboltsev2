import { useEffect, useRef, useCallback } from 'react';

interface ScannerParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    alpha: number;
    decay: number;
    originalAlpha: number;
    life: number;
    time: number;
    startX: number;
    twinkleSpeed: number;
    twinkleAmount: number;
}

/**
 * Canvas 2D particle scanner — renders a vertical light bar at the center
 * of the viewport with particles streaming outward. Intensity ramps up
 * when a card is being scanned.
 */
export function useParticleScanner(
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    scanningActiveRef: React.MutableRefObject<boolean>
) {
    const systemRef = useRef<{
        ctx: CanvasRenderingContext2D;
        gradientCanvas: HTMLCanvasElement;
        particles: (ScannerParticle | undefined)[];
        count: number;
        w: number;
        h: number;
        lightBarX: number;
        lightBarWidth: number;
        fadeZone: number;
        intensity: number;
        maxParticles: number;
        baseIntensity: number;
        baseMaxParticles: number;
        baseFadeZone: number;
        currentIntensity: number;
        currentMaxParticles: number;
        currentFadeZone: number;
        currentGlowIntensity: number;
        scanTargetIntensity: number;
        scanTargetParticles: number;
        scanTargetFadeZone: number;
        transitionSpeed: number;
        animationId: number;
    } | null>(null);

    const randomFloat = (min: number, max: number) =>
        Math.random() * (max - min) + min;

    const createParticle = useCallback(
        (
            lightBarX: number,
            lightBarWidth: number,
            baseIntensity: number,
            intensity: number,
            h: number
        ): ScannerParticle => {
            const intensityRatio = intensity / baseIntensity;
            const speedMultiplier = 1 + (intensityRatio - 1) * 1.2;
            const sizeMultiplier = 1 + (intensityRatio - 1) * 0.7;

            return {
                x: lightBarX + randomFloat(-lightBarWidth / 2, lightBarWidth / 2),
                y: randomFloat(0, h),
                vx: randomFloat(0.2, 1.0) * speedMultiplier,
                vy: randomFloat(-0.15, 0.15) * speedMultiplier,
                radius: randomFloat(0.4, 1) * sizeMultiplier,
                alpha: randomFloat(0.6, 1),
                decay: randomFloat(0.005, 0.025) * (2 - intensityRatio * 0.5),
                originalAlpha: 0,
                life: 1.0,
                time: 0,
                startX: 0,
                twinkleSpeed: randomFloat(0.02, 0.08) * speedMultiplier,
                twinkleAmount: randomFloat(0.1, 0.25),
            };
        },
        []
    );

    const render = useCallback(() => {
        const sys = systemRef.current;
        if (!sys) return;

        const scanning = scanningActiveRef.current;
        const targetIntensity = scanning ? sys.scanTargetIntensity : sys.baseIntensity;
        const targetMaxParticles = scanning ? sys.scanTargetParticles : sys.baseMaxParticles;
        const targetFadeZone = scanning ? sys.scanTargetFadeZone : sys.baseFadeZone;

        sys.currentIntensity += (targetIntensity - sys.currentIntensity) * sys.transitionSpeed;
        sys.currentMaxParticles += (targetMaxParticles - sys.currentMaxParticles) * sys.transitionSpeed;
        sys.currentFadeZone += (targetFadeZone - sys.currentFadeZone) * sys.transitionSpeed;

        sys.intensity = sys.currentIntensity;
        sys.maxParticles = Math.floor(sys.currentMaxParticles);
        sys.fadeZone = sys.currentFadeZone;

        const ctx = sys.ctx;
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, sys.w, sys.h);

        // ── Draw light bar ──
        const verticalGrad = ctx.createLinearGradient(0, 0, 0, sys.h);
        verticalGrad.addColorStop(0, 'rgba(255,255,255,0)');
        verticalGrad.addColorStop(sys.fadeZone / sys.h, 'rgba(255,255,255,1)');
        verticalGrad.addColorStop(1 - sys.fadeZone / sys.h, 'rgba(255,255,255,1)');
        verticalGrad.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.globalCompositeOperation = 'lighter';

        const targetGlow = scanning ? 3.5 : 1;
        sys.currentGlowIntensity +=
            (targetGlow - sys.currentGlowIntensity) * sys.transitionSpeed;
        const gI = sys.currentGlowIntensity;
        const lw = sys.lightBarWidth;

        // Core line
        const coreGrad = ctx.createLinearGradient(
            sys.lightBarX - lw / 2, 0, sys.lightBarX + lw / 2, 0
        );
        coreGrad.addColorStop(0, 'rgba(255,255,255,0)');
        coreGrad.addColorStop(0.3, `rgba(255,255,255,${0.9 * gI})`);
        coreGrad.addColorStop(0.5, `rgba(255,255,255,${1 * gI})`);
        coreGrad.addColorStop(0.7, `rgba(255,255,255,${0.9 * gI})`);
        coreGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.roundRect(sys.lightBarX - lw / 2, 0, lw, sys.h, 15);
        ctx.fill();

        // Glow 1
        const g1 = ctx.createLinearGradient(
            sys.lightBarX - lw * 2, 0, sys.lightBarX + lw * 2, 0
        );
        g1.addColorStop(0, 'rgba(139,92,246,0)');
        g1.addColorStop(0.5, `rgba(196,181,253,${0.8 * gI})`);
        g1.addColorStop(1, 'rgba(139,92,246,0)');
        ctx.globalAlpha = scanning ? 1.0 : 0.8;
        ctx.fillStyle = g1;
        ctx.beginPath();
        ctx.roundRect(sys.lightBarX - lw * 2, 0, lw * 4, sys.h, 25);
        ctx.fill();

        // Glow 2
        const g2 = ctx.createLinearGradient(
            sys.lightBarX - lw * 4, 0, sys.lightBarX + lw * 4, 0
        );
        g2.addColorStop(0, 'rgba(139,92,246,0)');
        g2.addColorStop(0.5, `rgba(139,92,246,${0.4 * gI})`);
        g2.addColorStop(1, 'rgba(139,92,246,0)');
        ctx.globalAlpha = scanning ? 0.8 : 0.6;
        ctx.fillStyle = g2;
        ctx.beginPath();
        ctx.roundRect(sys.lightBarX - lw * 4, 0, lw * 8, sys.h, 35);
        ctx.fill();

        // Extra glow when scanning
        if (scanning) {
            const g3 = ctx.createLinearGradient(
                sys.lightBarX - lw * 8, 0, sys.lightBarX + lw * 8, 0
            );
            g3.addColorStop(0, 'rgba(139,92,246,0)');
            g3.addColorStop(0.5, 'rgba(139,92,246,0.2)');
            g3.addColorStop(1, 'rgba(139,92,246,0)');
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = g3;
            ctx.beginPath();
            ctx.roundRect(sys.lightBarX - lw * 8, 0, lw * 16, sys.h, 45);
            ctx.fill();
        }

        // Vertical fade mask
        ctx.globalCompositeOperation = 'destination-in';
        ctx.globalAlpha = 1;
        ctx.fillStyle = verticalGrad;
        ctx.fillRect(0, 0, sys.w, sys.h);

        // ── Draw particles ──
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 1; i <= sys.count; i++) {
            const p = sys.particles[i];
            if (!p) continue;

            // Update
            p.x += p.vx;
            p.y += p.vy;
            p.time++;
            p.alpha =
                p.originalAlpha * p.life +
                Math.sin(p.time * p.twinkleSpeed) * p.twinkleAmount;
            p.life -= p.decay;

            if (p.x > sys.w + 10 || p.life <= 0) {
                // Reset
                p.x = sys.lightBarX + randomFloat(-sys.lightBarWidth / 2, sys.lightBarWidth / 2);
                p.y = randomFloat(0, sys.h);
                p.vx = randomFloat(0.2, 1.0);
                p.vy = randomFloat(-0.15, 0.15);
                p.alpha = randomFloat(0.6, 1);
                p.originalAlpha = p.alpha;
                p.life = 1.0;
                p.time = 0;
                p.startX = p.x;
            }

            if (p.life <= 0) continue;

            // Fade at top/bottom edges
            let fadeAlpha = 1;
            if (p.y < sys.fadeZone) fadeAlpha = p.y / sys.fadeZone;
            else if (p.y > sys.h - sys.fadeZone)
                fadeAlpha = (sys.h - p.y) / sys.fadeZone;
            fadeAlpha = Math.max(0, Math.min(1, fadeAlpha));

            ctx.globalAlpha = p.alpha * fadeAlpha;
            ctx.drawImage(
                sys.gradientCanvas,
                p.x - p.radius,
                p.y - p.radius,
                p.radius * 2,
                p.radius * 2
            );
        }

        // Spawn new particles based on intensity
        const intensityRatio = sys.intensity / sys.baseIntensity;
        if (Math.random() < sys.intensity && sys.count < sys.maxParticles) {
            const np = createParticle(sys.lightBarX, sys.lightBarWidth, sys.baseIntensity, sys.intensity, sys.h);
            np.originalAlpha = np.alpha;
            np.startX = np.x;
            sys.count++;
            sys.particles[sys.count] = np;
        }

        // Extra burst particles at higher intensity
        const thresholds = [
            { threshold: 1.1, mult: 1.2 },
            { threshold: 1.3, mult: 1.4 },
            { threshold: 1.5, mult: 1.8 },
            { threshold: 2.0, mult: 2.0 },
        ];
        for (const { threshold, mult } of thresholds) {
            if (intensityRatio > threshold && Math.random() < (intensityRatio - threshold) * mult) {
                const np = createParticle(sys.lightBarX, sys.lightBarWidth, sys.baseIntensity, sys.intensity, sys.h);
                np.originalAlpha = np.alpha;
                np.startX = np.x;
                sys.count++;
                sys.particles[sys.count] = np;
            }
        }

        // Trim excess
        if (sys.count > sys.maxParticles + 200) {
            const excess = Math.min(15, sys.count - sys.maxParticles);
            for (let i = 0; i < excess; i++) delete sys.particles[sys.count - i];
            sys.count -= excess;
        }

        sys.animationId = requestAnimationFrame(render);
    }, [scanningActiveRef, createParticle]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const w = window.innerWidth;
        const h = 300;
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';

        const ctx = canvas.getContext('2d')!;
        ctx.clearRect(0, 0, w, h);

        // Gradient cache for particles
        const gradientCanvas = document.createElement('canvas');
        gradientCanvas.width = 16;
        gradientCanvas.height = 16;
        const gCtx = gradientCanvas.getContext('2d')!;
        const half = 8;
        const grad = gCtx.createRadialGradient(half, half, 0, half, half, half);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.3, 'rgba(196,181,253,0.8)');
        grad.addColorStop(0.7, 'rgba(139,92,246,0.4)');
        grad.addColorStop(1, 'transparent');
        gCtx.fillStyle = grad;
        gCtx.beginPath();
        gCtx.arc(half, half, half, 0, Math.PI * 2);
        gCtx.fill();

        const baseIntensity = 0.8;
        const baseMaxParticles = 800;
        const baseFadeZone = 60;

        const sys = {
            ctx,
            gradientCanvas,
            particles: [] as (ScannerParticle | undefined)[],
            count: 0,
            w,
            h,
            lightBarX: w / 2,
            lightBarWidth: 3,
            fadeZone: baseFadeZone,
            intensity: baseIntensity,
            maxParticles: baseMaxParticles,
            baseIntensity,
            baseMaxParticles,
            baseFadeZone,
            currentIntensity: baseIntensity,
            currentMaxParticles: baseMaxParticles,
            currentFadeZone: baseFadeZone,
            currentGlowIntensity: 1,
            scanTargetIntensity: 1.8,
            scanTargetParticles: 2500,
            scanTargetFadeZone: 35,
            transitionSpeed: 0.05,
            animationId: 0,
        };

        // Init particles
        for (let i = 0; i < baseMaxParticles; i++) {
            const p = createParticle(sys.lightBarX, sys.lightBarWidth, baseIntensity, baseIntensity, h);
            p.originalAlpha = p.alpha;
            p.startX = p.x;
            sys.count++;
            sys.particles[sys.count] = p;
        }

        systemRef.current = sys;

        const handleResize = () => {
            const s = systemRef.current;
            if (!s) return;
            s.w = window.innerWidth;
            s.lightBarX = s.w / 2;
            canvas.width = s.w;
            canvas.height = s.h;
            canvas.style.width = s.w + 'px';
            canvas.style.height = s.h + 'px';
        };
        window.addEventListener('resize', handleResize);

        sys.animationId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', handleResize);
            const s = systemRef.current;
            if (s) cancelAnimationFrame(s.animationId);
            systemRef.current = null;
        };
    }, [canvasRef, render, createParticle]);
}
