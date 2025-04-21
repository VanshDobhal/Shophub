import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ShoppingBag } from 'lucide-react';
import Layout from '../components/Layout/Layout';

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors w-full sm:w-auto"
          >
            <Home size={18} />
            Go Home
          </Link>
          <Link 
            to="/products" 
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-md transition-colors w-full sm:w-auto"
          >
            <ShoppingBag size={18} />
            Browse Products
          </Link>
          <Link 
            to="/search" 
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-md transition-colors w-full sm:w-auto"
          >
            <Search size={18} />
            Search
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;