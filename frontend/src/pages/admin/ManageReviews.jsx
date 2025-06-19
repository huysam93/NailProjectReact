import { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig';
import { Edit, Trash2, PlusCircle, Star } from 'lucide-react';

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);
    const [formData, setFormData] = useState({ customer_name: '', content: '', rating: 5 });

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await apiClient.get('/reviews');
            setReviews(res.data);
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        }
    };

    const handleOpenModal = (review = null) => {
        setCurrentReview(review);
        setFormData(review ? { ...review } : { customer_name: '', content: '', rating: 5 });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, rating: parseInt(formData.rating, 10) };
            if (currentReview) {
                await apiClient.put(`/reviews/${currentReview.id}`, payload);
            } else {
                await apiClient.post('/reviews', payload);
            }
            fetchReviews();
            handleCloseModal();
        } catch (error) {
            console.error("Failed to save review", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
            try {
                await apiClient.delete(`/reviews/${id}`);
                fetchReviews();
            } catch (error) {
                console.error("Failed to delete review", error);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={() => handleOpenModal()} className="bg-brand-pink-dark text-white px-4 py-2 rounded-lg flex items-center hover:bg-brand-pink-medium">
                    <PlusCircle size={20} className="mr-2" /> Thêm Đánh Giá
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left">Tên Khách Hàng</th>
                            <th className="py-3 px-6 text-left">Nội dung</th>
                            <th className="py-3 px-6 text-left">Đánh giá</th>
                            <th className="py-3 px-6 text-left">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {reviews.map(review => (
                            <tr key={review.id}>
                                <td className="py-4 px-6">{review.customer_name}</td>
                                <td className="py-4 px-6 max-w-md">{review.content}</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center">
                                        {review.rating} <Star size={16} className="ml-1 text-yellow-400 fill-current" />
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <button onClick={() => handleOpenModal(review)} className="text-blue-600 hover:text-blue-900 mr-4"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(review.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">{currentReview ? 'Chỉnh Sửa' : 'Thêm Mới'} Đánh Giá</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="customer_name" value={formData.customer_name} onChange={handleChange} placeholder="Tên khách hàng" className="w-full p-2 border rounded" required />
                            <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Nội dung" className="w-full p-2 border rounded" required />
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Rating</label>
                                <select name="rating" value={formData.rating} onChange={handleChange} className="w-full p-2 border rounded bg-white">
                                    <option value="5">5 Stars</option>
                                    <option value="4">4 Stars</option>
                                    <option value="3">3 Stars</option>
                                    <option value="2">2 Stars</option>
                                    <option value="1">1 Star</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 rounded">Hủy</button>
                                <button type="submit" className="px-4 py-2 bg-brand-pink-dark text-white rounded">Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageReviews;