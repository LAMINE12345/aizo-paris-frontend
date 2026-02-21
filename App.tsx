import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import CustomCursor from './components/CustomCursor';
import Home from './components/Home'; // Keep Home eager for LCP
import Preloader from './components/Preloader';
import Toast from './components/Toast';
import PageTransition from './components/PageTransition'; 
import { products, translations } from './constants';
import { Product, Language, CartItem } from './types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import axios from 'axios';

// Lazy Load Pages
const ProductList = lazy(() => import('./components/ProductList'));
const Lookbook = lazy(() => import('./components/Lookbook'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));

// Lazy Load Modals/Sidebars
const ProductModal = lazy(() => import('./components/ProductModal'));
const SizeGuideModal = lazy(() => import('./components/SizeGuideModal'));
const CartSidebar = lazy(() => import('./components/CartSidebar'));
const WishlistSidebar = lazy(() => import('./components/WishlistSidebar'));
const AuthSidebar = lazy(() => import('./components/AuthSidebar'));
const SearchOverlay = lazy(() => import('./components/SearchOverlay'));
const ContactModal = lazy(() => import('./components/ContactModal'));
const CookieBanner = lazy(() => import('./components/CookieBanner'));
const Footer = lazy(() => import('./components/Footer')); // Footer can be lazy loaded if it's below fold, but usually it's fine. keeping it eager or lazy is fine. Let's lazy load it to reduce initial bundle.

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  
  useEffect(() => {
    // Only scroll to top if not scrolling to a specific section (handled in Home)
    if (!search.includes('section=')) {
        // Delay scroll slightly to happen behind the transition curtain
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }
  }, [pathname, search]);
  
  return null;
}

import { useLanguage } from './context/LanguageContext';

