import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseGsapSkewOptions {
  triggerRef: RefObject<HTMLElement>;
  targetSelector: string;
  velocityFactor?: number;
  duration?: number;
  maxSkew?: number;
  active?: boolean;
}

export const useGsapSkew = ({
  triggerRef,
  targetSelector,
  velocityFactor = -300,
  duration = 0.8,
  maxSkew = 20,
  active = true
}: UseGsapSkewOptions) => {
  useEffect(() => {
    if (!triggerRef.current || !active) return;

    const ctx = gsap.context(() => {
      let proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(targetSelector, "skewY", "deg");
      const clamp = gsap.utils.clamp(-maxSkew, maxSkew);

      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / velocityFactor);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: duration,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew)
            });
          }
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [triggerRef, targetSelector, velocityFactor, duration, maxSkew, active]);
};
