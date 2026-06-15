import { useDispatch } from 'react-redux';
import { fetchProductsPageThunk } from '../../../../store/slices/productsSlice';

const ChevronLeft  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const ChevronRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;

/**
 * Pagination — shows Previous / Next buttons based on API next/previous URLs.
 */
const Pagination = ({ next, previous }) => {
  const dispatch = useDispatch();

  if (!next && !previous) return null;

  const goTo = (url) => {
    dispatch(fetchProductsPageThunk(url));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pagination-bar">
      <button
        type="button"
        className={`pagination-btn${previous ? '' : ' pagination-btn--hidden'}`}
        onClick={() => previous && goTo(previous)}
        disabled={!previous}
        aria-label="Previous page"
      >
        <ChevronLeft /> Previous
      </button>

      <button
        type="button"
        className={`pagination-btn${next ? '' : ' pagination-btn--hidden'}`}
        onClick={() => next && goTo(next)}
        disabled={!next}
        aria-label="Next page"
      >
        Next <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
