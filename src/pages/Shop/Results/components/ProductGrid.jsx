import ProductCard from './ProductCard';

/**
 * ProductGrid — renders products in a responsive grid or list layout.
 * viewMode: 'grid' (default, 5-col desktop / 2-col mobile)
 *           'list'  (1-col, wider cards, mobile only)
 */
const ProductGrid = ({ products = [], viewMode = 'grid', shop, baseParams }) => {
  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <span className="product-grid-empty__icon">🔍</span>
        <p>No products found for your search.</p>
        <p className="product-grid-empty__sub">Try adjusting the dates or filters.</p>
      </div>
    );
  }

  return (
    <div className={`product-grid product-grid--${viewMode}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} shop={shop} baseParams={baseParams} />
      ))}
    </div>
  );
};

export default ProductGrid;
