import { Linkedin, Twitter, Youtube, Mail, ArrowUpRight } from 'lucide-react'

const links = [
    {
        group: 'Tjänster',
        items: [
            { title: 'AI-strategi', href: '#' },
            { title: 'Processautomation', href: '#' },
            { title: 'AI-system & Integration', href: '#' },
            { title: 'Utbildning & Onboarding', href: '#' },
        ],
    },
    {
        group: 'Företag',
        items: [
            { title: 'Om oss', href: '#' },
            { title: 'Karriär', href: '#' },
            { title: 'Case Studies', href: '#' },
            { title: 'Kontakt', href: '#' },
        ],
    },
    {
        group: 'Juridiskt',
        items: [
            { title: 'Integritetspolicy', href: '#' },
            { title: 'Cookies', href: '#' },
            { title: 'Villkor', href: '#' },
        ],
    },
]

const socials = [
    { label: 'LinkedIn', href: '#', icon: Linkedin },
    { label: 'Twitter / X', href: '#', icon: Twitter },
    { label: 'YouTube', href: '#', icon: Youtube },
    { label: 'E-post', href: 'mailto:hello@blackbolt.se', icon: Mail },
]

export default function FooterSection() {
    return (
        <footer className="border-t border-white/10 bg-transparent pt-16 pb-8">
            <div className="mx-auto max-w-5xl px-6">

                {/* Top row: brand + links grid */}
                <div className="grid gap-12 md:grid-cols-5">

                    {/* Brand column */}
                    <div className="md:col-span-2 space-y-4">
                        <a href="/" aria-label="Blackbolt hem" className="block w-fit">
                            <span
                                className="text-2xl font-extrabold text-white tracking-tight"
                                style={{ fontFamily: "'Heavitas Neue', sans-serif" }}
                            >
                                Blackbolt<span className="text-emerald-400">.</span>
                            </span>
                        </a>
                        <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                            AI-automation exklusivt för B2B. Vi bygger, implementerar och underhåller
                            intelligenta system som sparar tid och driver tillväxt.
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                        >
                            Boka ett samtal
                            <ArrowUpRight className="size-3.5" />
                        </a>
                    </div>

                    {/* Links grid */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-3">
                        {links.map((group, gi) => (
                            <div key={gi} className="space-y-4 text-sm">
                                <span className="block font-semibold text-white/80 uppercase tracking-widest text-xs">
                                    {group.group}
                                </span>
                                {group.items.map((item, ii) => (
                                    <a
                                        key={ii}
                                        href={item.href}
                                        className="text-white/40 hover:text-white block duration-150 transition-colors"
                                    >
                                        {item.title}
                                    </a>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-12 border-t border-white/10" />

                {/* Bottom row: copyright + socials */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-white/30 text-sm">
                        © {new Date().getFullYear()} Blackbolt AB. Alla rättigheter förbehållna.
                    </span>
                    <div className="flex items-center gap-4">
                        {socials.map(({ label, href, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/40 hover:text-emerald-400 transition-colors duration-150"
                            >
                                <Icon className="size-5" strokeWidth={1.5} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
