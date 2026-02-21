import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Ruler } from 'lucide-react';
import { Translations } from '../types';
import Magnet from './Magnet';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations;
}

const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, t }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto' })
        .fromTo(modalRef.current, 
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" },
          "-=0.1"
        );
    } else {
      const tl = gsap.timeline();
      tl.to(modalRef.current, { scale: 0.95, opacity: 0, duration: 0.3, ease: "power3.in" })
        .to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
    }
  }, [isOpen]);

  const measurements = [
    { size: 'S', chest: '54', length: '70', sleeve: '22' },
    { size: 'M', chest: '56', length: '72', sleeve: '23' },
    { size: 'L', chest: '58', length: '74', sleeve: '24' },
    { size: 'XL', chest: '60', length: '76', sleeve: '25' },
  ];

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 opacity-0 pointer-events-none"
      onClick={onClose}
    >
      <div 
        ref={modalRef} 
        className="bg-white w-full max-w-2xl relative shadow-2xl rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
            backgroundImage: 'radial-gradient(#e4e4e7 1px, transparent 1px)',
            backgroundSize: '24px 24px'
        }}
      >
        <div className="bg-white p-6 flex justify-between items-center border-b border-zinc-100">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                    <Ruler className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter">{t.sizeGuide.title}</h3>
            </div>
            <Magnet strength={0.2} active={true}>
                <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors group">
                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </Magnet>
        </div>

        <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6">Specification</p>
                     <p className="text-sm leading-relaxed mb-4 text-zinc-600">
                        Our garments are constructed with an oversize fit. Measurements are taken flat in centimeters.
                     </p>
                     <p className="text-sm leading-relaxed text-zinc-600">
                        Tolerance +/- 1cm due to the artisanal nature of the production.
                     </p>
                </div>
                <div className="border border-zinc-200 rounded-xl p-4 flex items-center justify-center bg-white">
                    {/* Simple Silhouette SVG */}
                    <svg viewBox="0 0 100 100" className="w-32 h-32 opacity-20">
                         <path d="M20 30 L30 10 L70 10 L80 30 L80 90 L20 90 Z" fill="none" stroke="black" strokeWidth="2" />
                         <line x1="30" y1="40" x2="70" y2="40" stroke="black" strokeWidth="1" strokeDasharray="4" />
                         <line x1="50" y1="10" x2="50" y2="90" stroke="black" strokeWidth="1" strokeDasharray="4" />
                    </svg>
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-xl border border-zinc-100 shadow-sm">
                <table className="w-full text-sm font-mono text-center">
                    <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100">
                        <th className="py-4 px-4 font-bold text-black uppercase">{t.cart.size}</th>
                        <th className="py-4 px-4 text-zinc-500 font-bold uppercase">{t.sizeGuide.chest}</th>
                        <th className="py-4 px-4 text-zinc-500 font-bold uppercase">{t.sizeGuide.length}</th>
                        <th className="py-4 px-4 text-zinc-500 font-bold uppercase">{t.sizeGuide.sleeve}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {measurements.map((m) => (
                        <tr key={m.size} className="border-b border-zinc-50 last:border-b-0 hover:bg-zinc-50/50 transition-colors">
                        <td className="py-4 px-4 font-bold">{m.size}</td>
                        <td className="py-4 px-4 text-zinc-600">{m.chest}</td>
                        <td className="py-4 px-4 text-zinc-600">{m.length}</td>
                        <td className="py-4 px-4 text-zinc-600">{m.sleeve}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-8 flex justify-between items-end">
                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    AIZO PARIS LABS <br/> REF: SIZE-V2
                </div>
                <div className="w-24 h-8 bg-black"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;