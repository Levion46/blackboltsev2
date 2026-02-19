import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HighlighterProps {
    children: React.ReactNode;
    className?: string;
    action?: "highlight" | "underline";
    color?: string;
    strokeWidth?: number;
    animationDuration?: number; // in ms
    delay?: number; // in ms
    /** Control whether the stroke animates. Pass `true` to trigger. */
    animate?: boolean;
}

export const Highlighter: React.FC<HighlighterProps> = ({
    children,
    className,
    action = "highlight",
    color,
    strokeWidth,
    animationDuration = 1600,
    delay = 0,
    animate = true,
}) => {
    const isHighlight = action === "highlight";
    const defaultColor = isHighlight ? "#FFD54F" : "#FF9800";
    const currentColor = color || defaultColor;
    const currentStrokeWidth = strokeWidth || (isHighlight ? 12 : 2.5);

    // Slightly wobbly paths for a hand-drawn feel
    const pathD = isHighlight
        ? "M2 52 Q25 46 50 50 Q75 54 98 49"   // wavy highlight behind text
        : "M1 88 Q30 96 60 90 Q80 86 99 92";  // organic underline with small dip

    return (
        <span className={cn("relative inline-block whitespace-nowrap", className)}>
            <span className="relative z-10">{children}</span>
            <svg
                className={cn(
                    "absolute left-0 top-0 h-full w-full pointer-events-none",
                    isHighlight ? "z-0 opacity-80" : "z-10"
                )}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ overflow: "visible" }}
            >
                <motion.path
                    d={pathD}
                    fill="none"
                    stroke={currentColor}
                    strokeWidth={currentStrokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                        animate
                            ? { pathLength: 1, opacity: 1 }
                            : { pathLength: 0, opacity: 0 }
                    }
                    transition={{
                        pathLength: {
                            duration: animationDuration / 1000,
                            delay: delay / 1000,
                            // Slow start, slight deceleration — mimics a real marker/pen
                            ease: [0.25, 0.1, 0.35, 1.0],
                        },
                        opacity: {
                            duration: 0.01,
                            delay: delay / 1000,
                        },
                    }}
                />
            </svg>
        </span>
    );
};

export default Highlighter;
