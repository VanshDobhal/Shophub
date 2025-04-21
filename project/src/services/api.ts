import { Product } from '../types';

const BASE_URL = 'https://fakestoreapi.com';

// Helper function to normalize categories
const normalizeCategory = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    // Electronics
    'smartphones': "electronics",
    'laptops': "electronics",
    'automotive': "electronics",
    'lighting': "electronics",
    
    // Home & Living
    'furniture': "home & living",
    'home-decoration': "home & living",
    'kitchen': "home & living",
    'garden': "home & living",
    
    // Beauty & Personal Care
    'skincare': "beauty & personal care",
    'fragrances': "beauty & personal care",
    'cosmetics': "beauty & personal care",
    'personal-care': "beauty & personal care",
    
    // Food & Beverages
    'groceries': "food & beverages",
    'snacks': "food & beverages",
    'beverages': "food & beverages",
    'organic-food': "food & beverages",
    
    // Women's Fashion
    'tops': "women's clothing",
    'womens-dresses': "women's clothing",
    'womens-shoes': "women's clothing",
    'womens-watches': "women's clothing",
    'womens-bags': "women's clothing",
    
    // Jewelry & Accessories
    'womens-jewellery': "jewelry & accessories",
    'mens-watches': "jewelry & accessories",
    'sunglasses': "jewelry & accessories",
    'accessories': "jewelry & accessories",
    
    // Men's Fashion
    'mens-shirts': "men's clothing",
    'mens-shoes': "men's clothing",
    'mens-accessories': "men's clothing",
    
    // Sports & Outdoors
    'sports-equipment': "sports & outdoors",
    'outdoor-gear': "sports & outdoors",
    'fitness': "sports & outdoors",
    
    // Books & Stationery
    'books': "books & stationery",
    'stationery': "books & stationery",
    'art-supplies': "books & stationery",
    
    // Toys & Games
    'toys': "toys & games",
    'games': "toys & games",
    'hobbies': "toys & games",
    
    // Health & Wellness
    'healthcare': "health & wellness",
    'medical-supplies': "health & wellness",
    'wellness': "health & wellness",
    
    // Pet Supplies
    'pet-food': "pet supplies",
    'pet-accessories': "pet supplies",
    'pet-care': "pet supplies"
  };

  return categoryMap[category.toLowerCase()] || category;
};

// Get all products with increased limit and pagination
export const getProducts = async (): Promise<Product[]> => {
  try {
    const requests = [
      fetch(`${BASE_URL}/products?limit=100`),
      fetch('https://dummyjson.com/products?limit=100'),
      fetch('https://api.escuelajs.co/api/v1/products?limit=100')
    ];

    const responses = await Promise.all(requests);
    const data = await Promise.all(responses.map(r => r.json()));

    const normalizedProducts: Product[] = [];

    // FakeStore API products
    normalizedProducts.push(...data[0]);

    // DummyJSON products
    normalizedProducts.push(...data[1].products.map((p: any) => ({
      id: p.id + 1000,
      title: p.title,
      price: p.price,
      description: p.description,
      category: normalizeCategory(p.category),
      image: p.thumbnail,
      rating: {
        rate: p.rating,
        count: p.stock
      }
    })));

    // Platzi Fake Store
    normalizedProducts.push(...data[2].map((p: any) => ({
      id: p.id + 2000,
      title: p.title,
      price: p.price,
      description: p.description,
      category: normalizeCategory(p.category.name),
      image: p.images[0],
      rating: {
        rate: 4.5,
        count: 100
      }
    })));

    return normalizedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    const response = await fetch(`${BASE_URL}/products`);
    return await response.json();
  }
};

// Get a single product by ID
export const getProduct = async (id: number): Promise<Product | null> => {
  try {
    let response;
    let product;

    if (id < 1000) {
      response = await fetch(`${BASE_URL}/products/${id}`);
      product = await response.json();
    } else if (id < 2000) {
      response = await fetch(`https://dummyjson.com/products/${id - 1000}`);
      const data = await response.json();
      product = {
        id: data.id + 1000,
        title: data.title,
        price: data.price,
        description: data.description,
        category: normalizeCategory(data.category),
        image: data.thumbnail,
        rating: {
          rate: data.rating,
          count: data.stock
        }
      };
    } else {
      response = await fetch(`https://api.escuelajs.co/api/v1/products/${id - 2000}`);
      const data = await response.json();
      product = {
        id: data.id + 2000,
        title: data.title,
        price: data.price,
        description: data.description,
        category: normalizeCategory(data.category.name),
        image: data.images[0],
        rating: {
          rate: 4.5,
          count: 100
        }
      };
    }

    return product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

// Get all categories
export const getCategories = async (): Promise<string[]> => {
  // Return predefined categories to ensure consistent categorization
  return [
    "electronics",
    "home & living",
    "beauty & personal care",
    "food & beverages",
    "women's clothing",
    "men's clothing",
    "jewelry & accessories",
    "sports & outdoors",
    "books & stationery",
    "toys & games",
    "health & wellness",
    "pet supplies"
  ];
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const allProducts = await getProducts();
    return allProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    return [];
  }
};