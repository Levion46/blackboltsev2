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
}

export const Highlighter: React.FC<HighlighterProps> = ({
    children,
    className,
    action = "highlight",
    color,
    strokeWidth,
    animationDuration = 500,
    delay = 0,
}) => {
    const isHighlight = action === "highlight";
    const defaultColor = isHighlight ? "#FFD54F" : "#FF9800"; // default yellow/orange
    const currentColor = color || defaultColor;

    // Default values based on action
    const currentStrokeWidth = strokeWidth || (isHighlight ? 12 : 2.5);
    // For 'highlight', we want a thick line behind text. 
    // For 'underline', a thin line at bottom.

    // SVG configuration
    // We use preserveAspectRatio="none" to stretch the path to container width
    // viewBox "0 0 100 100" means coordinates are percentages basically.

    const pathD = isHighlight
        ? "M0 50 Q50 45 100 55" // Slightly wavy highlight
        : "M0 90 Q50 100 100 88"; // Organic underline curve

    return (
        <span className={cn("relative inline-block whitespace-nowrap", className)}>
            <span className="relative z-10">{children}</span>
            <svg
                className={cn(
                    "absolute left-0 top-0 h-full w-full pointer-events-none",
                    isHighlight ? "z-0 opacity-80" : "z-10" // Removed mix-blend-screen, increased opacity
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
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                        duration: animationDuration / 1000,
                        delay: delay / 1000,
                        ease: "easeInOut",
                    }}
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </span>
    );
};

export default Highlighter;
