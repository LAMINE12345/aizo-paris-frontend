import React from 'react';
import { Translations } from '../types';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Magnet from './Magnet';

interface FooterProps {
  t: Translations;
  openContact: () => void;
}

const SOCIAL_LINKS = [
    { name: 'Instagram', url: 'https://www.instagram.com/aizo_paris/' },
    { name: 'Twitter', url: 'https://x.com/AizoParis' },
    { name: 'LinkedIn', url: 'https://fr.linkedin.com/in/thierry-mivek-19b88b9b' }
];

const SUPPORT_LINKS = ['Shipping', 'Returns', 'Size Guide', 'FAQ'];

const Footer: React.FC<FooterProps> = ({ t, openContact }) => {
  const NAV_LINKS = [
    { label: t.nav.shop, path: '/shop' },
    { label: 'Collections', path: '/collections' },
    { label: 'Lookbook', path: '/lookbook' },
    { label: t.nav.about, path: '/about' }
  ];

  return (
    <footer className="bg-black text-white pt-32 pb-12 px-6 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Massive Pattern Header */}
        <div className="mb-24 overflow-hidden py-10 border-y border-white/10" data-cursor-text="AIZO ©">
             <div className="flex whitespace-nowrap gap-12 animate-marquee">
                 {[...Array(10)].map((_, i) => (
                    <h2 key={i} className="text-[12vw] leading-[0.8] font-bold tracking-tighter uppercase flex items-center gap-12 text-white/10 hover:text-white/30 transition-colors duration-500">
                        AIZO PARIS
                        <span className="w-4 h-4 rounded-full bg-white opacity-20"></span>
                    </h2>
                 ))}
             </div>
        </div>

        {/* Grid Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 border-t border-zinc-800 pt-16 mb-24">
            
            <div className="space-y-6">
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Navigation</h4>
                <ul className="space-y-2">
                    {NAV_LINKS.map(item => (
                        <li key={item.label}>
                            <Magnet strength={0.2} className="block w-fit">
                                <Link to={item.path} className="text-2xl font-bold uppercase hover:text-zinc-400 transition-colors flex items-start gap-2 group w-fit" data-cursor-text="VISIT">
                                    {item.label}
                                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </Magnet>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="space-y-6">
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Support</h4>
                 <ul className="space-y-2">
                    {SUPPORT_LINKS.map(item => (
                        <li key={item}>
                             <Magnet strength={0.2} className="block w-fit">
                                <a href="#" className="text-lg font-medium uppercase text-zinc-400 hover:text-white transition-colors block w-fit" data-cursor-text="HELP">
                                    {item}
                                </a>
                             </Magnet>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="space-y-6">
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Socials</h4>
                 <ul className="space-y-2">
                    {SOCIAL_LINKS.map(item => (
                        <li key={item.name}>
                             <Magnet strength={0.2} className="block w-fit">
                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-lg font-medium uppercase text-zinc-400 hover:text-white transition-colors block" data-cursor-text="FOLLOW">
                                    {item.name}
                                </a>
                             </Magnet>
                        </li>
                    ))}
                </ul>
            </div>

             <div className="space-y-6">
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Newsletter</h4>
                <p className="text-sm text-zinc-400">Join the club for exclusive drops.</p>
                <div className="border-b border-zinc-700 pb-2 flex justify-between group relative focus-within:border-white transition-colors duration-300">
                    <input type="email" placeholder="EMAIL" className="bg-transparent focus:outline-none uppercase placeholder-zinc-600 w-full text-white pb-2" />
                    <Magnet strength={0.2}>
                        <button className="text-xs font-bold uppercase hover:text-zinc-300 transition-colors absolute right-0 bottom-2" data-cursor-text="SEND">Submit</button>
                    </Magnet>
                </div>
            </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-end border-t border-zinc-800 pt-8 text-[10px] font-mono uppercase text-zinc-500 relative">
            <Magnet strength={0.5} className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-white text-black w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    aria-label="Scroll to top"
                    data-cursor-text="TOP"
                >
                    <ArrowUpRight className="w-6 h-6 -rotate-45" />
                </button>
            </Magnet>

            <div className="flex gap-4 mb-4 md:mb-0">
                <p>&copy; 2024 AIZO PARIS. {t.footer.rights}</p>
            </div>
            <div className="flex gap-8">
                <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                <span className="hover:text-white cursor-pointer transition-colors">Credits</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;