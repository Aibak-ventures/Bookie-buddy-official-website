import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ShopPage from '../pages/Shop/ShopPage';
import NotFound from '../pages/NotFound/NotFound';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/shop/:shopName/:publicToken" element={<ShopPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
