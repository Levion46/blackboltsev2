import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import {
    Bot,
    Workflow,
    BarChart3,
    BrainCircuit,
    Users,
} from "lucide-react";

const services = [
    {
        area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
        icon: <BrainCircuit className="h-4 w-4" />,
        title: "AI-strategi & rådgivning",
        description:
            "Vi kartlägger er verksamhet, identifierar automatiseringsmöjligheter och levererar en konkret AI-färdplan anpassad för era B2B-processer.",
    },
    {
        area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
        icon: <Users className="h-4 w-4" />,
        title: "Team-utbildning & onboarding",
        description:
            "Praktisk utbildning för era team så att ni kan äga, driva och vidareutveckla era AI-system utan att vara beroende av externa konsulter.",
    },
    {
        area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
        icon: <Workflow className="h-4 w-4" />,
        title: "Processautomation",
        description:
            "Vi automatiserar repetitiva arbetsflöden — från datahantering och CRM-uppdateringar till fakturahantering, rapportering och påminnelser. Frigör tid för det som skapar värde.",
    },
    {
        area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
        icon: <Bot className="h-4 w-4" />,
        title: "Skräddarsydda AI-system",
        description:
            "Vi bygger och driftsätter anpassade AI-lösningar — chattbotar, prediktiva modeller och intelligenta agenter — integrerade direkt i era befintliga verktyg.",
    },
    {
        area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
        icon: <BarChart3 className="h-4 w-4" />,
        title: "Mätning & kontinuerlig optimering",
        description:
            "Tydliga KPI:er från dag ett. Vi mäter ROI, itererar och förbättrar kontinuerligt era AI-system för att säkerställa långsiktigt affärsvärde.",
    },
];

interface GridItemProps {
    area: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => (
    <li className={cn("min-h-[14rem] list-none", area)}>
        <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2 md:rounded-[1.5rem] md:p-3">
            <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
            />
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur-sm md:p-6">
                <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="w-fit rounded-lg border-[0.75px] border-emerald-400/30 bg-emerald-400/10 p-2 text-emerald-400">
                        {icon}
                    </div>
                    <div className="space-y-3">
                        <h3
                            className="pt-0.5 text-xl leading-[1.375rem] font-semibold tracking-[-0.03em] md:text-2xl md:leading-[1.875rem] text-balance text-white"
                            style={{ fontFamily: "'Heavitas Neue', sans-serif" }}
                        >
                            {title}
                        </h3>
                        <p
                            className="text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-white/50"
                            style={{ fontFamily: "'Inter Tight', sans-serif" }}
                        >
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </li>
);

export default function ServicesSection() {
    return (
        <section className="bg-transparent py-16 md:py-32">
            <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">
                <div className="mb-14 text-center">
                    <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-medium mb-4">
                        Vad vi erbjuder
                    </p>
                    <div className="mb-6 mx-auto h-px w-12 bg-emerald-400/60" />
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
                        style={{ fontFamily: "'Heavitas Neue', sans-serif" }}
                    >
                        Innovative services{" "}
                        <span className="text-emerald-400">for growth</span>
                    </h2>
                    <p
                        className="mt-4 max-w-2xl mx-auto text-white/60 text-base sm:text-lg font-light"
                        style={{ fontFamily: "'Inter Tight', sans-serif" }}
                    >
                        Tailored solutions to streamline, innovate, and grow.
                    </p>
                </div>

                <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
                    {services.map((service) => (
                        <GridItem key={service.title} {...service} />
                    ))}
                </ul>
            </div>
        </section>
    );
}
