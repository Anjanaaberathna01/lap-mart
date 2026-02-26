import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="large">
              Go to Homepage
            </Button>
          </Link>
          <Link to="/products">
            <Button size="large" variant="outline">
              Browse Products
            </Button>
          </Link>
        </div>

        {/* Illustration */}
        <div className="mt-12">
          <svg
            className="w-64 h-64 mx-auto text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
