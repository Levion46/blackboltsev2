import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link2 } from 'lucide-react';

interface LoaderConfig { enabled: boolean; delay?: number; duration?: number; }
interface LinkItem { text: string; }
interface Message {
    id: number; sender: 'left' | 'right';
    type: 'text' | 'image' | 'text-with-links';
    content: string; maxWidth?: string;
    loader?: LoaderConfig; links?: LinkItem[];
}
interface Person { name: string; avatar: string; }
interface ChatStyle {
    backgroundColor: string; textColor: string;
    borderColor: string; showBorder: boolean; nameColor?: string;
}
interface LinkBubbleStyle {
    backgroundColor: string; textColor: string;
    iconColor: string; borderColor: string;
}
interface UiConfig {
    containerWidth?: number; containerHeight?: number;
    backgroundColor?: string; autoRestart?: boolean; restartDelay?: number;
    loader?: { dotColor?: string };
    linkBubbles?: LinkBubbleStyle;
    leftChat?: ChatStyle; rightChat?: ChatStyle;
}
interface ChatConfig { leftPerson: Person; rightPerson: Person; messages: Message[]; }
export interface ChatComponentProps { config: ChatConfig; uiConfig?: UiConfig; }

const MessageLoader = React.memo(({ dotColor = '#6ee7b7' }: { dotColor?: string }) => (
    <motion.div className="flex items-center gap-1 px-3 py-2"
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
        {[0, 0.15, 0.3].map((delay, i) => (
            <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }}
                animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay }} />
        ))}
    </motion.div>
));
MessageLoader.displayName = 'MessageLoader';

const LinkBadge = React.memo(({ link, linkStyle }: { link: LinkItem; linkStyle: LinkBubbleStyle }) => (
    <div className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs border tracking-wider"
        style={{ backgroundColor: linkStyle.backgroundColor, color: linkStyle.textColor, borderColor: linkStyle.borderColor }}>
        <Link2 size={12} color={linkStyle.iconColor} />
        <span>{link.text}</span>
    </div>
));
LinkBadge.displayName = 'LinkBadge';

