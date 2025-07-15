import { useState } from 'react';

const COMPANY_EMAIL = 'info@instantlist.ai';
const COMPANY_PHONE = '0333 322 0408';

function Toast({ message, type, onClose }) {
  return (
    <div className={`fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white ${type === 'error' ? 'bg-red-500' : 'bg-green-600'}`}>{message}
      <button className="ml-2 text-white" onClick={onClose}>×</button>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setToast(null);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: '', email: '', message: '' });
      setToast({ message: 'Message sent! We will get back to you soon.', type: 'success' });
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-blue-50 py-16 px-4 flex flex-col items-center">
      <div className="w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold mb-4 text-gray-900 text-center">Contact Us</h1>
        <p className="text-center text-gray-600 mb-8">Have a question, feedback, or need help? Fill out the form below or reach us directly.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input name="email" value={form.email} onChange={handleChange} required type="email" className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="w-full border rounded px-3 py-2" />
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition disabled:opacity-50" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        <div className="mt-8 text-gray-700 text-center">
          <div className="mb-2"><span className="font-semibold">Email:</span> <a href={`mailto:${COMPANY_EMAIL}`} className="text-indigo-600 hover:underline">{COMPANY_EMAIL}</a></div>
          <div><span className="font-semibold">Phone:</span> <a href={`tel:${COMPANY_PHONE}`} className="text-indigo-600 hover:underline">{COMPANY_PHONE}</a></div>
        </div>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
} 