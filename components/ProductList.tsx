import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Filter, X, ArrowUpRight, Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Product, Translations } from '../types';
import Magnet from './Magnet';

gsap.registerPlugin(ScrollTrigger);

interface ProductListProps {
  products: Product[];
  t: Translations;
  onProductClick: (product: Product) => void;
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
}

type SortOption = 'newest' | 'priceLow' | 'priceHigh';

const ProductList: React.FC<ProductListProps> = ({ products, t, onProductClick, wishlistItems, toggleWishlist }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [filter, setFilter] = useState<string>('ALL');
  const [sort, setSort] = useState<SortOption>('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);

  // Available Filter Options
  const availableColors = ['Black', 'White', 'Grey', 'Navy', 'Beige'];
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL'];

  // Filter Categories Map
  const categories = [
    { key: 'ALL', label: t.products.filters.all },
    { key: 'T-shirts', label: t.collections.items.tshirts },
    { key: 'Hoodies', label: t.collections.items.hoodies },
    { key: 'Shorts', label: t.collections.items.shorts },
    { key: 'Vestes', label: t.collections.items.vestes },
  ];

  const sortOptions = [
    { key: 'newest', label: t.products.sort.newest },
    { key: 'priceLow', label: t.products.sort.priceLow },
    { key: 'priceHigh', label: t.products.sort.priceHigh },
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const genderParam = params.get('gender');

    if (categoryParam) {
      const validCategory = categories.find(c => c.key === categoryParam.toUpperCase());
      if (validCategory) {
        setFilter(validCategory.key);
      }
    } else {
      setFilter('ALL');
    }

    if (genderParam) {
      setGenderFilter(genderParam.toUpperCase());
    } else {
      setGenderFilter(null);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.search]);

  useEffect(() => {
    let result = [...products];

    if (filter !== 'ALL') {
      result = result.filter(p => p.collections?.includes(filter) || p.category === filter);
    }

    if (genderFilter) {
      result = result.filter(p => p.gender === genderFilter);
    }

    if (selectedColors.length > 0) {
      result = result.filter(p => p.colors?.some(c => selectedColors.includes(c)));
    }

    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes?.some(s => selectedSizes.includes(s)));
    }

    if (sort === 'priceLow') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'priceHigh') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    setFilteredProducts(result);
    setVisibleCount(8);
  }, [filter, sort, products, genderFilter, selectedColors, selectedSizes]);

  // Animation on list change
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".product-card", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power2.out", clearProps: "all" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [filteredProducts, visibleCount]);

  const isLiked = (id: number) => wishlistItems.some(item => item.id === id);

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showMobileFilters && mobileMenuRef.current) {
      gsap.fromTo(mobileMenuRef.current, 
        { y: '100%' },
        { y: '0%', duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [showMobileFilters]);

  const closeMobileMenu = () => {
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        y: '100%',
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => setShowMobileFilters(false)
      });
    } else {
      setShowMobileFilters(false);
    }
  };

  return (
    <div ref={containerRef} className="bg-white min-h-screen pt-32 pb-32">
      
      {/* Header Section */}
      <div className="px-6 md:px-12 mb-20 md:mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-200 pb-10">
            <div>
                {genderFilter && (
                    <span className="inline-block bg-zinc-900 text-zinc-50 text-[10px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] mb-6">
                        {genderFilter === 'MEN' ? t.nav.men : genderFilter === 'WOMEN' ? t.nav.women : t.nav.kids}
                    </span>
                )}
                <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-zinc-900">
                    {t.products.title}
                </h1>
                <p className="mt-6 text-sm text-zinc-500 font-mono uppercase tracking-widest max-w-md leading-relaxed">
                    Explore our latest collection of premium streetwear. Designed in Paris, crafted for the world.
                    <span className="block mt-2 text-zinc-900 font-bold">{filteredProducts.length} Items Available</span>
                </p>
            </div>
            
            {/* Desktop Sort - Minimal */}
            <div className="hidden md:flex flex-col items-end gap-4">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Sort By</span>
                 <div className="flex gap-6">
                    {sortOptions.map(opt => (
                        <Magnet strength={0.1} active={true} key={opt.key}>
                            <button 
                                onClick={() => setSort(opt.key as SortOption)}
                                className={`text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:text-zinc-900 relative group/btn ${
                                    sort === opt.key ? 'text-zinc-900' : 'text-zinc-400'
                                }`}
                            >
                                {opt.label}
                                <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-zinc-900 transform origin-left transition-transform duration-300 ${sort === opt.key ? 'scale-x-100' : 'scale-x-0 group-hover/btn:scale-x-100'}`}></span>
                            </button>
                        </Magnet>
                    ))}
                 </div>
            </div>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden sticky top-[80px] z-30 bg-zinc-50/90 backdrop-blur-xl border-b border-zinc-200 flex justify-between items-center px-6 py-4 mb-12">
        <button onClick={() => setShowMobileFilters(true)} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-900">
             <Filter className="w-4 h-4" /> {t.products.filters.all}
        </button>
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{filteredProducts.length} Results</span>
      </div>

      {/* Main Content Layout */}
      <div className="flex px-6 md:px-12 gap-12">
        
        {/* Desktop Sidebar Filters */}
        <div className="hidden md:block w-64 shrink-0 sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto pr-6 hide-scrollbar">
             <div className="space-y-12">
                 {/* Categories */}
                 <div>
                     <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-zinc-400">Category</h3>
                     <ul className="space-y-3">
                         {categories.map((cat) => (
                             <li key={cat.key}>
                                <Magnet strength={0.1} active={true}>
                                    <button
                                        onClick={() => setFilter(cat.key)}
                                        className={`group flex items-center justify-between w-full text-left transition-all ${
                                            filter === cat.key ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-900'
                                        }`}
                                    >
                                        <span className={`text-sm uppercase font-bold tracking-wide transition-transform group-hover:translate-x-1 ${filter === cat.key ? 'translate-x-1' : ''}`}>
                                            {cat.label}
                                        </span>
                                    </button>
                                </Magnet>
                             </li>
                         ))}
                     </ul>
                 </div>

                 {/* Colors */}
                 <div>
                     <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-zinc-400">Color</h3>
                     <div className="flex flex-wrap gap-3">
                         {availableColors.map((color) => (
                            <Magnet strength={0.1} active={true} key={color}>
                                 <button
                                     onClick={() => setSelectedColors(prev => 
                                         prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
                                     )}
                                     className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                                         selectedColors.includes(color) 
                                             ? 'border-zinc-900 scale-110' 
                                             : 'border-zinc-200 hover:border-zinc-400'
                                     }`}
                                     style={{ backgroundColor: color.toLowerCase() }}
                                     title={color}
                                 >
                                    {selectedColors.includes(color) && (
                                        <Check className={`w-4 h-4 ${['White', 'Beige'].includes(color) ? 'text-zinc-900' : 'text-zinc-50'}`} />
                                    )}
                                 </button>
                            </Magnet>
                         ))}
                     </div>
                 </div>

                 {/* Sizes */}
                 <div>
                     <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-zinc-400">Size</h3>
                     <div className="grid grid-cols-3 gap-2">
                         {availableSizes.map((size) => (
                            <Magnet strength={0.1} active={true} key={size} className="w-full">
                                 <button
                                     onClick={() => setSelectedSizes(prev => 
                                         prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
                                     )}
                                     className={`w-full py-2 text-[10px] font-bold uppercase tracking-wider border transition-all ${
                                         selectedSizes.includes(size) 
                                             ? 'bg-zinc-900 text-zinc-50 border-zinc-900' 
                                             : 'bg-zinc-50 text-zinc-400 border-zinc-200 hover:border-zinc-900'
                                     }`}
                                 >
                                     {size}
                                 </button>
                            </Magnet>
                         ))}
                     </div>
                 </div>

                 {/* Clear Filters */}
                 {(selectedColors.length > 0 || selectedSizes.length > 0 || filter !== 'ALL') && (
                    <Magnet strength={0.1} active={true}>
                         <button 
                            onClick={() => {
                                setSelectedColors([]);
                                setSelectedSizes([]);
                                setFilter('ALL');
                            }}
                            className="w-full py-3 text-[10px] font-black uppercase tracking-widest border border-zinc-900 hover:bg-zinc-900 hover:text-zinc-50 transition-all text-zinc-900"
                         >
                             Reset All Filters
                         </button>
                    </Magnet>
                 )}
             </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.slice(0, visibleCount).map((product) => (
                    <div 
                        key={product.id} 
                        className="product-card group cursor-pointer"
                        onClick={() => onProductClick(product)}
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[3/4] bg-zinc-200 overflow-hidden mb-6">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                            />
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-colors duration-500" />

                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                                {product.isNew && (
                                    <span className="bg-zinc-50 text-zinc-900 text-[9px] font-black px-3 py-1.5 uppercase tracking-[0.2em] shadow-lg">
                                        New
                                    </span>
                                )}
                            </div>

                            {/* Wishlist Button */}
                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                <Magnet strength={0.2} active={true}>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                                        className="p-3 bg-zinc-50 text-zinc-900 hover:bg-zinc-900 hover:text-zinc-50 transition-colors rounded-full shadow-lg"
                                    >
                                        <Heart 
                                            className={`w-4 h-4 transition-colors ${isLiked(product.id) ? 'fill-current stroke-current text-red-500' : 'stroke-current'}`} 
                                        />
                                    </button>
                                </Magnet>
                            </div>

                            {/* Quick Action - Improved */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                <Magnet strength={0.1} active={true}>
                                    <button className="w-full bg-zinc-50/90 backdrop-blur-md text-zinc-900 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-zinc-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl border border-zinc-50/20">
                                        Quick View <ArrowUpRight className="w-3 h-3" />
                                    </button>
                                </Magnet>
                            </div>
                        </div>

                        {/* Info - Improved Typography */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-start gap-4">
                                <h3 className="text-sm font-bold uppercase tracking-tight leading-tight group-hover:text-zinc-600 transition-colors duration-300 text-zinc-900">
                                    {product.name}
                                </h3>
                                <span className="text-sm font-bold font-mono text-zinc-900">
                                    {product.price}€
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                                    {product.category}
                                </p>
                                
                                {/* Color Swatches Preview */}
                                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 translate-x-2 group-hover:translate-x-0">
                                    {product.colors && product.colors.slice(0, 3).map((c, i) => (
                                        <div 
                                            key={i} 
                                            className="w-2.5 h-2.5 rounded-full border border-zinc-300 shadow-sm" 
                                            style={{ backgroundColor: c.toLowerCase() }} 
                                        />
                                    ))}
                                    {product.colors && product.colors.length > 3 && (
                                        <span className="text-[9px] text-zinc-400 leading-none flex items-center">+</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Load More */}
            {visibleCount < filteredProducts.length && (
                <div className="flex justify-center mt-32">
                    <Magnet strength={0.2} active={true}>
                        <button 
                            onClick={loadMore}
                            className="group relative px-12 py-4 overflow-hidden border border-zinc-900 text-zinc-900 hover:text-zinc-50 transition-colors duration-500"
                        >
                            <div className="absolute inset-0 bg-zinc-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out -z-10"></div>
                            <span className="relative z-10 text-xs font-black uppercase tracking-[0.3em] group-hover:tracking-[0.5em] transition-all duration-500">
                                Load More
                            </span>
                        </button>
                    </Magnet>
                </div>
            )}
            
            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <div className="py-32 flex flex-col items-center justify-center text-center">
                    <p className="text-2xl font-black uppercase tracking-tighter text-zinc-300 mb-4">No Matches Found</p>
                    <button onClick={() => setFilter('ALL')} className="text-xs font-bold uppercase border-b border-zinc-900 pb-1 hover:text-zinc-500 transition-colors text-zinc-900">
                        Clear All Filters
                    </button>
                </div>
            )}
        </div>
      </div>

      {/* Mobile Filter Menu Overlay */}
      {showMobileFilters && (
        <div ref={mobileMenuRef} className="fixed inset-0 z-50 bg-zinc-50 flex flex-col">
           <div className="flex justify-between items-center p-6 border-b border-zinc-200">
               <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-900">Filter & Sort</h3>
               <button onClick={closeMobileMenu} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                   <X className="w-6 h-6 text-zinc-900" />
               </button>
           </div>
           
           <div className="flex-1 p-8 space-y-10 overflow-y-auto">
               {/* Sort Mobile */}
               <div>
                   <h4 className="font-mono text-zinc-500 text-xs uppercase mb-4 tracking-widest">Sort By</h4>
                   <div className="flex flex-wrap gap-3">
                       {sortOptions.map(opt => (
                           <button 
                                key={opt.key} 
                                onClick={() => { setSort(opt.key as SortOption); }}
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${sort === opt.key ? 'bg-zinc-900 text-zinc-50 border-zinc-900' : 'bg-zinc-50 text-zinc-400 border-zinc-200'}`}
                           >
                               {opt.label}
                           </button>
                       ))}
                   </div>
               </div>

               {/* Category Mobile */}
               <div>
                   <h4 className="font-mono text-zinc-500 text-xs uppercase mb-4 tracking-widest">Category</h4>
                   <div className="flex flex-col gap-2">
                       {categories.map(cat => (
                           <button 
                                key={cat.key} 
                                onClick={() => { setFilter(cat.key); }}
                                className={`text-left text-2xl font-bold uppercase tracking-tight transition-colors ${filter === cat.key ? 'text-zinc-900' : 'text-zinc-400'}`}
                           >
                               {cat.label}
                           </button>
                       ))}
                   </div>
               </div>
               
               {/* Colors Mobile */}
               <div>
                   <h4 className="font-mono text-zinc-500 text-xs uppercase mb-4 tracking-widest">Colors</h4>
                   <div className="flex flex-wrap gap-4">
                       {availableColors.map(color => (
                           <button 
                                key={color} 
                                onClick={() => setSelectedColors(prev => 
                                    prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
                                )}
                                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${selectedColors.includes(color) ? 'border-zinc-900 scale-110' : 'border-zinc-200'}`}
                                style={{ backgroundColor: color.toLowerCase() }}
                           >
                               {selectedColors.includes(color) && <Check className={`w-6 h-6 ${['White', 'Beige'].includes(color) ? 'text-zinc-900' : 'text-zinc-50'}`} />}
                           </button>
                       ))}
                   </div>
               </div>

               {/* Sizes Mobile */}
               <div>
                   <h4 className="font-mono text-zinc-500 text-xs uppercase mb-4 tracking-widest">Size</h4>
                   <div className="grid grid-cols-3 gap-3">
                       {availableSizes.map(size => (
                           <button 
                                key={size} 
                                onClick={() => setSelectedSizes(prev => 
                                    prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
                                )}
                                className={`py-4 text-sm font-bold uppercase border transition-colors ${selectedSizes.includes(size) ? 'bg-zinc-900 text-zinc-50 border-zinc-900' : 'bg-zinc-50 text-zinc-400 border-zinc-200'}`}
                           >
                               {size}
                           </button>
                       ))}
                   </div>
               </div>
           </div>

           <div className="p-6 border-t border-zinc-200 bg-zinc-50">
               <button 
                  onClick={closeMobileMenu}
                  className="w-full bg-zinc-900 text-zinc-50 py-4 font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors"
               >
                   Show {filteredProducts.length} Results
               </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
