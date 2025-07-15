import { Link } from 'react-router-dom';

const LOGOS = [
  { name: 'eBay', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Ebay_logo.png' },
  { name: 'Reddit', url: 'https://upload.wikimedia.org/wikipedia/en/8/82/Reddit_logo_and_wordmark.svg' },
  { name: 'Tripadvisor', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Tripadvisor_Logo_circle-green_vertical-lockup_registered_RGB.svg' },
  { name: 'Eventbrite', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Eventbrite_logo_orange.svg' },
];

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
            List Once.<br className="hidden md:inline" /> Get Hired Everywhere.
          </h1>
          <p className="mb-8 text-lg md:text-xl text-gray-700 font-medium">
            Instantly generate and optimize freelance gig listings for <span className="font-semibold text-indigo-600">Upwork, Fiverr, Freelancer, Toptal, PeoplePerHour, Guru, 99designs,</span> and <span className="font-semibold text-indigo-600">SimplyHired</span>—all in one place.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <Link to="/generate" className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition text-lg">Generate a Listing</Link>
            <Link to="/improve" className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-lg font-semibold shadow hover:bg-indigo-50 transition text-lg">Improve My Gig</Link>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
            {LOGOS.map(logo => (
              <img key={logo.name} src={logo.url} alt={logo.name} className="h-8 grayscale opacity-80 hover:opacity-100 transition" />
            ))}
          </div>
          <div className="mt-8 text-gray-500 text-sm">Trusted by freelancers and businesses worldwide</div>
        </div>
      </section>
      <section className="bg-white py-12 px-4 border-t">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-semibold mb-2">1. Fill Out the Form</h3>
              <p className="text-gray-600">Enter your details, services, skills, and preferences in one simple form.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">2. Generate or Improve</h3>
              <p className="text-gray-600">Get AI-crafted gig listings for 8 platforms, or optimize your existing gigs for more impact.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold mb-2">3. Copy & Publish</h3>
              <p className="text-gray-600">Copy your listings and publish them everywhere—get hired faster, with less effort.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 