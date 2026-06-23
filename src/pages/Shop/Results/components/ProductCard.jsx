import { useEffect, useRef, useState } from 'react';
import ImageModal from './ImageModal';
import { buildBookingWhatsAppUrl } from '../../../../utils/whatsapp';
import { shareProduct } from '../../../../utils/share';

const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22120%22 height%3D%22120%22 viewBox%3D%220 0 120 120%22%3E%3Crect width%3D%22120%22 height%3D%22120%22 fill%3D%22%23f3f4f6%22%2F%3E%3Ctext x%3D%2250%25%22 y%3D%2250%25%22 dominant-baseline%3D%22middle%22 text-anchor%3D%22middle%22 font-size%3D%2232%22 fill%3D%22%239ca3af%22%3E📦%3C%2Ftext%3E%3C%2Fsvg%3E';

const MAX_VISIBLE_VARIANTS = 3;

/** Android/Material share icon — three circles connected by two lines. */
const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6"  cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59"  y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" strokeWidth="2" />
    <line x1="15.41" y1="6.51"  x2="8.59"  y2="10.49" stroke="currentColor" strokeWidth="2" />
  </svg>
);

/**
 * ProductCard — displays one product with image, name, badges, variants,
 * a "Book Now" CTA that opens WhatsApp with a pre-filled booking message,
 * and a "Share" button that uses the Web Share API (with image) when available,
 * falling back to text share or clipboard copy.
 *
 * The Book Now and Share buttons are hidden by default:
 * - Desktop: revealed on hover (pure CSS, see Results.css).
 * - Touch devices: revealed by tapping the card; tapping outside hides them again.
 */
const ProductCard = ({ product, viewMode = 'grid', shop, baseParams, isOrganization = false, associatedShops = [] }) => {
  const [modalOpen,  setModalOpen]  = useState(false);
  const [isActive,   setIsActive]   = useState(false);
  const [shareState, setShareState] = useState('idle'); // 'idle' | 'loading' | 'done' | 'error'
  const cardRef = useRef(null);

  const imgSrc  = product.thumbnail_image || product.image || PLACEHOLDER;
  const fullImg = product.image || product.thumbnail_image || PLACEHOLDER;

  const variants        = product.variants || [];
  const visibleVariants = variants.slice(0, MAX_VISIBLE_VARIANTS);
  const hiddenCount     = variants.length - MAX_VISIBLE_VARIANTS;

  // For org products, use the originating associated shop's phone; fall back to the org shop.
  const effectiveShop = isOrganization && product.shop_id
    ? (associatedShops.find((s) => s.id === product.shop_id) ?? shop)
    : shop;

  const whatsappUrl = buildBookingWhatsAppUrl(product, effectiveShop, baseParams || {});

  // On touch devices, tapping outside an active card hides its buttons again.
  useEffect(() => {
    if (!isActive) return;

    const handleOutsideClick = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('touchstart', handleOutsideClick);
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isActive]);

  const handleCardTap = () => {
    setIsActive((prev) => !prev);
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    if (shareState === 'loading') return;
    setShareState('loading');

    const { method, error } = await shareProduct({
      imageUrl:   fullImg,
      name:       product.name,
      description: product.category || '',
      productUrl: window.location.href,
    });

    if (error === 'cancelled') {
      setShareState('idle');
      return;
    }

    if (method === 'clipboard') {
      // Show "Copied!" tick briefly, then reset
      setShareState('done');
      setTimeout(() => setShareState('idle'), 2000);
    } else if (method === 'unsupported') {
      setShareState('error');
      setTimeout(() => setShareState('idle'), 2000);
    } else {
      // native-file or native-text: share sheet handled it — just reset
      setShareState('idle');
    }
  };

  // Label shown inside the share button
  const shareLabel = shareState === 'loading'
    ? '…'
    : shareState === 'done'
      ? '✓'
      : shareState === 'error'
        ? '✕'
        : <ShareIcon />;

  return (
    <>
      <div
        ref={cardRef}
        className={`product-card product-card--${viewMode}${isActive ? ' product-card--active' : ''}`}
        onClick={handleCardTap}
      >
        <div
          className="product-card__image-wrap"
          onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
        >
          <img
            src={imgSrc}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
          />
          <span className="product-card__zoom-hint" aria-hidden="true">🔍</span>
          {isOrganization && product.shop_place && (
            <span className="product-card__place-badge" aria-label={`Location: ${product.shop_place}`}>
              <svg className="product-card__place-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {product.shop_place}
            </span>
          )}
        </div>

        <div className="product-card__body">
          <h3 className="product-card__name">{product.name}</h3>

          <div className="product-card__badges">
            {product.color    && <span className="product-card__badge product-card__badge--color">{product.color}</span>}
            {product.category && <span className="product-card__badge product-card__badge--cat">{product.category}</span>}
            {product.model    && <span className="product-card__badge product-card__badge--model">{product.model}</span>}
          </div>

          {variants.length > 0 && (
            <div className="product-card__variants">
              {visibleVariants.map((v) => (
                <span key={v.id} className="variant-pill">{v.attribute}</span>
              ))}
              {hiddenCount > 0 && (
                <span className="variant-pill variant-pill--more">+{hiddenCount}</span>
              )}
            </div>
          )}

          {/* Action row: Book Now + Share */}
          <div className="product-card__actions">
            {whatsappUrl && (
              <button
                type="button"
                className="product-card__book-btn"
                onClick={handleBookNow}
              >
                Book Now
              </button>
            )}
            <button
              type="button"
              className={`product-card__share-btn${shareState === 'done' ? ' product-card__share-btn--copied' : ''}${shareState === 'error' ? ' product-card__share-btn--error' : ''}`}
              onClick={handleShare}
              aria-label={shareState === 'done' ? 'Link copied!' : shareState === 'error' ? 'Share not supported' : 'Share product'}
              disabled={shareState === 'loading'}
            >
              {shareLabel}
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <ImageModal
          src={fullImg}
          alt={product.name}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
