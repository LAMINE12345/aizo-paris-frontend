import React, { useEffect, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import Marquee from './Marquee';
import FeaturedProducts from './FeaturedProducts';
import CategoryGrid from './CategoryGrid';
import { Translations, Product } from '../types';
import { products } from '../constants';

// Lazy load heavy components below the fold
const About = React.lazy(() => import('./About'));
const CollectionsGrid = React.lazy(() => import('./CollectionsGrid'));
const Editorial = React.lazy(() => import('./Editorial'));
const Lookbook = React.lazy(() => import('./Lookbook'));
const FAQ = React.lazy(() => import('./FAQ'));
const Newsletter = React.lazy(() => import('./Newsletter'));

interface HomeProps {
  t: Translations;
  onProductClick: (product: Product) => void;
  products?: Product[];
}

const SectionLoader = () => <div className="w-full h-96 bg-zinc-50 animate-pulse" />;

const Home: React.FC<HomeProps> = ({ t, onProductClick, products: propProducts }) => {
  const displayProducts = propProducts && propProducts.length > 0 ? propProducts : products;
  const location = useLocation();

  useEffect(() => {
    // Check for section param in query (since we use HashRouter)
    // e.g. #/?section=about
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    if (section) {
      const elem = document.getElementById(section);
      if (elem) {
        setTimeout(() => {
            elem.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="flex flex-col w-full">
      <Hero t={t} />
      <Marquee t={t} />
      
      {/* Container with optimized vertical spacing */}
      <div className="flex flex-col gap-0 bg-white pb-0">
        <CategoryGrid t={t} />
        <div className="py-24 md:py-48">
          <FeaturedProducts products={displayProducts} t={t} onProductClick={onProductClick} />
        </div>
        
        <Suspense fallback={<SectionLoader />}>
          <CollectionsGrid t={t} />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <About t={t} />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Editorial t={t} />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Lookbook t={t} previewMode={true} />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <FAQ t={t} />
        </Suspense>
      </div>

      <Suspense fallback={<SectionLoader />}>
        <Newsletter t={t} />
      </Suspense>
    </div>
  );
};

export default Home;