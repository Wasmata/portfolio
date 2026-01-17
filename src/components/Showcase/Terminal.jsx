import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon, Minimize2, Maximize2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// --- PONG GAME COMPONENT ---
const PongGame = ({ onClose }) => {
    const width = 40;
    const height = 15;
    const [ball, setBall] = useState({ x: 20, y: 7, dx: 0.5, dy: 0.5 }); // Slower speed per tick, faster ticks
    const [p1Y, setP1Y] = useState(6);
    const [p2Y, setP2Y] = useState(6);
    const [score, setScore] = useState({ p1: 0, p2: 0 });
    const keysPressed = useRef({}); // Track keys for smooth movement

    // Controls tracking
    useEffect(() => {
        const handleKeyDown = (e) => (keysPressed.current[e.key] = true);
        const handleKeyUp = (e) => (keysPressed.current[e.key] = false);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Game Loop (30ms = ~33 FPS)
    useEffect(() => {
        const interval = setInterval(() => {
            // 1. Update Paddles (Smooth Movement)
            if (keysPressed.current['w'] || keysPressed.current['ArrowUp']) {
                setP1Y(y => Math.max(y - 0.5, 0));
            }
            if (keysPressed.current['s'] || keysPressed.current['ArrowDown']) {
                setP1Y(y => Math.min(y + 0.5, height - 3));
            }
            if (keysPressed.current['Escape']) {
                onClose();
            }

            // 2. Update Ball
            setBall(prev => {
                let newX = prev.x + prev.dx;
                let newY = prev.y + prev.dy;
                let newDx = prev.dx;
                let newDy = prev.dy;

                // Wall Collisions
                if (newY <= 0 || newY >= height - 1) newDy = -newDy;

                // Paddle Collisions
                // P1 (Left)
                if (newX <= 1 && newX >= 0 && newY >= p1Y && newY < p1Y + 3) {
                    newDx = Math.abs(newDx); // Force right
                    newX = 1; // Unstick
                }
                // P2 (Right)
                if (newX >= width - 2 && newX <= width - 1 && newY >= p2Y && newY < p2Y + 3) {
                    newDx = -Math.abs(newDx); // Force left
                    newX = width - 2; // Unstick
                }

                // Scoring (Out of bounds)
                if (newX < -1) {
                    setScore(s => ({ ...s, p2: s.p2 + 1 }));
                    return { x: 20, y: 7, dx: 0.5, dy: 0.5 }; // Reset
                }
                if (newX > width + 1) {
                    setScore(s => ({ ...s, p1: s.p1 + 1 }));
                    return { x: 20, y: 7, dx: -0.5, dy: 0.5 }; // Reset
                }

                return { x: newX, y: newY, dx: newDx, dy: newDy };
            });

            // 3. AI Logic
            setP2Y(prev => {
                const center = prev + 1.5;
                // AI moves slightly slower than ball
                if (ball.y > center + 0.5) return Math.min(prev + 0.3, height - 3);
                if (ball.y < center - 0.5) return Math.max(prev - 0.3, 0);
                return prev;
            });

        }, 30);

        return () => clearInterval(interval);
    }, [ball, p1Y, p2Y, onClose]); // Dependencies might trigger re-creation, ideally keep minimal

    // Render ASCII Grid
    const renderGrid = () => {
        let grid = [];
        for (let y = 0; y < height; y++) {
            let row = "";
            for (let x = 0; x < width; x++) {
                if (Math.round(ball.x) === x && Math.round(ball.y) === y) row += "O";
                else if (x === 0 && y >= p1Y && y < p1Y + 3) row += "|";
                else if (x === width - 1 && y >= p2Y && y < p2Y + 3) row += "|";
                else if (x === width / 2) row += ".";
                else row += " ";
            }
            grid.push(row);
        }
        return grid.join('\n');
    };

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-4 font-mono select-none">
            <div className="text-xl font-bold text-green-400">PONG - WASSI EDITION</div>
            <div className="flex gap-8 text-white">
                <span>YOU: {score.p1}</span>
                <span>CPU: {score.p2}</span>
            </div>
            <pre className="bg-[#0a0a0a] p-4 rounded border border-white/20 text-white leading-none tracking-widest">
                {renderGrid()}
            </pre>
            <div className="text-xs text-slate-500">Smooth Controls: Hold W/S | ESC to Quit</div>
            <button onClick={onClose} className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 text-xs">Exit Game</button>
        </div>
    );
};

const Terminal = ({ isOpen, onClose }) => {
    const { t, language } = useLanguage();
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', content: 'Welcome to WassiOS v1.0.0' },
        { type: 'system', content: 'Type "help" to see available commands.' },
    ]);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    // Game State
    // "guess" | "pong" | null
    const [activeMiniGame, setActiveMiniGame] = useState(null);
    const [targetNumber, setTargetNumber] = useState(0);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (!activeMiniGame) {
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.overflowX = 'hidden'; // Restore default
        };
    }, [isOpen, activeMiniGame]);

    const handleCommand = (cmd) => {
        const cleanCmd = cmd.trim().toLowerCase();

        // --- GUESS GAME LOGIC ---
        if (activeMiniGame === 'guess') {
            if (cleanCmd === 'exit' || cleanCmd === 'quit') {
                setActiveMiniGame(null);
                setHistory(prev => [...prev, { type: 'command', content: cmd }, { type: 'info', content: 'Game exited.' }]);
                return;
            }

            const guess = parseInt(cleanCmd);
            if (isNaN(guess)) {
                setHistory(prev => [...prev, { type: 'command', content: cmd }, { type: 'error', content: 'Please enter a valid number or "exit".' }]);
                return;
            }

            let response;
            if (guess === targetNumber) {
                response = { type: 'success', content: `🎉 Correct! The number was ${targetNumber}. You win!` };
                setActiveMiniGame(null);
            } else if (guess < targetNumber) {
                response = { type: 'info', content: '📈 Higher!' };
            } else {
                response = { type: 'info', content: '📉 Lower!' };
            }

            setHistory(prev => [...prev, { type: 'command', content: cmd }, response]);
            return;
        }

        // --- STANDARD COMMANDS ---
        let response = null;

        switch (cleanCmd) {
            case 'help':
                response = {
                    type: 'success',
                    content: `Available commands:
  - help      : Show this help message
  - about     : Who is Wassim?
  - skills    : List technical skills
  - contact   : Get contact info
  - game      : Play "Guess the Number"
  - pong      : Play "Pong" (Arcade)
  - clear     : Clear terminal history
  - exit      : Close terminal`
                };
                break;
            case 'pong':
                setActiveMiniGame('pong');
                return; // Special view, no history append
            case 'about':
                const aboutContent = language === 'fr' ? `👋 IDENTITÉ
Nom: Wassim M.
Âge: 20 ans
Rôle: Développeur Full Stack

🎓 FORMATION
• École 42 (La référence du code)
• Bac STI2D (Sciences & Technologies)

🚀 PARCOURS
• Code depuis la 3ème
• Créateur de "JeuxCracks" (Toujours en ligne, +5 ans de maintenance)

💎 PHILOSOPHIE
"L'autonomie est clé."
Je maîtrise tout le cycle web :
Idée 💡 → Design 🎨 → Dev 💻 → Déploiement (CI/CD) 🚀 → Maintenance 🛠️.` : `👋 IDENTITY
Name: Wassim M.
Age: 20 years old
Role: Full Stack Developer

🎓 EDUCATION
• École 42 (Excellence in Computer Science)
• Bac STI2D (Science & Technology)

🚀 JOURNEY
• Started coding in 9th grade (3ème)
• Founder of "JeuxCracks" (Still active, 5+ years of maintenance)

💎 PHILOSOPHY
"Autonomy is key."
I strive to master the entire web lifecycle:
From Idea 💡 → Design 🎨 → Dev 💻 → Deployment (CI/CD) 🚀 → Maintenance 🛠️.`;
                response = {
                    type: 'info',
                    content: aboutContent
                };
                break;
            case 'skills':
                response = {
                    type: 'success',
                    content: `[CORE] React, Node.js, Django, Python
[DEVOPS] Docker, Linux, CI/CD, Nginx
[DESIGN] TailwindCSS, Framer Motion, Figma`
                };
                break;
            case 'contact':
                response = { type: 'info', content: 'Email: contact@wassidev.fr\nLink: wassidev.fr' };
                break;
            case 'game':
                const secret = Math.floor(Math.random() * 100) + 1;
                setTargetNumber(secret);
                setActiveMiniGame('guess');
                response = { type: 'success', content: '🎮 Guess the Number Game Started!\nI am thinking of a number between 1 and 100.\nType your guess below (or "exit" to quit):' };
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'exit':
                onClose();
                return;
            case '':
                return;
            default:
                response = { type: 'error', content: `Command not found: ${cleanCmd}. Type "help" for assistance.` };
        }

        setHistory(prev => [
            ...prev,
            { type: 'command', content: cmd },
            response
        ].filter(Boolean));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full max-w-2xl bg-[#0f172a] rounded-lg shadow-2xl border border-slate-700 overflow-hidden font-mono text-sm md:text-base relative"
                    >
                        {/* Title Bar */}
                        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                            <div className="flex items-center gap-2 text-slate-400">
                                <TerminalIcon size={16} />
                                <span>guest@wassim-portfolio:~{activeMiniGame ? `/${activeMiniGame}` : ''}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-white">
                                    <Minimize2 size={16} />
                                </button>
                                <button onClick={onClose} className="p-1 hover:bg-red-500/20 rounded transition-colors text-slate-400 hover:text-red-400">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* CONTENT AREA SWAP */}
                        {activeMiniGame === 'pong' ? (
                            <div className="h-[400px]">
                                <PongGame onClose={() => setActiveMiniGame(null)} />
                            </div>
                        ) : (
                            // Standard Terminal Content
                            <div
                                className="p-6 h-[400px] overflow-y-auto custom-scrollbar text-slate-300"
                                onClick={() => inputRef.current?.focus()}
                            >
                                {history.map((entry, i) => (
                                    <div key={i} className="mb-2 whitespace-pre-wrap">
                                        {entry.type === 'command' ? (
                                            <div className="flex gap-2">
                                                <span className="text-green-500">➜</span>
                                                <span className="text-cyan-400">~</span>
                                                <span className="text-white">{entry.content}</span>
                                            </div>
                                        ) : (
                                            <div className={`
                                                ${entry.type === 'error' ? 'text-red-400' : ''}
                                                ${entry.type === 'success' ? 'text-green-400' : ''}
                                                ${entry.type === 'info' ? 'text-blue-300' : ''}
                                                ${entry.type === 'system' ? 'text-slate-500 italic' : ''}
                                            `}>
                                                {entry.content}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Input Line */}
                                <div className="flex gap-2 items-center mt-2">
                                    <span className="text-green-500">➜</span>
                                    <span className="text-cyan-400">~{activeMiniGame === 'guess' ? '/guess' : ''}</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="bg-transparent border-none outline-none flex-1 text-white placeholder-slate-600"
                                        autoComplete="off"
                                        spellCheck="false"
                                        placeholder={activeMiniGame === 'guess' ? 'Enter number...' : ''}
                                    />
                                </div>
                                <div ref={bottomRef} />
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Terminal;
