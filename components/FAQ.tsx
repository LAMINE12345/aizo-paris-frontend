import React, { useRef, useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import gsap from 'gsap';
import Magnet from './Magnet';
import { Translations } from '../types';

interface FAQProps {
  t: Translations;
}

const FAQItem: React.FC<{ item: { question: string; answer: string } }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (isOpen) {
        gsap.to(contentRef.current, { height: 'auto', duration: 0.4, ease: 'power3.out' });
        gsap.fromTo(answerRef.current, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, delay: 0.1 });
    } else {
        gsap.to(contentRef.current, { height: 0, duration: 0.3, ease: 'power3.in' });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-zinc-200 py-4">
      <Magnet strength={0.05} active={true} className="block w-full">
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center text-left hover:text-zinc-600 transition-colors py-4 group"
        >
            <span className="text-lg font-bold uppercase tracking-tight group-hover:pl-4 transition-all duration-300">{item.question}</span>
            <span className="relative w-6 h-6 flex items-center justify-center">
                <div className={`absolute transition-transform duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}><Plus className="w-5 h-5" /></div>
                <div className={`absolute transition-transform duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}><Minus className="w-5 h-5" /></div>
            </span>
        </button>
      </Magnet>
      <div ref={contentRef} className="h-0 overflow-hidden">
        <p ref={answerRef} className="pb-8 pt-2 text-zinc-500 text-sm leading-relaxed max-w-2xl font-mono">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC<FAQProps> = ({ t }) => {
  return (
    <section className="py-24 bg-zinc-50 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-12 text-center text-zinc-900">
          {t.faq.title}
        </h2>
        <div className="space-y-2">
          {t.faq.items.map((item, idx) => (
            <FAQItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;