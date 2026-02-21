import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Translations } from '../types';
import { ArrowDown } from 'lucide-react';
import Magnet from './Magnet';

gsap.registerPlugin(ScrollTrigger);

interface AboutPageProps {
  t: Translations;
}

const AboutPage: React.FC<AboutPageProps> = ({ t }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Hero Title Animation
      gsap.from(".about-hero-char", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.2
      });

      // Image Parallax
      gsap.utils.toArray('.parallax-img-container').forEach((container: any) => {
         let img = container.querySelector('img');
         if (img) {
           gsap.to(img, {
              yPercent: 20,
              ease: "none",
              scrollTrigger: {
                  trigger: container,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true
              }
           });
         }
      });

      // Manifesto Text Reveal
      gsap.from(".manifesto-block", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto-section",
          start: "top 70%"
        }
      });

      // Values Animation
      gsap.from(".value-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".values-grid",
            start: "top 80%"
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [t]);

  // Split text helper
  const splitText = (text: string) => text.split("").map((char, i) => (
    <span key={i} className="about-hero-char inline-block">{char === " " ? "\u00A0" : char}</span>
  ));

  return (
    <div ref={containerRef} className="bg-white min-h-screen pt-32 pb-0">
      
      {/* Hero Section */}
      <section className="px-6 mb-24 md:mb-32 min-h-[60vh] flex flex-col justify-between">
        <div className="max-w-[1800px] mx-auto w-full">
            <div className="border-b border-black pb-8 mb-8 flex justify-between items-end">
                <span className="text-xs font-mono uppercase tracking-widest">Est. 2024 — Paris</span>
                <span className="text-xs font-mono uppercase tracking-widest text-right hidden md:block">
                    Architecture <br/> of Cloth
                </span>
            </div>
            
            <h1 className="text-[13vw] leading-[0.8] font-bold uppercase tracking-tighter overflow-hidden">
                {splitText("IDENTITY")}
            </h1>
             <h1 className="text-[13vw] leading-[0.8] font-bold uppercase tracking-tighter overflow-hidden text-right">
                {splitText("REDEFINED")}
            </h1>
        </div>
        
        <div className="max-w-[1800px] mx-auto w-full flex justify-between items-end mt-12">
            <ArrowDown className="w-8 h-8 animate-bounce" />
            <p className="text-sm md:text-xl font-medium uppercase max-w-md text-right leading-tight">
                {t.aboutPage.heroSubtitle}
            </p>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="manifesto-section px-6 mb-32">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
            <div className="parallax-img-container relative h-[600px] md:h-[900px] w-full overflow-hidden bg-zinc-100">
                <img 
                    src="https://picsum.photos/900/1300?random=50&grayscale" 
                    alt="Manifesto" 
                    className="w-full h-[120%] object-cover -translate-y-[10%]"
                />
                <div className="absolute bottom-0 left-0 p-8 bg-white/0 backdrop-blur-sm w-full">
                     <p className="text-xs font-mono uppercase tracking-widest text-white mix-blend-difference">
                        Fig. 01 — The Silence of Design
                     </p>
                </div>
            </div>

            <div className="flex flex-col justify-center">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-black"></span>
                    {t.aboutPage.manifestoTitle}
                </h2>
                <div className="manifesto-block text-2xl md:text-4xl lg:text-5xl font-bold uppercase leading-[1.15] space-y-2">
                    <p>{t.aboutPage.manifestoText}</p>
                </div>
                <div className="mt-16 grid grid-cols-2 gap-8 border-t border-black pt-8">
                    <div>
                        <span className="block text-4xl font-bold mb-2">01</span>
                        <span className="text-xs font-mono uppercase text-zinc-500">Concept</span>
                    </div>
                     <div>
                        <span className="block text-4xl font-bold mb-2">02</span>
                        <span className="text-xs font-mono uppercase text-zinc-500">Creation</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Values Section - Full Width Black */}
      <section className="bg-black text-white py-32 px-6">
        <div className="max-w-[1800px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 pb-8 border-b border-white/20">
                <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
                    Core<br/>Pillars
                </h2>
                <p className="text-zinc-400 text-sm font-mono uppercase tracking-widest max-w-xs mt-8 md:mt-0">
                    {t.aboutPage.values.title}
                </p>
            </div>

            <div className="values-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
                {t.aboutPage.values.items.map((item, idx) => (
                    <div key={idx} className="value-item border-l border-white/20 pl-8 md:pl-12 py-8 group hover:bg-white/5 transition-colors duration-500">
                        <span className="block text-xs font-mono text-zinc-500 mb-12">0{idx + 1}</span>
                        <Magnet strength={0.1} active={true} className="inline-block">
                            <h3 className="text-3xl font-bold uppercase mb-6 group-hover:translate-x-2 transition-transform duration-300 inline-block">
                                {item.title}
                            </h3>
                        </Magnet>
                        <p className="text-zinc-400 text-lg leading-relaxed max-w-sm">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Studio Section - Image Grid */}
      <section className="py-32 px-6">
          <div className="max-w-[1800px] mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                   <div className="md:col-span-5 sticky top-32">
                        <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-8">
                            The<br/>Studio
                        </h2>
                        <p className="text-xl font-medium uppercase leading-relaxed mb-12">
                            {t.aboutPage.studio.text}
                        </p>
                        <div className="flex items-center gap-4">
                             <div className="w-12 h-[1px] bg-black"></div>
                             <span className="text-xs font-mono uppercase tracking-widest">Paris, 75008</span>
                        </div>
                   </div>

                   <div className="md:col-span-7 grid grid-cols-1 gap-8">
                       <div className="parallax-img-container h-[500px] w-full overflow-hidden bg-zinc-200">
                            <img src="https://picsum.photos/1000/800?random=52&grayscale" className="w-full h-[120%] object-cover -translate-y-[10%]" alt="Studio Detail" />
                       </div>
                       <div className="grid grid-cols-2 gap-8">
                            <div className="parallax-img-container h-[400px] w-full overflow-hidden bg-zinc-200">
                                <img src="https://picsum.photos/600/800?random=53&grayscale" className="w-full h-[120%] object-cover -translate-y-[10%]" alt="Fabric" />
                            </div>
                            <div className="parallax-img-container h-[400px] w-full overflow-hidden bg-zinc-200 mt-12">
                                <img src="https://picsum.photos/600/800?random=54&grayscale" className="w-full h-[120%] object-cover -translate-y-[10%]" alt="Process" />
                            </div>
                       </div>
                   </div>
               </div>
          </div>
      </section>
    </div>
  );
};

export default AboutPage;