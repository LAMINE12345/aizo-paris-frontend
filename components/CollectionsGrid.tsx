import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Translations } from '../types';
import { ArrowUpRight } from 'lucide-react';
import Magnet from './Magnet';
import axios from 'axios';
import { STRAPI_URL, getStrapiMedia } from '../constants';
import { useGsapReveal } from '@/hooks/useGsapReveal';

gsap.registerPlugin(ScrollTrigger);

interface CollectionsGridProps {
  t: Translations;
}

interface Collection {
  id: number;
  name: string;
  slug: string;
  image?: { url: string };
}

const MOCK_COLLECTIONS = [
  { id: 1, name: 'T-SHIRTS', slug: 't-shirts', image: { url: '/images/star/05.jpg' } },
  { id: 2, name: 'HOODIES', slug: 'hoodies', image: { url: '/images/star/06.jpg' } },
  { id: 3, name: 'SHORTS', slug: 'shorts', image: { url: '/images/star/07.jpg' } },
  { id: 4, name: 'VESTES', slug: 'vestes', image: { url: '/images/star/08.jpg' } }
];

const CollectionsGrid: React.FC<CollectionsGridProps> = ({ t }) => {
  const containerRef = useRef<HTMLElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(`${STRAPI_URL}/api/collections?populate=image`);
        if (response.data && response.data.data && response.data.data.length > 0) {
            const data = response.data.data
            .filter((c: any) => c.name.toLowerCase() !== 'accessoires')
            .map((c: any) => ({
                id: c.id,
                name: c.name,
                slug: c.slug,
                image: c.image ? { url: getStrapiMedia(c.image.url) } : undefined
            }));
            setCollections(data);
        } else {
            setCollections(MOCK_COLLECTIONS);
        }
      } catch (err) {
        setCollections(MOCK_COLLECTIONS);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!col1Ref.current || !col2Ref.current) return;
      
      // Parallax effect: Columns move at different speeds
      gsap.to(col1Ref.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to(col2Ref.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, [collections]);

  useGsapReveal({
    triggerRef: containerRef,
    selector: ".collection-reveal",
    direction: "up",
    distance: 60,
    duration: 1,
    stagger: 0.15,
    ease: "power2.out",
    active: collections.length > 0,
    start: "top 85%",
    once: true
  });

  const CollectionItem = ({ title, subtitle, img, category, height }: { title: string, subtitle: string, img: string, category: string, height: string }) => (
    <div 
        onClick={() => navigate(`/shop?category=${category}`)}
        className="relative group cursor-pointer w-full mb-12 collection-reveal"
        data-cursor-text="EXPLORE"
    >
        {/* Label Above Image */}
        <div className="mb-4">
             <h3 className="text-4xl font-bold uppercase tracking-tighter leading-none text-zinc-900">{title}</h3>
             <p className="text-xs font-mono tracking-widest mt-1 text-zinc-500">{subtitle}</p>
        </div>

        <div className={`relative w-full ${height} overflow-hidden`}>
            <img 
                src={img} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            
            {/* Overlay Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div className="flex justify-between items-start">
                     <span className="bg-zinc-50 text-zinc-900 text-[10px] font-bold px-2 py-1 uppercase tracking-widest">FW24</span>
                     <div className="bg-zinc-50 text-zinc-900 p-2 rounded-full">
                         <ArrowUpRight className="w-4 h-4" />
                     </div>
                 </div>
            </div>

            {/* Hover Borders */}
            <div className="absolute inset-4 border border-zinc-50/0 group-hover:border-zinc-50/20 transition-all duration-700 scale-95 group-hover:scale-100"></div>
        </div>
    </div>
  );

  const getSubtitle = (slug: string) => {
    switch (slug) {
      case 't-shirts': return 'ESSENTIAL LAYERS';
      case 'hoodies': return 'STREET COMFORT';
      case 'shorts': return 'URBAN SUMMER';
      case 'vestes': return 'TECHNICAL SHELLS';
      default: return 'LATEST DROP';
    }
  };

  const getHeight = (index: number) => {
    const heights = ['h-[600px]', 'h-[500px]', 'h-[550px]', 'h-[650px]'];
    return heights[index % heights.length];
  };

  // Static fallback if loading or fetch fails
  const displayCollections = collections; // collections.length > 0 ? collections : [
  //    { id: 1, name: 'T-SHIRTS', slug: 't-shirts', image: { url: '/images/star/05.jpg' } },
  //    { id: 2, name: 'HOODIES', slug: 'hoodies', image: { url: '/images/hoodies.jpg' } },
  //    { id: 3, name: 'SHORTS', slug: 'shorts', image: { url: '/images/star/07.jpg' } },
  //    { id: 4, name: 'VESTES', slug: 'vestes', image: { url: '/images/star/08.jpg' } }
  //];

  // Split into columns
  const col1Items = displayCollections.filter((_, i) => i % 2 === 0);
  const col2Items = displayCollections.filter((_, i) => i % 2 !== 0);

  return (
    <section ref={containerRef} className="py-24 bg-zinc-50 px-6 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-24 text-center">
             <span className="text-xs font-mono text-zinc-400 uppercase tracking-[0.3em] block mb-4">The Archive</span>
            <h2 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-none text-zinc-900">
                {t.collections.title}
            </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start h-auto overflow-y-auto md:overflow-visible hide-scrollbar">
            {/* Column 1 - Fast */}
            <div ref={col1Ref} className="flex flex-col gap-8 pt-0 md:pt-32">
                {col1Items.map((col, index) => (
                    <CollectionItem 
                        key={col.id}
                        title={col.name} 
                        subtitle={getSubtitle(col.slug)} 
                        img={col.image?.url || '/images/placeholder.jpg'} 
                        category={col.name} // Use name as category filter key
                        height={getHeight(index * 2)} // Preserve original height logic roughly
                    />
                ))}
            </div>

            {/* Column 2 - Medium */}
            <div ref={col2Ref} className="flex flex-col gap-8 pt-0 md:pt-16">
                 {col2Items.map((col, index) => (
                    <CollectionItem  
                        key={col.id}
                        title={col.name} 
                        subtitle={getSubtitle(col.slug)} 
                        img={col.image?.url || '/images/placeholder.jpg'} 
                        category={col.name}
                        height={getHeight(index * 2 + 1)}
                    />
                ))}
                 <Magnet strength={0.2} active={true}>
                     <div className="h-[300px] bg-zinc-900 text-zinc-50 p-8 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-zinc-800 transition-colors mt-8" onClick={() => navigate('/shop')}>
                        <h3 className="text-3xl font-bold uppercase tracking-tighter mb-4">View All</h3>
                        <div className="w-12 h-1 bg-zinc-50 mb-4"></div>
                        <p className="text-xs font-mono tracking-widest">DISCOVER THE FULL<br/>COLLECTION</p>
                     </div>
                 </Magnet>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionsGrid;