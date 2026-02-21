import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Translations } from '../types';
import Magnet from './Magnet';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  t: Translations;
}

const About: React.FC<AboutProps> = ({ t }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Reveal for Title
      gsap.from(".about-title-reveal", {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true
        }
      });

      // Split Text Animation for Paragraphs
      gsap.from(".about-para-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 80%",
          once: true
        }
      });

      // Zoom + Rotation Reveal for Image
      gsap.from(".about-image-reveal", {
        scale: 1.2,
        rotate: 2,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true
        }
      });

      // Continuous Floating Animation for Image
      gsap.to(imageRef.current, {
        y: 30,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        
        {/* Text Content */}
        <div ref={textContainerRef} className="order-2 md:order-1">
          <span className="about-para-reveal block text-xs font-mono text-zinc-400 uppercase tracking-[0.4em] mb-6">
            L'ESSENCE DE LA MARQUE
          </span>
          <h2 className="about-title-reveal text-5xl md:text-7xl font-bold mb-10 uppercase tracking-tighter leading-[0.9]">
            {t.about.title}
          </h2>
          <div className="space-y-8 text-xl md:text-2xl font-light leading-relaxed text-black">
            <p className="about-para-reveal border-l-4 border-black pl-8 italic">
              "Le minimalisme n'est pas un manque de quelque chose. C'est simplement la quantité parfaite de tout."
            </p>
            <p className="about-para-reveal">
              {t.about.p1}
            </p>
            <p className="about-para-reveal text-zinc-500 text-lg">
              {t.about.p2}
            </p>
          </div>
          
          <div className="about-para-reveal mt-12 flex items-center gap-6">
             <Magnet strength={0.2}>
                 <button 
                   onClick={() => window.location.href = '/about'}
                   className="group relative px-8 py-4 bg-black text-white text-sm font-bold uppercase tracking-widest overflow-hidden transition-all hover:pr-12"
                 >
                   <span className="relative z-10">EN SAVOIR PLUS</span>
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                     →
                   </div>
                 </button>
             </Magnet>
          </div>
        </div>

        {/* Image Content */}
        <div className="about-image-reveal order-1 md:order-2 relative h-[600px] md:h-[800px] w-full bg-zinc-100">
           <div ref={imageRef} className="absolute inset-0 w-full h-full">
             <img 
                src="/images/about.jpeg" 
                alt="Aizo Studio" 
                className="w-full h-full object-cover"
              />
           </div>
           {/* Decorative Elements */}
           <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-zinc-100 -z-10 hidden md:block"></div>
           <div className="absolute top-10 right-10 text-[10px] font-mono uppercase tracking-[0.5em] vertical-text hidden md:block" style={{ writingMode: 'vertical-rl' }}>
             EST. 2024 PARIS
           </div>
        </div>

      </div>
    </section>
  );
};

export default About;