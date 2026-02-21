import React, { useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

const PageTransition: React.FC = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [pageName, setPageName] = useState("");

  // Map paths to display names
  const getPageName = (path: string) => {
    if (!path || path === '/') return 'HOME';
    const firstPart = path.split('/')[1]; // get 'about' from '/about'
    if (!firstPart) return 'HOME';
    return firstPart.split('?')[0].toUpperCase();
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const currentName = getPageName(location.pathname);
      setPageName(currentName);

      // 1. Instant Set: Cover the screen immediately
      gsap.set(".transition-col", { yPercent: 0 });
      gsap.set(textRef.current, { opacity: 1, y: 0 });
      gsap.set(containerRef.current, { pointerEvents: "auto", display: "flex" });

      // 2. The Reveal Animation
      tl.to(textRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.6,
        delay: 0.4, // Small pause to read the text
        ease: "power3.in"
      })
      .to(".transition-col", {
        yPercent: -100,
        duration: 0.8,
        stagger: {
          each: 0.05,
          from: "start" 
        },
        ease: "expo.inOut"
      }, "-=0.3")
      .set(containerRef.current, { pointerEvents: "none", display: "none" }); // Hide after completion

    }, containerRef);

    return () => ctx.revert();
  }, [location.key]); // Trigger on every navigation event

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex flex-row pointer-events-none"
    >
      {/* 5 Vertical Columns */}
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className="transition-col flex-1 h-full bg-zinc-950 border-r border-zinc-800 last:border-r-0 relative transform translate-y-0"
        >
             {/* Optional: subtle noise or texture inside the columns */}
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        </div>
      ))}

      {/* Centered Text Overlay */}
      <div 
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center z-50 text-white mix-blend-difference overflow-hidden"
      >
         <h1 className="text-[15vw] font-bold uppercase tracking-tighter leading-none">
            {pageName}
         </h1>
      </div>
      
      {/* Loading Bar at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-50">
           <div className="transition-col h-full bg-white w-full origin-left transform scale-x-0"></div>
      </div>
    </div>
  );
};

export default PageTransition;