import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Breadcrumb from '../components/UI/Breadcrumb';
import Spinner from '../components/UI/Spinner';
import { getProduct } from '../services/api';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        if (!id) throw new Error('Product ID is required');
        const productData = await getProduct(parseInt(id));
        if (!productData) throw new Error('Product not found');
        setProduct(productData);
        setError(null);
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // Show success message or navigate to cart
      navigate('/cart');
    }
  };

  const renderRatingStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={18}
        className={`${
          index < Math.floor(rating) 
            ? 'text-yellow-500 fill-yellow-500' 
            : index < rating 
              ? 'text-yellow-500 fill-yellow-500 opacity-50' 
              : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Product not found'}</h1>
            <Link to="/products" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
              <ArrowLeft size={16} className="mr-2" />
              Back to Products
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const breadcrumbItems = [
    { label: 'Products', path: '/products' },
    { label: product.category, path: `/category/${product.category}` },
    { label: product.title, path: `/product/${product.id}` },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg p-6 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-[400px] object-contain"
            />
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderRatingStars(product.rating.rate)}
              </div>
              <span className="text-gray-600">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
            
            <div className="text-2xl font-bold text-gray-900 mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <p className="text-gray-700 mb-8">
              {product.description}
            </p>
            
            <div className="flex items-center mb-8">
              <label htmlFor="quantity" className="mr-4 text-gray-700">Quantity:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center transition-colors"
            >
              <ShoppingCart size={20} className="mr-2" />
              Add to Cart
            </button>
            
            {/* Product features/benefits */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Why shop with us?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <Truck size={20} className="text-blue-600 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Free Shipping</h4>
                    <p className="text-sm text-gray-500">For orders over $50</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield size={20} className="text-blue-600 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Secure Payment</h4>
                    <p className="text-sm text-gray-500">100% secure checkout</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <RotateCcw size={20} className="text-blue-600 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Easy Returns</h4>
                    <p className="text-sm text-gray-500">30 day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;