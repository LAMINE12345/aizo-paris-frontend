import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseGsapHorizontalScrollProps {
  containerRef: RefObject<HTMLElement>;
  triggerRef: RefObject<HTMLElement>;
  padding?: number;
  active?: boolean;
}

export const useGsapHorizontalScroll = ({
  containerRef,
  triggerRef,
  padding = 100,
  active = true
}: UseGsapHorizontalScrollProps) => {
  useEffect(() => {
    if (!active || !containerRef.current || !triggerRef.current) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current!;
      const trigger = triggerRef.current!;
      
      const totalWidth = container.scrollWidth;
      const windowWidth = window.innerWidth;
      
      gsap.to(container, {
        x: () => -(totalWidth - windowWidth + padding),
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [containerRef, triggerRef, padding, active]);
};
