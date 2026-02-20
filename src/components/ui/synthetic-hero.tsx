"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


import TextType from "@/components/ui/text-type";
import BlurText from "@/components/ui/blur-text";
import GlitchText from "@/components/ui/glitch-text";
import Highlighter from "@/components/ui/highlighter";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import ShaderBackground from "@/components/ui/shader-bg";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Sparkles } from "lucide-react";
import { HoverButton } from "@/components/ui/hover-glow-button";
import { ShinyButton } from "@/components/ui/shiny-button";

gsap.registerPlugin(useGSAP);

interface HeroProps {
    title?: string;
    titlePrefix?: string;
    cyclingWords?: string[];
    description?: string;
    badgeText?: string;
    badgeLabel?: string;
    ctaButtons?: Array<{ text: string; href?: string; primary?: boolean }>;
    microDetails?: Array<string>;
    onAnimationComplete?: () => void;
}

const SyntheticHero = ({
    title = "An experiment in light, motion, and the quiet chaos between.",
    titlePrefix,
    cyclingWords,
    description = "Experience a new dimension of interaction — fluid, tactile, and alive. Designed for creators who see beauty in motion.",
    badgeText = "React Three Fiber",
    badgeLabel = "Experience",
    ctaButtons = [
        { text: "Explore the Canvas", href: "#explore", primary: true },
        { text: "Learn More", href: "#learn-more" },
    ],
    microDetails = [
        "Immersive shader landscapes",
        "Hand-tuned motion easing",
        "Responsive, tactile feedback",
    ],
    onAnimationComplete,
}: HeroProps) => {
    const hasCycling = titlePrefix && cyclingWords && cyclingWords.length > 0;
    const sectionRef = useRef<HTMLElement | null>(null);
    const badgeWrapperRef = useRef<HTMLDivElement | null>(null);
    const ctaRef = useRef<HTMLDivElement | null>(null);
    const microRef = useRef<HTMLUListElement | null>(null);


    const [headerFinished, setHeaderFinished] = useState(false);
    const [descriptionFinished, setDescriptionFinished] = useState(false);
    const [highlightsActive, setHighlightsActive] = useState(false);
    const [ctaVisible, setCtaVisible] = useState(false);

    React.useEffect(() => {
        if (!descriptionFinished) return;
        const tHighlight = setTimeout(() => setHighlightsActive(true), 300);
        const tCta = setTimeout(() => {
            setCtaVisible(true);
            onAnimationComplete?.();
        }, 800);
        return () => {
            clearTimeout(tHighlight);
            clearTimeout(tCta);
        };
    }, [descriptionFinished]);

    useGSAP(
        () => {
            const microItems = microRef.current
                ? Array.from(microRef.current.querySelectorAll("li"))
                : [];
            if (microItems.length > 0) {
                gsap.set(microItems, { autoAlpha: 0, y: 6 });
            }

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            if (microItems.length > 0) {
                tl.to(
                    microItems,
                    { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 },
                    "-=0.25",
                );
            }
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            className="relative flex items-center justify-center min-h-screen overflow-hidden pt-20 sm:pt-0"
        >
            <ShaderBackground />

            <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 pointer-events-none w-full max-w-5xl">
                <div
                    ref={badgeWrapperRef}
                    className="pointer-events-auto mb-4 sm:mb-6"
                    style={{
                        opacity: ctaVisible ? 1 : 0,
                        transition: ctaVisible ? "opacity 1.5s ease-in" : "none",
                    }}
                >
                    <AnimatedBadge text="Introducing Blackbolt" color="#34d399" icon={<Sparkles className="h-3 w-3 text-emerald-400" />} />
                </div>

                {hasCycling ? (
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl max-w-4xl font-extrabold tracking-tight text-white mb-3 sm:mb-4"
                        style={{ fontFamily: "'Heavitas Neue', sans-serif" }}
                    >
                        <TextType
                            text={titlePrefix}
                            as="span"
                            className="inline"
                            typingSpeed={50}
                            initialDelay={500}
                            showCursor={false}
                            loop={false}
                            hideCursorWhileTyping={true}
                            onFinished={() => {
                                setHeaderFinished(true);
                                setDescriptionFinished(true);
                            }}
                        />
                        {descriptionFinished && (
                            <TextType
                                text={cyclingWords}
                                as="span"
                                className="inline"
                                typingSpeed={60}
                                deletingSpeed={300}
                                variableDeletingSpeed={{ min: 200, max: 500 }}
                                pauseDuration={4000}
                                initialDelay={200}
                                showCursor={true}
                                cursorCharacter="|"
                                cursorClassName="text-white ml-0.5"
                                loop={true}
                            />
                        )}
                    </h1>
                ) : (
                    <TextType
                        text={title}
                        as="h1"
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl max-w-4xl font-extrabold tracking-tight text-white mb-3 sm:mb-4"
                        style={{ fontFamily: "'Heavitas Neue', sans-serif" }}
                        typingSpeed={50}
                        initialDelay={500}
                        showCursor={true}
                        cursorCharacter="|"
                        cursorClassName="text-white ml-1"
                        loop={false}
                        hideCursorWhileTyping={true}
                        onFinished={() => {
                            setHeaderFinished(true);
                            setDescriptionFinished(true);
                        }}
                    />
                )}

                <div className="min-h-[40px] sm:min-h-[60px] mb-6 sm:mb-10">
                    {headerFinished && (
                        !descriptionFinished ? (
                            <BlurText
                                text={description}
                                className="text-white text-base sm:text-lg max-w-2xl mx-auto font-light justify-center"
                                delay={30}
                                animateBy="words"
                                direction="top"
                                onAnimationComplete={() => setDescriptionFinished(true)}
                            />
                        ) : (
                            <div className="text-white text-base sm:text-lg max-w-2xl mx-auto font-light text-center leading-relaxed px-2 sm:px-0">
                                Vi utvecklar er{' '}
                                <Highlighter
                                    action="underline"
                                    color="var(--secondary)"
                                    animate={highlightsActive}
                                    animationDuration={1800}
                                    delay={0}
                                >
                                    AI-strategi
                                </Highlighter>
                                , bygger och utvecklar{' '}
                                <Highlighter
                                    action="highlight"
                                    color="var(--primary)"
                                    animate={highlightsActive}
                                    animationDuration={2200}
                                    delay={2200}
                                >
                                    skräddarsydda AI-system
                                </Highlighter>
                                {' '}för era behov och utbildar era team.
                            </div>
                        )
                    )}
                </div>

                <div
                    ref={ctaRef}
                    className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 pointer-events-auto w-full sm:w-auto px-4 sm:px-0"
                    style={{
                        opacity: ctaVisible ? 1 : 0,
                        transition: ctaVisible ? "opacity 1.5s ease-in" : "none",
                        pointerEvents: ctaVisible ? "auto" : "none",
                    }}
                >
                    {ctaButtons.map((button, index) => {
                        const isPrimary = button.primary ?? index === 0;
                        const classes = isPrimary
                            ? "w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-medium backdrop-blur-lg bg-emerald-400/80 hover:bg-emerald-300/80 shadow-lg transition-all cursor-pointer"
                            : "w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-medium border-white/30 text-white hover:bg-white/10 backdrop-blur-lg transition-all cursor-pointer";

                        if (isPrimary) {
                            return (
                                <ShinyButton
                                    key={index}
                                    href={button.href}
                                    className="w-full sm:w-auto"
                                >
                                    {button.text}
                                </ShinyButton>
                            );
                        }

                        if (!isPrimary) {
                            return (
                                <HoverButton
                                    key={index}
                                    glowColor="#34d399"
                                    backgroundColor="transparent"
                                    textColor="#ffffff"
                                    hoverTextColor="#6ee7b7"
                                    className="w-full sm:w-auto border border-white/30 backdrop-blur-lg"
                                    onClick={() => button.href && (window.location.href = button.href)}
                                >
                                    {button.text}
                                </HoverButton>
                            );
                        }

                        if (button.href) {
                            return (
                                <Button
                                    key={index}
                                    variant={isPrimary ? undefined : "outline"}
                                    className={classes}
                                    asChild
                                >
                                    <a href={button.href}>{button.text}</a>
                                </Button>
                            );
                        }

                        return (
                            <Button
                                key={index}
                                variant={isPrimary ? undefined : "outline"}
                                className={classes}
                            >
                                {button.text}
                            </Button>
                        );
                    })}
                </div>

                {microDetails && microDetails.length > 0 && (
                    <ul
                        ref={microRef}
                        className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 text-xs font-light tracking-tight text-emerald-100/70"
                    >
                        {microDetails.map((detail, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <span className="h-1 w-1 rounded-full bg-emerald-200/60" />
                                {detail}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default SyntheticHero;
