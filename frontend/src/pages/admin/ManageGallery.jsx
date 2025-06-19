import { useState, useEffect } from 'react';
import apiClient from '../../api/axiosConfig';
import { Trash2, PlusCircle, UploadCloud } from 'lucide-react';

const ManageGallery = () => {
    const [images, setImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ image_base64: null, tag: '' });
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await apiClient.get('/gallery');
            setImages(res.data);
        } catch (error) {
            console.error("Failed to fetch gallery images", error);
        }
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({ image_base64: null, tag: '' });
        setPreview(null);
    };

    const handleTextChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                setFormData(prev => ({ ...prev, image_base64: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image_base64) {
            alert('Vui lòng chọn một hình ảnh.');
            return;
        }
        try {
            await apiClient.post('/gallery', formData);
            fetchImages();
            handleCloseModal();
        } catch (error) {
            console.error("Failed to add image", error);
            alert('Lỗi: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa ảnh này?')) {
            try {
                await apiClient.delete(`/gallery/${id}`);
                fetchImages();
            } catch (error) {
                console.error("Failed to delete image", error);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={handleOpenModal} className="bg-brand-pink-dark text-white px-4 py-2 rounded-lg flex items-center hover:bg-brand-pink-medium">
                    <PlusCircle size={20} className="mr-2" /> Thêm Ảnh Mới
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map(image => (
                    <div key={image.id} className="relative group aspect-square">
                        <img src={`data:image/jpeg;base64,${image.image_base64}`} alt={image.tag} className="w-full h-full object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleDelete(image.id)} className="text-white p-2 bg-red-600 rounded-full hover:bg-red-700">
                                <Trash2 size={20} />
                            </button>
                        </div>
                        {image.tag && <span className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">{image.tag}</span>}
                    </div>
                ))}
            </div>

            {isModalOpen && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Thêm Ảnh Mới vào Bộ Sưu Tập</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Chọn ảnh</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="mx-auto h-24 w-auto"/>
                                        ) : (
                                            <UploadCloud className="mx-auto h-12 w-12 text-gray-400"/>
                                        )}
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload-gallery" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-pink-dark hover:text-brand-pink-medium focus-within:outline-none">
                                                <span>Tải ảnh lên</span>
                                                <input id="file-upload-gallery" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} required/>
                                            </label>
                                            <p className="pl-1">hoặc kéo và thả</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                            <input name="tag" value={formData.tag} onChange={handleTextChange} placeholder="Tag (ví dụ: Ombre, Tết, Noel)" className="w-full p-2 border rounded" />
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

export default ManageGallery;