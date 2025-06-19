import { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';

const BookingPage = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    customer_name: '',
    service_id: '',
    appointment_date: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  useEffect(() => {
    apiClient.get('/services')
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0,16);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer_name || !formData.service_id || !formData.appointment_date) {
      setMessage('Vui lòng điền đầy đủ thông tin.');
      setMessageType('error');
      return;
    }
    try {
      await apiClient.post('/appointments', formData);
      setMessage('Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận.');
      setMessageType('success');
      setFormData({ customer_name: '', service_id: '', appointment_date: '' });
    } catch (error) {
      setMessage('Đã có lỗi xảy ra. Vui lòng thử lại.');
      setMessageType('error');
      console.error(error);
    }
  };
  
  const messageColor = {
      success: 'text-green-600',
      error: 'text-red-600',
      info: 'text-gray-600'
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <h1 className="text-4xl font-serif text-center font-bold mb-8">Đặt Lịch Hẹn</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div>
          <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">Họ và Tên</label>
          <input type="text" name="customer_name" id="customer_name" value={formData.customer_name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink-medium focus:border-brand-pink-medium" required />
        </div>
        <div>
          <label htmlFor="service_id" className="block text-sm font-medium text-gray-700">Chọn Dịch Vụ</label>
          <select name="service_id" id="service_id" value={formData.service_id} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink-medium focus:border-brand-pink-medium" required>
            <option value="">-- Vui lòng chọn --</option>
            {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="appointment_date" className="block text-sm font-medium text-gray-700">Ngày và Giờ Hẹn</label>
          <input type="datetime-local" name="appointment_date" id="appointment_date" min={getMinDateTime()} value={formData.appointment_date} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink-medium focus:border-brand-pink-medium" required />
        </div>
        <button type="submit" className="w-full bg-brand-pink-dark text-white py-3 rounded-md font-semibold hover:bg-brand-pink-medium transition-colors">Xác Nhận Đặt Lịch</button>
        {message && <p className={`text-center text-sm mt-4 ${messageColor[messageType]}`}>{message}</p>}
      </form>
    </div>
  );
};

export default BookingPage;