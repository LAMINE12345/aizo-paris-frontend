import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, ArrowRight, ScanLine, Loader2 } from 'lucide-react';
import { Translations } from '../types';
import { useAuth } from '../context/AuthContext';
import Magnet from './Magnet';

interface AuthSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations;
}

const AuthSidebar: React.FC<AuthSidebarProps> = ({ isOpen, onClose, t }) => {
  const { user, login, register, logout } = useAuth();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  const [view, setView] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const closeWithAnimation = () => {
    if (!sidebarRef.current || !overlayRef.current) {
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
      }
    });

    const elementsToAnimate = [headerRef.current, tabsRef.current, formRef.current, footerRef.current].filter(Boolean) as HTMLElement[];

    tl.to(elementsToAnimate, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in'
    })
    .to(sidebarRef.current, {
      x: '100%',
      duration: 0.5,
      ease: 'expo.in'
    }, "-=0.1")
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      pointerEvents: 'none'
    }, "-=0.3");
  };

  // Opening Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        if (!sidebarRef.current || !overlayRef.current) return;

        const tl = gsap.timeline();
        const elementsToAnimate = [headerRef.current, tabsRef.current, formRef.current, footerRef.current].filter(Boolean) as HTMLElement[];
        
        // Initial states
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(sidebarRef.current, { x: '100%' });
        gsap.set(elementsToAnimate, { y: 30, opacity: 0 });

        tl.to(overlayRef.current, { 
          opacity: 1, 
          duration: 0.4, 
          pointerEvents: 'auto',
          ease: 'power2.out'
        })
        .to(sidebarRef.current, { 
          x: '0%', 
          duration: 0.8, 
          ease: 'expo.out' 
        }, "-=0.2")
        .to(elementsToAnimate, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        }, "-=0.4");
      }
    }, sidebarRef);

    return () => ctx.revert();
  }, [isOpen]);

  // View Switching Animation
  useEffect(() => {
    if (isOpen && !user && formRef.current) {
      gsap.fromTo(formRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [view, isOpen, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (view === 'login') {
        await login({ identifier: email, password });
      } else {
        await register({ username, email, password });
      }
      
      // Animation on success
      gsap.to(formRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.3,
      });
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setView('login');
  }

  return (
    <>
      <div 
        ref={overlayRef} 
        onClick={closeWithAnimation}
        className="fixed inset-0 bg-zinc-950/60 z-[60] opacity-0 pointer-events-none backdrop-blur-sm"
      />
      
      <div 
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-zinc-50 z-[70] transform translate-x-full shadow-2xl flex flex-col border-l border-zinc-900"
      >
        {/* Header */}
        <div ref={headerRef} className="p-8 border-b border-zinc-900 flex justify-between items-start bg-zinc-50">
            <div>
                <h2 className="text-4xl font-bold uppercase tracking-tighter leading-none mb-2 text-zinc-900">
                    {user ? 'Member ID' : 'Access'}
                </h2>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Secure Gateway v2.4</span>
                </div>
            </div>
            <Magnet strength={0.2} active={true}>
                <button 
                    onClick={closeWithAnimation} 
                    className="group p-2 hover:bg-zinc-900 hover:text-zinc-50 rounded-full transition-colors border border-transparent hover:border-zinc-900"
                >
                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </Magnet>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-zinc-50 relative">
            {user ? (
                // LOGGED IN STATE - Digital ID Card Style
                <div ref={formRef} className="p-8 animate-fade-in h-full flex flex-col">
                    <div className="bg-white border border-zinc-200 p-6 relative overflow-hidden group hover:border-zinc-900 transition-colors duration-500 shadow-sm">
                         {/* Watermark */}
                         <div className="absolute top-0 right-0 w-48 h-48 opacity-5 -translate-y-8 translate-x-8 pointer-events-none select-none grayscale">
                            <img src="/images/logo.png" alt="" className="w-full h-full object-contain" />
                         </div>

                         <div className="relative z-10 flex justify-between items-start mb-8">
                             <div className="w-24 h-32 border border-zinc-900 bg-white p-1">
                                 <img src={`https://ui-avatars.com/api/?name=${user.username}&background=000&color=fff&size=128`} className="w-full h-full object-cover grayscale contrast-125" alt="User" />
                             </div>
                             <div className="text-right">
                                 <ScanLine className="w-8 h-8 ml-auto mb-2 opacity-50 text-zinc-900" />
                                 <p className="text-xs font-mono uppercase text-zinc-400">Status</p>
                                 <p className="text-xl font-bold uppercase text-zinc-900">Member</p>
                             </div>
                         </div>

                         <div className="relative z-10 space-y-1 mb-8">
                             <h3 className="text-3xl font-bold uppercase tracking-tighter text-zinc-900">{user.username}</h3>
                             <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">Member #{user.id.toString().padStart(4, '0')}-X</p>
                             <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">{user.email}</p>
                         </div>

                         {/* Barcode Visual */}
                         <div className="h-12 bg-zinc-900 w-full mb-2 opacity-90 relative overflow-hidden">
                             <div className="absolute inset-0 flex gap-1 justify-center opacity-50">
                                 {[...Array(40)].map((_, i) => (
                                     <div key={i} className="bg-white h-full" style={{ width: Math.random() * 4 + 'px' }}></div>
                                 ))}
                             </div>
                         </div>
                         <p className="text-[10px] text-center font-mono uppercase text-zinc-400">88291000299102</p>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="border border-zinc-200 p-4 text-center hover:bg-zinc-900 hover:text-zinc-50 transition-colors cursor-pointer group/box bg-white">
                            <span className="block text-2xl font-bold mb-1 group-hover/box:scale-110 transition-transform text-zinc-900 group-hover/box:text-zinc-50">0</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 group-hover/box:text-zinc-300">Orders</span>
                        </div>
                        <div className="border border-zinc-200 p-4 text-center hover:bg-zinc-900 hover:text-zinc-50 transition-colors cursor-pointer group/box bg-white">
                            <span className="block text-2xl font-bold mb-1 group-hover/box:scale-110 transition-transform text-zinc-900 group-hover/box:text-zinc-50">0</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 group-hover/box:text-zinc-300">Points</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-8">
                        <Magnet strength={0.1} active={true}>
                            <button 
                                onClick={handleLogout}
                                className="w-full py-4 border-t border-b border-zinc-200 text-sm font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-zinc-50 transition-colors flex justify-between items-center px-4 text-zinc-900"
                            >
                                {t.auth.logout}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Magnet>
                    </div>
                </div>
            ) : (
                // AUTH FORMS
                <div className="flex flex-col min-h-full">
                    {/* Toggle Tabs */}
                    <div ref={tabsRef} className="flex border-b border-zinc-200">
                        <div className="flex-1">
                            <Magnet strength={0.1} active={true} className="w-full">
                                <button 
                                    onClick={() => { setView('login'); setError(null); }}
                                    className={`w-full py-6 text-sm font-bold uppercase tracking-widest transition-all relative ${view === 'login' ? 'bg-zinc-900 text-zinc-50' : 'hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900'}`}
                                >
                                    {t.auth.login}
                                    {view === 'login' && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-50"></div>}
                                </button>
                            </Magnet>
                        </div>
                        <div className="flex-1">
                            <Magnet strength={0.1} active={true} className="w-full">
                                <button 
                                    onClick={() => { setView('register'); setError(null); }}
                                    className={`w-full py-6 text-sm font-bold uppercase tracking-widest transition-all relative ${view === 'register' ? 'bg-zinc-900 text-zinc-50' : 'hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900'}`}
                                >
                                    {t.auth.register}
                                    {view === 'register' && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-50"></div>}
                                </button>
                            </Magnet>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                        <div ref={formRef}>
                             <div className="mb-12">
                                <h3 className="text-2xl font-bold uppercase mb-2 text-zinc-900">
                                    {view === 'login' ? 'Welcome Back' : 'Join The Club'}
                                </h3>
                                <p className="text-xs text-zinc-500 font-mono max-w-xs leading-relaxed">
                                    {view === 'login' 
                                        ? 'Please enter your credentials to access your personal collection and order history.' 
                                        : 'Create an account to unlock early access to drops, exclusive content and more.'}
                                </p>
                             </div>

                             {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-xs font-mono uppercase tracking-wider">
                                    {error}
                                </div>
                             )}

                             <form onSubmit={handleSubmit} className="space-y-6">
                                {view === 'register' && (
                                    <div className="space-y-2 group">
                                        <label htmlFor="auth-username" className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400 group-focus-within:text-zinc-900 transition-colors">Username</label>
                                        <input 
                                            id="auth-username"
                                            name="username"
                                            required
                                            type="text" 
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full bg-transparent border-b border-zinc-200 py-4 text-sm focus:outline-none focus:border-zinc-900 transition-all font-mono placeholder:text-zinc-300 text-zinc-900"
                                            placeholder="JohnDoe"
                                        />
                                    </div>
                                )}
                                <div className="space-y-2 group">
                                    <label htmlFor="auth-email" className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400 group-focus-within:text-zinc-900 transition-colors">Email Address</label>
                                    <input 
                                        id="auth-email"
                                        name="email"
                                        required
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-transparent border-b border-zinc-200 py-4 text-sm focus:outline-none focus:border-zinc-900 transition-all font-mono placeholder:text-zinc-300 text-zinc-900"
                                        placeholder="user@example.com"
                                    />
                                </div>
                                <div className="space-y-2 group">
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="auth-password" className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400 group-focus-within:text-zinc-900 transition-colors">Password</label>
                                        {view === 'login' && (
                                            <button type="button" className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors">Forgot?</button>
                                        )}
                                    </div>
                                    <input 
                                        id="auth-password"
                                        name="password"
                                        autoComplete={view === 'login' ? "current-password" : "new-password"}
                                        required
                                        type="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-transparent border-b border-zinc-200 py-4 text-sm focus:outline-none focus:border-zinc-900 transition-all font-mono placeholder:text-zinc-300 text-zinc-900"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="pt-8">
                                    <Magnet strength={0.1} active={true}>
                                        <button 
                                            disabled={isLoading}
                                            className="w-full group relative overflow-hidden bg-zinc-900 text-zinc-50 py-6 text-sm font-bold uppercase tracking-[0.3em] disabled:bg-zinc-400 disabled:cursor-not-allowed rounded-xl"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                {isLoading ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    <>
                                                        {view === 'login' ? 'Authenticate' : 'Initialize Account'}
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </span>
                                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                        </button>
                                    </Magnet>
                                </div>
                             </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </>
  );
};

export default AuthSidebar;
