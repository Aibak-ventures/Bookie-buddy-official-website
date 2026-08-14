import { useEffect, useState } from 'react';

const ImageModal = ({ src, alt, onClose }) => {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    // Push one history entry so OS back button closes the modal
    window.history.pushState({ modal: true }, '');
    document.body.style.overflow = 'hidden';

    // OS back button — pop the pushed entry and close
    const handlePop = () => onClose();
    // Escape key
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };

    window.addEventListener('popstate', handlePop);
    document.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('popstate', handlePop);
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Close button & backdrop: consume the pushed history entry, then close
  const handleClose = () => {
    window.history.back(); // pops the pushState entry we added on mount
    onClose();
  };

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
