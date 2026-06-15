const features = [
  {
    icon: '/images/bookings icon.png',
    title: 'Upcoming Bookings',
    desc: 'View, manage, and reschedule with ease, stay organized! No more missed opportunities or last-minute rushes!',
    delay: '.2s',
  },
  {
    icon: '/images/phone in hand.png',
    title: 'Take Bookings in 4 Taps!',
    desc: 'Faster than a coffee break! Select products → Pick a date → Add customer → Confirm & done',
    delay: '.3s',
  },
  {
    icon: '/images/invoice icon.png',
    title: 'Smart Invoicing',
    desc: 'Professional invoice generation. Share via WhatsApp & other media.',
    delay: '.4s',
  },
  {
    icon: '/images/ledger icon.png',
    title: 'Digital Ledger',
    desc: '✔ Cash flow & pending payments\n✔ Auto reminders & balance updates\n✔ Lifetime earnings at a glance!',
    delay: '.2s',
  },
  {
    icon: '/images/Stock management.png',
    title: 'Stock Manager',
    desc: 'Track Smart, Sell More! Know what sells, restock on time.',
    delay: '.3s',
  },
  {
    icon: '/images/expense icon.png',
    title: 'Expense Tracker',
    desc: 'Every Rupee Counts! Categorize expenses, track profit/loss in real, no more spreadsheet chaos!',
    delay: '.4s',
  },
  {
    icon: '/images/reports icon.png',
    title: 'Real Time Reports',
    desc: 'Generate Excel/PDF reports to analyse your business.',
    delay: '.4s',
  },
  {
    icon: '/images/availabiliy icon.png',
    title: 'AI - Check Availability',
    desc: 'Avoid double booking with the help of Artificial Intelligence.',
    delay: '.4s',
  },
  {
    icon: '/images/multi shop icon.png',
    title: 'Multi-Shop Management',
    desc: 'Effortlessly manage multiple shops with a single owner account.',
    delay: '.4s',
  },
];

const Features = () => {
  return (
    <section id="features" className="relative z-10 pt-[110px]">
      <div className="container">
        <div className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]" data-wow-delay=".2s">
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            Core Features – Power Up Your Business in Minutes!
          </h2>
          <p className="text-base text-body">
            Unlock the full potential of your business with our cutting-edge features.
            Seamlessly manage operations, enhance customer experience, and drive growth effortlessly.
          </p>
        </div>
      </div>

      <div className="container max-w-[1390px]">
        <div className="rounded-2xl bg-white px-5 pt-14 pb-14 shadow-card dark:bg-dark dark:shadow-card-dark md:pb-1 lg:pt-20 lg:pb-5 xl:px-10">
          <div className="-mx-4 flex flex-wrap">
            {features.map((feature, idx) => (
              <div key={idx} className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center" data-wow-delay={feature.delay}>
                  <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300">
                    <img src={feature.icon} alt={feature.title} className="w-[90px] h-[90px] object-contain" />
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                    {feature.title}
                  </h3>
                  <p className="text-base text-body" style={{ whiteSpace: 'pre-line' }}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background graphics */}
      <div className="absolute top-0 right-0 -z-10">
        <svg width="602" height="1154" viewBox="0 0 602 1154" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.25" filter="url(#feat_filter1)">
            <circle cx="577" cy="577" r="317" fill="url(#feat_grad1)" />
          </g>
          <defs>
            <filter id="feat_filter1" x="0" y="0" width="1154" height="1154" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="130" result="effect1_foregroundBlur_26_84" />
            </filter>
            <linearGradient id="feat_grad1" x1="183.787" y1="894" x2="970.173" y2="346.491" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8EA5FE" />
              <stop offset="0.541667" stopColor="#BEB3FD" />
              <stop offset="1" stopColor="#90D1FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Features;
