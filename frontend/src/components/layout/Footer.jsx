const Footer = () => {
  return (
    <footer className="bg-white border-t border-brand-pink mt-12">
      <div className="container mx-auto px-6 py-8 text-center text-gray-600">
        <p className="text-xl font-serif text-brand-pink-dark mb-2">NanaNail</p>
        <p>Địa chỉ: 55B/7 Hàn Thuyên, Phường 4, Đà Lạt, Lâm Đồng</p>
        <p>Điện thoại: 0965371841</p>
        <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} NanaNail. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;