import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import ProductCard from '../components/UI/ProductCard';
import Spinner from '../components/UI/Spinner';
import Breadcrumb from '../components/UI/Breadcrumb';
import { getProducts, getCategories } from '../services/api';
import { Product } from '../types';
import { useTheme } from '../contexts/ThemeContext';

const ProductsPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const breadcrumbItems = [
    { label: 'Products', path: '/products' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, sortOption, priceRange, products]);

  const applyFilters = () => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Sort products
    if (sortOption === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    } else if (sortOption === 'popularity') {
      result.sort((a, b) => b.rating.count - a.rating.count);
    }
    
    setFilteredProducts(result);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const formatCategoryName = (category: string): string => {
    return category
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Layout>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mt-4 flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Filters - Mobile Toggle */}
          <div className="w-full md:hidden mb-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`w-full flex items-center justify-between p-3 border rounded-md ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <span className="flex items-center">
                <Filter size={18} className="mr-2" />
                Filters & Sort
              </span>
              {isFilterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
          
          {/* Filters - Desktop & Mobile Expanded */}
          <div className={`w-full md:w-1/4 rounded-lg shadow-sm p-4 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <h2 className="text-lg font-medium mb-4">Filters</h2>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Category
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="all"
                    name="category"
                    type="radio"
                    checked={selectedCategory === 'all'}
                    onChange={() => handleCategoryChange('all')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="all" className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    All Categories
                  </label>
                </div>
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      id={category}
                      name="category"
                      type="radio"
                      checked={selectedCategory === category}
                      onChange={() => handleCategoryChange(category)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={category} className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {formatCategoryName(category)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Price Range
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="min-price" className={`block text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Min Price: ${priceRange.min}
                  </label>
                  <input
                    type="range"
                    id="min-price"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange.min}
                    onChange={(e) => handlePriceRangeChange(e, 'min')}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label htmlFor="max-price" className={`block text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Max Price: ${priceRange.max}
                  </label>
                  <input
                    type="range"
                    id="max-price"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange.max}
                    onChange={(e) => handlePriceRangeChange(e, 'max')}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
            
            {/* Sort Options - Mobile Only */}
            <div className="mb-6 md:hidden">
              <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Sort By
              </h3>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className={`block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>
          
          {/* Product Listing */}
          <div className="w-full md:w-3/4">
            {/* Sort Options - Desktop */}
            <div className="hidden md:flex justify-end mb-6">
              <div className="w-48">
                <label htmlFor="sort" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sort By
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={handleSortChange}
                  className={`block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Spinner size="lg" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className={`text-center py-20 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  No products found
                </h3>
                <p>Try adjusting your filters to find what you're looking for.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;