import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SOCIALS = [
    { name: 'Instagram', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' },
    { name: 'LinkedIn', image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
    { name: 'Spotify', image: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg' },
    { name: 'TikTok', image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg' },
];

const ROTATIONS = [8, -5, 12, -9];

const DiscordIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className={className} fill="currentColor">
        <path d="M524.531 69.836a1.5 1.5 0 0 0-.764-.7A485.065 485.065 0 0 0 404.081 32.03a1.816 1.816 0 0 0-1.923.91 337.461 337.461 0 0 0-14.9 30.6 447.848 447.848 0 0 0-134.426 0 309.541 309.541 0 0 0-15.135-30.6 1.89 1.89 0 0 0-1.924-.91 483.689 483.689 0 0 0-119.688 37.107 1.712 1.712 0 0 0-.788.676C39.068 183.651 18.186 294.69 28.43 404.354a2.016 2.016 0 0 0 .765 1.375 487.666 487.666 0 0 0 146.825 74.189 1.9 1.9 0 0 0 2.063-.676A348.2 348.2 0 0 0 208.12 430.4a1.86 1.86 0 0 0-1.019-2.588 321.173 321.173 0 0 1-45.868-21.853 1.885 1.885 0 0 1-.185-3.126 251.047 251.047 0 0 0 9.109-7.137 1.819 1.819 0 0 1 1.9-.256c96.229 43.917 200.41 43.917 295.5 0a1.812 1.812 0 0 1 1.924.233 234.533 234.533 0 0 0 9.132 7.16 1.884 1.884 0 0 1-.162 3.126 301.407 301.407 0 0 1-45.89 21.83 1.875 1.875 0 0 0-1 2.611 391.055 391.055 0 0 0 30.014 48.815 1.864 1.864 0 0 0 2.063.7A486.048 486.048 0 0 0 610.7 405.729a1.882 1.882 0 0 0 .765-1.352c12.264-126.783-20.532-236.912-86.934-334.541zM222.491 337.58c-28.972 0-52.844-26.587-52.844-59.239s23.409-59.241 52.844-59.241c29.665 0 53.306 26.82 52.843 59.239 0 32.654-23.41 59.241-52.843 59.241zm195.38 0c-28.971 0-52.843-26.587-52.843-59.239s23.409-59.241 52.843-59.241c29.667 0 53.307 26.82 52.844 59.239 0 32.654-23.177 59.241-52.844 59.241z" />
    </svg>
);

const SlackIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.8 122.8" className={className} fill="currentColor">
        <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" />
        <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" />
        <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" />
        <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" />
    </svg>
);

const RedditIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={className} fill="currentColor">
        <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm5.918 12.712c-.072.143-.507 1.062-1.538 1.662-1.03.6-2.398.908-3.38.908-.983 0-2.35-.308-3.38-.908-1.03-.6-1.466-1.52-1.538-1.662a.5.5 0 0 1 .847-.53c.006.01.434.624 1.63 1.132 1.195.508 2.747.768 3.44.768.694 0 2.245-.26 3.44-.768 1.196-.508 1.624-1.122 1.63-1.132a.5.5 0 0 1 .847.53zm-9.168-4.45a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm6.5 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
    </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} fill="currentColor">
        <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
    </svg>
);

type Platform = 'discord' | 'slack' | 'reddit';
type ConnStatus = 'disconnected' | 'connecting' | 'connected';

const PLATFORMS: { key: Platform; label: string; Icon: React.FC<{ className?: string }>; border: string; text: string; iconBg: string; shimmer: string }[] = [
    { key: 'discord', label: 'Discord', Icon: DiscordIcon, border: 'border-indigo-500/30', text: 'text-indigo-400', iconBg: 'from-indigo-500/30 to-indigo-600/10', shimmer: 'via-indigo-400/20' },
    { key: 'slack', label: 'Slack', Icon: SlackIcon, border: 'border-purple-500/30', text: 'text-purple-400', iconBg: 'from-purple-500/30 to-purple-600/10', shimmer: 'via-purple-400/20' },
    { key: 'reddit', label: 'Reddit', Icon: RedditIcon, border: 'border-orange-500/30', text: 'text-orange-400', iconBg: 'from-orange-500/30 to-orange-600/10', shimmer: 'via-orange-400/20' },
];

