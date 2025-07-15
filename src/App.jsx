import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Generate from './pages/Generate';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import GigImprover from './pages/GigImprover';
import { useState, useEffect } from 'react';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">InstantList.ai</Link>
        <nav className="space-x-4">
          <Link to="/generate" className="hover:underline">Generate</Link>
          <Link to="/improve" className="hover:underline">Improve</Link>
          <Link to="/pricing" className="hover:underline">Pricing</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/terms" className="hover:underline">Terms</Link>
          <Link to="/privacy" className="hover:underline">Privacy</Link>
        </nav>
      </header>
      <main className="flex-1 container mx-auto p-4 w-full max-w-4xl">{children}</main>
      <footer className="bg-white text-center p-4 border-t text-sm text-gray-500">© {new Date().getFullYear()} InstantList.ai</footer>
    </div>
  );
}

function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('cookieConsent')) setVisible(true);
  }, []);
  const accept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
  };
  if (!visible) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex flex-col md:flex-row items-center justify-between z-50 shadow-lg">
      <span className="mb-2 md:mb-0">This site uses cookies for analytics and essential functionality. By using InstantList.ai, you accept our <a href='/privacy' className='underline text-indigo-300'>Privacy Policy</a>.</span>
      <button onClick={accept} className="ml-0 md:ml-4 px-4 py-2 bg-indigo-600 rounded text-white font-semibold hover:bg-indigo-700 transition">Accept</button>
    </div>
  );
}

function App() {
  return (
    <>
      <CookieConsent />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/improve" element={<GigImprover />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
