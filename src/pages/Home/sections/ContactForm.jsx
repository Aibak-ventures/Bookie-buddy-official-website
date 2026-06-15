import { useState } from 'react';
import { buildWhatsAppUrl } from '../../../utils/helpers';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', business: '', phone: '', source: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = buildWhatsAppUrl(form.name, form.business, form.phone, form.source);
    window.open(url, '_blank');
  };

  return (
    <section id="support" className="pt-[100px] pb-[110px]">
      <div className="container">
        <div className="wow fadeInUp mx-auto mb-10 max-w-[690px] text-center" data-wow-delay=".2s">
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            Request a Demo
          </h2>
          <p className="text-base text-body">
            See Bookie Buddy in action! Manage customers, expenses, and stock with ease.
          </p>
        </div>
      </div>

      <div className="container">
        <div
          className="wow fadeInUp mx-auto w-full max-w-[925px] rounded-lg bg-[#F8FAFB] px-8 py-10 shadow-card dark:bg-[#15182B] dark:shadow-card-dark sm:px-10"
          data-wow-delay=".3s"
        >
          <form onSubmit={handleSubmit}>
            <div className="-mx-[22px] flex flex-wrap">
              <div className="w-full px-[22px] md:w-1/2">
                <div className="mb-8">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded border border-stroke bg-white py-4 px-[30px] text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="w-full px-[22px] md:w-1/2">
                <div className="mb-8">
                  <input
                    type="text"
                    name="business"
                    value={form.business}
                    onChange={handleChange}
                    placeholder="Business name"
                    className="w-full rounded border border-stroke bg-white py-4 px-[30px] text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="w-full px-[22px] md:w-1/2">
                <div className="mb-8">
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your Phone Number"
                    className="w-full rounded border border-stroke bg-white py-4 px-[30px] text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary"
                    pattern="[6-9][0-9]{9}"
                    title="Please enter a valid 10-digit Indian phone number"
                    required
                    minLength="10"
                    maxLength="10"
                  />
                </div>
              </div>

              <div className="w-full px-[22px] md:w-1/2">
                <div className="mb-8">
                  <select
                    name="source"
                    value={form.source}
                    onChange={handleChange}
                    className="w-full rounded border border-stroke bg-white py-4 px-[30px] text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary"
                  >
                    <option value="" disabled>How Did You Hear About Us?</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Friend Referral">Friend Referral</option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="w-full px-[22px]">
                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-block rounded-md bg-primary py-[14px] px-11 text-base font-medium text-white hover:bg-opacity-90"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