const SocialAnimatedCard: React.FC = () => {
    const [phase, setPhase] = useState<'social' | 'connect'>('social');
    const [hoveredIdx, setHoveredIdx] = useState<number>(-1);
    const [connStatus, setConnStatus] = useState<Record<Platform, ConnStatus>>({
        discord: 'disconnected', slack: 'disconnected', reddit: 'disconnected',
    });
    const [loopKey, setLoopKey] = useState(0);

    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];
        const t = (ms: number, fn: () => void) => { timers.push(setTimeout(fn, ms)); };

        const SOCIAL_HOVER_DURATION = 1100;
        const FIRST_HOVER_DELAY = 700;
        SOCIALS.forEach((_, i) => { t(FIRST_HOVER_DELAY + i * SOCIAL_HOVER_DURATION, () => setHoveredIdx(i)); });
        const unHoverAt = FIRST_HOVER_DELAY + SOCIALS.length * SOCIAL_HOVER_DURATION;
        t(unHoverAt, () => setHoveredIdx(-1));

        const transitionAt = unHoverAt + 900;
        t(transitionAt, () => setPhase('connect'));

        const connectStart = transitionAt + 600;
        const PER_PLATFORM = 2600;
        PLATFORMS.forEach(({ key }, i) => {
            t(connectStart + i * PER_PLATFORM + 500, () => setConnStatus(prev => ({ ...prev, [key]: 'connecting' })));
            t(connectStart + i * PER_PLATFORM + 2200, () => setConnStatus(prev => ({ ...prev, [key]: 'connected' })));
        });

        const loopAt = connectStart + PLATFORMS.length * PER_PLATFORM + 2200;
        t(loopAt, () => {
            setPhase('social');
            setHoveredIdx(-1);
            setConnStatus({ discord: 'disconnected', slack: 'disconnected', reddit: 'disconnected' });
            setLoopKey(k => k + 1);
        });

        return () => timers.forEach(clearTimeout);
    }, [loopKey]);

    return (
        <div key={loopKey} className="w-full h-full flex flex-col pointer-events-none select-none">
            <AnimatePresence mode="wait">
                {phase === 'social' && (
                    <motion.div key="social" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="flex-1 flex flex-col items-center justify-center">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/70 mb-6 font-medium">Social Integrations</p>
                        <div className="flex items-center justify-center">
                            {SOCIALS.map((social, idx) => (
                                <div key={social.name} className={`relative px-4 py-2 transition-opacity duration-300 ${hoveredIdx !== -1 && hoveredIdx !== idx ? 'opacity-35' : 'opacity-100'}`}>
                                    <span className="block text-sm font-medium text-white/90 tracking-wide">{social.name}</span>
                                    <AnimatePresence>
                                        {hoveredIdx === idx && (
                                            <div className="absolute bottom-0 left-0 right-0 flex h-full w-full items-center justify-center">
                                                <motion.img key={social.name} src={social.image} alt={social.name} className="size-12 drop-shadow-lg"
                                                    initial={{ y: -16, rotate: ROTATIONS[idx], opacity: 0, filter: 'blur(3px)' }}
                                                    animate={{ y: -54, opacity: 1, filter: 'blur(0px)', rotate: ROTATIONS[idx] }}
                                                    exit={{ y: -16, opacity: 0, filter: 'blur(3px)' }}
                                                    transition={{ duration: 0.22, ease: 'easeOut' }} />
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-1 mt-6">
                            {SOCIALS.map((_, idx) => (
                                <motion.div key={idx} className="h-0.5 rounded-full bg-emerald-400"
                                    animate={{ width: hoveredIdx === idx ? 24 : 6, opacity: hoveredIdx === idx ? 1 : 0.25 }}
                                    transition={{ duration: 0.3 }} />
                            ))}
                        </div>
                    </motion.div>
                )}
                {phase === 'connect' && (
                    <motion.div key="connect" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="flex-1 flex flex-col justify-center gap-2.5 px-3">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/70 mb-1 font-medium text-center">Connect Communities</p>
                        {PLATFORMS.map(({ key, label, Icon, border, text, iconBg, shimmer }) => {
                            const status = connStatus[key];
                            const isConnected = status === 'connected';
                            const isConnecting = status === 'connecting';
                            return (
                                <motion.div key={key}
                                    className={`relative rounded-xl border bg-gradient-to-br from-black/60 to-black/40 overflow-hidden ${isConnected ? 'border-green-500/50' : border}`}
                                    animate={isConnecting ? { scale: [1, 1.015, 1] } : { scale: 1 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}>
                                    {isConnecting && (
                                        <motion.div className={`absolute inset-0 bg-gradient-to-r from-transparent ${shimmer} to-transparent`}
                                            initial={{ x: '-100%' }} animate={{ x: '100%' }}
                                            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }} />
                                    )}
                                    {isConnected && (
                                        <motion.div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-green-400/15 to-green-500/10"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} />
                                    )}
                                    <div className="relative flex items-center gap-3 px-3 py-2.5">
                                        <div className={`p-2 rounded-lg bg-gradient-to-br ${isConnected ? 'from-green-500/30 to-green-600/10' : iconBg}`}>
                                            {isConnecting ? (
                                                <div className="w-5 h-5 flex items-center justify-center">
                                                    <div className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${text} border-current`} />
                                                </div>
                                            ) : isConnected ? (
                                                <CheckIcon className="w-5 h-5 text-green-400" />
                                            ) : (
                                                <Icon className={`w-5 h-5 ${text}`} />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-semibold leading-tight ${isConnected ? 'text-green-400' : text}`}>
                                                {isConnecting ? 'Connecting...' : isConnected ? 'Connected!' : `Join ${label}`}
                                            </p>
                                            <p className="text-xs text-white/35 mt-0.5">
                                                {isConnected ? 'Successfully joined' : isConnecting ? 'Please wait...' : 'Join our community'}
                                            </p>
                                        </div>
                                        {!isConnected && !isConnecting && (
                                            <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" className={`w-4 h-4 opacity-40 ${text}`}>
                                                <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                                            </svg>
                                        )}
                                        {isConnected && (
                                            <motion.div className="w-2 h-2 rounded-full bg-green-500"
                                                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                                                transition={{ duration: 1.5, repeat: Infinity }} />
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SocialAnimatedCard;
