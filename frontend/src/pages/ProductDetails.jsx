import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import RatingStars from '../components/RatingStars';

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Sample product data (in real app, this would be fetched based on id)
  const product = {
    id: id,
    title: 'MacBook Pro 14" M3 Pro (2024)',
    price: 1999,
    originalPrice: 2299,
    rating: 4.8,
    reviews: 328,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800'
    ],
    description: 'Experience pro performance with the M3 Pro chip. Perfect for developers, designers, and creative professionals.',
    specifications: [
      { label: 'Processor', value: 'Apple M3 Pro chip' },
      { label: 'RAM', value: '16GB unified memory' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Display', value: '14.2-inch Liquid Retina XDR' },
      { label: 'Graphics', value: '18-core GPU' },
      { label: 'Battery', value: 'Up to 18 hours' }
    ],
    features: [
      'Stunning Liquid Retina XDR display',
      'M3 Pro chip for incredible performance',
      'All-day battery life',
      'Advanced thermal system',
      'Studio-quality mics',
      '1080p FaceTime HD camera'
    ],
    inStock: true
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center gap-2 text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/products" className="hover:text-blue-600">Products</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product.title}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div>
            {/* Main Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <RatingStars rating={product.rating} size="medium" />
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-blue-600">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <span className="text-green-600 font-medium">
                  Save ${(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-red-600 font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <Button
                size="large"
                fullWidth
                disabled={!product.inStock}
                onClick={() => console.log('Added to cart:', product.id, 'Quantity:', quantity)}
              >
                Add to Cart
              </Button>
              <button className="w-12 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-red-500 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Specifications */}
            <div className="border-t pt-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Specifications</h3>
              <div className="space-y-3">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">{spec.label}</span>
                    <span className="font-medium text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
