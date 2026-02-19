"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({
    children,
    className,
    beamOpacity = 1,
}: {
    children?: React.ReactNode;
    className?: string;
    beamOpacity?: number;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    const beams = [
        { initialX: 60, translateX: 60, duration: 9, repeatDelay: 2, delay: 0 },
        { initialX: 180, translateX: 180, duration: 6, repeatDelay: 5, delay: 1.5, className: "h-8" },
        { initialX: 320, translateX: 320, duration: 8, repeatDelay: 3, delay: 0.5 },
        { initialX: 480, translateX: 480, duration: 5, repeatDelay: 7, delay: 3, className: "h-10" },
        { initialX: 640, translateX: 640, duration: 11, repeatDelay: 2, delay: 0 },
        { initialX: 780, translateX: 780, duration: 7, repeatDelay: 4, delay: 2, className: "h-6" },
        { initialX: 920, translateX: 920, duration: 4, repeatDelay: 6, delay: 1, className: "h-12" },
        { initialX: 1080, translateX: 1080, duration: 9, repeatDelay: 3, delay: 4 },
        { initialX: 1220, translateX: 1220, duration: 6, repeatDelay: 5, delay: 0.5, className: "h-8" },
        { initialX: 1380, translateX: 1380, duration: 8, repeatDelay: 2, delay: 2, className: "h-14" },
        { initialX: 1520, translateX: 1520, duration: 5, repeatDelay: 8, delay: 3.5 },
        { initialX: 240, translateX: 240, duration: 12, repeatDelay: 1, delay: 1 },
        { initialX: 860, translateX: 860, duration: 7, repeatDelay: 4, delay: 5, className: "h-10" },
        { initialX: 1150, translateX: 1150, duration: 10, repeatDelay: 3, delay: 2.5 },
        { initialX: 420, translateX: 420, duration: 6, repeatDelay: 6, delay: 0 },
    ];

    return (
        // fixed so beams are always visible in the viewport regardless of scroll
        <div
            ref={parentRef}
            className={cn(
                "fixed inset-0 w-full h-full pointer-events-none z-[1]",
                className
            )}
            style={{
                opacity: beamOpacity,
                transition: "opacity 1.5s ease",
            }}
        >
            {beams.map((beam) => (
                <CollisionMechanism
                    key={beam.initialX + "beam-idx"}
                    beamOptions={beam}
                    containerRef={containerRef}
                    parentRef={parentRef}
                />
            ))}
            {children}
            {/* collision floor at viewport bottom */}
            <div
                ref={containerRef}
                className="absolute bottom-0 w-full inset-x-0 pointer-events-none h-px"
            />
        </div>
    );
};

const CollisionMechanism = React.forwardRef<
    HTMLDivElement,
    {
        containerRef: React.RefObject<HTMLDivElement | null>;
        parentRef: React.RefObject<HTMLDivElement | null>;
        beamOptions?: {
            initialX?: number;
            translateX?: number;
            initialY?: number;
            translateY?: number;
            rotate?: number;
            className?: string;
            duration?: number;
            delay?: number;
            repeatDelay?: number;
        };
    }
>(({ parentRef, containerRef, beamOptions = {} }, _ref) => {
    const beamRef = useRef<HTMLDivElement>(null);
    const [collision, setCollision] = useState<{
        detected: boolean;
        coordinates: { x: number; y: number } | null;
    }>({ detected: false, coordinates: null });
    const [beamKey, setBeamKey] = useState(0);
    const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

    useEffect(() => {
        const checkCollision = () => {
            if (
                beamRef.current &&
                containerRef.current &&
                parentRef.current &&
                !cycleCollisionDetected
            ) {
                const beamRect = beamRef.current.getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();
                const parentRect = parentRef.current.getBoundingClientRect();

                if (beamRect.bottom >= containerRect.top) {
                    const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
                    const relativeY = beamRect.bottom - parentRect.top;
                    setCollision({ detected: true, coordinates: { x: relativeX, y: relativeY } });
                    setCycleCollisionDetected(true);
                }
            }
        };
        const interval = setInterval(checkCollision, 50);
        return () => clearInterval(interval);
    }, [cycleCollisionDetected, containerRef, parentRef]);

    useEffect(() => {
        if (collision.detected && collision.coordinates) {
            setTimeout(() => {
                setCollision({ detected: false, coordinates: null });
                setCycleCollisionDetected(false);
            }, 2000);
            setTimeout(() => setBeamKey((k) => k + 1), 2000);
        }
    }, [collision]);

    return (
        <>
            <motion.div
                key={beamKey}
                ref={beamRef}
                initial={{
                    translateY: "-220px",
                    translateX: beamOptions.initialX ?? 0,
                }}
                animate={{
                    translateY: "110vh",
                    translateX: beamOptions.translateX ?? 0,
                }}
                transition={{
                    duration: beamOptions.duration ?? 8,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    delay: beamOptions.delay ?? 0,
                    repeatDelay: beamOptions.repeatDelay ?? 0,
                }}
                className={cn(
                    "absolute left-0 top-0 h-16 w-[2px] rounded-full opacity-70",
                    "bg-gradient-to-b from-emerald-300 via-emerald-400 to-transparent",
                    // subtle glow
                    "[box-shadow:0_0_6px_1px_rgba(52,211,153,0.5)]",
                    beamOptions.className
                )}
            />
            <AnimatePresence>
                {collision.detected && collision.coordinates && (
                    <Explosion
                        key={`${collision.coordinates.x}-${collision.coordinates.y}`}
                        style={{
                            left: `${collision.coordinates.x}px`,
                            top: `${collision.coordinates.y}px`,
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
    const spans = Array.from({ length: 24 }, (_, index) => ({
        id: index,
        directionX: Math.floor(Math.random() * 100 - 50),
        directionY: Math.floor(Math.random() * -60 - 10),
    }));

    return (
        <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
            {/* horizontal flash */}
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute -inset-x-8 top-0 m-auto h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent via-emerald-300 to-transparent blur-[1px]"
            />
            {/* vertical flash */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute left-1/2 top-0 -translate-x-1/2 h-6 w-[2px] rounded-full bg-emerald-300 blur-[1px]"
            />
            {/* particles */}
            {spans.map((span) => (
                <motion.span
                    key={span.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                        x: span.directionX,
                        y: span.directionY,
                        opacity: 0,
                        scale: 0.4,
                    }}
                    transition={{
                        duration: Math.random() * 1.2 + 0.4,
                        ease: "easeOut",
                    }}
                    className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-emerald-200 to-emerald-500"
                />
            ))}
        </div>
    );
};
