import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Send, ArrowDownRight } from 'lucide-react';
import axios from 'axios';
import { STRAPI_URL } from '../constants';
import { Translations } from '../types';
import Magnet from './Magnet';

interface ContactPageProps {
  t: Translations;
}

const ContactPage: React.FC<ContactPageProps> = ({ t }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".anim-item", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2
        });
    }, containerRef);
    return () => ctx.revert();
  }, [t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(`${STRAPI_URL}/api/contact-messages`, {
        data: formData
      });
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Error sending message:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="bg-white min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Title */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-black pb-8">
            <h1 className="anim-item text-[10vw] leading-[0.8] font-bold uppercase tracking-tighter">
                {t.contactPage.title}
            </h1>
            <div className="anim-item mb-4 md:mb-8 flex flex-col gap-2 text-right">
                <span className="text-sm font-bold uppercase tracking-widest">Paris Studio</span>
                <span className="text-xs font-mono text-gray-500">15 Rue du Faubourg St-Honoré</span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Info Column */}
            <div className="lg:col-span-4 space-y-16">


                 <div className="anim-item pt-12 border-t border-zinc-200">
                     <p className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-6">Socials</p>
                     <div className="flex flex-col gap-2">
                        {[
                            { name: 'Instagram', url: 'https://www.instagram.com/aizo_paris/' },
                            { name: 'Twitter', url: 'https://x.com/AizoParis' },
                            { name: 'LinkedIn', url: 'https://fr.linkedin.com/in/thierry-mivek-19b88b9b' }
                        ].map(social => (
                            <Magnet strength={0.1} active={true} key={social.name} className="block w-full">
                                <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-lg font-bold uppercase group border-b border-zinc-100 py-2 hover:border-black transition-colors">
                                    {social.name}
                                    <ArrowDownRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </Magnet>
                        ))}
                     </div>
                 </div>
            </div>

            {/* Form Column - Massive Inputs */}
            <div className="lg:col-span-8">
                {isSent ? (
                        <div className="h-[60vh] flex flex-col items-center justify-center bg-black text-white animate-fade-in">
                            <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4 text-center px-4">
                                {t.contactPage.form.success}
                            </h3>
                            <Magnet strength={0.2} active={true}>
                                <button 
                                    onClick={() => setIsSent(false)}
                                    className="mt-12 border border-white px-8 py-3 text-xs font-bold uppercase hover:bg-white hover:text-black transition-colors"
                                >
                                    Reset
                                </button>
                            </Magnet>
                        </div>
                    ) : (
                    <form onSubmit={handleSubmit} className="space-y-12">
                        {error && (
                            <div className="text-red-500 font-bold uppercase tracking-widest text-sm">
                                {error}
                            </div>
                        )}
                        <div className="anim-item group relative">
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder={t.contactPage.form.name}
                                className="w-full border-b-2 border-zinc-200 py-8 bg-transparent text-4xl md:text-6xl font-bold uppercase tracking-tight focus:border-black focus:outline-none transition-colors placeholder-zinc-300"
                            />
                        </div>

                        <div className="anim-item group relative">
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder={t.contactPage.form.email}
                                className="w-full border-b-2 border-zinc-200 py-8 bg-transparent text-4xl md:text-6xl font-bold uppercase tracking-tight focus:border-black focus:outline-none transition-colors placeholder-zinc-300"
                            />
                        </div>

                        <div className="anim-item group relative">
                            <input 
                                type="text" 
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder={t.contactPage.form.subject}
                                className="w-full border-b-2 border-zinc-200 py-8 bg-transparent text-4xl md:text-6xl font-bold uppercase tracking-tight focus:border-black focus:outline-none transition-colors placeholder-zinc-300"
                            />
                        </div>

                        <div className="anim-item group relative">
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={1}
                                placeholder={t.contactPage.form.message}
                                className="w-full border-b-2 border-zinc-200 py-8 bg-transparent text-4xl md:text-6xl font-bold uppercase tracking-tight focus:border-black focus:outline-none transition-colors placeholder-zinc-300 resize-none h-auto overflow-hidden"
                                onInput={(e) => {
                                    e.currentTarget.style.height = 'auto';
                                    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                                }}
                            ></textarea>
                        </div>

                        <div className="anim-item pt-12">
                            <Magnet strength={0.2} active={true}>
                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className="w-full md:w-auto bg-black text-white px-12 py-6 text-xl font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:opacity-50 flex items-center gap-4 justify-center"
                                >
                                    {loading ? "Transmitting..." : t.contactPage.form.submit}
                                    <Send className="w-5 h-5" />
                                </button>
                            </Magnet>
                        </div>
                    </form>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;