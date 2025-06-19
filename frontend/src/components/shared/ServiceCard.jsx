import { Sparkles } from 'lucide-react';

const ServiceCard = ({ service }) => {
  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-brand-pink-light">
      <div className="flex items-center mb-4">
        <Sparkles className="text-brand-pink-dark mr-3" />
        <h3 className="text-xl font-serif font-bold text-gray-800">{service.name}</h3>
      </div>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <div className="text-right font-bold text-lg text-brand-pink-dark">
        {formatCurrency(service.price)}
      </div>
    </div>
  );
};

export default ServiceCard;