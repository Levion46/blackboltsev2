import { LogoCloud } from "@/components/ui/logo-cloud";

const logos = [
    { src: "https://storage.efferd.com/logo/nvidia-wordmark.svg", alt: "Nvidia Logo" },
    { src: "https://storage.efferd.com/logo/supabase-wordmark.svg", alt: "Supabase Logo" },
    { src: "https://storage.efferd.com/logo/openai-wordmark.svg", alt: "OpenAI Logo" },
    { src: "https://storage.efferd.com/logo/turso-wordmark.svg", alt: "Turso Logo" },
    { src: "https://storage.efferd.com/logo/vercel-wordmark.svg", alt: "Vercel Logo" },
    { src: "https://storage.efferd.com/logo/github-wordmark.svg", alt: "GitHub Logo" },
    { src: "https://storage.efferd.com/logo/claude-wordmark.svg", alt: "Claude AI Logo" },
    { src: "https://storage.efferd.com/logo/clerk-wordmark.svg", alt: "Clerk Logo" },
];

export default function LogosSection() {
    return (
        <section className="relative border-t border-white/5 pt-6 pb-10 bg-background">
            <div className="relative z-10 mx-auto max-w-4xl">
                <LogoCloud logos={logos} />
            </div>
        </section>
    );
}
