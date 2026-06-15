import { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WhatsAppFloat from '../../components/WhatsAppFloat/WhatsAppFloat';
import ScrollIndicator from '../../components/ScrollIndicator/ScrollIndicator';
import useScrollAnimations from '../../hooks/useScrollAnimations';

import Hero from './sections/Hero';
import Features from './sections/Features';
import WorkProcess from './sections/WorkProcess';
import Pricing from './sections/Pricing';
import CTASection from './sections/CTASection';
import Testimonials from './sections/Testimonials';
import TrustedClients from './sections/TrustedClients';
import FAQ from './sections/FAQ';
import ContactForm from './sections/ContactForm';

// Industry roll cards (between Hero and Features)
const rollCards = [
  { img: 'https://godwincharli.com/cdn/shop/articles/5_4a30a0f2-639f-4e28-8d79-e3de43bd747b.jpg?v=1694064774', title: 'Groom Rentals' },
  { img: 'https://girlandworld.com/wp-content/uploads/2018/03/indian-bridal-pakistani-bride-hair-and-makeup-artist-vancouver-mindy-bansal-beauty-influencer-destination-weddings-girlfriendz-studio1.jpg?w=1920&h=1080&crop=1', title: 'Bridal Rentals' },
  { img: 'https://rentbuyit.com.au/wp-content/uploads/2024/01/cars-in-a-sunset-1.jpg', title: 'Car Rentals' },
  { img: 'https://www.livemint.com/lm-img/img/2024/10/20/1600x900/INDIA-GOLD-1_1645091171106_1729442514104.JPG', title: 'Jewelry Rentals' },
  { img: 'https://bigbikerentalbangkok.com/wp-content/uploads/2024/04/Home-about-us.jpg', title: 'Bike Rentals' },
  { img: 'https://assets-news.housing.com/news/wp-content/uploads/2022/10/19004255/construction-tools-feature-compressed-686x400.jpg', title: 'Construction tools' },
  { img: 'https://techresearchonline.com/wp-content/uploads/2022/06/Innovative-and-Futuristic-Tech-gadgets-that-will-make-you-Speech-less_blog-banner-1.webp', title: 'Gadget Rentals' },
  { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX2lEk0A3xDYtfSMfcR-HZDh5NhQP8lq4lOQ&s', title: 'Cycle Rentals' },
  { img: 'https://indriyaresorts.com/images/resorts/indriya-beach-resort/indriya-beach-resorts-strip-02-zoom.jpg', title: 'Resorts' },
  { img: 'https://legacybox.com/cdn/shop/articles/photo-1543785832-0781599790c2.jpg?v=1613403332&width=1399', title: 'Camera Rentals' },
];

const scrollToSection = (e, href) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
};

const Home = () => {
  useScrollAnimations();

  return (
    <div className="bg-white dark:bg-black">
      <Header />

      <main>
        <Hero />

        {/* Scroll Indicator */}
        <div className="pb-10 pt-10">
          <div
            className="scroll-indicator"
            onClick={(e) => scrollToSection(e, '#features')}
            style={{ cursor: 'pointer' }}
          >
            <span className="scroll-text">Check! Is This Software for You?</span>
            <div className="arrow-container">
              <div className="arrow"></div>
              <div className="arrow"></div>
            </div>
          </div>
        </div>

        {/* Industry Roll Area */}
        <section>
          <div className="container lg:max-w-[1305px] lg:px-10">
            <div className="wow fadeInUp ml-1 max-w-[690px] text-left lg:mb-[50px] lg:text-lg" data-wow-delay=".2s">
              <h2 className="font-bold text-black heading1">
                Our software used by{' '}
                <span className="inline bg-gradient-2 bg-clip-text text-transparent">500+ <br /></span>
                business owners in{' '}
                <span className="inline bg-gradient-1 bg-clip-text text-transparent">10+ industries</span>
              </h2>
            </div>
          </div>

          <div className="roll-wrapper">
            <div className="roll-track">
              {/* Original + cloned for seamless loop */}
              {[...rollCards, ...rollCards].map((card, idx) => (
                <div key={idx} className="roll-card">
                  <img src={card.img} alt={card.title} />
                  <div className="card-overlay">
                    <h3 className="card-title">{card.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-2xl bg-white shadow-card trust-card-wrapper">
            <div className="-mx-4 flex flex-wrap trust-card">
              <div className="wow fadeInUp group mx-5 max-w-[310px] text-center">
                <div className="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300">
                  <iframe src="https://lottie.host/embed/c6810099-fdb9-4808-8560-ab4a0866a335/vikVDm0gB1.lottie" title="Revenue" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">10x</h3>
                <h4>Boosted Revenue</h4>
              </div>
              <div className="wow fadeInUp group mx-5 max-w-[310px] text-center">
                <div className="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300">
                  <iframe src="https://lottie.host/embed/f0d768cd-2e14-46a4-8c9f-10e85a1cd87f/9v5YleVu2P.lottie" title="Time saved" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">30x</h3>
                <h4>Time Saved</h4>
              </div>
              <div className="wow fadeInUp group mx-5 max-w-[310px] text-center">
                <div className="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300">
                  <iframe src="https://lottie.host/embed/b56f0741-6471-408f-a8d0-d2d9d49f94b3/jtpX6iyfGo.lottie" title="Reduce efforts" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">50%</h3>
                <h4>Reduce human efforts</h4>
              </div>
            </div>

            <div className="flex justify-center mt-20">
              <a href="#support" onClick={(e) => scrollToSection(e, '#support')} className="demo-button-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" fill="white" height="18" viewBox="0 0 448 512">
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
                Get a demo
              </a>
            </div>
          </div>
        </section>

        <Features />
        <WorkProcess />
        <Pricing />
        <CTASection />
        <Testimonials />
        <TrustedClients />
        <div style={{ paddingTop: '6rem' }}></div>
        <FAQ />
        <ContactForm />
      </main>

      <Footer />
      <WhatsAppFloat />
      <ScrollIndicator />
    </div>
  );
};

export default Home;
