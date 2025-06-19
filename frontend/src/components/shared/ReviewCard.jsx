import { Star } from 'lucide-react';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
        </div>
        <p className="text-gray-600 italic mb-4">"{review.content}"</p>
      </div>
      <h4 className="font-bold text-brand-pink-dark mt-auto">{review.customer_name}</h4>
    </div>
  );
};

export default ReviewCard;