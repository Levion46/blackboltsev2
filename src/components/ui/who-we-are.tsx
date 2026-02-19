export default function WhoWeAre() {
    return (
        <section className="relative bg-background py-24 sm:py-32 overflow-hidden">
            {/* Subtle grid overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right,#34d399 1px,transparent 1px),linear-gradient(to bottom,#34d399 1px,transparent 1px)",
                    backgroundSize: "64px 64px",
                }}
            />

            {/* Glow accent */}
            <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-emerald-500/10 blur-[120px]" />

            <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
                {/* Label */}
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-medium mb-4">
                    Who We Are
                </p>

                {/* Divider */}
                <div className="mb-10 h-px w-12 bg-emerald-400/60" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left — main statement */}
                    <div>
                        <h2
                            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.1]"
                            style={{ fontFamily: "'Heavitas Neue', sans-serif" }}
                        >
                            Vi är{" "}
                            <span className="text-emerald-400">Blackbolt.</span>
                        </h2>
                    </div>

                    {/* Right — description + glow card — hidden until ready */}
                    <div className="hidden relative">
                        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-[0_0_40px_rgba(52,211,153,0.06)]">
                            <p className="text-base sm:text-lg text-white/75 leading-relaxed font-light">
                                Vi hjälper grundare som dig att automatisera sina dagliga
                                affärsprocesser med hjälp av AI.
                            </p>

                            <div className="mt-8 flex items-center gap-3">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                <span className="text-xs text-emerald-100/50 uppercase tracking-widest">
                                    AI · Automation · Growth
                                </span>
                            </div>
                        </div>

                        {/* corner accent */}
                        <div className="absolute -bottom-px -right-px h-16 w-16 rounded-br-2xl border-b border-r border-emerald-400/30" />
                    </div>
                </div>
            </div>
        </section>
    );
}