const MessageBubble = React.memo(({ message, isLeft, uiConfig, onContentReady, isLoading, isVisible }: {
    message: Message; isLeft: boolean; uiConfig: Required<UiConfig>;
    onContentReady?: () => void; isLoading: boolean; isVisible: boolean;
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const chatStyle = isLeft ? uiConfig.leftChat! : uiConfig.rightChat!;
    useEffect(() => { if (isVisible && message.type !== 'image') onContentReady?.(); }, [isVisible, message.type, onContentReady]);
    const handleImageLoad = useCallback(() => { setImageLoaded(true); onContentReady?.(); }, [onContentReady]);
    const bubbleStyle = useMemo(() => ({
        backgroundColor: chatStyle.backgroundColor, color: chatStyle.textColor,
        borderColor: chatStyle.borderColor, borderWidth: chatStyle.showBorder ? '0.5px' : '0'
    }), [chatStyle]);
    const roundedClass = isLeft ? 'rounded-br-lg rounded-tl-lg rounded-tr-lg' : 'rounded-bl-lg rounded-tl-lg rounded-tr-lg';
    const paddingClass = message.type === 'image' ? 'p-1' : 'p-3';
    return (
        <div className={`${roundedClass} ${paddingClass} ${message.maxWidth || 'max-w-xs'} border-solid relative`} style={bubbleStyle}>
            <AnimatePresence mode="wait">
                {isLoading && !isVisible ? (
                    <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                        <MessageLoader dotColor={uiConfig.loader?.dotColor} />
                    </motion.div>
                ) : isVisible ? (
                    <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        {message.type === 'text' && <p className="text-xs leading-relaxed" style={{ color: chatStyle.textColor }}>{message.content}</p>}
                        {message.type === 'image' && (
                            <div className="relative">
                                {!imageLoaded && <div className="w-full h-20 flex items-center justify-center"><MessageLoader dotColor={uiConfig.loader?.dotColor} /></div>}
                                <img src={message.content} alt="Chat" className={`rounded max-h-28 w-auto object-cover ${!imageLoaded ? 'hidden' : ''}`} onLoad={handleImageLoad} />
                            </div>
                        )}
                        {message.type === 'text-with-links' && (
                            <div>
                                <p className="text-xs leading-relaxed mb-2" style={{ color: chatStyle.textColor }}>{message.content}</p>
                                <div className="flex flex-wrap gap-1">
                                    {message.links?.map((link, i) => <LinkBadge key={i} link={link} linkStyle={uiConfig.linkBubbles!} />)}
                                </div>
                            </div>
                        )}
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
});
MessageBubble.displayName = 'MessageBubble';

const MessageWrapper = React.memo(({ message, config, uiConfig, previousMessageComplete, onMessageComplete, previousMessage, nextMessage, onVisibilityChange, isNextVisible }: {
    message: Message; config: ChatConfig; uiConfig: Required<UiConfig>;
    previousMessageComplete: boolean; onMessageComplete?: (id: number) => void;
    previousMessage: Message | null; nextMessage: Message | null;
    onVisibilityChange?: (id: number) => void; isNextVisible: boolean;
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [done, setDone] = useState(false);
    const isLeft = message.sender === 'left';
    const person = isLeft ? config.leftPerson : config.rightPerson;
    const chatStyle = isLeft ? uiConfig.leftChat! : uiConfig.rightChat!;
    const isContinuation = previousMessage?.sender === message.sender;
    const nextSameSender = nextMessage?.sender === message.sender;
    const showAvatar = !nextSameSender || !isNextVisible;
    useEffect(() => {
        if (!previousMessageComplete) return;
        const delay = 400; const dur = message.loader?.duration || 1000;
        if (message.loader?.enabled) {
            const t1 = setTimeout(() => setIsLoading(true), delay);
            const t2 = setTimeout(() => { setIsLoading(false); setIsVisible(true); onVisibilityChange?.(message.id); }, delay + dur);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        } else {
            const t = setTimeout(() => { setIsVisible(true); onVisibilityChange?.(message.id); }, 0);
            return () => clearTimeout(t);
        }
    }, [message, previousMessageComplete, onVisibilityChange]);
    const handleContentReady = useCallback(() => {
        if (!done) { setDone(true); setTimeout(() => onMessageComplete?.(message.id), 300); }
    }, [done, onMessageComplete, message.id]);
    if (!isLoading && !isVisible) return null;
    return (
        <div className={isLeft ? 'flex items-end gap-2' : 'flex items-end gap-2 flex-row-reverse'}>
            <AnimatePresence mode="wait">
                {showAvatar ? (
                    <motion.img key="avatar" src={person.avatar} alt={person.name}
                        className="w-6 h-6 rounded-full object-cover flex-shrink-0 border border-white/20"
                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }} transition={{ duration: 0.2 }} />
                ) : <div className="w-6 h-6 flex-shrink-0" key="spacer" />}
            </AnimatePresence>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }} className="flex flex-col"
                style={{ alignItems: isLeft ? 'flex-start' : 'flex-end' }}>
                {!isContinuation && (
                    <motion.div className="text-[10px] mb-1" style={{ color: chatStyle.nameColor || '#6ee7b7' }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        {person.name}
                    </motion.div>
                )}
                <MessageBubble message={message} isLeft={isLeft} uiConfig={uiConfig}
                    onContentReady={handleContentReady} isLoading={isLoading} isVisible={isVisible} />
            </motion.div>
        </div>
    );
});
MessageWrapper.displayName = 'MessageWrapper';

const ChatComponent: React.FC<ChatComponentProps> = ({ config, uiConfig = {} }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [completedMessages, setCompletedMessages] = useState<number[]>([]);
    const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
    const [key, setKey] = useState(0);
    const defaults: Required<UiConfig> = {
        containerWidth: 400, containerHeight: 340, backgroundColor: 'transparent',
        autoRestart: true, restartDelay: 4000,
        loader: { dotColor: '#6ee7b7' },
        linkBubbles: { backgroundColor: '#064e3b', textColor: '#6ee7b7', iconColor: '#6ee7b7', borderColor: '#065f46' },
        leftChat: { backgroundColor: 'rgba(255,255,255,0.07)', textColor: '#e2e8f0', borderColor: 'rgba(255,255,255,0.1)', showBorder: true, nameColor: '#6ee7b7' },
        rightChat: { backgroundColor: 'rgba(52,211,153,0.15)', textColor: '#e2e8f0', borderColor: 'rgba(52,211,153,0.2)', showBorder: true, nameColor: '#a7f3d0' },
    };
    const ui: Required<UiConfig> = { ...defaults, ...uiConfig } as Required<UiConfig>;
    const handleMessageComplete = useCallback((id: number) => {
        setCompletedMessages(prev => {
            const next = [...prev, id];
            if (next.length === config.messages.length && ui.autoRestart) {
                setTimeout(() => { setCompletedMessages([]); setVisibleMessages([]); setKey(k => k + 1); }, ui.restartDelay);
            }
            return next;
        });
    }, [config.messages.length, ui.autoRestart, ui.restartDelay]);
    const handleVisibilityChange = useCallback((id: number) => {
        setVisibleMessages(prev => prev.includes(id) ? prev : [...prev, id]);
    }, []);
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, []);
    useEffect(() => {
        const obs = new MutationObserver(scrollToBottom);
        if (containerRef.current) obs.observe(containerRef.current, { childList: true, subtree: true });
        return () => obs.disconnect();
    }, [key, scrollToBottom]);
    useEffect(() => { scrollToBottom(); }, [completedMessages, scrollToBottom]);
    const topFade = `linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)`;
    return (
        <div key={key} className="relative w-full rounded-lg overflow-hidden"
            style={{ height: `${ui.containerHeight}px` }}>
            <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10" style={{ background: topFade }} />
            {/* overflow-hidden (NOT overflow-y-auto) so browser never treats this as a scroll container */}
            <div ref={containerRef} className="p-4 h-full overflow-hidden" style={{ scrollbarWidth: 'none' }}>
                <div className="min-h-full flex flex-col justify-end gap-0">
                    {config.messages.map((msg, i) => {
                        const prevDone = i === 0 || completedMessages.includes(config.messages[i - 1].id);
                        const prev = i > 0 ? config.messages[i - 1] : null;
                        const next = i < config.messages.length - 1 ? config.messages[i + 1] : null;
                        const nextVisible = next ? visibleMessages.includes(next.id) : false;
                        const cont = prev?.sender === msg.sender;
                        return (
                            <div key={msg.id} className={i === 0 ? '' : cont ? 'mt-1' : 'mt-5'}>
                                <MessageWrapper message={msg} config={config} uiConfig={ui}
                                    previousMessageComplete={prevDone} onMessageComplete={handleMessageComplete}
                                    onVisibilityChange={handleVisibilityChange}
                                    previousMessage={prev} nextMessage={next} isNextVisible={nextVisible} />
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
