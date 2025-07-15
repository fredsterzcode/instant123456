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
            <div key={idx} className="mb-8 p-6 rounded-lg border border-gray-200 shadow-md bg-gray-50">
              <h3 className="text-2xl font-bold mb-1 text-indigo-700">{gig.title}</h3>
              {gig.recommended_gig_type && (
                <div className="text-md font-semibold text-indigo-500 mb-2">Recommended Gig Type: {gig.recommended_gig_type}</div>
              )}
              <p className="mb-3 whitespace-pre-line text-gray-800 text-lg">{gig.description}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-semibold">Pricing:</span> <span>{gig.pricing}</span>
              </div>
              {/* Platform-specific fields */}
              {gig.platform_specific_fields && (
                <div className="mb-3">
                  <span className="block font-semibold text-gray-700 mb-1">Platform Details:</span>
                  {/* Fiverr: Show packages */}
                  {gig.platform === 'Fiverr' && (
                    <div className="grid md:grid-cols-3 gap-4">
                      {['basic_package', 'standard_package', 'premium_package'].map(pkg => gig.platform_specific_fields[pkg] && (
                        <div key={pkg} className="bg-white border rounded p-4 shadow-sm">
                          <div className="font-bold text-indigo-600 mb-1 capitalize">{pkg.replace('_', ' ')}</div>
                          <div className="text-gray-800 text-sm whitespace-pre-line">{gig.platform_specific_fields[pkg]}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Upwork: Show proposal */}
                  {gig.platform === 'Upwork' && gig.platform_specific_fields.proposal && (
                    <div className="bg-white border rounded p-4 shadow-sm">
                      <div className="font-bold text-indigo-600 mb-1">Proposal</div>
                      <div className="text-gray-800 text-sm whitespace-pre-line">{gig.platform_specific_fields.proposal}</div>
                    </div>
                  )}
                  {/* 99designs: Show contest brief */}
                  {gig.platform === '99designs' && gig.platform_specific_fields.contest_brief && (
                    <div className="bg-white border rounded p-4 shadow-sm">
                      <div className="font-bold text-indigo-600 mb-1">Contest Brief</div>
                      <div className="text-gray-800 text-sm whitespace-pre-line">{gig.platform_specific_fields.contest_brief}</div>
                    </div>
                  )}
                  {/* Generic fallback for other platforms */}
                  {!(gig.platform === 'Fiverr' || gig.platform === 'Upwork' || gig.platform === '99designs') && (
                    <div className="bg-white border rounded p-4 shadow-sm">
                      <pre className="text-gray-800 text-sm whitespace-pre-wrap">{JSON.stringify(gig.platform_specific_fields, null, 2)}</pre>
                    </div>
                  )}
                </div>
              )}
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition font-semibold mt-2"
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