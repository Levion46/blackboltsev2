import { Card, CardContent } from '@/components/ui/card'
import { Cog, Users, Zap, BarChart3, Shield } from 'lucide-react'

export function ProcessFeatures() {
    return (
        <section className="bg-transparent py-16 md:py-32">
            <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">

                <div className="mb-14 text-center">
                    <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-medium mb-4">
                        Vår process
                    </p>
                    <div className="mb-6 mx-auto h-px w-12 bg-emerald-400/60" />
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ fontFamily: "'Heavitas Neue', sans-serif" }}>
                        Hur vi{' '}
                        <span className="text-emerald-400">levererar</span>
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-white/60 text-base sm:text-lg font-light" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                        Vi följer en beprovad process för att säkerställa att varje AI-lösning vi bygger
                        levererar verkligt affärsvärde från dag ett.
                    </p>
                </div>

                <div className="relative z-10 grid grid-cols-6 gap-3">

                    <Card className="relative col-span-full flex overflow-hidden lg:col-span-2">
                        <CardContent className="relative m-auto size-fit pt-6 text-center">
                            <div className="relative flex h-24 w-56 items-center justify-center">
                                <svg className="text-white/5 absolute inset-0 size-full" viewBox="0 0 254 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z" fill="currentColor" />
                                </svg>
                                <span className="mx-auto block w-fit text-5xl font-semibold text-emerald-400">01.</span>
                            </div>
                            <h2 className="mt-6 text-center text-2xl font-semibold text-white" style={{ fontFamily: "'Heavitas Neue', sans-serif" }}>AI-strategi</h2>
                            <p className="mt-3 text-sm text-white/50 max-w-[180px] mx-auto" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                                Vi kartlägger era mål och identifierar de bästa AI-möjligheterna.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
                        <CardContent className="pt-6">
                            <div className="relative mx-auto flex aspect-square size-32 rounded-full border border-white/10 items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-white/5">
                                <Cog className="size-12 text-emerald-400" strokeWidth={1} />
                            </div>
                            <div className="relative z-10 mt-6 space-y-2 text-center">
                                <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "'Heavitas Neue', sans-serif" }}>02. Bygg &amp; Utveckla</h2>
                                <p className="text-white/50 text-sm" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Vi bygger skräddarsydda AI-system anpassade exakt efter era unika behov och processer.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
                        <CardContent className="pt-6">
                            <div className="relative mx-auto flex aspect-square size-32 rounded-full border border-white/10 items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-white/5">
                                <Users className="size-12 text-emerald-400" strokeWidth={1} />
                            </div>
                            <div className="relative z-10 mt-6 space-y-2 text-center">
                                <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "'Heavitas Neue', sans-serif" }}>03. Utbilda</h2>
                                <p className="text-white/50 text-sm" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Vi utbildar era team så att ni kan äga, förstå och vidareutveckla era AI-lösningar självständigt.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative col-span-full overflow-hidden lg:col-span-3">
                        <CardContent className="grid pt-6 sm:grid-cols-2">
                            <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                                <div className="relative flex aspect-square size-12 rounded-full border border-white/10 items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-white/5">
                                    <BarChart3 className="m-auto size-5 text-emerald-400" strokeWidth={1} />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "'Heavitas Neue', sans-serif" }}>Mätbara resultat</h2>
                                    <p className="text-white/50 text-sm" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Varje leverans mäts mot tydliga KPI:er. Ni ser alltid exakt vilket värde AI tillför er verksamhet.</p>
                                </div>
                            </div>
                            <div className="rounded-tl-lg relative -mb-6 -mr-6 mt-6 h-fit border-l border-t border-white/10 p-6 py-6 sm:ml-6">
                                <div className="absolute left-3 top-2 flex gap-1">
                                    <span className="block size-2 rounded-full border border-white/10 bg-white/10"></span>
                                    <span className="block size-2 rounded-full border border-white/10 bg-white/10"></span>
                                    <span className="block size-2 rounded-full border border-white/10 bg-white/10"></span>
                                </div>
                                <svg className="w-full mt-4" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                                            <stop offset="0" stopColor="#34d399" stopOpacity="0.3" />
                                            <stop offset="1" stopColor="#34d399" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M0 70 C20 70 30 50 50 45 C70 40 80 55 100 40 C120 25 130 30 150 15 C170 5 180 20 200 10 L200 80 L0 80 Z" fill="url(#chartGrad)" />
                                    <path d="M0 70 C20 70 30 50 50 45 C70 40 80 55 100 40 C120 25 130 30 150 15 C170 5 180 20 200 10" stroke="#34d399" strokeWidth="2" fill="none" strokeLinecap="round" />
                                </svg>
                                <div className="mt-4 flex justify-between text-xs text-white/30">
                                    <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative col-span-full overflow-hidden lg:col-span-3">
                        <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                            <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                                <div className="relative flex aspect-square size-12 rounded-full border border-white/10 items-center justify-center before:absolute before:-inset-2 before:rounded-full before:border before:border-white/5">
                                    <Shield className="m-auto size-5 text-emerald-400" strokeWidth={1} />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "'Heavitas Neue', sans-serif" }}>Säkert &amp; GDPR-compliant</h2>
                                    <p className="text-white/50 text-sm" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Era data och processer hanteras med strikt datasäkerhet och efterlevnad av GDPR och branschstandarder.</p>
                                </div>
                            </div>
                            <div className="relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px before:bg-white/10 sm:-my-6 sm:-mr-6">
                                <div className="relative flex h-full flex-col justify-center space-y-6 py-6">
                                    {[
                                        { label: 'GDPR Compliant', badge: '✓ Verified' },
                                        { label: 'End-to-end Encrypted', badge: 'AES-256' },
                                        { label: 'SOC 2 Ready', badge: 'In progress' },
                                    ].map(({ label, badge }, i) => (
                                        <div
                                            key={i}
                                            className={`relative flex items-center gap-3 ${i % 2 === 0 ? 'w-[calc(50%+0.875rem)] justify-end' : 'ml-[calc(50%-1rem)]'}`}
                                        >
                                            {i % 2 === 0 ? (
                                                <>
                                                    <span className="block h-fit rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70">{badge}</span>
                                                    <div className="size-7 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
                                                        <Shield className="size-3 text-emerald-400" />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="size-8 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
                                                        <Zap className="size-3 text-emerald-400" />
                                                    </div>
                                                    <span className="block h-fit rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70">{badge}</span>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </section>
    )
}

export default ProcessFeatures
