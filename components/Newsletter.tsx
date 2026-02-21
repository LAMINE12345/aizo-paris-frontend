import React, { useState } from 'react';
import { Translations } from '../types';
import { ArrowRight, Check } from 'lucide-react';
import Magnet from './Magnet';

interface NewsletterProps {
  t: Translations;
}

const Newsletter: React.FC<NewsletterProps> = ({ t }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) setSubscribed(true);
  };

  return (
    <section className="bg-black text-white py-32 px-6 border-t border-gray-800 overflow-hidden relative">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <h2 className="text-4xl font-bold uppercase tracking-tighter max-w-xl leading-none">
                {t.newsletter.title}
            </h2>
            <p className="text-gray-500 text-xs font-mono tracking-widest uppercase mt-4 md:mt-0">
                {t.newsletter.subtitle}
            </p>
        </div>

        {subscribed ? (
           <div className="h-[200px] flex items-center animate-fade-in" data-cursor-text="WELCOME">
              <h3 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter text-white">
                {t.newsletter.success}
              </h3>
           </div>
        ) : (
            <form onSubmit={handleSubmit} className="relative group" data-cursor-text="TYPE">
                <label htmlFor="newsletter-email" className="sr-only">{t.newsletter.placeholder}</label>
                <input 
                    id="newsletter-email"
                    name="email"
                    autoComplete="email"
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.newsletter.placeholder} 
                    className="w-full bg-transparent border-b-2 border-white/20 py-8 text-4xl md:text-8xl font-bold uppercase tracking-tighter placeholder-white/20 focus:outline-none focus:border-white transition-all text-white"
                />
                <button 
                    type="submit" 
                    className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
                    data-cursor-text="SEND"
                >
                    <Magnet strength={0.5} active={true}>
                        <div className="bg-white text-black rounded-full p-4 md:p-8 hover:scale-110 transition-transform">
                            <ArrowRight className="w-8 h-8 md:w-12 md:h-12" />
                        </div>
                    </Magnet>
                </button>
            </form>
        )}
        
        <div className="mt-12 flex flex-wrap gap-8 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            <span>No Spam</span>
            <span>Unsubscribe Anytime</span>
            <span>Exclusive Access</span>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;