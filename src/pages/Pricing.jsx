const PLANS = [
  {
    name: 'Free',
    price: '£0',
    period: '/month',
    features: [
      '1 gig/month',
      'Access to all 8 platforms',
      'Basic gig improver',
      'Email support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '£7',
    period: '/month',
    features: [
      '10 gigs/month',
      'Editable outputs',
      'Advanced gig improver',
      'Priority support',
    ],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    name: 'Unlimited',
    price: '£19',
    period: '/month',
    features: [
      'Unlimited gigs',
      'Editable outputs',
      'Advanced gig improver',
      'Priority support',
      'Early access to new features',
    ],
    cta: 'Go Unlimited',
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900">Simple, Transparent Pricing</h1>
      <p className="text-center text-lg text-gray-600 mb-12">Choose the plan that fits your freelance journey. Upgrade or downgrade anytime.</p>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {PLANS.map(plan => (
          <div key={plan.name} className={`rounded-xl shadow-lg bg-white p-8 flex flex-col items-center border-2 ${plan.highlight ? 'border-indigo-600 scale-105 z-10' : 'border-gray-200'} transition`}> 
            <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
            <div className="flex items-end mb-4">
              <span className="text-4xl font-extrabold text-indigo-600">{plan.price}</span>
              <span className="text-gray-500 ml-1 mb-1">{plan.period}</span>
            </div>
            <ul className="mb-6 space-y-2 text-gray-700 text-left w-full">
              {plan.features.map(f => (
                <li key={f} className="flex items-center"><span className="mr-2 text-green-500">✔</span>{f}</li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-lg font-semibold ${plan.highlight ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-indigo-600 hover:bg-indigo-50'} transition mb-2`}>
              {plan.cta}
            </button>
            {plan.name === 'Pro' && (
              <div className="text-xs text-indigo-600 font-semibold mb-2">Most Popular</div>
            )}
            {plan.name !== 'Free' && (
              <div className="text-xs text-gray-400">Stripe integration coming soon</div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-12 text-center text-gray-500 text-sm">No hidden fees. Cancel anytime. Questions? <a href="/contact" className="text-indigo-600 hover:underline">Contact us</a>.</div>
    </div>
  );
} 