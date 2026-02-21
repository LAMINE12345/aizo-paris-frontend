import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Translations } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface EditorialProps {
  t: Translations;
}

const Editorial: React.FC<EditorialProps> = ({ t }) => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text Reveal
      gsap.from(textRef.current, {
        y: 100,
        opacity: 0,
        filter: "blur(20px)",
        duration: 2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true
        }
      });

      // Parallax Circles
      gsap.to(".circle-bg-1", {
        y: -100,
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
      });

      gsap.to(".circle-bg-2", {
        y: -50,
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-zinc-950 text-zinc-100 px-6 flex items-center justify-center relative overflow-hidden" data-cursor-text="MANIFESTO">
      {/* Background Graphic Element */}
      <div className="circle-bg-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-zinc-800 rounded-full pointer-events-none"></div>
      <div className="circle-bg-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-zinc-700/50 rounded-full pointer-events-none"></div>

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