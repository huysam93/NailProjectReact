import { useState } from 'react';
import apiClient from '../api/axiosConfig';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ message: '', type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: 'Đang gửi...', type: 'info' });
        try {
            await apiClient.post('/contacts', formData);
            setStatus({ message: 'Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công.', type: 'success' });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus({ message: 'Đã có lỗi xảy ra. Vui lòng thử lại.', type: 'error' });
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-serif text-center font-bold mb-12 text-brand-pink-dark">Liên Hệ Với Chúng Tôi</h1>
            <div className="grid md:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-lg">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Gửi tin nhắn</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và Tên</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 input-field" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 input-field" required />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Nội dung</label>
                            <textarea name="message" id="message" rows="4" value={formData.message} onChange={handleChange} className="mt-1 input-field" required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-brand-pink-dark text-white py-3 rounded-md font-semibold hover:bg-brand-pink-medium transition-colors">Gửi</button>
                        {status.message && <p className={`text-center text-sm mt-4 ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{status.message}</p>}
                    </form>
                </div>
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-4">Thông tin liên hệ</h2>
                    <div className="flex items-start">
                        <MapPin className="text-brand-pink-dark mr-4 mt-1 h-6 w-6 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold">Địa chỉ</h3>
                            <p className="text-gray-600">55B/7 Hàn Thuyên, Phường 4, Đà Lạt, Lâm Đồng, Việt Nam</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <Phone className="text-brand-pink-dark mr-4 mt-1 h-6 w-6 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold">Điện thoại</h3>
                            <p className="text-gray-600">0965371841</p>
                        </div>
                    </div>
                     <div className="flex items-start">
                        <Mail className="text-brand-pink-dark mr-4 mt-1 h-6 w-6 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold">Email</h3>
                            <p className="text-gray-600">huysam93@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;