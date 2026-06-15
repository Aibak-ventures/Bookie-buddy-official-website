// Client logos 2–42 (client1 is used in testimonials)
const clientNums = Array.from({ length: 41 }, (_, i) => i + 2);

const TrustedClients = () => {
  return (
    <section id="clients" className="relative bg-white pt-[110px]">
      <div className="container mx-auto px-4">
        <div className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]" data-wow-delay=".2s">
          <h2 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            Trusted By <span className="bg-gradient-1 bg-clip-text text-transparent">500+</span> <br />
            Business Owners
          </h2>
        </div>

        <div
          className="wow fadeInUp flex justify-center gap-2 items-center flex-wrap max-w-6xl mx-auto"
          data-wow-delay=".3s"
        >
          {clientNums.map(num => (
            <div key={num} className="client-logo-wrapper">
              <img
                src={`/images/clients/client${num}.png`}
                alt={`Client ${num}`}
                className="client-logo-img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedClients;
