import { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Calendar, Download, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

export default function Tenders() {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedMonths, setExpandedMonths] = useState({});

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${apiUrl}/tenders`);
        setTenders(response.data);
        
        // Group to find the most recent month for default expansion
        if (response.data.length > 0) {
            const grouped = groupTendersByMonth(response.data);
            const sorted = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));
            if (sorted.length > 0) {
                setExpandedMonths({ [sorted[0]]: true });
            }
        }
        
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load tenders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTenders();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const groupTendersByMonth = (tendersList) => {
    return tendersList.reduce((acc, tender) => {
      const date = new Date(tender.publish_date);
      const monthYear = date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(tender);
      return acc;
    }, {});
  };

  const toggleMonth = (monthYear) => {
    setExpandedMonths(prev => ({
      ...prev,
      [monthYear]: !prev[monthYear]
    }));
  };

  const groupedTenders = groupTendersByMonth(tenders);
  const sortedMonths = Object.keys(groupedTenders).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Active Public Tenders</h1>
            <p className="text-slate-600">View and download documents for open procurement opportunities.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 inline-block self-start">
            <span className="font-semibold text-slate-700">Total Tenders: </span>
            <span className="text-saffron-600 font-bold">{tenders.length}</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-saffron-500 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Loading tenders...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-200 text-center">
            {error}
          </div>
        ) : tenders.length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow-sm border border-slate-200 text-center">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Active Tenders</h3>
            <p className="text-slate-500">There are currently no public tenders available. Please check back later.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedMonths.map((monthYear) => {
              const isExpanded = expandedMonths[monthYear];
              const monthTenders = groupedTenders[monthYear];

              return (
                <div key={monthYear} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  {/* Accordion Header */}
                  <button 
                    onClick={() => toggleMonth(monthYear)}
                    className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <h2 className="text-xl font-bold text-slate-800">{monthYear}</h2>
                      <span className="bg-saffron-100 text-saffron-700 py-1 px-3 rounded-full text-sm font-semibold">
                        {monthTenders.length} {monthTenders.length === 1 ? 'Tender' : 'Tenders'}
                      </span>
                    </div>
                    <div className="text-slate-400">
                      {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isExpanded && (
                    <div className="p-6 border-t border-slate-100 bg-slate-50 grid gap-6">
                      {monthTenders.map((tender) => (
                        <div key={tender.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
                          <div className="flex flex-col lg:flex-row gap-6 justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                  tender.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                                }`}>
                                  {tender.status}
                                </span>
                                <span className="text-sm font-medium text-slate-500">Tender ID: #{tender.id}</span>
                              </div>
                              <h3 className="text-lg font-bold text-slate-900 mb-2">{tender.title}</h3>
                              <p className="text-slate-600 text-sm mb-4">{tender.description}</p>
                              
                              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-md">
                                  <Calendar className="w-4 h-4 text-saffron-500" />
                                  <span><strong>Published:</strong> {formatDate(tender.publish_date)}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-md">
                                  <Calendar className="w-4 h-4 text-red-500" />
                                  <span><strong>Closing:</strong> {formatDate(tender.closing_date)}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="lg:border-l lg:border-slate-100 lg:pl-6 flex items-center shrink-0 mt-4 lg:mt-0">
                              {tender.file_url ? (
                                <a 
                                  href={`http://localhost:5000${tender.file_url}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="w-full lg:w-auto bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                                >
                                  <Download className="w-4 h-4" />
                                  Download PDF
                                </a>
                              ) : (
                                <button disabled className="w-full lg:w-auto bg-slate-100 text-slate-400 px-5 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 text-sm cursor-not-allowed">
                                  No Document
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
