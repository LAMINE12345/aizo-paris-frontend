import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ArrowRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product, Translations } from '../types';
import Magnet from './Magnet';

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  removeFromWishlist: (id: number) => void;
  onProductClick: (product: Product) => void;
  t: Translations;
}

const WishlistSidebar: React.FC<WishlistSidebarProps> = ({ isOpen, onClose, items, removeFromWishlist, onProductClick, t }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const closeWithAnimation = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
      }
    });

    tl.to([headerRef.current, contentRef.current, footerRef.current], {
      y: 20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in'
    })
    .to(sidebarRef.current, {
      x: '100%',
      duration: 0.6,
      ease: 'expo.in'
    }, "-=0.1")
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      pointerEvents: 'none'
    }, "-=0.3");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        const tl = gsap.timeline();
        
        // Initial states
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(sidebarRef.current, { x: '100%' });
        gsap.set([headerRef.current, contentRef.current, footerRef.current], { y: 40, opacity: 0 });

        tl.to(overlayRef.current, { 
          opacity: 1, 
          duration: 0.4, 
          pointerEvents: 'auto',
          ease: 'power2.out'
        })
        .to(sidebarRef.current, { 
          x: '0%', 
          duration: 0.8, 
          ease: 'expo.out' 
        }, "-=0.2")
        .to([headerRef.current, contentRef.current, footerRef.current], {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        }, "-=0.4");
      }
    }, sidebarRef);

    return () => ctx.revert();
  }, [isOpen]);

  const handleProductAction = (product?: Product) => {
    closeWithAnimation();
    if (product) {
      setTimeout(() => onProductClick(product), 500);
    } else {
      setTimeout(() => navigate('/shop'), 500);
    }
  };

  return (
    <>
      <div 
        ref={overlayRef} 
        onClick={closeWithAnimation}
        className="fixed inset-0 bg-black/40 z-[60] opacity-0 pointer-events-none backdrop-blur-sm transition-colors duration-500"
      />
      <div 
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-white z-[70] transform translate-x-full shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div ref={headerRef} className="p-8 md:p-12 pb-6 border-b border-zinc-200 bg-zinc-50 relative">
            <div className="absolute top-8 right-8 z-10">
                <Magnet strength={0.2} active={true}>
                    <button 
                        onClick={closeWithAnimation} 
                        className="p-3 hover:bg-zinc-200 rounded-full transition-colors duration-300 group"
                    >
                        <X className="w-6 h-6 text-zinc-900 group-hover:rotate-90 transition-transform duration-500" />
                    </button>
                </Magnet>
            </div>
            
            <div className="mt-4">
                 <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                    Personal Collection
                 </span>
                 <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-zinc-900">
                    Wishlist
                    <span className="text-zinc-300 ml-4 text-4xl align-top font-light">{items.length}</span>
                </h2>
            </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto bg-zinc-50 p-8 md:p-12 pt-0">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                <div className="relative">
                    <Heart className="w-24 h-24 text-zinc-200 stroke-1" />
                    <div className="absolute inset-0 animate-ping opacity-20">
                        <Heart className="w-24 h-24 text-zinc-300 stroke-1" />
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-zinc-900">Your wishlist is empty</h3>
                    <p className="text-zinc-500 mt-2 max-w-xs mx-auto leading-relaxed">
                        Save items you love to review them later.
                    </p>
                </div>
                <Magnet strength={0.3} active={true}>
                    <button 
                        onClick={() => handleProductAction()}
                        className="bg-zinc-900 text-zinc-50 px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all duration-300 hover:scale-105"
                    >
                        Start Exploring
                    </button>
                </Magnet>
            </div>
          ) : (
            <div className="space-y-6 mt-8">
                 {items.map((product, index) => (
                    <div 
                        key={product.id} 
                        className="group relative flex gap-6 items-center p-4 -mx-4 rounded-xl hover:bg-zinc-100 transition-all duration-300 border border-transparent hover:border-zinc-200"
                    >
                        {/* Image */}
                        <div 
                            className="w-24 h-32 bg-zinc-200 overflow-hidden rounded-lg cursor-pointer relative shrink-0"
                            onClick={() => handleProductAction(product)}
                        >
                             <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between h-32 py-1">
                            <div>
                                <div className="flex justify-between items-start">
                                    <p className="text-[10px] font-mono text-zinc-400 uppercase mb-1">{product.category}</p>
                                    <Magnet strength={0.2} active={true}>
                                        <button 
                                            onClick={() => removeFromWishlist(product.id)}
                                            className="text-zinc-400 hover:text-red-500 transition-colors -mt-1 -mr-1 p-2"
                                            title={t.wishlist.remove}
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </Magnet>
                                </div>
                                <h3 
                                    className="text-xl font-bold uppercase leading-none cursor-pointer hover:underline decoration-1 underline-offset-4 mb-2 text-zinc-900 decoration-zinc-900"
                                    onClick={() => handleProductAction(product)}
                                >
                                    {product.name}
                                </h3>
                                <p className="text-zinc-600 text-sm">{product.price}€</p>
                            </div>

                            <Magnet strength={0.05} active={true} className="self-start">
                                <button 
                                    onClick={() => handleProductAction(product)}
                                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-zinc-600 transition-colors group/btn p-2 -ml-2"
                                >
                                    {t.wishlist.moveToCart}
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </Magnet>
                        </div>
                    </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistSidebar;
