import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { Translations } from '../types';
import { ArrowDown, Play } from 'lucide-react';
import Magnet from './Magnet';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  t: Translations;
}

interface HeroData {
    smallText: string;
    bigTitleLine1: string;
    bigTitleLine2: string;
    ctaText: string;
    ctaLink: string;
    video: {
        data: any; // Using any to handle both array and object structures flexibly
    };
}

const Hero: React.FC<HeroProps> = ({ t }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
        try {
            const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337';
            const response = await axios.get(`${STRAPI_URL}/api/hero?populate=*`);
            if (response.data.data) {
                 // Strapi v5 does not use .attributes, but v4 does. Check for both.
                 const data = response.data.data.attributes || response.data.data;
                 setHeroData(data);
            }
        } catch (error) {
            console.error('Error fetching hero data:', error);
        }
    };
    fetchHeroData();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", (context) => {
      if (!videoWrapperRef.current || !textRef.current || !bgRef.current || !containerRef.current) return;

      const tl = gsap.timeline();

      // Intro Animation
      tl.fromTo(videoWrapperRef.current, 
        { 
          clipPath: "inset(100% 0% 0% 0%)",
          scale: 1.2,
          filter: "grayscale(100%) blur(10px)"
        },
        { 
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          filter: "grayscale(0%) blur(0px)",
          duration: 2.2,
          ease: "expo.inOut" 
        }
      )
      .from(textRef.current?.querySelectorAll('.char') || [], {
        y: 150,
        opacity: 0,
        rotateX: -45,
        filter: "blur(10px)",
        duration: 1.8,
        stagger: 0.04,
        ease: "power4.out"
      }, "-=1.5")
      .from(containerRef.current?.querySelector('.cta-container'), {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=1");

      // Scroll Parallax Effect
      gsap.to(bgRef.current, {
        yPercent: 30,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Text Parallax (Opposite direction)
      gsap.to(textRef.current, {
        yPercent: -50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "50% top",
          scrub: true
        }
      });
    }, containerRef);

    return () => mm.revert();
  }, [t]); 

  // Split text for animation
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
        {char}
      </span>
    ));
  };

  const getVideoSrc = () => {
      // Debug logs
      console.log('HeroData:', heroData);
      
      const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337';
      
      // Check for Strapi video
      // Strapi v4 uses .data, v5 might not.
      const videoField = heroData?.video;
      if (videoField) {
          // Determine the actual data object(s)
          // If .data exists, use it. Otherwise assume videoField itself is the data (or array of data)
          const rawData = videoField.data !== undefined ? videoField.data : videoField;
          
          if (rawData) {
               // Handle array vs single object
               const item = Array.isArray(rawData) ? rawData[0] : rawData;
               
               // Handle attributes wrapper vs flat
               const attributes = item?.attributes || item;
               
               if (attributes?.url) {
                   const url = attributes.url;
                   console.log('Using Strapi video:', url);
                   return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
               }
          }
      }
      
      console.log('Using local fallback video');
      return "/images/hero.mp4";
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Video Wrapper */}
      <div 
        ref={videoWrapperRef}
        className="absolute inset-0 z-0 w-full h-full"
      >
        <video 
          ref={bgRef}
          src={getVideoSrc()}
          className="w-full h-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
        
        {/* Grain/Noise Overlay - REMOVED (Global) */}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Left Vertical Scroll Indicator */}
        <div className="absolute left-6 md:left-12 bottom-12 hidden md:flex flex-col items-center gap-6 mix-blend-difference z-20">
            <span className="text-[9px] font-black uppercase -rotate-90 origin-center tracking-[0.3em] text-white/70">Scroll</span>
            <div className="w-[1px] h-24 bg-white/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-line"></div>
            </div>
        </div>

        <div ref={textRef} className="text-center mix-blend-difference flex flex-col items-center perspective-[1000px]">
          <div className="mb-4 overflow-hidden">
            <p className="text-xs md:text-sm font-mono tracking-[1em] uppercase text-white/80">
              {splitText(heroData?.smallText || "Parisian • Brutalism • 2024")}
            </p>
          </div>
          
          <h1 className="text-[13vw] md:text-[16vw] leading-[0.8] font-black tracking-tighter uppercase flex justify-center text-white mix-blend-difference">
             {splitText(heroData?.bigTitleLine1 || "AIZO")}
          </h1>
          
          <div className="flex justify-center relative">
            <h1 className="text-[12vw] md:text-[14vw] leading-[0.85] font-bold tracking-tighter uppercase text-transparent stroke-text relative z-10">
                {splitText(heroData?.bigTitleLine2 || "PARIS")}
            </h1>
            {/* Duplicate for glitch effect/depth if needed later */}
          </div>
        </div>

        {/* Right Vertical Scroll Indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-12 animate-bounce mix-blend-difference">
            <span className="text-[10px] font-bold uppercase rotate-90 origin-center translate-y-6 tracking-[0.2em] text-white/70">Scroll</span>
            <ArrowDown className="w-4 h-4 text-white/70" />
        </div>

        <div className="absolute bottom-12 left-0 w-full px-8 flex flex-col md:flex-row justify-between items-center md:items-end gap-8 md:gap-0 cta-container">
            <div className="flex-1 flex justify-center">
               <Magnet strength={0.3} active={true}>
                 <button 
                     onClick={() => navigate(heroData?.ctaLink || '/shop')}
                     className="group relative px-10 py-5 overflow-hidden bg-white text-black rounded-full"
                 >
                     <div className="relative z-10 flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-300">
                            {heroData?.ctaText || t.hero.cta}
                        </span>
                        <ArrowDown className="w-4 h-4 -rotate-90 group-hover:text-white transition-colors duration-300" />
                     </div>
                     <div className="absolute inset-0 bg-black transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom ease-out"></div>
                 </button>
               </Magnet>
             </div>
        </div>
      </div>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.8);
        }
        @media (min-width: 768px) {
            .stroke-text {
                -webkit-text-stroke: 2px white;
            }
        }
      `}</style>
    </section>
  );
};

export default Hero;