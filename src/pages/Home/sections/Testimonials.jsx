import { useEffect, useRef } from 'react';

const testimonials = [
  { img: '/images/User-1.jpg', name: 'Shaharban,', business: 'LUSH Bridals', text: 'Saved me 10+ hours a week! My guests love how easy it is to book. No more messy register books - just happy customers.' },
  { img: '/images/User-2.jpg', name: 'Jabir,', business: 'Wedding glow', text: 'Game-changer for our 5 properties. The automated reminders alone cut our no-shows in half. Why didn\'t we switch sooner?' },
  { img: '/images/User-3.jpg', name: 'Ruqsana,', business: 'Miora Bridal rentals', text: '"Super intuitive - had it figured out in minutes. Wish the mobile app had a few more features, but overall fantastic!"' },
  { img: '/images/client 1.png', name: 'Anil,', business: 'Golden premium cars', text: '"From 20 missed calls a day to seamless Digital bookings. My stress levels thank you, Bookie Buddy!"' },
  { img: '/images/User-5.png', name: 'Ameen,', business: 'UC Groom rentals', text: '"Best investment we made this year. The calendar sync works like magic - never double-booked again."' },
  { img: '/images/User-6.png', name: 'Lakshmi,', business: 'Bridal beauty parlours', text: '"Customers keep complimenting how professional our booking system looks. Small learning curve, but worth it!"' },
];

const Testimonials = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const animRef = useRef(null);
  const speedRef = useRef(2);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    const cards = container.querySelectorAll('.testimonial-card');
    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth + 32;
    const totalWidth = cardWidth * cards.length;
    container.style.width = `${totalWidth}px`;

    let scrollPosition = 0;

    const animate = () => {
      scrollPosition += speedRef.current;
      if (scrollPosition >= totalWidth / 2) scrollPosition = 0;
      container.style.transform = `translateX(-${scrollPosition}px)`;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const slowDown = () => { speedRef.current = 0.9; };
    const speedUp = () => { speedRef.current = 2; };

    wrapper.addEventListener('mouseenter', slowDown);
    wrapper.addEventListener('mouseleave', speedUp);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      wrapper.removeEventListener('mouseenter', slowDown);
      wrapper.removeEventListener('mouseleave', speedUp);
    };
  }, []);

  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="testimonials-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]" data-wow-delay=".2s">
        <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
          People love using <span className="bg-gradient-1 bg-clip-text text-transparent">Bookie buddy</span>
        </h2>
        <p className="text-base text-body">
          Join 500+ Business owners who simplified their operations with Bookie Buddy. Here's what they're saying:
        </p>
      </div>

      <div id="triangle-bg">
        <img src="https://ferobill.com/wp-content/uploads/2024/10/testimonials-bg.svg" alt="" />
      </div>

      <img src="/images/love emoji.png" className="floating-L-img" alt="" />
      <img src="/images/thumbsup icon.png" className="floating-R-img" alt="" />

      <div className="testimonials-scroll-wrapper" ref={wrapperRef}>
        <div className="testimonials-scroll-container" ref={containerRef}>
          {doubled.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <img src={t.img} className="testimonial-logo" alt={t.name} />
              <div className="stars">★★★★★</div>
              <div className="business-name">{t.name} <span style={{ fontWeight: 100 }}>{t.business}</span></div>
              <div className="testimonial-text">{t.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
