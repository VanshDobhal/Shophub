import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import ProductCard from '../components/UI/ProductCard';
import Spinner from '../components/UI/Spinner';
import Breadcrumb from '../components/UI/Breadcrumb';
import { getProducts } from '../services/api';
import { Product } from '../types';

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  useEffect(() => {
    if (query && products.length > 0) {
      const lowercaseQuery = query.toLowerCase();
      const filtered = products.filter(
        product => 
          product.title.toLowerCase().includes(lowercaseQuery) || 
          product.description.toLowerCase().includes(lowercaseQuery) ||
          product.category.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);
  
  const breadcrumbItems = [
    { label: 'Search', path: '/search' },
    { label: query, path: `/search?q=${query}` },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Search Results for "{query}"
          </h1>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Spinner size="lg" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-block p-6 rounded-full bg-gray-100 mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">No results found</h2>
              <p className="text-gray-600 mb-6">
                We couldn't find any products matching "{query}".
              </p>
              <div className="space-y-4">
                <p className="text-gray-700 font-medium">Suggestions:</p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Check for typos or spelling errors</li>
                  <li>• Try more general keywords</li>
                  <li>• Try different keywords</li>
                </ul>
              </div>
              <div className="mt-8">
                <Link to="/products" className="text-blue-600 hover:text-blue-800 font-medium">
                  Browse all products instead
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Found {filteredProducts.length} results for your search
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchResultsPage;