declare module '@studio-freight/lenis' {
  interface LenisOptions {
    duration?: number;
    easing?: (time: number) => number;
    direction?: 'vertical' | 'horizontal';
    gestureDirection?: 'vertical' | 'horizontal' | 'both';
    smooth?: boolean;
    mouseMultiplier?: number;
    touchMultiplier?: number;
    paused?: boolean;
    orientation?: 'vertical' | 'horizontal';
    smoothWheel?: boolean;
    wheelMultiplier?: number;
    lerp?: number;
  }

  interface ScrollToOptions {
    offset?: number;
    duration?: number;
  }

  export default class Lenis {
    constructor(options?: LenisOptions);
    raf(time: number): void;
    update(): void;
    destroy(): void;
    scrollTo(target: HTMLElement, options?: ScrollToOptions): void;
  }
}
