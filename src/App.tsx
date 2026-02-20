import SyntheticHero from "@/components/ui/synthetic-hero"
import { Navbar } from "@/components/ui/navbar"
import WhoWeAre from "@/components/ui/who-we-are"
import LogosSection from "@/components/ui/logos-section"
import CardSection from "@/components/ui/card-section"

function App() {
    return (
        <div className="w-full min-h-screen bg-background overflow-x-hidden">
            <Navbar />
            <SyntheticHero
                titlePrefix="AI-konsulter som bygger, inte bara "
                cyclingWords={[
                    "r\u00e5dgiver",
                    "snackar",
                    "gissar",
                    "skriver rapporter",
                    "levererar PowerPoints",
                    "ritar fina planer",
                ]}
                description="Vi utvecklar er AI-strategi, bygger och utvecklar skr\u00e4ddarsydda AI-system f\u00f6r era behov och utbildar era team."
                badgeText="React Three Fiber"
                badgeLabel="Experience"
                ctaButtons={[
                    { text: "Explore the Canvas", href: "#explore", primary: true },
                    { text: "Learn More", href: "#learn-more" }
                ]}
                microDetails={[
                    "Immersive AI automation",
                    "Hand-tuned intelligent workflows",
                    "Responsive, adaptive systems",
                ]}
            />
            <LogosSection />
            <WhoWeAre />
            <CardSection />
        </div>
    )
}

export default App
