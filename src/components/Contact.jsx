import React from 'react';
import { motion } from 'framer-motion'
import { Mail, MessageSquare, Send, Check } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { Turnstile } from '@marsidev/react-turnstile'

const Contact = () => {
    const { t, language } = useLanguage()


    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = React.useState('idle'); // idle, loading, success, error
    const [turnstileToken, setTurnstileToken] = React.useState(''); // Turnstile State

    // Captcha State
    const [captcha, setCaptcha] = React.useState({ num1: 0, num2: 0, userAnswer: '' });

    // Generate new captcha
    const generateCaptcha = () => {
        setCaptcha({
            num1: Math.floor(Math.random() * 10) + 1,
            num2: Math.floor(Math.random() * 10) + 1,
            userAnswer: ''
        });
    };

    // Initialize captcha on mount
    React.useEffect(() => {
        generateCaptcha();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. CAPTCHA VALIDATION
        if (parseInt(captcha.userAnswer) !== captcha.num1 + captcha.num2) {
            alert(t.contact.error_msg ? "Incorrect Captcha. Try again." : "Calcul incorrect ! Réessayez.");
            generateCaptcha(); // 
            return;
        }

        // 2. TURNSTILE VALIDATION
        if (!turnstileToken) {
            alert("Veuillez valider le test de sécurité (Turnstile) / Please check the security box.");
            return;
        }

        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, turnstileToken, language }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
                generateCaptcha(); // Reset captcha on success
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                // Handle Rate Limit (429) or other errors
                if (response.status === 429) {
                    alert("Trop de requêtes ! Attendez 15 min.");
                }
                setStatus('error');
                generateCaptcha();
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-primary-900/10 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-12"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">{t.contact.title} <span className="gradient-text">{t.contact.title_highlight}</span></h2>
                        <p className="text-slate-600 dark:text-gray-400">
                            {t.contact.description}
                        </p>
                    </div>

                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
                        >
                            <Check size={18} />
                            {t.contact.success_msg}
                        </motion.div>
                    )}

                    {status === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6 text-sm"
                        >
                            <div className="font-bold flex items-center gap-2 mb-1">
                                ⚠️ {t.contact.error_msg || "Oups, une erreur est survenue."}
                            </div>
                            <p>
                                Pas de panique ! Vous pouvez me contacter directement par mail :<br />
                                <a href="mailto:contact@wassidev.fr" className="underline font-bold hover:text-red-700 dark:hover:text-red-300">contact@wassidev.fr</a>
                            </p>
                        </motion.div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-slate-600 dark:text-gray-400">{t.contact.lastname}</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder={t.contact.placeholder_lastname}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-slate-600 dark:text-gray-400">{t.contact.firstname}</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder={t.contact.placeholder_firstname}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-slate-600 dark:text-gray-400">{t.contact.email}</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-slate-600 dark:text-gray-400">Téléphone / Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="+33 6 12 34 56 78"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-slate-600 dark:text-gray-400">{t.contact.message}</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 transition-colors"
                                placeholder={t.contact.placeholder_msg}
                            ></textarea>
                        </div>

                        {/* --- SECURITY CHECK (MATH + TURNSTILE) --- */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-600 dark:text-gray-400 flex items-center gap-2">
                                Security Check / Sécurité 🛡️
                            </label>
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                {/* Math Captcha */}
                                <div className="flex items-center gap-4">
                                    <span className="bg-slate-200 dark:bg-white/10 px-4 py-2 rounded-lg font-mono text-lg font-bold select-none text-slate-800 dark:text-white">
                                        {captcha.num1} + {captcha.num2} = ?
                                    </span>
                                    <input
                                        type="number"
                                        value={captcha.userAnswer}
                                        onChange={(e) => setCaptcha({ ...captcha, userAnswer: e.target.value })}
                                        required
                                        className="w-24 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-center font-bold text-slate-900 dark:text-white focus:outline-none focus:border-primary-500"
                                        placeholder="0"
                                    />
                                </div>

                                {/* Cloudflare Turnstile */}
                                <div className="h-[65px]"> {/* Fixed height to prevent layout shift */}
                                    <Turnstile
                                        siteKey="0x4AAAAAACM_irMrQGQHDVhU"
                                        onSuccess={setTurnstileToken}
                                        options={{ theme: 'auto' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={status === 'loading'}
                            className={`w-full font-medium py-4 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${status === 'loading' ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 text-white'}`}
                        >
                            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Error. Try Again.' : t.contact.send}
                            {status === 'idle' && <Send size={20} />}
                        </button>
                    </form>

                    <div className="mt-10 flex justify-center gap-8 text-sm text-slate-500 dark:text-gray-500">
                        <div className="flex items-center gap-2">
                            <Mail size={16} /> contact@wassidev.fr
                        </div>
                        <div className="flex items-center gap-2">
                            <MessageSquare size={16} /> Available for Freelance
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Contact
