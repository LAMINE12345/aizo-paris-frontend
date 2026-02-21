import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Translations } from '../types';
import { useGsapReveal } from '@/hooks/useGsapReveal';

gsap.registerPlugin(ScrollTrigger);

interface EditorialProps {
  t: Translations;
}

const CIRCLE_CONFIGS = [
  { 
    selector: ".circle-bg-1", 
    y: -100, 
    scrub: 1, 
    className: "circle-bg-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-zinc-800 rounded-full pointer-events-none" 
  },
  { 
    selector: ".circle-bg-2", 
    y: -50, 
    scrub: 1.5, 
    className: "circle-bg-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-zinc-700/50 rounded-full pointer-events-none" 
  }
];

const Editorial: React.FC<EditorialProps> = ({ t }) => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGsapReveal({
    triggerRef: containerRef,
    targetRef: textRef,
    direction: "up",
    distance: 100,
    duration: 2,
    blur: 20,
    ease: "power4.out",
    start: "top 70%",
    once: true
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Circles
      CIRCLE_CONFIGS.forEach(({ selector, y, scrub }) => {
        gsap.to(selector, {
          y,
          scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, [t]);

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-zinc-950 text-zinc-100 px-6 flex items-center justify-center relative overflow-hidden" data-cursor-text={t.editorial.cursor || "MANIFESTO"}>
      {/* Background Graphic Element */}
      {CIRCLE_CONFIGS.map((circle, index) => (
        <div key={index} className={circle.className}></div>
      ))}

      <div ref={textRef} className="max-w-4xl mx-auto text-center relative z-10">
        <p className="text-2xl md:text-5xl font-bold uppercase leading-tight tracking-tight mb-12 text-zinc-100">
          "{t.editorial.text}"
        </p>
        <div className="w-[1px] h-16 bg-zinc-500 mx-auto mb-6"></div>
        <p className="text-xs font-mono tracking-[0.2em] text-zinc-400">
           {t.editorial.author}
        </p>
      </div>
    </section>
  );
};

export default Editorial;