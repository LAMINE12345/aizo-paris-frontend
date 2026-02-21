import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, Send, Mail } from 'lucide-react';
import { Translations } from '../types';
import Magnet from './Magnet';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, t }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.5, pointerEvents: 'auto', ease: "power2.out" });
        gsap.fromTo(modalRef.current, 
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "expo.out", delay: 0.1 }
        );
      } else {
        gsap.to(modalRef.current, { y: 20, opacity: 0, scale: 0.95, duration: 0.4, ease: "power2.in" });
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, pointerEvents: 'none', delay: 0.1 });
        setTimeout(() => setIsSent(false), 500);
      }
    }, overlayRef);

    return () => ctx.revert();
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[110] bg-zinc-950/40 backdrop-blur-md flex items-center justify-center p-4 opacity-0 pointer-events-none transition-colors duration-500"
      onClick={onClose}
    >
      <div 
        ref={modalRef} 
        className="bg-[#FDFDFD] w-full max-w-lg p-8 md:p-12 relative shadow-2xl rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-6 right-6 z-10">
            <Magnet strength={0.2}>
                <button 
                    onClick={onClose} 
                    className="p-2 hover:bg-zinc-100 rounded-full transition-colors duration-300 group"
                    aria-label="Close Modal"
                >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                </button>
            </Magnet>
        </div>

        <div className="mb-8">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-2">Get in touch</span>
            <h3 className="text-4xl font-bold uppercase tracking-tighter">{t.contact.title}</h3>
        </div>

        {isSent ? (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
             <div className="w-20 h-20 bg-zinc-100 text-black rounded-full flex items-center justify-center mb-6 relative overflow-hidden">
                 <div className="absolute inset-0 bg-green-500/10 scale-0 animate-[ping_1s_ease-out_forwards]"></div>
                 <Send className="w-8 h-8 relative z-10" />
             </div>
             <p className="text-xl font-bold uppercase tracking-tight text-center mb-2">{t.contact.success}</p>
             <p className="text-zinc-500 text-sm text-center max-w-xs">We'll get back to you as soon as possible.</p>
             
             <Magnet strength={0.2} active={true}>
                <button 
                    onClick={onClose}
                    className="mt-8 text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-zinc-600 hover:border-zinc-400 transition-all"
                >
                    Close Window
                </button>
            </Magnet>
          </div>
        ) : (
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="group">
              <label htmlFor="contact-name" className="block text-xs font-bold uppercase mb-2 ml-1 text-zinc-400 group-focus-within:text-black transition-colors">{t.contact.name}</label>
              <input 
                id="contact-name"
                name="name"
                autoComplete="name"
                type="text" 
                required
                className="w-full border-b border-zinc-200 py-3 bg-transparent text-lg focus:border-black focus:outline-none transition-all placeholder-zinc-300"
                placeholder="John Doe"
              />
            </div>
            <div className="group">
              <label htmlFor="contact-email" className="block text-xs font-bold uppercase mb-2 ml-1 text-zinc-400 group-focus-within:text-black transition-colors">{t.contact.email}</label>
              <input 
                id="contact-email"
                name="email"
                autoComplete="email"
                type="email" 
                required
                className="w-full border-b border-zinc-200 py-3 bg-transparent text-lg focus:border-black focus:outline-none transition-all placeholder-zinc-300"
                placeholder="john@example.com"
              />
            </div>
            <div className="group">
              <label htmlFor="contact-message" className="block text-xs font-bold uppercase mb-2 ml-1 text-zinc-400 group-focus-within:text-black transition-colors">{t.contact.message}</label>
              <textarea 
                id="contact-message"
                name="message"
                required
                rows={4}
                className="w-full border-b border-zinc-200 py-3 bg-transparent text-lg focus:border-black focus:outline-none transition-all resize-none placeholder-zinc-300"
                placeholder="How can we help?"
              ></textarea>
            </div>

            <Magnet strength={0.2} active={true} className="block w-full">
                <button 
                type="submit"
                className="w-full bg-black text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] flex items-center justify-center gap-2 group"
                >
                <span>{t.contact.submit}</span>
                <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </Magnet>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;