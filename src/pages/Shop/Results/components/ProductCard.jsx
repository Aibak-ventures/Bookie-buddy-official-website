import { useState } from 'react';
import ImageModal from './ImageModal';

const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22120%22 height%3D%22120%22 viewBox%3D%220 0 120 120%22%3E%3Crect width%3D%22120%22 height%3D%22120%22 fill%3D%22%23f3f4f6%22%2F%3E%3Ctext x%3D%2250%25%22 y%3D%2250%25%22 dominant-baseline%3D%22middle%22 text-anchor%3D%22middle%22 font-size%3D%2232%22 fill%3D%22%239ca3af%22%3E📦%3C%2Ftext%3E%3C%2Fsvg%3E';

const MAX_VISIBLE_VARIANTS = 3;

/**
 * ProductCard — displays one product with image, name, badges, and variants.
 * Clicking the image opens ImageModal.
 */
const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const imgSrc = product.thumbnail_image || product.image || PLACEHOLDER;
  const fullImg = product.image || product.thumbnail_image || PLACEHOLDER;

  const variants = product.variants || [];
  const visibleVariants = variants.slice(0, MAX_VISIBLE_VARIANTS);
  const hiddenCount = variants.length - MAX_VISIBLE_VARIANTS;

  return (
    <>
      <div className={`product-card product-card--${viewMode}`}>
        <div className="product-card__image-wrap" onClick={() => setModalOpen(true)}>
          <img
            src={imgSrc}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
          />
          <span className="product-card__zoom-hint" aria-hidden="true">🔍</span>
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
