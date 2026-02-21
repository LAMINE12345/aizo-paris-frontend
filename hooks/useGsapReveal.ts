import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseGsapRevealProps {
  triggerRef: React.RefObject<HTMLElement>;
  targetRef?: React.RefObject<HTMLElement>;
  selector?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
  active?: boolean;
  blur?: number;
  ease?: string;
  once?: boolean;
  toggleActions?: string;
}

export const useGsapReveal = ({
  triggerRef,
  targetRef,
  selector,
  direction = 'up',
  distance = 50,
  duration = 1,
  stagger = 0.1,
  delay = 0,
  start = "top 80%",
  active = true,
  blur = 0,
  ease = "power3.out",
  once = false,
  toggleActions: providedToggleActions
}: UseGsapRevealProps) => {
  useEffect(() => {
    if (!active || !triggerRef.current) return;

    const toggleActions = providedToggleActions || (once ? "play none none none" : "play none none reverse");

    const ctx = gsap.context((self) => {
      const targets = targetRef?.current
        ? [targetRef.current]
        : selector 
            ? (self.selector ? self.selector(selector) : gsap.utils.toArray(selector))
            : [triggerRef.current];
      
      let x = 0, y = 0;
      if (direction === 'up') y = distance;
      if (direction === 'down') y = -distance;
      if (direction === 'left') x = distance;
      if (direction === 'right') x = -distance;

      gsap.from(targets, {
        x,
        y,
        opacity: 0,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        duration,
        stagger,
        delay,
        ease,
        scrollTrigger: {
          trigger: triggerRef.current,
          start,
          toggleActions,
          once
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [triggerRef, targetRef, selector, direction, distance, duration, stagger, delay, start, active, blur, ease, once, providedToggleActions]);
};
