import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, X, ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Breadcrumb from '../components/UI/Breadcrumb';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  
  const breadcrumbItems = [
    { label: 'Cart', path: '/cart' },
  ];

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="mt-6 bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingCart size={64} className="text-gray-300" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-8">Shopping Cart</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.product.id} className="p-6 flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 sm:ml-6 flex flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            <Link to={`/product/${item.product.id}`} className="hover:text-blue-600">
                              {item.product.title}
                            </Link>
                          </h3>
                          <div className="mt-1 text-xs text-gray-500">
                            {item.product.category}
                          </div>
                        </div>
                        
                        {/* Mobile view - price */}
                        <div className="sm:hidden font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                      
                      {/* Quantity and Actions */}
                      <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
                        <div className="flex items-center">
                          <label htmlFor={`quantity-${item.product.id}`} className="text-sm text-gray-600 mr-2">
                            Qty:
                          </label>
                          <select
                            id={`quantity-${item.product.id}`}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                            className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                          
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="ml-4 text-gray-500 hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        {/* Desktop view - price */}
                        <div className="hidden sm:block text-base font-medium text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="flow-root">
                <dl className="-my-4 text-sm divide-y divide-gray-200">
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">${getCartTotal().toFixed(2)}</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">Calculated at checkout</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Tax</dt>
                    <dd className="font-medium text-gray-900">Calculated at checkout</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">Order Total</dt>
                    <dd className="text-base font-medium text-gray-900">${getCartTotal().toFixed(2)}</dd>
                  </div>
                </dl>
              </div>
              
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md text-center transition-colors flex items-center justify-center"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;