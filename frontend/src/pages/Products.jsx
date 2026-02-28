import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard/ProductCard';

const Products = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');

  // Sample products data
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <Content 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
          priceRange={priceRange} 
          setPriceRange={setPriceRange} 
        />
      </div>
      <Footer />
    </>
  );
};

const Content = ({ sortBy, setSortBy, priceRange, setPriceRange }) => {
  const allProducts = [
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
    },
    {
      id: 5,
      title: 'Lenovo ThinkPad X1 Carbon',
      price: 1699,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
      rating: 4.6,
      reviews: 203
    },
    {
      id: 6,
      title: 'Microsoft Surface Laptop 5',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=400',
      rating: 4.4,
      reviews: 178
    },
    {
      id: 7,
      title: 'Razer Blade 15 Advanced',
      price: 2299,
      image: 'https://images.unsplash.com/photo-1625019030820-e4ed970a6c95?w=400',
      rating: 4.7,
      reviews: 142
    },
    {
      id: 8,
      title: 'Acer Swift 3 OLED',
      price: 899,
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
      rating: 4.3,
      reviews: 221
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            All Laptops
          </h1>
          <p className="text-gray-600">
            Browse our complete collection of premium laptops
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            {/* Sort */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-2">
              <label htmlFor="price" className="text-sm font-medium text-gray-700">
                Price Range:
              </label>
              <select
                id="price"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Prices</option>
                <option value="under-1000">Under $1,000</option>
                <option value="1000-1500">$1,000 - $1,500</option>
                <option value="1500-2000">$1,500 - $2,000</option>
                <option value="over-2000">Over $2,000</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium">{allProducts.length}</span>
              <span className="ml-1">products found</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination - UI Only */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">1</button>
            <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
            <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">3</button>
            <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
    </div>
  );
};

export default Products;
