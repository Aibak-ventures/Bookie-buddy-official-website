import { useState } from 'react';

const faqs = [
  {
    q: 'How quickly can I start using Bookie Buddy?',
    a: (
      <>
        <p className="text-base text-body">We know you're busy - that's why you can go from download to data entry in under 5 minutes!</p>
        <ul className="pl-5 text-base text-body mt-2">
          <li>• Install the app from Play Store/App Store.</li>
          <li>• <a href="https://wa.me/919744898185" className="text-primary underline" target="_blank" rel="noopener noreferrer">Connect with us</a> to set up your account.</li>
          <li>• Get a demo account with sample data.</li>
          <li>• Explore pre-loaded templates for shops, services, and rentals.</li>
        </ul>
      </>
    ),
  },
  {
    q: 'What happens after my first free year?',
    a: (
      <>
        <p className="text-base text-body">Just ₹599/month gets you:</p>
        <ul className="pl-5 text-base text-body mt-2">
          <li>• Secure cloud backups of all your business data</li>
          <li>• Priority server access for faster performance</li>
          <li>• Real-time sales &amp; expense analytics</li>
          <li><em>(That&apos;s less than ₹17/day - cheaper than chai for your whole staff!)</em></li>
        </ul>
      </>
    ),
  },
  {
    q: 'I have 200+ products. Will the stock limit work for me?',
    a: (
      <p className="text-base text-body">
        Absolutely! Our base plan includes 150 items (enough for most kirana stores/boutiques). Need more?<br /><br />
        You can add 150 products for just <strong>+₹1000 additional</strong><br />
        Get advanced inventory reports (best-sellers, dead stock alerts)<br />
        Bulk upload via Excel for large catalogs
      </p>
    ),
  },
  {
    q: 'Is my data safe with Bookie Buddy?',
    a: (
      <p className="text-base text-body">
        Your business data is 100% secure and private:<br /><br />
        Bank-level AES-256 encryption<br />
        Data stored only in India-based servers<br />
        30-day backup history (accidental deletion protection)
      </p>
    ),
  },
  {
    q: 'What if I need help using the app?',
    a: (
      <>
        <p className="text-base text-body">We're with you every step of the way:</p>
        <ul className="pl-5 text-base text-body mt-2">
          <li>• 24/7 WhatsApp support (avg. response time: 22 mins)</li>
        </ul>
      </>
    ),
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="relative z-10 bg-[#F8FAFB] py-[110px] dark:bg-[#15182B]">
      <div className="container">
        <div className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]" data-wow-delay=".2s">
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-body">
            Got questions? We've got answers! Here are the most common questions from business owners like you.
          </p>
        </div>

        <div className="faqs wow fadeInUp mx-auto w-full max-w-[785px] rounded-lg bg-white px-6 py-[6px] shadow-card dark:bg-black dark:shadow-card-dark" data-wow-delay=".3s">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`faq border-b border-stroke last-of-type:border-none dark:border-stroke-dark${openIndex === idx ? ' active' : ''}`}
            >
              <button
                className="faq-btn relative flex w-full justify-between py-6 px-[18px] text-left text-base font-medium text-black dark:text-white sm:px-[26px] sm:text-lg"
                onClick={() => toggle(idx)}
                aria-expanded={openIndex === idx}
              >
                {faq.q}
              </button>
              {openIndex === idx && (
                <div className="faq-content border-t border-stroke px-[18px] dark:border-stroke-dark sm:px-[26px] pb-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Graphics */}
      <div className="absolute right-0 -top-24 -z-10">
        <svg width="95" height="190" viewBox="0 0 95 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="95" cy="95" r="77" stroke="url(#faq_g1)" strokeWidth="36" />
          <defs>
            <linearGradient id="faq_g1" x1="0" y1="0" x2="224.623" y2="130.324" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF8FE8" /><stop offset="1" stopColor="#FFC960" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute left-0 -bottom-24 -z-10">
        <svg width="95" height="190" viewBox="0 0 95 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cy="95" r="77" stroke="url(#faq_g2)" strokeWidth="36" />
          <defs>
            <linearGradient id="faq_g2" x1="-117.84" y1="190" x2="117.828" y2="25.9199" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8EA5FE" /><stop offset="0.541667" stopColor="#BEB3FD" /><stop offset="1" stopColor="#90D1FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default FAQ;
