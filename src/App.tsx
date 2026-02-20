import SyntheticHero from "@/components/ui/synthetic-hero"
import { Navbar } from "@/components/ui/navbar"
import WhoWeAre from "@/components/ui/who-we-are"
import LogosSection from "@/components/ui/logos-section"
import CardSection from "@/components/ui/card-section"
import ProcessFeatures from "@/components/ui/features-8"

function App() {
    return (
        <div className="w-full min-h-screen bg-background overflow-x-hidden">
            <Navbar />
            <SyntheticHero
                titlePrefix="AI-konsulter som bygger, inte bara "
                cyclingWords={[
                    "rådgiver",
                    "snackar",
                    "gissar",
                    "skriver rapporter",
                    "levererar PowerPoints",
                    "ritar fina planer",
                ]}
                description="Vi utvecklar er AI-strategi, bygger och utvecklar skräddarsydda AI-system för era behov och utbildar era team."
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
            <ProcessFeatures />
        </div>
    )
}

export default App
