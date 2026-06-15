import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="bg-[#F8FAFB] pb-14 dark:bg-[#15182A]">
        <div className="container max-w-[1390px]">
          <div className="-mx-4 flex flex-wrap items-center justify-between md:flex-row flex-col">

            {/* Navigation Links */}
            <div className="px-4 flex-1 order-1">
              <div className="wow fadeInUp text-center" data-wow-delay=".3s">
                <ul className="flex justify-center flex-wrap" style={{ gap: '16px' }}>
                  <li>
                    <a href="https://aibakventures.com" target="_blank" rel="noopener noreferrer"
                      className="inline-block text-base text-body hover:text-primary">
                      Company
                    </a>
                  </li>
                  <li>
                    <a href="https://www.aibakventures.com/careers.html" target="_blank" rel="noopener noreferrer"
                      className="inline-block text-base text-body hover:text-primary">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" onClick={(e) => scrollToSection(e, '#pricing')}
                      className="inline-block text-base text-body hover:text-primary">
                      Price plan
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Logos */}
            <div className="flex justify-between w-full mt-4 md:w-auto md:mt-0 order-2">
              <div className="px-4">
                <Link to="/" className="inline-block">
                  <img src="/images/logo.svg" alt="Bookie Buddy" className="block max-w-[100px] dark:hidden" />
                  <img src="/images/logo.svg" alt="Bookie Buddy" className="hidden max-w-[100px] dark:block" style={{ filter: 'invert(1)' }} />
                </Link>
              </div>
              <div className="px-4">
                <a href="https://aibakventures.com" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <img src="/images/aibak_logo.svg" alt="Aibak Ventures" className="block max-w-[145px] dark:hidden" />
                  <img src="/images/aibak_logo.svg" alt="Aibak Ventures" className="hidden max-w-[145px] dark:block" style={{ filter: 'invert(1)' }} />
                </a>
              </div>
            </div>

          </div>
          <p className="text-body text-center text-sm">
            Developed by{' '}
            <a href="https://aibakventures.com" target="_blank" rel="noopener noreferrer" className="text-primary">
              Aibak ventures
            </a>
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="wow fadeInUp bg-primary py-7 dark:bg-black" data-wow-delay=".2s">
        <div className="container max-w-[1390px]">
          <div className="-mx-3 flex flex-wrap">
            <div className="order-last w-full px-3 lg:order-first lg:w-1/3">
              <p className="mt-4 text-center text-base text-white lg:mt-0 lg:text-left">
                &copy; 2025 Bookie buddy. All rights reserved
              </p>
            </div>

            <div className="w-full px-3 md:w-1/2 lg:w-1/3">
              <div className="mb-4 flex items-center justify-center space-x-5 md:mb-0 md:justify-start lg:justify-center">
                {/* Facebook */}
                <a href="https://www.facebook.com/share/1VY5mUNeK7/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"
                  className="text-white opacity-70 hover:opacity-100" aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#fb)">
                      <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z" fill="white" />
                    </g>
                    <defs><clipPath id="fb"><rect width="24" height="24" fill="white" /></clipPath></defs>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/bookie_buddy" target="_blank" rel="noopener noreferrer"
                  className="text-white opacity-70 hover:opacity-100" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 2C4.24 2 2 4.24 2 7V17C2 19.76 4.24 22 7 22H17C19.76 22 22 19.76 22 17V7C22 4.24 19.76 2 17 2H7ZM7 4H17C18.66 4 20 5.34 20 7V17C20 18.66 18.66 20 17 20H7C5.34 20 4 18.66 4 17V7C4 5.34 5.34 4 7 4ZM17.5 6.5C16.67 6.5 16 7.17 16 8C16 8.83 16.67 9.5 17.5 9.5C18.33 9.5 19 8.83 19 8C19 7.17 18.33 6.5 17.5 6.5ZM12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9Z" fill="white" />
                  </svg>
                </a>
                {/* WhatsApp */}
                <a href="https://wa.me/919744898185" target="_blank" rel="noopener noreferrer"
                  className="text-white opacity-70 hover:opacity-100" aria-label="WhatsApp">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.5 12C3.5 7.3056 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.3056 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.7713 20.0182 7.458 19.1861C7.2136 19.0313 6.9141 18.9899 6.6368 19.0726L3.7577 19.9319L4.8417 17.3953C4.9699 17.0955 4.9438 16.7521 4.7719 16.4751C3.9657 15.176 3.5 13.6439 3.5 12ZM12 1.5C6.201 1.5 1.5 6.201 1.5 12C1.5 13.8381 1.9732 15.5683 2.8046 17.0727L1.0805 21.107C0.928 21.4637 0.9956 21.8763 1.2538 22.1657C1.512 22.4552 1.9143 22.5692 2.286 22.4582L6.7854 21.1155C8.3225 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.201 17.799 1.5 12 1.5Z" fill="white" />
                    <path d="M14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.764 12.1433 9.3761 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.9453 10.447 9.5303L9.3828 7.5303C9.2395 7.261 8.9812 7.0718 8.6811 7.0165C8.3811 6.9613 8.0723 7.046 7.8425 7.2466L7.527 7.5219C6.7682 8.1841 6.3195 9.2723 6.6914 10.3741C7.077 11.5163 7.8998 13.314 9.5855 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z" fill="white" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="w-full px-3 md:w-1/2 lg:w-1/3">
              <div className="flex items-center justify-center space-x-4 sm:space-x-8 md:justify-end lg:justify-end">
                <a href="https://www.termsfeed.com/live/e9045109-cea9-4b40-a8b3-8c300091002e" target="_blank" rel="noopener noreferrer"
                  className="text-base text-white">
                  Privacy Policy
                </a>
                <a href="#" className="text-base text-white">
                  Terms and conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
