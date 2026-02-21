import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Translations } from '../types';
import axios from 'axios';
import { STRAPI_URL, getStrapiMedia } from '../constants';
import Magnet from './Magnet';

gsap.registerPlugin(ScrollTrigger);

interface CategoryGridProps {
  t: Translations;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image?: {
    url: string;
  };
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ t }) => {
  const containerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${STRAPI_URL}/api/categories?populate=image`);
        // Filter and map to match our desired order/structure if needed
        // Assuming the backend returns data in a standard Strapi format
        const fetchedCategories = response.data.data.map((cat: any) => {
            // Prepend Strapi URL to image path
            const imageUrl = cat.image ? getStrapiMedia(cat.image.url) : undefined;
            
            return {
                id: cat.id,
                name: cat.name,
                slug: cat.slug,
                image: imageUrl ? { url: imageUrl } : undefined
            };
        });
        
        // Sort or filter if specific categories are needed (e.g., HOMME, FEMME, ENFANT)
        // For now, we take the first 3 or specific ones
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!loading && categories.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from('.category-triptych', {
          y: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse'
          }
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading, categories]);

  // Fallback static data if fetch fails or loading
  const displayCategories = categories.length > 0 ? categories : [
    { id: 1, slug: 'homme', name: t.categories.items.men, image: { url: '/images/star/05.jpg' } },
    { id: 2, slug: 'femme', name: t.categories.items.women, image: { url: '/images/star/08.jpg' } },
    { id: 3, slug: 'enfant', name: t.categories.items.kids, image: { url: '/images/star/01.JPG' } },
  ];

  return (
    <section ref={containerRef} className="bg-black text-white py-0 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 h-[180vh] md:h-screen">
          {displayCategories.map((cat, index) => (
            <div 
              key={cat.id} 
              onClick={() => navigate(`/shop?gender=${cat.slug}`)}
              className="category-triptych group relative border-r border-white/10 last:border-r-0 cursor-pointer overflow-hidden"
              data-cursor-text="OPEN"
            >
              {/* Image Layer */}
              <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-700 ease-out">
                 <img 
                    src={cat.image?.url || '/images/placeholder.jpg'} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                 />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-500"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center z-10 pointer-events-none">
                  <div className="overflow-hidden">
                      <Magnet strength={0.1} active={true}>
                        <span className="block text-xs font-mono tracking-[0.5em] mb-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 text-white pointer-events-auto">
                            COLLECTION 0{index + 1}
                        </span>
                      </Magnet>
                  </div>
                  <Magnet strength={0.2} active={true}>
                    <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none mix-blend-difference transform group-hover:-translate-y-4 transition-transform duration-500 pointer-events-auto">
                        {cat.name}
                    </h2>
                  </Magnet>
                   <div className="overflow-hidden h-6 mt-4">
                      <Magnet strength={0.2} active={true}>
                        <span className="block text-xs font-bold uppercase border-b border-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100 text-white pointer-events-auto">
                            {t.categories.cta}
                        </span>
                      </Magnet>
                  </div>
              </div>

              {/* Hover Borders */}
              <div className="absolute inset-6 border border-white/0 group-hover:border-white/30 transition-all duration-700 scale-90 group-hover:scale-100"></div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CategoryGrid;