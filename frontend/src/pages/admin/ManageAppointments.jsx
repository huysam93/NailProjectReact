import { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig';
import { CheckCircle, Clock, XCircle, Trash2 } from 'lucide-react';

const ManageAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await apiClient.get('/appointments');
            setAppointments(res.data);
        } catch (error) {
            console.error("Failed to fetch appointments:", error);
        }
    };
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const updateStatus = async (id, status) => {
        try {
            await apiClient.put(`/appointments/${id}`, { status });
            fetchAppointments();
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };
    
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa lịch hẹn này?')) {
            try {
                await apiClient.delete(`/appointments/${id}`);
                fetchAppointments();
            } catch (error) {
                console.error("Failed to delete appointment:", error);
            }
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 items-center"><Clock size={12} className="mr-1" /> Chờ xác nhận</span>;
            case 'confirmed':
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 items-center"><CheckCircle size={12} className="mr-1" /> Đã xác nhận</span>;
            case 'cancelled':
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 items-center"><XCircle size={12} className="mr-1" /> Đã hủy</span>;
            default:
                return <span>{status}</span>;
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Tên Khách Hàng</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Dịch Vụ</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Ngày Hẹn</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Trạng Thái</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Hành Động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {appointments.map(app => (
                        <tr key={app.id}>
                            <td className="py-4 px-6">{app.customer_name}</td>
                            <td className="py-4 px-6">{app.service_name}</td>
                            <td className="py-4 px-6">{formatDate(app.appointment_date)}</td>
                            <td className="py-4 px-6">{getStatusBadge(app.status)}</td>
                            <td className="py-4 px-6 space-x-2 flex items-center">
                                <button onClick={() => updateStatus(app.id, 'confirmed')} className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 disabled:opacity-50" disabled={app.status === 'confirmed'}>Xác nhận</button>
                                <button onClick={() => updateStatus(app.id, 'cancelled')} className="text-xs bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600 disabled:opacity-50" disabled={app.status === 'cancelled'}>Hủy</button>
                                <button onClick={() => handleDelete(app.id)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageAppointments;
