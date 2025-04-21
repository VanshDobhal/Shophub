import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Breadcrumb from '../components/UI/Breadcrumb';
import { useTheme } from '../contexts/ThemeContext';

const CategoriesPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  const categories = [
    {
      name: "Electronics",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Latest gadgets and electronic devices"
    },
    {
      name: "Home & Living",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Furniture, decor, and home essentials"
    },
    {
      name: "Beauty & Personal Care",
      image: "https://images.pexels.com/photos/3373716/pexels-photo-3373716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Skincare, cosmetics, and personal care products"
    },
    {
      name: "Food & Beverages",
      image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Groceries, snacks, and beverages"
    },
    {
      name: "Women's Clothing",
      image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Fashion-forward women's apparel"
    },
    {
      name: "Men's Clothing",
      image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Stylish clothing for men"
    },
    {
      name: "Jewelry & Accessories",
      image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Elegant jewelry and fashion accessories"
    },
    {
      name: "Sports & Outdoors",
      image: "https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Sports equipment and outdoor gear"
    },
    {
      name: "Books & Stationery",
      image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Books, art supplies, and stationery items"
    },
    {
      name: "Toys & Games",
      image: "https://images.pexels.com/photos/163696/toy-car-toy-box-mini-163696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Fun toys and entertaining games"
    },
    {
      name: "Health & Wellness",
      image: "https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Healthcare and wellness products"
    },
    {
      name: "Pet Supplies",
      image: "https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Everything for your furry friends"
    }
  ];

  const breadcrumbItems = [
    { label: 'Categories', path: '/categories' }
  ];

  return (
    <Layout>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-8">Shop by Category</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name}`}
                className={`group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <h3 className="text-xl font-bold mb-2 text-center">{category.name}</h3>
                    <p className="text-sm text-center opacity-90">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;