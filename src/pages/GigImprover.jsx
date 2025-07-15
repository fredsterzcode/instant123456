import { useState } from 'react';

const PLATFORMS = [
  'Upwork',
  'Fiverr',
  'Freelancer.com',
  'Toptal',
  'PeoplePerHour',
  'Guru',
  '99designs',
  'SimplyHired',
];
const IMPROVEMENTS = [
  'More persuasive',
  'More concise',
  'SEO-optimized',
  'Fix grammar and spelling',
  'Match platform best practices',
  'Make it more professional',
];

function Toast({ message, type, onClose }) {
  return (
    <div className={`fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white ${type === 'error' ? 'bg-red-500' : 'bg-green-600'}`}>{message}
      <button className="ml-2 text-white" onClick={onClose}>×</button>
    </div>
  );
}

export default function GigImprover() {
  const [form, setForm] = useState({
    gig: '',
    platform: PLATFORMS[0],
    improvement: IMPROVEMENTS[0],
  });
  const [loading, setLoading] = useState(false);
  const [improved, setImproved] = useState('');
  const [toast, setToast] = useState(null);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setImproved('');
    setToast(null);
    try {
      const res = await fetch('/api/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to improve gig');
      setImproved(data.improved);
      setToast({ message: 'Gig improved successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = text => {
    navigator.clipboard.writeText(text);
    setToast({ message: 'Copied to clipboard!', type: 'success' });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Improve Your Existing Gig</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4 mb-8">
        <div>
          <label className="block font-medium mb-1">Paste Your Existing Gig</label>
          <textarea name="gig" value={form.gig} onChange={handleChange} required rows={6} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Platform</label>
            <select name="platform" value={form.platform} onChange={handleChange} className="w-full border rounded px-3 py-2">
              {PLATFORMS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Improvement Type</label>
            <select name="improvement" value={form.improvement} onChange={handleChange} className="w-full border rounded px-3 py-2">
              {IMPROVEMENTS.map(i => <option key={i}>{i}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition disabled:opacity-50" disabled={loading}>
          {loading ? 'Improving...' : 'Improve My Gig'}
        </button>
      </form>
      {loading && <div className="flex justify-center my-8"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-opacity-50"></div></div>}
      {improved && (
        <div className="bg-white rounded shadow p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">Original</h3>
              <pre className="bg-gray-100 rounded p-3 whitespace-pre-wrap mb-2">{form.gig}</pre>
              <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition" onClick={() => handleCopy(form.gig)}>Copy</button>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">Improved</h3>
              <pre className="bg-gray-100 rounded p-3 whitespace-pre-wrap mb-2">{improved}</pre>
              <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition" onClick={() => handleCopy(improved)}>Copy</button>
            </div>
          </div>
        </div>
      )}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
} 