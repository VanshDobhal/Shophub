import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center space-x-1 text-sm">
        <li>
          <Link to="/" className="text-gray-500 hover:text-blue-600 flex items-center">
            <Home size={16} />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight size={16} className="text-gray-400" />
            {index === items.length - 1 ? (
              <span className="ml-1 font-medium text-gray-800" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link to={item.path} className="ml-1 text-gray-500 hover:text-blue-600">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;