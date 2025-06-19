import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-pink text-brand-pink-dark'
        : 'text-gray-700 hover:bg-brand-pink-light hover:text-brand-pink-dark'
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-serif font-bold text-brand-pink-dark">
          NanaNail
        </NavLink>
        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/" className={navLinkClass}>Trang Chủ</NavLink>
          <NavLink to="/about" className={navLinkClass}>Giới Thiệu</NavLink>
          <NavLink to="/services" className={navLinkClass}>Dịch Vụ</NavLink>
          <NavLink to="/gallery" className={navLinkClass}>Bộ Sưu Tập</NavLink>
          <NavLink to="/reviews" className={navLinkClass}>Đánh Giá</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Liên Hệ</NavLink>
          {isAuthenticated && (
            <NavLink to="/admin" className={navLinkClass}>Dashboard</NavLink>
          )}
        </div>
        <div className="flex items-center space-x-2">
            <NavLink 
                to="/booking" 
                className="bg-brand-pink-dark text-white px-4 py-2 rounded-full font-medium hover:bg-brand-pink-medium transition-colors"
            >
                Đặt Lịch
            </NavLink>
            {isAuthenticated && (
                <button onClick={logout} className="text-gray-500 hover:text-brand-pink-dark text-sm">Đăng xuất</button>
            )}
        </div>
      </nav>
    </header>
  );
};

export default Header;