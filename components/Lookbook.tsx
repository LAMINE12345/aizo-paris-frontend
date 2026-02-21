import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Translations } from '../types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Magnet from './Magnet';
import { STRAPI_URL, getStrapiMedia } from '../constants';
import { useGsapSkew } from '../hooks/useGsapSkew';
import { useGsapReveal } from '@/hooks/useGsapReveal';

gsap.registerPlugin(ScrollTrigger);

interface LookbookProps {
  t: Translations;
  previewMode?: boolean;
}

interface LookbookItem {
    id: number;
    title: string;
    slug: string;
    description?: string;
    images: {
        url: string;
    }[];
}

const Lookbook: React.FC<LookbookProps> = ({ t, previewMode = false }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [lookbooks, setLookbooks] = useState<LookbookItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ... (fetch logic remains same) ...

  useEffect(() => {
    const fetchLookbooks = async () => {
        try {
            const response = await axios.get(`${STRAPI_URL}/api/lookbooks?populate=*`);
            const data = response.data.data.map((item: any) => ({
                id: item.id,
                title: item.title,
                slug: item.slug,
                description: item.description,
                images: item.images ? (Array.isArray(item.images) ? item.images : [item.images]).map((img: any) => ({
                    url: getStrapiMedia(img.url)
                })) : []
            }));
            setLookbooks(data);
        } catch (error) {
            console.error('Error fetching lookbooks:', error);
        } finally {
            setLoading(false);
        }
    };
    fetchLookbooks();
  }, []);

  const allImages = lookbooks.length > 0 
    ? lookbooks.flatMap(lb => lb.images.map(img => ({ url: img.url, title: lb.title })))
    : [];

  const displayImages = previewMode ? allImages.slice(0, 4) : allImages;

  // Use the custom hook for skew animation
  useGsapSkew({
    triggerRef: containerRef as React.RefObject<HTMLElement>,
    targetSelector: ".lookbook-img",
    active: displayImages.length > 0
  });

  useGsapReveal({
    triggerRef: containerRef as React.RefObject<HTMLElement>,
    selector: ".lookbook-item",
    direction: "up",
    distance: 100,
    duration: 1,
    stagger: 0.1,
    start: "top 70%",
    active: displayImages.length > 0
  });

  return (
    <section id="lookbook" ref={containerRef} className="py-32 bg-zinc-50 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
             <h2 className="text-6xl md:text-[10rem] font-bold uppercase tracking-tighter leading-[0.8] text-black">
                LOOK<br/>BOOK
            </h2>
            <div className="md:text-right mb-4 md:mb-8">
                <span className="block text-sm font-bold uppercase tracking-widest mb-2">Campaign FW24</span>
                <p className="text-zinc-500 font-mono text-xs max-w-xs ml-auto">
                    Exploring the intersection of brutalist architecture and soft tailoring.
                </p>
            </div>
        </div>

        <div className={`grid gap-4 ${previewMode 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[600px]' 
            : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[400px] grid-flow-dense'
        }`}>
          {displayImages.map((img, idx) => {
            // Pseudo-random sizing logic based on index
            // We want a mix of sizes: 
            // 0: Large (2x2)
            // 1: Tall (1x2)
            // 2: Small (1x1)
            // 3: Tall (1x2)
            // 4: Wide (2x1)
            // 5: Small (1x1)
            
            const patterns = [
                'md:col-span-2 md:row-span-2', // Large
                'md:col-span-1 md:row-span-2', // Tall
                'md:col-span-1 md:row-span-1', // Small
                'md:col-span-1 md:row-span-2', // Tall
                'md:col-span-2 md:row-span-1', // Wide
                'md:col-span-1 md:row-span-1', // Small
            ];
            
            // In preview mode, use a simpler uniform grid or a specific featured layout
            // For example: 4 columns equal height, or 2x2 large grid
            // Let's use simple columns for preview mode to be clean
            const sizeClass = previewMode ? '' : patterns[idx % patterns.length];

            return (
            <div 
              key={idx} 
              className={`lookbook-item relative group overflow-hidden ${sizeClass}`}
            >
               <div className="lookbook-img w-full h-full bg-zinc-200 transition-transform will-change-transform overflow-hidden relative">
                  <img 
                    src={img.url} 
                    alt={`Look ${idx}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay Info */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="text-white text-xs font-bold uppercase tracking-widest block mb-1">Look 0{idx + 1}</span>
                            <span className="text-white/70 text-[10px] font-mono uppercase">FW24 Collection</span>
                        </div>
                   </div>
               </div>
            </div>
          )})}
        </div>
        
        {previewMode && (
             <div className="mt-16 flex justify-center">
                 <Magnet strength={0.3}>
                     <Link to="/lookbook" className="group relative overflow-hidden bg-black text-white px-10 py-5 rounded-full flex items-center gap-4 transition-all hover:scale-105 shadow-xl shadow-black/20">
                         <span className="text-xs font-bold uppercase tracking-[0.2em] relative z-10">View Full Lookbook</span>
                         <ArrowUpRight className="w-5 h-5 relative z-10 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                         <div className="absolute inset-0 bg-zinc-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out"></div>
                     </Link>
                 </Magnet>
             </div>
        )}
      </div>
    </section>
  );
};

export default Lookbook;
