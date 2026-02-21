import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, Search, ArrowRight, CornerDownLeft, Loader2 } from 'lucide-react';
import { Product, Translations } from '../types';
import Magnet from './Magnet';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onProductClick: (product: Product) => void;
  t: Translations;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, products, onProductClick, t }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const closeWithAnimation = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
        setQuery('');
      }
    });

    tl.to('.search-content', {
      y: -20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in'
    })
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut'
    }, "-=0.2");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
        
        const tl = gsap.timeline();
        
        // Initial state
        gsap.set(containerRef.current, { opacity: 0, pointerEvents: 'auto' });
        gsap.set('.search-content', { y: 30, opacity: 0 });

        tl.to(containerRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out'
        })
        .to('.search-content', {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out'
        }, "-=0.3");
        
        setTimeout(() => inputRef.current?.focus(), 100);
      } else {
        document.body.style.overflow = '';
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setIsSearching(false);
    } else {
      setIsSearching(true);
      const timeoutId = setTimeout(() => {
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) || 
            p.category.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsSearching(false);
      }, 300); // Simulate network delay/debounce
      return () => clearTimeout(timeoutId);
    }
  }, [query, products]);

  const handleProductSelect = (product: Product) => {
    onProductClick(product);
    closeWithAnimation();
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-zinc-50/98 text-zinc-900 flex flex-col opacity-0 pointer-events-none backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex justify-end items-center p-8 search-content">
        <Magnet strength={0.2} active={true}>
            <button 
                onClick={closeWithAnimation} 
                className="p-3 hover:bg-zinc-200 rounded-full transition-colors group"
            >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500 text-zinc-900" />
            </button>
        </Magnet>
      </div>

      {/* Search Input */}
      <div className="px-8 md:px-20 pt-10 pb-10 search-content">
        <div className="relative border-b border-zinc-200 focus-within:border-zinc-900 transition-colors duration-500">
            <Search className={`absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 transition-colors duration-300 ${query ? 'text-zinc-900' : 'text-zinc-400'}`} />
            <input 
                ref={inputRef}
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-4xl md:text-7xl font-bold uppercase tracking-tighter placeholder-zinc-300 focus:outline-none py-8 pl-16 text-zinc-900"
            />
            {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
                </div>
            )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-8 md:px-20 pb-20 search-content custom-scrollbar">
        {query && !isSearching && results.length === 0 ? (
          <div className="mt-8 text-zinc-500">
             <p className="text-sm uppercase tracking-widest font-mono">No results found for "{query}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
             {results.map((product, idx) => (
                <div 
                   key={product.id}
                   onClick={() => handleProductSelect(product)}
                   className="group cursor-pointer"
                >
                   <div className="aspect-[3/4] bg-zinc-100 overflow-hidden rounded-lg mb-4 relative">
                        <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                   </div>
                   
                   <div className="flex justify-between items-start">
                       <div>
                            <h3 className="font-bold uppercase text-lg leading-tight text-zinc-900 group-hover:text-zinc-600 transition-colors">{product.name}</h3>
                            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wide">{product.category}</p>
                       </div>
                       <span className="text-sm font-mono text-zinc-500">{product.price}€</span>
                   </div>
                </div>
             ))}
          </div>
        )}
      </div>

      <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #d4d4d8; /* zinc-300 */
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #a1a1aa; /* zinc-400 */
          }
      `}</style>
    </div>
  );
};

export default SearchOverlay;