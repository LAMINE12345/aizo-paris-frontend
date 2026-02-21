import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message) {
      const tl = gsap.timeline({ onComplete: onClose });
      
      tl.fromTo(toastRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
      )
      .to(toastRef.current, { 
        y: 50, 
        opacity: 0, 
        duration: 0.4, 
        ease: "power3.in",
        delay: 2 
      });

      return () => { tl.kill(); };
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div 
      ref={toastRef} 
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] bg-zinc-900 text-white px-6 py-3 shadow-lg flex items-center gap-3 rounded-lg border border-zinc-800"
    >
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
      <span className="text-xs font-bold uppercase tracking-widest">{message}</span>
    </div>
  );
};

export default Toast;