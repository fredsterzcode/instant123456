import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen w-full flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center py-24 px-4 w-full min-h-[60vh]">
        <div className="w-full text-center mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
            List Once.<br className="hidden md:inline" /> Get Hired Everywhere.
          </h1>
          <p className="mb-10 text-xl md:text-2xl text-gray-700 font-medium">
            Instantly generate and optimize freelance gig listings for <span className="font-semibold text-indigo-600">Upwork, Fiverr, Freelancer, Toptal, PeoplePerHour, Guru, 99designs,</span> and <span className="font-semibold text-indigo-600">SimplyHired</span>—all in one place.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
            <Link to="/generate" className="px-10 py-4 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition text-lg">Generate a Listing</Link>
            <Link to="/improve" className="px-10 py-4 border border-indigo-600 text-indigo-600 rounded-lg font-semibold shadow hover:bg-indigo-50 transition text-lg">Improve My Gig</Link>
          </div>
          <div className="mt-8 text-gray-500 text-base md:text-lg font-medium">
            <span className="inline-block bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full shadow-sm">Trusted by freelancers and businesses worldwide</span>
          </div>
        </div>
      </section>
      <section className="bg-white py-16 px-4 border-t w-full">
        <div className="w-full">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12 w-full">
            <div className="text-center">
              <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-indigo-100">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="font-semibold mb-2 text-lg">1. Fill Out the Form</h3>
              <p className="text-gray-600">Enter your details, services, skills, and preferences in one simple form.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-indigo-100">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2 text-lg">2. Generate or Improve</h3>
              <p className="text-gray-600">Get AI-crafted gig listings for 8 platforms, or optimize your existing gigs for more impact.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-indigo-100">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="font-semibold mb-2 text-lg">3. Copy & Publish</h3>
              <p className="text-gray-600">Copy your listings and publish them everywhere—get hired faster, with less effort.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 