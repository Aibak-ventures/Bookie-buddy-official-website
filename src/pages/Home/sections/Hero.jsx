import RollingText from '../../../components/RollingText/RollingText';

const Hero = () => {
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="pt-[100px] pb-8">
      <div className="container-hero lg:max-w-[1305px] md:px-10 lg:px-10">
        <div className="flex flex-wrap items-center">

          {/* Left: Text */}
          <div className="w-full pt-[100px] lg:w-6/12">
            <div className="wow fadeInUp mb-12 lg:mb-0 lg:max-w-[620px]" data-wow-delay=".2s">
              <span className="mb-5 block text-lg font-medium leading-tight text-black dark:text-white sm:text-[22px] xl:text-[22px]">
                Struggling with double bookings, expenses?
              </span>
              <h1 className="mb-6 hero-heading text-3xl font-bold leading-tight text-black dark:text-white sm:text-[40px] md:text-[50px] lg:text-[42px] xl:text-[50px]">
                Bookie buddy equals
                <span>
                  <span className="inline-flex items-center" style={{ gap: '1rem' }}>
                    <span className="wall-background">
                      <span className="wall-text">
                        <RollingText phrases={['Growing', 'Automate', 'Transform', 'Scaling', 'Simplify', 'Manage']} />
                      </span>
                    </span>
                    business!
                  </span>
                </span>
              </h1>

              <p className="mb-10 max-w-[475px] text-base leading-relaxed text-body">
                Built for Pre-Booking &amp; Rentals businesses – Easy Booking, Seamless Management, Total Control!
              </p>

              <div className="flex flex-wrap items-center">
                <a
                  href="#cta"
                  onClick={(e) => scrollToSection(e, '#cta')}
                  className="mr-6 mb-6 inline-flex h-[60px] items-center rounded-lg bg-black py-[14px] px-[30px] text-white hover:bg-opacity-90 dark:bg-white dark:text-black dark:hover:bg-opacity-90"
                >
                  <span className="mr-[18px] border-r border-stroke border-opacity-40 pr-[18px] leading-relaxed dark:border-[#BDBDBD]">
                    Get the app
                  </span>
                  <span>
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.163 2.819C9 3.139 9 3.559 9 4.4V11H7.803c-.883 0-1.325 0-1.534.176a.75.75 0 0 0-.266.62c.017.274.322.593.931 1.232l4.198 4.401c.302.318.453.476.63.535a.749.749 0 0 0 .476 0c.177-.059.328-.217.63-.535l4.198-4.4c.61-.64.914-.96.93-1.233a.75.75 0 0 0-.265-.62C17.522 11 17.081 11 16.197 11H15V4.4c0-.84 0-1.26-.164-1.581a1.5 1.5 0 0 0-.655-.656C13.861 2 13.441 2 12.6 2h-1.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656zM5 21a1 1 0 0 0 1 1h12a1 1 0 1 0 0-2H6a1 1 0 0 0-1 1z" fill="#ffff" />
                      </g>
                    </svg>
                  </span>
                </a>

                <a
                  href="#support"
                  onClick={(e) => scrollToSection(e, '#support')}
                  className="relative mb-6 inline-flex items-center justify-center px-6 py-3 text-white rounded-lg overflow-hidden bg-transparent border-glow"
                >
                  <span className="relative z-10 text-black">Request a Demo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Hero image */}
          <div className="w-full px-4 lg:w-5/12">
            <div className="mobile-wrapper relative z-10 mx-auto w-full max-w-[530px] pt-8 lg:mr-0">
              <div className="mobile-container">
                <img src="/images/Mobiles3.png" alt="Bookie Buddy App" className="mx-auto max-w-full relative z-20" />
              </div>
              <div className="gradient-bg max-auto absolute top-0 left-0 right-0 -z-10 aspect-square w-full rounded-full bg-gradient-3">
                <div className="decoration-1 absolute top-5 right-0">
                  <svg width="72" height="51" viewBox="0 0 72 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#hero_clip1)">
                      <path d="M22.378 0.4157C22.0401 7.83785 25.7079 22.0514 43.163 21.2025C36.0333 21.7022 21.9045 26.7677 22.3875 43.0291C22.1659 35.9367 17.5749 21.9221 1.00683 21.8442C8.04005 21.7355 21.4537 17.3609 22.378 0.4157Z" fill="#794f8f" />
                      <path d="M59.3487 24.4888C59.1459 28.942 61.3466 37.4702 71.8196 36.9608C67.5418 37.2606 59.0645 40.3 59.3543 50.0568C59.2213 45.8014 56.4667 37.3926 46.5259 37.3459C50.7458 37.2807 58.794 34.6559 59.3487 24.4888Z" fill="#19DEBB" />
                    </g>
                    <defs><clipPath id="hero_clip1"><rect width="71.2541" height="49.8779" fill="white" transform="translate(0.56543 0.199219)" /></clipPath></defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
