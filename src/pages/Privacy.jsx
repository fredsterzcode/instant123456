export default function Privacy() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-blue-50 py-16 px-4 flex flex-col items-center">
      <div className="w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">Privacy Policy</h1>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">1. Information We Collect</h2>
          <p className="text-gray-700">We collect information you provide directly to us, such as when you create an account, fill out a form, or contact us.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">2. How We Use Information</h2>
          <p className="text-gray-700">We use your information to provide, maintain, and improve our services, and to communicate with you.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">3. Sharing of Information</h2>
          <p className="text-gray-700">We do not share your personal information with third parties except as necessary to provide our services or as required by law.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">4. Data Security</h2>
          <p className="text-gray-700">We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">5. Changes to This Policy</h2>
          <p className="text-gray-700">We may update this Privacy Policy from time to time. We encourage you to review it regularly.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-2">6. Contact</h2>
          <p className="text-gray-700">For questions about this policy, please contact info@instantlist.ai.</p>
        </section>
      </div>
    </div>
  );
} 