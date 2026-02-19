import SyntheticHero from "@/components/ui/synthetic-hero"
import { Navbar } from "@/components/ui/navbar"


function App() {
    return (
        <div className="relative w-full min-h-screen bg-background">
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
                    "Immersive shader landscapes",
                    "Hand-tuned motion easing",
                    "Responsive, tactile feedback",
                ]}
            />
        </div>
    )
}

export default App
