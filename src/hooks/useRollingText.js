import { useEffect } from 'react';

const useRollingText = (containerRef) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const timeout = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const phrases = container.querySelectorAll('span');
      if (phrases.length === 0) return;

      // Calculate max width
      let maxWidth = 0;
      phrases.forEach(phrase => {
        phrase.style.position = 'static';
        phrase.style.visibility = 'hidden';
        phrase.style.opacity = '1';
        const width = phrase.offsetWidth;
        if (width > maxWidth) maxWidth = width;
        phrase.style.position = 'absolute';
        phrase.style.visibility = 'visible';
        phrase.style.opacity = '0';
      });

      container.style.width = maxWidth + 'px';

      // Hide all initially
      phrases.forEach(phrase => {
        phrase.style.opacity = '0';
        phrase.style.transform = 'rotateX(-90deg)';
      });

      let currentIndex = 0;

      // Show first phrase
      const firstTimer = setTimeout(() => {
        if (phrases[0]) phrases[0].classList.add('active');
      }, 200);

      // Cycle through phrases
      const interval = setInterval(() => {
        if (!container.isConnected) {
          clearInterval(interval);
          return;
        }
        phrases[currentIndex].classList.remove('active');
        phrases[currentIndex].classList.add('inactive');

        currentIndex = (currentIndex + 1) % phrases.length;

        setTimeout(() => {
          phrases.forEach(p => p.classList.remove('inactive'));
          phrases[currentIndex].classList.add('active');
        }, 500);
      }, 5000);

      // Store cleanup refs on the container
      container._rollingCleanup = () => {
        clearTimeout(firstTimer);
        clearInterval(interval);
      };
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (containerRef.current && containerRef.current._rollingCleanup) {
        containerRef.current._rollingCleanup();
      }
    };
  }, [containerRef]);
};

export default useRollingText;
