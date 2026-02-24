import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';

const Home = () => {
  // Sample featured products
  const featuredProducts = [
    {
      id: 1,
      title: 'MacBook Pro 14" M3 Pro',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      rating: 4.8,
      reviews: 328
    },
    {
      id: 2,
      title: 'Dell XPS 15 (2024)',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400',
      rating: 4.6,
      reviews: 245
    },
    {
      id: 3,
      title: 'ASUS ROG Strix G16',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
      rating: 4.7,
      reviews: 189
    },
    {
      id: 4,
      title: 'HP Spectre x360 14',
      price: 1399,
      image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=400',
      rating: 4.5,
      reviews: 156
    }
  ];

  // Product categories
  const categories = [
    { name: 'Gaming', icon: '🎮', count: '45+' },
    { name: 'Creator', icon: '🎨', count: '38+' },
    { name: 'Business', icon: '💼', count: '42+' },
    { name: 'Budget', icon: '💰', count: '29+' }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Digital Creator',
      content: 'Found the perfect MacBook for my design work. Excellent service and super fast delivery!',
      avatar: '👩‍💼'
    },
    {
      name: 'Marcus Johnson',
      role: 'Software Developer',
      content: 'Great prices and quality. The product was exactly as described. Highly recommend!',
      avatar: '👨‍💻'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Content Creator',
      content: 'Customer support was amazing. They helped me choose the right laptop for streaming.',
      avatar: '👩‍🎬'
    }
  ];

  // Stats
  const stats = [
    { label: 'Happy Customers', value: '50K+' },
    { label: 'Products Available', value: '500+' },
    { label: 'Countries Shipped', value: '120+' },
    { label: 'Customer Rating', value: '4.9/5' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl animate-[fadeIn_0.8s_ease-out]">
            {/* New Badge */}
            <div className="inline-block mb-6 animate-[slideDown_0.6s_ease-out]">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                New laptops added weekly
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-[slideUp_0.8s_ease-out_0.2s_both]">
              Find Your
              <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Perfect Laptop
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-10 text-blue-50 leading-relaxed animate-[slideUp_0.8s_ease-out_0.4s_both]">
              Premium laptops curated for creators, gamers, and professionals. Unbeatable prices, expert support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-[slideUp_0.8s_ease-out_0.6s_both]">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200"
              >
                Explore Collection
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#f9fafb" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality Card */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-[slideUp_0.6s_ease-out_0.2s_both]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-5 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Quality Assured</h3>
                <p className="text-gray-600 leading-relaxed">Every laptop is thoroughly verified and tested to meet our rigorous quality standards</p>
              </div>
            </div>

            {/* Price Card */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-[slideUp_0.6s_ease-out_0.4s_both]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-5 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Best Prices</h3>
                <p className="text-gray-600 leading-relaxed">Competitive pricing with price matching guarantee on all our premium products</p>
              </div>
            </div>

            {/* Delivery Card */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-[slideUp_0.6s_ease-out_0.6s_both]">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-600 rounded-2xl flex items-center justify-center mb-5 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Fast Delivery</h3>
                <p className="text-gray-600 leading-relaxed">Express shipping nationwide with real-time tracking for complete peace of mind</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-[fadeIn_0.8s_ease-out]">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full mb-4 animate-[scaleIn_0.5s_ease-out]">
              POPULAR CHOICES
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Featured Laptops
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked selection of our most popular and highest-rated laptops
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-16">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 animate-[bounce_2s_infinite]">
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight animate-[fadeIn_0.8s_ease-out]">
            Ready to Find Your
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Perfect Laptop?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-[fadeIn_0.8s_ease-out_0.2s_both]">
            Browse our extensive collection of premium laptops and get the best deals today. Expert support included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeIn_0.8s_ease-out_0.4s_both]">
            <Link
              to="/products"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-200"
            >
              Start Shopping
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
