import { Link } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import RatingStars from '../RatingStars';

const ProductCard = ({ product }) => {
  const { id, title, price, image, rating, reviews } = product;
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    toast.success(`${title} added to cart!`, {
      icon: '🛒',
    });
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    toast.success('Added to wishlist!', {
      icon: '❤️',
    });
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    toast('Quick view opening...', {
      icon: '👀',
    });
  };

  return (
    <Link to={`/products/${id}`}>
      <div 
        className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100 hover:border-transparent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-square">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay Actions */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <button
                onClick={handleQuickView}
                className="grow bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2.5 rounded-lg font-medium hover:bg-white transition-all duration-200 text-sm"
              >
                Quick View
              </button>
              <button
                onClick={handleAddToWishlist}
                className="bg-white/90 backdrop-blur-sm p-2.5 rounded-lg hover:bg-white transition-all duration-200"
                aria-label="Add to wishlist"
              >
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Badge */}
          {reviews > 200 && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              Popular
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[3rem]">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <RatingStars rating={rating} size="small" />
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>

          {/* Price & Button */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${price.toLocaleString()}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-110 transition-all duration-200"
              aria-label="Add to cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
