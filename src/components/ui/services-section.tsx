import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import ChatComponent from "@/components/ui/chat-interface";
import {
    Bot,
    Workflow,
    BarChart3,
    BrainCircuit,
    Users,
} from "lucide-react";

const PHASE_STEP = 360 / 5;

const chatConfig = {
    leftPerson: {
        name: "Anna",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face",
    },
    rightPerson: {
        name: "AI Bot",
        avatar: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=64&h=64&fit=crop",
    },
    messages: [
        {
            id: 1, sender: "left" as const, type: "text" as const,
            content: "Hi! I need to check my order status.",
            maxWidth: "max-w-[175px]",
            loader: { enabled: true, delay: 500, duration: 1400 },
        },
        {
            id: 2, sender: "right" as const, type: "text" as const,
            content: "Sure! Share your order number and I'll look it up instantly.",
            maxWidth: "max-w-[195px]",
            loader: { enabled: true, delay: 400, duration: 1600 },
        },
        {
            id: 3, sender: "left" as const, type: "text" as const,
            content: "It's #BB-20482.",
            maxWidth: "max-w-[130px]",
            loader: { enabled: true, delay: 400, duration: 900 },
        },
        {
            id: 4, sender: "right" as const, type: "text-with-links" as const,
            content: "Order #BB-20482 is dispatched and arriving tomorrow by 3 PM! 🎉",
            maxWidth: "max-w-[210px]",
            links: [{ text: "Track shipment" }, { text: "Contact support" }],
            loader: { enabled: true, delay: 400, duration: 1800 },
        },
    ],
};

const chatUiConfig = {
    containerHeight: 290,
    backgroundColor: "transparent",
    autoRestart: true,
    restartDelay: 3500,
    loader: { dotColor: "#6ee7b7" },
    linkBubbles: { backgroundColor: "#064e3b", textColor: "#6ee7b7", iconColor: "#6ee7b7", borderColor: "#065f46" },
    leftChat: { backgroundColor: "rgba(255,255,255,0.07)", textColor: "#e2e8f0", borderColor: "rgba(255,255,255,0.1)", showBorder: true, nameColor: "#6ee7b7" },
    rightChat: { backgroundColor: "rgba(52,211,153,0.15)", textColor: "#e2e8f0", borderColor: "rgba(52,211,153,0.25)", showBorder: true, nameColor: "#a7f3d0" },
};

const services = [
    {
        area: "md:[grid-area:1/1/3/7] xl:[grid-area:1/1/3/6]",
        icon: <BrainCircuit className="h-4 w-4" />,
        title: "AI-strategi & rådgivning",
        description: "Vi kartlägger er verksamhet och identifierar de bästa AI-möjligheterna.",
        phase: 0,
        chat: true,
    },
    {
        area: "md:[grid-area:3/1/4/7] xl:[grid-area:1/6/2/10]",
        icon: <Users className="h-4 w-4" />,
        title: "Team-utbildning & onboarding",
        description: "Praktisk utbildning för era team så att ni kan äga, driva och vidareutveckla era AI-system utan att vara beroende av externa konsulter.",
        phase: PHASE_STEP * 1,
        chat: false,
    },
    {
        area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/6/3/10]",
        icon: <Workflow className="h-4 w-4" />,
        title: "Processautomation",
        description: "Vi automatiserar repetitiva arbetsflöden — från datahantering till rapportering och påminnelser.",
        phase: PHASE_STEP * 2,
        chat: false,
    },
    {
        area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/10/2/13]",
        icon: <Bot className="h-4 w-4" />,
        title: "Skräddarsydda AI-system",
        description: "Chattbotar, prediktiva modeller och intelligenta agenter integrerade i era befintliga verktyg.",
        phase: PHASE_STEP * 3,
        chat: false,
    },
    {
        area: "md:[grid-area:3/7/4/13] xl:[grid-area:2/10/3/13]",
        icon: <BarChart3 className="h-4 w-4" />,
        title: "Mätning & optimering",
        description: "Tydliga KPI:er från dag ett — vi mäter ROI och förbättrar kontinuerligt era AI-system.",
        phase: PHASE_STEP * 4,
        chat: false,
    },
];

interface GridItemProps {
    area: string; icon: React.ReactNode; title: string;
    description: string; phase: number; chat?: boolean;
}

const GridItem = ({ area, icon, title, description, phase, chat }: GridItemProps) => (
    <li className={cn("min-h-[14rem] list-none", area)}>
        <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2 md:rounded-[1.5rem] md:p-3">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64}
                inactiveZone={0.01} borderWidth={3} autoAnimate={true} phaseOffset={phase} animSpeed={0.36} />
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl border-[0.75px] border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="flex flex-col gap-3 p-6 pb-4">
                    <div className="w-fit rounded-lg border-[0.75px] border-emerald-400/30 bg-emerald-400/10 p-2 text-emerald-400">{icon}</div>
                    <div className="space-y-1.5">
                        <h3 className="text-xl leading-snug font-semibold tracking-[-0.03em] md:text-2xl text-white"
                            style={{ fontFamily: "'Heavitas Neue', sans-serif" }}>{title}</h3>
                        <p className="text-sm leading-relaxed text-white/50"
                            style={{ fontFamily: "'Inter Tight', sans-serif" }}>{description}</p>
                    </div>
                </div>
                {chat && (
                    <>
                        <div className="flex-1 min-h-0 mx-4 rounded-lg overflow-hidden border border-white/10 bg-black/20">
                            <ChatComponent config={chatConfig} uiConfig={chatUiConfig} />
                        </div>
                        <div className="px-6 py-5 border-t border-white/10 mt-3">
                            <h4 className="text-base font-semibold text-white mb-1"
                                style={{ fontFamily: "'Heavitas Neue', sans-serif" }}>Business Chatbot</h4>
                            <p className="text-sm text-white/50 leading-relaxed"
                                style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                                Enhance customer interactions by automating responses with intelligent chatbots, providing seamless service.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    </li>
);

export default function ServicesSection() {
    return (
        <section className="bg-transparent py-16 md:py-32">
            <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">
                <div className="mb-14 text-center">
                    <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-medium mb-4">Vad vi erbjuder</p>
                    <div className="mb-6 mx-auto h-px w-12 bg-emerald-400/60" />
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
                        style={{ fontFamily: "'Heavitas Neue', sans-serif" }}>
                        Innovative services <span className="text-emerald-400">for growth</span>
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-white/60 text-base sm:text-lg font-light"
                        style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                        Tailored solutions to streamline, innovate, and grow.
                    </p>
                </div>
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-3 xl:grid-rows-2 xl:min-h-[46rem]">
                    {services.map((service) => (
                        <GridItem key={service.title} {...service} />
                    ))}
                </ul>
            </div>
        </section>
    );
}