const App: React.FC = () => {
  // State
  const { lang, setLang, t } = useLanguage();
  
  // Navigation States
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  
  // Data States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  
  // Product Interaction States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  
  // UI Feedback States
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Translations convenience
  // t is already destructured from useLanguage()
  const [productsData, setProductsData] = useState<Product[]>(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337';
        const response = await axios.get(`${STRAPI_URL}/api/products?populate=*`);
        
        if (response.data && response.data.data) {
          const fetchedProducts = response.data.data.map((item: any) => {
             // Handle v4/v5 structure differences
             const id = item.id;
             const attrs = item.attributes || item;
             
             // Image URL handling
             let imageUrl = "/images/placeholder.jpg"; // Fallback
             const imageField = attrs.image;
             if (imageField) {
                 const imageData = imageField.data !== undefined ? imageField.data : imageField;
                 if (imageData) {
                     const imgItem = Array.isArray(imageData) ? imageData[0] : imageData;
                     const imgAttrs = imgItem.attributes || imgItem;
                     if (imgAttrs && imgAttrs.url) {
                         imageUrl = imgAttrs.url.startsWith('http') 
                             ? imgAttrs.url 
                             : `${STRAPI_URL}${imgAttrs.url}`;
                     }
                 }
             }

             // Map collections/categories
             // If "collections" is a relation, we need to extract names
             let productCollections: string[] = [];
             const collectionsField = attrs.collections;
             if (collectionsField) {
                 const colData = collectionsField.data !== undefined ? collectionsField.data : collectionsField;
                 if (Array.isArray(colData)) {
                     productCollections = colData.map((c: any) => {
                         const cAttrs = c.attributes || c;
                         const name = cAttrs.name || '';
                         // Normalize to Title Case for matching frontend filters (e.g. "T-shirts", "Hoodies")
                         return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
                     }).filter(Boolean);
                 }
             }

             // Determine primary category from collections if possible, or default
             const category = productCollections.length > 0 ? productCollections[0] : 'Uncategorized';
             
             // Sanitize colors to ensure they are strings
             let productColors: string[] = [];
             if (Array.isArray(attrs.colors)) {
                 productColors = attrs.colors.map((c: any) => {
                     if (typeof c === 'string') return c;
                     if (typeof c === 'object' && c !== null) {
                         return c.name || c.value || c.color || '';
                     }
                     return String(c);
                 }).filter((c: string) => c !== '');
             }

             // Sanitize sizes to ensure they are strings
             let productSizes: string[] = [];
             if (Array.isArray(attrs.sizes)) {
                 productSizes = attrs.sizes.map((s: any) => {
                     if (typeof s === 'string') return s;
                     if (typeof s === 'object' && s !== null) {
                         return s.name || s.value || s.size || '';
                     }
                     return String(s);
                 }).filter((s: string) => s !== '');
             }

             return {
               id: id,
               name: attrs.name || 'Untitled Product',
               price: attrs.price || 0,
               image: imageUrl,
               category: category, // Using first collection as category for now
               gender: attrs.gender || 'HOMME',
               collections: productCollections,
               colors: productColors,
               sizes: productSizes,
               isNew: attrs.isNew || false
             };
          });
          
          if (fetchedProducts.length > 0) {
              setProductsData(fetchedProducts);
          }
        }
      } catch (error) {
        console.error('Error fetching products from Strapi:', error);
        // Keep using the static products from constants as fallback
      }
    };
    
    fetchProducts();
  }, []);

  // Actions
  const addToCart = (product: Product, size: string) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.product.id === product.id && item.size === size
      );

      if (existingItemIndex > -1) {
        // Increment quantity if exists
        const newItems = [...prev];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        // Add new item
        return [...prev, { product, size, quantity: 1 }];
      }
    });
    
    // Show Toast
    setToastMessage(`${t.products.added} — ${size}`);
  };

  const updateQuantity = (productId: number, size: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.size === size) {
          return { ...item, quantity: Math.max(0, item.quantity + delta) };
        }
        return item;
      }).filter(item => item.quantity > 0); // Remove if quantity becomes 0
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const openProductModal = (product: Product) => {
    // If modal is already open (e.g. from related products), we might want a smooth transition
    // For now, React update will handle it
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    // Timeout to clear product after animation
    setTimeout(() => setSelectedProduct(null), 300);
  };

  // Initialize Lenis for Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    // Connect Lenis to ScrollTrigger
    // @ts-ignore
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    // Global anchor link smooth scroll handler
    const handleAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;

      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      // Only handle if it's a pure hash link and not a router link
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
         // Logic handled by Home component for section query params, 
         // but if we have local anchors (e.g. #top), Lenis handles it.
         const id = anchor.getAttribute('href');
         if (id && id !== '#' && !id.includes('/')) {
           const element = document.querySelector(id);
           if (element) {
             e.preventDefault();
             lenis.scrollTo(element as HTMLElement);
           }
         }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <HashRouter>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <ScrollToTop />
      <div className="relative min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white cursor-auto md:cursor-none flex flex-col">
        <div className="noise-overlay" />
        <CustomCursor />
        
        {/* Next Level Transition */}
        <PageTransition />
        
        <Navbar 
          cartCount={cartCount}
          openCart={() => setCartOpen(true)}
          wishlistCount={wishlistItems.length}
          openWishlist={() => setWishlistOpen(true)}
          openMobileMenu={() => setMobileMenuOpen(true)}
          openSearch={() => setSearchOpen(true)}
          openAuth={() => setAuthOpen(true)}
        />

        <MobileMenu 
           isOpen={mobileMenuOpen} 
           onClose={() => setMobileMenuOpen(false)} 
           openWishlist={() => {
             setMobileMenuOpen(false);
             setTimeout(() => setWishlistOpen(true), 500);
           }}
           openAuth={() => {
             setMobileMenuOpen(false);
             setTimeout(() => setAuthOpen(true), 500);
           }}
           wishlistCount={wishlistItems.length}
        />

        <SearchOverlay 
           isOpen={searchOpen} 
           onClose={() => setSearchOpen(false)}
           products={productsData}
           onProductClick={openProductModal}
           t={t}
        />

        <main className="flex-grow">
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div></div>}>
            <Routes>
              <Route path="/" element={<Home t={t} onProductClick={openProductModal} products={productsData} />} />
              <Route path="/about" element={<AboutPage t={t} />} />
              <Route path="/contact" element={<ContactPage t={t} />} />
              <Route path="/collections" element={<Home t={t} onProductClick={openProductModal} products={productsData} />} />
              <Route path="/lookbook" element={<Lookbook t={t} />} />
              <Route 
                path="/shop" 
                element={
                  <ProductList 
                    products={productsData} 
                    t={t} 
                    onProductClick={openProductModal} 
                    wishlistItems={wishlistItems}
                    toggleWishlist={toggleWishlist}
                  />
                } 
              />
              {/* Catch-all route to redirect back home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        <Suspense fallback={null}>
            <Footer 
            t={t} 
            openContact={() => setContactOpen(true)}
            />
            
            <CookieBanner t={t} />

            <CartSidebar 
            isOpen={cartOpen} 
            onClose={() => setCartOpen(false)} 
            items={cartItems}
            updateQuantity={updateQuantity}
            t={t}
            clearCart={clearCart}
            />

            <WishlistSidebar
            isOpen={wishlistOpen}
            onClose={() => setWishlistOpen(false)}
            items={wishlistItems}
            removeFromWishlist={(id) => setWishlistItems(prev => prev.filter(i => i.id !== id))}
            onProductClick={openProductModal}
            t={t}
            />

            <AuthSidebar 
            isOpen={authOpen}
            onClose={() => setAuthOpen(false)}
            t={t}
            />

            <ContactModal
            isOpen={contactOpen}
            onClose={() => setContactOpen(false)}
            t={t}
            />

            <ProductModal 
            product={selectedProduct}
            products={productsData}
            isOpen={isModalOpen}
            onClose={closeProductModal}
            addToCart={addToCart}
            openSizeGuide={() => setIsSizeGuideOpen(true)}
            t={t}
            isLiked={selectedProduct ? wishlistItems.some(item => item.id === selectedProduct.id) : false}
            toggleWishlist={toggleWishlist}
            onProductClick={openProductModal}
            />

            <SizeGuideModal 
            isOpen={isSizeGuideOpen} 
            onClose={() => setIsSizeGuideOpen(false)}
            t={t}
            />
        </Suspense>

        <Toast 
          message={toastMessage} 
          onClose={() => setToastMessage(null)} 
        />
      </div>
    </HashRouter>
  );
};

export default App;
