import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isDarkMode } = useTheme();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className={`group relative rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative pt-[100%] overflow-hidden bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="mb-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              isDarkMode 
                ? 'bg-blue-900 text-blue-200' 
                : 'bg-blue-100 text-blue-600'
            }`}>
              {product.category}
            </span>
          </div>
          <h3 className={`text-sm sm:text-base font-medium line-clamp-2 h-12 mb-2 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className={`text-lg font-bold ${
              isDarkMode ? 'text-gray-200' : 'text-gray-900'
            }`}>
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors"
          aria-label="Add to cart"
        >
          <ShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;