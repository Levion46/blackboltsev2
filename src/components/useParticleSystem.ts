import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

/**
 * Three.js particle system that renders ambient floating particles
 * drifting rightward across the viewport. Uses additive blending
 * and a radial gradient sprite for a soft glow effect.
 */
export function useParticleSystem(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
    const systemRef = useRef<{
        scene: THREE.Scene;
        camera: THREE.OrthographicCamera;
        renderer: THREE.WebGLRenderer;
        particles: THREE.Points;
        velocities: Float32Array;
        alphas: Float32Array;
        particleCount: number;
        animationId: number;
    } | null>(null);

    const animate = useCallback(() => {
        const sys = systemRef.current;
        if (!sys) return;

        const { particles, velocities, alphas, particleCount, renderer, scene, camera } = sys;
        const positions = (particles.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
        const time = Date.now() * 0.001;

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] += velocities[i] * 0.016;

            if (positions[i * 3] > window.innerWidth / 2 + 100) {
                positions[i * 3] = -window.innerWidth / 2 - 100;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
            }

            positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;

            const twinkle = Math.floor(Math.random() * 10);
            if (twinkle === 1 && alphas[i] > 0) alphas[i] -= 0.05;
            else if (twinkle === 2 && alphas[i] < 1) alphas[i] += 0.05;
            alphas[i] = Math.max(0, Math.min(1, alphas[i]));
        }

        particles.geometry.attributes.position.needsUpdate = true;
        (particles.geometry.attributes.alpha as THREE.BufferAttribute).needsUpdate = true;
        renderer.render(scene, camera);

        sys.animationId = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const particleCount = 400;
        const scene = new THREE.Scene();

        const camera = new THREE.OrthographicCamera(
            -window.innerWidth / 2,
            window.innerWidth / 2,
            125,
            -125,
            1,
            1000
        );
        camera.position.z = 100;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, 250);
        renderer.setClearColor(0x000000, 0);

        // Build gradient sprite
        const spriteCanvas = document.createElement('canvas');
        spriteCanvas.width = 100;
        spriteCanvas.height = 100;
        const ctx = spriteCanvas.getContext('2d')!;
        const half = 50;
        const hue = 217;
        const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
        grad.addColorStop(0.025, '#fff');
        grad.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`);
        grad.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(half, half, half, 0, Math.PI * 2);
        ctx.fill();
        const texture = new THREE.CanvasTexture(spriteCanvas);

        // Create geometry
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount);
        const alphas = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 2;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
            positions[i * 3 + 2] = 0;
            colors[i * 3] = 1;
            colors[i * 3 + 1] = 1;
            colors[i * 3 + 2] = 1;
            const orbitRadius = Math.random() * 200 + 100;
            velocities[i] = Math.random() * 60 + 30;
            alphas[i] = (Math.random() * 8 + 2) / 10;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                pointTexture: { value: texture },
                size: { value: 15.0 },
            },
            vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        varying vec3 vColor;
        uniform float size;
        void main() {
          vAlpha = alpha;
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        uniform sampler2D pointTexture;
        varying float vAlpha;
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(vColor, vAlpha) * texture2D(pointTexture, gl_PointCoord);
        }
      `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            vertexColors: true,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        systemRef.current = {
            scene,
            camera,
            renderer,
            particles,
            velocities,
            alphas,
            particleCount,
            animationId: 0,
        };

        // Handle resize
        const handleResize = () => {
            const sys = systemRef.current;
            if (!sys) return;
            sys.camera.left = -window.innerWidth / 2;
            sys.camera.right = window.innerWidth / 2;
            sys.camera.updateProjectionMatrix();
            sys.renderer.setSize(window.innerWidth, 250);
        };
        window.addEventListener('resize', handleResize);

        systemRef.current.animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            const sys = systemRef.current;
            if (sys) {
                cancelAnimationFrame(sys.animationId);
                sys.renderer.dispose();
                sys.scene.remove(sys.particles);
                sys.particles.geometry.dispose();
                (sys.particles.material as THREE.Material).dispose();
            }
            systemRef.current = null;
        };
    }, [canvasRef, animate]);
}
