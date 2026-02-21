import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagnetProps {
  children: React.ReactNode;
  strength?: number; // 0 to 1 (default 0.5)
  className?: string;
  active?: boolean;
}

const Magnet: React.FC<MagnetProps> = ({ children, strength = 0.5, className = "", active = true }) => {
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const magnet = magnetRef.current;
    if (!magnet) return;

    // Use QuickSetter for performance
    const xTo = gsap.quickTo(magnet, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magnet, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = magnet.getBoundingClientRect();
      
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    magnet.addEventListener("mousemove", handleMouseMove);
    magnet.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      magnet.removeEventListener("mousemove", handleMouseMove);
      magnet.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={magnetRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};

export default Magnet;
