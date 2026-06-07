import { useState, useEffect } from 'react';
import { ArrowRight, FileText, CheckCircle, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const sliderImages = [
  '/images/ajmer_seven_wonders_1779727029477.png',
  '/images/ajmer_city_heritage_1779726879076.png',
  '/images/ajmer_ana_sagar_1779726847733.png',
  '/images/ajmer_taragarh_fort_1779726861576.png'
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[600px] flex items-center">
        
        {/* Background Image Slider */}
        {sliderImages.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={img} 
              alt="Ajmer City" 
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-slate-900/70 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent z-10"></div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-saffron-500/20 text-saffron-400 font-semibold text-sm mb-6 border border-saffron-500/30 backdrop-blur-sm">
              Welcome to the Heart of Rajasthan
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Empowering Citizens, Building <span className="text-saffron-400 drop-shadow-md">Ajmer</span>
            </h1>
            <p className="text-lg text-slate-200 mb-8 max-w-lg">
              Access digital services, latest updates, and important announcements from Nagar Palika Ajmer. 
              We are committed to a cleaner, greener, and smarter city.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/verify" className="bg-saffron-500 hover:bg-saffron-600 text-white font-medium py-3 px-6 rounded-lg transition shadow-lg shadow-saffron-500/30 flex items-center gap-2">
                Verify Certificate <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/tenders" className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition flex items-center gap-2 border border-white/10 backdrop-blur-sm">
                View Tenders
              </Link>
            </div>
            
            {/* Slider Indicators */}
            <div className="flex gap-2 mt-12">
              {sliderImages.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-saffron-500' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-saffron-500 to-green-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl h-full flex flex-col justify-center gap-6 transform hover:-translate-y-2 transition duration-500">
                <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                  <CheckCircle className="text-green-400 w-8 h-8 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Birth Certificates</h4>
                    <p className="text-xs text-slate-400">100% Digital Verification</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                  <FileText className="text-saffron-400 w-8 h-8 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Latest Tenders</h4>
                    <p className="text-xs text-slate-400">Transparent e-Procurement</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                  <Bell className="text-blue-400 w-8 h-8 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Smart Updates</h4>
                    <p className="text-xs text-slate-400">Real-time Notifications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Primary Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Providing seamless digital access to essential municipal services for the citizens of Ajmer.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-saffron-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-saffron-500 transition-colors">
                <CheckCircle className="w-7 h-7 text-saffron-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Certificate Verification</h3>
              <p className="text-slate-600 mb-6">Instantly verify the authenticity of digitally signed Birth and Death certificates issued by Nagar Palika Ajmer.</p>
              <Link to="/verify" className="text-saffron-600 font-semibold flex items-center gap-2 hover:text-saffron-700">
                Start Verification <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <FileText className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Public Tenders</h3>
              <p className="text-slate-600 mb-6">View active tenders, download necessary documents, and participate in the development of our city.</p>
              <Link to="/tenders" className="text-blue-600 font-semibold flex items-center gap-2 hover:text-blue-700">
                View All Tenders <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
