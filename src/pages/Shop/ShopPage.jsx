import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchShopInfoThunk,
  selectShop,
  selectShopLoading,
  selectShopError,
  clearShop,
} from '../../store/slices/shopSlice';

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

  useEffect(() => {
    if (publicToken) {
      dispatch(fetchShopInfoThunk(publicToken));
    }
    // Clear shop data when navigating away
    return () => {
      dispatch(clearShop());
    };
  }, [publicToken, dispatch]);

  // Update document title once shop data arrives
  useEffect(() => {
    if (shop?.name) {
      document.title = `${shop.name} — BookieBuddy`;
    }
    return () => {
      document.title = 'BookieBuddy';
    };
  }, [shop]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage publicToken={publicToken} message={error} />;

  return (
    <div className="shop-page">
      <ShopHeader shop={shop} />
      <ShopBanner shop={shop}>
        <ShopSearchForm />
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
