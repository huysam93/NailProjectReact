import { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig';
import { Edit, Trash2, PlusCircle } from 'lucide-react';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentService, setCurrentService] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', price: '' });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await apiClient.get('/services');
            setServices(res.data);
        } catch (error) {
            console.error("Failed to fetch services", error);
        }
    };

    const handleOpenModal = (service = null) => {
        setCurrentService(service);
        setFormData(service ? { ...service } : { name: '', description: '', price: '' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentService(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentService) {
                await apiClient.put(`/services/${currentService.id}`, formData);
            } else {
                await apiClient.post('/services', formData);
            }
            fetchServices();
            handleCloseModal();
        } catch (error) {
            console.error("Failed to save service", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
            try {
                await apiClient.delete(`/services/${id}`);
                fetchServices();
            } catch (error) {
                console.error("Failed to delete service", error);
            }
        }
    };

    const formatCurrency = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={() => handleOpenModal()} className="bg-brand-pink-dark text-white px-4 py-2 rounded-lg flex items-center hover:bg-brand-pink-medium">
                    <PlusCircle size={20} className="mr-2" /> Thêm Dịch Vụ
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="th-cell">Tên Dịch Vụ</th>
                            <th className="th-cell">Mô Tả</th>
                            <th className="th-cell">Giá</th>
                            <th className="th-cell">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {services.map(service => (
                            <tr key={service.id}>
                                <td className="td-cell">{service.name}</td>
                                <td className="td-cell max-w-sm">{service.description}</td>
                                <td className="td-cell whitespace-nowrap">{formatCurrency(service.price)}</td>
                                <td className="td-cell whitespace-nowrap">
                                    <button onClick={() => handleOpenModal(service)} className="text-blue-600 hover:text-blue-900 mr-4"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">{currentService ? 'Chỉnh Sửa Dịch Vụ' : 'Thêm Dịch Vụ Mới'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="name" value={formData.name} onChange={handleChange} placeholder="Tên dịch vụ" className="w-full p-2 border rounded" required />
                            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Mô tả" className="w-full p-2 border rounded" required />
                            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Giá" className="w-full p-2 border rounded" required />
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

export default ManageServices;