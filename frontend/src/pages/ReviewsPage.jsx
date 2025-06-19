import { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig';
import ReviewCard from '../components/shared/ReviewCard';
import { motion } from 'framer-motion';

const ReviewsPage = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        apiClient.get('/reviews')
            .then(res => setReviews(res.data))
            .catch(err => console.error("Failed to fetch reviews:", err));
    }, []);

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-serif text-center font-bold mb-8 text-brand-pink-dark">Đánh Giá Từ Khách Hàng</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <ReviewCard review={review} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsPage;