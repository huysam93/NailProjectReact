import { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig';
import ServiceCard from '../components/shared/ServiceCard';
import { motion } from 'framer-motion';

const ServicesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    apiClient.get('/services')
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-serif text-center font-bold mb-12 text-brand-pink-dark"
      >
        Bảng Giá Dịch Vụ
      </motion.h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
            <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                <ServiceCard service={service} />
            </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;