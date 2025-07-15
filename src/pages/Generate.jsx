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
const TONES = ['Professional', 'Casual', 'Witty'];
const EXPERIENCES = ['Beginner', 'Intermediate', 'Pro'];

function Toast({ message, type, onClose }) {
  return (
    <div className={`fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white ${type === 'error' ? 'bg-red-500' : 'bg-green-600'}`}>{message}
      <button className="ml-2 text-white" onClick={onClose}>×</button>
    </div>
  );
}

export default function Generate() {
  const [form, setForm] = useState({
    name: '',
    services: '',
    skills: '',
    rate: '',
    tone: TONES[0],
    experience: EXPERIENCES[0],
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [activeTab, setActiveTab] = useState(PLATFORMS[0]);
  const [toast, setToast] = useState(null);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    setToast(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate gigs');
      setResults(data.gigs);
      setActiveTab(data.gigs[0]?.platform || PLATFORMS[0]);
      setToast({ message: 'Gigs generated successfully!', type: 'success' });
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
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-2 md:px-0 flex flex-col items-center">
      <div className="w-full bg-white rounded-xl shadow-lg p-8 mb-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Generate Your Gig Listings</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium mb-1">Services</label>
              <input name="services" value={form.services} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium mb-1">Skills (comma-separated)</label>
              <input name="skills" value={form.skills} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium mb-1">Hourly/Gig Rate</label>
              <input name="rate" value={form.rate} onChange={handleChange} required type="number" min="1" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block font-medium mb-1">Preferred Tone</label>
              <select name="tone" value={form.tone} onChange={handleChange} className="w-full border rounded px-3 py-2">
                {TONES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Experience Level</label>
              <select name="experience" value={form.experience} onChange={handleChange} className="w-full border rounded px-3 py-2">
                {EXPERIENCES.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition disabled:opacity-50" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Listings'}
          </button>
        </form>
      </div>
      {loading && <div className="flex justify-center my-8"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-opacity-50"></div></div>}
      {results.length > 0 && (
        <div className="w-full bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {PLATFORMS.map(platform => (
              <button
                key={platform}
                className={`px-4 py-2 rounded font-semibold border transition ${activeTab === platform ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-indigo-50'}`}
                onClick={() => setActiveTab(platform)}
              >
                {platform}
              </button>
            ))}
          </div>
          {results.filter(r => r.platform === activeTab).map((gig, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="text-2xl font-bold mb-2 text-indigo-700">{gig.title}</h3>
              <p className="mb-3 whitespace-pre-line text-gray-800 text-lg">{gig.description}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-semibold">Pricing:</span> <span>{gig.pricing}</span>
              </div>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition font-semibold"
                onClick={() => handleCopy(`${gig.title}\n${gig.description}\nPricing: ${gig.pricing}`)}
              >Copy to Clipboard</button>
            </div>
          ))}
          <button
            className="mt-2 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition font-semibold"
            onClick={() => setResults([])}
          >Re-generate with Edits</button>
        </div>
      )}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
} 