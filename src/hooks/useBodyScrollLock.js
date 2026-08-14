import { useEffect } from 'react';

/**
 * Locks body scroll when `isLocked` is true; restores on unlock or unmount.
 * Pass a boolean condition — e.g. `useBodyScrollLock(isCalendarOpen)`.
 */
export function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isLocked]);
}
