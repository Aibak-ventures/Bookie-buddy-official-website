import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usePageMeta } from '../../hooks/usePageMeta';
import {
  fetchShopInfoThunk,
  selectShop,
  selectShopLoading,
  selectShopError,
  clearShop,
} from '../../store/slices/shopSlice';
import { selectBaseParams } from '../../store/slices/productsSlice';

import ShopHeader from './components/ShopHeader';
import ShopBanner from './components/ShopBanner';
import ShopSearchForm from './components/ShopSearchForm';
import ShopInfoSection from './components/ShopInfoSection';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './Shop.css';

const ShopPage = () => {
  const { publicToken } = useParams();
  const dispatch = useDispatch();

  const shop = useSelector(selectShop);
  const loading = useSelector(selectShopLoading);
  const error = useSelector(selectShopError);
  const baseParams = useSelector(selectBaseParams);

  useEffect(() => {
    if (publicToken) {
      dispatch(fetchShopInfoThunk(publicToken));
    }
    // Clear shop data when navigating away
    return () => {
      dispatch(clearShop());
    };
  }, [publicToken, dispatch]);

  usePageMeta({
    title:       shop ? `${shop.name} - Check available items` : undefined,
    description: shop ? `Check out our latest items from ${shop.name} — by Bookie Buddy the rentals platform` : undefined,
    image:       shop?.img || undefined,
    url:         shop ? `https://www.bookiebuddy.in${window.location.pathname}` : undefined,
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage publicToken={publicToken} message={error} />;

  return (
    <div className="shop-page">
      <ShopHeader shop={shop} />
      <ShopBanner shop={shop}>
        <ShopSearchForm
          initialPickupDate={baseParams.pickup_date || null}
          initialReturnDate={baseParams.return_date || null}
          initialPickupTime={baseParams.pickup_time || null}
          initialReturnTime={baseParams.return_time || null}
        />
      </ShopBanner>
      <ShopInfoSection shop={shop} />

      <div className="shop-watermark" aria-hidden="true">
        <span className="shop-watermark__text">BOOKIE<br />BUDDY</span>
      </div>

      <footer className="shop-footer">
        <p>
          &copy; {new Date().getFullYear()} <a href="https://www.bookiebuddy.in" target="_blank" rel="noopener noreferrer">BookieBuddy</a> — The Rental Management System. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ShopPage;
