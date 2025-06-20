import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
      ? 'bg-brand-pink text-brand-pink-dark'
      : 'text-gray-700 hover:bg-brand-pink-light hover:text-brand-pink-dark'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${isActive
      ? 'bg-brand-pink text-brand-pink-dark'
      : 'text-gray-700 hover:bg-brand-pink-light hover:text-brand-pink-dark'
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-serif font-bold text-brand-pink-dark">
            NanaNail
          </NavLink>

          {/* Desktop Menu */}
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
            {isAuthenticated ? (
              <button onClick={logout} className="text-gray-500 hover:text-brand-pink-dark text-sm">Đăng xuất</button>
            ) : (
              <NavLink to="/login" className="text-gray-500 hover:text-brand-pink-dark text-sm">Đăng nhập</NavLink>
            )}
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-brand-pink-light hover:text-brand-pink-dark"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-2 space-y-1">
            <NavLink to="/" className={mobileNavLinkClass}>Trang Chủ</NavLink>
            <NavLink to="/about" className={mobileNavLinkClass}>Giới Thiệu</NavLink>
            <NavLink to="/services" className={mobileNavLinkClass}>Dịch Vụ</NavLink>
            <NavLink to="/gallery" className={mobileNavLinkClass}>Bộ Sưu Tập</NavLink>
            <NavLink to="/reviews" className={mobileNavLinkClass}>Đánh Giá</NavLink>
            <NavLink to="/contact" className={mobileNavLinkClass}>Liên Hệ</NavLink>
            {isAuthenticated && (
              <NavLink to="/admin" className={mobileNavLinkClass}>Dashboard</NavLink>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;