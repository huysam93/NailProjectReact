import { useEffect, useState, useRef } from 'react';
import apiClient from '../api/axiosConfig';
import ServiceCard from '../components/shared/ServiceCard';
import ReviewCard from '../components/shared/ReviewCard';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AppointmentScheduler from '../components/AppointmentScheduler';
import Chatbox from '../components/Chatbox';

const HeroSlider = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [index, images.length]);

  if (!images.length) {
    return (
      <div className="relative h-[70vh] bg-cover bg-center text-white flex items-center justify-center" style={{ backgroundImage: "url('https://r2.flowith.net/files/o/1750308709889-swarovski_crystal_gel_nail_design_index_6@1536x1024.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <p className='z-10'>Loading slider...</p>
      </div>
    )
  }

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(data:image/jpeg;base64,${images[index].image_base64})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center text-white">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-serif font-bold">
          Vẻ Đẹp Trên Từng Ngón Tay
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-4 text-lg md:text-xl max-w-2xl">
          Trải nghiệm dịch vụ nail chuyên nghiệp và thư giãn tại NanaNail, nơi nghệ thuật và sự chăm sóc hòa quyện.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
          <Link to="/booking" className="mt-8 inline-block bg-brand-pink text-brand-pink-dark px-8 py-3 rounded-full font-bold hover:bg-white transition-colors duration-300">
            Đặt Lịch Ngay
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

const GalleryCarousel = ({ images }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!images.length) return null;

  return (
    <div className="relative">
      <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-4 p-4 snap-x snap-mandatory scrollbar-hide">
        {images.map(image => (
          <div key={image.id} className="flex-shrink-0 w-64 h-64 snap-center">
            <img src={`data:image/jpeg;base64,${image.image_base64}`} alt={image.tag || 'Nail art'} className="w-full h-full object-cover rounded-lg shadow-md" />
          </div>
        ))}
      </div>
      <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow-md hover:bg-white transition z-10"><ChevronLeft /></button>
      <button onClick={() => scroll(1)} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow-md hover:bg-white transition z-10"><ChevronRight /></button>
    </div>
  );
};


const HomePage = () => {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, reviewsRes, sliderRes, galleryRes] = await Promise.all([
          apiClient.get('/services?_limit=3'),
          apiClient.get('/reviews?_limit=3'),
          apiClient.get('/slider'),
          apiClient.get('/gallery?_limit=10')
        ]);
        setServices(servicesRes.data);
        setReviews(reviewsRes.data);
        setSliderImages(sliderRes.data);
        setGalleryImages(galleryRes.data);
      } catch (error) {
        console.error('Failed to fetch homepage data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-16 md:space-y-24 pb-12">
      <HeroSlider images={sliderImages} />

      <section className="container mx-auto px-6">
        <h2 className="text-3xl font-serif text-center font-bold mb-8">Dịch Vụ Nổi Bật</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6">
        <h2 className="text-3xl font-serif text-center font-bold mb-8">Lịch hẹn của khách</h2>
        <AppointmentScheduler />
      </section>
      <section className="container mx-auto px-6">
        <h2 className="text-3xl font-serif text-center font-bold mb-8">Bộ Sưu Tập Mới Nhất</h2>
        <GalleryCarousel images={galleryImages} />
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-serif text-center font-bold mb-8">Khách Hàng Nói Gì Về Chúng Tôi</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
