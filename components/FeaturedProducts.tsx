import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product, Translations } from '../types';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Magnet from './Magnet';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProductsProps {
  products: Product[];
  t: Translations;
  onProductClick: (product: Product) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, t, onProductClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Get newest 5 products for the slider
  let featured = products.filter(p => p.isNew || p.category === 'TOP');
  
  // Fallback if no specific featured products found
  if (featured.length === 0 && products.length > 0) {
      featured = products;
  }
  
  featured = featured.slice(0, 5);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const trigger = triggerRef.current;

      if (container && trigger) {
        // Calculate total width to scroll
        const totalWidth = container.scrollWidth;
        const windowWidth = window.innerWidth;
        
        gsap.to(container, {
          x: () => -(totalWidth - windowWidth + 100), // +100 for padding
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: () => `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [featured]);

  return (
    <section ref={sectionRef} className="bg-zinc-50 overflow-hidden">
      <div ref={triggerRef} className="h-screen flex flex-col justify-center relative">
        {/* Horizontal Container */}
        <div 
            ref={containerRef} 
            className="flex items-center gap-12 px-6 md:px-12 w-max"
        >
            {featured.map((product, index) => (
                <div 
                    key={product.id}
                    className="w-[80vw] md:w-[30vw] flex-shrink-0 group cursor-pointer relative"
                    onClick={() => onProductClick(product)}
                >
                    <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-6">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/placeholder.jpg';
                            }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                        
                        {/* Huge Number Index */}
                        <span className="absolute -bottom-4 -left-2 text-[8rem] font-black text-transparent stroke-text opacity-30 select-none pointer-events-none transition-opacity group-hover:opacity-10 z-0">
                            0{index + 1}
                        </span>

                        {/* Hover Overlay Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                            <Magnet strength={0.3}>
                                <button className="bg-white/90 backdrop-blur-md text-zinc-900 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2 shadow-xl">
                                    View Product <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </Magnet>
                        </div>
                    </div>

                    <div className="flex justify-between items-end border-b border-zinc-200 pb-4 group-hover:border-zinc-900 transition-colors duration-500">
                        <div>
                            <h3 className="text-2xl font-black uppercase leading-none mb-2 group-hover:tracking-wider transition-all duration-500 text-zinc-900">{product.name}</h3>
                            <p className="text-xs font-mono text-zinc-500 uppercase">{product.category} / REF-00{product.id}</p>
                        </div>
                        <span className="text-xl font-bold font-mono text-zinc-900">{product.price}€</span>
                    </div>
                </div>
            ))}

            {/* "View More" Card */}
             <div className="w-[80vw] md:w-[20vw] h-[40vh] md:h-[60vh] flex-shrink-0 flex items-center justify-center">
                <Magnet strength={0.05} className="w-full h-full">
                    <div 
                        className="w-full h-full bg-zinc-900 text-zinc-50 cursor-pointer hover:bg-zinc-800 transition-all duration-500 flex flex-col items-center justify-center group relative overflow-hidden"
                        onClick={() => navigate('/shop')}
                    >
                        <div className="text-center relative z-10 p-8">
                            <span className="block text-4xl font-black uppercase tracking-tighter mb-6 group-hover:scale-110 transition-transform duration-500">Discover<br/>More</span>
                            <div className="w-16 h-16 rounded-full border border-zinc-500/50 flex items-center justify-center mx-auto group-hover:bg-zinc-50 group-hover:text-zinc-900 transition-all duration-500">
                                <ArrowRight className="w-6 h-6 group-hover:-rotate-45 transition-transform duration-500" />
                            </div>
                        </div>
                        
                        {/* Background Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-500 to-transparent scale-150"></div>
                    </div>
                </Magnet>
            </div>
        </div>
      </div>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 2px #d4d4d8; /* zinc-300 */
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;
