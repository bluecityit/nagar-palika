import { useState } from 'react';
import axios from 'axios';
import { Search, ShieldCheck, AlertCircle, FileText } from 'lucide-react';

export default function VerifyCertificate() {
  const [certType, setCertType] = useState('birth');
  const [formData, setFormData] = useState({ registration_no: '', date: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const endpoint = certType === 'birth' ? '/verify/birth' : '/verify/death';
      
      const payload = {
        registration_no: formData.registration_no,
      };
      
      if (certType === 'birth') {
        payload.dob = formData.date;
      } else {
        payload.dod = formData.date;
      }

      const response = await axios.post(`${apiUrl}${endpoint}`, payload);
      setResult(response.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Network error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <ShieldCheck className="w-16 h-16 text-saffron-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Digital Certificate Verification</h1>
          <p className="text-slate-600">Verify the authenticity of Birth and Death certificates issued by Nagar Palika Ajmer.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-200">
            <button
              className={`flex-1 py-4 text-center font-medium text-lg transition-colors ${
                certType === 'birth' 
                  ? 'bg-saffron-50 text-saffron-700 border-b-2 border-saffron-500' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
              onClick={() => { setCertType('birth'); setResult(null); setError(null); }}
            >
              Birth Certificate
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium text-lg transition-colors ${
                certType === 'death' 
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
              onClick={() => { setCertType('death'); setResult(null); setError(null); }}
            >
              Death Certificate
            </button>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registration_no"
                  value={formData.registration_no}
                  onChange={handleChange}
                  placeholder={certType === 'birth' ? "e.g., B-2026-001" : "e.g., D-2026-001"}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {certType === 'birth' ? 'Date of Birth (DOB)' : 'Date of Death (DOD)'}
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500 outline-none transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-lg transition-colors flex justify-center items-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <><Search className="w-5 h-5" /> Verify Now</>
                )}
              </button>
            </form>

            {/* Results Section */}
            {error && (
              <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700">
                <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Verification Failed</h4>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {result && result.success && (
              <div className="mt-8">
                <div className="p-4 bg-green-50 border border-green-200 rounded-t-lg flex items-center gap-3 text-green-800">
                  <ShieldCheck className="w-6 h-6 shrink-0" />
                  <h4 className="font-bold text-lg">Record Verified Successfully</h4>
                </div>
                <div className="bg-white border border-t-0 border-slate-200 rounded-b-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    {certType === 'birth' ? (
                      <>
                        <div className="border-b border-slate-100 pb-2">
                          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Name of Child</p>
                          <p className="font-semibold text-slate-900">{result.data.name}</p>
                        </div>
                        <div className="border-b border-slate-100 pb-2">
                          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Father's Name</p>
                          <p className="font-semibold text-slate-900">{result.data.father_name}</p>
                        </div>
                        <div className="border-b border-slate-100 pb-2">
                          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Mother's Name</p>
                          <p className="font-semibold text-slate-900">{result.data.mother_name}</p>
                        </div>
                        <div className="border-b border-slate-100 pb-2">
                          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Issue Date</p>
                          <p className="font-semibold text-slate-900">{new Date(result.data.issue_date).toLocaleDateString()}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="border-b border-slate-100 pb-2">
                          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Deceased Name</p>
                          <p className="font-semibold text-slate-900">{result.data.deceased_name}</p>
                        </div>
                        <div className="border-b border-slate-100 pb-2">
                          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Father/Husband Name</p>
                          <p className="font-semibold text-slate-900">{result.data.father_husband_name}</p>
                        </div>
                        <div className="border-b border-slate-100 pb-2">
                          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Issue Date</p>
                          <p className="font-semibold text-slate-900">{new Date(result.data.issue_date).toLocaleDateString()}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
