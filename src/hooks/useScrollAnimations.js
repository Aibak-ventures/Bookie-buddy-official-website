import { useEffect } from 'react';

const useScrollAnimations = () => {
  useEffect(() => {
    let wowInstance = null;

    const initWow = async () => {
      try {
        const { WOW } = await import('wowjs');
        wowInstance = new WOW({ live: false });
        wowInstance.init();
      } catch (err) {
        console.warn('WOW.js failed to load:', err);
      }
    };

    initWow();

    return () => {
      // WOW doesn't have a destroy method, nothing to clean up
    };
  }, []);
};

export default useScrollAnimations;
