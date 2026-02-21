import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Translations } from '../types';
import { Star, Zap, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MarqueeProps {
  t: Translations;
}

const Marquee: React.FC<MarqueeProps> = ({ t }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1: Left
      gsap.to(row1Ref.current, {
        xPercent: -50,
        duration: 20,
        ease: "none",
        repeat: -1
      });

      // Row 2: Right
      gsap.fromTo(row2Ref.current, 
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: 25,
          ease: "none",
          repeat: -1
        }
      );

      // Speed up on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const scrollVel = self.getVelocity();
          // Optional: modulate timescale based on scroll velocity
          // This can be complex to get right without jumpiness, so we'll keep it simple for now
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [t]);

  const Separator = () => (
    <span className="mx-8 text-zinc-500">
       <Star className="w-4 h-4 inline-block align-middle" fill="currentColor" />
    </span>
  );

  return (
    <div ref={containerRef} className="w-full bg-white text-black py-12 overflow-hidden whitespace-nowrap border-b border-black">
      
      {/* Row 1 */}
      <div className="relative flex overflow-hidden -rotate-1 origin-center py-2">
        <div ref={row1Ref} className="flex items-center whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
            <div key={`r1-${i}`} className="flex items-center">
                <span className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                {t.marquee.text}
                </span>
                <Separator />
                <span className="text-4xl md:text-6xl font-mono italic uppercase tracking-widest text-transparent stroke-black">
                Limited Edition
                </span>
                <Separator />
            </div>
            ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="relative flex overflow-hidden rotate-1 origin-center py-2 mt-4 bg-black text-white">
        <div ref={row2Ref} className="flex items-center whitespace-nowrap py-2">
            {[...Array(4)].map((_, i) => (
            <div key={`r2-${i}`} className="flex items-center">
                <span className="text-4xl md:text-6xl font-mono uppercase tracking-widest">
                Paris • Tokyo • New York
                </span>
                <span className="mx-8">
                    <Globe className="w-8 h-8 inline-block align-middle" />
                </span>
                <span className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-transparent stroke-white">
                Worldwide Shipping
                </span>
                <span className="mx-8">
                    <Zap className="w-8 h-8 inline-block align-middle" fill="currentColor" />
                </span>
            </div>
            ))}
        </div>
      </div>

      <style>{`
        .stroke-black {
          -webkit-text-stroke: 1px black;
        }
        .stroke-white {
            -webkit-text-stroke: 1px white;
        }
      `}</style>
    </div>
  );
};

export default Marquee;