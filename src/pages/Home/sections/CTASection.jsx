const CTASection = () => {
  return (
    <section id="cta" className="relative z-10 pt-[110px]">
      <div className="container max-w-[1390px]">
        <div className="rounded-2xl bg-white px-10 pt-14 shadow-card dark:bg-dark dark:shadow-card-dark sm:px-20 lg:px-12 lg:pt-20 xl:px-20">
          <div className="-mx-4 flex flex-wrap">

            {/* Left: Text + buttons */}
            <div className="w-full self-center px-4 lg:w-1/2">
              <div className="wow fadeInUp mx-auto max-w-[530px] text-center lg:ml-0 lg:text-left" data-wow-delay=".2s">
                <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[38px] md:leading-tight">
                  Download buddy Now &amp; Start Your Journey Today!
                </h2>
                <p className="mb-10 text-base text-body">
                  Unlock powerful potential with Bookie buddy. Get started with a plan that fits your needs!
                </p>

                <div className="-mx-[10px] flex flex-wrap items-center justify-center lg:justify-start">
                  <div className="inline-block px-[10px]">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.bookingbuddy.bookingapp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-5 inline-flex items-center rounded-md bg-primary py-[10px] pl-4 pr-5 text-white hover:bg-opacity-90"
                    >
                      <span className="mr-[10px]">
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 28.9958V4.9125C4 4.07667 4.48167 3.34 5.19 3L19.1442 16.9542L5.19 30.9083C4.48167 30.5542 4 29.8317 4 28.9958ZM23.5642 21.3742L8.32083 30.1858L20.3483 18.1583L23.5642 21.3742ZM28.31 15.2683C28.7917 15.6508 29.1458 16.2458 29.1458 16.9542C29.1458 17.6625 28.8342 18.2292 28.3383 18.6258L25.0942 20.4958L21.5525 16.9542L25.0942 13.4125L28.31 15.2683ZM8.32083 3.7225L23.5642 12.5342L20.3483 15.75L8.32083 3.7225Z" fill="currentColor" />
                        </svg>
                      </span>
                      <span className="text-left">
                        <span className="block text-xs opacity-70">Get it on</span>
                        <span className="block text-sm font-medium">Google Play</span>
                      </span>
                    </a>
                  </div>

                  <div className="inline-block px-[10px]">
                    <a
                      href="https://apps.apple.com/in/app/bookie-buddy/id6740146706"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-5 inline-flex items-center rounded-md bg-black py-[10px] pl-4 pr-5 text-white hover:bg-opacity-90 dark:bg-white dark:text-black dark:hover:bg-opacity-90"
                    >
                      <span className="mr-[10px]">
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M26.5058 27.625C25.33 29.3817 24.0833 31.0959 22.185 31.1242C20.2867 31.1667 19.6775 30.005 17.5242 30.005C15.3567 30.005 14.6908 31.0959 12.8917 31.1667C11.0358 31.2375 9.63333 29.2967 8.44333 27.5825C6.02083 24.0834 4.165 17.6375 6.65833 13.3025C7.89083 11.1492 10.1008 9.78921 12.495 9.74671C14.3083 9.71837 16.0367 10.9792 17.1558 10.9792C18.2608 10.9792 20.3575 9.46337 22.5533 9.69004C23.4742 9.73254 26.0525 10.0584 27.71 12.495C27.5825 12.58 24.6358 14.3084 24.6642 17.8925C24.7067 22.1709 28.4183 23.6017 28.4608 23.6159C28.4183 23.715 27.8658 25.6559 26.5058 27.625ZM18.4167 4.95837C19.4508 3.78254 21.165 2.89004 22.5817 2.83337C22.7658 4.49087 22.1 6.16254 21.1083 7.35254C20.1308 8.55671 18.5158 9.49171 16.9292 9.36421C16.7167 7.73504 17.51 6.03504 18.4167 4.95837Z" fill="currentColor" />
                        </svg>
                      </span>
                      <span className="text-left">
                        <span className="block text-xs opacity-70">Download from</span>
                        <span className="block text-sm font-medium">App Store</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="w-full px-4 lg:w-1/2">
              <div className="wow fadeInUp relative z-10 mx-auto mt-20 max-w-[435px] lg:mt-0" data-wow-delay=".3s">
                <img src="/images/donwnload-image.png" alt="Download Bookie Buddy" className="mx-auto max-w-full" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
