import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import ThemeToggle from './ThemeToggle';
import useThemeSwitcher from '../../hooks/useThemeSwitcher';
import useMobileMenu from '../../hooks/useMobileMenu';

const Header = () => {
  const [theme, toggleTheme] = useThemeSwitcher();
  const [isOpen, openMenu, closeMenu] = useMobileMenu();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <header className={`navbar absolute top-0 left-0 z-50 w-full border-stroke bg-white duration-300 dark:border-stroke-dark dark:bg-black${sticky ? ' sticky' : ''}`}>
      <div className="container relative max-w-[1400px]">
        <div className="flex items-center justify-between mt-3">

          {/* Logo */}
          <div className="block py-4 lg:py-0">
            <Link to="/" className="block max-w-[80px] sm:max-w-[60px]">
              <img src="/images/logo.svg" alt="Bookie Buddy logo" className="block dark:hidden" />
              <img src="/images/logo.svg" alt="Bookie Buddy logo" className="hidden dark:block" style={{ filter: 'invert(1)' }} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="navbarOpen absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center space-y-[6px] font-bold lg:hidden"
            aria-label="Open menu"
            onClick={openMenu}
          >
            <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
            <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
            <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
          </button>

          {/* Nav wrapper */}
          <div className={`menu-wrapper relative justify-between lg:flex${isOpen ? ' block' : ' hidden'}`}>

            {/* Close button (mobile only) */}
            <button
              className="navbarClose fixed top-10 right-10 z-[9999] flex h-10 w-10 flex-col items-center justify-center font-bold lg:hidden"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <span className="block h-[2px] w-7 rotate-45 bg-black dark:bg-white"></span>
              <span className="-mt-[2px] block h-[2px] w-7 -rotate-45 bg-black dark:bg-white"></span>
            </button>

            <nav className="fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-white text-center dark:bg-black dark:bg-opacity-95 lg:static lg:h-auto lg:w-max lg:bg-transparent">
              <ul className="items-center space-y-3 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-10">
                <li className="menu-item">
                  <a
                    href="#features"
                    onClick={(e) => scrollToSection(e, '#features')}
                    className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                  >
                    Features
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    href="#work-process"
                    onClick={(e) => scrollToSection(e, '#work-process')}
                    className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                  >
                    How it works
                  </a>
                </li>
                <li className="relative">
                  <a
                    href="#pricing"
                    onClick={(e) => scrollToSection(e, '#pricing')}
                    className="menu-scroll flex whitespace-nowrap items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7 relative"
                  >
                    Price plan
                    <div className="absolute top-09 left-10 l-1 w-10">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 20" className="w-[35px] h-[15px]">
                        <defs>
                          <linearGradient id="offerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#b443ff', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#ff5353', stopOpacity: 1 }} />
                          </linearGradient>
                        </defs>
                        <rect x="0" y="0" width="50" height="18" rx="5" fill="url(#offerGradient)" />
                        <text x="25" y="13" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">Offer</text>
                      </svg>
                    </div>
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    href="#support"
                    onClick={(e) => scrollToSection(e, '#support')}
                    className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                  >
                    Need a demo?
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    href="#faq"
                    onClick={(e) => scrollToSection(e, '#faq')}
                    className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Theme toggle */}
          <div className="mr-[60px] flex items-center justify-end lg:mr-0">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
