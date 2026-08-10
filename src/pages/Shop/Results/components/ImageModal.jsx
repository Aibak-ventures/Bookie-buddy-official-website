import { useEffect, useState } from 'react';

const ImageModal = ({ src, alt, onClose }) => {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    // Push one history entry — back button will pop it and close the modal
    window.history.pushState({ modal: true }, '');
    document.body.style.overflow = 'hidden';

    const handlePop = () => onClose();
    const handleKey = (e) => { if (e.key === 'Escape') handleClose(); };

    window.addEventListener('popstate', handlePop);
    document.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('popstate', handlePop);
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Always close via history.back() so the pushed entry is consumed
  const handleClose = () => window.history.back();

  return (
    <div
      className="image-modal-backdrop"
      onClick={() => { if (!zoomed) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <button
        className="image-modal-close"
        onClick={handleClose}
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
