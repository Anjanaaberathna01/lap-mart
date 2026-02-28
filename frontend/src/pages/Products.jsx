import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard/ProductCard';

const Products = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <Content />
      </div>
      <Footer />
    </>
  );
};

const Content = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const laptops = [
    {
      id: 1,
      title: 'MacBook Pro 14" M3 Pro',
      price: 1999,
      category: 'laptop',
      brand: 'Apple',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      rating: 4.8,
      reviews: 328
    },
    {
      id: 2,
      title: 'Dell XPS 15 (2024)',
      price: 1599,
      category: 'laptop',
      brand: 'Dell',
      image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400',
      rating: 4.6,
      reviews: 245
    },
    {
      id: 3,
      title: 'ASUS ROG Strix G16',
      price: 1899,
      category: 'laptop',
      brand: 'ASUS',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
      rating: 4.7,
      reviews: 189
    },
    {
      id: 4,
      title: 'HP Spectre x360 14',
      price: 1399,
      category: 'laptop',
      brand: 'HP',
      image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=400',
      rating: 4.5,
      reviews: 156
    },
    {
      id: 5,
      title: 'Lenovo ThinkPad X1 Carbon',
      price: 1699,
      category: 'laptop',
      brand: 'Lenovo',
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
      rating: 4.6,
      reviews: 203
    },
    {
      id: 6,
      title: 'Microsoft Surface Laptop 5',
      price: 1299,
      category: 'laptop',
      brand: 'Microsoft',
      image: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=400',
      rating: 4.4,
      reviews: 178
    },
    {
      id: 7,
      title: 'Razer Blade 15 Advanced',
      price: 2299,
      category: 'laptop',
      brand: 'Razer',
      image: 'https://images.unsplash.com/photo-1625019030820-e4ed970a6c95?w=400',
      rating: 4.7,
      reviews: 142
    },
    {
      id: 8,
      title: 'Acer Swift 3 OLED',
      price: 899,
      category: 'laptop',
      brand: 'Acer',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
      rating: 4.3,
      reviews: 221
    }
  ];

  const accessories = [
    {
      id: 9,
      title: 'Wireless Gaming Mouse',
      price: 79,
      category: 'accessory',
      brand: 'Logitech',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
      rating: 4.6,
      reviews: 512
    },
    {
      id: 10,
      title: 'Mechanical Keyboard RGB',
      price: 129,
      category: 'accessory',
      brand: 'Corsair',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
      rating: 4.7,
      reviews: 389
    },
    {
      id: 11,
      title: 'USB-C Hub 7-in-1',
      price: 49,
      category: 'accessory',
      brand: 'Anker',
      image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400',
      rating: 4.5,
      reviews: 678
    },
    {
      id: 12,
      title: 'Laptop Stand Aluminum',
      price: 39,
      category: 'accessory',
      brand: 'Rain Design',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
      rating: 4.8,
      reviews: 421
    },
    {
      id: 13,
      title: 'Wireless Headphones',
      price: 199,
      category: 'accessory',
      brand: 'Sony',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      rating: 4.9,
      reviews: 892
    },
    {
      id: 14,
      title: 'Laptop Backpack',
      price: 59,
      category: 'accessory',
      brand: 'SwissGear',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      rating: 4.4,
      reviews: 334
    },
    {
      id: 15,
      title: 'External SSD 1TB',
      price: 129,
      category: 'accessory',
      brand: 'Samsung',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
      rating: 4.7,
      reviews: 567
    },
    {
      id: 16,
      title: 'Webcam 4K Pro',
      price: 149,
      category: 'accessory',
      brand: 'Logitech',
      image: 'https://images.unsplash.com/photo-1589739900243-c5a7c5e20fb6?w=400',
      rating: 4.6,
      reviews: 445
    }
  ];

  const allProducts = [...laptops, ...accessories];

  // Filter products based on active category
  const getFilteredProducts = () => {
    let filtered = allProducts;
    
    if (activeCategory === 'laptops') {
      filtered = laptops;
    } else if (activeCategory === 'accessories') {
      filtered = accessories;
    }
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        selectedBrands.includes(product.brand)
      );
    }
    
    // Price filter
    if (priceRange !== 'all') {
      filtered = filtered.filter(product => {
        if (priceRange === 'under-100') return product.price < 100;
        if (priceRange === '100-500') return product.price >= 100 && product.price < 500;
        if (priceRange === '500-1500') return product.price >= 500 && product.price < 1500;
        if (priceRange === 'over-1500') return product.price >= 1500;
        return true;
      });
    }
    
    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setPriceRange('all');
    setSearchQuery('');
  };

  const brands = ['Apple', 'Dell', 'ASUS', 'HP', 'Lenovo', 'Microsoft', 'Logitech', 'Corsair', 'Anker', 'Sony', 'Samsung'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Shop All Products
        </h1>
        <p className="text-gray-600">
          Discover premium laptops and accessories
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          <svg
            className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeCategory === 'all'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            All Products ({allProducts.length})
          </button>
          <button
            onClick={() => setActiveCategory('laptops')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeCategory === 'laptops'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            💻 Laptops ({laptops.length})
          </button>
          <button
            onClick={() => setActiveCategory('accessories')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeCategory === 'accessories'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            🎧 Accessories ({accessories.length})
          </button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full mb-4 px-4 py-3 bg-white border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filters
            </button>

            <div className={`${showFilters ? 'block' : 'hidden'} lg:block bg-white rounded-2xl shadow-sm p-6 space-y-6`}>
              {/* Active Filters */}
              {(selectedBrands.length > 0 || priceRange !== 'all' || searchQuery) && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">Active Filters</h3>
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedBrands.map(brand => (
                      <span
                        key={brand}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {brand}
                        <button
                          onClick={() => toggleBrand(brand)}
                          className="hover:text-blue-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range Filter */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Prices' },
                    { value: 'under-100', label: 'Under $100' },
                    { value: '100-500', label: '$100 - $500' },
                    { value: '500-1500', label: '$500 - $1,500' },
                    { value: 'over-1500', label: 'Over $1,500' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <input
                        type="radio"
                        name="price"
                        value={option.value}
                        checked={priceRange === option.value}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Brands</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Sort and Results */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              <span className="font-semibold">{filteredProducts.length}</span> products found
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">1</button>
                  <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">2</button>
                  <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">3</button>
                  <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                    Next
                  </button>
                </nav>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search query</p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
