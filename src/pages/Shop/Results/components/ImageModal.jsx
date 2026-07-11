import { useEffect, useState } from 'react';

/**
 * ImageModal — full-screen image viewer with click-to-zoom.
 */
const ImageModal = ({ src, alt, onClose }) => {
  const [zoomed, setZoomed] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="image-modal-backdrop"
      onClick={() => { if (!zoomed) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <button
        className="image-modal-close"
        onClick={onClose}
        aria-label="Close image"
      >
        ×
      </button>
      <div
        className={`image-modal-content${zoomed ? ' image-modal-content--zoomed' : ''}`}
        onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); }}
      >
        <img src={src} alt={alt} className="image-modal-img" draggable={false} />
      </div>
    </div>
  );
};

export default ImageModal;
