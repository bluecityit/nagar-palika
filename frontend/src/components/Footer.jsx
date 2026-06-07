import { Link } from 'react-router-dom';
import { Landmark, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Landmark className="h-8 w-8 text-saffron-500" />
              <span className="text-xl font-bold text-white">Nagar Palika Ajmer</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Dedicated to serving the citizens of Ajmer with transparency, efficiency, and continuous development for a better tomorrow.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-saffron-400 transition">About Us</Link></li>
              <li><Link to="/mission" className="hover:text-saffron-400 transition">Mission & Vision</Link></li>
              <li><Link to="/tenders" className="hover:text-saffron-400 transition">Tenders</Link></li>
              <li><Link to="/verify" className="hover:text-saffron-400 transition">Verify Certificate</Link></li>
              <li><Link to="/privacy" className="hover:text-saffron-400 transition">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-saffron-500 shrink-0" />
                <span>Nagar Palika Office, Main City Center, Ajmer, Rajasthan 305001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-saffron-500 shrink-0" />
                <span>1800-180-1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-saffron-500 shrink-0" />
                <span>contact@ajmermunicipal.in</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Working Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Monday - Friday:</span>
                <span className="text-white">9:30 AM - 5:30 PM</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Saturday:</span>
                <span className="text-white">9:30 AM - 1:30 PM</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Sunday & Holidays:</span>
                <span className="text-saffron-400">Closed</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <p>&copy; {new Date().getFullYear()} Nagar Palika Ajmer, Government of Rajasthan. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex gap-4">
              <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
          <div className="text-center text-slate-500 text-xs mt-6">
            Design & developed by <span className="text-saffron-500 font-medium">Blue City IT Solution</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
