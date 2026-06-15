import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ShopPage from './pages/Shop/ShopPage';
import ResultsPage from './pages/Shop/Results/ResultsPage';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop/:shopName/:publicToken" element={<ShopPage />} />
        <Route path="/shop/:shopName/:publicToken/results" element={<ResultsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
