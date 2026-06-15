const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#pricing_check)">
      <path d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z" fill="#00BE6C" />
    </g>
    <defs><clipPath id="pricing_check"><rect width="16" height="16" fill="white" /></clipPath></defs>
  </svg>
);

const PlanFeature = ({ children }) => (
  <p className="flex text-base text-black dark:text-body">
    <span className="mr-[10px] mt-1"><CheckIcon /></span>
    {children}
  </p>
);

const plans = [
  {
    name: 'Basic - starter plan',
    badge: null,
    desc: 'Beginner plan to experience bookie buddy',
    style: { border: '1px rgb(125, 125, 125) solid', height: '100%', display: 'flex', flexDirection: 'column' },
    waBg: '',
    waLink: 'https://wa.me/919744898185?text=Hi team, I\'m interested in choosing basic plan for bookie buddy.',
    features: [
      'First year completely FREE - No running/maintenance',
      'Upto 150 stock items can upload',
      'One user access',
      '4 years app updates - Get the newest features',
      '24/7 support',
      'After Year 1: Only ₹599/month for cloud & server maintenance',
      'Unlimited customers & transactions - Grow without limits',
    ],
  },
  {
    name: 'Growth plan -',
    badge: 'Recommended',
    desc: '1st year FREE! - Best for growing businesses',
    style: { border: '1px rgb(255, 0, 0) solid', height: '100%', display: 'flex', flexDirection: 'column', background: '#fff8e7' },
    waLink: 'https://wa.me/919744898185?text=Hi team, I\'m interested in choosing Growth plan for bookie buddy.',
    features: [
      'First year completely FREE - No running/maintenance',
      'Upload 250 Stock items with image',
      'Upto 3 users can access',
      'Lifetime app updates',
      'Booking and Sales available',
      'Full Admin Access',
      'Automatic cloud backups - Never lose business data',
      '24/7 priority support',
      'After Year 1: Only ₹599/month',
      'Unlimited customers & transactions - Grow without limits',
    ],
  },
  {
    name: 'Premium plan - 👑',
    badge: null,
    desc: 'Best for multi shop & premium owners',
    style: { border: '1px rgb(125, 125, 125) solid', height: '100%', display: 'flex', flexDirection: 'column' },
    waLink: 'https://wa.me/919744898185?text=Hi team, I\'m interested in choosing Premium plan for bookie buddy.',
    features: [
      'First year completely FREE - No running/maintenance',
      'Upload unlimited Stock Items Per Shop',
      'Unlimited users can access',
      'FREE Desktop App for 12 Months',
      'WhatsApp auto invoicing Free (3000 msg)',
      'Automatic Pickup & Return reminders to customers',
      'All premium features are free for 1 year',
      'Admin user Access + Dashboard Analytics',
      'Automatic cloud backups - Never lose business data',
      '24/7 priority VIP ticket support',
      'After Year 1: Only ₹599/month',
      'Lifetime App Updates',
    ],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="relative z-10 pt-[110px]">
      <div className="container">
        <div className="wow fadeInUp mx-auto mb-10 max-w-[690px] text-center lg:mb-[70px]" data-wow-delay=".2s">
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            Check Our Plans
          </h2>
          <p className="text-base text-body">
            We offer an immense plans to be your trusted business buddy.
          </p>
        </div>
      </div>

      <div className="mx-6 flex flex-wrap justify-center">
        {plans.map((plan, idx) => (
          <div key={idx} className="w-full px-2 max-w-[420px]" style={{ minHeight: '680px', marginBottom: '20px' }}>
            <div
              className="wow fadeInUp relative mb-10 rounded-xl bg-white py-10 px-9 shadow-card lg:mb-4 lg:px-7 xl:px-9"
              data-wow-delay=".3s"
              style={plan.style}
            >
              <h3 className="mb-2 text-[22px] font-semibold leading-tight text-black dark:text-white">
                {plan.name}{' '}
                {plan.badge && (
                  <span className="inline bg-gradient-2 bg-clip-text text-transparent">{plan.badge}</span>
                )}
              </h3>
              <p className="mb-7 text-base text-body">{plan.desc}</p>

              <div className="space-y-4 pt-[30px] pb-10" style={{ overflow: 'auto', flexGrow: 1 }}>
                {plan.features.map((feature, fIdx) => (
                  <PlanFeature key={fIdx}>{feature}</PlanFeature>
                ))}
              </div>

              <a
                href={plan.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-md bg-primary py-[10px] px-8 text-center text-base font-medium text-white hover:bg-opacity-90"
                style={{ marginTop: 'auto' }}
              >
                Choose Plan
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
