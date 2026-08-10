import { useEffect, useRef, useState } from 'react';
import ImageModal from './ImageModal';
import { buildBookingWhatsAppUrl, shortenUrl } from '../../../../utils/whatsapp';
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
  const [shareState, setShareState] = useState('idle');
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

  const hasWhatsapp = !!(effectiveShop?.phone);

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

  const handleBookNow = async (e) => {
    e.stopPropagation();
    const rawImage = product?.image || product?.thumbnail_image;
    const shortImage = rawImage ? await shortenUrl(rawImage) : null;
    const url = buildBookingWhatsAppUrl(product, effectiveShop, baseParams || {}, shortImage);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    if (shareState === 'loading') return;
    setShareState('loading');

    const descParts = [product.category, product.model, product.color].filter(Boolean);
    const imageUrl  = product.image || product.thumbnail_image || null;

    try {
      const { method, error } = await shareProduct({
        name:        product.name,
        description: descParts.join(' · '),
        imageUrl,
      });
      if (error === 'cancelled') {
        setShareState('idle');
      } else if (method === 'clipboard') {
        setShareState('done');
        setTimeout(() => setShareState('idle'), 2000);
      } else if (method === 'unsupported') {
        setShareState('error');
        setTimeout(() => setShareState('idle'), 2000);
      } else {
        setShareState('idle');
      }
    } catch {
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
            crossOrigin="anonymous"
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

          <div className="product-card__meta-row">
            <div className="product-card__badges">
              {product.color    && <span className="product-card__badge product-card__badge--color">{product.color}</span>}
              {product.category && <span className="product-card__badge product-card__badge--cat">{product.category}</span>}
              {product.model    && <span className="product-card__badge product-card__badge--model">{product.model}</span>}
            </div>
            {product.price != null && (
              <span className="product-card__price">₹{product.price.toLocaleString('en-IN')}</span>
            )}
          </div>

          {/* {variants.length > 0 && (
            <div className="product-card__variants">
              {visibleVariants.map((v) => (
                <span key={v.id} className="variant-pill">{v.attribute}</span>
              ))}
              {hiddenCount > 0 && (
                <span className="variant-pill variant-pill--more">+{hiddenCount}</span>
              )}
            </div>
          )} */}

          {/* Action row: Book Now + Share */}
          <div className="product-card__actions">
            {hasWhatsapp && (
              <button
                type="button"
                className="product-card__book-btn"
                onClick={handleBookNow}
              >
                Book Now
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{flexShrink:0}}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.833L.055 23.27a.75.75 0 0 0 .917.96l5.65-1.49A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.7-.5-5.25-1.375l-.372-.214-3.853 1.016 1.032-3.77-.23-.38A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
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
