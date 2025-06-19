import { NavLink, Routes, Route, useLocation } from 'react-router-dom';
import { LayoutDashboard, Scissors, ImageIcon, MessageSquare, Calendar, Mail, SlidersHorizontal } from 'lucide-react';
import ManageServices from './admin/ManageServices';
import ManageAppointments from './admin/ManageAppointments';
import ManageGallery from './admin/ManageGallery';
import ManageSlider from './admin/ManageSlider';
import ManageReviews from './admin/ManageReviews';
import ManageContacts from './admin/ManageContacts';


const AdminDashboard = () => {
    const location = useLocation();
    
    const getTitle = () => {
        const path = location.pathname.replace('/admin', '');
        if (path.startsWith('/services')) return 'Quản Lý Dịch Vụ';
        if (path.startsWith('/appointments')) return 'Quản Lý Lịch Hẹn';
        if (path.startsWith('/gallery')) return 'Quản Lý Bộ Sưu Tập';
        if (path.startsWith('/slider')) return 'Quản Lý Slider';
        if (path.startsWith('/reviews')) return 'Quản Lý Đánh Giá';
        if (path.startsWith('/contacts')) return 'Quản Lý Tin Nhắn';
        return 'Bảng Điều Khiển';
    };
    
    const navLinkClass = ({ isActive }) =>
    `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? 'bg-brand-pink text-brand-pink-dark'
        : 'text-gray-600 hover:bg-brand-pink-light hover:text-brand-pink-dark'
    }`;

  return (
    <div className="flex min-h-[calc(100vh-130px)] bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 p-4 flex-shrink-0">
        <nav className="space-y-2">
            <NavLink to="/admin" end className={navLinkClass}><LayoutDashboard size={20} className="mr-3" /> Bảng Điều Khiển</NavLink>
            <NavLink to="/admin/services" className={navLinkClass}><Scissors size={20} className="mr-3" /> Dịch Vụ</NavLink>
            <NavLink to="/admin/appointments" className={navLinkClass}><Calendar size={20} className="mr-3" /> Lịch Hẹn</NavLink>
            <NavLink to="/admin/gallery" className={navLinkClass}><ImageIcon size={20} className="mr-3" /> Bộ Sưu Tập</NavLink>
            <NavLink to="/admin/slider" className={navLinkClass}><SlidersHorizontal size={20} className="mr-3" /> Slider</NavLink>
            <NavLink to="/admin/reviews" className={navLinkClass}><MessageSquare size={20} className="mr-3" /> Đánh Giá</NavLink>
            <NavLink to="/admin/contacts" className={navLinkClass}><Mail size={20} className="mr-3" /> Tin nhắn</NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{getTitle()}</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <Routes>
                <Route index element={<DashboardHome />} />
                <Route path="services" element={<ManageServices />} />
                <Route path="appointments" element={<ManageAppointments />} />
                <Route path="gallery" element={<ManageGallery />} />
                <Route path="slider" element={<ManageSlider />} />
                <Route path="reviews" element={<ManageReviews />} />
                <Route path="contacts" element={<ManageContacts />} />
            </Routes>
        </div>
      </main>
    </div>
  );
};

const DashboardHome = () => (
    <div>
        <h2 className="text-xl font-semibold">Chào mừng đến với trang quản trị NanaNail!</h2>
        <p className="mt-2 text-gray-600">
            Sử dụng thanh điều hướng bên trái để quản lý các nội dung của website.
        </p>
    </div>
);


export default AdminDashboard;