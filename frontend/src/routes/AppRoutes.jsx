import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Products from '../pages/Products';
import NotFound from '../pages/NotFound';
import AdminDashboard from '../pages/Admin/AdminDashbord';
import AdminOrders from '../pages/Admin/AdminOrders';
import AdminProducts from '../pages/Admin/AdminProducts';
import AdminCustomers from '../pages/Admin/AdminCustomers';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/customers" element={<AdminCustomers />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
