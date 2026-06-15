import './LoadingSpinner.css';

const LoadingSpinner = () => (
  <div className="shop-loading-overlay">
    <div className="shop-spinner" aria-label="Loading…" />
    <p className="shop-loading-text">Loading shop info…</p>
  </div>
);

export default LoadingSpinner;
