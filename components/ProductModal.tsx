import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { X, Ruler, Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, Translations } from '../types';
import Magnet from './Magnet';

interface ProductModalProps {
  product: Product | null;
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  addToCart: (product: Product, size: string) => void;
  openSizeGuide: () => void;
  t: Translations;
  isLiked: boolean;
  toggleWishlist: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, products, isOpen, onClose, addToCart, openSizeGuide, t, isLiked, toggleWishlist, onProductClick }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get related products (random 2 excluding current)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const otherProducts = products.filter(p => p.id !== product.id);
    const shuffled = [...otherProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, [product, products]);

  // Mock multiple images for the carousel
  const productImages = useMemo(() => {
     if (!product) return [];
     return [
        product.image,
        `https://picsum.photos/seed/${product.id + 55}/800/1000?grayscale`, 
        `https://picsum.photos/seed/${product.id + 99}/800/1000?grayscale`
     ];
  }, [product]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSelectedSize(null);
        setError(false);
        setCurrentImageIndex(0);
      }, 300);
    } else {
        setSelectedSize(null);
        setError(false);
        setCurrentImageIndex(0);
    }
  }, [isOpen, product]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        if (!overlayRef.current || !modalRef.current) return;
        
        document.body.style.overflow = 'hidden';
        const tl = gsap.timeline();
        
        tl.to(overlayRef.current, { 
          opacity: 1, 
          duration: 0.5, 
          pointerEvents: 'auto',
          ease: "power2.out"
        })
        .fromTo(modalRef.current, 
          { x: '100%', clipPath: 'inset(0 0 0 100%)' },
          { x: '0%', clipPath: 'inset(0 0 0 0%)', duration: 0.8, ease: 'power4.inOut' },
          "-=0.3"
        );

        if (contentRef.current) {
            gsap.fromTo(contentRef.current.children, 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power3.out", delay: 0.4 }
            );
        }

      } else {
        if (!overlayRef.current || !modalRef.current) return;

        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
          }
        });

        tl.to(modalRef.current, { 
          x: '100%',
          clipPath: 'inset(0 0 0 100%)',
          duration: 0.6, 
          ease: 'power4.inOut' 
        })
        .to(overlayRef.current, { 
          opacity: 0, 
          duration: 0.4, 
          pointerEvents: 'none' 
        }, "-=0.2");
      }
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const nextImage = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError(true);
      return;
    }
    addToCart(product, selectedSize);
    onClose();
  };

  // Use product sizes if available, otherwise fallback to default
  const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL'];

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[80] bg-zinc-950/40 backdrop-blur-md flex justify-end opacity-0 pointer-events-none"
      onClick={onClose}
    >
      <div 
        ref={modalRef} 
        className="bg-[#FDFDFD] w-full max-w-7xl h-full shadow-2xl overflow-hidden flex flex-col lg:flex-row transform translate-x-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Carousel Side */}
        <div className="w-full lg:w-[55%] h-[50vh] lg:h-full bg-zinc-100 relative group overflow-hidden">
            <div 
                className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
                {productImages.map((img, idx) => (
                    <div key={idx} className="min-w-full h-full relative bg-zinc-200">
                         <img 
                            src={img} 
                            alt={`${product.name} view ${idx + 1}`} 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                ))}
            </div>

            {/* Navigation Overlays */}
            <div className="absolute inset-y-0 left-0 w-24 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                <button 
                    onClick={prevImage}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            </div>
            <div className="absolute inset-y-0 right-0 w-24 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                <button 
                    onClick={nextImage}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                 {productImages.map((_, idx) => (
                     <button 
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                        className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentImageIndex ? 'w-12 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                     />
                 ))}
            </div>

            <button 
                onClick={onClose} 
                className="absolute top-6 left-6 lg:hidden bg-white/80 backdrop-blur-md p-3 rounded-full z-20 shadow-lg"
            >
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* Content Side */}
        <div className="w-full lg:w-[45%] flex-1 lg:h-full flex flex-col bg-zinc-50 min-h-0 relative z-10">
            <div className="absolute top-0 right-0 p-8 hidden lg:block z-20">
                 <Magnet strength={0.2} active={true}>
                    <button onClick={onClose} className="p-3 hover:bg-zinc-200 rounded-full transition-colors group">
                        <X className="w-6 h-6 text-zinc-900 group-hover:rotate-90 transition-transform duration-500" />
                    </button>
                 </Magnet>
            </div>

            <div ref={contentRef} className="flex-1 overflow-y-auto p-8 lg:p-16 flex flex-col">
                <div className="mb-2">
                     <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{product.category} — FW24 Collection</span>
                </div>
                
                <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6 text-zinc-900">
                    {product.name}
                </h2>

                <div className="flex justify-between items-end mb-10 pb-10 border-b border-zinc-200">
                    <p className="text-3xl font-light tracking-tight text-zinc-900">{product.price}€</p>
                    <button 
                        onClick={() => toggleWishlist(product)}
                        className="flex items-center gap-2 text-xs font-bold uppercase hover:text-zinc-600 transition-colors group text-zinc-900"
                    >
                        <Heart className={`w-4 h-4 transition-all duration-300 ${isLiked ? 'fill-zinc-900 scale-110' : 'group-hover:scale-110'}`} />
                        <span className="relative overflow-hidden h-4 block">
                            <span className="block transition-transform duration-300 group-hover:-translate-y-full">{isLiked ? 'Saved' : 'Save'}</span>
                            <span className="block absolute top-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">{isLiked ? 'Saved' : 'Save'}</span>
                        </span>
                    </button>
                </div>
                
                <div className="space-y-6 mb-12">
                    <p className="text-zinc-600 text-sm leading-loose max-w-md">
                        {t.productDetail.description} Crafted with precision using premium materials. Designed for the modern aesthetic with a focus on durability and comfort.
                    </p>
                    <ul className="text-xs text-zinc-500 space-y-2 font-mono uppercase tracking-wide">
                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-400 rounded-full"></div> Heavy-weight cotton blend</li>
                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-400 rounded-full"></div> Relaxed fit silhouette</li>
                        <li className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-400 rounded-full"></div> Made in Portugal</li>
                    </ul>
                </div>

                {/* Size Selector */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{t.productDetail.selectSize}</span>
                        <button onClick={openSizeGuide} className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 transition-colors group">
                             <Ruler className="w-3 h-3" />
                             <span className="underline underline-offset-4 decoration-zinc-300 group-hover:decoration-zinc-900 transition-all">{t.productDetail.sizeGuide}</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => { setSelectedSize(size); setError(false); }}
                            className={`py-4 text-sm font-bold transition-all duration-300 rounded-lg border ${
                            selectedSize === size 
                                ? 'bg-zinc-900 text-zinc-50 border-zinc-900 shadow-lg scale-105' 
                                : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900'
                            }`}
                        >
                            {size}
                        </button>
                        ))}
                    </div>
                    {error && (
                        <div className="text-red-500 text-xs font-bold uppercase mt-3 flex items-center gap-2 animate-pulse">
                            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                            {t.productDetail.selectSizeError}
                        </div>
                    )}
                </div>

                {/* Related */}
                <div className="mt-auto pt-10 border-t border-zinc-200">
                     <span className="text-xs font-bold uppercase tracking-widest block mb-6 text-zinc-500">Complete the Look</span>
                     <div className="grid grid-cols-2 gap-4">
                        {relatedProducts.map(rp => (
                            <div key={rp.id} onClick={() => onProductClick(rp)} className="group cursor-pointer flex gap-4 items-center p-3 rounded-xl hover:bg-zinc-100 transition-all duration-300 border border-transparent hover:border-zinc-200">
                                <div className="w-12 h-16 overflow-hidden rounded-md bg-zinc-200">
                                    <img src={rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase leading-tight group-hover:text-zinc-900 transition-colors text-zinc-700">{rp.name}</p>
                                    <p className="text-[10px] text-zinc-500 mt-1 font-mono">{rp.price}€</p>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>

            {/* Footer Action */}
            <div className="p-6 lg:p-10 border-t border-zinc-200 bg-zinc-50 sticky bottom-0 z-30">
                <Magnet strength={0.3} active={true} className="w-full">
                    <button 
                        onClick={handleAddToCart}
                        className="group relative w-full bg-zinc-900 text-zinc-50 py-4 overflow-hidden rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/20"
                    >
                        <div className="absolute inset-0 w-full h-full bg-zinc-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"></div>
                        <span className="relative z-10 font-bold text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-4">
                            {t.productDetail.addToCart}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                    </button>
                </Magnet>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;