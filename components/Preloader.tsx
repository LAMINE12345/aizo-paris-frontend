import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate progress number
      const progressObj = { value: 0 };
      tl.to(progressObj, {
        value: 100,
        duration: 3,
        ease: "power2.inOut",
        onUpdate: () => {
          setProgress(Math.round(progressObj.value));
        }
      });

      // Animate line width
      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 3,
        ease: "power2.inOut",
      }, 0);

      // 1. Hide the counter elements after reaching 100
      tl.to([counterRef.current, lineRef.current?.parentElement], {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
      });

    // 2. Final exit animation: Shutters
      tl.to('.shutter', {
        height: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.inOut",
        onComplete: onComplete
      }, "+=0.1");

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[1000] flex flex-col"
    >
      {/* Shutters Background */}
      <div className="absolute inset-0 flex flex-col z-0">
          {[...Array(10)].map((_, i) => (
              <div key={i} className="shutter flex-1 w-full bg-zinc-950 border-b border-zinc-800 last:border-none relative overflow-hidden">
                   <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay"></div>
              </div>
          ))}
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white overflow-hidden" ref={counterRef}>
        <div className="relative w-full max-w-2xl px-10">
            <div className="flex flex-col mb-8">
            <div className="overflow-hidden">
                <span className="block text-xs font-mono tracking-[0.5em] uppercase opacity-40 mb-2">
                System Initialization
                </span>
            </div>
            <div className="flex justify-between items-center">
                <img src="/images/logo.png" alt="AIZO PARIS" className="w-16 h-16 md:w-24 md:h-24 object-contain invert" />
                <span className="text-7xl md:text-9xl font-bold tracking-tighter tabular-nums leading-none">
                {progress}
                </span>
            </div>
            </div>
            
            {/* Progress Line */}
            <div className="h-[2px] w-full bg-white/10 relative">
            <div 
                ref={lineRef}
                className="absolute inset-0 bg-white origin-left scale-x-0"
            ></div>
            </div>

            <div className="mt-6 flex justify-between items-start font-mono text-[10px] uppercase tracking-[0.3em] opacity-30">
            <div className="flex flex-col gap-1">
                <span>Studio Edition</span>
                <span>Est. 2026</span>
            </div>
            <div className="text-right flex flex-col gap-1">
                <span>Paris / France</span>
                <span>Digital Experience</span>
            </div>
            </div>
        </div>

        {/* Background large text elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none opacity-[0.03]">
            <span className="text-[40vw] font-bold tracking-tighter leading-none select-none">AIZO</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
