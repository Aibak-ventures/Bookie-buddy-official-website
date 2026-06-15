import { useState, useEffect } from 'react';

const ScrollIndicator = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top fixed bottom-8 right-8 left-auto z-[999] flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white shadow-md duration-300 ease-in-out hover:bg-opacity-80"
      aria-label="Back to top"
    >
      <span className="mt-[6px] h-3 w-3 rotate-45 border-t border-l border-white"></span>
    </button>
  );
};

export default ScrollIndicator;
