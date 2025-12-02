import React, { useEffect, useRef } from 'react';
import '../styles/parallax.css';

export default function ParallaxGallery({ images = [] , maxTranslate = 120 }) {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    function clamp(v, a = 0, b = 1) {
      return Math.max(a, Math.min(b, v));
    }

    function update() {
      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      const containerTop = rect.top + window.scrollY;
      const scrollPos = window.scrollY;
      const progress = clamp((scrollPos + windowH - containerTop) / (rect.height + windowH), 0, 1);

      const translate = progress * maxTranslate;

      if (leftRef.current) leftRef.current.style.transform = `translateY(${translate}px)`;
      if (rightRef.current) rightRef.current.style.transform = `translateY(${-translate}px)`;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [maxTranslate]);

  // split images into two columns
  const leftImages = images.slice(0, 4);
  const rightImages = images.slice(4, 8);

  return (
    <div className="parallax-container" ref={containerRef}>
      <div className="parallax-overlay parallax-overlay-top" />
      <div className="parallax-overlay parallax-overlay-bottom" />
      <div className="parallax-inner">
        <div className="parallax-columns">
          <div className="col">
            <div className="col-inner" ref={leftRef}>
              {leftImages.map((src, i) => (
                <div className="item" key={`l-${i}`}>
                  <img src={src} alt={`gallery-${i}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="col">
            <div className="col-inner" ref={rightRef}>
              {rightImages.map((src, i) => (
                <div className="item" key={`r-${i}`}>
                  <img src={src} alt={`gallery-r-${i}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
