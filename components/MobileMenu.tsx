import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, ChevronDown, ArrowRight, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Translations } from '../types';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import Magnet from './Magnet';
import { useLanguage } from '../context/LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  openWishlist: () => void;
  openAuth: () => void;
  wishlistCount: number;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, openWishlist, openAuth, wishlistCount }) => {
  const { lang, setLang, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shopSubmenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [shopOpen, setShopOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (shopSubmenuRef.current) {
      const submenuItems = shopSubmenuRef.current.querySelectorAll('.submenu-item');
      
      if (shopOpen) {
        const tl = gsap.timeline();
        tl.fromTo(shopSubmenuRef.current, 
          { height: 0, opacity: 0 }, 
          { height: 'auto', opacity: 1, duration: 0.6, ease: "power3.inOut" }
        );
        
        if (submenuItems.length > 0) {
          tl.fromTo(submenuItems, 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
            "-=0.3"
          );
        }
      } else {
        gsap.to(shopSubmenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.inOut"
        });
      }
    }
  }, [shopOpen]);

  const menuImages: Record<string, string> = {
    'home': '/images/star/01.JPG',
    'shop': '/images/star/02.jpg',
    'lookbook': '/images/star/06.jpg',
    'about': '/images/about.jpeg',
    'contact': '/images/star/08.jpg',
    'men': '/images/star/03.jpg',
    'women': '/images/star/04.jpg',
    'kids': '/images/star/05.jpg'
  };

  const handleHover = (key: string) => {
    setActiveImage(menuImages[key] || null);
  };

  const handleLeave = () => {
    setActiveImage(null);
  };

  const closeWithAnimation = () => {
    if (!containerRef.current) {
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
      }
    });
    
    // Animate menu items out first
    const itemsToAnimate = (revealRefs.current || []).filter(Boolean);
    if (itemsToAnimate.length > 0) {
      tl.to(itemsToAnimate, {
        y: '100px',
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.in'
      });
    }

    // Finally animate container out
    tl.to(containerRef.current, {
      y: '-100%',
      duration: 0.8,
      ease: 'expo.inOut'
    }, "-=0.2");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        if (!containerRef.current) return;

        document.body.style.overflow = 'hidden';
        
        const tl = gsap.timeline();
        
        // Initial state
        const itemsToAnimate = (revealRefs.current || []).filter(Boolean);
        if (itemsToAnimate.length > 0) {
          gsap.set(itemsToAnimate, { y: '100px', opacity: 0 });
        }

        tl.to(containerRef.current, {
          y: '0%',
          duration: 1.2,
          ease: 'expo.inOut'
        });

        if (itemsToAnimate.length > 0) {
          tl.to(itemsToAnimate, {
            y: '0%',
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out'
          }, "-=0.8");
        }
        
      } else {
        document.body.style.overflow = '';
        setTimeout(() => setShopOpen(false), 1000);
      }
    }, containerRef);
    return () => ctx.revert();
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    closeWithAnimation();
    setTimeout(() => {
        navigate(path);
    }, 1000); 
  };

  const categories = [
    { key: 'ALL', label: t.products.filters.all },
    { key: 'TOP', label: t.products.filters.top },
    { key: 'HOODIE', label: t.products.filters.hoodie },
    { key: 'BOTTOM', label: t.products.filters.bottom },
    { key: 'OUTERWEAR', label: t.products.filters.outerwear },
  ];

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-zinc-900 text-zinc-50 transform -translate-y-full flex overflow-hidden"
    >
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-zinc-800 rounded-full blur-[150px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-zinc-800 rounded-full blur-[120px]" />
        </div>

        {/* Background Image for Mobile/Tablet */}
        <div 
            className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ease-in-out lg:hidden ${activeImage ? 'opacity-10' : 'opacity-0'}`}
        >
            {activeImage && (
                <img 
                    src={activeImage} 
                    alt="Background Preview" 
                    className="w-full h-full object-cover grayscale"
                />
            )}
        </div>

      {/* Left Panel: Content */}
      <div className="flex-1 flex flex-col h-full relative z-10 overflow-y-auto scrollbar-hide">
          {/* Header */}
          <div className="flex justify-between items-center p-6 md:p-12 border-b border-zinc-800 shrink-0">
            <div className="flex items-center gap-3">
                <Logo className="w-8 h-8 md:w-10 md:h-10 invert" />
                <span className="text-xl md:text-2xl font-black tracking-tighter text-zinc-50">AIZO PARIS</span>
            </div>
            <Magnet strength={0.2} active={true}>
                <button 
                    onClick={closeWithAnimation} 
                    className="group relative p-2 overflow-hidden rounded-full hover:bg-zinc-800 transition-colors"
                >
                    <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                        <span className="absolute w-full h-[2px] bg-zinc-50 rotate-45 group-hover:rotate-[135deg] transition-transform duration-500 ease-out" />
                        <span className="absolute w-full h-[2px] bg-zinc-50 -rotate-45 group-hover:rotate-[45deg] transition-transform duration-500 ease-out" />
                    </div>
                </button>
            </Magnet>
          </div>

          {/* Main Links */}
          <div className="flex-1 flex flex-col justify-center px-6 md:px-20 py-12 gap-y-2 md:gap-y-4">
            
            {/* HOME */}
            <div 
                ref={el => { revealRefs.current[0] = el }} 
                className="w-full border-b border-zinc-800 pb-4 md:pb-6 group"
                onMouseEnter={() => handleHover('home')}
                onMouseLeave={handleLeave}
            >
                <Magnet strength={0.05} active={true} className="block w-full">
                    <button 
                    onClick={() => handleNavigation('/')}
                    className="w-full flex items-baseline justify-between text-left group-hover:pl-4 transition-all duration-500 ease-out"
                    >
                        <span className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-zinc-50 transition-all">
                            {t.nav.home}
                        </span>
                        <span className="text-xs md:text-sm font-mono text-zinc-500 group-hover:text-zinc-50 transition-colors">01</span>
                    </button>
                </Magnet>
            </div>

            {/* SHOP Section */}
            <div 
                className="w-full border-b border-zinc-800 pb-4 md:pb-6 group"
                onMouseEnter={() => handleHover('shop')}
                onMouseLeave={handleLeave}
            >
                <div ref={el => { revealRefs.current[1] = el }} className="flex flex-col">
                    <Magnet strength={0.05} active={true} className="block w-full">
                        <button 
                            onClick={() => setShopOpen(!shopOpen)}
                            className="w-full flex items-baseline justify-between text-left group-hover:pl-4 transition-all duration-500 ease-out"
                        >
                            <span className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-zinc-50 transition-all flex items-center gap-4">
                                {t.nav.shop}
                                <ChevronDown className={`w-6 h-6 md:w-12 md:h-12 text-zinc-500 transition-transform duration-500 ${shopOpen ? 'rotate-180' : ''}`} />
                            </span>
                            <span className="text-xs md:text-sm font-mono text-zinc-500 group-hover:text-zinc-50 transition-colors">02</span>
                        </button>
                    </Magnet>
                    
                    {/* Immersive Submenu */}
                    <div 
                        ref={shopSubmenuRef}
                        className="h-0 overflow-hidden opacity-0"
                    >
                        <div className="pt-8 pb-4 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {['homme', 'femme', 'enfant'].map((gender) => {
                                 const translationKey = gender === 'homme' ? 'men' : gender === 'femme' ? 'women' : 'kids';
                                 return (
                                <div key={gender} className="flex flex-col gap-4" onMouseEnter={(e) => { e.stopPropagation(); handleHover(translationKey); }}>
                                    <button 
                                        onClick={() => handleNavigation(`/shop?gender=${gender}`)}
                                        className="text-lg md:text-2xl font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-50 flex items-center gap-2 group/title"
                                    >
                                        {t.nav[translationKey as keyof typeof t.nav]}
                                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all duration-300" />
                                    </button>
                                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                                        {categories.map((cat) => (
                                            <button
                                                key={`${gender}-${cat.key}`}
                                                onClick={() => handleNavigation(`/shop?gender=${gender}&category=${cat.key}`)}
                                                className="text-xs md:text-sm font-mono uppercase text-zinc-400 hover:text-zinc-50 transition-colors"
                                            >
                                                {cat.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>
                </div>
            </div>

            {/* LOOKBOOK */}
            <div 
                ref={el => { revealRefs.current[2] = el }} 
                className="w-full border-b border-zinc-800 pb-4 md:pb-6 group"
                onMouseEnter={() => handleHover('lookbook')}
                onMouseLeave={handleLeave}
            >
                <Magnet strength={0.05} active={true} className="block w-full">
                    <button 
                    onClick={() => handleNavigation('/lookbook')}
                    className="w-full flex items-baseline justify-between text-left group-hover:pl-4 transition-all duration-500 ease-out"
                    >
                        <span className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-zinc-50 transition-all">
                            LOOKBOOK
                        </span>
                        <span className="text-xs md:text-sm font-mono text-zinc-500 group-hover:text-zinc-50 transition-colors">03</span>
                    </button>
                </Magnet>
            </div>

            {/* ABOUT */}
            <div 
                ref={el => { revealRefs.current[3] = el }} 
                className="w-full border-b border-zinc-800 pb-4 md:pb-6 group"
                onMouseEnter={() => handleHover('about')}
                onMouseLeave={handleLeave}
            >
                <Magnet strength={0.05} active={true} className="block w-full">
                    <button 
                    onClick={() => handleNavigation('/about')}
                    className="w-full flex items-baseline justify-between text-left group-hover:pl-4 transition-all duration-500 ease-out"
                    >
                        <span className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-zinc-50 transition-all">
                            {t.nav.about}
                        </span>
                        <span className="text-xs md:text-sm font-mono text-zinc-500 group-hover:text-zinc-50 transition-colors">04</span>
                    </button>
                </Magnet>
            </div>

            {/* CONTACT */}
            <div 
                ref={el => { revealRefs.current[4] = el }} 
                className="w-full border-b border-zinc-800 pb-4 md:pb-6 group"
                onMouseEnter={() => handleHover('contact')}
                onMouseLeave={handleLeave}
            >
                <Magnet strength={0.05} active={true} className="block w-full">
                    <button 
                    onClick={() => handleNavigation('/contact')}
                    className="w-full flex items-baseline justify-between text-left group-hover:pl-4 transition-all duration-500 ease-out"
                    >
                        <span className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-zinc-50 transition-all">
                            {t.nav.contact}
                        </span>
                        <span className="text-xs md:text-sm font-mono text-zinc-500 group-hover:text-zinc-50 transition-colors">05</span>
                    </button>
                </Magnet>
            </div>

          </div>

          {/* Footer Info */}
          <div className="relative z-10 p-6 md:p-12 flex flex-col md:flex-row justify-between items-end gap-8 mt-auto">
             <div ref={el => { revealRefs.current[5] = el }} className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-zinc-800 pt-8">
                
                <div className="flex flex-col gap-4">
                    <div className="flex gap-6">
                        <Magnet strength={0.2}>
                            <a href="https://www.instagram.com/aizo_paris/" target="_blank" rel="noopener noreferrer" className="p-2 border border-zinc-800 rounded-full hover:bg-zinc-50 hover:text-zinc-900 transition-all duration-300 block">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </Magnet>
                        <Magnet strength={0.2}>
                            <a href="https://x.com/AizoParis" target="_blank" rel="noopener noreferrer" className="p-2 border border-zinc-800 rounded-full hover:bg-zinc-50 hover:text-zinc-900 transition-all duration-300 block">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </Magnet>
                        <Magnet strength={0.2}>
                            <a href="https://fr.linkedin.com/in/thierry-mivek-19b88b9b" target="_blank" rel="noopener noreferrer" className="p-2 border border-zinc-800 rounded-full hover:bg-zinc-50 hover:text-zinc-900 transition-all duration-300 block">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </Magnet>
                    </div>
                    <div className="text-xs font-mono uppercase text-zinc-500 tracking-widest">
                        <p>© 2024 AIZO PARIS. ALL RIGHTS RESERVED.</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="flex gap-8">
                         <Magnet strength={0.1}>
                             <button onClick={openWishlist} className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-50 transition-colors">
                                Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                            </button>
                         </Magnet>
                         <Magnet strength={0.1}>
                             <button onClick={openAuth} className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-50 transition-colors">
                                Account
                            </button>
                         </Magnet>
                    </div>
                    
                    <Magnet strength={0.1}>
                        <button 
                        onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                        className="text-sm font-bold border border-zinc-800 px-6 py-2 rounded-full hover:bg-zinc-50 hover:text-zinc-900 transition-all duration-300 uppercase tracking-widest text-zinc-400"
                        >
                        {lang === 'fr' ? 'EN' : 'FR'}
                        </button>
                    </Magnet>
                </div>
             </div>
          </div>
      </div>

      {/* Right Panel: Image Preview (Desktop) */}
      <div className="hidden lg:block w-1/2 h-full relative overflow-hidden border-l border-zinc-800">
          <div className="absolute inset-0 bg-zinc-900" />
          
           <div 
               className="absolute inset-0 transition-opacity duration-700 ease-in-out" 
               style={{ opacity: activeImage ? 1 : 0 }}
           >
               {activeImage && (
                   <img 
                       src={activeImage} 
                       alt="Preview" 
                       className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105"
                   />
               )}
           </div>
           
           <div className="absolute bottom-12 left-12 mix-blend-difference pointer-events-none">
               <span className="block text-[12vw] font-black text-zinc-700 tracking-tighter leading-none">
                   AIZO
               </span>
           </div>
      </div>
    </div>

  );
};

export default MobileMenu;