import { useState, useEffect } from 'react';

/**
 * Returns 2 when the viewport is ≥768px wide, 1 otherwise.
 * Updates on window resize. Used by DayPicker to show 1 or 2 month panels.
 */
export function useResponsiveMonths() {
  const [months, setMonths] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1
  );

  useEffect(() => {
    const handleResize = () => setMonths(window.innerWidth >= 768 ? 2 : 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return months;
}
