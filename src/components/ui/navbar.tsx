"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import AnimatedGenerateButton from "@/components/ui/animated-generate-button";

interface NavbarProps {
    className?: string;
}

export function Navbar({ className }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const navLinks = [
        { label: "Home", href: "#" },
        { label: "Services", href: "#" },
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
    ];

    return (
        <>
            <header
                className={cn(
                    "fixed top-4 left-0 right-0 z-50 flex justify-center px-4",
                    className
                )}
            >
                <nav
                    className={cn(
                        "flex items-center justify-between gap-4 sm:gap-8 w-full max-w-3xl px-4 sm:px-6 py-3 transition-all duration-300 ease-in-out",
                        "bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-black/5",
                        "rounded-full",
                        scrolled ? "bg-white/10 border-white/20 shadow-xl" : ""
                    )}
                >
                    {/* Logo / Brand */}
                    <a href="#" className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-emerald-300 transition-colors whitespace-nowrap">
                        Blackbolt
                    </a>

                    {/* Desktop Links */}
                    <ul className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/10 hover:text-white rounded-full"
                        >
                            Sign In
                        </Button>
                        <AnimatedGenerateButton
                            labelIdle="Get Started"
                            labelActive="Loading..."
                            highlightHueDeg={155}
                            className="scale-[0.88] origin-right"
                        />
                    </div>

                    {/* Mobile: CTA + Hamburger */}
                    <div className="flex md:hidden items-center gap-2">
                        <AnimatedGenerateButton
                            labelIdle="Get Started"
                            labelActive="Loading..."
                            highlightHueDeg={155}
                            className="scale-[0.82] origin-right"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="text-white hover:bg-white/10 rounded-full h-9 w-9"
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-nav-menu"
                            aria-label="Toggle menu"
                        >
                            <MenuToggleIcon open={mobileOpen} className="size-5" duration={300} />
                        </Button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                id="mobile-nav-menu"
                className={cn(
                    "fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out",
                    mobileOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />

                {/* Menu Panel */}
                <div
                    className={cn(
                        "absolute top-20 left-4 right-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300 ease-out shadow-2xl",
                        mobileOpen
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-4 opacity-0"
                    )}
                >
                    <ul className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-4 py-3 text-base font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
                        <Button
                            variant="ghost"
                            className="w-full justify-center text-white hover:bg-white/10 hover:text-white rounded-xl"
                            onClick={() => setMobileOpen(false)}
                        >
                            Sign In
                        </Button>
                        <AnimatedGenerateButton
                            labelIdle="Get Started"
                            labelActive="Loading..."
                            highlightHueDeg={155}
                            className="w-full"
                            onClick={() => setMobileOpen(false)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
