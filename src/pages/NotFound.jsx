import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 p-8">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
        <h1 className="text-6xl font-extrabold text-indigo-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Page Not Found</h2>
        <p className="text-gray-600 mb-6">Sorry, the page you’re looking for doesn’t exist or has been moved.</p>
        <Link to="/" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition">Go Home</Link>
      </div>
    </div>
  );
} 