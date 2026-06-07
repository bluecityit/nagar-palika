import { Link } from 'react-router-dom';
import { Menu, X, Landmark, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [latestNews, setLatestNews] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '/api';
        const response = await axios.get(`${apiUrl}/news`);
        setLatestNews(response.data.content);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNews();
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Mission & Vision', path: '/mission' },
    { 
      name: 'Citizen Services', 
      dropdown: [
        { name: 'Verify Certificate', path: '/verify' },
        { name: 'Tenders', path: '/tenders' },
      ] 
    },
    { name: 'Admin Login', path: '/admin/dashboard' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="bg-saffron-500 text-white py-1.5 px-4 text-sm font-medium flex justify-between items-center overflow-hidden gap-4">
        <div className="flex items-center gap-2 font-bold shrink-0">
          <span className="bg-red-600 px-2 py-0.5 rounded text-xs animate-pulse">LATEST NEWS</span>
        </div>
        <div className="flex-1 overflow-hidden whitespace-nowrap relative h-5">
          <div className="absolute whitespace-nowrap animate-marquee">
            {latestNews || 'Welcome to the official portal of Nagar Palika Ajmer.'}
          </div>
        </div>
        <span className="shrink-0 font-bold hidden sm:block">Helpline: 1800-180-1234</span>
      </div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <Landmark className="h-10 w-10 text-saffron-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-800 leading-tight">Nagar Palika Ajmer</h1>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Government of Rajasthan</p>
              </div>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.dropdown ? (
                <div key={link.name} className="relative group">
                  <button className="flex items-center gap-1 text-slate-700 hover:text-saffron-600 font-medium transition-colors py-8">
                    {link.name} <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute left-0 top-full hidden group-hover:block w-56 bg-white border border-slate-100 shadow-xl rounded-b-lg overflow-hidden transition-all duration-200">
                    {link.dropdown.map((sublink) => (
                      <Link
                        key={sublink.name}
                        to={sublink.path}
                        className="block px-4 py-3 text-sm text-slate-700 hover:bg-saffron-50 hover:text-saffron-600 border-b border-slate-50 last:border-0 transition-colors"
                      >
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-slate-700 hover:text-saffron-600 font-medium transition-colors py-8"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-saffron-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg absolute w-full max-h-[80vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              link.dropdown ? (
                <div key={link.name}>
                  <button 
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-slate-700 hover:text-saffron-600 hover:bg-saffron-50 rounded-md transition-colors"
                  >
                    {link.name} <ChevronDown className={`w-5 h-5 transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileDropdownOpen && (
                    <div className="pl-4 space-y-1 mt-1 bg-slate-50 rounded-md py-2">
                      {link.dropdown.map((sublink) => (
                        <Link
                          key={sublink.name}
                          to={sublink.path}
                          className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-saffron-600 hover:bg-white rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-saffron-600 hover:bg-saffron-50 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
