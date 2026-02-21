import React, { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Menu, Heart, Search, User as UserIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import Magnet from './Magnet';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  cartCount: number;
  openCart: () => void;
  wishlistCount: number;
  openWishlist: () => void;
  openMobileMenu: () => void;
  openSearch: () => void;
  openAuth: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  openCart, 
  wishlistCount, 
  openWishlist, 
  openMobileMenu, 
  openSearch,
  openAuth
}) => {
  const { lang, setLang } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic styles based on scroll and page
  const navClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6
    ${isVisible ? 'translate-y-0' : '-translate-y-full'}
    ${isScrolled 
      ? 'bg-white/90 backdrop-blur-xl border-b border-black/5 text-black py-4 shadow-sm' 
      : isHome 
        ? 'bg-transparent text-white border-transparent' 
        : 'bg-white text-black border-transparent'
    }
  `;

  const iconClass = `w-5 h-5 transition-colors ${isScrolled || !isHome ? 'text-black' : 'text-white'}`;
  const buttonClass = `p-2 rounded-full transition-all duration-300 ${isScrolled || !isHome ? 'hover:bg-black/5' : 'hover:bg-white/10'}`;

  return (
    <nav 
      ref={navRef}
      className={navClasses}
      onMouseEnter={() => setIsVisible(true)}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex justify-between items-center relative">
        
        {/* Left: Global Menu (Burger) & Lang */}
        <div className="flex items-center gap-8">
          <Magnet strength={0.3} active={true}>
            <button 
                onClick={openMobileMenu} 
                className={`group flex items-center gap-3 ${buttonClass} -ml-2`}
                data-cursor-text="MENU"
                aria-label="Open menu"
            >
                <div className="relative w-6 h-6 flex flex-col justify-center gap-1.5 overflow-hidden">
                    <span className={`w-full h-[1.5px] transform transition-transform duration-300 group-hover:translate-x-1 ${isScrolled || !isHome ? 'bg-black' : 'bg-white'}`}></span>
                    <span className={`w-2/3 h-[1.5px] transform transition-transform duration-300 group-hover:w-full group-hover:-translate-x-1 ${isScrolled || !isHome ? 'bg-black' : 'bg-white'}`}></span>
                </div>
                <span className={`hidden md:block text-xs font-bold uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all duration-300 ${isScrolled || !isHome ? 'text-black' : 'text-white'}`}>
                    Menu
                </span>
            </button>
          </Magnet>
          
          <div className={`hidden md:flex gap-1 text-xs font-bold uppercase tracking-widest ${isScrolled || !isHome ? 'text-black/50' : 'text-white/50'}`}>
              <button 
                  onClick={() => setLang('fr')} 
                  className={`transition-opacity hover:opacity-100 ${lang === 'fr' ? 'opacity-100 underline decoration-1 underline-offset-4' : ''}`}
                  aria-label="Switch to French"
              >
                  FR
              </button>
              <span>/</span>
              <button 
                  onClick={() => setLang('en')} 
                  className={`transition-opacity hover:opacity-100 ${lang === 'en' ? 'opacity-100 underline decoration-1 underline-offset-4' : ''}`}
                  aria-label="Switch to English"
              >
                  EN
              </button>
          </div>
        </div>

        {/* Center: Logo */}
        <Link to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group" aria-label="Go to Homepage">
           <Magnet strength={0.2} active={true}>
               <div className="flex items-center" data-cursor-text="HOME">
                  <Logo className={`w-10 h-10 md:w-12 md:h-12 transition-colors duration-300 ${isScrolled || !isHome ? 'text-black' : 'text-white'}`} />
               </div>
           </Magnet>
        </Link>

        {/* Right: Icons */}
        <div className="flex items-center gap-2 md:gap-6">
            <Magnet active={true}>
                <button onClick={openSearch} className={buttonClass} data-cursor-text="SEARCH" aria-label="Search">
                    <Search className={iconClass} />
                </button>
            </Magnet>
            <Magnet strength={0.3} active={true}>
                <button 
                    onClick={openAuth} 
                    className={`relative ${buttonClass} hidden md:block group`} 
                    data-cursor-text={user ? "PROFILE" : "ACCOUNT"} 
                    aria-label="Account"
                >
                    <UserIcon className={iconClass} />
                    {user && (
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-green-500 rounded-full border border-white" />
                    )}
                </button>
            </Magnet>
            <Magnet>
                <button onClick={openWishlist} className={`relative ${buttonClass} hidden md:block`} data-cursor-text="WISHLIST" aria-label="Wishlist">
                    <Heart className={iconClass} />
                    {wishlistCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    )}
                </button>
            </Magnet>
            <Magnet>
                <button onClick={openCart} className={`relative ${buttonClass}`} data-cursor-text="CART" aria-label="Cart">
                    <ShoppingBag className={iconClass} />
                    {cartCount > 0 && (
                        <span className={`absolute -top-1 -right-1 text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-mono ${isScrolled || !isHome ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            {cartCount}
                        </span>
                    )}
                </button>
            </Magnet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;