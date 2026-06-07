import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit2, Trash2, X, AlertCircle, Bell } from 'lucide-react';

export default function AdminDashboard() {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [latestNews, setLatestNews] = useState('');
  const [newsSaving, setNewsSaving] = useState(false);
  
  // Modal/Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    publish_date: '',
    closing_date: '',
    status: 'Active'
  });

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetchTenders();
    fetchNews();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { Authorization: `Bearer ${token}` };
  };

  const fetchTenders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/tenders`);
      setTenders(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load tenders.');
    } finally {
      setLoading(false);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${apiUrl}/news`);
      setLatestNews(response.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewsUpdate = async () => {
    try {
      setNewsSaving(true);
      await axios.put(`${apiUrl}/news`, { content: latestNews }, { headers: getAuthHeaders() });
      alert('News updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update news.');
    } finally {
      setNewsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const openAddForm = () => {
    setFormData({ title: '', description: '', publish_date: '', closing_date: '', status: 'Active' });
    setEditingId(null);
    setSelectedFile(null);
    setIsFormOpen(true);
  };

  const openEditForm = (tender) => {
    // Format dates for input type="date"
    const pubDate = new Date(tender.publish_date).toISOString().split('T')[0];
    const closeDate = new Date(tender.closing_date).toISOString().split('T')[0];
    
    setFormData({
      title: tender.title,
      description: tender.description,
      publish_date: pubDate,
      closing_date: closeDate,
      status: tender.status
    });
    setEditingId(tender.id);
    setSelectedFile(null);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tender?')) return;
    try {
      await axios.delete(`${apiUrl}/tenders/${id}`, { headers: getAuthHeaders() });
      fetchTenders(); // Refresh list
    } catch (err) {
      console.error(err);
      alert('Failed to delete tender.');
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('publish_date', formData.publish_date);
    submitData.append('closing_date', formData.closing_date);
    submitData.append('status', formData.status);
    if (selectedFile) {
        submitData.append('pdf_file', selectedFile);
    }

    try {
      if (editingId) {
        await axios.put(`${apiUrl}/tenders/${editingId}`, submitData, { headers: getAuthHeaders() });
      } else {
        await axios.post(`${apiUrl}/tenders`, submitData, { headers: getAuthHeaders() });
      }
      setIsFormOpen(false);
      fetchTenders(); // Refresh list
    } catch (err) {
      console.error(err);
      alert('Failed to save tender.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navbar for Admin */}
      <nav className="bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-saffron-500">Admin Panel</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-300">Welcome, {localStorage.getItem('adminUser') || 'Admin'}</span>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-md text-sm transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Manage Tenders</h1>
            <p className="text-slate-600 text-sm">Add, update, or remove active tenders from the public site.</p>
          </div>
          <button 
            onClick={openAddForm}
            className="bg-saffron-500 hover:bg-saffron-600 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" /> Add New Tender
          </button>
        </div>

        {/* Manage Latest News Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-saffron-500" />
            Manage Latest News Ticker
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              value={latestNews}
              onChange={(e) => setLatestNews(e.target.value)}
              placeholder="Enter the latest news to scroll in the header..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none"
            />
            <button 
              onClick={handleNewsUpdate}
              disabled={newsSaving}
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 shrink-0"
            >
              {newsSaving ? 'Saving...' : 'Update News'}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">This text will continuously scroll at the very top of the public website.</p>
        </div>

        {/* Error handling */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        )}

        {/* Form Modal (Rendered inline for simplicity) */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white">
                <h2 className="text-xl font-bold text-slate-800">
                  {editingId ? 'Edit Tender' : 'Create New Tender'}
                </h2>
                <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleFormChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea name="description" required rows="4" value={formData.description} onChange={handleFormChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Publish Date</label>
                    <input type="date" name="publish_date" required value={formData.publish_date} onChange={handleFormChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Closing Date</label>
                    <input type="date" name="closing_date" required value={formData.closing_date} onChange={handleFormChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleFormChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none">
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">PDF Attachment (Optional)</label>
                  <input type="file" accept=".pdf" onChange={(e) => setSelectedFile(e.target.files[0])} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-saffron-500 outline-none bg-slate-50" />
                  {editingId && <p className="text-xs text-slate-500 mt-1">Leave blank to keep existing file.</p>}
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 bg-saffron-500 text-white font-medium hover:bg-saffron-600 rounded-lg transition-colors">
                    {editingId ? 'Save Changes' : 'Create Tender'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-slate-500">Loading tenders...</div>
          ) : tenders.length === 0 ? (
            <div className="p-10 text-center text-slate-500">No tenders found. Click "Add New Tender" to create one.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm uppercase tracking-wider">
                    <th className="p-4 font-semibold">ID</th>
                    <th className="p-4 font-semibold">Title</th>
                    <th className="p-4 font-semibold">Dates</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tenders.map((tender) => (
                    <tr key={tender.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-slate-500 font-medium">#{tender.id}</td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-900">{tender.title}</p>
                        <p className="text-sm text-slate-500 truncate max-w-xs">{tender.description}</p>
                      </td>
                      <td className="p-4 text-sm text-slate-600">
                        <div><span className="font-medium">Pub:</span> {new Date(tender.publish_date).toLocaleDateString()}</div>
                        <div><span className="font-medium text-red-500">Close:</span> {new Date(tender.closing_date).toLocaleDateString()}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                          tender.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {tender.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => openEditForm(tender)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(tender.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
