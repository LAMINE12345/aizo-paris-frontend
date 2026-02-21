import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem, Translations } from '../types';
import { useNavigate } from 'react-router-dom';
import Magnet from './Magnet';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  updateQuantity: (productId: number, size: string, delta: number) => void;
  t: Translations;
  clearCart: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, updateQuantity, t, clearCart }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Free shipping logic
  const freeShippingThreshold = 200;
  const total = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const progress = Math.min((total / freeShippingThreshold) * 100, 100);
  const remaining = freeShippingThreshold - total;

  const closeWithAnimation = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
      }
    });

    tl.to(sidebarRef.current, {
      x: '100%',
      duration: 0.8,
      ease: 'expo.inOut'
    })
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      pointerEvents: 'none'
    }, "-=0.6");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        const tl = gsap.timeline();
        
        // Initial states
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(sidebarRef.current, { x: '100%' });
        gsap.set('.cart-item', { opacity: 0, y: 20 });
        gsap.set('.cart-footer', { opacity: 0, y: 20 });

        tl.to(overlayRef.current, { 
          opacity: 1, 
          duration: 0.6, 
          pointerEvents: 'auto',
          ease: 'power2.out'
        })
        .to(sidebarRef.current, { 
          x: '0%', 
          duration: 1, 
          ease: 'expo.out' 
        }, "-=0.4")
        .to('.cart-item', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out'
        }, "-=0.6")
        .to('.cart-footer', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, "-=0.4");
      }
    }, sidebarRef);

    return () => ctx.revert();
  }, [isOpen, items]);

  // Keep success logic
  useEffect(() => {
    if(!isOpen) {
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(false);
        }, 500);
    }
  }, [isOpen]);

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  return (
    <>
      <div 
        ref={overlayRef} 
        onClick={closeWithAnimation}
        className="fixed inset-0 bg-zinc-950/40 z-[60] opacity-0 pointer-events-none backdrop-blur-sm transition-opacity"
      />
      <div 
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-zinc-50 z-[70] transform translate-x-full shadow-2xl flex flex-col font-sans"
      >
        {/* Header */}
        <div className="px-8 py-8 flex justify-between items-center bg-zinc-50 z-10 border-b border-zinc-200/50">
          <h2 className="text-4xl font-black uppercase tracking-tighter leading-none text-zinc-900">{t.cart.title} ({items.length})</h2>
          <Magnet strength={0.2} active={true}>
            <button onClick={closeWithAnimation} className="p-3 hover:bg-zinc-200 rounded-full transition-colors group" data-cursor-text="CLOSE">
                <X className="w-6 h-6 text-zinc-900 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </Magnet>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-8 relative scrollbar-hide">
          {isSuccess ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50 z-10 px-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-zinc-900 text-zinc-50 rounded-full flex items-center justify-center mb-8">
                    <span className="text-4xl">✓</span>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-zinc-900">{t.contact.success}</h3>
                <p className="text-zinc-500 mb-12">Thank you for your order. A confirmation email has been sent.</p>
                <Magnet strength={0.2} active={true}>
                    <button 
                        onClick={closeWithAnimation}
                        className="w-full bg-zinc-900 text-zinc-50 py-4 font-bold uppercase hover:bg-zinc-800 transition-colors rounded-xl"
                    >
                        Continue Shopping
                    </button>
                </Magnet>
             </div>
          ) : (
             <>
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-12">
                        <div className="w-24 h-24 bg-zinc-200/50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <ShoppingBag className="w-10 h-10 text-zinc-400" />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900">Your Bag is Empty</h3>
                        <p className="text-zinc-500 text-sm mb-8 max-w-[200px] leading-relaxed">Looks like you haven't added any pieces to your collection yet.</p>
                        <Magnet strength={0.3} active={true}>
                            <button 
                                onClick={() => { onClose(); navigate('/shop'); }}
                                className="bg-zinc-900 text-zinc-50 px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all duration-300 hover:scale-105 shadow-xl shadow-zinc-900/10"
                            >
                                Start Exploring
                            </button>
                        </Magnet>
                    </div>
                ) : (
                    <div className="space-y-6 pt-8">
                        {/* Free Shipping Bar */}
                        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest mb-3 text-zinc-500">
                                <span>Free Shipping</span>
                                <span className="text-zinc-900">{progress < 100 ? `${remaining.toFixed(2)}€ away` : "Unlocked"}</span>
                            </div>
                            <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-zinc-900 transition-all duration-1000 ease-out" 
                                    style={{ width: `${progress}%` }} 
                                />
                            </div>
                        </div>

                        {items.map((item) => (
                        <div key={`${item.product.id}-${item.size}`} className="cart-item flex gap-6 group">
                            {/* Product Image */}
                            <div className="w-28 aspect-[3/4] bg-zinc-200 flex-shrink-0 overflow-hidden relative rounded-lg">
                                <img 
                                    src={item.product.image} 
                                    alt={item.product.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg uppercase leading-tight max-w-[200px] text-zinc-900">{item.product.name}</h3>
                                        <span className="font-mono text-sm text-zinc-900">{item.product.price}€</span>
                                    </div>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Size: {item.size}</p>
                                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Ref: {item.product.id}00299</p>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-zinc-200 rounded-full px-2 py-1 bg-white">
                                            <Magnet strength={0.2} active={true}>
                                                <button 
                                                    onClick={() => updateQuantity(item.product.id, item.size, -1)}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-zinc-900 hover:text-zinc-50 rounded-full transition-colors text-zinc-900"
                                                    data-cursor-text="LESS"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                            </Magnet>
                                            <span className="px-2 text-xs font-mono font-bold w-6 text-center text-zinc-900">{item.quantity}</span>
                                            <Magnet strength={0.2} active={true}>
                                                <button 
                                                    onClick={() => updateQuantity(item.product.id, item.size, 1)}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-zinc-900 hover:text-zinc-50 rounded-full transition-colors text-zinc-900"
                                                    data-cursor-text="MORE"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </Magnet>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                )}
             </>
          )}
        </div>

        {!isSuccess && items.length > 0 && (
            <div className="cart-footer p-8 border-t border-zinc-200 bg-zinc-50">
                <div className="flex justify-between items-end mb-6">
                    <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">Total (Inc. VAT)</span>
                    <span className="text-3xl font-black tracking-tighter text-zinc-900">{total.toFixed(2)}€</span>
                </div>

                <Magnet strength={0.1} active={true}>
                    <button 
                        onClick={handleCheckout}
                        disabled={isProcessing}
                        className="w-full bg-zinc-900 text-zinc-50 py-6 font-bold uppercase hover:bg-zinc-800 transition-all disabled:opacity-50 relative overflow-hidden group rounded-2xl shadow-xl shadow-zinc-900/20"
                        data-cursor-text="PAY NOW"
                    >
                        {isProcessing ? (
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-4 h-4 border-2 border-zinc-50/20 border-t-zinc-50 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <span className="relative z-10 group-hover:tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-2">
                                Checkout <ArrowRight className="w-4 h-4" />
                            </span>
                        )}
                    </button>
                </Magnet>
                
                <p className="mt-4 text-[10px] text-center text-zinc-400 uppercase tracking-widest">
                    Free shipping worldwide & 14-day returns
                </p>
            </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
