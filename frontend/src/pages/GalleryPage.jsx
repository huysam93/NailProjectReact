import { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig';
import { motion } from 'framer-motion';

const GalleryPage = () => {
    const [images, setImages] = useState([]);
    const [tags, setTags] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [activeTag, setActiveTag] = useState('All');

    useEffect(() => {
        apiClient.get('/gallery')
            .then(res => {
                const fetchedImages = res.data;
                setImages(fetchedImages);
                setFilteredImages(fetchedImages);
                const allTags = ['All', ...new Set(fetchedImages.map(img => img.tag).filter(Boolean))];
                setTags(allTags);
            })
            .catch(err => console.error("Failed to fetch gallery:", err));
    }, []);

    const handleFilter = (tag) => {
        setActiveTag(tag);
        if (tag === 'All') {
            setFilteredImages(images);
        } else {
            setFilteredImages(images.filter(img => img.tag === tag));
        }
    };
    
    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-serif text-center font-bold mb-4 text-brand-pink-dark">Bộ Sưu Tập</h1>
            <p className="text-center text-gray-600 mb-8">Khám phá những mẫu nail đầy nghệ thuật và sáng tạo tại NanaNail.</p>
            
            <div className="flex justify-center flex-wrap gap-2 mb-8">
                {tags.map(tag => (
                    <button 
                        key={tag} 
                        onClick={() => handleFilter(tag)}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeTag === tag ? 'bg-brand-pink-dark text-white' : 'bg-white text-gray-700 hover:bg-brand-pink-light'}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map(image => (
                    <motion.div 
                        key={image.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl aspect-square"
                    >
                        <img src={`data:image/jpeg;base64,${image.image_base64}`} alt={image.tag || 'Nail art'} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default GalleryPage;