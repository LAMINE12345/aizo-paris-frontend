import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagnetProps {
  children: React.ReactNode;
  strength?: number; // 0 to 1 (default 0.5)
  className?: string;
  active?: boolean;
}

const Magnet: React.FC<MagnetProps> = ({ children, strength = 0.5, className = "", active = true }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    let rect: DOMRect | null = null;

    // Use QuickSetter for performance on content
    const xTo = gsap.quickTo(content, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(content, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const updateRect = () => {
      if (wrapper) rect = wrapper.getBoundingClientRect();
    };

    // Initialize rect immediately in case mouse is already over
    updateRect();

    const handleMouseMove = (e: MouseEvent) => {
      if (!rect) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = rect;
      
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    wrapper.addEventListener("mouseenter", updateRect);
    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);
    // Update rect on scroll/resize to be safe, though mouseenter covers most cases
    window.addEventListener("scroll", updateRect, { passive: true });
    window.addEventListener("resize", updateRect);

    return () => {
      wrapper.removeEventListener("mouseenter", updateRect);
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("resize", updateRect);
    };
  }, [strength, active]);

  return (
    <div ref={wrapperRef} className={`inline-block ${className}`}>
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default Magnet;
