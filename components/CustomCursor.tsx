import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const textEl = textRef.current;
    
    if (!cursor || !follower) return;

    // Set initial positions
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    // Use quickSetter for better performance
    const xSetCursor = gsap.quickSetter(cursor, "x", "px");
    const ySetCursor = gsap.quickSetter(cursor, "y", "px");
    const xSetFollower = gsap.quickSetter(follower, "x", "px");
    const ySetFollower = gsap.quickSetter(follower, "y", "px");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.15; // Follower speed

    const moveCursor = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Main dot moves instantly or very fast
      xSetCursor(e.clientX);
      ySetCursor(e.clientY);
    };

    // Smoother follower movement using ticker
    const updateFollower = () => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      
      xSetFollower(pos.x);
      ySetFollower(pos.y);
    };

    gsap.ticker.add(updateFollower);

    const onHover = (text?: string) => {
      const scale = text ? 4 : 2.5;
      
      gsap.to(follower, { 
        scale: scale, 
        backgroundColor: text ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.1)',
        borderWidth: text ? '0px' : '1px',
        mixBlendMode: text ? 'difference' : 'normal',
        duration: 0.4, 
        ease: "power3.out" 
      });
      
      gsap.to(cursor, { 
        scale: 0, 
        opacity: 0, 
        duration: 0.3 
      });

      if (text && textEl) {
        setCursorText(text);
        gsap.to(textEl, {
            opacity: 1,
            scale: 1, // Inverse scale to keep text readable? No, simpler is better
            duration: 0.3
        });
      }
    };

    const onLeave = () => {
      gsap.to(follower, { 
        scale: 1, 
        backgroundColor: 'transparent',
        borderWidth: '1px',
        mixBlendMode: 'normal',
        duration: 0.4, 
        ease: "power3.out" 
      });
      gsap.to(cursor, { 
        scale: 1, 
        opacity: 1, 
        duration: 0.3 
      });
      
      if (textEl) {
        gsap.to(textEl, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => setCursorText("")
        });
      }
    };

    const onClick = () => {
      gsap.to(follower, {
        scale: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', onClick);

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const hoverable = target.closest('a, button, [role="button"], input, select, textarea, [data-cursor-text]');
        
        if (hoverable) {
            const text = hoverable.getAttribute('data-cursor-text');
            onHover(text || undefined);
        } else {
            onLeave();
        }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', onClick);
      window.removeEventListener('mouseover', handleMouseOver);
      gsap.ticker.remove(updateFollower);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div 
        ref={followerRef} 
        className="hidden md:flex fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] items-center justify-center mix-blend-difference"
      >
        <span ref={textRef} className="text-[3px] font-bold text-black opacity-0 uppercase tracking-widest text-center whitespace-nowrap overflow-hidden">
            {cursorText}
        </span>
      </div>
      <div 
        ref={cursorRef} 
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
    </>
  );
};

export default CustomCursor;