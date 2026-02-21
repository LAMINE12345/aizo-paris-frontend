import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Magnet from './Magnet';
import { Translations } from '../types';

interface CookieBannerProps {
  t: Translations;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ t }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check local storage
    const consent = localStorage.getItem('aizo-cookie-consent');
    if (!consent) {
      setTimeout(() => setVisible(true), 2000);
    }
  }, []);

  useEffect(() => {
    if (visible && bannerRef.current) {
      gsap.fromTo(bannerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [visible]);

  const handleAccept = () => {
    localStorage.setItem('aizo-cookie-consent', 'true');
    gsap.to(bannerRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.4,
      onComplete: () => setVisible(false)
    });
  };

  if (!visible) return null;

  return (
    <div 
      ref={bannerRef}
      className="fixed bottom-0 left-0 w-full z-[90] bg-zinc-50 border-t border-zinc-200 p-4 md:p-6 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs md:text-sm font-bold uppercase tracking-wide text-center md:text-left text-zinc-800">
          {t.cookie.text}
        </p>
        <div className="flex gap-4">
          <Magnet strength={0.2} active={true}>
            <button 
                onClick={handleAccept}
                className="text-xs font-bold uppercase text-zinc-400 hover:text-black transition-colors px-4 py-2"
            >
                {t.cookie.decline}
            </button>
          </Magnet>
          <Magnet strength={0.2} active={true}>
            <button 
                onClick={handleAccept}
                className="bg-black text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
            >
                {t.cookie.accept}
            </button>
          </Magnet>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;