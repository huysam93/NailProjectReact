import { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig';
import { motion } from 'framer-motion';

const AboutPage = () => {
    const [aboutContent, setAboutContent] = useState('');

    useEffect(() => {
        apiClient.get('/about')
            .then(res => setAboutContent(res.data.content))
            .catch(err => console.error("Failed to fetch about content:", err));
    }, []);

    return (
        <div className="container mx-auto px-6 py-12">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-white p-8 md:p-12 rounded-lg shadow-lg"
            >
                <h1 className="text-4xl font-serif text-center font-bold mb-8 text-brand-pink-dark">Về NanaNail</h1>
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:w-1/2"
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1604654894610-df644b4dec1f?q=80&w=1974&auto=format&fit=crop" 
                            alt="NanaNail Salon Interior"
                            className="rounded-lg shadow-xl"
                        />
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="md:w-1/2 prose lg:prose-xl"
                    >
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {aboutContent || 'Loading content...'}
                        </p>
                         <div className="mt-6 border-l-4 border-brand-pink-dark pl-4">
                            <p className="italic text-gray-600">
                                "Nơi mỗi bộ móng là một tác phẩm nghệ thuật, và mỗi khách hàng là một nguồn cảm hứng."
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default AboutPage;