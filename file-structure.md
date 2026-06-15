current react folder structure
PS C:\Users\anilv\Documents\Aibak\bookie_buddy_web\bookie-buddy-web> ls 
    Directory: C:\Users\anilv\Documents\Aibak\bookie_buddy_web\bookie-buddy-web
Mode                 LastWriteTime         Length Name                                                                                           
----                 -------------         ------ ----                                                                                           
d-----        12-06-2026  02:10 PM                node_modules                                                                                   
d-----        12-06-2026  02:09 PM                public                                                                                         
d-----        12-06-2026  02:09 PM                src                                                                                            
-a----        12-06-2026  02:01 PM            253 .gitignore                                                                                     
-a----        12-06-2026  02:01 PM            568 eslint.config.js                                                                               
-a----        12-06-2026  02:09 PM            368 index.html                                                                                     
-a----        12-06-2026  02:10 PM          83813 package-lock.json                                                                              
-a----        12-06-2026  02:09 PM            613 package.json                                                                                   
-a----        12-06-2026  02:01 PM           1027 README.md                                                                                      
-a----        12-06-2026  02:01 PM            161 vite.config.js                                                                                 
PS C:\Users\anilv\Documents\Aibak\bookie_buddy_web\bookie-buddy-web> 


index.html
style.css
bundle.js
404.html

```javascript
// js- rolling-text.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize after a short delay to ensure DOM is fully loaded
    setTimeout(() => {
        const phrases = document.querySelectorAll('.rolling-text span');
        const rollingContainer = document.querySelector('.rolling-text');
        let currentIndex = 0;
        
        if (phrases.length === 0) return; // Exit if no phrases found
    
        // Calculate the maximum width needed for all phrases
        let maxWidth = 0;
        phrases.forEach(phrase => {
            phrase.style.position = 'static';
            phrase.style.visibility = 'hidden';
            phrase.style.opacity = '1';
            const width = phrase.offsetWidth;
            if (width > maxWidth) maxWidth = width;
            phrase.style.position = 'absolute';
            phrase.style.visibility = 'visible';
            phrase.style.opacity = '0';
        });
        
        // Set the container width to the maximum width
        rollingContainer.style.width = maxWidth + 'px';
        
        // Make sure all phrases are hidden initially
        phrases.forEach(phrase => {
            phrase.style.opacity = "0";
            phrase.style.transform = "rotateX(-90deg)";
        });
        
        // Set the first phrase as active after a small delay
        setTimeout(() => {
            phrases[0].classList.add('active');
        }, 200);
        
        // Change phrase every 5 seconds
        setInterval(() => {
            // Remove active class from current phrase and add inactive
            phrases[currentIndex].classList.remove('active');
            phrases[currentIndex].classList.add('inactive');
            
            // Update index to next phrase
            currentIndex = (currentIndex + 1) % phrases.length;
            
            // Small delay before showing the new phrase
            setTimeout(() => {
                // Remove inactive class from all phrases
                phrases.forEach(phrase => {
                    phrase.classList.remove('inactive');
                });
                
                // Add active class to new current phrase
                phrases[currentIndex].classList.add('active');
            }, 500);
        }, 5000);
    }, 100);
});

```

these are main files in html app.


The `index.html` file mentioned here should become the landing page of our newly created React application.
There are two possible approaches:

1. Direct Integration: Use the existing `index.html` file as the React application's landing page by copying its code as-is. Create the necessary React entry structure and ensure that all associated assets, including stylesheets, images, fonts, and other resources, are placed in the correct locations and referenced properly.
2. React Conversion: Convert the existing `index.html` page into React components while preserving the exact design and behavior. The styling, CSS, fonts, colors, responsiveness, spacing, and overall UI should remain exactly the same. There should be no visual differences from the original implementation. We can use React and React Router for this approach.
Whichever approach is more practical and maintainable, we can proceed with that.
Additionally, while implementing this, we need to establish a proper project structure. Each page should have its own organized folder structure, including:

* Page component
* Reusable components
* Styles/CSS files
* Assets (if applicable)
For example, even if this is just the home/index page, it should follow a clean structure such as:

```text
src/
├── pages/
│   └── Home/
│       ├── Home.jsx
│       ├── Home.css
│       └── components/
│           ├── Hero.jsx
│           ├── Header.jsx
│           └── Footer.jsx
├── assets/
├── routes/
└── App.jsx

```

Similarly, when we create the Shop page in the future, it should have its own dedicated structure for pages, components, styles, and assets. This will make the project easier to maintain, navigate, and extend as more pages are added.
Let's create an implementation plan based on this approach and proceed accordingly.

create a proper plan and add this to the react app

index.html
<!DOCTYPE html>
<html lang="en" class="light">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>All-in-One Rental Management Software in Kerala | BookieBuddy</title>

  <!-- Primary Meta Tags -->
  <meta name="description"
    content="BookieBuddy’s all-in-one rental management software in Kerala helps car rental, equipment hire, and bridal rental businesses manage bookings, agreements, inventory & finances easily. Save time, reduce errors, and grow your rental business hassle-free.">
  <meta name="keywords"
    content="rental management software, rental management software in Kerala, rental booking software, rental management system">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.bookiebuddy.in/">
  <meta property="og:title" content="All-in-One Rental Management Software in Kerala | BookieBuddy">
  <meta property="og:description"
    content="BookieBuddy’s all-in-one rental management software in Kerala helps car rental, equipment hire, and bridal rental businesses manage bookings, agreements, inventory & finances easily. Save time, reduce errors, and grow your rental business hassle-free.">
  <meta property="og:image" content="https://i.postimg.cc/wvh88twP/Group-12.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="627">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="All-in-One Rental Management Software in Kerala | BookieBuddy">
  <meta name="twitter:description"
    content="BookieBuddy’s all-in-one rental management software in Kerala helps car rental, equipment hire, and bridal rental businesses manage bookings, agreements, inventory & finances easily. Save time, reduce errors, and grow your rental business hassle-free.">
  <meta name="twitter:image" content="https://i.postimg.cc/wvh88twP/Group-12.png">

  <!-- Favicons -->
  <link rel="icon" href="favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://www.bookiebuddy.in" />

  <!-- CSS -->
  <link href="style.css" rel="stylesheet">

  <!-- Meta Pixel Code -->
  <script>
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1813323196208918');
    fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=1813323196208918&ev=PageView&noscript=1" /></noscript>
  <!-- End Meta Pixel Code -->


</head>

<body class="bg-white dark:bg-black">
  <!-- ======= Header Start ======= -->
  <header
    class="navbar absolute top-0 left-0 z-50 w-full border-stroke bg-white duration-300 dark:border-stroke-dark dark:bg-black">
    <div class="container relative max-w-[1400px]">
      <div class="flex items-center justify-between mt-3">
        <div class="block py-4 lg:py-0">
          <!-- <a href="index.html" class="block max-w-[200px] sm:max-w-[60px]"> -->
          <a href="index.html" class="block max-w-[80px] sm:max-w-[60px]">
            <img src="images/logo.svg" alt="logo" class="block dark:hidden" />
            <!-- <img src="images/logo2.png" alt="logo" class="block dark:hidden" /> -->
          </a>
        </div>
        <button
          class="navbarOpen absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center space-y-[6px] font-bold lg:hidden"
          aria-label="navbarOpen" name="navbarOpen">
          <span class="block h-[2px] w-7 bg-black dark:bg-white"></span>
          <span class="block h-[2px] w-7 bg-black dark:bg-white"></span>
          <span class="block h-[2px] w-7 bg-black dark:bg-white"></span>
        </button>

        <div class="menu-wrapper relative hidden justify-between lg:flex">
          <button
            class="navbarClose fixed top-10 right-10 z-[9999] flex h-10 w-10 flex-col items-center justify-center font-bold lg:hidden"
            name="navbarClose" aria-label="navbarClose">
            <span class="block h-[2px] w-7 rotate-45 bg-black dark:bg-white"></span>
            <span class="-mt-[2px] block h-[2px] w-7 -rotate-45 bg-black dark:bg-white"></span>
          </button>

          <nav
            class="fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-white text-center dark:bg-black dark:bg-opacity-95 lg:static lg:h-auto lg:w-max lg:bg-transparent">
            <ul class="items-center space-y-3 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-10">
              <li class="menu-item">
                <a href="#features"
                  class="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7">
                  Features
                </a>
              </li>

              <li class="menu-item">
                <a href="#work-process"
                  class="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7">
                  How it works
                </a>
              </li>
              <li class="relative">
                <a href="#pricing"
                  class="menu-scroll flex whitespace-nowrap items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7 relative">
                  Price plan
                  <div class="absolute top-09 left-10 l-1 w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 20" class="w-[35px] h-[15px]">
                      <defs>
                        <linearGradient id="offerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style="stop-color:#b443ff;stop-opacity:1" />
                          <stop offset="100%" style="stop-color:#ff5353;stop-opacity:1" />
                        </linearGradient>
                      </defs>
                      <rect x="0" y="0" width="50" height="18" rx="5" fill="url(#offerGradient)" />
                      <text x="25" y="13" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">
                        Offer
                      </text>
                    </svg>
                  </div>
                </a>
              </li>
              <li class="menu-item">
                <a href="#support"
                  class="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7">
                  Need a demo?
                </a>
              </li>
              <li class="menu-item">
                <a href="#faq"
                  class="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7">
                  FAQs
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div class="mr-[60px] flex items-center justify-end lg:mr-0">
          <label for="themeSwitcher" class="inline-flex cursor-pointer items-center" aria-label="themeSwitcher"
            name="themeSwitcher">
            <input type="checkbox" name="themeSwitcher" id="themeSwitcher" class="sr-only" />
            <span class="hidden dark:block">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_420_119)">
                  <path
                    d="M8.40276 5.88205C8.40259 7.05058 8.75048 8.19267 9.40204 9.16268C10.0536 10.1327 10.9793 10.8866 12.0611 11.3284C13.143 11.7701 14.3318 11.8796 15.4761 11.6429C16.6204 11.4062 17.6683 10.8341 18.4861 9.99941V10.0834C18.4861 14.7243 14.7242 18.4862 10.0833 18.4862C5.44247 18.4862 1.68054 14.7243 1.68054 10.0834C1.68054 5.44259 5.44247 1.68066 10.0833 1.68066H10.1673C9.60775 2.22779 9.16333 2.88139 8.86028 3.60295C8.55722 4.32451 8.40166 5.09943 8.40276 5.88205V5.88205ZM3.3611 10.0834C3.36049 11.5833 3.86151 13.0403 4.78444 14.2226C5.70737 15.4049 6.99919 16.2446 8.45437 16.608C9.90954 16.9715 11.4445 16.8379 12.8149 16.2284C14.1854 15.6189 15.3127 14.5686 16.0174 13.2446C14.7632 13.54 13.4543 13.5102 12.215 13.1578C10.9756 12.8054 9.84679 12.1422 8.93568 11.2311C8.02457 10.32 7.36136 9.19119 7.00898 7.95181C6.6566 6.71243 6.62672 5.40357 6.92219 4.1494C5.84629 4.72259 4.94652 5.57759 4.31923 6.62288C3.69194 7.66817 3.36074 8.86438 3.3611 10.0834V10.0834Z"
                    fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_420_119">
                    <rect width="20.1667" height="20.1667" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </label>
        </div>
      </div>
    </div>
  </header>
  <!-- ======= Header End ======= -->

  <!-- ======= Main Start ======= -->
  <main>
    <!-- ======= Hero Start ======= -->
    <section id="home" class="pt-[100px] pb-8">
      <div class=" container-hero lg:max-w-[1305px] md:px-10 lg:px-10 ">
        <div class="flex flex-wrap items-center">
          <div class="w-full  pt-[100px] lg:w-6/12">
            <div class="wow fadeInUp mb-12 lg:mb-0 lg:max-w-[620px]" data-wow-delay=".2s">
              <span
                class="mb-5 block text-lg font-medium leading-tight text-black dark:text-white sm:text-[22px] xl:text-[22px]">
                Struggling with double bookings, expenses?
              </span>
              <h1
                class="mb-6 hero-heading text-3xl font-bold leading-tight text-black dark:text-white sm:text-[40px] md:text-[50px] lg:text-[42px] xl:text-[50px]">
                Bookie buddy equals
                <span>
                  <span class="inline-flex items-center " style="gap: 1rem">
                    <span class="wall-background">
                      <span class="wall-text">
                        <span class="rolling-text">
                          <span class="text-gradient">Growing</span>
                          <span class="text-gradient">Automate</span>
                          <span class="text-gradient">Transform</span>
                          <span class="text-gradient">Scaling</span>
                          <span class="text-gradient">Simplify</span>
                          <span class="text-gradient">Manage</span>
                        </span>
                      </span>
                    </span>
                    business!
                  </span>
                </span>
              </h1>



              <p class=" mb-10 max-w-[475px] text-base leading-relaxed text-body">
                Built for Pre-Booking & Rentals businesses – Easy Booking, Seamless Management, Total Control!
              </p>

              <div class="flex flex-wrap items-center">
                <a href="#cta"
                  class="mr-6 mb-6 inline-flex h-[60px] items-center rounded-lg bg-black py-[14px] px-[30px] text-white hover:bg-opacity-90 dark:bg-white dark:text-black dark:hover:bg-opacity-90">
                  <span
                    class="mr-[18px] border-r border-stroke border-opacity-40 pr-[18px] leading-relaxed dark:border-[#BDBDBD]">
                    Get the app
                  </span>
                  <span>
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                      <g id="SVGRepo_iconCarrier">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M9.163 2.819C9 3.139 9 3.559 9 4.4V11H7.803c-.883 0-1.325 0-1.534.176a.75.75 0 0 0-.266.62c.017.274.322.593.931 1.232l4.198 4.401c.302.318.453.476.63.535a.749.749 0 0 0 .476 0c.177-.059.328-.217.63-.535l4.198-4.4c.61-.64.914-.96.93-1.233a.75.75 0 0 0-.265-.62C17.522 11 17.081 11 16.197 11H15V4.4c0-.84 0-1.26-.164-1.581a1.5 1.5 0 0 0-.655-.656C13.861 2 13.441 2 12.6 2h-1.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656zM5 21a1 1 0 0 0 1 1h12a1 1 0 1 0 0-2H6a1 1 0 0 0-1 1z"
                          fill="#ffff" />
                      </g>
                    </svg>
                  </span>
                </a>

                <a href="#support"
                  class="relative mb-6 inline-flex items-center justify-center px-6 py-3 text-white  rounded-lg overflow-hidden bg-transparent border-glow">
                  <span class="relative z-10 text-black">Request a Demo</span>
                </a>


                <!-- <a href="javascript:void(0)"
                  class="glightbox mb-6 inline-flex items-center py-4 text-black hover:text-primary dark:text-white dark:hover:text-primary">
                  <span
                    class="mr-[22px] flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-current">
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.5 7.06367C14.1667 7.44857 14.1667 8.41082 13.5 8.79572L1.5 15.7239C0.833334 16.1088 -3.3649e-08 15.6277 0 14.8579L6.05683e-07 1.00149C6.39332e-07 0.231693 0.833334 -0.249434 1.5 0.135466L13.5 7.06367Z"
                        fill="currentColor" />
                    </svg>
                  </span>
                  <span class="text-base font-medium">
                    <span class="block text-sm"> Watch Demo </span>
                    See how it works
                  </span>
                </a> -->
              </div>
            </div>
          </div>

          <!-- <div class="w-full  lg:w-6/12">
            <div class="video-wrapper relative z-10 w-full max-w-[600px] lg:mr-0">
              <div class="video-container animate-fadeInUp">
                <video id="testVideo" muted playsinline preload="auto" loop poster="" autoplay>
                  <source
                    src="https://video-previews.elements.envatousercontent.com/h264-video-previews/a6479c1b-bc66-4d8b-9d27-0f0f4d9be5a4/32972654.mp4"
                    type="video/mp4">
                </video>
              </div> -->

          <!-- <div class="gradient-bg max-auto absolute top-0 left-0 right-0 -z-10 aspect-square w-full rounded-full bg-gradient-2"> -->
          <!-- <div class="decoration-1 absolute top-5 right-0">
                <svg width="72" height="51" viewBox="0 0 72 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_5_3665)">
                    <path
                      d="M22.378 0.4157C22.3814 0.342879 22.3851 0.270712 22.3891 0.199219C22.3857 0.271606 22.382 0.343766 22.378 0.4157C22.0401 7.83785 25.7079 22.0514 43.163 21.2025C36.0333 21.7022 21.9045 26.7677 22.3875 43.0291C22.1659 35.9367 17.5749 21.9221 1.00683 21.8442C0.856728 21.8465 0.709534 21.8469 0.56543 21.8454C0.713499 21.8439 0.86063 21.8435 1.00683 21.8442C8.04005 21.7355 21.4537 17.3609 22.378 0.4157Z"
                      fill="#465FFF" />
                    <path
                      d="M59.3487 24.4888C59.3506 24.4451 59.3528 24.4018 59.3552 24.3589C59.3532 24.4023 59.351 24.4456 59.3487 24.4888C59.1459 28.942 61.3466 37.4702 71.8196 36.9608C67.5418 37.2606 59.0645 40.3 59.3543 50.0568C59.2213 45.8014 56.4667 37.3926 46.5259 37.3459C46.4359 37.3473 46.3475 37.3475 46.261 37.3466C46.3499 37.3457 46.4382 37.3454 46.5259 37.3459C50.7458 37.2807 58.794 34.6559 59.3487 24.4888Z"
                      fill="#19DEBB" />
                  </g>
                  <defs>
                    <clipPath id="clip0_5_3665">
                      <rect width="71.2541" height="49.8779" fill="white" transform="translate(0.56543 0.199219)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div class="decoration-2 absolute bottom-10 left-0">
                <svg width="65" height="36" viewBox="0 0 65 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M55.4149 1.83203C53.339 1.57898 51.3475 2.4214 49.2904 4.18456C45.9052 7.08611 40.0313 8.52953 34.7368 4.19769C32.4686 2.34195 30.4917 2.04856 28.8583 2.32079C27.1672 2.60264 25.7448 3.50424 24.6267 4.24961C22.8559 5.43014 20.9059 6.67067 18.66 6.9618C16.3417 7.2623 13.8664 6.54246 11.0465 4.19256C8.68539 2.22501 6.66504 1.84655 5.11312 2.08531C3.52522 2.32961 2.288 3.24185 1.57603 4.08328C1.25719 4.46008 0.69326 4.50708 0.316454 4.18824C-0.0603521 3.86941 -0.107346 3.30548 0.21149 2.92867C1.13803 1.83367 2.73868 0.642115 4.84131 0.318626C6.97991 -0.0103986 9.50274 0.579362 12.1908 2.81939C14.7333 4.93815 16.7266 5.40998 18.4302 5.18915C20.2062 4.95894 21.831 3.96513 23.6352 2.76234L24.131 3.50597L23.6352 2.76234C24.7515 2.01814 26.4572 0.908837 28.5644 0.557635C30.7295 0.196804 33.2212 0.648204 35.8687 2.81426C40.3566 6.48615 45.2562 5.28815 48.1272 2.82739C50.3886 0.889088 52.8657 -0.279434 55.6312 0.057691C58.3691 0.391448 61.1615 2.17558 64.1309 5.60179C64.4541 5.9748 64.4138 6.53924 64.0408 6.86252C63.6678 7.18579 63.1034 7.14547 62.7801 6.77246C59.9402 3.49563 57.5184 2.08846 55.4149 1.83203Z"
                    fill="#53d7ff" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M55.4149 11.2026C53.339 10.9496 51.3475 11.792 49.2904 13.5552C45.9052 16.4567 40.0312 17.9001 34.7367 13.5683C32.4686 11.7126 30.4916 11.4192 28.8583 11.6914C27.1671 11.9732 25.7447 12.8748 24.6267 13.6202C22.8559 14.8007 20.9058 16.0413 18.66 16.3324C16.3417 16.6329 13.8663 15.9131 11.0464 13.5632C8.68536 11.5956 6.66501 11.2172 5.11309 11.4559C3.52519 11.7002 2.28797 12.6125 1.576 13.4539C1.25716 13.8307 0.69323 13.8777 0.316424 13.5588C-0.0603826 13.24 -0.107377 12.6761 0.211459 12.2993C1.138 11.2043 2.73865 10.0127 4.84128 9.68923C6.97988 9.36021 9.50271 9.94997 12.1907 12.19C14.7333 14.3088 16.7266 14.7806 18.4302 14.5598C20.2061 14.3295 21.831 13.3357 23.6352 12.1329L24.1309 12.8766L23.6352 12.1329C24.7515 11.3887 26.4572 10.2794 28.5644 9.92824C30.7294 9.56741 33.2212 10.0188 35.8686 12.1849C40.3565 15.8568 45.2562 14.6588 48.1271 12.198C50.3885 10.2597 52.8657 9.09117 55.6312 9.4283C58.3691 9.76205 61.1614 11.5462 64.1308 14.9724C64.4541 15.3454 64.4138 15.9098 64.0408 16.2331C63.6678 16.5564 63.1033 16.5161 62.7801 16.1431C59.9401 12.8662 57.5184 11.4591 55.4149 11.2026Z"
                    fill="#53d7ff" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M55.4149 20.5825C53.339 20.3295 51.3475 21.1719 49.2904 22.935C45.9052 25.8366 40.0312 27.28 34.7367 22.9482C32.4686 21.0924 30.4916 20.7991 28.8583 21.0713C27.1671 21.3531 25.7447 22.2547 24.6267 23.0001C22.8559 24.1806 20.9058 25.4212 18.66 25.7123C16.3417 26.0128 13.8663 25.293 11.0464 22.9431C8.68536 20.9755 6.66501 20.597 5.11309 20.8358C3.52519 21.0801 2.28797 21.9923 1.576 22.8338C1.25716 23.2106 0.69323 23.2576 0.316424 22.9387C-0.0603826 22.6199 -0.107377 22.056 0.211459 21.6792C1.138 20.5842 2.73865 19.3926 4.84128 19.0691C6.97988 18.7401 9.50271 19.3299 12.1907 21.5699C14.7333 23.6886 16.7266 24.1605 18.4302 23.9396C20.2061 23.7094 21.831 22.7156 23.6352 21.5128L24.1309 22.2565L23.6352 21.5128C24.7515 20.7686 26.4572 19.6593 28.5644 19.3081C30.7294 18.9473 33.2212 19.3987 35.8686 21.5647C40.3565 25.2366 45.2562 24.0386 48.1271 21.5779C50.3885 19.6396 52.8657 18.4711 55.6312 18.8082C58.3691 19.1419 61.1614 20.9261 64.1308 24.3523C64.4541 24.7253 64.4138 25.2897 64.0408 25.613C63.6678 25.9363 63.1033 25.896 62.7801 25.523C59.9401 22.2461 57.5184 20.8389 55.4149 20.5825Z"
                    fill="#53d7ff" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M55.4149 29.9619C53.339 29.7089 51.3475 30.5513 49.2904 32.3144C45.9052 35.216 40.0312 36.6594 34.7367 32.3276C32.4686 30.4718 30.4916 30.1784 28.8583 30.4507C27.1671 30.7325 25.7447 31.6341 24.6267 32.3795C22.8559 33.56 20.9058 34.8006 18.66 35.0917C16.3417 35.3922 13.8663 34.6723 11.0464 32.3224C8.68536 30.3549 6.66501 29.9764 5.11309 30.2152C3.52519 30.4595 2.28797 31.3717 1.576 32.2132C1.25716 32.59 0.69323 32.637 0.316424 32.3181C-0.0603826 31.9993 -0.107377 31.4354 0.211459 31.0586C1.138 29.9635 2.73865 28.772 4.84128 28.4485C6.97988 28.1195 9.50271 28.7092 12.1907 30.9493C14.7333 33.068 16.7266 33.5399 18.4302 33.319C20.2061 33.0888 21.831 32.095 23.6352 30.8922L24.1309 31.6359L23.6352 30.8922C24.7515 30.148 26.4572 29.0387 28.5644 28.6875C30.7294 28.3267 33.2212 28.7781 35.8686 30.9441C40.3565 34.616 45.2562 33.418 48.1271 30.9573C50.3885 29.019 52.8657 27.8504 55.6312 28.1876C58.3691 28.5213 61.1614 30.3055 64.1308 33.7317C64.4541 34.1047 64.4138 34.6691 64.0408 34.9924C63.6678 35.3157 63.1033 35.2754 62.7801 34.9023C59.9401 31.6255 57.5184 30.2183 55.4149 29.9619Z"
                    fill="#53d7ff" />
                </svg>
              </div> -->

          <div class="w-full px-4 lg:w-5/12">
            <div class="mobile-wrapper relative z-10 mx-auto w-full max-w-[530px] pt-8 lg:mr-0">
              <div class="mobile-container">
                <img src="images/Mobiles3.png" alt="hero image" class="mx-auto max-w-full relative z-20" />
              </div>
              <div
                class="gradient-bg max-auto absolute top-0 left-0 right-0 -z-10 aspect-square w-full rounded-full bg-gradient-3">
                <div class="decoration-1 absolute top-5 right-0">
                  <svg width="72" height="51" viewBox="0 0 72 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_5_3665)">
                      <path
                        d="M22.378 0.4157C22.3814 0.342879 22.3851 0.270712 22.3891 0.199219C22.3857 0.271606 22.382 0.343766 22.378 0.4157C22.0401 7.83785 25.7079 22.0514 43.163 21.2025C36.0333 21.7022 21.9045 26.7677 22.3875 43.0291C22.1659 35.9367 17.5749 21.9221 1.00683 21.8442C0.856728 21.8465 0.709534 21.8469 0.56543 21.8454C0.713499 21.8439 0.86063 21.8435 1.00683 21.8442C8.04005 21.7355 21.4537 17.3609 22.378 0.4157Z"
                        fill="#794f8f" />
                      <path
                        d="M59.3487 24.4888C59.3506 24.4451 59.3528 24.4018 59.3552 24.3589C59.3532 24.4023 59.351 24.4456 59.3487 24.4888C59.1459 28.942 61.3466 37.4702 71.8196 36.9608C67.5418 37.2606 59.0645 40.3 59.3543 50.0568C59.2213 45.8014 56.4667 37.3926 46.5259 37.3459C46.4359 37.3473 46.3475 37.3475 46.261 37.3466C46.3499 37.3457 46.4382 37.3454 46.5259 37.3459C50.7458 37.2807 58.794 34.6559 59.3487 24.4888Z"
                        fill="#19DEBB" />
                    </g>
                    <defs>
                      <clipPath id="clip0_5_3665">
                        <rect width="71.2541" height="49.8779" fill="white" transform="translate(0.56543 0.199219)" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="decoration-2 absolute bottom-10 left-0">
                  <svg width="65" height="36" viewBox="0 0 65 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M55.4149 1.83203C53.339 1.57898 51.3475 2.4214 49.2904 4.18456C45.9052 7.08611 40.0313 8.52953 34.7368 4.19769C32.4686 2.34195 30.4917 2.04856 28.8583 2.32079C27.1672 2.60264 25.7448 3.50424 24.6267 4.24961C22.8559 5.43014 20.9059 6.67067 18.66 6.9618C16.3417 7.2623 13.8664 6.54246 11.0465 4.19256C8.68539 2.22501 6.66504 1.84655 5.11312 2.08531C3.52522 2.32961 2.288 3.24185 1.57603 4.08328C1.25719 4.46008 0.69326 4.50708 0.316454 4.18824C-0.0603521 3.86941 -0.107346 3.30548 0.21149 2.92867C1.13803 1.83367 2.73868 0.642115 4.84131 0.318626C6.97991 -0.0103986 9.50274 0.579362 12.1908 2.81939C14.7333 4.93815 16.7266 5.40998 18.4302 5.18915C20.2062 4.95894 21.831 3.96513 23.6352 2.76234L24.131 3.50597L23.6352 2.76234C24.7515 2.01814 26.4572 0.908837 28.5644 0.557635C30.7295 0.196804 33.2212 0.648204 35.8687 2.81426C40.3566 6.48615 45.2562 5.28815 48.1272 2.82739C50.3886 0.889088 52.8657 -0.279434 55.6312 0.057691C58.3691 0.391448 61.1615 2.17558 64.1309 5.60179C64.4541 5.9748 64.4138 6.53924 64.0408 6.86252C63.6678 7.18579 63.1034 7.14547 62.7801 6.77246C59.9402 3.49563 57.5184 2.08846 55.4149 1.83203Z"
                      fill="#F76D8D" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M55.4149 11.2026C53.339 10.9496 51.3475 11.792 49.2904 13.5552C45.9052 16.4567 40.0312 17.9001 34.7367 13.5683C32.4686 11.7126 30.4916 11.4192 28.8583 11.6914C27.1671 11.9732 25.7447 12.8748 24.6267 13.6202C22.8559 14.8007 20.9058 16.0413 18.66 16.3324C16.3417 16.6329 13.8663 15.9131 11.0464 13.5632C8.68536 11.5956 6.66501 11.2172 5.11309 11.4559C3.52519 11.7002 2.28797 12.6125 1.576 13.4539C1.25716 13.8307 0.69323 13.8777 0.316424 13.5588C-0.0603826 13.24 -0.107377 12.6761 0.211459 12.2993C1.138 11.2043 2.73865 10.0127 4.84128 9.68923C6.97988 9.36021 9.50271 9.94997 12.1907 12.19C14.7333 14.3088 16.7266 14.7806 18.4302 14.5598C20.2061 14.3295 21.831 13.3357 23.6352 12.1329L24.1309 12.8766L23.6352 12.1329C24.7515 11.3887 26.4572 10.2794 28.5644 9.92824C30.7294 9.56741 33.2212 10.0188 35.8686 12.1849C40.3565 15.8568 45.2562 14.6588 48.1271 12.198C50.3885 10.2597 52.8657 9.09117 55.6312 9.4283C58.3691 9.76205 61.1614 11.5462 64.1308 14.9724C64.4541 15.3454 64.4138 15.9098 64.0408 16.2331C63.6678 16.5564 63.1033 16.5161 62.7801 16.1431C59.9401 12.8662 57.5184 11.4591 55.4149 11.2026Z"
                      fill="#F76D8D" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M55.4149 20.5825C53.339 20.3295 51.3475 21.1719 49.2904 22.935C45.9052 25.8366 40.0312 27.28 34.7367 22.9482C32.4686 21.0924 30.4916 20.7991 28.8583 21.0713C27.1671 21.3531 25.7447 22.2547 24.6267 23.0001C22.8559 24.1806 20.9058 25.4212 18.66 25.7123C16.3417 26.0128 13.8663 25.293 11.0464 22.9431C8.68536 20.9755 6.66501 20.597 5.11309 20.8358C3.52519 21.0801 2.28797 21.9923 1.576 22.8338C1.25716 23.2106 0.69323 23.2576 0.316424 22.9387C-0.0603826 22.6199 -0.107377 22.056 0.211459 21.6792C1.138 20.5842 2.73865 19.3926 4.84128 19.0691C6.97988 18.7401 9.50271 19.3299 12.1907 21.5699C14.7333 23.6886 16.7266 24.1605 18.4302 23.9396C20.2061 23.7094 21.831 22.7156 23.6352 21.5128L24.1309 22.2565L23.6352 21.5128C24.7515 20.7686 26.4572 19.6593 28.5644 19.3081C30.7294 18.9473 33.2212 19.3987 35.8686 21.5647C40.3565 25.2366 45.2562 24.0386 48.1271 21.5779C50.3885 19.6396 52.8657 18.4711 55.6312 18.8082C58.3691 19.1419 61.1614 20.9261 64.1308 24.3523C64.4541 24.7253 64.4138 25.2897 64.0408 25.613C63.6678 25.9363 63.1033 25.896 62.7801 25.523C59.9401 22.2461 57.5184 20.8389 55.4149 20.5825Z"
                      fill="#F76D8D" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M55.4149 29.9619C53.339 29.7089 51.3475 30.5513 49.2904 32.3144C45.9052 35.216 40.0312 36.6594 34.7367 32.3276C32.4686 30.4718 30.4916 30.1784 28.8583 30.4507C27.1671 30.7325 25.7447 31.6341 24.6267 32.3795C22.8559 33.56 20.9058 34.8006 18.66 35.0917C16.3417 35.3922 13.8663 34.6723 11.0464 32.3224C8.68536 30.3549 6.66501 29.9764 5.11309 30.2152C3.52519 30.4595 2.28797 31.3717 1.576 32.2132C1.25716 32.59 0.69323 32.637 0.316424 32.3181C-0.0603826 31.9993 -0.107377 31.4354 0.211459 31.0586C1.138 29.9635 2.73865 28.772 4.84128 28.4485C6.97988 28.1195 9.50271 28.7092 12.1907 30.9493C14.7333 33.068 16.7266 33.5399 18.4302 33.319C20.2061 33.0888 21.831 32.095 23.6352 30.8922L24.1309 31.6359L23.6352 30.8922C24.7515 30.148 26.4572 29.0387 28.5644 28.6875C30.7294 28.3267 33.2212 28.7781 35.8686 30.9441C40.3565 34.616 45.2562 33.418 48.1271 30.9573C50.3885 29.019 52.8657 27.8504 55.6312 28.1876C58.3691 28.5213 61.1614 30.3055 64.1308 33.7317C64.4541 34.1047 64.4138 34.6691 64.0408 34.9924C63.6678 35.3157 63.1033 35.2754 62.7801 34.9023C59.9401 31.6255 57.5184 30.2183 55.4149 29.9619Z"
                      fill="#F76D8D" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    </section>
    <!-- ======= Hero End ======= -->

    <div class=" pb-10 pt-10">
      <div class="scroll-indicator" onclick="scrollDown()">
        <span class="scroll-text">Check! Is This Software for You?</span>
        <div class="arrow-container">
          <div class="arrow"></div>
          <div class="arrow"></div>
        </div>
      </div>
    </div>

    <!-- start: Roll Area -->
    <section class="">
      <div class="container lg:max-w-[1305px] lg:px-">
        <div class="wow fadeInUp ml-1 max-w-[690px] text-left sm:txex lg:mb-[50px] lg:text-lg data-wow-delay=" .2s">
          <h2 class="font-bold text-black heading1">
            Our software used by
            <span class=" inline bg-gradient-2 bg-clip-text text-transparent">
              500+ <br>
            </span>
            business owners in
            <span class="inline bg-gradient-1 bg-clip-text text-transparent">
              10+ industries
            </span>
          </h2>
        </div>

      </div>

      <div class=" roll-wrapper">
        <div class="roll-track">

          <!-- Original Cards -->
          <div class="roll-card">
            <img
              src="https://godwincharli.com/cdn/shop/articles/5_4a30a0f2-639f-4e28-8d79-e3de43bd747b.jpg?v=1694064774"
              alt="Groom Rentals" />
            <div class="card-overlay">
              <h3 class="card-title">Groom Rentals</h3>
            </div>
          </div>

          <div class="roll-card">
            <img
              src="https://girlandworld.com/wp-content/uploads/2018/03/indian-bridal-pakistani-bride-hair-and-makeup-artist-vancouver-mindy-bansal-beauty-influencer-destination-weddings-girlfriendz-studio1.jpg?w=1920&h=1080&crop=1"
              alt="Bridal Dresses" />
            <div class="card-overlay">
              <h3 class="card-title">Bridal Rentals</h3>
            </div>
          </div>

          <div class="roll-card">
            <img src="https://rentbuyit.com.au/wp-content/uploads/2024/01/cars-in-a-sunset-1.jpg" alt="Car Rentals" />
            <div class="card-overlay">
              <h3 class="card-title">Car Rentals</h3>
            </div>
          </div>

          <div class="roll-card">
            <img
              src="https://www.livemint.com/lm-img/img/2024/10/20/1600x900/INDIA-GOLD-1_1645091171106_1729442514104.JPG"
              alt="Jewelry Rentals" />
            <div class="card-overlay">
              <h3 class="card-title">Jewelry Rentals</h3>
            </div>
          </div>

          <div class="roll-card">
            <img src="https://bigbikerentalbangkok.com/wp-content/uploads/2024/04/Home-about-us.jpg"
              alt="Bike Rentals" />
            <div class="card-overlay">
              <h3 class="card-title">Bike Rentals</h3>
            </div>
          </div>

          <div class="roll-card">
            <img src="https://assets-news.housing.com/news/wp-content/uploads/2022/10/19004255/construction-tools-feature-compressed-686x400.jpg"
              alt="Construction Equipment" />
            <div class="card-overlay">
              <h3 class="card-title">Construction tools</h3>
            </div>
          </div>

          <div class="roll-card">
            <img
              src="https://techresearchonline.com/wp-content/uploads/2022/06/Innovative-and-Futuristic-Tech-gadgets-that-will-make-you-Speech-less_blog-banner-1.webp"
              alt="Gadget Rentals" />
            <div class="card-overlay">
              <h3 class="card-title">Gadget Rentals</h3>

            </div>
          </div>

          <div class="roll-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX2lEk0A3xDYtfSMfcR-HZDh5NhQP8lq4lOQ&s"
              alt="Cycle Rentals" />
            <div class="card-overlay">
              <h3 class="card-title">Cycle Rentals</h3>
            </div>
          </div>

          <div class="roll-card">
            <img
              src="https://indriyaresorts.com/images/resorts/indriya-beach-resort/indriya-beach-resorts-strip-02-zoom.jpg"
              alt="Resorts" />
            <div class="card-overlay">
              <h3 class="card-title">Resorts</h3>
            </div>
          </div>

          <div class="roll-card">
            <img src="https://legacybox.com/cdn/shop/articles/photo-1543785832-0781599790c2.jpg?v=1613403332&width=1399"
              alt="Camera Rentals" />
            <div class="card-overlay">
              <h3 class="card-title">Camera Rentals</h3>
            </div>
          </div>

          <!-- Cloned Cards for Seamless Loop -->
          <div class="roll-card">
            <img
              src="https://godwincharli.com/cdn/shop/articles/5_4a30a0f2-639f-4e28-8d79-e3de43bd747b.jpg?v=1694064774"
              alt="Groom Rentals" />
            <div class="card-overlay">
              <h3 class="card-title">Groom Rentals</h3>

            </div>
          </div>

          <div class="roll-card">
            <img
              src="https://girlandworld.com/wp-content/uploads/2018/03/indian-bridal-pakistani-bride-hair-and-makeup-artist-vancouver-mindy-bansal-beauty-influencer-destination-weddings-girlfriendz-studio1.jpg?w=1920&h=1080&crop=1"
              alt="Bridal Dresses" />
            <div class="card-overlay">
              <h3 class="card-title">Bridal Rentals</h3>

            </div>
          </div>

          <div class="roll-card">
            <img src="https://rentbuyit.com.au/wp-content/uploads/2024/01/cars-in-a-sunset-1.jpg" alt="Car Rentals" />
            <div class="card-overlay">
              <h3 class="card-title">Car Rentals</h3>

            </div>
          </div>

          <div class="roll-card">
            <img
              src="https://www.livemint.com/lm-img/img/2024/10/20/1600x900/INDIA-GOLD-1_1645091171106_1729442514104.JPG"
              alt="Jewelry Rentals" />
            <div class="card-overlay">
              <h3 class="card-title">Jewelry Rentals</h3>

            </div>
          </div>

          <div class="roll-card">
            <img src="https://bigbikerentalbangkok.com/wp-content/uploads/2024/04/Home-about-us.jpg"
              alt="Bike Rentals" />
            <div class="card-overlay">
              <h3 class="card-title">Bike Rentals</h3>
            </div>
          </div>

          <div class="roll-card">
            <img src="https://dailycivil.com/wp-content/uploads/2020/12/construction-tools-lists-2.jpg"
              alt="Construction Equipment" />
            <div class="card-overlay">
              <h3 class="card-title">Construction tools</h3>
            </div>
          </div>

          <div class="roll-card">
            <img
              src="https://techresearchonline.com/wp-content/uploads/2022/06/Innovative-and-Futuristic-Tech-gadgets-that-will-make-you-Speech-less_blog-banner-1.webp"
              alt="Gadget Rentals" />
            <div class="card-overlay">
              <h3 class="card-title">Gadget Rentals</h3>
            </div>
          </div>

          <div class="roll-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX2lEk0A3xDYtfSMfcR-HZDh5NhQP8lq4lOQ&s"
              alt="Cycle Rentals" />
            <div class="card-overlay">
              <h3 class="card-title">Cycle Rentals</h3>
            </div>
          </div>

          <div class="roll-card">
            <img
              src="https://indriyaresorts.com/images/resorts/indriya-beach-resort/indriya-beach-resorts-strip-02-zoom.jpg"
              alt="Resorts" />
            <div class="card-overlay">
              <h3 class="card-title">Resorts</h3>
            </div>
          </div>

          <div class="roll-card">
            <img src="https://legacybox.com/cdn/shop/articles/photo-1543785832-0781599790c2.jpg?v=1613403332&width=1399"
              alt="Camera Rentals" />
            <div class="card-overlay">
              <h3 class="card-title">Camera Rentals</h3>
            </div>
          </div>
        </div>
      </div>


      <div class="rounded-2xl bg-white shadow-card trust-card-wrapper">

        <div class="-mx-4 flex flex-wrap trust-card">

          <div class="wow fadeInUp group mx-5  max-w-[310px] text-center">
            <div
              class="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 ">
              <iframe src="https://lottie.host/embed/c6810099-fdb9-4808-8560-ab4a0866a335/vikVDm0gB1.lottie"></iframe>
            </div>
            <h3 class="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
              10x
            </h3>
            <h4 class="">
              Boosted Revenue
            </h4>
          </div>

          <div class="wow fadeInUp group mx-5  max-w-[310px] text-center">
            <div
              class="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 ">
              <iframe src="https://lottie.host/embed/f0d768cd-2e14-46a4-8c9f-10e85a1cd87f/9v5YleVu2P.lottie"></iframe>
            </div>
            <h3 class="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
              30x
            </h3>
            <h4 class="">
              Time Saved
            </h4>
          </div>


          <div class="wow fadeInUp group mx-5 max-w-[310px] text-center">
            <div
              class="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 ">
              <iframe src="https://lottie.host/embed/b56f0741-6471-408f-a8d0-d2d9d49f94b3/jtpX6iyfGo.lottie"></iframe>
            </div>
            <h3 class="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
              50%
            </h3>
            <h4 class="">
              Reduce human efforts
            </h4>
          </div>

        </div>


        

        <div class="flex justify-center mt-20">
          <a href="#support" class="demo-button-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" fill="white" height="18" viewBox="0 0 448 512">
              <path
                d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
            Get a demo
          </a>
        </div>



      </div>





    </section>
    <!-- end: Roll Area -->

    <!-- ======= Features Start ======= -->
    <section id="features" class="relative z-10 pt-[110px]">
      <div class="container">
        <div class="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]" data-wow-delay=".2s">
          <h2 class="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            Core Features – Power Up Your Business in Minutes!
          </h2>
          <p class="text-base text-body">
            Unlock the full potential of your business with our cutting-edge features.
            Seamlessly manage operations, enhance customer experience, and drive growth effortlessly.
          </p>
        </div>
      </div>

      <div class="container max-w-[1390px]">
        <div
          class="rounded-2xl bg-white px-5 pt-14 pb-14 shadow-card dark:bg-dark dark:shadow-card-dark md:pb-1 lg:pt-20 lg:pb-5 xl:px-10">
          <div class="-mx-4 flex flex-wrap">
            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div class="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center" data-wow-delay=".2s">
                <div
                  class="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300">
                  <!-- <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_211_934)">
                      <rect x="6" y="10" width="32" height="28" rx="3" stroke="currentColor" stroke-width="2" />
                      <line x1="6" y1="16" x2="38" y2="16" stroke="currentColor" stroke-width="2" />
                      <rect x="12" y="20" width="4" height="4" fill="currentColor" />
                      <rect x="20" y="20" width="4" height="4" fill="currentColor" />
                      <rect x="28" y="20" width="4" height="4" fill="currentColor" />
                      <rect x="12" y="28" width="4" height="4" fill="currentColor" />
                      <rect x="20" y="28" width="4" height="4" fill="currentColor" />
                      <rect x="28" y="28" width="4" height="4" fill="currentColor" />
                      <rect x="14" y="4" width="4" height="6" fill="currentColor" />
                      <rect x="26" y="4" width="4" height="6" fill="currentColor" />
                    </g>
                    <defs>
                      <clipPath id="clip0_211_934">
                        <rect width="44" height="44" fill="white" />
                      </clipPath>
                    </defs>
                  </svg> -->

                  <img src="images/bookings icon.png" alt="Upcoming Bookings" class="w-[90px] h-[90px] object-contain">


                </div>
                <h3 class="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                  Upcoming Bookings

                </h3>
                <p class="text-base text-body">
                  View, manage, and reschedule with ease, stay organized!
                  No more missed opportunities or last-minute rushes!
                </p>
              </div>
            </div>

            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div class="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center" data-wow-delay=".3s">
                <div
                  class="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300">
                  <!-- <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                      <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="currentColor" stroke-width="1.5"
                        stroke-linecap="round"></path>
                      <path
                        d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg> -->

                  <img src="images/phone in hand.png" alt="Take booking" class="w-[90px] h-[90px] object-contain">

                </div>
                <h3 class="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                  Take Bookings in 4 Taps!
                </h3>
                <p class="text-base text-body">
                  Faster than a coffee break! <br>
                  Select products → Pick a date → Add customer → Confirm & done
                </p>
              </div>
            </div>


            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div class="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center" data-wow-delay=".4s">
                <div
                  class="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300">
                  <!-- <svg width=" 44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(8, 6) scale(1.2)">
                      <path
                        d="M17.625 21.0002C18.2666 20.4299 19.2334 20.4299 19.875 21.0002C20.3109 21.3876 21 21.0782 21 20.495V3.50519C21 2.92196 20.3109 2.61251 19.875 2.99999C19.2334 3.57029 18.2666 3.57029 17.625 2.99999C16.9834 2.42969 16.0166 2.42969 15.375 2.99999C14.7334 3.57029 13.7666 3.57029 13.125 2.99999C12.4834 2.42969 11.5166 2.42969 10.875 2.99999C10.2334 3.57029 9.26659 3.57029 8.625 2.99999C7.98341 2.42969 7.01659 2.42969 6.375 2.99999C5.73341 3.57029 4.76659 3.57029 4.125 2.99999C3.68909 2.61251 3 2.92196 3 3.50519V20.495C3 21.0782 3.68909 21.3876 4.125 21.0002C4.76659 20.4299 5.73341 20.4299 6.375 21.0002C7.01659 21.5705 7.98341 21.5705 8.625 21.0002C9.26659 20.4299 10.2334 20.4299 10.875 21.0002C11.5166 21.5705 12.4834 21.5705 13.125 21.0002C13.7666 20.4299 14.7334 20.4299 15.375 21.0002C16.0166 21.5705 16.9834 21.5705 17.625 21.0002Z"
                        stroke="currentColor" stroke-width="1.5"></path>
                      <path d="M7.5 15.5H16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                      <path d="M7.5 12H16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                      </path>
                      <path d="M7.5 8.5H16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                      </path>
                    </g>
                  </svg> -->

                  <img src="images/invoice icon.png" alt="invoice" class="w-[90px] h-[90px] object-contain">

                </div>
                <h3 class="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                  Smart Invoicing
                </h3>
                <p class="text-base text-body">
                  Professional invoice generation <br>
                  Share via whatsapp & other media
                </p>
              </div>
            </div>



            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div class="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center" data-wow-delay=".2s">
                <div
                  class="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300">
                  <!-- <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                      <path d="M6 10H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path
                        d="M20.8333 11H18.2308C16.4465 11 15 12.3431 15 14C15 15.6569 16.4465 17 18.2308 17H20.8333C20.9167 17 20.9583 17 20.9935 16.9979C21.5328 16.965 21.9623 16.5662 21.9977 16.0654C22 16.0327 22 15.994 22 15.9167V12.0833C22 12.006 22 11.9673 21.9977 11.9346C21.9623 11.4338 21.5328 11.035 20.9935 11.0021C20.9583 11 20.9167 11 20.8333 11Z"
                        stroke="currentColor" stroke-width="1.5" />
                      <path
                        d="M20.965 11C20.8873 9.1277 20.6366 7.97975 19.8284 7.17157C18.6569 6 16.7712 6 13 6H10C6.22876 6 4.34315 6 3.17157 7.17157C2 8.34315 2 10.2288 2 14C2 17.7712 2 19.6569 3.17157 20.8284C4.34315 22 6.22876 22 10 22H13C16.7712 22 18.6569 22 19.8284 20.8284C20.6366 20.0203 20.8873 18.8723 20.965 17"
                        stroke="currentColor" stroke-width="1.5" />
                      <path d="M6 6L9.73549 3.52313C10.7874 2.82562 12.2126 2.82562 13.2645 3.52313L17 6"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M17.9912 14H18.0002" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg> -->
                  <img src="images/ledger icon.png" alt="ledger" class="w-[90px] h-[90px] object-contain">

                </div>
                <h3 class="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                  Digital ledger
                  <p class="mt-3 text-base text-body">
                    ✔ Cash flow & pending payments <br>
                    ✔ Auto reminders & balance updates <br>
                    ✔ Lifetime earnings at a glance!
                  </p>
              </div>
            </div>

            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div class="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center" data-wow-delay=".3s">
                <div
                  class="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300">
                  <!-- <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                      <path d="M6 10H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path
                        d="M20.8333 11H18.2308C16.4465 11 15 12.3431 15 14C15 15.6569 16.4465 17 18.2308 17H20.8333C20.9167 17 20.9583 17 20.9935 16.9979C21.5328 16.965 21.9623 16.5662 21.9977 16.0654C22 16.0327 22 15.994 22 15.9167V12.0833C22 12.006 22 11.9673 21.9977 11.9346C21.9623 11.4338 21.5328 11.035 20.9935 11.0021C20.9583 11 20.9167 11 20.8333 11Z"
                        stroke="currentColor" stroke-width="1.5" />
                      <path
                        d="M20.965 11C20.8873 9.1277 20.6366 7.97975 19.8284 7.17157C18.6569 6 16.7712 6 13 6H10C6.22876 6 4.34315 6 3.17157 7.17157C2 8.34315 2 10.2288 2 14C2 17.7712 2 19.6569 3.17157 20.8284C4.34315 22 6.22876 22 10 22H13C16.7712 22 18.6569 22 19.8284 20.8284C20.6366 20.0203 20.8873 18.8723 20.965 17"
                        stroke="currentColor" stroke-width="1.5" />
                      <path d="M6 6L9.73549 3.52313C10.7874 2.82562 12.2126 2.82562 13.2645 3.52313L17 6"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M17.9912 14H18.0002" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg> -->

                  <img src="images/Stock management.png" alt="Stock management"
                    class="w-[90px] h-[90px] object-contain">

                </div>
                <h3 class="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                  Stock Manager
                </h3>
                <p class="text-base text-body">
                  Track Smart, Sell More! <br>
                  Know what sells, restock on time
                </p>
              </div>
            </div>


            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div class="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center" data-wow-delay=".4s">
                <div
                  class="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 ">
                  <!-- <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                      <path
                        d="M11.7255 17.1019C11.6265 16.8844 11.4215 16.7257 11.1734 16.6975C10.9633 16.6735 10.7576 16.6285 10.562 16.5636C10.4743 16.5341 10.392 16.5019 10.3158 16.4674L10.4424 16.1223C10.5318 16.1622 10.6239 16.1987 10.7182 16.2317L10.7221 16.2331L10.7261 16.2344C11.0287 16.3344 11.3265 16.3851 11.611 16.3851C11.8967 16.3851 12.1038 16.3468 12.2629 16.2647L12.2724 16.2598L12.2817 16.2544C12.5227 16.1161 12.661 15.8784 12.661 15.6021C12.661 15.2955 12.4956 15.041 12.2071 14.9035C12.062 14.8329 11.8559 14.7655 11.559 14.6917C11.2545 14.6147 10.9987 14.533 10.8003 14.4493C10.6553 14.3837 10.5295 14.279 10.4161 14.1293C10.3185 13.9957 10.2691 13.7948 10.2691 13.5319C10.2691 13.2147 10.3584 12.9529 10.5422 12.7315C10.7058 12.5375 10.9381 12.4057 11.2499 12.3318C11.4812 12.277 11.6616 12.1119 11.7427 11.8987C11.8344 12.1148 12.0295 12.2755 12.2723 12.3142C12.4751 12.3465 12.6613 12.398 12.8287 12.4677L12.7122 12.8059C12.3961 12.679 12.085 12.6149 11.7841 12.6149C10.7848 12.6149 10.7342 13.3043 10.7342 13.4425C10.7342 13.7421 10.896 13.9933 11.1781 14.1318L11.186 14.1357L11.194 14.1393C11.3365 14.2029 11.5387 14.2642 11.8305 14.3322C12.1322 14.4004 12.3838 14.4785 12.5815 14.5651L12.5856 14.5669L12.5897 14.5686C12.7365 14.6297 12.8624 14.7317 12.9746 14.8805L12.9764 14.8828L12.9782 14.8852C13.0763 15.012 13.1261 15.2081 13.1261 15.4681C13.1261 15.7682 13.0392 16.0222 12.8604 16.2447C12.7053 16.4377 12.4888 16.5713 12.1983 16.6531C11.974 16.7163 11.8 16.8878 11.7255 17.1019Z"
                        fill="currentColor"></path>
                      <path
                        d="M11.9785 18H11.497C11.3893 18 11.302 17.9105 11.302 17.8V17.3985C11.302 17.2929 11.2219 17.2061 11.1195 17.1944C10.8757 17.1667 10.6399 17.115 10.412 17.0394C10.1906 16.9648 9.99879 16.8764 9.83657 16.7739C9.76202 16.7268 9.7349 16.6312 9.76572 16.5472L10.096 15.6466C10.1405 15.5254 10.284 15.479 10.3945 15.5417C10.5437 15.6262 10.7041 15.6985 10.8755 15.7585C11.131 15.8429 11.3762 15.8851 11.611 15.8851C11.8129 15.8851 11.9572 15.8628 12.0437 15.8181C12.1302 15.7684 12.1735 15.6964 12.1735 15.6021C12.1735 15.4929 12.1158 15.411 12.0004 15.3564C11.8892 15.3018 11.7037 15.2422 11.4442 15.1777C11.1104 15.0933 10.8323 15.0039 10.6098 14.9096C10.3873 14.8103 10.1936 14.6514 10.0288 14.433C9.86396 14.2096 9.78156 13.9092 9.78156 13.5319C9.78156 13.095 9.91136 12.7202 10.1709 12.4074C10.4049 12.13 10.7279 11.9424 11.1401 11.8447C11.2329 11.8227 11.302 11.7401 11.302 11.6425V11.2C11.302 11.0895 11.3893 11 11.497 11H11.9785C12.0862 11 12.1735 11.0895 12.1735 11.2V11.6172C12.1735 11.7194 12.2487 11.8045 12.3471 11.8202C12.7082 11.8777 13.0255 11.9866 13.2989 12.1469C13.3765 12.1924 13.4073 12.2892 13.3775 12.3756L13.0684 13.2725C13.0275 13.3914 12.891 13.4417 12.7812 13.3849C12.433 13.2049 12.1007 13.1149 11.7841 13.1149C11.4091 13.1149 11.2216 13.2241 11.2216 13.4425C11.2216 13.5468 11.2773 13.6262 11.3885 13.6809C11.4998 13.7305 11.6831 13.7851 11.9386 13.8447C12.2682 13.9192 12.5464 14.006 12.773 14.1053C12.9996 14.1996 13.1953 14.356 13.3602 14.5745C13.5291 14.7929 13.6136 15.0908 13.6136 15.4681C13.6136 15.8851 13.4879 16.25 13.2365 16.5628C13.0176 16.8354 12.7145 17.0262 12.3274 17.1353C12.2384 17.1604 12.1735 17.2412 12.1735 17.3358V17.8C12.1735 17.9105 12.0862 18 11.9785 18Z"
                        fill="currentColor"></path>
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M9.59235 5H13.8141C14.8954 5 14.3016 6.664 13.8638 7.679L13.3656 8.843L13.2983 9C13.7702 8.97651 14.2369 9.11054 14.6282 9.382C16.0921 10.7558 17.2802 12.4098 18.1256 14.251C18.455 14.9318 18.5857 15.6958 18.5019 16.451C18.4013 18.3759 16.8956 19.9098 15.0182 20H8.38823C6.51033 19.9125 5.0024 18.3802 4.89968 16.455C4.81587 15.6998 4.94656 14.9358 5.27603 14.255C6.12242 12.412 7.31216 10.7565 8.77823 9.382C9.1696 9.11054 9.63622 8.97651 10.1081 9L10.0301 8.819L9.54263 7.679C9.1068 6.664 8.5101 5 9.59235 5Z"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path
                        d="M13.2983 9.75C13.7125 9.75 14.0483 9.41421 14.0483 9C14.0483 8.58579 13.7125 8.25 13.2983 8.25V9.75ZM10.1081 8.25C9.69391 8.25 9.35812 8.58579 9.35812 9C9.35812 9.41421 9.69391 9.75 10.1081 9.75V8.25ZM15.9776 8.64988C16.3365 8.44312 16.4599 7.98455 16.2531 7.62563C16.0463 7.26671 15.5878 7.14336 15.2289 7.35012L15.9776 8.64988ZM13.3656 8.843L13.5103 9.57891L13.5125 9.57848L13.3656 8.843ZM10.0301 8.819L10.1854 8.08521L10.1786 8.08383L10.0301 8.819ZM8.166 7.34357C7.80346 7.14322 7.34715 7.27469 7.1468 7.63722C6.94644 7.99976 7.07791 8.45607 7.44045 8.65643L8.166 7.34357ZM13.2983 8.25H10.1081V9.75H13.2983V8.25ZM15.2289 7.35012C14.6019 7.71128 13.9233 7.96683 13.2187 8.10752L13.5125 9.57848C14.3778 9.40568 15.2101 9.09203 15.9776 8.64988L15.2289 7.35012ZM13.2209 8.10709C12.2175 8.30441 11.1861 8.29699 10.1854 8.08525L9.87486 9.55275C11.0732 9.80631 12.3086 9.81521 13.5103 9.57891L13.2209 8.10709ZM10.1786 8.08383C9.47587 7.94196 8.79745 7.69255 8.166 7.34357L7.44045 8.65643C8.20526 9.0791 9.02818 9.38184 9.88169 9.55417L10.1786 8.08383Z"
                        fill="currentColor"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg> -->

                  <img src="images/expense icon.png" alt="Expense" class="w-[90px] h-[90px] object-contain">
                </div>
                <h3 class="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                  Expense Tracker
                </h3>
                <p class="text-base text-body">
                  Every Rupee Counts!<br>
                  Categorize expenses, track profit/loss in real, no more spreadsheet chaos!
                </p>
              </div>
            </div>


            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div class="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center" data-wow-delay=".4s">
                <div
                  class="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 ">

                  <img src="images/reports icon.png" alt="Upcoming Bookings" class="w-[90px] h-[90px] object-contain">
                </div>
                <h3 class="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                  Real Time Reports
                </h3>
                <p class="text-base text-body">
                  Generate Excel/PDF reports to analyse your business
                </p>
              </div>
            </div>

            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div class="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center" data-wow-delay=".4s">
                <div
                  class="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 ">

                  <img src="images/availabiliy icon.png" alt="Check availability"
                    class="w-[90px] h-[90px] object-contain">
                </div>
                <h3 class="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                  AI - Check availability
                </h3>
                <p class="text-base text-body">
                  Avoid double booking with <br>
                  the help of Artificial Intelligence
                </p>
              </div>
            </div>

            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div class="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center" data-wow-delay=".4s">
                <div
                  class="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 ">

                  <img src="images/multi shop icon.png" alt="Check availability"
                    class="w-[90px] h-[90px] object-contain">
                </div>
                <h3 class="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                  Multi-Shop Management
                </h3>
                <p class="text-base text-body">
                  Effortlessly manage multiple shops <br>
                  with a single owner account
                </p>
              </div>
            </div>


          </div>
        </div>
      </div>

      <!-- Graphics -->
      <div class="absolute top-0 right-0 -z-10">
        <svg width="602" height="1154" viewBox="0 0 602 1154" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.25" filter="url(#filter0_f_26_84)">
            <circle cx="577" cy="577" r="317" fill="url(#paint0_linear_26_84)" />
          </g>
          <defs>
            <filter id="filter0_f_26_84" x="0" y="0" width="1154" height="1154" filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="130" result="effect1_foregroundBlur_26_84" />
            </filter>
            <linearGradient id="paint0_linear_26_84" x1="183.787" y1="894" x2="970.173" y2="346.491"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#8EA5FE" />
              <stop offset="0.541667" stop-color="#BEB3FD" />
              <stop offset="1" stop-color="#90D1FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="absolute left-0 -bottom-1/2 -z-10 hidden md:block">
        <svg width="622" height="1236" viewBox="0 0 622 1236" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.2" filter="url(#filter0_f_26_85)">
            <circle cx="4" cy="618" r="368" fill="url(#paint0_linear_26_85)" />
          </g>
          <defs>
            <filter id="filter0_f_26_85" x="-614" y="0" width="1236" height="1236" filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="125" result="effect1_foregroundBlur_26_85" />
            </filter>
            <linearGradient id="paint0_linear_26_85" x1="-364" y1="250" x2="506.12" y2="754.835"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#FF8FE8" />
              <stop offset="1" stop-color="#FFC960" />
            </linearGradient>
          </defs>
        </svg>
      </div>

    </section>
    <!-- ======= Features End ======= -->

    <!-- ======= About Start ======= -->
    <section id="about" class="relative pt-[150px]">
      <div class="container lg:max-w-[1120px]">
        <div>
          <div class="-mx-4 flex flex-wrap items-center justify-between">
            <div class="w-full px-4 lg:w-1/2">
              <div class="wow fadeInUp relative z-10 mx-auto mb-14 w-full max-w-[470px] pb-6 lg:mx-0 lg:mb-0"
                data-wow-delay=".2s">
                <img src="images/Group 6.png" alt="about image" class="mx-auto max-w-full" />
                <div class="absolute bottom-0 left-0 -z-10 h-1/2 w-full rounded-[20px] bg-gradient-1">
                </div>
              </div>
            </div>

            <div class="w-full px-4 lg:w-1/2">
              <div class="wow fadeInUp lg:ml-auto lg:max-w-[510px]" data-wow-delay=".3s">
                <span class="mb-4 block text-lg font-medium text-primary md:text-[22px]">
                  🔍 Track & Optimize Effortlessly
                </span>
                <h2
                  class="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
                  Stay informed with real-time insights!
                </h2>
                <p class="mb-[30px] text-base leading-relaxed text-body">
                  Managing multiple businesses? No problem! Easily switch between different ventures, track
                  individual
                  performance, and
                  maintain accurate records—all from one dashboard. Stay organized and in control without
                  the
                  hassle of
                  juggling multiple
                  systems
                </p>

                <div class="mb-[30px] flex items-center">
                  <div
                    class="mr-[22px] flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black dark:border-stroke-dark dark:bg-dark dark:text-white">
                    ❌
                  </div>
                  <div>
                    <h5 class="text-xl font-medium text-black dark:text-white">
                      No Missed Expenses
                    </h5>
                    <p class="text-base text-body">
                      Every rupee is accounted for, ensuring accurate financial tracking.
                    </p>
                  </div>
                </div>

                <div class="flex items-center">
                  <div
                    class="mr-[22px] flex h-[60px] w-[60px] items-center justify-center rounded-full border border-stroke text-xl font-semibold text-black dark:border-stroke-dark dark:bg-dark dark:text-white">
                    ❌
                  </div>
                  <div>
                    <h5 class="text-xl font-medium text-black dark:text-white">
                      Not a Complicated UI
                    </h5>
                    <p class="text-base text-body">
                      Simple, intuitive, and easy to navigate just like whatsapp.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-[100px]">
          <div class="-mx-4 flex flex-wrap items-center justify-between">
            <div class="w-full px-4 lg:w-1/2">
              <div class="wow fadeInUp lg:max-w-[510px]" data-wow-delay=".2s">
                <span class="mb-4 block text-lg font-medium text-primary md:text-[22px]">
                  Prevent shortages, maximize sales!
                </span>
                <h2
                  class="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
                  Stock Out Alerts – Refill Before It's Too Late
                </h2>
                <p class="mb-[30px] text-base leading-relaxed text-body">
                  Get real-time alerts when inventory runs low. Stay ahead of demand, restock on time, and
                  keep your
                  business running
                  smoothly—no more stockouts, no lost customers!
                </p>

              </div>
            </div>

            <div class="order-first w-full px-4 lg:order-last lg:w-1/2">
              <div class="wow fadeInUp relative z-10 mx-auto mb-14 w-full max-w-[470px] pb-6 lg:mr-0 lg:mb-0"
                data-wow-delay=".3s">
                <img src="images/Group 10.png" alt="about image" class="mx-auto"
                  style="width: 330px; margin-right: 20%;" />

                <div class="absolute top-0 right-5 -z-10">
                  <svg width="72" height="50" viewBox="0 0 72 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_34_10)">
                      <path
                        d="M21.8126 0.216481C21.8159 0.143661 21.8196 0.071493 21.8237 0C21.8203 0.0723874 21.8165 0.144547 21.8126 0.216481C21.4747 7.63863 25.1425 21.8522 42.5976 21.0032C35.4678 21.503 21.3391 26.5685 22.3875 42.8298C22.1659 35.7375 17.5749 21.7229 1.00683 21.645C0.856728 21.6473 0.709534 21.6477 0.56543 21.6462C0.713499 21.6447 0.86063 21.6443 1.00683 21.645C7.47462 21.5363 20.8883 17.1617 21.8126 0.216481Z"
                        fill="#FF9996" />
                      <path
                        d="M58.7832 24.2896C58.7851 24.2459 58.7874 24.2025 58.7898 24.1597C58.7878 24.2031 58.7855 24.2464 58.7832 24.2896C58.5804 28.7428 60.7811 37.271 71.2541 36.7616C66.9763 37.0614 58.499 40.1008 58.7888 49.8576C58.6559 45.6022 55.9013 37.1934 45.9605 37.1467C45.8704 37.1481 45.782 37.1482 45.6956 37.1474C45.7844 37.1465 45.8727 37.1462 45.9605 37.1467C50.1803 37.0815 58.2286 34.4567 58.7832 24.2896Z"
                        fill="#FFCB78" />
                    </g>
                    <defs>
                      <clipPath id="clip0_34_10">
                        <rect width="71.2541" height="49.8779" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="absolute bottom-0 left-0 -z-10 h-1/2 w-full rounded-[20px] bg-gradient-2">
                  <div class="absolute left-10 -top-12 -z-10">
                    <svg width="65" height="36" viewBox="0 0 65 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M55.4149 1.83203C53.339 1.57898 51.3475 2.4214 49.2904 4.18456C45.9052 7.08611 40.0313 8.52953 34.7368 4.19769C32.4686 2.34195 30.4917 2.04856 28.8583 2.32079C27.1672 2.60264 25.7448 3.50424 24.6267 4.24961C22.8559 5.43014 20.9059 6.67067 18.66 6.9618C16.3417 7.2623 13.8664 6.54246 11.0465 4.19256C8.68539 2.22501 6.66504 1.84655 5.11312 2.08531C3.52522 2.32961 2.288 3.24185 1.57603 4.08328C1.25719 4.46008 0.69326 4.50708 0.316454 4.18824C-0.0603521 3.86941 -0.107346 3.30548 0.21149 2.92867C1.13803 1.83367 2.73868 0.642115 4.84131 0.318626C6.97991 -0.0103986 9.50274 0.579362 12.1908 2.81939C14.7333 4.93815 16.7266 5.40998 18.4302 5.18915C20.2062 4.95894 21.831 3.96513 23.6352 2.76234L24.131 3.50597L23.6352 2.76234C24.7515 2.01814 26.4572 0.908837 28.5644 0.557635C30.7295 0.196804 33.2212 0.648204 35.8687 2.81426C40.3566 6.48615 45.2562 5.28815 48.1272 2.82739C50.3886 0.889088 52.8657 -0.279434 55.6312 0.057691C58.3691 0.391448 61.1615 2.17558 64.1309 5.60179C64.4541 5.9748 64.4138 6.53924 64.0408 6.86252C63.6678 7.18579 63.1034 7.14547 62.7801 6.77246C59.9402 3.49563 57.5184 2.08846 55.4149 1.83203Z"
                        fill="#FF9996" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M55.4149 11.2025C53.339 10.9495 51.3475 11.7919 49.2904 13.555C45.9052 16.4566 40.0312 17.9 34.7367 13.5682C32.4686 11.7124 30.4916 11.419 28.8583 11.6913C27.1671 11.9731 25.7447 12.8747 24.6267 13.6201C22.8559 14.8006 20.9058 16.0412 18.66 16.3323C16.3417 16.6328 13.8663 15.9129 11.0464 13.563C8.68536 11.5955 6.66501 11.217 5.11309 11.4558C3.52519 11.7001 2.28797 12.6123 1.576 13.4538C1.25716 13.8306 0.69323 13.8776 0.316424 13.5587C-0.0603826 13.2399 -0.107377 12.676 0.211459 12.2992C1.138 11.2041 2.73865 10.0126 4.84128 9.68911C6.97988 9.36008 9.50271 9.94985 12.1907 12.1899C14.7333 14.3086 16.7266 14.7805 18.4302 14.5596C20.2061 14.3294 21.831 13.3356 23.6352 12.1328L24.1309 12.8765L23.6352 12.1328C24.7515 11.3886 26.4572 10.2793 28.5644 9.92812C30.7294 9.56729 33.2212 10.0187 35.8686 12.1847C40.3565 15.8566 45.2562 14.6586 48.1271 12.1979C50.3885 10.2596 52.8657 9.09105 55.6312 9.42817C58.3691 9.76193 61.1614 11.5461 64.1308 14.9723C64.4541 15.3453 64.4138 15.9097 64.0408 16.233C63.6678 16.5563 63.1033 16.516 62.7801 16.1429C59.9401 12.8661 57.5184 11.4589 55.4149 11.2025Z"
                        fill="#FF9996" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M55.4149 20.5825C53.339 20.3295 51.3475 21.1719 49.2904 22.935C45.9052 25.8366 40.0312 27.28 34.7367 22.9482C32.4686 21.0924 30.4916 20.7991 28.8583 21.0713C27.1671 21.3531 25.7447 22.2547 24.6267 23.0001C22.8559 24.1806 20.9058 25.4212 18.66 25.7123C16.3417 26.0128 13.8663 25.293 11.0464 22.9431C8.68536 20.9755 6.66501 20.597 5.11309 20.8358C3.52519 21.0801 2.28797 21.9923 1.576 22.8338C1.25716 23.2106 0.69323 23.2576 0.316424 22.9387C-0.0603826 22.6199 -0.107377 22.056 0.211459 21.6792C1.138 20.5842 2.73865 19.3926 4.84128 19.0691C6.97988 18.7401 9.50271 19.3299 12.1907 21.5699C14.7333 23.6886 16.7266 24.1605 18.4302 23.9396C20.2061 23.7094 21.831 22.7156 23.6352 21.5128L24.1309 22.2565L23.6352 21.5128C24.7515 20.7686 26.4572 19.6593 28.5644 19.3081C30.7294 18.9473 33.2212 19.3987 35.8686 21.5647C40.3565 25.2366 45.2562 24.0386 48.1271 21.5779C50.3885 19.6396 52.8657 18.4711 55.6312 18.8082C58.3691 19.1419 61.1614 20.9261 64.1308 24.3523C64.4541 24.7253 64.4138 25.2897 64.0408 25.613C63.6678 25.9363 63.1033 25.896 62.7801 25.523C59.9401 22.2461 57.5184 20.8389 55.4149 20.5825Z"
                        fill="#FF9996" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M55.4149 29.962C53.339 29.709 51.3475 30.5514 49.2904 32.3146C45.9052 35.2161 40.0312 36.6595 34.7367 32.3277C32.4686 30.472 30.4916 30.1786 28.8583 30.4508C27.1671 30.7326 25.7447 31.6342 24.6267 32.3796C22.8559 33.5601 20.9058 34.8007 18.66 35.0918C16.3417 35.3923 13.8663 34.6725 11.0464 32.3226C8.68536 30.355 6.66501 29.9766 5.11309 30.2153C3.52519 30.4596 2.28797 31.3719 1.576 32.2133C1.25716 32.5901 0.69323 32.6371 0.316424 32.3182C-0.0603826 31.9994 -0.107377 31.4355 0.211459 31.0587C1.138 29.9637 2.73865 28.7721 4.84128 28.4486C6.97988 28.1196 9.50271 28.7094 12.1907 30.9494C14.7333 33.0682 16.7266 33.54 18.4302 33.3192C20.2061 33.0889 21.831 32.0951 23.6352 30.8923L24.1309 31.636L23.6352 30.8923C24.7515 30.1481 26.4572 29.0388 28.5644 28.6876C30.7294 28.3268 33.2212 28.7782 35.8686 30.9443C40.3565 34.6162 45.2562 33.4182 48.1271 30.9574C50.3885 29.0191 52.8657 27.8506 55.6312 28.1877C58.3691 28.5215 61.1614 30.3056 64.1308 33.7318C64.4541 34.1048 64.4138 34.6692 64.0408 34.9925C63.6678 35.3158 63.1033 35.2755 62.7801 34.9025C59.9401 31.6256 57.5184 30.2185 55.4149 29.962Z"
                        fill="#FF9996" />
                    </svg>
                  </div>
                  <div class="absolute top-0 left-0 h-full w-full bg-texture"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Graphics -->
      <div class="absolute right-0 top-36 -z-10">
        <svg width="95" height="190" viewBox="0 0 95 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="95" cy="95" r="77" stroke="url(#paint0_linear_47_27)" stroke-width="36" />
          <defs>
            <linearGradient id="paint0_linear_47_27" x1="0" y1="0" x2="224.623" y2="130.324"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#FF8FE8" />
              <stop offset="1" stop-color="#FFC960" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
    <!-- ======= About End ======= -->

    <!-- ======= Work Process Start ======= -->
    <section id="work-process" class="relative z-10 pt-[110px]">
      <div class="container">
        <div class="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]" data-wow-delay=".2s">
          <h2 class="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            How It Works?
          </h2>
          <p class="text-base text-body mx-auto" style="max-width: 500px;">
            Download Bookie Buddy from the Stores.
            Takes less than 30 seconds – lightweight, fast, and secure.
          </p>
        </div>
      </div>

      <div class="container max-w-[1390px]">
        <div
          class="rounded-2xl bg-white px-5 pt-14 pb-14 shadow-card dark:bg-dark dark:shadow-card-dark md:pb-1 lg:pt-20 lg:pb-5 xl:px-10">
          <div class="-mx-4 flex flex-wrap justify-center">
            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div class="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center" data-wow-delay=".2s">
                <div
                  class="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 group-hover:bg-primary group-hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-primary">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_40_12)">
                      <path
                        d="M21.6667 16.6667H30L20 26.6667L10 16.6667H18.3333V5H21.6667V16.6667ZM6.66668 31.6667H33.3333V20H36.6667V33.3333C36.6667 33.7754 36.4911 34.1993 36.1785 34.5118C35.866 34.8244 35.442 35 35 35H5.00001C4.55798 35 4.13406 34.8244 3.8215 34.5118C3.50894 34.1993 3.33334 33.7754 3.33334 33.3333V20H6.66668V31.6667Z"
                        fill="currentColor" />
                    </g>
                    <defs>
                      <clipPath id="clip0_40_12">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h3 class="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                  Install the App
                </h3>
                <p class="text-base text-body">
                  Download the app and connect with us to create your account effortlessly.
                </p>
                <a href="#cta">Click to download</a>
              </div>
            </div>

            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div class="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center" data-wow-delay=".3s">
                <div
                  class="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 group-hover:bg-primary group-hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-primary">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_40_15)">
                      <path
                        d="M20 36.6667C10.795 36.6667 3.33333 29.205 3.33333 20C3.33333 10.795 10.795 3.33337 20 3.33337C29.205 3.33337 36.6667 10.795 36.6667 20C36.6667 29.205 29.205 36.6667 20 36.6667ZM11.6883 30.4267C14.0476 32.3129 16.9795 33.3382 20 33.3334C23.2833 33.3334 26.2883 32.1467 28.6117 30.18C27.5262 29.0663 26.2284 28.1815 24.7951 27.578C23.3617 26.9746 21.8219 26.6647 20.2667 26.6667C18.6543 26.6648 17.0592 26.9981 15.5824 27.6454C14.1057 28.2927 12.7796 29.2398 11.6883 30.4267ZM9.36 28.0334C10.7608 26.5468 12.4511 25.3629 14.3269 24.5546C16.2027 23.7462 18.2241 23.3306 20.2667 23.3334C22.2361 23.3308 24.1866 23.7173 26.0062 24.4707C27.8259 25.224 29.4788 26.3294 30.87 27.7234C32.2968 25.7152 33.1394 23.3511 33.3043 20.8932C33.4692 18.4354 32.9499 15.9798 31.8041 13.7991C30.6584 11.6184 28.9309 9.79775 26.8133 8.53912C24.6957 7.28049 22.2708 6.6331 19.8077 6.66879C17.3445 6.70448 14.9394 7.42185 12.8592 8.7413C10.779 10.0608 9.10493 11.9307 8.02282 14.1437C6.94071 16.3567 6.49282 18.8262 6.72886 21.2783C6.9649 23.7304 7.87562 26.0691 9.36 28.035V28.0334ZM20 21.6667C18.2319 21.6667 16.5362 20.9643 15.286 19.7141C14.0357 18.4638 13.3333 16.7682 13.3333 15C13.3333 13.2319 14.0357 11.5362 15.286 10.286C16.5362 9.03575 18.2319 8.33337 20 8.33337C21.7681 8.33337 23.4638 9.03575 24.714 10.286C25.9643 11.5362 26.6667 13.2319 26.6667 15C26.6667 16.7682 25.9643 18.4638 24.714 19.7141C23.4638 20.9643 21.7681 21.6667 20 21.6667ZM20 18.3334C20.8841 18.3334 21.7319 17.9822 22.357 17.3571C22.9821 16.7319 23.3333 15.8841 23.3333 15C23.3333 14.116 22.9821 13.2681 22.357 12.643C21.7319 12.0179 20.8841 11.6667 20 11.6667C19.1159 11.6667 18.2681 12.0179 17.643 12.643C17.0179 13.2681 16.6667 14.116 16.6667 15C16.6667 15.8841 17.0179 16.7319 17.643 17.3571C18.2681 17.9822 19.1159 18.3334 20 18.3334Z"
                        fill="currentColor" />
                    </g>
                    <defs>
                      <clipPath id="clip0_40_15">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h3 class="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                  Set Up Your Profile
                </h3>
                <p class="text-base text-body">
                  Contact us to create your profile and get started seamlessly.
                </p>
                <a href="https://wa.me/919744898185?text=Hi, I need to know more about bookie buddy"
                  target="_blank">Contact Us</a>
              </div>
            </div>

            <div class="w-full px-4 md:w-1/2 lg:w-1/3">
              <div class="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center" data-wow-delay=".4s">
                <div
                  class="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 group-hover:bg-primary group-hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-primary">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_40_18)">
                      <path
                        d="M5.26834 7.44836C7.20178 5.51458 9.79501 4.38351 12.5277 4.28211C15.2603 4.18072 17.9302 5.11651 20.0017 6.9017C22.0713 5.11948 24.7377 4.18475 27.467 4.28463C30.1964 4.38452 32.7873 5.51165 34.7211 7.44037C36.6549 9.3691 37.7888 11.9571 37.8959 14.6862C38.0029 17.4153 37.0751 20.0841 35.2983 22.1584L22.3567 35.1417C21.7621 35.7365 20.9646 36.0845 20.1242 36.1161C19.2838 36.1476 18.4625 35.8603 17.825 35.3117L17.6417 35.1434L4.70168 22.1584C2.92583 20.0859 1.99764 17.4195 2.1027 14.6923C2.20776 11.9651 3.33832 9.37805 5.26834 7.44836ZM7.62501 9.80503C6.26208 11.1683 5.47643 13.0041 5.43112 14.9313C5.38581 16.8585 6.08432 18.7292 7.38168 20.155L7.62501 20.4117L20 32.7867L28.8383 23.9467L22.9467 18.055L21.18 19.8217C20.7158 20.2861 20.1646 20.6546 19.558 20.906C18.9514 21.1575 18.3012 21.287 17.6445 21.2871C16.3183 21.2874 15.0463 20.7609 14.1083 19.8234C13.1704 18.8858 12.6432 17.6141 12.6429 16.2879C12.6426 14.9617 13.1691 13.6897 14.1067 12.7517L17.61 9.2467C16.2158 8.13399 14.4707 7.55451 12.6878 7.61224C10.9049 7.66997 9.20099 8.36112 7.88168 9.5617L7.62501 9.80503ZM21.7683 14.5184C22.0809 14.2059 22.5047 14.0304 22.9467 14.0304C23.3886 14.0304 23.8125 14.2059 24.125 14.5184L31.195 21.5884L32.375 20.4117C33.7608 19.0269 34.5497 17.1549 34.5731 15.196C34.5964 13.237 33.8524 11.3467 32.5 9.92929C31.1477 8.51185 29.2944 7.67981 27.3366 7.61112C25.3787 7.54242 23.4717 8.24253 22.0233 9.5617L21.7683 9.80503L16.465 15.1084C16.1761 15.3971 16.0033 15.7818 15.9793 16.1895C15.9554 16.5972 16.0819 16.9995 16.335 17.32L16.465 17.465C16.7537 17.7539 17.1384 17.9267 17.5461 17.9507C17.9538 17.9747 18.3561 17.8481 18.6767 17.595L18.8217 17.465L21.7683 14.5184Z"
                        fill="currentColor" />
                    </g>
                    <defs>
                      <clipPath id="clip0_40_18">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h3 class="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                  Enjoy the features!
                </h3>
                <p class="text-base text-body">
                  Experience seamless management with our features, don't forget to add your valuable
                  reviews!
                </p>
                <a href="">Add your review</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Graphics -->
      <div class="absolute -top-28 left-0 -z-10 hidden md:block">
        <svg width="632" height="1179" viewBox="0 0 632 1179" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.25" filter="url(#filter0_f_38_24)">
            <circle cx="42.5" cy="589.5" r="329.5" fill="url(#paint0_linear_38_24)" />
          </g>
          <defs>
            <filter id="filter0_f_38_24" x="-547" y="0" width="1179" height="1179" filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="130" result="effect1_foregroundBlur_38_24" />
            </filter>
            <linearGradient id="paint0_linear_38_24" x1="-366.218" y1="919" x2="451.176" y2="349.901"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#8EA5FE" />
              <stop offset="0.541667" stop-color="#BEB3FD" />
              <stop offset="1" stop-color="#90D1FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="absolute right-0 top-20 -z-10">
        <svg width="637" height="1277" viewBox="0 0 637 1277" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.2" filter="url(#filter0_f_38_23)">
            <circle cx="638.5" cy="638.5" r="388.5" fill="url(#paint0_linear_38_23)" />
          </g>
          <defs>
            <filter id="filter0_f_38_23" x="0" y="0" width="1277" height="1277" filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="125" result="effect1_foregroundBlur_38_23" />
            </filter>
            <linearGradient id="paint0_linear_38_23" x1="250" y1="250" x2="1168.59" y2="782.957"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#FF8FE8" />
              <stop offset="1" stop-color="#FFC960" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
    <!-- ======= Work Process End ======= -->

    <!-- ======= Pricing Start ======= -->
    <section id="pricing" class="relative z-10 pt-[110px]">
      <div class="container">
        <div class="wow fadeInUp mx-auto mb-10 max-w-[690px] text-center lg:mb-[70px]" data-wow-delay=".2s">
          <h2 class="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            Check Our Plans
          </h2>
          <p class="text-base text-body">
            We offer an immense plans to be your trusted business buddy.
          </p>
        </div>
      </div>

      <!-- <div class="container max-w-[1500px] overflow-hidden"> -->

      <!-- this is switch not needed but if it avoid , it will loose the FAQs expandtion -->
      <!-- <div class="wow fadeInUp mb-[60px] flex items-center justify-center" data-wow-delay=".25s">
              <label for="togglePlan" class="inline-flex items-center">
                <input type="checkbox" name="togglePlan" id="togglePlan" class="sr-only" /> -->
      <span class="monthly text-sm font-medium text-black dark:text-white">
        <!-- Monthly -->
      </span>
      <!-- <span class="mx-5 flex h-[34px] w-[60px] cursor-pointer items-center rounded-full bg-primary p-[3px]">
                  <span class="dot block h-7 w-7 rounded-full bg-white duration-300"></span>
                </span> -->
      <span class="yearly text-sm font-medium text-black dark:text-white">
        <!-- Yearly -->
      </span>
      <!-- </label>
            </div> -->


      <div class="mx-6 flex flex-wrap justify-center">

        <div class="w-full px-2 max-w-[420px]" style="min-height: 680px; margin-bottom: 20px;">
          <div class="wow fadeInUp relative mb-10 rounded-xl bg-white py-10 px-9 shadow-card lg:mb-4 lg:px-7 xl:px-9"
            data-wow-delay=".3s"
            style="border: 1px rgb(125, 125, 125) solid; height: 100%; display: flex; flex-direction: column;">
            <h3 class="mb-2 text-[22px] font-semibold leading-tight text-black dark:text-white">
              Basic - starter plan
              <span class="inline bg-gradient-2 bg-clip-text text-transparent">
                
              </span>
            </h3>
            <p class="mb-7 text-base text-body">
              Beginner plan to experience bookie buddy
            </p>

            <div class="space-y-4 pt-[30px] pb-10" style="overflow: auto; flex-grow: 1;">
              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                First year completely FREE - <br>No running/maintenance
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Upto 150 stock items can upload
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                One user access 
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                4 years app updates - Get the newest features
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                24/7 support
              </p>
              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                After Year 1: Only ₹599/month for cloud & server maintenance
              </p>
              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Unlimited customers & transactions - Grow without limits
              </p>
            </div>

            <a href="https://wa.me/919744898185?text=Hi team, I'm interested in choosing basic plan for bookie buddy." target="_blank"
              class="block w-full rounded-md bg-primary py-[10px] px-8 text-center text-base font-medium text-white hover:bg-opacity-90"
              style="margin-top: auto;">
              Choose Plan
            </a>
          </div>
        </div>


        <!-- <==========Standard plan===========> -->
        <div class="w-full px-2 max-w-[420px]" style="min-height: 680px; margin-bottom: 20px;">
          <div class="wow fadeInUp relative mb-10 rounded-xl bg-white py-10 px-9 shadow-card lg:mb-4 lg:px-7 xl:px-9" 
            data-wow-delay=".3s"
            style="border: 1px rgb(255, 0, 0) solid; height: 100%; display: flex; flex-direction: column; background: #fff8e7;">
            <h3 class="mb-2 text-[22px] font-semibold leading-tight text-black dark:text-white">
              Growth plan -
              <span class="inline bg-gradient-2 bg-clip-text text-transparent">
                Recommended
              </span>
            </h3>
            <p class="mb-7 text-base text-body">
           1st year FREE! - Best for growing businesses
            </p>


            <div class="space-y-4 pt-[30px] pb-10" style="overflow: auto; flex-grow: 1;">
              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                First year completely FREE - <br>No running/maintenance
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Upload 250 Stock items with image
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
               Upto 3 users can access
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Lifetime app updates
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Booking and Sales available 
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Full Admin Access
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Automatic cloud backups - Never lose business data
              </p>
              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                24/7 priority support
              </p>
              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                After Year 1: Only 599/month
              </p>
              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Unlimited customers & transactions - Grow without limits
              </p>
            </div>

            <a href="https://wa.me/919744898185?text=Hi team, I'm interested in choosing Growth plan for bookie buddy." target="_blank"
              class="block w-full rounded-md bg-primary py-[10px] px-8 text-center text-base font-medium text-white hover:bg-opacity-90"
              style="margin-top: auto;">
              Choose Plan
            </a>
          </div>
        </div>


        <!-- <==========Premium plan===========> -->
        <div class="w-full px-2 max-w-[420px]" style="min-height: 680px; margin-bottom: 20px;">
          <div class="wow fadeInUp relative mb-10 rounded-xl bg-white py-10 px-9 shadow-card lg:mb-4 lg:px-7 xl:px-9"
            data-wow-delay=".3s"
            style="border: 1px rgb(125, 125, 125) solid; height: 100%; display: flex; flex-direction: column;">
            <h3 class="mb-2 text-[22px] font-semibold leading-tight text-black dark:text-white">
              Premium plan - 👑
              <span class="inline bg-gradient-2 bg-clip-text text-transparent">
                
              </span>
            </h3>
            <p class="mb-7 text-base text-body">
              Best for multi shop & premium owners
            </p>

            <div class="space-y-4 pt-[30px] pb-10" style="overflow: auto; flex-grow: 1;">
              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                First year completely FREE - <br>No running/maintenance
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Upload unlimited Stock Items Per Shop
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Unlimited users can access
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                FREE Desktop App for 12 Months
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Whatsapp auto invoicing Free (3000 msg)
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Automatic Pickup & Return reminders to customers
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              All premium features are free for 1 year
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Admin user Access + Dashboard Analytics
              </p>

              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Automatic cloud backups - Never lose business data
              </p>
              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                24/7 priority VIP ticket support
              </p>
              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                After Year 1: Only 599/month
              </p>
              <p class="flex text-base text-black dark:text-body">
                <span class="mr-[10px] mt-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_44_7)">
                      <path
                        d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                        fill="#00BE6C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_44_7">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Lifetime App Updates
              </p>
            </div>

            <a href="https://wa.me/919744898185?text=Hi team, I'm interested in choosing Premium plan for bookie buddy." target="_blank"
              class="block w-full rounded-md bg-primary py-[10px] px-8 text-center text-base font-medium text-white hover:bg-opacity-90"
              style="margin-top: auto;">
              Choose Plan
            </a>
          </div>
        </div>

      </div>
    </section>

    <!-- ======= Pricing End ======= -->

    <!-- ======= Screens Start ======= -->
    <section id="screens" class="relative z-20 pt-[110px]">
      <div class="container">
        <div class="wow fadeInUp mx-auto mb-10 max-w-[690px] text-center lg:mb-[70px]" data-wow-delay=".2s">
          <h2 class="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            App Screenshots
          </h2>
          <p class="text-base text-body">
            Take a glimpse of our app! Explore the sleek interface and powerful features designed to
            simplify
            your
            workflow.
          </p>
        </div>
      </div>

      <div class="container">
        <div class="wow fadeInUp mx-auto max-w-[1000px]" data-wow-delay=".2s">
          <!-- Swiper -->
          <div class="swiper mySwiper relative z-20">
            <div class="absolute top-0 left-0 right-0 z-50 mx-auto w-full md:w-1/3">
              <!-- <img src="images/mobile-frame.png" alt="mobile-frame" class="mx-auto max-w-full" /> -->
            </div>
            <div class="swiper-wrapper py-2">
              <div class="swiper-slide">
                <div class="mx-auto w-full max-w-[252px] xs:max-w-[265px]">
                  <img src="images/Scrnshot1.jpg" alt="screenshot" class="mx-auto w-full rounded-2xl" />
                </div>
              </div>
              <div class="swiper-slide">
                <div class="mx-auto w-full max-w-[252px] xs:max-w-[265px]">
                  <img src="images/Scrnshot2.jpg" alt="screenshot" class="mx-auto w-full rounded-2xl" />
                </div>
              </div>
              <div class="swiper-slide">
                <div class="mx-auto w-full max-w-[252px] xs:max-w-[265px]">
                  <img src="images/Scrnshot3.png"" alt=" screenshot" class="mx-auto w-full rounded-2xl" />
                </div>
              </div>
              <div class="swiper-slide">
                <div class="mx-auto w-full max-w-[252px] xs:max-w-[265px]">
                  <img src="images/Scrnshot4.png" alt="screenshot" class="mx-auto w-full rounded-2xl" />
                </div>
              </div>
              <div class="swiper-slide">
                <div class="mx-auto w-full max-w-[252px] xs:max-w-[265px]">
                  <img src="images/Scrnshot5.png"" alt=" screenshot" class="mx-auto w-full rounded-2xl" />
                </div>
              </div>
              <div class="swiper-slide">
                <div class="mx-auto w-full max-w-[252px] xs:max-w-[265px]">
                  <img src="images/Scrnshot6.png" alt="screenshot" class="mx-auto w-full rounded-2xl" />
                </div>
              </div>
              <div class="swiper-slide">
                <div class="mx-auto w-full max-w-[252px] xs:max-w-[265px]">
                  <img src="images/Scrnshot7.png" alt="screenshot" class="mx-auto w-full rounded-2xl" />
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center space-x-4 pt-20">
              <button class="swiper-button-prev">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_46_342)">
                    <path
                      d="M6.52334 10.8334L10.9933 15.3034L9.81501 16.4817L3.33334 10L9.815 3.51836L10.9933 4.69669L6.52334 9.16669L16.6667 9.16669L16.6667 10.8334L6.52334 10.8334Z"
                      fill="currentColor" />
                  </g>
                  <defs>
                    <clipPath id="clip0_46_342">
                      <rect width="20" height="20" fill="white" transform="translate(20 20) rotate(180)" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button class="swiper-button-next">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_46_337)">
                    <path
                      d="M13.4767 9.16664L9.00667 4.69664L10.185 3.51831L16.6667 9.99998L10.185 16.4816L9.00667 15.3033L13.4767 10.8333H3.33334V9.16664H13.4767Z"
                      fill="currentColor" />
                  </g>
                  <defs>
                    <clipPath id="clip0_46_337">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Graphics -->
      <div class="absolute left-0 top-0 -z-10">
        <svg width="95" height="190" viewBox="0 0 95 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cy="95" r="77" stroke="url(#paint0_linear_47_26)" stroke-width="36" />
          <defs>
            <linearGradient id="paint0_linear_47_26" x1="-117.84" y1="190" x2="117.828" y2="25.9199"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#8EA5FE" />
              <stop offset="0.541667" stop-color="#BEB3FD" />
              <stop offset="1" stop-color="#90D1FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
    <!-- ======= Screens End ======= -->

    <!-- ======= CTA Start ======= -->
    <section id="cta" class="relative z-10 pt-[110px]">
      <div class="container max-w-[1390px]">
        <div
          class="rounded-2xl bg-white px-10 pt-14 shadow-card dark:bg-dark dark:shadow-card-dark sm:px-20 lg:px-12 lg:pt-20 xl:px-20">
          <div class="-mx-4 flex flex-wrap">
            <div class="w-full self-center px-4 lg:w-1/2">
              <div class="wow fadeInUp mx-auto max-w-[530px] text-center lg:ml-0 lg:text-left" data-wow-delay=".2s">
                <h2
                  class="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[38px] md:leading-tight">
                  Download buddy Now & Start Your Journey Today!
                </h2>
                <p class="mb-10 text-base text-body">
                  Unlock powerful potential with Boookie buddy. Get started with a plan that fits your
                  needs!
                </p>

                <div class="-mx-[10px] flex flex-wrap items-center justify-center lg:justify-start">
                  <div class="inline-block px-[10px]">
                    <a href="https://play.google.com/store/apps/details?id=com.bookingbuddy.bookingapp" target="_blank"
                      class="mb-5 inline-flex items-center rounded-md bg-primary py-[10px] pl-4 pr-5 text-white hover:bg-opacity-90">
                      <span class="mr-[10px]">
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M4 28.9958V4.9125C4 4.07667 4.48167 3.34 5.19 3L19.1442 16.9542L5.19 30.9083C4.48167 30.5542 4 29.8317 4 28.9958ZM23.5642 21.3742L8.32083 30.1858L20.3483 18.1583L23.5642 21.3742ZM28.31 15.2683C28.7917 15.6508 29.1458 16.2458 29.1458 16.9542C29.1458 17.6625 28.8342 18.2292 28.3383 18.6258L25.0942 20.4958L21.5525 16.9542L25.0942 13.4125L28.31 15.2683ZM8.32083 3.7225L23.5642 12.5342L20.3483 15.75L8.32083 3.7225Z"
                            fill="currentColor" />
                        </svg>
                      </span>
                      <span class="text-left">
                        <span class="block text-xs opacity-70">
                          Get it on
                        </span>
                        <span class="block text-sm font-medium">
                          Google Play
                        </span>
                      </span>
                    </a>
                  </div>

                  <div class="inline-block px-[10px]">
                    <a href="https://apps.apple.com/in/app/bookie-buddy/id6740146706" target="_blank"
                      class="mb-5 inline-flex items-center rounded-md bg-black py-[10px] pl-4 pr-5 text-white hover:bg-opacity-90 dark:bg-white dark:text-black dark:hover:bg-opacity-90">
                      <span class="mr-[10px]">
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M26.5058 27.625C25.33 29.3817 24.0833 31.0959 22.185 31.1242C20.2867 31.1667 19.6775 30.005 17.5242 30.005C15.3567 30.005 14.6908 31.0959 12.8917 31.1667C11.0358 31.2375 9.63333 29.2967 8.44333 27.5825C6.02083 24.0834 4.165 17.6375 6.65833 13.3025C7.89083 11.1492 10.1008 9.78921 12.495 9.74671C14.3083 9.71837 16.0367 10.9792 17.1558 10.9792C18.2608 10.9792 20.3575 9.46337 22.5533 9.69004C23.4742 9.73254 26.0525 10.0584 27.71 12.495C27.5825 12.58 24.6358 14.3084 24.6642 17.8925C24.7067 22.1709 28.4183 23.6017 28.4608 23.6159C28.4183 23.715 27.8658 25.6559 26.5058 27.625ZM18.4167 4.95837C19.4508 3.78254 21.165 2.89004 22.5817 2.83337C22.7658 4.49087 22.1 6.16254 21.1083 7.35254C20.1308 8.55671 18.5158 9.49171 16.9292 9.36421C16.7167 7.73504 17.51 6.03504 18.4167 4.95837Z"
                            fill="currentColor" />
                        </svg>
                      </span>
                      <span class="text-left">
                        <span class="block text-xs opacity-70">
                          Download from
                        </span>
                        <span class="block text-sm font-medium">
                          App Store
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full px-4 lg:w-1/2">
              <div class="wow fadeInUp relative z-10 mx-auto mt-20 max-w-[435px] lg:mt-0" data-wow-delay=".3s">
                <img src="images/donwnload-image.png" alt="cta image" class="mx-auto max-w-full" />
                <div class="absolute -top-5 left-0 right-0 -z-10 aspect-square">
                </div>
                <div class="absolute top-0 right-0 -z-10">
                  <svg width="60" height="43" viewBox="0 0 60 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_47_16)">
                      <path
                        d="M18.3392 1.12402C18.342 1.06386 18.3451 1.00425 18.3484 0.94519C18.3456 1.00499 18.3425 1.06459 18.3392 1.12402C18.0601 7.2551 21.0899 18.9962 35.5087 18.295C29.6192 18.7078 17.9481 22.8922 18.347 36.3249C18.164 30.4662 14.3716 18.8894 0.685511 18.8251C0.56152 18.827 0.43993 18.8273 0.320892 18.8261C0.443205 18.8249 0.564743 18.8245 0.685511 18.8251C6.49532 18.7353 17.5757 15.1217 18.3392 1.12402Z"
                        fill="#7083F5" />
                      <path
                        d="M48.8789 21.0097C48.8805 20.9735 48.8824 20.9378 48.8844 20.9023C48.8827 20.9382 48.8808 20.974 48.8789 21.0097C48.7114 24.6883 50.5293 31.733 59.1806 31.3122C55.6469 31.5599 48.6442 34.0705 48.8836 42.1302C48.7737 38.615 46.4983 31.6689 38.2867 31.6303C38.2123 31.6315 38.1393 31.6316 38.0679 31.6309C38.1413 31.6301 38.2142 31.6299 38.2867 31.6303C41.7725 31.5764 48.4208 29.4082 48.8789 21.0097Z"
                        fill="#19DEBB" />
                    </g>
                    <defs>
                      <clipPath id="clip0_47_16">
                        <rect width="58.8596" height="41.2017" fill="white" transform="translate(0.320892 0.94519)" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="absolute left-0 bottom-0 -z-10">
                  <svg width="54" height="30" viewBox="0 0 54 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M45.9917 2.36882C44.2769 2.15978 42.6317 2.85567 40.9325 4.31213C38.1361 6.70897 33.284 7.90131 28.9104 4.32298C27.0368 2.79004 25.4038 2.54769 24.0545 2.77256C22.6575 3.00539 21.4826 3.75015 20.559 4.36587C19.0962 5.34105 17.4854 6.36579 15.6302 6.60628C13.7152 6.85451 11.6704 6.25989 9.34099 4.31875C7.39062 2.69344 5.7217 2.38082 4.43974 2.57805C3.12805 2.77985 2.10604 3.53341 1.51791 4.22847C1.25454 4.53973 0.788703 4.57855 0.477442 4.31517C0.16618 4.0518 0.12736 3.58597 0.390736 3.2747C1.15611 2.37017 2.47833 1.38589 4.21521 1.11867C5.98181 0.846879 8.06579 1.33405 10.2863 3.18443C12.3865 4.93464 14.0331 5.32439 15.4403 5.14198C16.9074 4.95181 18.2496 4.13088 19.74 3.13731L20.1495 3.75159L19.74 3.13731C20.6621 2.52256 22.0711 1.60622 23.8118 1.3161C25.6002 1.01804 27.6585 1.39092 29.8454 3.18019C33.5527 6.21337 37.6 5.22376 39.9716 3.19104C41.8396 1.5899 43.8859 0.624641 46.1703 0.903125C48.432 1.17883 50.7386 2.65261 53.1915 5.48284C53.4585 5.79096 53.4252 6.25723 53.1171 6.52426C52.809 6.7913 52.3427 6.758 52.0757 6.44988C49.7297 3.74304 47.7293 2.58064 45.9917 2.36882Z"
                      fill="#F76D8D" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M45.9916 10.1093C44.2769 9.90026 42.6317 10.5961 40.9325 12.0526C38.1361 14.4494 33.2839 15.6418 28.9104 12.0635C27.0368 10.5305 25.4037 10.2882 24.0545 10.513C22.6575 10.7459 21.4825 11.4906 20.559 12.1063C19.0962 13.0815 17.4853 14.1063 15.6301 14.3468C13.7151 14.595 11.6704 14.0004 9.34098 12.0592C7.3906 10.4339 5.72169 10.1213 4.43972 10.3185C3.12804 10.5203 2.10603 11.2739 1.5179 11.9689C1.25452 12.2802 0.788688 12.319 0.477426 12.0557C0.166165 11.7923 0.127345 11.3264 0.39072 11.0152C1.15609 10.1107 2.47832 9.12637 4.2152 8.85915C5.98179 8.58736 8.06578 9.07453 10.2862 10.9249C12.3865 12.6751 14.0331 13.0649 15.4403 12.8825C16.9074 12.6923 18.2496 11.8714 19.7399 10.8778L20.1495 11.4921L19.7399 10.8778C20.6621 10.263 22.071 9.34669 23.8117 9.05658C25.6002 8.75852 27.6585 9.1314 29.8454 10.9207C33.5526 13.9538 37.6 12.9642 39.9716 10.9315C41.8396 9.33038 43.8858 8.36512 46.1703 8.6436C48.432 8.9193 50.7386 10.3931 53.1915 13.2233C53.4585 13.5314 53.4252 13.9977 53.1171 14.2647C52.809 14.5318 52.3427 14.4985 52.0757 14.1904C49.7297 11.4835 47.7292 10.3211 45.9916 10.1093Z"
                      fill="#F76D8D" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M45.9916 17.8577C44.2769 17.6487 42.6317 18.3446 40.9325 19.801C38.1361 22.1979 33.2839 23.3902 28.9104 19.8119C27.0368 18.2789 25.4037 18.0366 24.0545 18.2615C22.6575 18.4943 21.4825 19.239 20.559 19.8548C19.0962 20.8299 17.4853 21.8547 15.6301 22.0952C13.7151 22.3434 11.6704 21.7488 9.34098 19.8076C7.3906 18.1823 5.72169 17.8697 4.43972 18.0669C3.12804 18.2687 2.10603 19.0223 1.5179 19.7174C1.25452 20.0286 0.788688 20.0674 0.477426 19.8041C0.166165 19.5407 0.127345 19.0749 0.39072 18.7636C1.15609 17.8591 2.47832 16.8748 4.2152 16.6076C5.98179 16.3358 8.06578 16.8229 10.2862 18.6733C12.3865 20.4235 14.0331 20.8133 15.4403 20.6309C16.9074 20.4407 18.2496 19.6198 19.7399 18.6262L20.1495 19.2405L19.7399 18.6262C20.6621 18.0114 22.071 17.0951 23.8117 16.805C25.6002 16.5069 27.6585 16.8798 29.8454 18.6691C33.5526 21.7023 37.6 20.7127 39.9716 18.6799C41.8396 17.0788 43.8858 16.1135 46.1703 16.392C48.432 16.6677 50.7386 18.1415 53.1915 20.9717C53.4585 21.2799 53.4252 21.7461 53.1171 22.0132C52.809 22.2802 52.3427 22.2469 52.0757 21.9388C49.7297 19.2319 47.7292 18.0695 45.9916 17.8577Z"
                      fill="#F76D8D" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M45.9916 25.6056C44.2769 25.3966 42.6317 26.0925 40.9325 27.5489C38.1361 29.9458 33.2839 31.1381 28.9104 27.5598C27.0368 26.0269 25.4037 25.7845 24.0545 26.0094C22.6575 26.2422 21.4825 26.987 20.559 27.6027C19.0962 28.5779 17.4853 29.6026 15.6301 29.8431C13.7151 30.0913 11.6704 29.4967 9.34098 27.5556C7.3906 25.9303 5.72169 25.6176 4.43972 25.8149C3.12804 26.0167 2.10603 26.7702 1.5179 27.4653C1.25452 27.7765 0.788688 27.8154 0.477426 27.552C0.166165 27.2886 0.127345 26.8228 0.39072 26.5115C1.15609 25.607 2.47832 24.6227 4.2152 24.3555C5.98179 24.0837 8.06578 24.5709 10.2862 26.4212C12.3865 28.1715 14.0331 28.5612 15.4403 28.3788C16.9074 28.1886 18.2496 27.3677 19.7399 26.3741L20.1495 26.9884L19.7399 26.3741C20.6621 25.7594 22.071 24.843 23.8117 24.5529C25.6002 24.2549 27.6585 24.6277 29.8454 26.417C33.5526 29.4502 37.6 28.4606 39.9716 26.4279C41.8396 24.8267 43.8858 23.8615 46.1703 24.1399C48.432 24.4156 50.7386 25.8894 53.1915 28.7197C53.4585 29.0278 53.4252 29.494 53.1171 29.7611C52.809 30.0281 52.3427 29.9948 52.0757 29.6867C49.7297 26.9799 47.7292 25.8175 45.9916 25.6056Z"
                      fill="#F76D8D" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Graphics -->
      <div class="absolute right-0 -top-[250px] -z-10">
        <svg width="610" height="1183" viewBox="0 0 610 1183" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.2" filter="url(#filter0_f_47_19)">
            <circle cx="591.5" cy="591.5" r="341.5" fill="url(#paint0_linear_47_19)" />
          </g>
          <defs>
            <filter id="filter0_f_47_19" x="0" y="0" width="1183" height="1183" filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="125" result="effect1_foregroundBlur_47_19" />
            </filter>
            <linearGradient id="paint0_linear_47_19" x1="250" y1="250" x2="1057.46" y2="718.481"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#FF8FE8" />
              <stop offset="1" stop-color="#FFC960" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="absolute left-0 top-10 -z-10 hidden sm:block">
        <svg width="706" height="1405" viewBox="0 0 706 1405" fill="none" xmlns="http://www.w3.org/2000/svg"
          class="w-[400px] md:w-[700px]">
          <g opacity="0.25" filter="url(#filter0_f_47_21)">
            <circle cx="3.5" cy="702.5" r="442.5" fill="url(#paint0_linear_47_21)" />
          </g>
          <defs>
            <filter id="filter0_f_47_21" x="-699" y="0" width="1405" height="1405" filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="130" result="effect1_foregroundBlur_47_21" />
            </filter>
            <linearGradient id="paint0_linear_47_21" x1="-545.385" y1="1145" x2="552.329" y2="380.732"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#8EA5FE" />
              <stop offset="0.541667" stop-color="#BEB3FD" />
              <stop offset="1" stop-color="#90D1FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
    <!-- ======= CTA End ======= -->

    <!-- ======= Testimonials Start ======= -->
    <section id="testimonials" class="testimonials-section" style="position: relative; overflow: hidden;">

      <div class="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]" data-wow-delay=".2s">
        <h2 class="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
          People love using <span class="bg-gradient-1 bg-clip-text text-transparent">Bookie buddy</span>
        </h2>
        <p class="text-base text-body">
          Join 500+ Business owners who simplified their operations with Bookie Buddy. Here's what
          they're
          saying:
        </p>
      </div>


      <!-- Triangle Background -->
      <div id="triangle-bg">
        <!-- <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="modernGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.10" />
              <stop offset="50%" style="stop-color:#ffe4e4a3;stop-opacity:0.8" />
              <stop offset="100%" style="stop-color:#f6eaffb2;stop-opacity:0.8" />
            </linearGradient>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path d="M 50,5 Q 52,5 54,7 L 93,93 Q 95,95 93,97 L 7,97 Q 5,95 7,93 L 46,7 Q 48,5 50,5 Z"
            fill="url(#modernGradient)" filter="url(#softGlow)" />
        </svg> -->
        <img src="https://ferobill.com/wp-content/uploads/2024/10/testimonials-bg.svg" alt="">
      </div>

      <img src="images/love emoji.png" class="floating-L-img" />

      <img src="images/thumbsup icon.png" class="floating-R-img" />


      <!-- Testimonials Content -->
      <div class="testimonials-scroll-wrapper">
        <div class="testimonials-scroll-container" id="scrollContainer">
          <!-- First set -->
          <div class="testimonial-card">
            <img src="images/User-1.jpg" class="testimonial-logo" alt="Logo" />
            <div class="stars">★★★★★</div>
            <div class="business-name">Shaharban,<span style="font-weight: 100;">LUSH Bridals</span></div>
            <div class="testimonial-text">Saved me 10+ hours a week! My guests love how easy it is to book. No more
              messy register books - just happy customers.</div>
          </div>
          <div class="testimonial-card">
            <img src="images/User-2.jpg" class="testimonial-logo" alt="Logo" />
            <div class="stars">★★★★★</div>
            <div class="business-name">Jabir, <span style="font-weight: 100;">Wedding glow</span></div>
            <div class="testimonial-text">Game-changer for our 5 properties. The automated reminders alone cut our
              no-shows in half. Why didn't we switch sooner?</div>
          </div>
          <div class="testimonial-card">
            <img src="images/User-3.jpg" class="testimonial-logo" alt="Logo" />
            <div class="stars">★★★★★</div>
            <div class="business-name">Ruqsana,<span style="font-weight: 100;"> Miora Bridal rentals</span></div>
            <div class="testimonial-text">"Super intuitive - had it figured out in minutes. Wish the mobile app had a
              few more features, but overall fantastic!"</div>
          </div>
          <div class="testimonial-card">
            <img src="images/client 1.png" class="testimonial-logo" alt="Logo" />
            <div class="stars">★★★★★</div>
            <div class="business-name">Anil,<span style="font-weight: 100;"> Golden premium cars</span></div>
            <div class="testimonial-text">"From 20 missed calls a day to seamless Digital bookings. My stress levels
              thank you, Bookie Buddy!"</div>
          </div>
          <div class="testimonial-card">
            <img src="images/User-5.png" class="testimonial-logo" alt="Logo" />
            <div class="stars">★★★★★</div>
            <div class="business-name">Ameen,<span style="font-weight: 100;"> UC Groom rentals</span></div>
            <div class="testimonial-text">"Best investment we made this year. The calendar sync works like magic - never
              double-booked again."</div>
          </div>
          <div class="testimonial-card">
            <img src="images/User-6.png" class="testimonial-logo" alt="Logo" />
            <div class="stars">★★★★★</div>
            <div class="business-name">Lakshmi,<span style="font-weight: 100;"> Bridal beauty parlours</span></div>
            <div class="testimonial-text">"Customers keep complimenting how professional our booking system looks. Small
              learning curve, but worth it!"</div>
          </div>
          <!-- Second set (duplicates) -->
          <div class="testimonial-card">
            <img src="images/User-1.jpg" class="testimonial-logo" alt="Logo" />
            <div class="stars">★★★★★</div>
            <div class="business-name">Shaharban,<span style="font-weight: 100;">LUSH Bridals</span></div>
            <div class="testimonial-text">Saved me 10+ hours a week! My guests love how easy it is to book. No more
              messy register books - just happy customers.</div>
          </div>
          <div class="testimonial-card">
            <img src="images/User-2.jpg" class="testimonial-logo" alt="Logo" />
            <div class="stars">★★★★★</div>
            <div class="business-name">Jabir, <span style="font-weight: 100;">Wedding glow</span></div>
            <div class="testimonial-text">Game-changer for our 5 properties. The automated reminders alone cut our
              no-shows in half. Why didn't we switch sooner?</div>
          </div>
          <div class="testimonial-card">
            <img src="images/User-3.jpg" class="testimonial-logo" alt="Logo" />
            <div class="stars">★★★★★</div>
            <div class="business-name">Ruqsana,<span style="font-weight: 100;"> Miora Bridal rentals</span></div>
            <div class="testimonial-text">"Super intuitive - had it figured out in minutes. Wish the mobile app had a
              few more features, but overall fantastic!"</div>
          </div>
          <div class="testimonial-card">
            <img src="images/User-4.png" class="testimonial-logo" alt="Logo" />
            <div class="stars">★★★★★</div>
            <div class="business-name">Anil,<span style="font-weight: 100;"> Golden premium cars</span></div>
            <div class="testimonial-text">"From 20 missed calls a day to seamless Digital bookings. My stress levels
              thank you, Bookie Buddy!"</div>
          </div>
          <div class="testimonial-card">
            <img src="images/User-5.png" class="testimonial-logo" alt="Logo" />
            <div class="stars">★★★★★</div>
            <div class="business-name">Ameen,<span style="font-weight: 100;"> UC Groom rentals</span></div>
            <div class="testimonial-text">"Best investment we made this year. The calendar sync works like magic - never
              double-booked again."</div>
          </div>
          <div class="testimonial-card">
            <img src="images/User-6.png" class="testimonial-logo" alt="Logo" />
            <div class="stars">★★★★★</div>
            <div class="business-name">Lakshmi,<span style="font-weight: 100;"> Bridal beauty parlours</span></div>
            <div class="testimonial-text">"Customers keep complimenting how professional our booking system looks. Small
              learning curve, but worth it!"</div>
          </div>
        </div>
      </div>

    </section>
    <!-- ======= Testimonials End ======= -->

    <!-- ======= Trusted Clients Start ======= -->
    <section id="clients" class="relative   bg-white">

      <div class="container mx-auto px-">

        <!-- Header -->
        <div class="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]" data-wow-delay=".2s">
          <h2 class="mb-4 text-xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            Trusted By <span class="bg-gradient-1 bg-clip-text text-transparent">500+</span> <br>
            Business Owners
          </h2>
          <!-- <p class="text-base text-body">
            Join 500+ Business owners who simplified their operations with Bookie Buddy. Here's what
            they're
            saying:
          </p> -->
        </div>

        <!-- Clients Grid -->
        <div class="wow fadeInUp flex justify-center gap-2 items-center gap-1 flex-wrap max-w-6xl mx-auto"
          data-wow-delay=".3s">
          <div class="client-logo-wrapper">
            <img src="/images/clients/client2.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client3.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client4.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client5.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client6.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client7.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client8.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client9.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client10.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client11.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client12.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client13.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client14.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client15.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client16.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client17.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client18.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client19.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client20.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client21.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client22.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client23.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client24.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client25.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client26.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client27.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client28.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client29.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client30.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client31.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client32.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client33.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client34.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client35.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client36.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client37.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client38.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client39.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client40.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client41.png" alt="Speedevi Press" class="client-logo-img">
          </div>
          <div class="client-logo-wrapper">
            <img src="/images/clients/client42.png" alt="Speedevi Press" class="client-logo-img">
          </div>

        </div>

      </div>
    </section>
    <!-- ======= Trusted Clients End ======= -->




    <!-- ======= FAQ Start ======= -->
    <section id="faq" class="relative z-10 bg-[#F8FAFB] py-[110px] dark:bg-[#15182B]">
      <div class="container">
        <div class="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]" data-wow-delay=".2s">
          <h2 class="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            Frequently Asked Questions
          </h2>
          <p class="text-base text-body">
            Got questions? We've got answers! Here are the most common questions from business owners like
            you.
          </p>
        </div>

        <div
          class="faqs wow fadeInUp mx-auto w-full max-w-[785px] rounded-lg bg-white px-6 py-[6px] shadow-card dark:bg-black dark:shadow-card-dark"
          data-wow-delay=".3s">

          <!-- FAQ Item 1 -->
          <div class="faq border-b border-stroke last-of-type:border-none dark:border-stroke-dark">
            <button
              class="faq-btn relative flex w-full justify-between py-6 px-[18px] text-left text-base font-medium text-black dark:text-white sm:px-[26px] sm:text-lg">
              How quickly can I start using Bookie Buddy?
            </button>
            <div
              class="faq-content h-auto overflow-hidden border-t border-stroke px-[18px] dark:border-stroke-dark sm:px-[26px]">
              <p class="text-base text-body">
                We know you're busy - that's why you can go from download to data entry in under 5
                minutes!<br><br>
              </p>
              <ul class="pl-5 text-base text-body">
                <li>• Install the app from Play Store/App Store.</li>
                <li>• <a href="your-contact-link-here" class="text-primary underline">Connect with us</a> to
                  set up your
                  account.</li>
                <li>• Get a demo account with sample data.</li>
                <li>• Explore pre-loaded templates for shops, services, and rentals.</li>
              </ul>
            </div>

          </div>

          <!-- FAQ Item 2 -->
          <div class="faq border-b border-stroke last-of-type:border-none dark:border-stroke-dark">
            <button
              class="faq-btn relative flex w-full justify-between py-6 px-[18px] text-left text-base font-medium text-black dark:text-white sm:px-[26px] sm:text-lg">
              What happens after my first free year?
            </button>
            <div
              class="faq-content h-auto overflow-hidden border-t border-stroke px-[18px] dark:border-stroke-dark sm:px-[26px]">
              <p class="text-base text-body">
                Just ₹599/month gets you:<br><br>
              </p>
              <ul class="pl-5 text-base text-body">
                <li>• Secure cloud backups of all your business data</li>
                <li>• Priority server access for faster performance</li>
                <li>• Real-time sales & expense analytics</li>

                <em>(That's less than ₹17/day - cheaper than chai for your whole staff!)</em>
              </ul>

            </div>
          </div>

          <!-- FAQ Item 3 -->
          <div class="faq border-b border-stroke last-of-type:border-none dark:border-stroke-dark">
            <button
              class="faq-btn relative flex w-full justify-between py-6 px-[18px] text-left text-base font-medium text-black dark:text-white sm:px-[26px] sm:text-lg">
              I have 200+ products. Will the stock limit work for me?
            </button>
            <div
              class="faq-content h-auto overflow-hidden border-t border-stroke px-[18px] dark:border-stroke-dark sm:px-[26px]">
              <p class="text-base text-body">
                Absolutely! Our base plan includes 150 items (enough for most kirana stores/boutiques). Need
                more?<br><br>
                You can add 150 products for just <strong>+₹1000 additional</strong><br>
                Get advanced inventory reports (best-sellers, dead stock alerts)<br>
                Bulk upload via Excel for large catalogs
              </p>
            </div>
          </div>

          <!-- FAQ Item 4 -->
          <div class="faq border-b border-stroke last-of-type:border-none dark:border-stroke-dark">
            <button
              class="faq-btn relative flex w-full justify-between py-6 px-[18px] text-left text-base font-medium text-black dark:text-white sm:px-[26px] sm:text-lg">
              Is my data safe with Bookie Buddy?
            </button>
            <div
              class="faq-content h-auto overflow-hidden border-t border-stroke px-[18px] dark:border-stroke-dark sm:px-[26px]">
              <p class="text-base text-body">
                Your business data is 100% secure and private:<br><br>
                Bank-level AES-256 encryption<br>
                Data stored only in India-based servers<br>
                30-day backup history (accidental deletion protection)
              </p>
            </div>
          </div>

          <!-- FAQ Item 5 -->
          <div class="faq border-b border-stroke last-of-type:border-none dark:border-stroke-dark">
            <button
              class="faq-btn relative flex w-full justify-between py-6 px-[18px] text-left text-base font-medium text-black dark:text-white sm:px-[26px] sm:text-lg">
              What if I need help using the app?
            </button>
            <div
              class="faq-content h-auto overflow-hidden border-t border-stroke px-[18px] dark:border-stroke-dark sm:px-[26px]">
              <p class="text-base text-body">
                We're with you every step of the way:<br><br>
              </p>
              <ul class="pl-5 text-base text-body">
                <li>• 24/7 WhatsApp support (avg. response time: 22 mins)</li>
              </ul>


            </div>
          </div>
        </div>
      </div>

      <!-- Graphics -->
      <div class="absolute right-0 -top-24 -z-10">
        <svg width="95" height="190" viewBox="0 0 95 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="95" cy="95" r="77" stroke="url(#paint0_linear_49_603)" stroke-width="36" />
          <defs>
            <linearGradient id="paint0_linear_49_603" x1="0" y1="0" x2="224.623" y2="130.324"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#FF8FE8" />
              <stop offset="1" stop-color="#FFC960" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div class="absolute left-0 -bottom-24 -z-10">
        <svg width="95" height="190" viewBox="0 0 95 190" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cy="95" r="77" stroke="url(#paint0_linear_52_83)" stroke-width="36" />
          <defs>
            <linearGradient id="paint0_linear_52_83" x1="-117.84" y1="190" x2="117.828" y2="25.9199"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#8EA5FE" />
              <stop offset="0.541667" stop-color="#BEB3FD" />
              <stop offset="1" stop-color="#90D1FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
    <div style="padding-top: 6rem;"></div>
    <!-- ======= FAQ End ======= -->

    <!-- ======= Clients Start ======= -->
    <!-- <section class="relative z-10 bg-[#F8FAFB] pt-[70px] pb-[50px] dark:bg-[#15182B]">
      <div class="wow fadeInUp container overflow-hidden lg:max-w-[1200px]" data-wow-delay=".2s">
        <div class="-mx-4 flex flex-wrap items-center justify-center">
          <div class="w-1/2 px-4 sm:w-1/3 md:w-1/4 lg:w-1/6">
            <div class="mb-5 text-center">
              <a href="javascript:void(0)" class="block">
                <img src="images/client-01.svg" alt="client"
                  class="mx-auto max-w-full opacity-[65%] hover:opacity-100" />
              </a>
            </div>
          </div>

          <div class="w-1/2 px-4 sm:w-1/3 md:w-1/4 lg:w-1/6">
            <div class="mb-5 text-center">
              <a href="javascript:void(0)" class="block">
                <img src="images/client-02.svg" alt="client"
                  class="mx-auto max-w-full opacity-[65%] hover:opacity-100" />
              </a>
            </div>
          </div>

          <div class="w-1/2 px-4 sm:w-1/3 md:w-1/4 lg:w-1/6">
            <div class="mb-5 text-center">
              <a href="javascript:void(0)" class="block">
                <img src="images/client-03.svg" alt="client"
                  class="mx-auto max-w-full opacity-[65%] hover:opacity-100" />
              </a>
            </div>
          </div>

          <div class="w-1/2 px-4 sm:w-1/3 md:w-1/4 lg:w-1/6">
            <div class="mb-5 text-center">
              <a href="javascript:void(0)" class="block">
                <img src="images/client-04.svg" alt="client"
                  class="mx-auto max-w-full opacity-[65%] hover:opacity-100" />
              </a>
            </div>
          </div>

          <div class="w-1/2 px-4 sm:w-1/3 md:w-1/4 lg:w-1/6">
            <div class="mb-5 text-center">
              <a href="javascript:void(0)" class="block">
                <img src="images/client-05.svg" alt="client"
                  class="mx-auto max-w-full opacity-[65%] hover:opacity-100" />
              </a>
            </div>
          </div>

          <div class="w-1/2 px-4 sm:w-1/3 md:w-1/4 lg:w-1/6">
            <div class="mb-5 text-center">
              <a href="javascript:void(0)" class="block">
                <img src="images/client-06.svg" alt="client"
                  class="mx-auto max-w-full opacity-[65%] hover:opacity-100" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <!-- ======= Clients End ======= -->

    <!-- ======= Contact Start ======= -->
    <section id="support" class="pt-[100px] pb-[110px]">
      <div class="container">
        <div class="wow fadeInUp mx-auto mb-10 max-w-[690px] text-center" data-wow-delay=".2s">
          <h2 class="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            Request a Demo
          </h2>
          <p class="text-base text-body">
            See Bookie Buddy in action! Manage customers, expenses, and stock with ease.
          </p>
        </div>
      </div>

      <div class="container">
        <div
          class="wow fadeInUp mx-auto w-full max-w-[925px] rounded-lg bg-[#F8FAFB] px-8 py-10 shadow-card dark:bg-[#15182B] dark:shadow-card-dark sm:px-10"
          data-wow-delay=".3s">
          <form onsubmit="sendToWhatsApp(event); return false;">
            <div class="-mx-[22px] flex flex-wrap">
              <div class="w-full px-[22px] md:w-1/2">
                <div class="mb-8">
                  <input type="text" name="name" id="name" placeholder="Enter your name"
                    class="w-full rounded border border-stroke bg-white py-4 px-[30px] text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary"
                    required>
                </div>
              </div>

              <div class="w-full px-[22px] md:w-1/2">
                <div class="mb-8">
                  <input type="text" name="Business" id="Business" placeholder="Business name"
                    class="w-full rounded border border-stroke bg-white py-4 px-[30px] text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary"
                    required>
                </div>
              </div>

              <div class="w-full px-[22px] md:w-1/2">
                <div class="mb-8">
                  <input type="tel" name="phone" id="phone" placeholder="Enter your Phone Number"
                    class="w-full rounded border border-stroke bg-white py-4 px-[30px] text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary"
                    pattern="[6-9][0-9]{9}" title="Please enter a valid 10-digit Indian phone number" required
                    minlength="10" maxlength="10">
                </div>
              </div>

              <div class="w-full px-[22px]  md:w-1/2">
                <div class="mb-8">
                  <select name="source" id="source"
                    class="w-full rounded border border-stroke bg-white py-4 px-[30px] text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary"
                    class="w-full rounded border border-stroke bg-white py-4 px-[30px] text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary">
                    <option value="" disabled selected>How Did You Hear About Us?</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Friend Referral">Friend Referral</option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div class="w-full px-[22px]">
                <div class="text-center">
                  <button type="submit"
                    class="inline-block rounded-md bg-primary py-[14px] px-11 text-base font-medium text-white hover:bg-opacity-90">
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    <!-- ======= Contact End ======= -->
  </main>
  <!-- ======= Main End ======= -->

  <!-- ======= Footer Start ======= -->
  <footer>
    <div class="bg-[#F8FAFB] pb-14 dark:bg-[#15182A]">
      <div class="container max-w-[1390px]">
        <div class="-mx-4 flex flex-wrap items-center justify-between md:flex-row flex-col">

          <!-- Navigation Links (Always Centered) -->
          <div class="px-4 flex-1 order-1">
            <div class="wow fadeInUp text-center" data-wow-delay=".3s">
              <ul class="flex justify-center flex-wrap" style="gap: 16px;">
                <li>
                  <a href="https://aibakventures.com" target="_blank"
                    class="inline-block text-base text-body hover:text-primary">
                    Company
                  </a>
                </li>
                <li>
                  <a href="https://www.aibakventures.com/careers.html" target="_blank"
                    class="inline-block text-base text-body hover:text-primary">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#pricing" class="inline-block text-base text-body hover:text-primary">
                    Price plan
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Logos (Below Links in Mobile) -->
          <div class="flex justify-between w-full mt-4 md:w-auto md:mt-0 order-2">
            <!-- Logo at the Start -->
            <div class="px-4">
              <a href="index.html" class="inline-block">
                <img src="images/logo.svg" alt="logo" class="block max-w-[100px] dark:hidden" />
              </a>
            </div>

            <!-- Logo at the End -->
            <div class="px-4">
              <a href="index.html" class="inline-block">
                <img src="images/aibak_logo.svg" alt="logo" class="block max-w-[145px] dark:hidden" />
              </a>
            </div>
          </div>



        </div>
        <p class="text-body text-center text-sm ">
          Developed by <a href="https://aibakventures.com" target="_blank" class="text-primary">Aibak ventures</a>
        </p>
      </div>
    </div>

    <div class="wow fadeInUp bg-primary py-7 dark:bg-black" data-wow-delay=".2s">
      <div class="container max-w-[1390px]">
        <div class="-mx-3 flex flex-wrap">
          <div class="order-last w-full px-3 lg:order-first lg:w-1/3">
            <p class="mt-4 text-center text-base text-white lg:mt-0 lg:text-left">
              &copy; 2025 Bookie buddy. All rights reserved
            </p>
          </div>

          <div class="w-full px-3 md:w-1/2 lg:w-1/3">
            <div class="mb-4 flex items-center justify-center space-x-5 md:mb-0 md:justify-start lg:justify-center">
              <a href="https://www.facebook.com/share/1VY5mUNeK7/?mibextid=wwXIfr" target="_blank"
                class="text-white opacity-70 hover:opacity-100" name="social icon" aria-label="social icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_53_163)">
                    <path
                      d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"
                      fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_53_163">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>


              <a href="https://www.instagram.com/bookie_buddy" target="_blank"
                class="text-white opacity-70 hover:opacity-100" name="social icon" aria-label="Instagram icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 2C4.24 2 2 4.24 2 7V17C2 19.76 4.24 22 7 22H17C19.76 22 22 19.76 22 17V7C22 4.24 19.76 2 17 2H7ZM7 4H17C18.66 4 20 5.34 20 7V17C20 18.66 18.66 20 17 20H7C5.34 20 4 18.66 4 17V7C4 5.34 5.34 4 7 4ZM17.5 6.5C16.67 6.5 16 7.17 16 8C16 8.83 16.67 9.5 17.5 9.5C18.33 9.5 19 8.83 19 8C19 7.17 18.33 6.5 17.5 6.5ZM12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9Z"
                    fill="white" />
                </svg>
              </a>

              <a href="https://wa.me/919744898185" target="_blank" class="text-white opacity-70 hover:opacity-100"
                name="social icon" aria-label="social icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3.5 12C3.5 7.3056 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.3056 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.7713 20.0182 7.458 19.1861C7.2136 19.0313 6.9141 18.9899 6.6368 19.0726L3.7577 19.9319L4.8417 17.3953C4.9699 17.0955 4.9438 16.7521 4.7719 16.4751C3.9657 15.176 3.5 13.6439 3.5 12ZM12 1.5C6.201 1.5 1.5 6.201 1.5 12C1.5 13.8381 1.9732 15.5683 2.8046 17.0727L1.0805 21.107C0.928 21.4637 0.9956 21.8763 1.2538 22.1657C1.512 22.4552 1.9143 22.5692 2.286 22.4582L6.7854 21.1155C8.3225 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.201 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.764 12.1433 9.3761 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.9453 10.447 9.5303L9.3828 7.5303C9.2395 7.261 8.9812 7.0718 8.6811 7.0165C8.3811 6.9613 8.0723 7.046 7.8425 7.2466L7.527 7.5219C6.7682 8.1841 6.3195 9.2723 6.6914 10.3741C7.077 11.5163 7.8998 13.314 9.5855 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z"
                    fill="white" />
                </svg>
              </a>
            </div>
          </div>

          <div class="w-full px-3 md:w-1/2 lg:w-1/3">
            <div class="flex items-center justify-center space-x-4 sm:space-x-8 md:justify-end lg:justify-end">
              <a href="https://www.termsfeed.com/live/e9045109-cea9-4b40-a8b3-8c300091002e" target="_blank"
                class="text-base text-white">
                Privacy Policy
              </a>
              <a href="javascript:void(0)" target="_blank" class="text-base text-white">
                Terms and conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- ======= Footer End ======= -->

  <!-- ======= WhatsApp Float Start ======= -->
  <a href="https://wa.me/919744898185?text=Hello%20Buddy team!" target="_blank" class="whatsapp-float">
    <div class="wave-circle"></div>
    <div class="wave-circle"></div>
    <div class="wave-circle"></div>
    <div class="notification-badge">1</div>
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z"
        fill="white"></path>
      <path
        d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z"
        fill="white"></path>
    </svg>
  </a>

  <!-- ======= WhatsApp Float End ======= -->

  <!-- ======= Back To Top Start ======= -->
  <a href="javascript:void(0)"
    class="back-to-top fixed bottom-8 right-8 left-auto z-[999] hidden h-10 w-10 items-center justify-center rounded-md bg-primary text-white shadow-md duration-300 ease-in-out hover:bg-opacity-80">
    <span class="mt-[6px] h-3 w-3 rotate-45 border-t border-l border-white"></span>
  </a>
  <!-- ======= Back To Top End ======= -->

  <!-- ======= JS Files ======= -->
  <script>
    // ==== pricing plan toggler
    let togglePlan = document.querySelector("#togglePlan");

    document.querySelector(".monthly").addEventListener("click", () => {
      togglePlan.checked = true;
    });
    document.querySelector(".yearly").addEventListener("click", () => {
      togglePlan.checked = false;
    });

    // ==== for menu scroll
    const pageLink = document.querySelectorAll(".menu-scroll");

    pageLink.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(elem.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
          offsetTop: 1 - 60,
        });
      });
    });

    // section menu active
    function onScroll(event) {
      const sections = document.querySelectorAll(".menu-scroll");
      const scrollPos =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      for (let i = 0; i < sections.length; i++) {
        const currLink = sections[i];
        const val = currLink.getAttribute("href");
        const refElement = document.querySelector(val);
        const scrollTopMinus = scrollPos + 73;
        if (
          refElement.offsetTop <= scrollTopMinus &&
          refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
        ) {
          document.querySelector(".menu-scroll").classList.remove("active");
          currLink.classList.add("active");
        } else {
          currLink.classList.remove("active");
        }
      }
    }

    window.document.addEventListener("scroll", onScroll);

    function initAcc(elem, option) {
      document.addEventListener("click", function (e) {
        if (!e.target.matches(elem + " .faq-btn")) return;
        else {
          if (!e.target.parentElement.classList.contains("active")) {
            if (option == true) {
              var elementList = document.querySelectorAll(elem + " .faq");
              Array.prototype.forEach.call(elementList, function (e) {
                e.classList.remove("active");
              });
            }
            e.target.parentElement.classList.add("active");
          } else {
            e.target.parentElement.classList.remove("active");
          }
        }
      });
    }

    //activate accordion function
    initAcc(".faqs", true);
  </script>
  <script defer src="bundle.js"></script>
  <script>(function () { function c() { var b = a.contentDocument || a.contentWindow.document; if (b) { var d = b.createElement('script'); d.innerHTML = "window.__CF$cv$params={r:'92676b1b0a307ab9',t:'MTc0MzAwMDE4Ni4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);"; b.getElementsByTagName('head')[0].appendChild(d) } } if (document.body) { var a = document.createElement('iframe'); a.height = 1; a.width = 1; a.style.position = 'absolute'; a.style.top = 0; a.style.left = 0; a.style.border = 'none'; a.style.visibility = 'hidden'; document.body.appendChild(a); if ('loading' !== document.readyState) c(); else if (window.addEventListener) document.addEventListener('DOMContentLoaded', c); else { var e = document.onreadystatechange || function () { }; document.onreadystatechange = function (b) { e(b); 'loading' !== document.readyState && (document.onreadystatechange = e, c()) } } } })();</script>
  <script>
    function sendToWhatsApp(e) {
      e.preventDefault();

      // Get form values
      const name = encodeURIComponent(document.getElementById('name').value);
      const business = encodeURIComponent(document.getElementById('Business').value);
      const phone = encodeURIComponent(document.getElementById('phone').value);
      const source = encodeURIComponent(document.getElementById('source').value);

      // Create WhatsApp message
      const message = `New Demo Request:%0A%0A
    Name: ${name}%0A
    Business: ${business}%0A
    Phone: ${phone}%0A
    Heard About Us From: ${source}`;

      // Replace with your WhatsApp number in international format
      const whatsappUrl = `https://wa.me/919744898185?text=${message}`;

      // Open in new window
      window.open(whatsappUrl, '_blank');
    }
  </script>

  <!-- scroll down -->
  <script>
    function scrollDown() {
      window.scrollBy({
        top: 410,
        behavior: 'smooth'
      });
    }

    window.addEventListener('scroll', function () {
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0.3';
      } else {
        scrollIndicator.style.opacity = '1';
      }
    });

  </script>

  <!-- triangle-bg -->
  <script>
    const triangle = document.getElementById('triangle-bg');
    const section = document.getElementById('testimonials');
    let lastScrollY = window.scrollY;
    let rotation = 0;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? -0.5 : 0.5;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      // Check if current scroll is within the section's vertical range
      if (
        currentScrollY + windowHeight >= sectionTop &&
        currentScrollY <= sectionTop + sectionHeight
      ) {
        rotation += direction * 1.7;
        triangle.style.transform = `rotate(${rotation}deg) translateX(-50%)`;
      }

      lastScrollY = currentScrollY;
    });


    //rolling testimonials cards
    document.addEventListener('DOMContentLoaded', function () {
      const container = document.getElementById('scrollContainer');
      const wrapper = document.querySelector('.testimonials-scroll-wrapper');
      const cards = document.querySelectorAll('.testimonial-card');

      // Calculate total width needed
      const cardWidth = cards[0].offsetWidth + 32; // width + gap
      const totalWidth = cardWidth * cards.length;

      // Set container width to accommodate all cards
      container.style.width = `${totalWidth}px`;

      let normalSpeed = 2;
      let slowSpeed = 0.9;
      let currentSpeed = normalSpeed;
      let scrollPosition = 0;
      let requestId;

      function animateScroll() {
        scrollPosition += currentSpeed;

        // Reset position when scrolled halfway (since we duplicated the content)
        if (scrollPosition >= totalWidth / 2) {
          scrollPosition = 0;
        }

        container.style.transform = `translateX(-${scrollPosition}px)`;
        requestId = requestAnimationFrame(animateScroll);
      }

      // Start animation
      animateScroll();

      // Slow down on hover
      wrapper.addEventListener('mouseenter', () => {
        currentSpeed = slowSpeed;
      });

      wrapper.addEventListener('mouseleave', () => {
        currentSpeed = normalSpeed;
      });
    });





  </script>

  <!-- Rolling text animation -->
  <script src="js/rolling-text.js"></script>

</body>

</html>

style.css
/*!***************************************************************************************************************!*\
  !*** css ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/css/style.css ***!
  \***************************************************************************************************************/
@import url(https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap);

/*!***********************************************************************************************************************************************!*\
  !*** css ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/glightbox/dist/css/glightbox.min.css ***!
  \***********************************************************************************************************************************************/
.glightbox-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999 !important;
  overflow: hidden;
  touch-action: none;
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-size-adjust: 100%;
  backface-visibility: hidden;
  outline: 0;
}

.glightbox-container.inactive {
  display: none;
}

.glightbox-container .gcontainer {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 9999;
  overflow: hidden;
}

.glightbox-container .gslider {
  transition: transform 0.4s ease;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex !important;
  justify-content: center;
  align-items: center;
  transform: translate3d(0, 0, 0);
}

.glightbox-container .gslide {
  width: 100%;
  position: absolute;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}

/* Button Styling */
.border-glow {
  position: relative;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  color: white;
  background-color: transparent;
  border: none;
  z-index: 10;
  overflow: hidden;
}

/* Multi-Color Animated Border */
.border-glow::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 8px;
  padding: 3px;
  background: linear-gradient(270deg,
      #f473ff,
      #ffdfff,
      #8d8dff,
      #6eb7b7,
      #a4ffa4,
      #baba36,
      #ffdc9b,
      #ff8383);
  background-size: 300% 300%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: exclude;
  mask-composite: exclude;
  z-index: -1;
  animation: borderRun 3s linear infinite;
}

/* Running Border Animation - Counterclockwise */
@keyframes borderRun {
  0% {
    background-position: 100% 50%;
  }

  50% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
}

/* Glowing Effect */
.border-glow:hover::before {
  /* Glow effect on hover */
}

.glightbox-container .gslide.current {
  opacity: 1;
  z-index: 99999;
  position: relative;
}

.glightbox-container .gslide.prev {
  opacity: 1;
  z-index: 9999;
}

.glightbox-container .gslide-inner-content {
  width: 100%;
}

.glightbox-container .ginner-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 100%;
  margin: auto;
  height: 100vh;
}

.glightbox-container .ginner-container.gvideo-container {
  width: 100%;
}

.glightbox-container .ginner-container.desc-bottom,
.glightbox-container .ginner-container.desc-top {
  flex-direction: column;
}

.glightbox-container .ginner-container.desc-left,
.glightbox-container .ginner-container.desc-right {
  max-width: 100% !important;
}

.gslide iframe,
.gslide video {
  outline: 0 !important;
  border: none;
  min-height: 165px;
  -webkit-overflow-scrolling: touch;
  touch-action: auto;
}

.gslide:not(.current) {
  pointer-events: none;
}

.gslide-image {
  align-items: center;
}

.gslide-image img {
  max-height: 100vh;
  display: block;
  padding: 0;
  float: none;
  outline: 0;
  border: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  max-width: 100vw;
  width: auto;
  height: auto;
  -o-object-fit: cover;
  object-fit: cover;
  touch-action: none;
  margin: auto;
  min-width: 200px;
}

.desc-bottom .gslide-image img,
.desc-top .gslide-image img {
  width: auto;
}

.desc-left .gslide-image img,
.desc-right .gslide-image img {
  width: auto;
  max-width: 100%;
}

.gslide-image img.zoomable {
  position: relative;
}

.gslide-image img.dragging {
  cursor: grabbing !important;
  transition: none;
}

.gslide-video {
  position: relative;
  max-width: 100vh;
  width: 100% !important;
}

.gslide-video .plyr__poster-enabled.plyr--loading .plyr__poster {
  display: none;
}

.gslide-video .gvideo-wrapper {
  width: 100%;
  margin: auto;
}

.gslide-video::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 0, 0, 0.34);
  display: none;
}

.gslide-video.playing::before {
  display: none;
}

.gslide-video.fullscreen {
  max-width: 100% !important;
  min-width: 100%;
  height: 75vh;
}

.gslide-video.fullscreen video {
  max-width: 100% !important;
  width: 100% !important;
}

.gslide-inline {
  background: #fff;
  text-align: left;
  max-height: calc(100vh - 40px);
  overflow: auto;
  max-width: 100%;
  margin: auto;
}

.gslide-inline .ginlined-content {
  padding: 20px;
  width: 100%;
}

.gslide-inline .dragging {
  cursor: grabbing !important;
  transition: none;
}

.ginlined-content {
  overflow: auto;
  display: block !important;
  opacity: 1;
}

.gslide-external {
  display: flex;
  width: 100%;
  min-width: 100%;
  background: #fff;
  padding: 0;
  overflow: auto;
  max-height: 75vh;
  height: 100%;
}

.gslide-media {
  display: flex;
  width: auto;
}

.zoomed .gslide-media {
  box-shadow: none !important;
}

.desc-bottom .gslide-media,
.desc-top .gslide-media {
  margin: 0 auto;
  flex-direction: column;
}

.gslide-description {
  position: relative;
  flex: 1 0 100%;
}

.gslide-description.description-left,
.gslide-description.description-right {
  max-width: 100%;
}

.gslide-description.description-bottom,
.gslide-description.description-top {
  margin: 0 auto;
  width: 100%;
}

.gslide-description p {
  margin-bottom: 12px;
}

.gslide-description p:last-child {
  margin-bottom: 0;
}

.zoomed .gslide-description {
  display: none;
}

.glightbox-button-hidden {
  display: none;
}

.glightbox-mobile .glightbox-container .gslide-description {
  height: auto !important;
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 19px 11px;
  max-width: 100vw !important;
  order: 2 !important;
  max-height: 78vh;
  overflow: auto !important;
  background: linear-gradient(to bottom,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.75) 100%);
  transition: opacity 0.3s linear;
  padding-bottom: 50px;
}

.glightbox-mobile .glightbox-container .gslide-title {
  color: #fff;
  font-size: 1em;
}

.glightbox-mobile .glightbox-container .gslide-desc {
  color: #a1a1a1;
}

.glightbox-mobile .glightbox-container .gslide-desc a {
  color: #fff;
  font-weight: 700;
}

.glightbox-mobile .glightbox-container .gslide-desc * {
  color: inherit;
}

.glightbox-mobile .glightbox-container .gslide-desc .desc-more {
  color: #fff;
  opacity: 0.4;
}

.gdesc-open .gslide-media {
  transition: opacity 0.5s ease;
  opacity: 0.4;
}

.gdesc-open .gdesc-inner {
  padding-bottom: 30px;
}

.gdesc-closed .gslide-media {
  transition: opacity 0.5s ease;
  opacity: 1;
}

.greset {
  transition: all 0.3s ease;
}

.gabsolute {
  position: absolute;
}

.grelative {
  position: relative;
}

.glightbox-desc {
  display: none !important;
}

.glightbox-open {
  overflow: hidden;
}

.gloader {
  height: 25px;
  width: 25px;
  animation: lightboxLoader 0.8s infinite linear;
  border: 2px solid #fff;
  border-right-color: transparent;
  border-radius: 50%;
  position: absolute;
  display: block;
  z-index: 9999;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 47%;
}

.goverlay {
  width: 100%;
  height: calc(100vh + 1px);
  position: fixed;
  top: -1px;
  left: 0;
  background: #000;
  will-change: opacity;
}

.glightbox-mobile .goverlay {
  background: #000;
}

.gclose,
.gnext,
.gprev {
  z-index: 99999;
  cursor: pointer;
  width: 26px;
  height: 44px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.gclose svg,
.gnext svg,
.gprev svg {
  display: block;
  width: 25px;
  height: auto;
  margin: 0;
  padding: 0;
}

.gclose.disabled,
.gnext.disabled,
.gprev.disabled {
  opacity: 0.1;
}

.gclose .garrow,
.gnext .garrow,
.gprev .garrow {
  stroke: #fff;
}

.gbtn.focused {
  outline: 2px solid #0f3d81;
}

iframe.wait-autoplay {
  opacity: 0;
}

.glightbox-closing .gclose,
.glightbox-closing .gnext,
.glightbox-closing .gprev {
  opacity: 0 !important;
}

.glightbox-clean .gslide-description {
  background: #fff;
}

.glightbox-clean .gdesc-inner {
  padding: 22px 20px;
}

.glightbox-clean .gslide-title {
  font-size: 1em;
  font-weight: 400;
  font-family: arial;
  color: #000;
  margin-bottom: 19px;
  line-height: 1.4em;
}

.glightbox-clean .gslide-desc {
  font-size: 0.86em;
  margin-bottom: 0;
  font-family: arial;
  line-height: 1.4em;
}

.glightbox-clean .gslide-video {
  background: #000;
}

.glightbox-clean .gclose,
.glightbox-clean .gnext,
.glightbox-clean .gprev {
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 4px;
}

.glightbox-clean .gclose path,
.glightbox-clean .gnext path,
.glightbox-clean .gprev path {
  fill: #fff;
}

.glightbox-clean .gprev {
  position: absolute;
  top: -100%;
  left: 30px;
  width: 40px;
  height: 50px;
}

.glightbox-clean .gnext {
  position: absolute;
  top: -100%;
  right: 30px;
  width: 40px;
  height: 50px;
}

.glightbox-clean .gclose {
  width: 35px;
  height: 35px;
  top: 15px;
  right: 10px;
  position: absolute;
}

.glightbox-clean .gclose svg {
  width: 18px;
  height: auto;
}

.glightbox-clean .gclose:hover {
  opacity: 1;
}

.gfadeIn {
  animation: gfadeIn 0.5s ease;
}

.gfadeOut {
  animation: gfadeOut 0.5s ease;
}

.gslideOutLeft {
  animation: gslideOutLeft 0.3s ease;
}

.gslideInLeft {
  animation: gslideInLeft 0.3s ease;
}

.gslideOutRight {
  animation: gslideOutRight 0.3s ease;
}

.gslideInRight {
  animation: gslideInRight 0.3s ease;
}

.gzoomIn {
  animation: gzoomIn 0.5s ease;
}

.gzoomOut {
  animation: gzoomOut 0.5s ease;
}

@keyframes lightboxLoader {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes gfadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes gfadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes gslideInLeft {
  from {
    opacity: 0;
    transform: translate3d(-60%, 0, 0);
  }

  to {
    visibility: visible;
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes gslideOutLeft {
  from {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(-60%, 0, 0);
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes gslideInRight {
  from {
    opacity: 0;
    visibility: visible;
    transform: translate3d(60%, 0, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes gslideOutRight {
  from {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(60%, 0, 0);
    opacity: 0;
  }
}

@keyframes gzoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  to {
    opacity: 1;
  }
}

@keyframes gzoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  to {
    opacity: 0;
  }
}

@media (min-width: 769px) {
  .glightbox-container .ginner-container {
    width: auto;
    height: auto;
    flex-direction: row;
  }

  .glightbox-container .ginner-container.desc-top .gslide-description {
    order: 0;
  }

  .glightbox-container .ginner-container.desc-top .gslide-image,
  .glightbox-container .ginner-container.desc-top .gslide-image img {
    order: 1;
  }

  .glightbox-container .ginner-container.desc-left .gslide-description {
    order: 0;
  }

  .glightbox-container .ginner-container.desc-left .gslide-image {
    order: 1;
  }

  .gslide-image img {
    max-height: 97vh;
    max-width: 100%;
  }

  .gslide-image img.zoomable {
    cursor: zoom-in;
  }

  .zoomed .gslide-image img.zoomable {
    cursor: grab;
  }

  .gslide-inline {
    max-height: 95vh;
  }

  .gslide-external {
    max-height: 100vh;
  }

  .gslide-description.description-left,
  .gslide-description.description-right {
    max-width: 275px;
  }

  .glightbox-open {
    height: auto;
  }

  .goverlay {
    background: rgba(0, 0, 0, 0.92);
  }

  .glightbox-clean .gslide-media {
    box-shadow: 1px 2px 9px 0 rgba(0, 0, 0, 0.65);
  }

  .glightbox-clean .description-left .gdesc-inner,
  .glightbox-clean .description-right .gdesc-inner {
    position: absolute;
    height: 100%;
    overflow-y: auto;
  }

  .glightbox-clean .gclose,
  .glightbox-clean .gnext,
  .glightbox-clean .gprev {
    background-color: rgba(0, 0, 0, 0.32);
  }

  .glightbox-clean .gclose:hover,
  .glightbox-clean .gnext:hover,
  .glightbox-clean .gprev:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .glightbox-clean .gprev {
    top: 45%;
  }

  .glightbox-clean .gnext {
    top: 45%;
  }
}

@media (min-width: 992px) {
  .glightbox-clean .gclose {
    opacity: 0.7;
    right: 20px;
  }
}

@media screen and (max-height: 420px) {
  .goverlay {
    background: #000;
  }
}

/*!********************************************************************************************************************************!*\
  !*** css ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/swiper/swiper.min.css ***!
  \********************************************************************************************************************************/
/**
 * Swiper 8.4.4
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2022 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: October 12, 2022
 */

@font-face {
  font-family: swiper-icons;
  src: url("data:application/font-woff;charset=utf-8;base64, d09GRgABAAAAAAZgABAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAGRAAAABoAAAAci6qHkUdERUYAAAWgAAAAIwAAACQAYABXR1BPUwAABhQAAAAuAAAANuAY7+xHU1VCAAAFxAAAAFAAAABm2fPczU9TLzIAAAHcAAAASgAAAGBP9V5RY21hcAAAAkQAAACIAAABYt6F0cBjdnQgAAACzAAAAAQAAAAEABEBRGdhc3AAAAWYAAAACAAAAAj//wADZ2x5ZgAAAywAAADMAAAD2MHtryVoZWFkAAABbAAAADAAAAA2E2+eoWhoZWEAAAGcAAAAHwAAACQC9gDzaG10eAAAAigAAAAZAAAArgJkABFsb2NhAAAC0AAAAFoAAABaFQAUGG1heHAAAAG8AAAAHwAAACAAcABAbmFtZQAAA/gAAAE5AAACXvFdBwlwb3N0AAAFNAAAAGIAAACE5s74hXjaY2BkYGAAYpf5Hu/j+W2+MnAzMYDAzaX6QjD6/4//Bxj5GA8AuRwMYGkAPywL13jaY2BkYGA88P8Agx4j+/8fQDYfA1AEBWgDAIB2BOoAeNpjYGRgYNBh4GdgYgABEMnIABJzYNADCQAACWgAsQB42mNgYfzCOIGBlYGB0YcxjYGBwR1Kf2WQZGhhYGBiYGVmgAFGBiQQkOaawtDAoMBQxXjg/wEGPcYDDA4wNUA2CCgwsAAAO4EL6gAAeNpj2M0gyAACqxgGNWBkZ2D4/wMA+xkDdgAAAHjaY2BgYGaAYBkGRgYQiAHyGMF8FgYHIM3DwMHABGQrMOgyWDLEM1T9/w8UBfEMgLzE////P/5//f/V/xv+r4eaAAeMbAxwIUYmIMHEgKYAYjUcsDAwsLKxc3BycfPw8jEQA/gZBASFhEVExcQlJKWkZWTl5BUUlZRVVNXUNTQZBgMAAMR+E+gAEQFEAAAAKgAqACoANAA+AEgAUgBcAGYAcAB6AIQAjgCYAKIArAC2AMAAygDUAN4A6ADyAPwBBgEQARoBJAEuATgBQgFMAVYBYAFqAXQBfgGIAZIBnAGmAbIBzgHsAAB42u2NMQ6CUAyGW568x9AneYYgm4MJbhKFaExIOAVX8ApewSt4Bic4AfeAid3VOBixDxfPYEza5O+Xfi04YADggiUIULCuEJK8VhO4bSvpdnktHI5QCYtdi2sl8ZnXaHlqUrNKzdKcT8cjlq+rwZSvIVczNiezsfnP/uznmfPFBNODM2K7MTQ45YEAZqGP81AmGGcF3iPqOop0r1SPTaTbVkfUe4HXj97wYE+yNwWYxwWu4v1ugWHgo3S1XdZEVqWM7ET0cfnLGxWfkgR42o2PvWrDMBSFj/IHLaF0zKjRgdiVMwScNRAoWUoH78Y2icB/yIY09An6AH2Bdu/UB+yxopYshQiEvnvu0dURgDt8QeC8PDw7Fpji3fEA4z/PEJ6YOB5hKh4dj3EvXhxPqH/SKUY3rJ7srZ4FZnh1PMAtPhwP6fl2PMJMPDgeQ4rY8YT6Gzao0eAEA409DuggmTnFnOcSCiEiLMgxCiTI6Cq5DZUd3Qmp10vO0LaLTd2cjN4fOumlc7lUYbSQcZFkutRG7g6JKZKy0RmdLY680CDnEJ+UMkpFFe1RN7nxdVpXrC4aTtnaurOnYercZg2YVmLN/d/gczfEimrE/fs/bOuq29Zmn8tloORaXgZgGa78yO9/cnXm2BpaGvq25Dv9S4E9+5SIc9PqupJKhYFSSl47+Qcr1mYNAAAAeNptw0cKwkAAAMDZJA8Q7OUJvkLsPfZ6zFVERPy8qHh2YER+3i/BP83vIBLLySsoKimrqKqpa2hp6+jq6RsYGhmbmJqZSy0sraxtbO3sHRydnEMU4uR6yx7JJXveP7WrDycAAAAAAAH//wACeNpjYGRgYOABYhkgZgJCZgZNBkYGLQZtIJsFLMYAAAw3ALgAeNolizEKgDAQBCchRbC2sFER0YD6qVQiBCv/H9ezGI6Z5XBAw8CBK/m5iQQVauVbXLnOrMZv2oLdKFa8Pjuru2hJzGabmOSLzNMzvutpB3N42mNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB42mNgYGBkAIIbCZo5IPrmUn0hGA0AO8EFTQAA");
  font-weight: 400;
  font-style: normal;
}

:root {
  --swiper-theme-color: #007aff;
}

.swiper {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
}

.swiper-vertical>.swiper-wrapper {
  flex-direction: column;
}

.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
}

.swiper-android .swiper-slide,
.swiper-wrapper {
  transform: translate3d(0px, 0, 0);
}

.swiper-pointer-events {
  touch-action: pan-y;
}

.swiper-pointer-events.swiper-vertical {
  touch-action: pan-x;
}

.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: transform;
}

.swiper-slide-invisible-blank {
  visibility: hidden;
}

.swiper-autoheight,
.swiper-autoheight .swiper-slide {
  height: auto;
}

.swiper-autoheight .swiper-wrapper {
  align-items: flex-start;
  transition-property: transform, height;
}

.swiper-backface-hidden .swiper-slide {
  transform: translateZ(0);
  backface-visibility: hidden;
}

.swiper-3d,
.swiper-3d.swiper-css-mode .swiper-wrapper {
  perspective: 1200px;
}

.swiper-3d .swiper-cube-shadow,
.swiper-3d .swiper-slide,
.swiper-3d .swiper-slide-shadow,
.swiper-3d .swiper-slide-shadow-bottom,
.swiper-3d .swiper-slide-shadow-left,
.swiper-3d .swiper-slide-shadow-right,
.swiper-3d .swiper-slide-shadow-top,
.swiper-3d .swiper-wrapper {
  transform-style: preserve-3d;
}

.swiper-3d .swiper-slide-shadow,
.swiper-3d .swiper-slide-shadow-bottom,
.swiper-3d .swiper-slide-shadow-left,
.swiper-3d .swiper-slide-shadow-right,
.swiper-3d .swiper-slide-shadow-top {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.swiper-3d .swiper-slide-shadow {
  background: rgba(0, 0, 0, 0.15);
}

.swiper-3d .swiper-slide-shadow-left {
  background-image: linear-gradient(to left,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0));
}

.swiper-3d .swiper-slide-shadow-right {
  background-image: linear-gradient(to right,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0));
}

.swiper-3d .swiper-slide-shadow-top {
  background-image: linear-gradient(to top,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0));
}

.swiper-3d .swiper-slide-shadow-bottom {
  background-image: linear-gradient(to bottom,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0));
}

.swiper-css-mode>.swiper-wrapper {
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.swiper-css-mode>.swiper-wrapper::-webkit-scrollbar {
  display: none;
}

.swiper-css-mode>.swiper-wrapper>.swiper-slide {
  scroll-snap-align: start start;
}

.swiper-horizontal.swiper-css-mode>.swiper-wrapper {
  -ms-scroll-snap-type: x mandatory;
  scroll-snap-type: x mandatory;
}

.swiper-vertical.swiper-css-mode>.swiper-wrapper {
  -ms-scroll-snap-type: y mandatory;
  scroll-snap-type: y mandatory;
}

.swiper-centered>.swiper-wrapper::before {
  content: "";
  flex-shrink: 0;
  order: 9999;
}

.swiper-centered.swiper-horizontal>.swiper-wrapper>.swiper-slide:first-child {
  -webkit-margin-start: var(--swiper-centered-offset-before);
  margin-inline-start: var(--swiper-centered-offset-before);
}

.swiper-centered.swiper-horizontal>.swiper-wrapper::before {
  height: 100%;
  min-height: 1px;
  width: var(--swiper-centered-offset-after);
}

.swiper-centered.swiper-vertical>.swiper-wrapper>.swiper-slide:first-child {
  -webkit-margin-before: var(--swiper-centered-offset-before);
  margin-block-start: var(--swiper-centered-offset-before);
}

.swiper-centered.swiper-vertical>.swiper-wrapper::before {
  width: 100%;
  min-width: 1px;
  height: var(--swiper-centered-offset-after);
}

.swiper-centered>.swiper-wrapper>.swiper-slide {
  scroll-snap-align: center center;
}

/*!*******************************************************************************************************************************************************!*\
  !*** css ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/swiper/modules/pagination/pagination.min.css ***!
  \*******************************************************************************************************************************************************/
.swiper-pagination {
  position: absolute;
  text-align: center;
  transition: 0.3s opacity;
  transform: translate3d(0, 0, 0);
  z-index: 10;
}

.swiper-pagination.swiper-pagination-hidden {
  opacity: 0;
}

.swiper-pagination-disabled>.swiper-pagination,
.swiper-pagination.swiper-pagination-disabled {
  display: none !important;
}

.swiper-horizontal>.swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  bottom: 10px;
  left: 0;
  width: 100%;
}

.swiper-pagination-bullets-dynamic {
  overflow: hidden;
  font-size: 0;
}

.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  transform: scale(0.33);
  position: relative;
}

.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active {
  transform: scale(1);
}

.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main {
  transform: scale(1);
}

.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev {
  transform: scale(0.66);
}

.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev {
  transform: scale(0.33);
}

.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next {
  transform: scale(0.66);
}

.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next {
  transform: scale(0.33);
}

.swiper-pagination-bullet {
  width: var(--swiper-pagination-bullet-width,
      var(--swiper-pagination-bullet-size, 8px));
  height: var(--swiper-pagination-bullet-height,
      var(--swiper-pagination-bullet-size, 8px));
  display: inline-block;
  border-radius: 50%;
  background: var(--swiper-pagination-bullet-inactive-color, #000);
  opacity: var(--swiper-pagination-bullet-inactive-opacity, 0.2);
}

button.swiper-pagination-bullet {
  border: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.swiper-pagination-clickable .swiper-pagination-bullet {
  cursor: pointer;
}

.swiper-pagination-bullet:only-child {
  display: none !important;
}

.swiper-pagination-bullet-active {
  opacity: var(--swiper-pagination-bullet-opacity, 1);
  background: var(--swiper-pagination-color, var(--swiper-theme-color));
}

.swiper-pagination-vertical.swiper-pagination-bullets,
.swiper-vertical>.swiper-pagination-bullets {
  right: 10px;
  top: 50%;
  transform: translate3d(0px, -50%, 0);
}

.swiper-pagination-vertical.swiper-pagination-bullets .swiper-pagination-bullet,
.swiper-vertical>.swiper-pagination-bullets .swiper-pagination-bullet {
  margin: var(--swiper-pagination-bullet-vertical-gap, 6px) 0;
  display: block;
}

.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,
.swiper-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
}

.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,
.swiper-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  display: inline-block;
  transition: 0.2s transform, 0.2s top;
}

.swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,
.swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 4px);
}

.swiper-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,
.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.swiper-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,
.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  transition: 0.2s transform, 0.2s left;
}

.swiper-horizontal.swiper-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  transition: 0.2s transform, 0.2s right;
}

.swiper-pagination-progressbar {
  background: rgba(0, 0, 0, 0.25);
  position: absolute;
}

.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  background: var(--swiper-pagination-color, var(--swiper-theme-color));
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: scale(0);
  transform-origin: left top;
}

.swiper-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  transform-origin: right top;
}

.swiper-horizontal>.swiper-pagination-progressbar,
.swiper-pagination-progressbar.swiper-pagination-horizontal,
.swiper-pagination-progressbar.swiper-pagination-vertical.swiper-pagination-progressbar-opposite,
.swiper-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite {
  width: 100%;
  height: 4px;
  left: 0;
  top: 0;
}

.swiper-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,
.swiper-pagination-progressbar.swiper-pagination-horizontal.swiper-pagination-progressbar-opposite,
.swiper-pagination-progressbar.swiper-pagination-vertical,
.swiper-vertical>.swiper-pagination-progressbar {
  width: 4px;
  height: 100%;
  left: 0;
  top: 0;
}

.swiper-pagination-lock {
  display: none;
}

/*!*****************************************************************************************************************!*\
  !*** css ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/css/animate.css ***!
  \*****************************************************************************************************************/
@charset "UTF-8";

/*!
 * animate.css -https://daneden.github.io/animate.css/
 * Version - 3.7.2
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2019 Daniel Eden
 */

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeIn {
  animation-name: fadeIn;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fadeInDown {
  animation-name: fadeInDown;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-20px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fadeInLeft {
  animation-name: fadeInLeft;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(20px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fadeInRight {
  animation-name: fadeInRight;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fadeInUp {
  animation-name: fadeInUp;
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.animated.infinite {
  animation-iteration-count: infinite;
}

.animated.delay-1s {
  animation-delay: 1s;
}

.animated.delay-2s {
  animation-delay: 2s;
}

.animated.delay-3s {
  animation-delay: 3s;
}

.animated.delay-4s {
  animation-delay: 4s;
}

.animated.delay-5s {
  animation-delay: 5s;
}

.animated.fast {
  animation-duration: 800ms;
}

.animated.faster {
  animation-duration: 500ms;
}

.animated.slow {
  animation-duration: 2s;
}

.animated.slower {
  animation-duration: 3s;
}

@media (print),
(prefers-reduced-motion: reduce) {
  .animated {
    animation-duration: 1ms !important;
    transition-duration: 1ms !important;
    animation-iteration-count: 1 !important;
  }
}

/*!*******************************************************************************************************************!*\
  !*** css ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/css/style.css (1) ***!
  \*******************************************************************************************************************/
/*
! tailwindcss v3.1.8 | MIT License | https://tailwindcss.com
*/

/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box;
  /* 1 */
  border-width: 0;
  /* 2 */
  border-style: solid;
  /* 2 */
  border-color: currentColor;
  /* 2 */
}

::before,
::after {
  --tw-content: "";
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured `sans` font-family by default.
*/

html {
  line-height: 1.5;
  /* 1 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
  -moz-tab-size: 4;
  /* 3 */
  -o-tab-size: 4;
  tab-size: 4;
  /* 3 */
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  /* 4 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.
*/

body {
  margin: 0;
  /* 1 */
  line-height: inherit;
  /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0;
  /* 1 */
  color: inherit;
  /* 2 */
  border-top-width: 1px;
  /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
  text-decoration-line: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured `mono` font family by default.
2. Correct the odd `em` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent `sub` and `sup` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0;
  /* 1 */
  border-color: inherit;
  /* 2 */
  border-collapse: collapse;
  /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  font-weight: inherit;
  /* 1 */
  line-height: inherit;
  /* 1 */
  color: inherit;
  /* 1 */
  margin: 0;
  /* 2 */
  padding: 0;
  /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
  /* 1 */
  background-color: transparent;
  /* 2 */
  background-image: none;
  /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type="search"] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to `inherit` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder,
textarea::-moz-placeholder {
  opacity: 1;
  /* 1 */
  color: #9ca3af;
  /* 2 */
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  opacity: 1;
  /* 1 */
  color: #9ca3af;
  /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
  /* 1 */
  color: #9ca3af;
  /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/

:disabled {
  cursor: default;
}

/*
1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  /* 1 */
  vertical-align: middle;
  /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

body {
  /* font-family: "Inter", sans-serif; */
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
}

*,
::before,
::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
}

.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
}

@media (min-width: 450px) {
  .container {
    max-width: 450px;
  }
}

@media (min-width: 575px) {
  .container {
    max-width: 575px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 992px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1200px;
  }
}

@media (min-width: 1400px) {
  .container {
    max-width: 1400px;
  }
}

@media (min-width: 1500px) {
  .container {
    max-width: 1500px;
  }
}

.sticky-navbar {
  position: fixed !important;
  border-bottom-width: 1px !important;
  --tw-bg-opacity: 0.8 !important;
  --tw-backdrop-blur: blur(4px) !important;
  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia) !important;
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia) !important;
}

.dark .sticky-navbar {
  --tw-bg-opacity: 0.8 !important;
}

.sticky-navbar .menu-scroll.active,
.menu-scroll.active {
  --tw-text-opacity: 1;
  color: rgb(139 71 192 / var(--tw-text-opacity));
}

.dark .sticky-navbar .menu-scroll.active,
.dark .menu-scroll.active {
  --tw-text-opacity: 1;
  color: rgb(139 71 192 / var(--tw-text-opacity));
}

@media (min-width: 992px) {
  .sticky-navbar ul>.menu-item>a {
    padding-top: 21px;
    padding-bottom: 21px;
  }
}

.submenu-item a.active {
  --tw-text-opacity: 1;
  color: rgb(112 131 245 / var(--tw-text-opacity));
}

.dark .submenu-item a.active {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.submenu-item a.active span svg {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

@media (min-width: 992px) {
  .submenu-item a.active span svg {
    --tw-rotate: 0deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}

.container {
  width: 100%;
}

@media (min-width: 575px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

@media (min-width: 1400px) {
  .container {
    max-width: 1320px;
  }
}

.keep-signed:checked~span.box {
  --tw-border-opacity: 1;
  border-color: rgb(112 131 245 / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: rgb(112 131 245 / var(--tw-bg-opacity));
}

.keep-signed:checked~span.box .icon {
  display: block;
}

#togglePlan:checked~span .dot {
  --tw-translate-x: 26px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.faq .faq-btn::after {
  content: "+";
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  --tw-text-opacity: 1;
  color: rgb(24 28 49 / var(--tw-text-opacity));
}

.dark .faq .faq-btn::after {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.faq.active .faq-btn::after {
  content: "-";
}

.faq .faq-content {
  max-height: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  opacity: 0;
  transition-property: all;
  transition-duration: 100ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.faq.active .faq-content {
  max-height: -moz-fit-content;
  max-height: fit-content;
  padding-top: 30px;
  padding-bottom: 30px;
  opacity: 1;
}

.swiper-button-prev,
.swiper-button-next {
  position: static;
  top: auto;
  bottom: 0px;
  display: flex;
  height: 2.5rem;
  width: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border-width: 1px;
  --tw-border-opacity: 1;
  border-color: rgb(121 128 138 / var(--tw-border-opacity));
  --tw-text-opacity: 1;
  color: rgb(121 128 138 / var(--tw-text-opacity));
}

.swiper-button-prev::after,
.swiper-button-next::after {
  content: var(--tw-content);
  display: none;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  --tw-border-opacity: 1;
  border-color: rgb(114 61 125 / var(--tw-border-opacity));
  --tw-bg-opacity: 1;
  background-color: rgb(114 61 125 / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.fixed {
  position: fixed;
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.top-0 {
  top: 0px;
}

.left-0 {
  left: 0px;
}

.right-4 {
  right: 1rem;
}

.top-1\/2 {
  top: 50%;
}

.top-10 {
  top: 2.5rem;
}

.right-10 {
  right: 2.5rem;
}

.bottom-8 {
  bottom: 2rem;
}

.right-8 {
  right: 2rem;
}

.left-auto {
  left: auto;
}

.bottom-0 {
  bottom: 0px;
}

.right-0 {
  right: 0px;
}

.top-5 {
  top: 1.25rem;
}

.bottom-10 {
  bottom: 2.5rem;
}

.-bottom-1\/2 {
  bottom: -50%;
}

.right-5 {
  right: 1.25rem;
}

.left-10 {
  left: 2.5rem;
}

.-top-12 {
  top: -3rem;
}

.top-3 {
  top: 3rem;
}

.top-09 {
  top: 0.9rem;
}

.top-36 {
  top: 9rem;
}

.-top-28 {
  top: -7rem;
}

.top-20 {
  top: 5rem;
}

.-top-5 {
  top: -1.25rem;
}

.-top-\[250px\] {
  top: -250px;
}

.-top-24 {
  top: -6rem;
}

.-bottom-24 {
  bottom: -6rem;
}

.z-50 {
  z-index: 50;
}

.z-\[9999\] {
  z-index: 9999;
}

.z-\[999\] {
  z-index: 999;
}

.z-10 {
  z-index: 10;
}

.-z-10 {
  z-index: -10;
}

.z-20 {
  z-index: 20;
}

.order-last {
  order: 9999;
}

.order-first {
  order: -9999;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.-mx-4 {
  margin-left: -1rem;
  margin-right: -1rem;
}

.-mx-3 {
  margin-left: -0.75rem;
  margin-right: -0.75rem;
}

.-mx-\[10px\] {
  margin-left: -10px;
  margin-right: -10px;
}

.mx-5 {
  margin-left: 1.25rem;
  margin-right: 1.25rem;
}

.mx-10 {
  margin-left: 2.5rem;
  margin-right: 2.5rem;
}

.-mx-6 {
  margin-left: -1.5rem;
  margin-right: -1.5rem;
}

.-mx-\[22px\] {
  margin-left: -22px;
  margin-right: -22px;
}

.-mx-2 {
  margin-left: -0.5rem;
  margin-right: -0.5rem;
}

.-mt-\[2px\] {
  margin-top: -2px;
}

.mr-\[60px\] {
  margin-right: 60px;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mb-\[18px\] {
  margin-bottom: 18px;
}

.mb-\[30px\] {
  margin-bottom: 30px;
}

.mb-11 {
  margin-bottom: 2.75rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-\[6px\] {
  margin-top: 6px;
}

.mb-10 {
  margin-bottom: 2.5rem;
}

.mb-5 {
  margin-bottom: 1.25rem;
}

.mb-9 {
  margin-bottom: 2.25rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mr-3 {
  margin-right: 0.75rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.mt-3 {
  margin-top: 0.75rem;
}

.mt-\[30px\] {
  margin-top: 30px;
}

.mb-12 {
  margin-bottom: 3rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mr-6 {
  margin-right: 1.5rem;
}

.mr-\[18px\] {
  margin-right: 18px;
}

.mr-\[22px\] {
  margin-right: 22px;
}

.mb-14 {
  margin-bottom: 3.5rem;
}

.mb-\[60px\] {
  margin-bottom: 60px;
}

.mb-7 {
  margin-bottom: 1.75rem;
}

.mr-\[10px\] {
  margin-right: 10px;
}

.mt-1 {
  margin-top: 0.25rem;
}

.mt-20 {
  margin-top: 5rem;
}

.mb-\[50px\] {
  margin-bottom: 50px;
}

.mr-4 {
  margin-right: 1rem;
}

.mb-\[10px\] {
  margin-bottom: 10px;
}

.mt-\[4px\] {
  margin-top: 4px;
}

.block {
  display: block;
}

.inline-block {
  display: inline-block;
}

.inline {
  display: inline;
}

.flex {
  display: flex;
}

.inline-flex {
  display: inline-flex;
}

.hidden {
  display: none;
}

.aspect-square {
  aspect-ratio: 1 / 1;
}

.h-10 {
  height: 2.5rem;
}

.h-\[2px\] {
  height: 2px;
}

.h-screen {
  height: 100vh;
}

.h-3 {
  height: 0.75rem;
}

.h-full {
  height: 100%;
}

.h-9 {
  height: 2.25rem;
}

.h-\[60px\] {
  height: 60px;
}

.h-\[90px\] {
  height: 90px;
}

.h-1\/2 {
  height: 50%;
}

.h-\[34px\] {
  height: 34px;
}

.h-7 {
  height: 1.75rem;
}

.h-\[56px\] {
  height: 56px;
}

.h-auto {
  height: auto;
}

.h-\[1px\] {
  height: 1px;
}

.h-\[22px\] {
  height: 22px;
}

.w-full {
  width: 100%;
}

.w-10 {
  width: 2.5rem;
}

.w-7 {
  width: 1.75rem;
}

.w-3 {
  width: 0.75rem;
}

.w-9 {
  width: 2.25rem;
}

.w-\[60px\] {
  width: 60px;
}

.w-\[90px\] {
  width: 90px;
}

.w-\[400px\] {
  width: 400px;
}

.w-1\/2 {
  width: 50%;
}

.w-\[22px\] {
  width: 22px;
}

.max-w-\[1400px\] {
  max-width: 1400px;
}

.max-w-\[1500px\] {
  max-width: 1500px;
}

.max-w-\[145px\] {
  max-width: 145px;
}

.max-w-\[185px\] {
  max-width: 185px;
}

.max-w-\[200px\] {
  max-width: 200px;
}

.max-w-\[100px\] {
  max-width: 100px;
}

.max-w-\[60px\] {
  max-width: 60px;
}

.max-w-\[80px\] {
  max-width: 80px;
}

.max-w-\[420px\] {
  max-width: 420px;
}

.max-w-\[570px\] {
  max-width: 570px;
}

.max-w-full {
  max-width: 100%;
}

.max-w-\[1390px\] {
  max-width: 1390px;
}

.max-w-\[320px\] {
  max-width: 320px;
}

.max-w-\[970px\] {
  max-width: 970px;
}

.max-w-\[770px\] {
  max-width: 770px;
}

.max-w-\[40px\] {
  max-width: 40px;
}

.max-w-\[550px\] {
  max-width: 550px;
}

.max-w-\[475px\] {
  max-width: 475px;
}

.max-w-\[530px\] {
  max-width: 530px;
}

.max-w-\[690px\] {
  max-width: 690px;
}

.max-w-\[310px\] {
  max-width: 310px;
}

.max-w-\[470px\] {
  max-width: 470px;
}

.max-w-\[1120px\] {
  max-width: 1120px;
}

.max-w-\[1000px\] {
  max-width: 1000px;
}

.max-w-\[252px\] {
  max-width: 252px;
}

.max-w-\[435px\] {
  max-width: 435px;
}

.max-w-\[56px\] {
  max-width: 56px;
}

.max-w-\[785px\] {
  max-width: 785px;
}

.max-w-\[925px\] {
  max-width: 925px;
}

.max-w-\[520px\] {
  max-width: 520px;
}

.max-w-\[70px\] {
  max-width: 70px;
}

.max-w-\[22px\] {
  max-width: 22px;
}

.-translate-y-1\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.rotate-45 {
  --tw-rotate: 45deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.-rotate-45 {
  --tw-rotate: -45deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.cursor-pointer {
  cursor: pointer;
}

.select-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.list-inside {
  list-style-position: inside;
}

.list-disc {
  list-style-type: disc;
}

.flex-col {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.items-end {
  align-items: flex-end;
}

.items-center {
  align-items: center;
}

.justify-end {
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.space-y-\[6px\]> :not([hidden])~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(6px * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(6px * var(--tw-space-y-reverse));
}

.space-y-3> :not([hidden])~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}

.space-y-5> :not([hidden])~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.25rem * var(--tw-space-y-reverse));
}

.space-y-\[10px\]> :not([hidden])~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(10px * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(10px * var(--tw-space-y-reverse));
}

.space-x-5> :not([hidden])~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.25rem * var(--tw-space-x-reverse));
  margin-left: calc(1.25rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-x-4> :not([hidden])~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-y-4> :not([hidden])~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}

.space-x-3> :not([hidden])~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-x-\[6px\]> :not([hidden])~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(6px * var(--tw-space-x-reverse));
  margin-left: calc(6px * calc(1 - var(--tw-space-x-reverse)));
}

.self-center {
  align-self: center;
}

.overflow-hidden {
  overflow: hidden;
}

.rounded-md {
  border-radius: 0.375rem;
}

.rounded-full {
  border-radius: 9999px;
}

.rounded {
  border-radius: 0.25rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-2xl {
  border-radius: 1rem;
}

.rounded-3xl {
  border-radius: 1.5rem;
}

.rounded-\[20px\] {
  border-radius: 20px;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.rounded-sm {
  border-radius: 0.125rem;
}

.border-2 {
  border-width: 2px;
}

.border {
  border-width: 1px;
}

.border-\[\.7px\] {
  border-width: 0.7px;
}

.border-t {
  border-top-width: 1px;
}

.border-l {
  border-left-width: 1px;
}

.border-r {
  border-right-width: 1px;
}

.border-b {
  border-bottom-width: 1px;
}

.border-stroke {
  --tw-border-opacity: 1;
  border-color: rgb(235 239 244 / var(--tw-border-opacity));
}

.border-white {
  --tw-border-opacity: 1;
  border-color: rgb(255 255 255 / var(--tw-border-opacity));
}

.border-current {
  border-color: currentColor;
}

.border-opacity-40 {
  --tw-border-opacity: 0.4;
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgb(24 28 49 / var(--tw-bg-opacity));
}

.bg-primary {
  --tw-bg-opacity: 1;
  background-color: rgb(114 61 125 / var(--tw-bg-opacity));
}

.bg-\[\#F8FAFB\] {
  --tw-bg-opacity: 1;
  background-color: rgb(248 250 251 / var(--tw-bg-opacity));
}

.bg-gray {
  --tw-bg-opacity: 1;
  background-color: rgb(248 249 255 / var(--tw-bg-opacity));
}

.bg-stroke {
  --tw-bg-opacity: 1;
  background-color: rgb(235 239 244 / var(--tw-bg-opacity));
}

.bg-opacity-95 {
  --tw-bg-opacity: 0.95;
}



.bg-gradient-1 {
  background-image: linear-gradient(55.15deg,
      #7a96ff -7.09%,
      #afa2ff 51.72%,
      #68c0ff 101.48%);
}

.bg-texture {
  background-image: url(images/texture.svg);
}

.bg-gradient-2 {
  background-image: linear-gradient(120.12deg,
      rgb(205, 122, 253) 0%,
      #f2c977 100%);
}

.text-gradient {
  background: linear-gradient(120.12deg,
      rgb(205, 122, 253) 0%,
      #f2c977 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  display: inline-block;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
}

.bg-gradient-3 {
  background-image: radial-gradient(circle at 42% 40%, #e2eaff 37%, #ffffff 40%, #ffffff 80%, #fff 100%);
}

.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

.fill-current {
  fill: currentColor;
}

.object-cover {
  -o-object-fit: cover;
  object-fit: cover;
}

.object-center {
  -o-object-position: center;
  object-position: center;
}

.p-\[3px\] {
  padding: 3px;
}

.p-2 {
  padding: 0.5rem;
}

.p-3 {
  padding: 0.75rem;
}

.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.py-\[10px\] {
  padding-top: 10px;
  padding-bottom: 10px;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.px-\[30px\] {
  padding-left: 30px;
  padding-right: 30px;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-7 {
  padding-top: 1.75rem;
  padding-bottom: 1.75rem;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.py-11 {
  padding-top: 2.75rem;
  padding-bottom: 2.75rem;
}

.px-\[18px\] {
  padding-left: 18px;
  padding-right: 18px;
}

.px-\[10px\] {
  padding-left: 10px;
  padding-right: 10px;
}

.py-\[14px\] {
  padding-top: 14px;
  padding-bottom: 14px;
}

.px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.py-10 {
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
}

.px-9 {
  padding-left: 2.25rem;
  padding-right: 2.25rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.px-10 {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}

.py-9 {
  padding-top: 2.25rem;
  padding-bottom: 2.25rem;
}

.px-7 {
  padding-left: 1.75rem;
  padding-right: 1.75rem;
}

.py-\[110px\] {
  padding-top: 110px;
  padding-bottom: 110px;
}

.py-\[6px\] {
  padding-top: 6px;
  padding-bottom: 6px;
}

.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.px-\[22px\] {
  padding-left: 22px;
  padding-right: 22px;
}

.px-11 {
  padding-left: 2.75rem;
  padding-right: 2.75rem;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.pl-3 {
  padding-left: 0.75rem;
}

.pt-5 {
  padding-top: 1.25rem;
}

.pt-\[150px\] {
  padding-top: 150px;
}

.pb-\[110px\] {
  padding-bottom: 110px;
}

.pt-\[95px\] {
  padding-top: 95px;
}

.pb-\[46px\] {
  padding-bottom: 46px;
}

.pb-\[60px\] {
  padding-bottom: 60px;
}

.pt-10 {
  padding-top: 2.5rem;
}

.pb-\[70px\] {
  padding-bottom: 70px;
}

.pt-\[165px\] {
  padding-top: 165px;
}

.pr-\[18px\] {
  padding-right: 18px;
}

.pt-8 {
  padding-top: 2rem;
}

.pt-\[110px\] {
  padding-top: 110px;
}

.pt-14 {
  padding-top: 3.5rem;
}

.pb-14 {
  padding-bottom: 3.5rem;
}

.pb-6 {
  padding-bottom: 1.5rem;
}

.pt-\[100px\] {
  padding-top: 100px;
}

.pb-5 {
  padding-bottom: 1.25rem;
}

.pt-\[30px\] {
  padding-top: 30px;
}

.pb-10 {
  padding-bottom: 2.5rem;
}

.pt-20 {
  padding-top: 5rem;
}

.pl-4 {
  padding-left: 1rem;
}

.pr-5 {
  padding-right: 1.25rem;
}

.pb-9 {
  padding-bottom: 2.25rem;
}

.pt-\[70px\] {
  padding-top: 70px;
}

.pb-\[50px\] {
  padding-bottom: 50px;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}

.text-\[28px\] {
  font-size: 28px;
}

.text-\[18px\] {
  font-size: 18px;
}

.text-\[20px\] {
  font-size: 20px;
}

.text-\[22px\] {
  font-size: 22px;
}

.text-\[30px\] {
  font-size: 30px;
}

.text-\[25px\] {
  font-size: 25px;
}

.text-\[15px\] {
  font-size: 15px;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.text-\[40px\] {
  font-size: 40px;
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.text-\[35px\] {
  font-size: 35px;
}

.text-\[45px\] {
  font-size: 45px;
}

.text-\[50px\] {
  font-size: 50px;
}

.text-\[55px\] {
  font-size: 55px;
}

.text-\[60px\] {
  font-size: 60px;
}

.text-\[70px\] {
  font-size: 70px;
}

.gap-2 {
  gap: 0.75rem;
}

/* Responsive text sizes for different breakpoints */
@media (max-width: 640px) {
  .sm\:text-\[25px\] {
    font-size: 25px;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .md\:text-\[30px\] {
    font-size: 30px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .lg\:text-\[35px\] {
    font-size: 35px;
  }
}

@media (min-width: 1025px) {
  .xl\:text-\[40px\] {
    font-size: 40px;
  }
}

.font-bold {
  font-weight: 700;
}

.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.leading-tight {
  line-height: 1.25;
}

.leading-relaxed {
  line-height: 1.625;
}

.leading-none {
  line-height: 1;
}

.text-black {
  --tw-text-opacity: 1;
  color: rgb(24 28 49 / var(--tw-text-opacity));
}

.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.text-body {
  --tw-text-opacity: 1;
  color: rgb(121 128 138 / var(--tw-text-opacity));
}

.text-transparent {
  color: transparent;
}

.text-primary {
  --tw-text-opacity: 1;
  color: rgb(114 61 125 / var(--tw-text-opacity));
}

.underline {
  -webkit-text-decoration-line: underline;
  text-decoration-line: underline;
}

.opacity-70 {
  opacity: 0.7;
}

.opacity-\[65\%\] {
  opacity: 65%;
}

.shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color),
    0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow-card {
  --tw-shadow: 0px 1px 5px rgba(45, 74, 170, 0.14);
  --tw-shadow-colored: 0px 1px 5px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.drop-shadow-card {
  --tw-drop-shadow: drop-shadow(0px 1px 5px rgba(45, 74, 170, 0.14));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.backdrop-blur-sm {
  --tw-backdrop-blur: blur(4px);
  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}

.duration-300 {
  transition-duration: 300ms;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.last-of-type\:border-none:last-of-type {
  border-style: none;
}

.hover\:bg-primary:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(112 131 245 / var(--tw-bg-opacity));
}

.hover\:bg-opacity-90:hover {
  --tw-bg-opacity: 0.9;
}

.hover\:bg-opacity-80:hover {
  --tw-bg-opacity: 0.8;
}

.hover\:text-primary:hover {
  --tw-text-opacity: 1;
  color: rgb(114 61 125 / var(--tw-text-opacity));
}

.hover\:text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.hover\:underline:hover {
  -webkit-text-decoration-line: underline;
  text-decoration-line: underline;
}

.hover\:opacity-100:hover {
  opacity: 1;
}

.focus\:border-primary:focus {
  --tw-border-opacity: 1;
  border-color: rgb(114 61 125 / var(--tw-border-opacity));
}

.focus\:shadow-input:focus {
  --tw-shadow: 0px 10px 30px rgba(74, 108, 247, 0.08);
  --tw-shadow-colored: 0px 10px 30px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.group:hover .group-hover\:bg-primary {
  --tw-bg-opacity: 1;
  background-color: rgb(114 61 125 / var(--tw-bg-opacity));
}

.group:hover .group-hover\:text-primary {
  --tw-text-opacity: 1;
  color: rgb(114 61 125 / var(--tw-text-opacity));
}

.group:hover .group-hover\:text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.dark .dark\:block {
  display: block;
}

.dark .dark\:hidden {
  display: none;
}

.dark .dark\:border-stroke-dark {
  --tw-border-opacity: 1;
  border-color: rgb(52 55 74 / var(--tw-border-opacity));
}

.dark .dark\:border-\[\#BDBDBD\] {
  --tw-border-opacity: 1;
  border-color: rgb(189 189 189 / var(--tw-border-opacity));
}

.dark .dark\:border-\[\#34374A\] {
  --tw-border-opacity: 1;
  border-color: rgb(52 55 74 / var(--tw-border-opacity));
}

.dark .dark\:bg-black {
  --tw-bg-opacity: 1;
  background-color: rgb(24 28 49 / var(--tw-bg-opacity));
}

.dark .dark\:bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.dark .dark\:bg-\[\#15182A\] {
  --tw-bg-opacity: 1;
  background-color: rgb(21 24 42 / var(--tw-bg-opacity));
}

.dark .dark\:bg-dark {
  --tw-bg-opacity: 1;
  background-color: rgb(31 35 58 / var(--tw-bg-opacity));
}

.dark .dark\:bg-\[\#2A2E44\] {
  --tw-bg-opacity: 1;
  background-color: rgb(42 46 68 / var(--tw-bg-opacity));
}

.dark .dark\:bg-\[\#15182B\] {
  --tw-bg-opacity: 1;
  background-color: rgb(21 24 43 / var(--tw-bg-opacity));
}

.dark .dark\:bg-stroke-dark {
  --tw-bg-opacity: 1;
  background-color: rgb(52 55 74 / var(--tw-bg-opacity));
}

.dark .dark\:bg-opacity-95 {
  --tw-bg-opacity: 0.95;
}

.dark .dark\:text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.dark .dark\:text-black {
  --tw-text-opacity: 1;
  color: rgb(24 28 49 / var(--tw-text-opacity));
}

.dark .dark\:text-body {
  --tw-text-opacity: 1;
  color: rgb(121 128 138 / var(--tw-text-opacity));
}

.dark .dark\:shadow-card-dark {
  --tw-shadow: 0px 1px 5px rgba(16, 25, 55, 0.14);
  --tw-shadow-colored: 0px 1px 5px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.dark .dark\:drop-shadow-card-dark {
  --tw-drop-shadow: drop-shadow(0px 1px 5px rgba(16, 25, 55, 0.14));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.dark .dark\:hover\:bg-primary:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(112 131 245 / var(--tw-bg-opacity));
}

.dark .dark\:hover\:bg-opacity-90:hover {
  --tw-bg-opacity: 0.9;
}

.dark .dark\:hover\:text-primary:hover {
  --tw-text-opacity: 1;
  color: rgb(112 131 245 / var(--tw-text-opacity));
}

.dark .dark\:focus\:border-primary:focus {
  --tw-border-opacity: 1;
  border-color: rgb(112 131 245 / var(--tw-border-opacity));
}

.dark .group:hover .dark\:group-hover\:bg-primary {
  --tw-bg-opacity: 1;
  background-color: rgb(112 131 245 / var(--tw-bg-opacity));
}

@media (min-width: 575px) {
  .sm\:mb-0 {
    margin-bottom: 0px;
  }

  .sm\:block {
    display: block;
  }

  .sm\:inline-block {
    display: inline-block;
  }

  .sm\:flex {
    display: flex;
  }

  .sm\:w-1\/2 {
    width: 50%;
  }

  .sm\:w-7\/12 {
    width: 58.333333%;
  }

  .sm\:w-5\/12 {
    width: 41.666667%;
  }

  .sm\:w-1\/3 {
    width: 33.333333%;
  }

  .sm\:max-w-\[180px\] {
    max-width: 180px;
  }

  .sm\:justify-end {
    justify-content: flex-end;
  }

  .sm\:space-x-8> :not([hidden])~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\:p-\[50px\] {
    padding: 50px;
  }

  .sm\:px-20 {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  .sm\:px-9 {
    padding-left: 2.25rem;
    padding-right: 2.25rem;
  }

  .sm\:px-\[26px\] {
    padding-left: 26px;
    padding-right: 26px;
  }

  .sm\:px-10 {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  .sm\:text-right {
    text-align: right;
  }

  .sm\:text-\[35px\] {
    font-size: 35px;
  }

  .sm\:text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }

  .sm\:text-\[32px\] {
    font-size: 32px;
  }

  .sm\:text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .sm\:text-\[22px\] {
    font-size: 22px;
  }

  .sm\:text-\[40px\] {
    font-size: 40px;
  }

  .sm\:text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }

  .sm\:text-\[28px\] {
    font-size: 28px;
  }
}

@media (min-width: 768px) {
  .md\:-mx-7 {
    margin-left: -1.75rem;
    margin-right: -1.75rem;
  }

  .md\:mb-0 {
    margin-bottom: 0px;
  }

  .md\:block {
    display: block;
  }

  .md\:w-2\/12 {
    width: 16.666667%;
  }

  .md\:w-3\/12 {
    width: 25%;
  }

  .md\:w-4\/12 {
    width: 33.333333%;
  }

  .md\:w-1\/2 {
    width: 50%;
  }

  .md\:w-1\/3 {
    width: 33.333333%;
  }

  .md\:w-\[700px\] {
    width: 700px;
  }

  .md\:w-1\/4 {
    width: 25%;
  }

  .md\:justify-start {
    justify-content: flex-start;
  }

  .md\:justify-end {
    justify-content: flex-end;
  }

  .md\:px-12 {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  .md\:px-7 {
    padding-left: 1.75rem;
    padding-right: 1.75rem;
  }

  .md\:pb-1 {
    padding-bottom: 0.25rem;
  }

  .md\:text-\[50px\] {
    font-size: 50px;
  }

  .md\:text-\[44px\] {
    font-size: 44px;
  }

  .md\:text-\[22px\] {
    font-size: 22px;
  }

  .md\:text-\[38px\] {
    font-size: 38px;
  }

  .md\:leading-tight {
    line-height: 1.25;
  }
}

@media (min-width: 992px) {
  .lg\:invisible {
    visibility: hidden;
  }

  .lg\:static {
    position: static;
  }

  .lg\:absolute {
    position: absolute;
  }

  .lg\:top-\[120\%\] {
    top: 120%;
  }

  .lg\:order-first {
    order: -9999;
  }

  .lg\:order-last {
    order: 9999;
  }

  .lg\:-mx-5 {
    margin-left: -1.25rem;
    margin-right: -1.25rem;
  }

  .lg\:mx-0 {
    margin-left: 0px;
    margin-right: 0px;
  }

  .lg\:mr-0 {
    margin-right: 0px;
  }

  .lg\:mt-0 {
    margin-top: 0px;
  }

  .lg\:mb-0 {
    margin-bottom: 0px;
  }

  .lg\:mb-\[70px\] {
    margin-bottom: 70px;
  }

  .lg\:ml-auto {
    margin-left: auto;
  }

  .lg\:mb-4 {
    margin-bottom: 1rem;
  }

  .lg\:ml-0 {
    margin-left: 0px;
  }

  .lg\:block {
    display: block;
  }

  .lg\:flex {
    display: flex;
  }

  .lg\:hidden {
    display: none;
  }

  .lg\:h-auto {
    height: auto;
  }

  .lg\:w-max {
    width: -moz-max-content;
    width: max-content;
  }

  .lg\:w-\[250px\] {
    width: 250px;
  }

  .lg\:w-4\/12 {
    width: 33.333333%;
  }

  .lg\:w-5\/12 {
    width: 41.666667%;
  }

  .lg\:w-6\/12 {
    width: 50%;
  }

  .lg\:w-8\/12 {
    width: 66.666667%;
  }

  .lg\:w-2\/12 {
    width: 16.666667%;
  }

  .lg\:w-3\/12 {
    width: 25%;
  }

  .lg\:w-1\/3 {
    width: 33.333333%;
  }

  .lg\:w-7\/12 {
    width: 58.333333%;
  }

  .lg\:w-5\/12 {
    width: 41.666667%;
  }

  .lg\:w-1\/2 {
    width: 50%;
  }

  .lg\:w-1\/6 {
    width: 16.666667%;
  }

  .lg\:max-w-\[1250px\] {
    max-width: 1250px;
  }

  .lg\:max-w-\[1305px\] {
    max-width: 1305px;
  }

  .lg\:max-w-\[570px\] {
    max-width: 570px;
  }

  .lg\:max-w-\[610px\] {
    max-width: 610px;
  }

  .lg\:max-w-\[1120px\] {
    max-width: 1120px;
  }

  .lg\:max-w-\[510px\] {
    max-width: 510px;
  }

  .lg\:max-w-\[1160px\] {
    max-width: 1160px;
  }

  .lg\:max-w-\[1200px\] {
    max-width: 1200px;
  }

  .lg\:justify-start {
    justify-content: flex-start;
  }

  .lg\:justify-end {
    justify-content: flex-end;
  }

  .lg\:justify-center {
    justify-content: center;
  }

  .lg\:space-x-8> :not([hidden])~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .lg\:space-y-0> :not([hidden])~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0px * var(--tw-space-y-reverse));
  }

  .lg\:rounded-lg {
    border-radius: 0.5rem;
  }

  .lg\:bg-transparent {
    background-color: transparent;
  }

  .lg\:bg-white {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  }

  .lg\:py-0 {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .lg\:py-7 {
    padding-top: 1.75rem;
    padding-bottom: 1.75rem;
  }

  .lg\:px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .lg\:px-5 {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  .lg\:px-10 {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  .lg\:px-7 {
    padding-left: 1.75rem;
    padding-right: 1.75rem;
  }

  .lg\:px-12 {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  .lg\:pb-5 {
    padding-bottom: 1.25rem;
  }

  .lg\:pt-\[220px\] {
    padding-top: 220px;
  }

  .lg\:pt-20 {
    padding-top: 5rem;
  }

  .lg\:text-left {
    text-align: left;
  }

  .lg\:text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .lg\:text-\[42px\] {
    font-size: 42px;
  }

  .lg\:opacity-0 {
    opacity: 0;
  }

  .lg\:shadow-card {
    --tw-shadow: 0px 1px 5px rgba(45, 74, 170, 0.14);
    --tw-shadow-colored: 0px 1px 5px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  .lg\:backdrop-blur-none {
    --tw-backdrop-blur: blur(0);
    -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
    backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
  }

  .group:hover .lg\:group-hover\:visible {
    visibility: visible;
  }

  .group:hover .lg\:group-hover\:top-full {
    top: 100%;
  }

  .group:hover .lg\:group-hover\:opacity-100 {
    opacity: 1;
  }

  .dark .dark\:lg\:border-transparent {
    border-color: transparent;
  }

  .dark .lg\:dark\:bg-transparent {
    background-color: transparent;
  }

  .dark .dark\:lg\:bg-\[\#15182A\] {
    --tw-bg-opacity: 1;
    background-color: rgb(21 24 42 / var(--tw-bg-opacity));
  }

  .dark .lg\:dark\:shadow-card-dark {
    --tw-shadow: 0px 1px 5px rgba(16, 25, 55, 0.14);
    --tw-shadow-colored: 0px 1px 5px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
}

@media (min-width: 1200px) {
  .xl\:-mx-\[35px\] {
    margin-left: -35px;
    margin-right: -35px;
  }

  .xl\:mb-0 {
    margin-bottom: 0px;
  }

  .xl\:flex {
    display: flex;
  }

  .xl\:w-5\/12 {
    width: 41.666667%;
  }

  .xl\:w-7\/12 {
    width: 58.333333%;
  }

  .xl\:justify-end {
    justify-content: flex-end;
  }

  .xl\:space-x-10> :not([hidden])~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2.5rem * var(--tw-space-x-reverse));
    margin-left: calc(2.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .xl\:px-\[35px\] {
    padding-left: 35px;
    padding-right: 35px;
  }

  .xl\:px-10 {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  .xl\:px-9 {
    padding-left: 2.25rem;
    padding-right: 2.25rem;
  }

  .xl\:px-20 {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  .xl\:text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .xl\:text-\[22px\] {
    font-size: 22px;
  }

  .xl\:text-\[50px\] {
    font-size: 50px;
  }

  .xl\:text-\[26px\] {
    font-size: 26px;
  }
}

@media (min-width: 450px) {
  .xs\:max-w-\[265px\] {
    max-width: 265px;
  }
}

/* Mobile animation keyframes */
@keyframes mobileSlideIn {
  0% {
    transform: translateZ(-200px) translateY(50px) scale(0.8);
    opacity: 0;
  }

  50% {
    transform: translateZ(-100px) translateY(25px) scale(0.9);
    opacity: 0.5;
  }

  100% {
    transform: translateZ(0) translateY(0) scale(1);
    opacity: 1;
  }
}

/* Mobile container animation */
.mobile-container {
  animation: mobileSlideIn 1s cubic-bezier(0.15, 0.1, 0.423, 0.34) forwards;
  animation-delay: 1s;
  opacity: 0;
  transform: translateZ(-200px) translateY(50px) scale(0.8);
}

/* Decorative elements animation */
.decoration-1 {
  animation: float 3s ease-in-out infinite;
  animation-delay: 1s;
  top: 1rem;
  right: 2rem;
}

.decoration-2 {
  animation: float 3s ease-in-out infinite reverse;
  animation-delay: 2s;
  bottom: 1px;
  left: 5rem;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

/* WhatsApp Float Animation */
.whatsapp-float {
  position: fixed;
  bottom: 90px;
  right: 27px;
  z-index: 1000;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #5bd066, #27b43e);
  color: white;
  box-shadow: 0 4px 12px rgba(39, 180, 62, 0.4);
  animation: pulse 2s infinite, bounce 3s infinite;
  transition: all 0.3s ease;
}

.whatsapp-float:hover {
  animation: none;
  transform: scale(1.1) translateY(-5px);
  box-shadow: 0 10px 25px rgba(37, 211, 102, 0.6);
}

.whatsapp-float svg {
  width: 36px;
  height: 36px;
  z-index: 2;
}

/* Wave effect */
.wave-circle {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(91, 208, 102, 0.5);
  opacity: 0;
  animation: wave 2s infinite;
}

.wave-circle:nth-child(1) {
  width: 70px;
  height: 70px;
  animation-delay: 0s;
}

.wave-circle:nth-child(2) {
  width: 90px;
  height: 90px;
  animation-delay: 0.5s;
}

.wave-circle:nth-child(3) {
  width: 110px;
  height: 110px;
  animation-delay: 1s;
}

/* Notification badge */
.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  background-color: #ff4b4b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(255, 75, 75, 0.5);
  animation: shake 2s infinite;
  z-index: 3;
}

/* Animations */
@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(39, 180, 62, 0.4);
  }

  50% {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(39, 180, 62, 0.6);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(39, 180, 62, 0.4);
  }
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }

  60% {
    transform: translateY(-5px);
  }
}

@keyframes wave {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }

  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-2px);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translateX(2px);
  }
}

/* Rolling Animation Styles */

.roll-wrapper {
  margin-top: 2rem;
  width: 100%;
  overflow: hidden;
  position: relative;
  mask: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
  -webkit-mask: linear-gradient(90deg,
      transparent,
      white 10%,
      white 90%,
      transparent);
}

.roll-track {
  display: flex;
  width: calc(320px * 14);
  /* 7 original + 7 cloned */
  animation: modernScroll 40s linear infinite;
  will-change: transform;
}

@keyframes modernScroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-320px * 7));
  }
}

.roll-card {
  position: relative;
  min-width: 230px;
  height: 150px;
  margin-right: 40px;
  border-radius: 13px;
  overflow: hidden;
  flex-shrink: 0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.roll-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.roll-card:hover::before {
  opacity: 1;
}

.roll-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
}

.roll-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.roll-card:hover img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  padding-top: 0px;
  background: linear-gradient(180deg,
      #ffffff00 0%,
      rgb(255 255 255 / 0%) 0%,
      rgb(46 46 46 / 42%) 76%);
  color: white;
  z-index: 2;
  backdrop-filter: blur(2px);
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: -0.01em;
  transform: translateY(10px);
  opacity: 0.9;
  transition: all 0.3s ease;
}

.roll-card:hover .card-title {
  transform: translateY(0);
  opacity: 1;
}

/* Enhanced Mobile Responsiveness */
@media (max-width: 768px) {
  .roll-track {
    width: calc(260px * 14);
    animation: modernScrollMobile 35s linear infinite;
  }

  @keyframes modernScrollMobile {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(calc(-260px * 7));
    }
  }

  .roll-card {
    min-width: 220px;
    height: 140px;
    margin-right: 30px;
    border-radius: 16px;
  }

  .card-overlay {
    padding: 16px;
  }

  .card-title {
    font-size: 1rem;
  }

  .card-description {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .roll-track {
    width: calc(200px * 14);
  }

  @keyframes modernScrollMobile {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(calc(-200px * 7));
    }
  }

  .roll-card {
    min-width: 140px;
    height: 90px;
    margin-right: 10px;
    border-radius: 10px;
  }

  .card-overlay {
    padding: 12px;
  }

  .card-title {
    font-size: 0.7rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .roll-track {
    animation-duration: 60s;
  }

  .roll-card {
    transition-duration: 0.2s;
  }
}

/* Loading animation */
.roll-card {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  transform: translateY(30px);
}

.roll-card:nth-child(1) {
  animation-delay: 0.4s;
}

.roll-card:nth-child(2) {
  animation-delay: 0.5s;
}

.roll-card:nth-child(3) {
  animation-delay: 0.6s;
}

.roll-card:nth-child(4) {
  animation-delay: 0.7s;
}

.roll-card:nth-child(5) {
  animation-delay: 0.8s;
}

.roll-card:nth-child(6) {
  animation-delay: 0.9s;
}

.roll-card:nth-child(7) {
  animation-delay: 1s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Clients Section Styles */
.client-logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  /* background: rgba(255, 255, 255, 0.8); */
  /* backdrop-filter: blur(10px); */
  /* border: 1px solid rgba(0, 0, 0, 0.1); */
  /* transition: all 0.3s ease; */
  min-height: 65px;
  min-width: 160px;
}



.client-logo-img {
  max-width: 160px;
  max-height: 60px;
  width: auto;
  height: auto;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  /* object-fit: contain; */
  /* filter: grayscale(1) opacity(0.7); */
  /* transition: all 0.3s ease; */
  
  /* Prevent image selection and copying */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  -webkit-touch-callout: none;
}

/* .client-logo-wrapper:hover .client-logo-img {
  filter: grayscale(0) opacity(1);
  transform: scale(1.05);
} */


/* Responsive grid adjustments */
@media (max-width: 768px) {
  .client-logo-wrapper {
    min-height: 45px;
    min-width: 100px;
    padding: 1rem;
  }

  .client-logo-img {
    max-width: 100px;
    max-height: 50px;
    border-radius: 5px;
  }
}

@media (max-width: 640px) {
  .client-logo-wrapper {
    min-height: 25px;
    min-width: 80px;
    padding: 0.75rem;
  }

  .client-logo-img {
    max-width: 80px;
    max-height: 40px;
    border-radius: 3px;
  }
}

/* scroll indicator */

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.scroll-indicator:hover {
  transform: translateY(-8px);
}

.scroll-indicator:hover .arrow-container {
  transform: scale(1.1);
  box-shadow: 0 15px 35px rgba(139, 92, 246, 0.2);
}

.scroll-text {
  font-size: 15px;
  font-weight: 300;
  color: #723d7d;
  margin-bottom: 10px;
  letter-spacing: 1px;
  opacity: 0.9;
}

.arrow-container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e564ff25;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
  animation: downPulse 2s infinite;
  position: relative;
  overflow: hidden;
}

.arrow {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #723d7d;
  transition: all 0.3s ease;
  margin-bottom: 2px;
}

.arrow:last-child {
  margin-bottom: 0;
}

.arrow-container::before {
  content: "";
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg,
      transparent 0%,
      #ab58bb5d 60%,
      transparent 100%);
  animation: waveFlash 2s infinite;
}

@keyframes downPulse {

  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  50% {
    transform: translateY(8px) scale(1.02);
    opacity: 0.8;
  }
}

@keyframes waveFlash {
  0% {
    top: -100%;
    opacity: 0;
  }

  50% {
    top: 0%;
    opacity: 1;
  }

  100% {
    top: 100%;
    opacity: 0;
  }
}

.scroll-indicator::after {
  content: "";
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 25px;
  background: linear-gradient(to bottom, rgba(139, 92, 246, 0.6), transparent);
  border-radius: 1px;
}

.heading1 {
  font-size: 30px;
}

.container-hero {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}

.hero-heading {
  align-items: center;
}


.wall-background {
  position: relative;
  display: inline-block;
  width: auto;
  height: auto;
  border-radius: 10px;
  z-index: 1;
}

.wall-text {
  position: relative;
  z-index: 10;
  font-weight: inherit;
  font-size: inherit;
  line-height: inherit;
  display: inline-block;
}

.rolling-text {
  position: relative;
  display: inline-block;
  perspective: 1000px;
  height: 1.2em;
  width: auto;
  min-width: 150px;
  overflow: visible;
}

.rolling-text span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  white-space: nowrap;
  opacity: 0;
  transform: rotateX(-90deg);
  transform-origin: center center;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease;
  backface-visibility: hidden;
}

.rolling-text span.active {
  opacity: 1 !important;
  transform: rotateX(0deg) !important;
}

.rolling-text span.inactive {
  opacity: 0 !important;
  transform: rotateX(90deg) !important;
}

@keyframes fadeInFlip {
  0% {
    opacity: 0;
    transform: rotateX(-90deg);
  }

  100% {
    opacity: 1;
    transform: rotateX(0deg);
  }
}

@keyframes fadeOutFlip {
  0% {
    opacity: 1;
    transform: rotateX(0deg);
  }

  100% {
    opacity: 0;
    transform: rotateX(90deg);
  }
}



.trust-card-wrapper {
  /* background: #000; */
  margin-left: 10rem;
  margin-right: 10rem;
  margin-top: 5rem;
  padding: 5rem;
  /* margin-bottom: 5rem; */
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

.trust-card {
  justify-content: center;
  gap: 4rem;
}

.trust-card iframe {
  width: 70px;
  height: 70px;
}

.stamps {
  max-width: 130px;
  max-height: 130px;
}

.demo-button-1 {
  padding: 12px 24px;
  color: white;
  font-weight: 600;
  border-radius: 9999px;
  transition: all 0.7s ease-in-out;
  background: linear-gradient(120deg,
      #46e5b3,
      #ff88ed,
      #9394ff,
      #ff8a8a,
      #ffd780);
  background-size: 200% 200%;
  animation: pulse-bg 10s infinite alternate;
  border: none;
  cursor: pointer;
}

.demo-button-1:hover {
  filter: brightness(1.1);
  box-shadow: 0 0 12px rgba(68, 68, 68, 0.6);
  transform: scale(1.09);
}

@keyframes pulse-bg {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
}

/* testimonials style */

.testimonials-section {
  position: relative;
  overflow: hidden;
  padding: 100px 20px;
  background-color: #ffffff;
  z-index: 1;
}

#triangle-bg {
  position: absolute;
  top: -600px;
  left: 50%;
  width: 1000px;
  height: 800px;
  transform: translateX(-50%);
  z-index: -1;
  pointer-events: none;
}

.testimonials-scroll-wrapper {
  overflow: hidden;
  width: 100%;
  position: relative;
  padding: 3rem 0;
}

.testimonials-scroll-container {
  display: flex;
  gap: 2rem;
  width: max-content;
  /* Important for JS calculation */
}

@keyframes autoScroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.testimonial-card {
  flex: 0 0 auto;
  width: 340px;
  text-align: center;
  background-color: white;
  padding: 1rem;
  border-radius: 1.5rem;
  box-shadow: 0px 28px 40px -20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.testimonial-card:hover {
  transform: scale(1.03);
}

.stars {
  color: #fabb05;
  font-size: 14px;
  margin: 0.5rem 0;
}

.testimonial-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 4px solid #fff;

  box-shadow: 0px 28px 40px -20px rgba(0, 0, 0, 0.3);
  margin: 0 auto 1rem;
}

.business-name {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 10px;
}

.testimonial-text {
  font-size: 13px;
  color: #555;
  line-height: 1.6;
  font-weight: 400;
  padding: 0 20px;
}



@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0px);
  }
}


.floating-R-img {
  z-index: 1;
  top: 85%;
  right: 25%;
  position: absolute;
  width: 100px;
  animation: float 5s ease-in-out infinite;
  pointer-events: none;
}

.floating-L-img {
  z-index: 1;
  top: 10%;
  left: 8%;
  position: absolute;
  width: 100px;
  animation: float 5s ease-in-out infinite;
  pointer-events: none;
}

#clients {
  padding-top: 7rem;
}

/* Tablet screens */
@media (max-width: 1024px) {
  .container-hero {
    padding: 2rem;
  }

  #clients {
    padding-top: 7rem;
  }

  .floating-R-img {
    top: 82%;
    right: 25%;
    width: 75px;
  }

  .floating-L-img {
    top: 28%;
    left: 8%;
    width: 76px;
  }

  .trust-card-wrapper {
    margin-left: 2rem;
    margin-right: 2rem;
    margin-top: 5rem;
    padding: 4rem;
  }

  .roll-card {
    min-width: 150px;
    height: 90px;
    margin-right: 30px;
    border-radius: 16px;
  }

  .heading1 {
    font-size: 20px;
  }

  .trust-card {
    gap: 2rem;
  }

  .stamps {
    max-width: 70px;
    max-height: 70px;
  }

  .testimonial-card {
    width: 300px;
    padding: 0.8rem;
    border-radius: 1.2rem;
  }

  .testimonial-logo {
    width: 45px;
    height: 45px;
    border-width: 3px;
  }

  .business-name {
    font-size: 14px;
  }

  .testimonial-text {
    font-size: 12px;
    padding: 0 15px;
  }
}

/* Hide on small and medium screens */
@media (max-width: 720px) {
  .scroll-indicator {
    display: none;
  }

  #clients {
    padding-top: 0rem;
  }

  .floating-R-img {
    top: 82%;
    right: 19%;
    width: 54px;
  }


  .floating-L-img {
    top: 39%;
    left: 4%;
    width: 54px;
  }

  .stamps {
    max-width: 70px;
    max-height: 70px;
  }

  .trust-card-wrapper {
    margin-left: 2rem;
    margin-right: 2rem;
    margin-top: 5rem;
    padding: 2rem;
  }

  .trust-card {
    gap: 3rem;
  }

  .trust-card iframe {
    width: 50px;
    height: 50px;
  }

  video {
    border-radius: 1rem;
  }

  .wall-background {
    width: 170px;
    height: 40px;
    border-radius: 6px;
  }

  .rolling-text {
    gap: 3px;
  }

  .rolling-text span {
    height: 38px;
  }

  @keyframes roll {

    0%,
    10% {
      transform: translateY(0);
    }

    14.28%,
    24.28% {
      transform: translateY(-40px);
    }

    28.56%,
    38.56% {
      transform: translateY(-80px);
    }

    42.84%,
    52.84% {
      transform: translateY(-120px);
    }

    57.12%,
    67.12% {
      transform: translateY(-160px);
    }

    100% {
      transform: translateY(0);
    }
  }

  .container-hero {
    padding-right: 1rem;
    padding-left: 1rem;
  }

  .heading1 {
    font-size: 20px;
  }

  .testimonial-card {
    width: 260px;
    padding: 0.7rem;
    border-radius: 1rem;
  }

  .testimonial-logo {
    width: 40px;
    height: 40px;
    border-width: 2px;
    margin: 0 auto 0.8rem;
  }

  .business-name {
    font-size: 13px;
    margin-bottom: 8px;
  }

  .testimonial-text {
    font-size: 11px;
    padding: 0 10px;
    line-height: 1.5;
  }
}

.video-container {
  position: relative;
  width: 100%;
  padding-top: 88%;
  margin: auto;
}

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2rem;
}

.responsive-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
  /* required for animation to work */
}


// bundle.js
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_glightbox_dist_css_glightbox_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/glightbox/dist/css/glightbox.min.css */ \"./node_modules/glightbox/dist/css/glightbox.min.css\");\n/* harmony import */ var swiper_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/css */ \"./node_modules/swiper/swiper.min.css\");\n/* harmony import */ var swiper_css_pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper/css/pagination */ \"./node_modules/swiper/modules/pagination/pagination.min.css\");\n/* harmony import */ var _css_animate_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/animate.css */ \"./src/css/animate.css\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../css/style.css */ \"./src/css/style.css\");\n/* harmony import */ var glightbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! glightbox */ \"./node_modules/glightbox/dist/js/glightbox.min.js\");\n/* harmony import */ var glightbox__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(glightbox__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! swiper */ \"./node_modules/swiper/swiper.esm.js\");\n/* harmony import */ var wowjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! wowjs */ \"./node_modules/wowjs/dist/wow.js\");\n/* harmony import */ var wowjs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(wowjs__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\n\n\n\nwindow.wow = new (wowjs__WEBPACK_IMPORTED_MODULE_7___default().WOW)({\n  live: false\n});\nwindow.wow.init({\n  offset: 50\n}); // Testimonial\n\nvar testimonial = new swiper__WEBPACK_IMPORTED_MODULE_6__[\"default\"]('.mySwiper', {\n  // configure Swiper to use modules\n  modules: [swiper__WEBPACK_IMPORTED_MODULE_6__.Navigation],\n  slidesPerView: 1,\n  spaceBetween: 30,\n  navigation: {\n    nextEl: '.swiper-button-next',\n    prevEl: '.swiper-button-prev'\n  },\n  loop: true,\n  breakpoints: {\n    // when window width is >= 640px\n    768: {\n      slidesPerView: 3,\n      spaceBetween: 40\n    }\n  }\n}); //========= glightbox\n\nglightbox__WEBPACK_IMPORTED_MODULE_5___default()({\n  href: \"https://www.youtube.com/watch?v=r44RKWyfcFw&fbclid=IwAR21beSJORalzmzokxDRcGfkZA1AtRTE__l5N4r09HcGS5Y6vOluyouM9EM\",\n  type: \"video\",\n  source: \"youtube\",\n  //vimeo, youtube or local\n  width: 900,\n  autoplayVideos: true\n});\n\n(function () {\n  'use strict';\n  /* ========  mobile menu  start ========= */\n\n  var menuWrapper = document.querySelector('.menu-wrapper');\n  var body = document.querySelector('body');\n  document.querySelector('.navbarOpen').addEventListener('click', function () {\n    menuWrapper.classList.remove('hidden');\n    body.classList.add('overflow-hidden');\n  });\n  document.querySelector('.navbarClose').addEventListener('click', function () {\n    menuWrapper.classList.add('hidden');\n    body.classList.remove('overflow-hidden');\n  }); // === close navbar-collapse when a  clicked\n\n  document.querySelectorAll('.navbar li:not(.submenu-item) a').forEach(function (e) {\n    return e.addEventListener('click', function () {\n      menuWrapper.classList.add('hidden');\n      body.classList.remove('overflow-hidden');\n    });\n  }); // === Sub-menu\n\n  var submenuItems = document.querySelectorAll('.submenu-item');\n  submenuItems.forEach(function (el) {\n    el.querySelector('a').addEventListener('click', function () {\n      el.querySelector('a').classList.toggle('active');\n      el.querySelector('.submenu').classList.toggle('hidden');\n    });\n  });\n  /* ========  mobile menu end ========= */\n\n  window.onscroll = function () {\n    // ===  Sticky Navbar\n    var header = document.querySelector('.navbar');\n\n    if (window.pageYOffset >= 100) {\n      header.classList.add('sticky-navbar');\n    } else {\n      header.classList.remove('sticky-navbar');\n    } // ===  show or hide the back-top-top button\n\n\n    var backToTop = document.querySelector('.back-to-top');\n\n    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {\n      backToTop.style.display = 'flex';\n    } else {\n      backToTop.style.display = 'none';\n    }\n  };\n  /* ========  themeSwitcher start ========= */\n  // themeSwitcher\n\n\n  var themeSwitcher = document.getElementById('themeSwitcher'); // Theme Vars\n\n  var userTheme = localStorage.getItem('theme');\n  var systemTheme = window.matchMedia('(prefers-color0scheme: dark)').matches; // Initial Theme Check\n\n  var themeCheck = function themeCheck() {\n    if (userTheme === 'dark' || !userTheme && systemTheme) {\n      document.documentElement.classList.add('dark');\n      return;\n    }\n  }; // Manual Theme Switch\n\n\n  var themeSwitch = function themeSwitch() {\n    if (document.documentElement.classList.contains('dark')) {\n      document.documentElement.classList.remove('dark');\n      localStorage.setItem('theme', 'light');\n      return;\n    }\n\n    document.documentElement.classList.add('dark');\n    localStorage.setItem('theme', 'dark');\n  }; // call theme switch on clicking buttons\n\n\n  themeSwitcher.addEventListener('click', function () {\n    themeSwitch();\n  }); // invoke theme check on initial load\n\n  themeCheck();\n  /* ========  themeSwitcher End ========= */\n\n  /* ========  scroll to top  start ========= */\n\n  function scrollTo(element) {\n    var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;\n    var start = element.scrollTop;\n    var change = to - start;\n    var increment = 20;\n    var currentTime = 0;\n\n    var animateScroll = function animateScroll() {\n      currentTime += increment;\n      var val = Math.easeInOutQuad(currentTime, start, change, duration);\n      element.scrollTop = val;\n\n      if (currentTime < duration) {\n        setTimeout(animateScroll, increment);\n      }\n    };\n\n    animateScroll();\n  }\n\n  Math.easeInOutQuad = function (t, b, c, d) {\n    t /= d / 2;\n    if (t < 1) return c / 2 * t * t + b;\n    t--;\n    return -c / 2 * (t * (t - 2) - 1) + b;\n  };\n\n  document.querySelector('.back-to-top').onclick = function () {\n    scrollTo(document.documentElement);\n  };\n  /* ========  scroll to top  end ========= */\n\n})(); // Document Loaded\n\n\ndocument.addEventListener('DOMContentLoaded', function () {});\n\n//# sourceURL=webpack://appline-tailwind/./src/js/index.js?");

/***/ }),

/***/ "./node_modules/glightbox/dist/js/glightbox.min.js":
/*!*********************************************************!*\
  !*** ./node_modules/glightbox/dist/js/glightbox.min.js ***!
  \*********************************************************/
/***/ (function(module) {

eval("!function(e,t){ true?module.exports=t():0}(this,(function(){\"use strict\";function e(t){return(e=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&\"function\"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?\"symbol\":typeof e})(t)}function t(e,t){if(!(e instanceof t))throw new TypeError(\"Cannot call a class as a function\")}function i(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,\"value\"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function n(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}var s=Date.now();function l(){var e={},t=!0,i=0,n=arguments.length;\"[object Boolean]\"===Object.prototype.toString.call(arguments[0])&&(t=arguments[0],i++);for(var s=function(i){for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t&&\"[object Object]\"===Object.prototype.toString.call(i[n])?e[n]=l(!0,e[n],i[n]):e[n]=i[n])};i<n;i++){var o=arguments[i];s(o)}return e}function o(e,t){if((k(e)||e===window||e===document)&&(e=[e]),A(e)||L(e)||(e=[e]),0!=P(e))if(A(e)&&!L(e))for(var i=e.length,n=0;n<i&&!1!==t.call(e[n],e[n],n,e);n++);else if(L(e))for(var s in e)if(O(e,s)&&!1===t.call(e[s],e[s],s,e))break}function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=e[s]=e[s]||[],l={all:n,evt:null,found:null};return t&&i&&P(n)>0&&o(n,(function(e,n){if(e.eventName==t&&e.fn.toString()==i.toString())return l.found=!0,l.evt=n,!1})),l}function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=t.onElement,n=t.withCallback,s=t.avoidDuplicate,l=void 0===s||s,a=t.once,h=void 0!==a&&a,d=t.useCapture,c=void 0!==d&&d,u=arguments.length>2?arguments[2]:void 0,g=i||[];function v(e){T(n)&&n.call(u,e,this),h&&v.destroy()}return C(g)&&(g=document.querySelectorAll(g)),v.destroy=function(){o(g,(function(t){var i=r(t,e,v);i.found&&i.all.splice(i.evt,1),t.removeEventListener&&t.removeEventListener(e,v,c)}))},o(g,(function(t){var i=r(t,e,v);(t.addEventListener&&l&&!i.found||!l)&&(t.addEventListener(e,v,c),i.all.push({eventName:e,fn:v}))})),v}function h(e,t){o(t.split(\" \"),(function(t){return e.classList.add(t)}))}function d(e,t){o(t.split(\" \"),(function(t){return e.classList.remove(t)}))}function c(e,t){return e.classList.contains(t)}function u(e,t){for(;e!==document.body;){if(!(e=e.parentElement))return!1;if(\"function\"==typeof e.matches?e.matches(t):e.msMatchesSelector(t))return e}}function g(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:\"\",i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!e||\"\"===t)return!1;if(\"none\"===t)return T(i)&&i(),!1;var n=x(),s=t.split(\" \");o(s,(function(t){h(e,\"g\"+t)})),a(n,{onElement:e,avoidDuplicate:!1,once:!0,withCallback:function(e,t){o(s,(function(e){d(t,\"g\"+e)})),T(i)&&i()}})}function v(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:\"\";if(\"\"===t)return e.style.webkitTransform=\"\",e.style.MozTransform=\"\",e.style.msTransform=\"\",e.style.OTransform=\"\",e.style.transform=\"\",!1;e.style.webkitTransform=t,e.style.MozTransform=t,e.style.msTransform=t,e.style.OTransform=t,e.style.transform=t}function f(e){e.style.display=\"block\"}function p(e){e.style.display=\"none\"}function m(e){var t=document.createDocumentFragment(),i=document.createElement(\"div\");for(i.innerHTML=e;i.firstChild;)t.appendChild(i.firstChild);return t}function y(){return{width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}}function x(){var e,t=document.createElement(\"fakeelement\"),i={animation:\"animationend\",OAnimation:\"oAnimationEnd\",MozAnimation:\"animationend\",WebkitAnimation:\"webkitAnimationEnd\"};for(e in i)if(void 0!==t.style[e])return i[e]}function b(e,t,i,n){if(e())t();else{var s;i||(i=100);var l=setInterval((function(){e()&&(clearInterval(l),s&&clearTimeout(s),t())}),i);n&&(s=setTimeout((function(){clearInterval(l)}),n))}}function S(e,t,i){if(I(e))console.error(\"Inject assets error\");else if(T(t)&&(i=t,t=!1),C(t)&&t in window)T(i)&&i();else{var n;if(-1!==e.indexOf(\".css\")){if((n=document.querySelectorAll('link[href=\"'+e+'\"]'))&&n.length>0)return void(T(i)&&i());var s=document.getElementsByTagName(\"head\")[0],l=s.querySelectorAll('link[rel=\"stylesheet\"]'),o=document.createElement(\"link\");return o.rel=\"stylesheet\",o.type=\"text/css\",o.href=e,o.media=\"all\",l?s.insertBefore(o,l[0]):s.appendChild(o),void(T(i)&&i())}if((n=document.querySelectorAll('script[src=\"'+e+'\"]'))&&n.length>0){if(T(i)){if(C(t))return b((function(){return void 0!==window[t]}),(function(){i()})),!1;i()}}else{var r=document.createElement(\"script\");r.type=\"text/javascript\",r.src=e,r.onload=function(){if(T(i)){if(C(t))return b((function(){return void 0!==window[t]}),(function(){i()})),!1;i()}},document.body.appendChild(r)}}}function w(){return\"navigator\"in window&&window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i)}function T(e){return\"function\"==typeof e}function C(e){return\"string\"==typeof e}function k(e){return!(!e||!e.nodeType||1!=e.nodeType)}function E(e){return Array.isArray(e)}function A(e){return e&&e.length&&isFinite(e.length)}function L(t){return\"object\"===e(t)&&null!=t&&!T(t)&&!E(t)}function I(e){return null==e}function O(e,t){return null!==e&&hasOwnProperty.call(e,t)}function P(e){if(L(e)){if(e.keys)return e.keys().length;var t=0;for(var i in e)O(e,i)&&t++;return t}return e.length}function M(e){return!isNaN(parseFloat(e))&&isFinite(e)}function z(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,t=document.querySelectorAll(\".gbtn[data-taborder]:not(.disabled)\");if(!t.length)return!1;if(1==t.length)return t[0];\"string\"==typeof e&&(e=parseInt(e));var i=[];o(t,(function(e){i.push(e.getAttribute(\"data-taborder\"))}));var n=Math.max.apply(Math,i.map((function(e){return parseInt(e)}))),s=e<0?1:e+1;s>n&&(s=\"1\");var l=i.filter((function(e){return e>=parseInt(s)})),r=l.sort()[0];return document.querySelector('.gbtn[data-taborder=\"'.concat(r,'\"]'))}function X(e){if(e.events.hasOwnProperty(\"keyboard\"))return!1;e.events.keyboard=a(\"keydown\",{onElement:window,withCallback:function(t,i){var n=(t=t||window.event).keyCode;if(9==n){var s=document.querySelector(\".gbtn.focused\");if(!s){var l=!(!document.activeElement||!document.activeElement.nodeName)&&document.activeElement.nodeName.toLocaleLowerCase();if(\"input\"==l||\"textarea\"==l||\"button\"==l)return}t.preventDefault();var o=document.querySelectorAll(\".gbtn[data-taborder]\");if(!o||o.length<=0)return;if(!s){var r=z();return void(r&&(r.focus(),h(r,\"focused\")))}var a=z(s.getAttribute(\"data-taborder\"));d(s,\"focused\"),a&&(a.focus(),h(a,\"focused\"))}39==n&&e.nextSlide(),37==n&&e.prevSlide(),27==n&&e.close()}})}function Y(e){return Math.sqrt(e.x*e.x+e.y*e.y)}function q(e,t){var i=function(e,t){var i=Y(e)*Y(t);if(0===i)return 0;var n=function(e,t){return e.x*t.x+e.y*t.y}(e,t)/i;return n>1&&(n=1),Math.acos(n)}(e,t);return function(e,t){return e.x*t.y-t.x*e.y}(e,t)>0&&(i*=-1),180*i/Math.PI}var N=function(){function e(i){t(this,e),this.handlers=[],this.el=i}return n(e,[{key:\"add\",value:function(e){this.handlers.push(e)}},{key:\"del\",value:function(e){e||(this.handlers=[]);for(var t=this.handlers.length;t>=0;t--)this.handlers[t]===e&&this.handlers.splice(t,1)}},{key:\"dispatch\",value:function(){for(var e=0,t=this.handlers.length;e<t;e++){var i=this.handlers[e];\"function\"==typeof i&&i.apply(this.el,arguments)}}}]),e}();function D(e,t){var i=new N(e);return i.add(t),i}var _=function(){function e(i,n){t(this,e),this.element=\"string\"==typeof i?document.querySelector(i):i,this.start=this.start.bind(this),this.move=this.move.bind(this),this.end=this.end.bind(this),this.cancel=this.cancel.bind(this),this.element.addEventListener(\"touchstart\",this.start,!1),this.element.addEventListener(\"touchmove\",this.move,!1),this.element.addEventListener(\"touchend\",this.end,!1),this.element.addEventListener(\"touchcancel\",this.cancel,!1),this.preV={x:null,y:null},this.pinchStartLen=null,this.zoom=1,this.isDoubleTap=!1;var s=function(){};this.rotate=D(this.element,n.rotate||s),this.touchStart=D(this.element,n.touchStart||s),this.multipointStart=D(this.element,n.multipointStart||s),this.multipointEnd=D(this.element,n.multipointEnd||s),this.pinch=D(this.element,n.pinch||s),this.swipe=D(this.element,n.swipe||s),this.tap=D(this.element,n.tap||s),this.doubleTap=D(this.element,n.doubleTap||s),this.longTap=D(this.element,n.longTap||s),this.singleTap=D(this.element,n.singleTap||s),this.pressMove=D(this.element,n.pressMove||s),this.twoFingerPressMove=D(this.element,n.twoFingerPressMove||s),this.touchMove=D(this.element,n.touchMove||s),this.touchEnd=D(this.element,n.touchEnd||s),this.touchCancel=D(this.element,n.touchCancel||s),this.translateContainer=this.element,this._cancelAllHandler=this.cancelAll.bind(this),window.addEventListener(\"scroll\",this._cancelAllHandler),this.delta=null,this.last=null,this.now=null,this.tapTimeout=null,this.singleTapTimeout=null,this.longTapTimeout=null,this.swipeTimeout=null,this.x1=this.x2=this.y1=this.y2=null,this.preTapPosition={x:null,y:null}}return n(e,[{key:\"start\",value:function(e){if(e.touches){if(e.target&&e.target.nodeName&&[\"a\",\"button\",\"input\"].indexOf(e.target.nodeName.toLowerCase())>=0)console.log(\"ignore drag for this touched element\",e.target.nodeName.toLowerCase());else{this.now=Date.now(),this.x1=e.touches[0].pageX,this.y1=e.touches[0].pageY,this.delta=this.now-(this.last||this.now),this.touchStart.dispatch(e,this.element),null!==this.preTapPosition.x&&(this.isDoubleTap=this.delta>0&&this.delta<=250&&Math.abs(this.preTapPosition.x-this.x1)<30&&Math.abs(this.preTapPosition.y-this.y1)<30,this.isDoubleTap&&clearTimeout(this.singleTapTimeout)),this.preTapPosition.x=this.x1,this.preTapPosition.y=this.y1,this.last=this.now;var t=this.preV;if(e.touches.length>1){this._cancelLongTap(),this._cancelSingleTap();var i={x:e.touches[1].pageX-this.x1,y:e.touches[1].pageY-this.y1};t.x=i.x,t.y=i.y,this.pinchStartLen=Y(t),this.multipointStart.dispatch(e,this.element)}this._preventTap=!1,this.longTapTimeout=setTimeout(function(){this.longTap.dispatch(e,this.element),this._preventTap=!0}.bind(this),750)}}}},{key:\"move\",value:function(e){if(e.touches){var t=this.preV,i=e.touches.length,n=e.touches[0].pageX,s=e.touches[0].pageY;if(this.isDoubleTap=!1,i>1){var l=e.touches[1].pageX,o=e.touches[1].pageY,r={x:e.touches[1].pageX-n,y:e.touches[1].pageY-s};null!==t.x&&(this.pinchStartLen>0&&(e.zoom=Y(r)/this.pinchStartLen,this.pinch.dispatch(e,this.element)),e.angle=q(r,t),this.rotate.dispatch(e,this.element)),t.x=r.x,t.y=r.y,null!==this.x2&&null!==this.sx2?(e.deltaX=(n-this.x2+l-this.sx2)/2,e.deltaY=(s-this.y2+o-this.sy2)/2):(e.deltaX=0,e.deltaY=0),this.twoFingerPressMove.dispatch(e,this.element),this.sx2=l,this.sy2=o}else{if(null!==this.x2){e.deltaX=n-this.x2,e.deltaY=s-this.y2;var a=Math.abs(this.x1-this.x2),h=Math.abs(this.y1-this.y2);(a>10||h>10)&&(this._preventTap=!0)}else e.deltaX=0,e.deltaY=0;this.pressMove.dispatch(e,this.element)}this.touchMove.dispatch(e,this.element),this._cancelLongTap(),this.x2=n,this.y2=s,i>1&&e.preventDefault()}}},{key:\"end\",value:function(e){if(e.changedTouches){this._cancelLongTap();var t=this;e.touches.length<2&&(this.multipointEnd.dispatch(e,this.element),this.sx2=this.sy2=null),this.x2&&Math.abs(this.x1-this.x2)>30||this.y2&&Math.abs(this.y1-this.y2)>30?(e.direction=this._swipeDirection(this.x1,this.x2,this.y1,this.y2),this.swipeTimeout=setTimeout((function(){t.swipe.dispatch(e,t.element)}),0)):(this.tapTimeout=setTimeout((function(){t._preventTap||t.tap.dispatch(e,t.element),t.isDoubleTap&&(t.doubleTap.dispatch(e,t.element),t.isDoubleTap=!1)}),0),t.isDoubleTap||(t.singleTapTimeout=setTimeout((function(){t.singleTap.dispatch(e,t.element)}),250))),this.touchEnd.dispatch(e,this.element),this.preV.x=0,this.preV.y=0,this.zoom=1,this.pinchStartLen=null,this.x1=this.x2=this.y1=this.y2=null}}},{key:\"cancelAll\",value:function(){this._preventTap=!0,clearTimeout(this.singleTapTimeout),clearTimeout(this.tapTimeout),clearTimeout(this.longTapTimeout),clearTimeout(this.swipeTimeout)}},{key:\"cancel\",value:function(e){this.cancelAll(),this.touchCancel.dispatch(e,this.element)}},{key:\"_cancelLongTap\",value:function(){clearTimeout(this.longTapTimeout)}},{key:\"_cancelSingleTap\",value:function(){clearTimeout(this.singleTapTimeout)}},{key:\"_swipeDirection\",value:function(e,t,i,n){return Math.abs(e-t)>=Math.abs(i-n)?e-t>0?\"Left\":\"Right\":i-n>0?\"Up\":\"Down\"}},{key:\"on\",value:function(e,t){this[e]&&this[e].add(t)}},{key:\"off\",value:function(e,t){this[e]&&this[e].del(t)}},{key:\"destroy\",value:function(){return this.singleTapTimeout&&clearTimeout(this.singleTapTimeout),this.tapTimeout&&clearTimeout(this.tapTimeout),this.longTapTimeout&&clearTimeout(this.longTapTimeout),this.swipeTimeout&&clearTimeout(this.swipeTimeout),this.element.removeEventListener(\"touchstart\",this.start),this.element.removeEventListener(\"touchmove\",this.move),this.element.removeEventListener(\"touchend\",this.end),this.element.removeEventListener(\"touchcancel\",this.cancel),this.rotate.del(),this.touchStart.del(),this.multipointStart.del(),this.multipointEnd.del(),this.pinch.del(),this.swipe.del(),this.tap.del(),this.doubleTap.del(),this.longTap.del(),this.singleTap.del(),this.pressMove.del(),this.twoFingerPressMove.del(),this.touchMove.del(),this.touchEnd.del(),this.touchCancel.del(),this.preV=this.pinchStartLen=this.zoom=this.isDoubleTap=this.delta=this.last=this.now=this.tapTimeout=this.singleTapTimeout=this.longTapTimeout=this.swipeTimeout=this.x1=this.x2=this.y1=this.y2=this.preTapPosition=this.rotate=this.touchStart=this.multipointStart=this.multipointEnd=this.pinch=this.swipe=this.tap=this.doubleTap=this.longTap=this.singleTap=this.pressMove=this.touchMove=this.touchEnd=this.touchCancel=this.twoFingerPressMove=null,window.removeEventListener(\"scroll\",this._cancelAllHandler),null}}]),e}();function W(e){var t=function(){var e,t=document.createElement(\"fakeelement\"),i={transition:\"transitionend\",OTransition:\"oTransitionEnd\",MozTransition:\"transitionend\",WebkitTransition:\"webkitTransitionEnd\"};for(e in i)if(void 0!==t.style[e])return i[e]}(),i=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,n=c(e,\"gslide-media\")?e:e.querySelector(\".gslide-media\"),s=u(n,\".ginner-container\"),l=e.querySelector(\".gslide-description\");i>769&&(n=s),h(n,\"greset\"),v(n,\"translate3d(0, 0, 0)\"),a(t,{onElement:n,once:!0,withCallback:function(e,t){d(n,\"greset\")}}),n.style.opacity=\"\",l&&(l.style.opacity=\"\")}function B(e){if(e.events.hasOwnProperty(\"touch\"))return!1;var t,i,n,s=y(),l=s.width,o=s.height,r=!1,a=null,g=null,f=null,p=!1,m=1,x=1,b=!1,S=!1,w=null,T=null,C=null,k=null,E=0,A=0,L=!1,I=!1,O={},P={},M=0,z=0,X=document.getElementById(\"glightbox-slider\"),Y=document.querySelector(\".goverlay\"),q=new _(X,{touchStart:function(t){if(r=!0,(c(t.targetTouches[0].target,\"ginner-container\")||u(t.targetTouches[0].target,\".gslide-desc\")||\"a\"==t.targetTouches[0].target.nodeName.toLowerCase())&&(r=!1),u(t.targetTouches[0].target,\".gslide-inline\")&&!c(t.targetTouches[0].target.parentNode,\"gslide-inline\")&&(r=!1),r){if(P=t.targetTouches[0],O.pageX=t.targetTouches[0].pageX,O.pageY=t.targetTouches[0].pageY,M=t.targetTouches[0].clientX,z=t.targetTouches[0].clientY,a=e.activeSlide,g=a.querySelector(\".gslide-media\"),n=a.querySelector(\".gslide-inline\"),f=null,c(g,\"gslide-image\")&&(f=g.querySelector(\"img\")),(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)>769&&(g=a.querySelector(\".ginner-container\")),d(Y,\"greset\"),t.pageX>20&&t.pageX<window.innerWidth-20)return;t.preventDefault()}},touchMove:function(s){if(r&&(P=s.targetTouches[0],!b&&!S)){if(n&&n.offsetHeight>o){var a=O.pageX-P.pageX;if(Math.abs(a)<=13)return!1}p=!0;var h,d=s.targetTouches[0].clientX,c=s.targetTouches[0].clientY,u=M-d,m=z-c;if(Math.abs(u)>Math.abs(m)?(L=!1,I=!0):(I=!1,L=!0),t=P.pageX-O.pageX,E=100*t/l,i=P.pageY-O.pageY,A=100*i/o,L&&f&&(h=1-Math.abs(i)/o,Y.style.opacity=h,e.settings.touchFollowAxis&&(E=0)),I&&(h=1-Math.abs(t)/l,g.style.opacity=h,e.settings.touchFollowAxis&&(A=0)),!f)return v(g,\"translate3d(\".concat(E,\"%, 0, 0)\"));v(g,\"translate3d(\".concat(E,\"%, \").concat(A,\"%, 0)\"))}},touchEnd:function(){if(r){if(p=!1,S||b)return C=w,void(k=T);var t=Math.abs(parseInt(A)),i=Math.abs(parseInt(E));if(!(t>29&&f))return t<29&&i<25?(h(Y,\"greset\"),Y.style.opacity=1,W(g)):void 0;e.close()}},multipointEnd:function(){setTimeout((function(){b=!1}),50)},multipointStart:function(){b=!0,m=x||1},pinch:function(e){if(!f||p)return!1;b=!0,f.scaleX=f.scaleY=m*e.zoom;var t=m*e.zoom;if(S=!0,t<=1)return S=!1,t=1,k=null,C=null,w=null,T=null,void f.setAttribute(\"style\",\"\");t>4.5&&(t=4.5),f.style.transform=\"scale3d(\".concat(t,\", \").concat(t,\", 1)\"),x=t},pressMove:function(e){if(S&&!b){var t=P.pageX-O.pageX,i=P.pageY-O.pageY;C&&(t+=C),k&&(i+=k),w=t,T=i;var n=\"translate3d(\".concat(t,\"px, \").concat(i,\"px, 0)\");x&&(n+=\" scale3d(\".concat(x,\", \").concat(x,\", 1)\")),v(f,n)}},swipe:function(t){if(!S)if(b)b=!1;else{if(\"Left\"==t.direction){if(e.index==e.elements.length-1)return W(g);e.nextSlide()}if(\"Right\"==t.direction){if(0==e.index)return W(g);e.prevSlide()}}}});e.events.touch=q}var H=function(){function e(i,n){var s=this,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(t(this,e),this.img=i,this.slide=n,this.onclose=l,this.img.setZoomEvents)return!1;this.active=!1,this.zoomedIn=!1,this.dragging=!1,this.currentX=null,this.currentY=null,this.initialX=null,this.initialY=null,this.xOffset=0,this.yOffset=0,this.img.addEventListener(\"mousedown\",(function(e){return s.dragStart(e)}),!1),this.img.addEventListener(\"mouseup\",(function(e){return s.dragEnd(e)}),!1),this.img.addEventListener(\"mousemove\",(function(e){return s.drag(e)}),!1),this.img.addEventListener(\"click\",(function(e){return s.slide.classList.contains(\"dragging-nav\")?(s.zoomOut(),!1):s.zoomedIn?void(s.zoomedIn&&!s.dragging&&s.zoomOut()):s.zoomIn()}),!1),this.img.setZoomEvents=!0}return n(e,[{key:\"zoomIn\",value:function(){var e=this.widowWidth();if(!(this.zoomedIn||e<=768)){var t=this.img;if(t.setAttribute(\"data-style\",t.getAttribute(\"style\")),t.style.maxWidth=t.naturalWidth+\"px\",t.style.maxHeight=t.naturalHeight+\"px\",t.naturalWidth>e){var i=e/2-t.naturalWidth/2;this.setTranslate(this.img.parentNode,i,0)}this.slide.classList.add(\"zoomed\"),this.zoomedIn=!0}}},{key:\"zoomOut\",value:function(){this.img.parentNode.setAttribute(\"style\",\"\"),this.img.setAttribute(\"style\",this.img.getAttribute(\"data-style\")),this.slide.classList.remove(\"zoomed\"),this.zoomedIn=!1,this.currentX=null,this.currentY=null,this.initialX=null,this.initialY=null,this.xOffset=0,this.yOffset=0,this.onclose&&\"function\"==typeof this.onclose&&this.onclose()}},{key:\"dragStart\",value:function(e){e.preventDefault(),this.zoomedIn?(\"touchstart\"===e.type?(this.initialX=e.touches[0].clientX-this.xOffset,this.initialY=e.touches[0].clientY-this.yOffset):(this.initialX=e.clientX-this.xOffset,this.initialY=e.clientY-this.yOffset),e.target===this.img&&(this.active=!0,this.img.classList.add(\"dragging\"))):this.active=!1}},{key:\"dragEnd\",value:function(e){var t=this;e.preventDefault(),this.initialX=this.currentX,this.initialY=this.currentY,this.active=!1,setTimeout((function(){t.dragging=!1,t.img.isDragging=!1,t.img.classList.remove(\"dragging\")}),100)}},{key:\"drag\",value:function(e){this.active&&(e.preventDefault(),\"touchmove\"===e.type?(this.currentX=e.touches[0].clientX-this.initialX,this.currentY=e.touches[0].clientY-this.initialY):(this.currentX=e.clientX-this.initialX,this.currentY=e.clientY-this.initialY),this.xOffset=this.currentX,this.yOffset=this.currentY,this.img.isDragging=!0,this.dragging=!0,this.setTranslate(this.img,this.currentX,this.currentY))}},{key:\"onMove\",value:function(e){if(this.zoomedIn){var t=e.clientX-this.img.naturalWidth/2,i=e.clientY-this.img.naturalHeight/2;this.setTranslate(this.img,t,i)}}},{key:\"setTranslate\",value:function(e,t,i){e.style.transform=\"translate3d(\"+t+\"px, \"+i+\"px, 0)\"}},{key:\"widowWidth\",value:function(){return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth}}]),e}(),V=function(){function e(){var i=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t(this,e);var s=n.dragEl,l=n.toleranceX,o=void 0===l?40:l,r=n.toleranceY,a=void 0===r?65:r,h=n.slide,d=void 0===h?null:h,c=n.instance,u=void 0===c?null:c;this.el=s,this.active=!1,this.dragging=!1,this.currentX=null,this.currentY=null,this.initialX=null,this.initialY=null,this.xOffset=0,this.yOffset=0,this.direction=null,this.lastDirection=null,this.toleranceX=o,this.toleranceY=a,this.toleranceReached=!1,this.dragContainer=this.el,this.slide=d,this.instance=u,this.el.addEventListener(\"mousedown\",(function(e){return i.dragStart(e)}),!1),this.el.addEventListener(\"mouseup\",(function(e){return i.dragEnd(e)}),!1),this.el.addEventListener(\"mousemove\",(function(e){return i.drag(e)}),!1)}return n(e,[{key:\"dragStart\",value:function(e){if(this.slide.classList.contains(\"zoomed\"))this.active=!1;else{\"touchstart\"===e.type?(this.initialX=e.touches[0].clientX-this.xOffset,this.initialY=e.touches[0].clientY-this.yOffset):(this.initialX=e.clientX-this.xOffset,this.initialY=e.clientY-this.yOffset);var t=e.target.nodeName.toLowerCase();e.target.classList.contains(\"nodrag\")||u(e.target,\".nodrag\")||-1!==[\"input\",\"select\",\"textarea\",\"button\",\"a\"].indexOf(t)?this.active=!1:(e.preventDefault(),(e.target===this.el||\"img\"!==t&&u(e.target,\".gslide-inline\"))&&(this.active=!0,this.el.classList.add(\"dragging\"),this.dragContainer=u(e.target,\".ginner-container\")))}}},{key:\"dragEnd\",value:function(e){var t=this;e&&e.preventDefault(),this.initialX=0,this.initialY=0,this.currentX=null,this.currentY=null,this.initialX=null,this.initialY=null,this.xOffset=0,this.yOffset=0,this.active=!1,this.doSlideChange&&(this.instance.preventOutsideClick=!0,\"right\"==this.doSlideChange&&this.instance.prevSlide(),\"left\"==this.doSlideChange&&this.instance.nextSlide()),this.doSlideClose&&this.instance.close(),this.toleranceReached||this.setTranslate(this.dragContainer,0,0,!0),setTimeout((function(){t.instance.preventOutsideClick=!1,t.toleranceReached=!1,t.lastDirection=null,t.dragging=!1,t.el.isDragging=!1,t.el.classList.remove(\"dragging\"),t.slide.classList.remove(\"dragging-nav\"),t.dragContainer.style.transform=\"\",t.dragContainer.style.transition=\"\"}),100)}},{key:\"drag\",value:function(e){if(this.active){e.preventDefault(),this.slide.classList.add(\"dragging-nav\"),\"touchmove\"===e.type?(this.currentX=e.touches[0].clientX-this.initialX,this.currentY=e.touches[0].clientY-this.initialY):(this.currentX=e.clientX-this.initialX,this.currentY=e.clientY-this.initialY),this.xOffset=this.currentX,this.yOffset=this.currentY,this.el.isDragging=!0,this.dragging=!0,this.doSlideChange=!1,this.doSlideClose=!1;var t=Math.abs(this.currentX),i=Math.abs(this.currentY);if(t>0&&t>=Math.abs(this.currentY)&&(!this.lastDirection||\"x\"==this.lastDirection)){this.yOffset=0,this.lastDirection=\"x\",this.setTranslate(this.dragContainer,this.currentX,0);var n=this.shouldChange();if(!this.instance.settings.dragAutoSnap&&n&&(this.doSlideChange=n),this.instance.settings.dragAutoSnap&&n)return this.instance.preventOutsideClick=!0,this.toleranceReached=!0,this.active=!1,this.instance.preventOutsideClick=!0,this.dragEnd(null),\"right\"==n&&this.instance.prevSlide(),void(\"left\"==n&&this.instance.nextSlide())}if(this.toleranceY>0&&i>0&&i>=t&&(!this.lastDirection||\"y\"==this.lastDirection)){this.xOffset=0,this.lastDirection=\"y\",this.setTranslate(this.dragContainer,0,this.currentY);var s=this.shouldClose();return!this.instance.settings.dragAutoSnap&&s&&(this.doSlideClose=!0),void(this.instance.settings.dragAutoSnap&&s&&this.instance.close())}}}},{key:\"shouldChange\",value:function(){var e=!1;if(Math.abs(this.currentX)>=this.toleranceX){var t=this.currentX>0?\"right\":\"left\";(\"left\"==t&&this.slide!==this.slide.parentNode.lastChild||\"right\"==t&&this.slide!==this.slide.parentNode.firstChild)&&(e=t)}return e}},{key:\"shouldClose\",value:function(){var e=!1;return Math.abs(this.currentY)>=this.toleranceY&&(e=!0),e}},{key:\"setTranslate\",value:function(e,t,i){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];e.style.transition=n?\"all .2s ease\":\"\",e.style.transform=\"translate3d(\".concat(t,\"px, \").concat(i,\"px, 0)\")}}]),e}();function j(e,t,i,n){var s=e.querySelector(\".gslide-media\"),l=new Image,o=\"gSlideTitle_\"+i,r=\"gSlideDesc_\"+i;l.addEventListener(\"load\",(function(){T(n)&&n()}),!1),l.src=t.href,\"\"!=t.sizes&&\"\"!=t.srcset&&(l.sizes=t.sizes,l.srcset=t.srcset),l.alt=\"\",I(t.alt)||\"\"===t.alt||(l.alt=t.alt),\"\"!==t.title&&l.setAttribute(\"aria-labelledby\",o),\"\"!==t.description&&l.setAttribute(\"aria-describedby\",r),t.hasOwnProperty(\"_hasCustomWidth\")&&t._hasCustomWidth&&(l.style.width=t.width),t.hasOwnProperty(\"_hasCustomHeight\")&&t._hasCustomHeight&&(l.style.height=t.height),s.insertBefore(l,s.firstChild)}function F(e,t,i,n){var s=this,l=e.querySelector(\".ginner-container\"),o=\"gvideo\"+i,r=e.querySelector(\".gslide-media\"),a=this.getAllPlayers();h(l,\"gvideo-container\"),r.insertBefore(m('<div class=\"gvideo-wrapper\"></div>'),r.firstChild);var d=e.querySelector(\".gvideo-wrapper\");S(this.settings.plyr.css,\"Plyr\");var c=t.href,u=null==t?void 0:t.videoProvider,g=!1;r.style.maxWidth=t.width,S(this.settings.plyr.js,\"Plyr\",(function(){if(!u&&c.match(/vimeo\\.com\\/([0-9]*)/)&&(u=\"vimeo\"),!u&&(c.match(/(youtube\\.com|youtube-nocookie\\.com)\\/watch\\?v=([a-zA-Z0-9\\-_]+)/)||c.match(/youtu\\.be\\/([a-zA-Z0-9\\-_]+)/)||c.match(/(youtube\\.com|youtube-nocookie\\.com)\\/embed\\/([a-zA-Z0-9\\-_]+)/))&&(u=\"youtube\"),\"local\"===u||!u){u=\"local\";var l='<video id=\"'+o+'\" ';l+='style=\"background:#000; max-width: '.concat(t.width,';\" '),l+='preload=\"metadata\" ',l+='x-webkit-airplay=\"allow\" ',l+=\"playsinline \",l+=\"controls \",l+='class=\"gvideo-local\">',l+='<source src=\"'.concat(c,'\">'),g=m(l+=\"</video>\")}var r=g||m('<div id=\"'.concat(o,'\" data-plyr-provider=\"').concat(u,'\" data-plyr-embed-id=\"').concat(c,'\"></div>'));h(d,\"\".concat(u,\"-video gvideo\")),d.appendChild(r),d.setAttribute(\"data-id\",o),d.setAttribute(\"data-index\",i);var v=O(s.settings.plyr,\"config\")?s.settings.plyr.config:{},f=new Plyr(\"#\"+o,v);f.on(\"ready\",(function(e){a[o]=e.detail.plyr,T(n)&&n()})),b((function(){return e.querySelector(\"iframe\")&&\"true\"==e.querySelector(\"iframe\").dataset.ready}),(function(){s.resize(e)})),f.on(\"enterfullscreen\",R),f.on(\"exitfullscreen\",R)}))}function R(e){var t=u(e.target,\".gslide-media\");\"enterfullscreen\"===e.type&&h(t,\"fullscreen\"),\"exitfullscreen\"===e.type&&d(t,\"fullscreen\")}function G(e,t,i,n){var s,l=this,o=e.querySelector(\".gslide-media\"),r=!(!O(t,\"href\")||!t.href)&&t.href.split(\"#\").pop().trim(),d=!(!O(t,\"content\")||!t.content)&&t.content;if(d&&(C(d)&&(s=m('<div class=\"ginlined-content\">'.concat(d,\"</div>\"))),k(d))){\"none\"==d.style.display&&(d.style.display=\"block\");var c=document.createElement(\"div\");c.className=\"ginlined-content\",c.appendChild(d),s=c}if(r){var u=document.getElementById(r);if(!u)return!1;var g=u.cloneNode(!0);g.style.height=t.height,g.style.maxWidth=t.width,h(g,\"ginlined-content\"),s=g}if(!s)return console.error(\"Unable to append inline slide content\",t),!1;o.style.height=t.height,o.style.width=t.width,o.appendChild(s),this.events[\"inlineclose\"+r]=a(\"click\",{onElement:o.querySelectorAll(\".gtrigger-close\"),withCallback:function(e){e.preventDefault(),l.close()}}),T(n)&&n()}function Z(e,t,i,n){var s=e.querySelector(\".gslide-media\"),l=function(e){var t=e.url,i=e.allow,n=e.callback,s=e.appendTo,l=document.createElement(\"iframe\");return l.className=\"vimeo-video gvideo\",l.src=t,l.style.width=\"100%\",l.style.height=\"100%\",i&&l.setAttribute(\"allow\",i),l.onload=function(){l.onload=null,h(l,\"node-ready\"),T(n)&&n()},s&&s.appendChild(l),l}({url:t.href,callback:n});s.parentNode.style.maxWidth=t.width,s.parentNode.style.height=t.height,s.appendChild(l)}var U=function(){function e(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t(this,e),this.defaults={href:\"\",sizes:\"\",srcset:\"\",title:\"\",type:\"\",videoProvider:\"\",description:\"\",alt:\"\",descPosition:\"bottom\",effect:\"\",width:\"\",height:\"\",content:!1,zoomable:!0,draggable:!0},L(i)&&(this.defaults=l(this.defaults,i))}return n(e,[{key:\"sourceType\",value:function(e){var t=e;if(null!==(e=e.toLowerCase()).match(/\\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/))return\"image\";if(e.match(/(youtube\\.com|youtube-nocookie\\.com)\\/watch\\?v=([a-zA-Z0-9\\-_]+)/)||e.match(/youtu\\.be\\/([a-zA-Z0-9\\-_]+)/)||e.match(/(youtube\\.com|youtube-nocookie\\.com)\\/embed\\/([a-zA-Z0-9\\-_]+)/))return\"video\";if(e.match(/vimeo\\.com\\/([0-9]*)/))return\"video\";if(null!==e.match(/\\.(mp4|ogg|webm|mov)/))return\"video\";if(null!==e.match(/\\.(mp3|wav|wma|aac|ogg)/))return\"audio\";if(e.indexOf(\"#\")>-1&&\"\"!==t.split(\"#\").pop().trim())return\"inline\";return e.indexOf(\"goajax=true\")>-1?\"ajax\":\"external\"}},{key:\"parseConfig\",value:function(e,t){var i=this,n=l({descPosition:t.descPosition},this.defaults);if(L(e)&&!k(e)){O(e,\"type\")||(O(e,\"content\")&&e.content?e.type=\"inline\":O(e,\"href\")&&(e.type=this.sourceType(e.href)));var s=l(n,e);return this.setSize(s,t),s}var r=\"\",a=e.getAttribute(\"data-glightbox\"),h=e.nodeName.toLowerCase();if(\"a\"===h&&(r=e.href),\"img\"===h&&(r=e.src,n.alt=e.alt),n.href=r,o(n,(function(s,l){O(t,l)&&\"width\"!==l&&(n[l]=t[l]);var o=e.dataset[l];I(o)||(n[l]=i.sanitizeValue(o))})),n.content&&(n.type=\"inline\"),!n.type&&r&&(n.type=this.sourceType(r)),I(a)){if(!n.title&&\"a\"==h){var d=e.title;I(d)||\"\"===d||(n.title=d)}if(!n.title&&\"img\"==h){var c=e.alt;I(c)||\"\"===c||(n.title=c)}}else{var u=[];o(n,(function(e,t){u.push(\";\\\\s?\"+t)})),u=u.join(\"\\\\s?:|\"),\"\"!==a.trim()&&o(n,(function(e,t){var s=a,l=new RegExp(\"s?\"+t+\"s?:s?(.*?)(\"+u+\"s?:|$)\"),o=s.match(l);if(o&&o.length&&o[1]){var r=o[1].trim().replace(/;\\s*$/,\"\");n[t]=i.sanitizeValue(r)}}))}if(n.description&&\".\"===n.description.substring(0,1)){var g;try{g=document.querySelector(n.description).innerHTML}catch(e){if(!(e instanceof DOMException))throw e}g&&(n.description=g)}if(!n.description){var v=e.querySelector(\".glightbox-desc\");v&&(n.description=v.innerHTML)}return this.setSize(n,t,e),this.slideConfig=n,n}},{key:\"setSize\",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=\"video\"==e.type?this.checkSize(t.videosWidth):this.checkSize(t.width),s=this.checkSize(t.height);return e.width=O(e,\"width\")&&\"\"!==e.width?this.checkSize(e.width):n,e.height=O(e,\"height\")&&\"\"!==e.height?this.checkSize(e.height):s,i&&\"image\"==e.type&&(e._hasCustomWidth=!!i.dataset.width,e._hasCustomHeight=!!i.dataset.height),e}},{key:\"checkSize\",value:function(e){return M(e)?\"\".concat(e,\"px\"):e}},{key:\"sanitizeValue\",value:function(e){return\"true\"!==e&&\"false\"!==e?e:\"true\"===e}}]),e}(),$=function(){function e(i,n,s){t(this,e),this.element=i,this.instance=n,this.index=s}return n(e,[{key:\"setContent\",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(c(t,\"loaded\"))return!1;var n=this.instance.settings,s=this.slideConfig,l=w();T(n.beforeSlideLoad)&&n.beforeSlideLoad({index:this.index,slide:t,player:!1});var o=s.type,r=s.descPosition,a=t.querySelector(\".gslide-media\"),d=t.querySelector(\".gslide-title\"),u=t.querySelector(\".gslide-desc\"),g=t.querySelector(\".gdesc-inner\"),v=i,f=\"gSlideTitle_\"+this.index,p=\"gSlideDesc_\"+this.index;if(T(n.afterSlideLoad)&&(v=function(){T(i)&&i(),n.afterSlideLoad({index:e.index,slide:t,player:e.instance.getSlidePlayerInstance(e.index)})}),\"\"==s.title&&\"\"==s.description?g&&g.parentNode.parentNode.removeChild(g.parentNode):(d&&\"\"!==s.title?(d.id=f,d.innerHTML=s.title):d.parentNode.removeChild(d),u&&\"\"!==s.description?(u.id=p,l&&n.moreLength>0?(s.smallDescription=this.slideShortDesc(s.description,n.moreLength,n.moreText),u.innerHTML=s.smallDescription,this.descriptionEvents(u,s)):u.innerHTML=s.description):u.parentNode.removeChild(u),h(a.parentNode,\"desc-\".concat(r)),h(g.parentNode,\"description-\".concat(r))),h(a,\"gslide-\".concat(o)),h(t,\"loaded\"),\"video\"!==o){if(\"external\"!==o)return\"inline\"===o?(G.apply(this.instance,[t,s,this.index,v]),void(s.draggable&&new V({dragEl:t.querySelector(\".gslide-inline\"),toleranceX:n.dragToleranceX,toleranceY:n.dragToleranceY,slide:t,instance:this.instance}))):void(\"image\"!==o?T(v)&&v():j(t,s,this.index,(function(){var i=t.querySelector(\"img\");s.draggable&&new V({dragEl:i,toleranceX:n.dragToleranceX,toleranceY:n.dragToleranceY,slide:t,instance:e.instance}),s.zoomable&&i.naturalWidth>i.offsetWidth&&(h(i,\"zoomable\"),new H(i,t,(function(){e.instance.resize()}))),T(v)&&v()})));Z.apply(this,[t,s,this.index,v])}else F.apply(this.instance,[t,s,this.index,v])}},{key:\"slideShortDesc\",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50,i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=document.createElement(\"div\");n.innerHTML=e;var s=n.innerText,l=i;if((e=s.trim()).length<=t)return e;var o=e.substr(0,t-1);return l?(n=null,o+'... <a href=\"#\" class=\"desc-more\">'+i+\"</a>\"):o}},{key:\"descriptionEvents\",value:function(e,t){var i=this,n=e.querySelector(\".desc-more\");if(!n)return!1;a(\"click\",{onElement:n,withCallback:function(e,n){e.preventDefault();var s=document.body,l=u(n,\".gslide-desc\");if(!l)return!1;l.innerHTML=t.description,h(s,\"gdesc-open\");var o=a(\"click\",{onElement:[s,u(l,\".gslide-description\")],withCallback:function(e,n){\"a\"!==e.target.nodeName.toLowerCase()&&(d(s,\"gdesc-open\"),h(s,\"gdesc-closed\"),l.innerHTML=t.smallDescription,i.descriptionEvents(l,t),setTimeout((function(){d(s,\"gdesc-closed\")}),400),o.destroy())}})}})}},{key:\"create\",value:function(){return m(this.instance.settings.slideHTML)}},{key:\"getConfig\",value:function(){k(this.element)||this.element.hasOwnProperty(\"draggable\")||(this.element.draggable=this.instance.settings.draggable);var e=new U(this.instance.settings.slideExtraAttributes);return this.slideConfig=e.parseConfig(this.element,this.instance.settings),this.slideConfig}}]),e}(),J=w(),K=null!==w()||void 0!==document.createTouch||\"ontouchstart\"in window||\"onmsgesturechange\"in window||navigator.msMaxTouchPoints,Q=document.getElementsByTagName(\"html\")[0],ee={selector:\".glightbox\",elements:null,skin:\"clean\",theme:\"clean\",closeButton:!0,startAt:null,autoplayVideos:!0,autofocusVideos:!0,descPosition:\"bottom\",width:\"900px\",height:\"506px\",videosWidth:\"960px\",beforeSlideChange:null,afterSlideChange:null,beforeSlideLoad:null,afterSlideLoad:null,slideInserted:null,slideRemoved:null,slideExtraAttributes:null,onOpen:null,onClose:null,loop:!1,zoomable:!0,draggable:!0,dragAutoSnap:!1,dragToleranceX:40,dragToleranceY:65,preload:!0,oneSlidePerOpen:!1,touchNavigation:!0,touchFollowAxis:!0,keyboardNavigation:!0,closeOnOutsideClick:!0,plugins:!1,plyr:{css:\"https://cdn.plyr.io/3.6.12/plyr.css\",js:\"https://cdn.plyr.io/3.6.12/plyr.js\",config:{ratio:\"16:9\",fullscreen:{enabled:!0,iosNative:!0},youtube:{noCookie:!0,rel:0,showinfo:0,iv_load_policy:3},vimeo:{byline:!1,portrait:!1,title:!1,transparent:!1}}},openEffect:\"zoom\",closeEffect:\"zoom\",slideEffect:\"slide\",moreText:\"See more\",moreLength:60,cssEfects:{fade:{in:\"fadeIn\",out:\"fadeOut\"},zoom:{in:\"zoomIn\",out:\"zoomOut\"},slide:{in:\"slideInRight\",out:\"slideOutLeft\"},slideBack:{in:\"slideInLeft\",out:\"slideOutRight\"},none:{in:\"none\",out:\"none\"}},svg:{close:'<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" xml:space=\"preserve\"><g><g><path d=\"M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z\"/></g></g><g><g><path d=\"M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z\"/></g></g></svg>',next:'<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 477.175 477.175\" xml:space=\"preserve\"> <g><path d=\"M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z\"/></g></svg>',prev:'<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 477.175 477.175\" xml:space=\"preserve\"><g><path d=\"M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z\"/></g></svg>'},slideHTML:'<div class=\"gslide\">\\n    <div class=\"gslide-inner-content\">\\n        <div class=\"ginner-container\">\\n            <div class=\"gslide-media\">\\n            </div>\\n            <div class=\"gslide-description\">\\n                <div class=\"gdesc-inner\">\\n                    <h4 class=\"gslide-title\"></h4>\\n                    <div class=\"gslide-desc\"></div>\\n                </div>\\n            </div>\\n        </div>\\n    </div>\\n</div>',lightboxHTML:'<div id=\"glightbox-body\" class=\"glightbox-container\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"false\">\\n    <div class=\"gloader visible\"></div>\\n    <div class=\"goverlay\"></div>\\n    <div class=\"gcontainer\">\\n    <div id=\"glightbox-slider\" class=\"gslider\"></div>\\n    <button class=\"gclose gbtn\" aria-label=\"Close\" data-taborder=\"3\">{closeSVG}</button>\\n    <button class=\"gprev gbtn\" aria-label=\"Previous\" data-taborder=\"2\">{prevSVG}</button>\\n    <button class=\"gnext gbtn\" aria-label=\"Next\" data-taborder=\"1\">{nextSVG}</button>\\n</div>\\n</div>'},te=function(){function e(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t(this,e),this.customOptions=i,this.settings=l(ee,i),this.effectsClasses=this.getAnimationClasses(),this.videoPlayers={},this.apiEvents=[],this.fullElementsList=!1}return n(e,[{key:\"init\",value:function(){var e=this,t=this.getSelector();t&&(this.baseEvents=a(\"click\",{onElement:t,withCallback:function(t,i){t.preventDefault(),e.open(i)}})),this.elements=this.getElements()}},{key:\"open\",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(0===this.elements.length)return!1;this.activeSlide=null,this.prevActiveSlideIndex=null,this.prevActiveSlide=null;var i=M(t)?t:this.settings.startAt;if(k(e)){var n=e.getAttribute(\"data-gallery\");n&&(this.fullElementsList=this.elements,this.elements=this.getGalleryElements(this.elements,n)),I(i)&&(i=this.getElementIndex(e))<0&&(i=0)}M(i)||(i=0),this.build(),g(this.overlay,\"none\"===this.settings.openEffect?\"none\":this.settings.cssEfects.fade.in);var s=document.body,l=window.innerWidth-document.documentElement.clientWidth;if(l>0){var o=document.createElement(\"style\");o.type=\"text/css\",o.className=\"gcss-styles\",o.innerText=\".gscrollbar-fixer {margin-right: \".concat(l,\"px}\"),document.head.appendChild(o),h(s,\"gscrollbar-fixer\")}h(s,\"glightbox-open\"),h(Q,\"glightbox-open\"),J&&(h(document.body,\"glightbox-mobile\"),this.settings.slideEffect=\"slide\"),this.showSlide(i,!0),1===this.elements.length?(h(this.prevButton,\"glightbox-button-hidden\"),h(this.nextButton,\"glightbox-button-hidden\")):(d(this.prevButton,\"glightbox-button-hidden\"),d(this.nextButton,\"glightbox-button-hidden\")),this.lightboxOpen=!0,this.trigger(\"open\"),T(this.settings.onOpen)&&this.settings.onOpen(),K&&this.settings.touchNavigation&&B(this),this.settings.keyboardNavigation&&X(this)}},{key:\"openAt\",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.open(null,e)}},{key:\"showSlide\",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];f(this.loader),this.index=parseInt(t);var n=this.slidesContainer.querySelector(\".current\");n&&d(n,\"current\"),this.slideAnimateOut();var s=this.slidesContainer.querySelectorAll(\".gslide\")[t];if(c(s,\"loaded\"))this.slideAnimateIn(s,i),p(this.loader);else{f(this.loader);var l=this.elements[t],o={index:this.index,slide:s,slideNode:s,slideConfig:l.slideConfig,slideIndex:this.index,trigger:l.node,player:null};this.trigger(\"slide_before_load\",o),l.instance.setContent(s,(function(){p(e.loader),e.resize(),e.slideAnimateIn(s,i),e.trigger(\"slide_after_load\",o)}))}this.slideDescription=s.querySelector(\".gslide-description\"),this.slideDescriptionContained=this.slideDescription&&c(this.slideDescription.parentNode,\"gslide-media\"),this.settings.preload&&(this.preloadSlide(t+1),this.preloadSlide(t-1)),this.updateNavigationClasses(),this.activeSlide=s}},{key:\"preloadSlide\",value:function(e){var t=this;if(e<0||e>this.elements.length-1)return!1;if(I(this.elements[e]))return!1;var i=this.slidesContainer.querySelectorAll(\".gslide\")[e];if(c(i,\"loaded\"))return!1;var n=this.elements[e],s=n.type,l={index:e,slide:i,slideNode:i,slideConfig:n.slideConfig,slideIndex:e,trigger:n.node,player:null};this.trigger(\"slide_before_load\",l),\"video\"===s||\"external\"===s?setTimeout((function(){n.instance.setContent(i,(function(){t.trigger(\"slide_after_load\",l)}))}),200):n.instance.setContent(i,(function(){t.trigger(\"slide_after_load\",l)}))}},{key:\"prevSlide\",value:function(){this.goToSlide(this.index-1)}},{key:\"nextSlide\",value:function(){this.goToSlide(this.index+1)}},{key:\"goToSlide\",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(this.prevActiveSlide=this.activeSlide,this.prevActiveSlideIndex=this.index,!this.loop()&&(e<0||e>this.elements.length-1))return!1;e<0?e=this.elements.length-1:e>=this.elements.length&&(e=0),this.showSlide(e)}},{key:\"insertSlide\",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1;t<0&&(t=this.elements.length);var i=new $(e,this,t),n=i.getConfig(),s=l({},n),o=i.create(),r=this.elements.length-1;s.index=t,s.node=!1,s.instance=i,s.slideConfig=n,this.elements.splice(t,0,s);var a=null,h=null;if(this.slidesContainer){if(t>r)this.slidesContainer.appendChild(o);else{var d=this.slidesContainer.querySelectorAll(\".gslide\")[t];this.slidesContainer.insertBefore(o,d)}(this.settings.preload&&0==this.index&&0==t||this.index-1==t||this.index+1==t)&&this.preloadSlide(t),0===this.index&&0===t&&(this.index=1),this.updateNavigationClasses(),a=this.slidesContainer.querySelectorAll(\".gslide\")[t],h=this.getSlidePlayerInstance(t),s.slideNode=a}this.trigger(\"slide_inserted\",{index:t,slide:a,slideNode:a,slideConfig:n,slideIndex:t,trigger:null,player:h}),T(this.settings.slideInserted)&&this.settings.slideInserted({index:t,slide:a,player:h})}},{key:\"removeSlide\",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;if(e<0||e>this.elements.length-1)return!1;var t=this.slidesContainer&&this.slidesContainer.querySelectorAll(\".gslide\")[e];t&&(this.getActiveSlideIndex()==e&&(e==this.elements.length-1?this.prevSlide():this.nextSlide()),t.parentNode.removeChild(t)),this.elements.splice(e,1),this.trigger(\"slide_removed\",e),T(this.settings.slideRemoved)&&this.settings.slideRemoved(e)}},{key:\"slideAnimateIn\",value:function(e,t){var i=this,n=e.querySelector(\".gslide-media\"),s=e.querySelector(\".gslide-description\"),l={index:this.prevActiveSlideIndex,slide:this.prevActiveSlide,slideNode:this.prevActiveSlide,slideIndex:this.prevActiveSlide,slideConfig:I(this.prevActiveSlideIndex)?null:this.elements[this.prevActiveSlideIndex].slideConfig,trigger:I(this.prevActiveSlideIndex)?null:this.elements[this.prevActiveSlideIndex].node,player:this.getSlidePlayerInstance(this.prevActiveSlideIndex)},o={index:this.index,slide:this.activeSlide,slideNode:this.activeSlide,slideConfig:this.elements[this.index].slideConfig,slideIndex:this.index,trigger:this.elements[this.index].node,player:this.getSlidePlayerInstance(this.index)};if(n.offsetWidth>0&&s&&(p(s),s.style.display=\"\"),d(e,this.effectsClasses),t)g(e,this.settings.cssEfects[this.settings.openEffect].in,(function(){i.settings.autoplayVideos&&i.slidePlayerPlay(e),i.trigger(\"slide_changed\",{prev:l,current:o}),T(i.settings.afterSlideChange)&&i.settings.afterSlideChange.apply(i,[l,o])}));else{var r=this.settings.slideEffect,a=\"none\"!==r?this.settings.cssEfects[r].in:r;this.prevActiveSlideIndex>this.index&&\"slide\"==this.settings.slideEffect&&(a=this.settings.cssEfects.slideBack.in),g(e,a,(function(){i.settings.autoplayVideos&&i.slidePlayerPlay(e),i.trigger(\"slide_changed\",{prev:l,current:o}),T(i.settings.afterSlideChange)&&i.settings.afterSlideChange.apply(i,[l,o])}))}setTimeout((function(){i.resize(e)}),100),h(e,\"current\")}},{key:\"slideAnimateOut\",value:function(){if(!this.prevActiveSlide)return!1;var e=this.prevActiveSlide;d(e,this.effectsClasses),h(e,\"prev\");var t=this.settings.slideEffect,i=\"none\"!==t?this.settings.cssEfects[t].out:t;this.slidePlayerPause(e),this.trigger(\"slide_before_change\",{prev:{index:this.prevActiveSlideIndex,slide:this.prevActiveSlide,slideNode:this.prevActiveSlide,slideIndex:this.prevActiveSlideIndex,slideConfig:I(this.prevActiveSlideIndex)?null:this.elements[this.prevActiveSlideIndex].slideConfig,trigger:I(this.prevActiveSlideIndex)?null:this.elements[this.prevActiveSlideIndex].node,player:this.getSlidePlayerInstance(this.prevActiveSlideIndex)},current:{index:this.index,slide:this.activeSlide,slideNode:this.activeSlide,slideIndex:this.index,slideConfig:this.elements[this.index].slideConfig,trigger:this.elements[this.index].node,player:this.getSlidePlayerInstance(this.index)}}),T(this.settings.beforeSlideChange)&&this.settings.beforeSlideChange.apply(this,[{index:this.prevActiveSlideIndex,slide:this.prevActiveSlide,player:this.getSlidePlayerInstance(this.prevActiveSlideIndex)},{index:this.index,slide:this.activeSlide,player:this.getSlidePlayerInstance(this.index)}]),this.prevActiveSlideIndex>this.index&&\"slide\"==this.settings.slideEffect&&(i=this.settings.cssEfects.slideBack.out),g(e,i,(function(){var t=e.querySelector(\".ginner-container\"),i=e.querySelector(\".gslide-media\"),n=e.querySelector(\".gslide-description\");t.style.transform=\"\",i.style.transform=\"\",d(i,\"greset\"),i.style.opacity=\"\",n&&(n.style.opacity=\"\"),d(e,\"prev\")}))}},{key:\"getAllPlayers\",value:function(){return this.videoPlayers}},{key:\"getSlidePlayerInstance\",value:function(e){var t=\"gvideo\"+e,i=this.getAllPlayers();return!(!O(i,t)||!i[t])&&i[t]}},{key:\"stopSlideVideo\",value:function(e){if(k(e)){var t=e.querySelector(\".gvideo-wrapper\");t&&(e=t.getAttribute(\"data-index\"))}console.log(\"stopSlideVideo is deprecated, use slidePlayerPause\");var i=this.getSlidePlayerInstance(e);i&&i.playing&&i.pause()}},{key:\"slidePlayerPause\",value:function(e){if(k(e)){var t=e.querySelector(\".gvideo-wrapper\");t&&(e=t.getAttribute(\"data-index\"))}var i=this.getSlidePlayerInstance(e);i&&i.playing&&i.pause()}},{key:\"playSlideVideo\",value:function(e){if(k(e)){var t=e.querySelector(\".gvideo-wrapper\");t&&(e=t.getAttribute(\"data-index\"))}console.log(\"playSlideVideo is deprecated, use slidePlayerPlay\");var i=this.getSlidePlayerInstance(e);i&&!i.playing&&i.play()}},{key:\"slidePlayerPlay\",value:function(e){var t;if(!J||null!==(t=this.settings.plyr.config)&&void 0!==t&&t.muted){if(k(e)){var i=e.querySelector(\".gvideo-wrapper\");i&&(e=i.getAttribute(\"data-index\"))}var n=this.getSlidePlayerInstance(e);n&&!n.playing&&(n.play(),this.settings.autofocusVideos&&n.elements.container.focus())}}},{key:\"setElements\",value:function(e){var t=this;this.settings.elements=!1;var i=[];e&&e.length&&o(e,(function(e,n){var s=new $(e,t,n),o=s.getConfig(),r=l({},o);r.slideConfig=o,r.instance=s,r.index=n,i.push(r)})),this.elements=i,this.lightboxOpen&&(this.slidesContainer.innerHTML=\"\",this.elements.length&&(o(this.elements,(function(){var e=m(t.settings.slideHTML);t.slidesContainer.appendChild(e)})),this.showSlide(0,!0)))}},{key:\"getElementIndex\",value:function(e){var t=!1;return o(this.elements,(function(i,n){if(O(i,\"node\")&&i.node==e)return t=n,!0})),t}},{key:\"getElements\",value:function(){var e=this,t=[];this.elements=this.elements?this.elements:[],!I(this.settings.elements)&&E(this.settings.elements)&&this.settings.elements.length&&o(this.settings.elements,(function(i,n){var s=new $(i,e,n),o=s.getConfig(),r=l({},o);r.node=!1,r.index=n,r.instance=s,r.slideConfig=o,t.push(r)}));var i=!1;return this.getSelector()&&(i=document.querySelectorAll(this.getSelector())),i?(o(i,(function(i,n){var s=new $(i,e,n),o=s.getConfig(),r=l({},o);r.node=i,r.index=n,r.instance=s,r.slideConfig=o,r.gallery=i.getAttribute(\"data-gallery\"),t.push(r)})),t):t}},{key:\"getGalleryElements\",value:function(e,t){return e.filter((function(e){return e.gallery==t}))}},{key:\"getSelector\",value:function(){return!this.settings.elements&&(this.settings.selector&&\"data-\"==this.settings.selector.substring(0,5)?\"*[\".concat(this.settings.selector,\"]\"):this.settings.selector)}},{key:\"getActiveSlide\",value:function(){return this.slidesContainer.querySelectorAll(\".gslide\")[this.index]}},{key:\"getActiveSlideIndex\",value:function(){return this.index}},{key:\"getAnimationClasses\",value:function(){var e=[];for(var t in this.settings.cssEfects)if(this.settings.cssEfects.hasOwnProperty(t)){var i=this.settings.cssEfects[t];e.push(\"g\".concat(i.in)),e.push(\"g\".concat(i.out))}return e.join(\" \")}},{key:\"build\",value:function(){var e=this;if(this.built)return!1;var t=document.body.childNodes,i=[];o(t,(function(e){e.parentNode==document.body&&\"#\"!==e.nodeName.charAt(0)&&e.hasAttribute&&!e.hasAttribute(\"aria-hidden\")&&(i.push(e),e.setAttribute(\"aria-hidden\",\"true\"))}));var n=O(this.settings.svg,\"next\")?this.settings.svg.next:\"\",s=O(this.settings.svg,\"prev\")?this.settings.svg.prev:\"\",l=O(this.settings.svg,\"close\")?this.settings.svg.close:\"\",r=this.settings.lightboxHTML;r=m(r=(r=(r=r.replace(/{nextSVG}/g,n)).replace(/{prevSVG}/g,s)).replace(/{closeSVG}/g,l)),document.body.appendChild(r);var d=document.getElementById(\"glightbox-body\");this.modal=d;var g=d.querySelector(\".gclose\");this.prevButton=d.querySelector(\".gprev\"),this.nextButton=d.querySelector(\".gnext\"),this.overlay=d.querySelector(\".goverlay\"),this.loader=d.querySelector(\".gloader\"),this.slidesContainer=document.getElementById(\"glightbox-slider\"),this.bodyHiddenChildElms=i,this.events={},h(this.modal,\"glightbox-\"+this.settings.skin),this.settings.closeButton&&g&&(this.events.close=a(\"click\",{onElement:g,withCallback:function(t,i){t.preventDefault(),e.close()}})),g&&!this.settings.closeButton&&g.parentNode.removeChild(g),this.nextButton&&(this.events.next=a(\"click\",{onElement:this.nextButton,withCallback:function(t,i){t.preventDefault(),e.nextSlide()}})),this.prevButton&&(this.events.prev=a(\"click\",{onElement:this.prevButton,withCallback:function(t,i){t.preventDefault(),e.prevSlide()}})),this.settings.closeOnOutsideClick&&(this.events.outClose=a(\"click\",{onElement:d,withCallback:function(t,i){e.preventOutsideClick||c(document.body,\"glightbox-mobile\")||u(t.target,\".ginner-container\")||u(t.target,\".gbtn\")||c(t.target,\"gnext\")||c(t.target,\"gprev\")||e.close()}})),o(this.elements,(function(t,i){e.slidesContainer.appendChild(t.instance.create()),t.slideNode=e.slidesContainer.querySelectorAll(\".gslide\")[i]})),K&&h(document.body,\"glightbox-touch\"),this.events.resize=a(\"resize\",{onElement:window,withCallback:function(){e.resize()}}),this.built=!0}},{key:\"resize\",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if((e=e||this.activeSlide)&&!c(e,\"zoomed\")){var t=y(),i=e.querySelector(\".gvideo-wrapper\"),n=e.querySelector(\".gslide-image\"),s=this.slideDescription,l=t.width,o=t.height;if(l<=768?h(document.body,\"glightbox-mobile\"):d(document.body,\"glightbox-mobile\"),i||n){var r=!1;if(s&&(c(s,\"description-bottom\")||c(s,\"description-top\"))&&!c(s,\"gabsolute\")&&(r=!0),n)if(l<=768)n.querySelector(\"img\");else if(r){var a=s.offsetHeight,u=n.querySelector(\"img\");u.setAttribute(\"style\",\"max-height: calc(100vh - \".concat(a,\"px)\")),s.setAttribute(\"style\",\"max-width: \".concat(u.offsetWidth,\"px;\"))}if(i){var g=O(this.settings.plyr.config,\"ratio\")?this.settings.plyr.config.ratio:\"\";if(!g){var v=i.clientWidth,f=i.clientHeight,p=v/f;g=\"\".concat(v/p,\":\").concat(f/p)}var m=g.split(\":\"),x=this.settings.videosWidth,b=this.settings.videosWidth,S=(b=M(x)||-1!==x.indexOf(\"px\")?parseInt(x):-1!==x.indexOf(\"vw\")?l*parseInt(x)/100:-1!==x.indexOf(\"vh\")?o*parseInt(x)/100:-1!==x.indexOf(\"%\")?l*parseInt(x)/100:parseInt(i.clientWidth))/(parseInt(m[0])/parseInt(m[1]));if(S=Math.floor(S),r&&(o-=s.offsetHeight),b>l||S>o||o<S&&l>b){var w=i.offsetWidth,T=i.offsetHeight,C=o/T,k={width:w*C,height:T*C};i.parentNode.setAttribute(\"style\",\"max-width: \".concat(k.width,\"px\")),r&&s.setAttribute(\"style\",\"max-width: \".concat(k.width,\"px;\"))}else i.parentNode.style.maxWidth=\"\".concat(x),r&&s.setAttribute(\"style\",\"max-width: \".concat(x,\";\"))}}}}},{key:\"reload\",value:function(){this.init()}},{key:\"updateNavigationClasses\",value:function(){var e=this.loop();d(this.nextButton,\"disabled\"),d(this.prevButton,\"disabled\"),0==this.index&&this.elements.length-1==0?(h(this.prevButton,\"disabled\"),h(this.nextButton,\"disabled\")):0!==this.index||e?this.index!==this.elements.length-1||e||h(this.nextButton,\"disabled\"):h(this.prevButton,\"disabled\")}},{key:\"loop\",value:function(){var e=O(this.settings,\"loopAtEnd\")?this.settings.loopAtEnd:null;return e=O(this.settings,\"loop\")?this.settings.loop:e,e}},{key:\"close\",value:function(){var e=this;if(!this.lightboxOpen){if(this.events){for(var t in this.events)this.events.hasOwnProperty(t)&&this.events[t].destroy();this.events=null}return!1}if(this.closing)return!1;this.closing=!0,this.slidePlayerPause(this.activeSlide),this.fullElementsList&&(this.elements=this.fullElementsList),this.bodyHiddenChildElms.length&&o(this.bodyHiddenChildElms,(function(e){e.removeAttribute(\"aria-hidden\")})),h(this.modal,\"glightbox-closing\"),g(this.overlay,\"none\"==this.settings.openEffect?\"none\":this.settings.cssEfects.fade.out),g(this.activeSlide,this.settings.cssEfects[this.settings.closeEffect].out,(function(){if(e.activeSlide=null,e.prevActiveSlideIndex=null,e.prevActiveSlide=null,e.built=!1,e.events){for(var t in e.events)e.events.hasOwnProperty(t)&&e.events[t].destroy();e.events=null}var i=document.body;d(Q,\"glightbox-open\"),d(i,\"glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer\"),e.modal.parentNode.removeChild(e.modal),e.trigger(\"close\"),T(e.settings.onClose)&&e.settings.onClose();var n=document.querySelector(\".gcss-styles\");n&&n.parentNode.removeChild(n),e.lightboxOpen=!1,e.closing=null}))}},{key:\"destroy\",value:function(){this.close(),this.clearAllEvents(),this.baseEvents&&this.baseEvents.destroy()}},{key:\"on\",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!e||!T(t))throw new TypeError(\"Event name and callback must be defined\");this.apiEvents.push({evt:e,once:i,callback:t})}},{key:\"once\",value:function(e,t){this.on(e,t,!0)}},{key:\"trigger\",value:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=[];o(this.apiEvents,(function(t,s){var l=t.evt,o=t.once,r=t.callback;l==e&&(r(i),o&&n.push(s))})),n.length&&o(n,(function(e){return t.apiEvents.splice(e,1)}))}},{key:\"clearAllEvents\",value:function(){this.apiEvents.splice(0,this.apiEvents.length)}},{key:\"version\",value:function(){return\"3.1.0\"}}]),e}();return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=new te(e);return t.init(),t}}));\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/glightbox/dist/js/glightbox.min.js?");

/***/ }),

/***/ "./node_modules/glightbox/dist/css/glightbox.min.css":
/*!***********************************************************!*\
  !*** ./node_modules/glightbox/dist/css/glightbox.min.css ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/glightbox/dist/css/glightbox.min.css?");

/***/ }),

/***/ "./node_modules/swiper/modules/pagination/pagination.min.css":
/*!*******************************************************************!*\
  !*** ./node_modules/swiper/modules/pagination/pagination.min.css ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/pagination/pagination.min.css?");

/***/ }),

/***/ "./node_modules/swiper/swiper.min.css":
/*!********************************************!*\
  !*** ./node_modules/swiper/swiper.min.css ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/swiper.min.css?");

/***/ }),

/***/ "./src/css/animate.css":
/*!*****************************!*\
  !*** ./src/css/animate.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://appline-tailwind/./src/css/animate.css?");

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://appline-tailwind/./src/css/style.css?");

/***/ }),

/***/ "./node_modules/wowjs/dist/wow.js":
/*!****************************************!*\
  !*** ./node_modules/wowjs/dist/wow.js ***!
  \****************************************/
/***/ (function() {

eval("(function() {\n  var MutationObserver, Util, WeakMap, getComputedStyle, getComputedStyleRX,\n    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },\n    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };\n\n  Util = (function() {\n    function Util() {}\n\n    Util.prototype.extend = function(custom, defaults) {\n      var key, value;\n      for (key in defaults) {\n        value = defaults[key];\n        if (custom[key] == null) {\n          custom[key] = value;\n        }\n      }\n      return custom;\n    };\n\n    Util.prototype.isMobile = function(agent) {\n      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);\n    };\n\n    Util.prototype.createEvent = function(event, bubble, cancel, detail) {\n      var customEvent;\n      if (bubble == null) {\n        bubble = false;\n      }\n      if (cancel == null) {\n        cancel = false;\n      }\n      if (detail == null) {\n        detail = null;\n      }\n      if (document.createEvent != null) {\n        customEvent = document.createEvent('CustomEvent');\n        customEvent.initCustomEvent(event, bubble, cancel, detail);\n      } else if (document.createEventObject != null) {\n        customEvent = document.createEventObject();\n        customEvent.eventType = event;\n      } else {\n        customEvent.eventName = event;\n      }\n      return customEvent;\n    };\n\n    Util.prototype.emitEvent = function(elem, event) {\n      if (elem.dispatchEvent != null) {\n        return elem.dispatchEvent(event);\n      } else if (event in (elem != null)) {\n        return elem[event]();\n      } else if ((\"on\" + event) in (elem != null)) {\n        return elem[\"on\" + event]();\n      }\n    };\n\n    Util.prototype.addEvent = function(elem, event, fn) {\n      if (elem.addEventListener != null) {\n        return elem.addEventListener(event, fn, false);\n      } else if (elem.attachEvent != null) {\n        return elem.attachEvent(\"on\" + event, fn);\n      } else {\n        return elem[event] = fn;\n      }\n    };\n\n    Util.prototype.removeEvent = function(elem, event, fn) {\n      if (elem.removeEventListener != null) {\n        return elem.removeEventListener(event, fn, false);\n      } else if (elem.detachEvent != null) {\n        return elem.detachEvent(\"on\" + event, fn);\n      } else {\n        return delete elem[event];\n      }\n    };\n\n    Util.prototype.innerHeight = function() {\n      if ('innerHeight' in window) {\n        return window.innerHeight;\n      } else {\n        return document.documentElement.clientHeight;\n      }\n    };\n\n    return Util;\n\n  })();\n\n  WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = (function() {\n    function WeakMap() {\n      this.keys = [];\n      this.values = [];\n    }\n\n    WeakMap.prototype.get = function(key) {\n      var i, item, j, len, ref;\n      ref = this.keys;\n      for (i = j = 0, len = ref.length; j < len; i = ++j) {\n        item = ref[i];\n        if (item === key) {\n          return this.values[i];\n        }\n      }\n    };\n\n    WeakMap.prototype.set = function(key, value) {\n      var i, item, j, len, ref;\n      ref = this.keys;\n      for (i = j = 0, len = ref.length; j < len; i = ++j) {\n        item = ref[i];\n        if (item === key) {\n          this.values[i] = value;\n          return;\n        }\n      }\n      this.keys.push(key);\n      return this.values.push(value);\n    };\n\n    return WeakMap;\n\n  })());\n\n  MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = (function() {\n    function MutationObserver() {\n      if (typeof console !== \"undefined\" && console !== null) {\n        console.warn('MutationObserver is not supported by your browser.');\n      }\n      if (typeof console !== \"undefined\" && console !== null) {\n        console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');\n      }\n    }\n\n    MutationObserver.notSupported = true;\n\n    MutationObserver.prototype.observe = function() {};\n\n    return MutationObserver;\n\n  })());\n\n  getComputedStyle = this.getComputedStyle || function(el, pseudo) {\n    this.getPropertyValue = function(prop) {\n      var ref;\n      if (prop === 'float') {\n        prop = 'styleFloat';\n      }\n      if (getComputedStyleRX.test(prop)) {\n        prop.replace(getComputedStyleRX, function(_, _char) {\n          return _char.toUpperCase();\n        });\n      }\n      return ((ref = el.currentStyle) != null ? ref[prop] : void 0) || null;\n    };\n    return this;\n  };\n\n  getComputedStyleRX = /(\\-([a-z]){1})/g;\n\n  this.WOW = (function() {\n    WOW.prototype.defaults = {\n      boxClass: 'wow',\n      animateClass: 'animated',\n      offset: 0,\n      mobile: true,\n      live: true,\n      callback: null,\n      scrollContainer: null\n    };\n\n    function WOW(options) {\n      if (options == null) {\n        options = {};\n      }\n      this.scrollCallback = bind(this.scrollCallback, this);\n      this.scrollHandler = bind(this.scrollHandler, this);\n      this.resetAnimation = bind(this.resetAnimation, this);\n      this.start = bind(this.start, this);\n      this.scrolled = true;\n      this.config = this.util().extend(options, this.defaults);\n      if (options.scrollContainer != null) {\n        this.config.scrollContainer = document.querySelector(options.scrollContainer);\n      }\n      this.animationNameCache = new WeakMap();\n      this.wowEvent = this.util().createEvent(this.config.boxClass);\n    }\n\n    WOW.prototype.init = function() {\n      var ref;\n      this.element = window.document.documentElement;\n      if ((ref = document.readyState) === \"interactive\" || ref === \"complete\") {\n        this.start();\n      } else {\n        this.util().addEvent(document, 'DOMContentLoaded', this.start);\n      }\n      return this.finished = [];\n    };\n\n    WOW.prototype.start = function() {\n      var box, j, len, ref;\n      this.stopped = false;\n      this.boxes = (function() {\n        var j, len, ref, results;\n        ref = this.element.querySelectorAll(\".\" + this.config.boxClass);\n        results = [];\n        for (j = 0, len = ref.length; j < len; j++) {\n          box = ref[j];\n          results.push(box);\n        }\n        return results;\n      }).call(this);\n      this.all = (function() {\n        var j, len, ref, results;\n        ref = this.boxes;\n        results = [];\n        for (j = 0, len = ref.length; j < len; j++) {\n          box = ref[j];\n          results.push(box);\n        }\n        return results;\n      }).call(this);\n      if (this.boxes.length) {\n        if (this.disabled()) {\n          this.resetStyle();\n        } else {\n          ref = this.boxes;\n          for (j = 0, len = ref.length; j < len; j++) {\n            box = ref[j];\n            this.applyStyle(box, true);\n          }\n        }\n      }\n      if (!this.disabled()) {\n        this.util().addEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);\n        this.util().addEvent(window, 'resize', this.scrollHandler);\n        this.interval = setInterval(this.scrollCallback, 50);\n      }\n      if (this.config.live) {\n        return new MutationObserver((function(_this) {\n          return function(records) {\n            var k, len1, node, record, results;\n            results = [];\n            for (k = 0, len1 = records.length; k < len1; k++) {\n              record = records[k];\n              results.push((function() {\n                var l, len2, ref1, results1;\n                ref1 = record.addedNodes || [];\n                results1 = [];\n                for (l = 0, len2 = ref1.length; l < len2; l++) {\n                  node = ref1[l];\n                  results1.push(this.doSync(node));\n                }\n                return results1;\n              }).call(_this));\n            }\n            return results;\n          };\n        })(this)).observe(document.body, {\n          childList: true,\n          subtree: true\n        });\n      }\n    };\n\n    WOW.prototype.stop = function() {\n      this.stopped = true;\n      this.util().removeEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);\n      this.util().removeEvent(window, 'resize', this.scrollHandler);\n      if (this.interval != null) {\n        return clearInterval(this.interval);\n      }\n    };\n\n    WOW.prototype.sync = function(element) {\n      if (MutationObserver.notSupported) {\n        return this.doSync(this.element);\n      }\n    };\n\n    WOW.prototype.doSync = function(element) {\n      var box, j, len, ref, results;\n      if (element == null) {\n        element = this.element;\n      }\n      if (element.nodeType !== 1) {\n        return;\n      }\n      element = element.parentNode || element;\n      ref = element.querySelectorAll(\".\" + this.config.boxClass);\n      results = [];\n      for (j = 0, len = ref.length; j < len; j++) {\n        box = ref[j];\n        if (indexOf.call(this.all, box) < 0) {\n          this.boxes.push(box);\n          this.all.push(box);\n          if (this.stopped || this.disabled()) {\n            this.resetStyle();\n          } else {\n            this.applyStyle(box, true);\n          }\n          results.push(this.scrolled = true);\n        } else {\n          results.push(void 0);\n        }\n      }\n      return results;\n    };\n\n    WOW.prototype.show = function(box) {\n      this.applyStyle(box);\n      box.className = box.className + \" \" + this.config.animateClass;\n      if (this.config.callback != null) {\n        this.config.callback(box);\n      }\n      this.util().emitEvent(box, this.wowEvent);\n      this.util().addEvent(box, 'animationend', this.resetAnimation);\n      this.util().addEvent(box, 'oanimationend', this.resetAnimation);\n      this.util().addEvent(box, 'webkitAnimationEnd', this.resetAnimation);\n      this.util().addEvent(box, 'MSAnimationEnd', this.resetAnimation);\n      return box;\n    };\n\n    WOW.prototype.applyStyle = function(box, hidden) {\n      var delay, duration, iteration;\n      duration = box.getAttribute('data-wow-duration');\n      delay = box.getAttribute('data-wow-delay');\n      iteration = box.getAttribute('data-wow-iteration');\n      return this.animate((function(_this) {\n        return function() {\n          return _this.customStyle(box, hidden, duration, delay, iteration);\n        };\n      })(this));\n    };\n\n    WOW.prototype.animate = (function() {\n      if ('requestAnimationFrame' in window) {\n        return function(callback) {\n          return window.requestAnimationFrame(callback);\n        };\n      } else {\n        return function(callback) {\n          return callback();\n        };\n      }\n    })();\n\n    WOW.prototype.resetStyle = function() {\n      var box, j, len, ref, results;\n      ref = this.boxes;\n      results = [];\n      for (j = 0, len = ref.length; j < len; j++) {\n        box = ref[j];\n        results.push(box.style.visibility = 'visible');\n      }\n      return results;\n    };\n\n    WOW.prototype.resetAnimation = function(event) {\n      var target;\n      if (event.type.toLowerCase().indexOf('animationend') >= 0) {\n        target = event.target || event.srcElement;\n        return target.className = target.className.replace(this.config.animateClass, '').trim();\n      }\n    };\n\n    WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {\n      if (hidden) {\n        this.cacheAnimationName(box);\n      }\n      box.style.visibility = hidden ? 'hidden' : 'visible';\n      if (duration) {\n        this.vendorSet(box.style, {\n          animationDuration: duration\n        });\n      }\n      if (delay) {\n        this.vendorSet(box.style, {\n          animationDelay: delay\n        });\n      }\n      if (iteration) {\n        this.vendorSet(box.style, {\n          animationIterationCount: iteration\n        });\n      }\n      this.vendorSet(box.style, {\n        animationName: hidden ? 'none' : this.cachedAnimationName(box)\n      });\n      return box;\n    };\n\n    WOW.prototype.vendors = [\"moz\", \"webkit\"];\n\n    WOW.prototype.vendorSet = function(elem, properties) {\n      var name, results, value, vendor;\n      results = [];\n      for (name in properties) {\n        value = properties[name];\n        elem[\"\" + name] = value;\n        results.push((function() {\n          var j, len, ref, results1;\n          ref = this.vendors;\n          results1 = [];\n          for (j = 0, len = ref.length; j < len; j++) {\n            vendor = ref[j];\n            results1.push(elem[\"\" + vendor + (name.charAt(0).toUpperCase()) + (name.substr(1))] = value);\n          }\n          return results1;\n        }).call(this));\n      }\n      return results;\n    };\n\n    WOW.prototype.vendorCSS = function(elem, property) {\n      var j, len, ref, result, style, vendor;\n      style = getComputedStyle(elem);\n      result = style.getPropertyCSSValue(property);\n      ref = this.vendors;\n      for (j = 0, len = ref.length; j < len; j++) {\n        vendor = ref[j];\n        result = result || style.getPropertyCSSValue(\"-\" + vendor + \"-\" + property);\n      }\n      return result;\n    };\n\n    WOW.prototype.animationName = function(box) {\n      var animationName, error;\n      try {\n        animationName = this.vendorCSS(box, 'animation-name').cssText;\n      } catch (error) {\n        animationName = getComputedStyle(box).getPropertyValue('animation-name');\n      }\n      if (animationName === 'none') {\n        return '';\n      } else {\n        return animationName;\n      }\n    };\n\n    WOW.prototype.cacheAnimationName = function(box) {\n      return this.animationNameCache.set(box, this.animationName(box));\n    };\n\n    WOW.prototype.cachedAnimationName = function(box) {\n      return this.animationNameCache.get(box);\n    };\n\n    WOW.prototype.scrollHandler = function() {\n      return this.scrolled = true;\n    };\n\n    WOW.prototype.scrollCallback = function() {\n      var box;\n      if (this.scrolled) {\n        this.scrolled = false;\n        this.boxes = (function() {\n          var j, len, ref, results;\n          ref = this.boxes;\n          results = [];\n          for (j = 0, len = ref.length; j < len; j++) {\n            box = ref[j];\n            if (!(box)) {\n              continue;\n            }\n            if (this.isVisible(box)) {\n              this.show(box);\n              continue;\n            }\n            results.push(box);\n          }\n          return results;\n        }).call(this);\n        if (!(this.boxes.length || this.config.live)) {\n          return this.stop();\n        }\n      }\n    };\n\n    WOW.prototype.offsetTop = function(element) {\n      var top;\n      while (element.offsetTop === void 0) {\n        element = element.parentNode;\n      }\n      top = element.offsetTop;\n      while (element = element.offsetParent) {\n        top += element.offsetTop;\n      }\n      return top;\n    };\n\n    WOW.prototype.isVisible = function(box) {\n      var bottom, offset, top, viewBottom, viewTop;\n      offset = box.getAttribute('data-wow-offset') || this.config.offset;\n      viewTop = (this.config.scrollContainer && this.config.scrollContainer.scrollTop) || window.pageYOffset;\n      viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;\n      top = this.offsetTop(box);\n      bottom = top + box.clientHeight;\n      return top <= viewBottom && bottom >= viewTop;\n    };\n\n    WOW.prototype.util = function() {\n      return this._util != null ? this._util : this._util = new Util();\n    };\n\n    WOW.prototype.disabled = function() {\n      return !this.config.mobile && this.util().isMobile(navigator.userAgent);\n    };\n\n    return WOW;\n\n  })();\n\n}).call(this);\n\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/wowjs/dist/wow.js?");

/***/ }),

/***/ "./node_modules/dom7/dom7.esm.js":
/*!***************************************!*\
  !*** ./node_modules/dom7/dom7.esm.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"$\": () => (/* binding */ $),\n/* harmony export */   \"add\": () => (/* binding */ add),\n/* harmony export */   \"addClass\": () => (/* binding */ addClass),\n/* harmony export */   \"animate\": () => (/* binding */ animate),\n/* harmony export */   \"animationEnd\": () => (/* binding */ animationEnd),\n/* harmony export */   \"append\": () => (/* binding */ append),\n/* harmony export */   \"appendTo\": () => (/* binding */ appendTo),\n/* harmony export */   \"attr\": () => (/* binding */ attr),\n/* harmony export */   \"blur\": () => (/* binding */ blur),\n/* harmony export */   \"change\": () => (/* binding */ change),\n/* harmony export */   \"children\": () => (/* binding */ children),\n/* harmony export */   \"click\": () => (/* binding */ click),\n/* harmony export */   \"closest\": () => (/* binding */ closest),\n/* harmony export */   \"css\": () => (/* binding */ css),\n/* harmony export */   \"data\": () => (/* binding */ data),\n/* harmony export */   \"dataset\": () => (/* binding */ dataset),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"detach\": () => (/* binding */ detach),\n/* harmony export */   \"each\": () => (/* binding */ each),\n/* harmony export */   \"empty\": () => (/* binding */ empty),\n/* harmony export */   \"eq\": () => (/* binding */ eq),\n/* harmony export */   \"filter\": () => (/* binding */ filter),\n/* harmony export */   \"find\": () => (/* binding */ find),\n/* harmony export */   \"focus\": () => (/* binding */ focus),\n/* harmony export */   \"focusin\": () => (/* binding */ focusin),\n/* harmony export */   \"focusout\": () => (/* binding */ focusout),\n/* harmony export */   \"hasClass\": () => (/* binding */ hasClass),\n/* harmony export */   \"height\": () => (/* binding */ height),\n/* harmony export */   \"hide\": () => (/* binding */ hide),\n/* harmony export */   \"html\": () => (/* binding */ html),\n/* harmony export */   \"index\": () => (/* binding */ index),\n/* harmony export */   \"insertAfter\": () => (/* binding */ insertAfter),\n/* harmony export */   \"insertBefore\": () => (/* binding */ insertBefore),\n/* harmony export */   \"is\": () => (/* binding */ is),\n/* harmony export */   \"keydown\": () => (/* binding */ keydown),\n/* harmony export */   \"keypress\": () => (/* binding */ keypress),\n/* harmony export */   \"keyup\": () => (/* binding */ keyup),\n/* harmony export */   \"mousedown\": () => (/* binding */ mousedown),\n/* harmony export */   \"mouseenter\": () => (/* binding */ mouseenter),\n/* harmony export */   \"mouseleave\": () => (/* binding */ mouseleave),\n/* harmony export */   \"mousemove\": () => (/* binding */ mousemove),\n/* harmony export */   \"mouseout\": () => (/* binding */ mouseout),\n/* harmony export */   \"mouseover\": () => (/* binding */ mouseover),\n/* harmony export */   \"mouseup\": () => (/* binding */ mouseup),\n/* harmony export */   \"next\": () => (/* binding */ next),\n/* harmony export */   \"nextAll\": () => (/* binding */ nextAll),\n/* harmony export */   \"off\": () => (/* binding */ off),\n/* harmony export */   \"offset\": () => (/* binding */ offset),\n/* harmony export */   \"on\": () => (/* binding */ on),\n/* harmony export */   \"once\": () => (/* binding */ once),\n/* harmony export */   \"outerHeight\": () => (/* binding */ outerHeight),\n/* harmony export */   \"outerWidth\": () => (/* binding */ outerWidth),\n/* harmony export */   \"parent\": () => (/* binding */ parent),\n/* harmony export */   \"parents\": () => (/* binding */ parents),\n/* harmony export */   \"prepend\": () => (/* binding */ prepend),\n/* harmony export */   \"prependTo\": () => (/* binding */ prependTo),\n/* harmony export */   \"prev\": () => (/* binding */ prev),\n/* harmony export */   \"prevAll\": () => (/* binding */ prevAll),\n/* harmony export */   \"prop\": () => (/* binding */ prop),\n/* harmony export */   \"remove\": () => (/* binding */ remove),\n/* harmony export */   \"removeAttr\": () => (/* binding */ removeAttr),\n/* harmony export */   \"removeClass\": () => (/* binding */ removeClass),\n/* harmony export */   \"removeData\": () => (/* binding */ removeData),\n/* harmony export */   \"resize\": () => (/* binding */ resize),\n/* harmony export */   \"scroll\": () => (/* binding */ scroll),\n/* harmony export */   \"scrollLeft\": () => (/* binding */ scrollLeft),\n/* harmony export */   \"scrollTo\": () => (/* binding */ scrollTo),\n/* harmony export */   \"scrollTop\": () => (/* binding */ scrollTop),\n/* harmony export */   \"show\": () => (/* binding */ show),\n/* harmony export */   \"siblings\": () => (/* binding */ siblings),\n/* harmony export */   \"stop\": () => (/* binding */ stop),\n/* harmony export */   \"styles\": () => (/* binding */ styles),\n/* harmony export */   \"submit\": () => (/* binding */ submit),\n/* harmony export */   \"text\": () => (/* binding */ text),\n/* harmony export */   \"toggleClass\": () => (/* binding */ toggleClass),\n/* harmony export */   \"touchend\": () => (/* binding */ touchend),\n/* harmony export */   \"touchmove\": () => (/* binding */ touchmove),\n/* harmony export */   \"touchstart\": () => (/* binding */ touchstart),\n/* harmony export */   \"transform\": () => (/* binding */ transform),\n/* harmony export */   \"transition\": () => (/* binding */ transition),\n/* harmony export */   \"transitionEnd\": () => (/* binding */ transitionEnd),\n/* harmony export */   \"trigger\": () => (/* binding */ trigger),\n/* harmony export */   \"val\": () => (/* binding */ val),\n/* harmony export */   \"value\": () => (/* binding */ value),\n/* harmony export */   \"width\": () => (/* binding */ width)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n/**\n * Dom7 4.0.4\n * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API\n * https://framework7.io/docs/dom7.html\n *\n * Copyright 2022, Vladimir Kharlampidi\n *\n * Licensed under MIT\n *\n * Released on: January 11, 2022\n */\n\n\n/* eslint-disable no-proto */\nfunction makeReactive(obj) {\n  const proto = obj.__proto__;\n  Object.defineProperty(obj, '__proto__', {\n    get() {\n      return proto;\n    },\n\n    set(value) {\n      proto.__proto__ = value;\n    }\n\n  });\n}\n\nclass Dom7 extends Array {\n  constructor(items) {\n    if (typeof items === 'number') {\n      super(items);\n    } else {\n      super(...(items || []));\n      makeReactive(this);\n    }\n  }\n\n}\n\nfunction arrayFlat(arr = []) {\n  const res = [];\n  arr.forEach(el => {\n    if (Array.isArray(el)) {\n      res.push(...arrayFlat(el));\n    } else {\n      res.push(el);\n    }\n  });\n  return res;\n}\nfunction arrayFilter(arr, callback) {\n  return Array.prototype.filter.call(arr, callback);\n}\nfunction arrayUnique(arr) {\n  const uniqueArray = [];\n\n  for (let i = 0; i < arr.length; i += 1) {\n    if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);\n  }\n\n  return uniqueArray;\n}\nfunction toCamelCase(string) {\n  return string.toLowerCase().replace(/-(.)/g, (match, group) => group.toUpperCase());\n}\n\n// eslint-disable-next-line\n\nfunction qsa(selector, context) {\n  if (typeof selector !== 'string') {\n    return [selector];\n  }\n\n  const a = [];\n  const res = context.querySelectorAll(selector);\n\n  for (let i = 0; i < res.length; i += 1) {\n    a.push(res[i]);\n  }\n\n  return a;\n}\n\nfunction $(selector, context) {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n  let arr = [];\n\n  if (!context && selector instanceof Dom7) {\n    return selector;\n  }\n\n  if (!selector) {\n    return new Dom7(arr);\n  }\n\n  if (typeof selector === 'string') {\n    const html = selector.trim();\n\n    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {\n      let toCreate = 'div';\n      if (html.indexOf('<li') === 0) toCreate = 'ul';\n      if (html.indexOf('<tr') === 0) toCreate = 'tbody';\n      if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';\n      if (html.indexOf('<tbody') === 0) toCreate = 'table';\n      if (html.indexOf('<option') === 0) toCreate = 'select';\n      const tempParent = document.createElement(toCreate);\n      tempParent.innerHTML = html;\n\n      for (let i = 0; i < tempParent.childNodes.length; i += 1) {\n        arr.push(tempParent.childNodes[i]);\n      }\n    } else {\n      arr = qsa(selector.trim(), context || document);\n    } // arr = qsa(selector, document);\n\n  } else if (selector.nodeType || selector === window || selector === document) {\n    arr.push(selector);\n  } else if (Array.isArray(selector)) {\n    if (selector instanceof Dom7) return selector;\n    arr = selector;\n  }\n\n  return new Dom7(arrayUnique(arr));\n}\n\n$.fn = Dom7.prototype;\n\n// eslint-disable-next-line\n\nfunction addClass(...classes) {\n  const classNames = arrayFlat(classes.map(c => c.split(' ')));\n  this.forEach(el => {\n    el.classList.add(...classNames);\n  });\n  return this;\n}\n\nfunction removeClass(...classes) {\n  const classNames = arrayFlat(classes.map(c => c.split(' ')));\n  this.forEach(el => {\n    el.classList.remove(...classNames);\n  });\n  return this;\n}\n\nfunction toggleClass(...classes) {\n  const classNames = arrayFlat(classes.map(c => c.split(' ')));\n  this.forEach(el => {\n    classNames.forEach(className => {\n      el.classList.toggle(className);\n    });\n  });\n}\n\nfunction hasClass(...classes) {\n  const classNames = arrayFlat(classes.map(c => c.split(' ')));\n  return arrayFilter(this, el => {\n    return classNames.filter(className => el.classList.contains(className)).length > 0;\n  }).length > 0;\n}\n\nfunction attr(attrs, value) {\n  if (arguments.length === 1 && typeof attrs === 'string') {\n    // Get attr\n    if (this[0]) return this[0].getAttribute(attrs);\n    return undefined;\n  } // Set attrs\n\n\n  for (let i = 0; i < this.length; i += 1) {\n    if (arguments.length === 2) {\n      // String\n      this[i].setAttribute(attrs, value);\n    } else {\n      // Object\n      for (const attrName in attrs) {\n        this[i][attrName] = attrs[attrName];\n        this[i].setAttribute(attrName, attrs[attrName]);\n      }\n    }\n  }\n\n  return this;\n}\n\nfunction removeAttr(attr) {\n  for (let i = 0; i < this.length; i += 1) {\n    this[i].removeAttribute(attr);\n  }\n\n  return this;\n}\n\nfunction prop(props, value) {\n  if (arguments.length === 1 && typeof props === 'string') {\n    // Get prop\n    if (this[0]) return this[0][props];\n  } else {\n    // Set props\n    for (let i = 0; i < this.length; i += 1) {\n      if (arguments.length === 2) {\n        // String\n        this[i][props] = value;\n      } else {\n        // Object\n        for (const propName in props) {\n          this[i][propName] = props[propName];\n        }\n      }\n    }\n\n    return this;\n  }\n\n  return this;\n}\n\nfunction data(key, value) {\n  let el;\n\n  if (typeof value === 'undefined') {\n    el = this[0];\n    if (!el) return undefined; // Get value\n\n    if (el.dom7ElementDataStorage && key in el.dom7ElementDataStorage) {\n      return el.dom7ElementDataStorage[key];\n    }\n\n    const dataKey = el.getAttribute(`data-${key}`);\n\n    if (dataKey) {\n      return dataKey;\n    }\n\n    return undefined;\n  } // Set value\n\n\n  for (let i = 0; i < this.length; i += 1) {\n    el = this[i];\n    if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};\n    el.dom7ElementDataStorage[key] = value;\n  }\n\n  return this;\n}\n\nfunction removeData(key) {\n  for (let i = 0; i < this.length; i += 1) {\n    const el = this[i];\n\n    if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {\n      el.dom7ElementDataStorage[key] = null;\n      delete el.dom7ElementDataStorage[key];\n    }\n  }\n}\n\nfunction dataset() {\n  const el = this[0];\n  if (!el) return undefined;\n  const dataset = {}; // eslint-disable-line\n\n  if (el.dataset) {\n    for (const dataKey in el.dataset) {\n      dataset[dataKey] = el.dataset[dataKey];\n    }\n  } else {\n    for (let i = 0; i < el.attributes.length; i += 1) {\n      const attr = el.attributes[i];\n\n      if (attr.name.indexOf('data-') >= 0) {\n        dataset[toCamelCase(attr.name.split('data-')[1])] = attr.value;\n      }\n    }\n  }\n\n  for (const key in dataset) {\n    if (dataset[key] === 'false') dataset[key] = false;else if (dataset[key] === 'true') dataset[key] = true;else if (parseFloat(dataset[key]) === dataset[key] * 1) dataset[key] *= 1;\n  }\n\n  return dataset;\n}\n\nfunction val(value) {\n  if (typeof value === 'undefined') {\n    // get value\n    const el = this[0];\n    if (!el) return undefined;\n\n    if (el.multiple && el.nodeName.toLowerCase() === 'select') {\n      const values = [];\n\n      for (let i = 0; i < el.selectedOptions.length; i += 1) {\n        values.push(el.selectedOptions[i].value);\n      }\n\n      return values;\n    }\n\n    return el.value;\n  } // set value\n\n\n  for (let i = 0; i < this.length; i += 1) {\n    const el = this[i];\n\n    if (Array.isArray(value) && el.multiple && el.nodeName.toLowerCase() === 'select') {\n      for (let j = 0; j < el.options.length; j += 1) {\n        el.options[j].selected = value.indexOf(el.options[j].value) >= 0;\n      }\n    } else {\n      el.value = value;\n    }\n  }\n\n  return this;\n}\n\nfunction value(value) {\n  return this.val(value);\n}\n\nfunction transform(transform) {\n  for (let i = 0; i < this.length; i += 1) {\n    this[i].style.transform = transform;\n  }\n\n  return this;\n}\n\nfunction transition(duration) {\n  for (let i = 0; i < this.length; i += 1) {\n    this[i].style.transitionDuration = typeof duration !== 'string' ? `${duration}ms` : duration;\n  }\n\n  return this;\n}\n\nfunction on(...args) {\n  let [eventType, targetSelector, listener, capture] = args;\n\n  if (typeof args[1] === 'function') {\n    [eventType, listener, capture] = args;\n    targetSelector = undefined;\n  }\n\n  if (!capture) capture = false;\n\n  function handleLiveEvent(e) {\n    const target = e.target;\n    if (!target) return;\n    const eventData = e.target.dom7EventData || [];\n\n    if (eventData.indexOf(e) < 0) {\n      eventData.unshift(e);\n    }\n\n    if ($(target).is(targetSelector)) listener.apply(target, eventData);else {\n      const parents = $(target).parents(); // eslint-disable-line\n\n      for (let k = 0; k < parents.length; k += 1) {\n        if ($(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);\n      }\n    }\n  }\n\n  function handleEvent(e) {\n    const eventData = e && e.target ? e.target.dom7EventData || [] : [];\n\n    if (eventData.indexOf(e) < 0) {\n      eventData.unshift(e);\n    }\n\n    listener.apply(this, eventData);\n  }\n\n  const events = eventType.split(' ');\n  let j;\n\n  for (let i = 0; i < this.length; i += 1) {\n    const el = this[i];\n\n    if (!targetSelector) {\n      for (j = 0; j < events.length; j += 1) {\n        const event = events[j];\n        if (!el.dom7Listeners) el.dom7Listeners = {};\n        if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];\n        el.dom7Listeners[event].push({\n          listener,\n          proxyListener: handleEvent\n        });\n        el.addEventListener(event, handleEvent, capture);\n      }\n    } else {\n      // Live events\n      for (j = 0; j < events.length; j += 1) {\n        const event = events[j];\n        if (!el.dom7LiveListeners) el.dom7LiveListeners = {};\n        if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];\n        el.dom7LiveListeners[event].push({\n          listener,\n          proxyListener: handleLiveEvent\n        });\n        el.addEventListener(event, handleLiveEvent, capture);\n      }\n    }\n  }\n\n  return this;\n}\n\nfunction off(...args) {\n  let [eventType, targetSelector, listener, capture] = args;\n\n  if (typeof args[1] === 'function') {\n    [eventType, listener, capture] = args;\n    targetSelector = undefined;\n  }\n\n  if (!capture) capture = false;\n  const events = eventType.split(' ');\n\n  for (let i = 0; i < events.length; i += 1) {\n    const event = events[i];\n\n    for (let j = 0; j < this.length; j += 1) {\n      const el = this[j];\n      let handlers;\n\n      if (!targetSelector && el.dom7Listeners) {\n        handlers = el.dom7Listeners[event];\n      } else if (targetSelector && el.dom7LiveListeners) {\n        handlers = el.dom7LiveListeners[event];\n      }\n\n      if (handlers && handlers.length) {\n        for (let k = handlers.length - 1; k >= 0; k -= 1) {\n          const handler = handlers[k];\n\n          if (listener && handler.listener === listener) {\n            el.removeEventListener(event, handler.proxyListener, capture);\n            handlers.splice(k, 1);\n          } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {\n            el.removeEventListener(event, handler.proxyListener, capture);\n            handlers.splice(k, 1);\n          } else if (!listener) {\n            el.removeEventListener(event, handler.proxyListener, capture);\n            handlers.splice(k, 1);\n          }\n        }\n      }\n    }\n  }\n\n  return this;\n}\n\nfunction once(...args) {\n  const dom = this;\n  let [eventName, targetSelector, listener, capture] = args;\n\n  if (typeof args[1] === 'function') {\n    [eventName, listener, capture] = args;\n    targetSelector = undefined;\n  }\n\n  function onceHandler(...eventArgs) {\n    listener.apply(this, eventArgs);\n    dom.off(eventName, targetSelector, onceHandler, capture);\n\n    if (onceHandler.dom7proxy) {\n      delete onceHandler.dom7proxy;\n    }\n  }\n\n  onceHandler.dom7proxy = listener;\n  return dom.on(eventName, targetSelector, onceHandler, capture);\n}\n\nfunction trigger(...args) {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  const events = args[0].split(' ');\n  const eventData = args[1];\n\n  for (let i = 0; i < events.length; i += 1) {\n    const event = events[i];\n\n    for (let j = 0; j < this.length; j += 1) {\n      const el = this[j];\n\n      if (window.CustomEvent) {\n        const evt = new window.CustomEvent(event, {\n          detail: eventData,\n          bubbles: true,\n          cancelable: true\n        });\n        el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);\n        el.dispatchEvent(evt);\n        el.dom7EventData = [];\n        delete el.dom7EventData;\n      }\n    }\n  }\n\n  return this;\n}\n\nfunction transitionEnd(callback) {\n  const dom = this;\n\n  function fireCallBack(e) {\n    if (e.target !== this) return;\n    callback.call(this, e);\n    dom.off('transitionend', fireCallBack);\n  }\n\n  if (callback) {\n    dom.on('transitionend', fireCallBack);\n  }\n\n  return this;\n}\n\nfunction animationEnd(callback) {\n  const dom = this;\n\n  function fireCallBack(e) {\n    if (e.target !== this) return;\n    callback.call(this, e);\n    dom.off('animationend', fireCallBack);\n  }\n\n  if (callback) {\n    dom.on('animationend', fireCallBack);\n  }\n\n  return this;\n}\n\nfunction width() {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n\n  if (this[0] === window) {\n    return window.innerWidth;\n  }\n\n  if (this.length > 0) {\n    return parseFloat(this.css('width'));\n  }\n\n  return null;\n}\n\nfunction outerWidth(includeMargins) {\n  if (this.length > 0) {\n    if (includeMargins) {\n      const styles = this.styles();\n      return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));\n    }\n\n    return this[0].offsetWidth;\n  }\n\n  return null;\n}\n\nfunction height() {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n\n  if (this[0] === window) {\n    return window.innerHeight;\n  }\n\n  if (this.length > 0) {\n    return parseFloat(this.css('height'));\n  }\n\n  return null;\n}\n\nfunction outerHeight(includeMargins) {\n  if (this.length > 0) {\n    if (includeMargins) {\n      const styles = this.styles();\n      return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));\n    }\n\n    return this[0].offsetHeight;\n  }\n\n  return null;\n}\n\nfunction offset() {\n  if (this.length > 0) {\n    const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n    const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n    const el = this[0];\n    const box = el.getBoundingClientRect();\n    const body = document.body;\n    const clientTop = el.clientTop || body.clientTop || 0;\n    const clientLeft = el.clientLeft || body.clientLeft || 0;\n    const scrollTop = el === window ? window.scrollY : el.scrollTop;\n    const scrollLeft = el === window ? window.scrollX : el.scrollLeft;\n    return {\n      top: box.top + scrollTop - clientTop,\n      left: box.left + scrollLeft - clientLeft\n    };\n  }\n\n  return null;\n}\n\nfunction hide() {\n  for (let i = 0; i < this.length; i += 1) {\n    this[i].style.display = 'none';\n  }\n\n  return this;\n}\n\nfunction show() {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n\n  for (let i = 0; i < this.length; i += 1) {\n    const el = this[i];\n\n    if (el.style.display === 'none') {\n      el.style.display = '';\n    }\n\n    if (window.getComputedStyle(el, null).getPropertyValue('display') === 'none') {\n      // Still not visible\n      el.style.display = 'block';\n    }\n  }\n\n  return this;\n}\n\nfunction styles() {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  if (this[0]) return window.getComputedStyle(this[0], null);\n  return {};\n}\n\nfunction css(props, value) {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  let i;\n\n  if (arguments.length === 1) {\n    if (typeof props === 'string') {\n      // .css('width')\n      if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);\n    } else {\n      // .css({ width: '100px' })\n      for (i = 0; i < this.length; i += 1) {\n        for (const prop in props) {\n          this[i].style[prop] = props[prop];\n        }\n      }\n\n      return this;\n    }\n  }\n\n  if (arguments.length === 2 && typeof props === 'string') {\n    // .css('width', '100px')\n    for (i = 0; i < this.length; i += 1) {\n      this[i].style[props] = value;\n    }\n\n    return this;\n  }\n\n  return this;\n}\n\nfunction each(callback) {\n  if (!callback) return this;\n  this.forEach((el, index) => {\n    callback.apply(el, [el, index]);\n  });\n  return this;\n}\n\nfunction filter(callback) {\n  const result = arrayFilter(this, callback);\n  return $(result);\n}\n\nfunction html(html) {\n  if (typeof html === 'undefined') {\n    return this[0] ? this[0].innerHTML : null;\n  }\n\n  for (let i = 0; i < this.length; i += 1) {\n    this[i].innerHTML = html;\n  }\n\n  return this;\n}\n\nfunction text(text) {\n  if (typeof text === 'undefined') {\n    return this[0] ? this[0].textContent.trim() : null;\n  }\n\n  for (let i = 0; i < this.length; i += 1) {\n    this[i].textContent = text;\n  }\n\n  return this;\n}\n\nfunction is(selector) {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n  const el = this[0];\n  let compareWith;\n  let i;\n  if (!el || typeof selector === 'undefined') return false;\n\n  if (typeof selector === 'string') {\n    if (el.matches) return el.matches(selector);\n    if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);\n    if (el.msMatchesSelector) return el.msMatchesSelector(selector);\n    compareWith = $(selector);\n\n    for (i = 0; i < compareWith.length; i += 1) {\n      if (compareWith[i] === el) return true;\n    }\n\n    return false;\n  }\n\n  if (selector === document) {\n    return el === document;\n  }\n\n  if (selector === window) {\n    return el === window;\n  }\n\n  if (selector.nodeType || selector instanceof Dom7) {\n    compareWith = selector.nodeType ? [selector] : selector;\n\n    for (i = 0; i < compareWith.length; i += 1) {\n      if (compareWith[i] === el) return true;\n    }\n\n    return false;\n  }\n\n  return false;\n}\n\nfunction index() {\n  let child = this[0];\n  let i;\n\n  if (child) {\n    i = 0; // eslint-disable-next-line\n\n    while ((child = child.previousSibling) !== null) {\n      if (child.nodeType === 1) i += 1;\n    }\n\n    return i;\n  }\n\n  return undefined;\n}\n\nfunction eq(index) {\n  if (typeof index === 'undefined') return this;\n  const length = this.length;\n\n  if (index > length - 1) {\n    return $([]);\n  }\n\n  if (index < 0) {\n    const returnIndex = length + index;\n    if (returnIndex < 0) return $([]);\n    return $([this[returnIndex]]);\n  }\n\n  return $([this[index]]);\n}\n\nfunction append(...els) {\n  let newChild;\n  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n\n  for (let k = 0; k < els.length; k += 1) {\n    newChild = els[k];\n\n    for (let i = 0; i < this.length; i += 1) {\n      if (typeof newChild === 'string') {\n        const tempDiv = document.createElement('div');\n        tempDiv.innerHTML = newChild;\n\n        while (tempDiv.firstChild) {\n          this[i].appendChild(tempDiv.firstChild);\n        }\n      } else if (newChild instanceof Dom7) {\n        for (let j = 0; j < newChild.length; j += 1) {\n          this[i].appendChild(newChild[j]);\n        }\n      } else {\n        this[i].appendChild(newChild);\n      }\n    }\n  }\n\n  return this;\n}\n\nfunction appendTo(parent) {\n  $(parent).append(this);\n  return this;\n}\n\nfunction prepend(newChild) {\n  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n  let i;\n  let j;\n\n  for (i = 0; i < this.length; i += 1) {\n    if (typeof newChild === 'string') {\n      const tempDiv = document.createElement('div');\n      tempDiv.innerHTML = newChild;\n\n      for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {\n        this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);\n      }\n    } else if (newChild instanceof Dom7) {\n      for (j = 0; j < newChild.length; j += 1) {\n        this[i].insertBefore(newChild[j], this[i].childNodes[0]);\n      }\n    } else {\n      this[i].insertBefore(newChild, this[i].childNodes[0]);\n    }\n  }\n\n  return this;\n}\n\nfunction prependTo(parent) {\n  $(parent).prepend(this);\n  return this;\n}\n\nfunction insertBefore(selector) {\n  const before = $(selector);\n\n  for (let i = 0; i < this.length; i += 1) {\n    if (before.length === 1) {\n      before[0].parentNode.insertBefore(this[i], before[0]);\n    } else if (before.length > 1) {\n      for (let j = 0; j < before.length; j += 1) {\n        before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);\n      }\n    }\n  }\n}\n\nfunction insertAfter(selector) {\n  const after = $(selector);\n\n  for (let i = 0; i < this.length; i += 1) {\n    if (after.length === 1) {\n      after[0].parentNode.insertBefore(this[i], after[0].nextSibling);\n    } else if (after.length > 1) {\n      for (let j = 0; j < after.length; j += 1) {\n        after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);\n      }\n    }\n  }\n}\n\nfunction next(selector) {\n  if (this.length > 0) {\n    if (selector) {\n      if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {\n        return $([this[0].nextElementSibling]);\n      }\n\n      return $([]);\n    }\n\n    if (this[0].nextElementSibling) return $([this[0].nextElementSibling]);\n    return $([]);\n  }\n\n  return $([]);\n}\n\nfunction nextAll(selector) {\n  const nextEls = [];\n  let el = this[0];\n  if (!el) return $([]);\n\n  while (el.nextElementSibling) {\n    const next = el.nextElementSibling; // eslint-disable-line\n\n    if (selector) {\n      if ($(next).is(selector)) nextEls.push(next);\n    } else nextEls.push(next);\n\n    el = next;\n  }\n\n  return $(nextEls);\n}\n\nfunction prev(selector) {\n  if (this.length > 0) {\n    const el = this[0];\n\n    if (selector) {\n      if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {\n        return $([el.previousElementSibling]);\n      }\n\n      return $([]);\n    }\n\n    if (el.previousElementSibling) return $([el.previousElementSibling]);\n    return $([]);\n  }\n\n  return $([]);\n}\n\nfunction prevAll(selector) {\n  const prevEls = [];\n  let el = this[0];\n  if (!el) return $([]);\n\n  while (el.previousElementSibling) {\n    const prev = el.previousElementSibling; // eslint-disable-line\n\n    if (selector) {\n      if ($(prev).is(selector)) prevEls.push(prev);\n    } else prevEls.push(prev);\n\n    el = prev;\n  }\n\n  return $(prevEls);\n}\n\nfunction siblings(selector) {\n  return this.nextAll(selector).add(this.prevAll(selector));\n}\n\nfunction parent(selector) {\n  const parents = []; // eslint-disable-line\n\n  for (let i = 0; i < this.length; i += 1) {\n    if (this[i].parentNode !== null) {\n      if (selector) {\n        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);\n      } else {\n        parents.push(this[i].parentNode);\n      }\n    }\n  }\n\n  return $(parents);\n}\n\nfunction parents(selector) {\n  const parents = []; // eslint-disable-line\n\n  for (let i = 0; i < this.length; i += 1) {\n    let parent = this[i].parentNode; // eslint-disable-line\n\n    while (parent) {\n      if (selector) {\n        if ($(parent).is(selector)) parents.push(parent);\n      } else {\n        parents.push(parent);\n      }\n\n      parent = parent.parentNode;\n    }\n  }\n\n  return $(parents);\n}\n\nfunction closest(selector) {\n  let closest = this; // eslint-disable-line\n\n  if (typeof selector === 'undefined') {\n    return $([]);\n  }\n\n  if (!closest.is(selector)) {\n    closest = closest.parents(selector).eq(0);\n  }\n\n  return closest;\n}\n\nfunction find(selector) {\n  const foundElements = [];\n\n  for (let i = 0; i < this.length; i += 1) {\n    const found = this[i].querySelectorAll(selector);\n\n    for (let j = 0; j < found.length; j += 1) {\n      foundElements.push(found[j]);\n    }\n  }\n\n  return $(foundElements);\n}\n\nfunction children(selector) {\n  const children = []; // eslint-disable-line\n\n  for (let i = 0; i < this.length; i += 1) {\n    const childNodes = this[i].children;\n\n    for (let j = 0; j < childNodes.length; j += 1) {\n      if (!selector || $(childNodes[j]).is(selector)) {\n        children.push(childNodes[j]);\n      }\n    }\n  }\n\n  return $(children);\n}\n\nfunction remove() {\n  for (let i = 0; i < this.length; i += 1) {\n    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);\n  }\n\n  return this;\n}\n\nfunction detach() {\n  return this.remove();\n}\n\nfunction add(...els) {\n  const dom = this;\n  let i;\n  let j;\n\n  for (i = 0; i < els.length; i += 1) {\n    const toAdd = $(els[i]);\n\n    for (j = 0; j < toAdd.length; j += 1) {\n      dom.push(toAdd[j]);\n    }\n  }\n\n  return dom;\n}\n\nfunction empty() {\n  for (let i = 0; i < this.length; i += 1) {\n    const el = this[i];\n\n    if (el.nodeType === 1) {\n      for (let j = 0; j < el.childNodes.length; j += 1) {\n        if (el.childNodes[j].parentNode) {\n          el.childNodes[j].parentNode.removeChild(el.childNodes[j]);\n        }\n      }\n\n      el.textContent = '';\n    }\n  }\n\n  return this;\n}\n\n// eslint-disable-next-line\n\nfunction scrollTo(...args) {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  let [left, top, duration, easing, callback] = args;\n\n  if (args.length === 4 && typeof easing === 'function') {\n    callback = easing;\n    [left, top, duration, callback, easing] = args;\n  }\n\n  if (typeof easing === 'undefined') easing = 'swing';\n  return this.each(function animate() {\n    const el = this;\n    let currentTop;\n    let currentLeft;\n    let maxTop;\n    let maxLeft;\n    let newTop;\n    let newLeft;\n    let scrollTop; // eslint-disable-line\n\n    let scrollLeft; // eslint-disable-line\n\n    let animateTop = top > 0 || top === 0;\n    let animateLeft = left > 0 || left === 0;\n\n    if (typeof easing === 'undefined') {\n      easing = 'swing';\n    }\n\n    if (animateTop) {\n      currentTop = el.scrollTop;\n\n      if (!duration) {\n        el.scrollTop = top;\n      }\n    }\n\n    if (animateLeft) {\n      currentLeft = el.scrollLeft;\n\n      if (!duration) {\n        el.scrollLeft = left;\n      }\n    }\n\n    if (!duration) return;\n\n    if (animateTop) {\n      maxTop = el.scrollHeight - el.offsetHeight;\n      newTop = Math.max(Math.min(top, maxTop), 0);\n    }\n\n    if (animateLeft) {\n      maxLeft = el.scrollWidth - el.offsetWidth;\n      newLeft = Math.max(Math.min(left, maxLeft), 0);\n    }\n\n    let startTime = null;\n    if (animateTop && newTop === currentTop) animateTop = false;\n    if (animateLeft && newLeft === currentLeft) animateLeft = false;\n\n    function render(time = new Date().getTime()) {\n      if (startTime === null) {\n        startTime = time;\n      }\n\n      const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);\n      const easeProgress = easing === 'linear' ? progress : 0.5 - Math.cos(progress * Math.PI) / 2;\n      let done;\n      if (animateTop) scrollTop = currentTop + easeProgress * (newTop - currentTop);\n      if (animateLeft) scrollLeft = currentLeft + easeProgress * (newLeft - currentLeft);\n\n      if (animateTop && newTop > currentTop && scrollTop >= newTop) {\n        el.scrollTop = newTop;\n        done = true;\n      }\n\n      if (animateTop && newTop < currentTop && scrollTop <= newTop) {\n        el.scrollTop = newTop;\n        done = true;\n      }\n\n      if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft) {\n        el.scrollLeft = newLeft;\n        done = true;\n      }\n\n      if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft) {\n        el.scrollLeft = newLeft;\n        done = true;\n      }\n\n      if (done) {\n        if (callback) callback();\n        return;\n      }\n\n      if (animateTop) el.scrollTop = scrollTop;\n      if (animateLeft) el.scrollLeft = scrollLeft;\n      window.requestAnimationFrame(render);\n    }\n\n    window.requestAnimationFrame(render);\n  });\n} // scrollTop(top, duration, easing, callback) {\n\n\nfunction scrollTop(...args) {\n  let [top, duration, easing, callback] = args;\n\n  if (args.length === 3 && typeof easing === 'function') {\n    [top, duration, callback, easing] = args;\n  }\n\n  const dom = this;\n\n  if (typeof top === 'undefined') {\n    if (dom.length > 0) return dom[0].scrollTop;\n    return null;\n  }\n\n  return dom.scrollTo(undefined, top, duration, easing, callback);\n}\n\nfunction scrollLeft(...args) {\n  let [left, duration, easing, callback] = args;\n\n  if (args.length === 3 && typeof easing === 'function') {\n    [left, duration, callback, easing] = args;\n  }\n\n  const dom = this;\n\n  if (typeof left === 'undefined') {\n    if (dom.length > 0) return dom[0].scrollLeft;\n    return null;\n  }\n\n  return dom.scrollTo(left, undefined, duration, easing, callback);\n}\n\n// eslint-disable-next-line\n\nfunction animate(initialProps, initialParams) {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  const els = this;\n  const a = {\n    props: Object.assign({}, initialProps),\n    params: Object.assign({\n      duration: 300,\n      easing: 'swing' // or 'linear'\n\n      /* Callbacks\n      begin(elements)\n      complete(elements)\n      progress(elements, complete, remaining, start, tweenValue)\n      */\n\n    }, initialParams),\n    elements: els,\n    animating: false,\n    que: [],\n\n    easingProgress(easing, progress) {\n      if (easing === 'swing') {\n        return 0.5 - Math.cos(progress * Math.PI) / 2;\n      }\n\n      if (typeof easing === 'function') {\n        return easing(progress);\n      }\n\n      return progress;\n    },\n\n    stop() {\n      if (a.frameId) {\n        window.cancelAnimationFrame(a.frameId);\n      }\n\n      a.animating = false;\n      a.elements.each(el => {\n        const element = el;\n        delete element.dom7AnimateInstance;\n      });\n      a.que = [];\n    },\n\n    done(complete) {\n      a.animating = false;\n      a.elements.each(el => {\n        const element = el;\n        delete element.dom7AnimateInstance;\n      });\n      if (complete) complete(els);\n\n      if (a.que.length > 0) {\n        const que = a.que.shift();\n        a.animate(que[0], que[1]);\n      }\n    },\n\n    animate(props, params) {\n      if (a.animating) {\n        a.que.push([props, params]);\n        return a;\n      }\n\n      const elements = []; // Define & Cache Initials & Units\n\n      a.elements.each((el, index) => {\n        let initialFullValue;\n        let initialValue;\n        let unit;\n        let finalValue;\n        let finalFullValue;\n        if (!el.dom7AnimateInstance) a.elements[index].dom7AnimateInstance = a;\n        elements[index] = {\n          container: el\n        };\n        Object.keys(props).forEach(prop => {\n          initialFullValue = window.getComputedStyle(el, null).getPropertyValue(prop).replace(',', '.');\n          initialValue = parseFloat(initialFullValue);\n          unit = initialFullValue.replace(initialValue, '');\n          finalValue = parseFloat(props[prop]);\n          finalFullValue = props[prop] + unit;\n          elements[index][prop] = {\n            initialFullValue,\n            initialValue,\n            unit,\n            finalValue,\n            finalFullValue,\n            currentValue: initialValue\n          };\n        });\n      });\n      let startTime = null;\n      let time;\n      let elementsDone = 0;\n      let propsDone = 0;\n      let done;\n      let began = false;\n      a.animating = true;\n\n      function render() {\n        time = new Date().getTime();\n        let progress;\n        let easeProgress; // let el;\n\n        if (!began) {\n          began = true;\n          if (params.begin) params.begin(els);\n        }\n\n        if (startTime === null) {\n          startTime = time;\n        }\n\n        if (params.progress) {\n          // eslint-disable-next-line\n          params.progress(els, Math.max(Math.min((time - startTime) / params.duration, 1), 0), startTime + params.duration - time < 0 ? 0 : startTime + params.duration - time, startTime);\n        }\n\n        elements.forEach(element => {\n          const el = element;\n          if (done || el.done) return;\n          Object.keys(props).forEach(prop => {\n            if (done || el.done) return;\n            progress = Math.max(Math.min((time - startTime) / params.duration, 1), 0);\n            easeProgress = a.easingProgress(params.easing, progress);\n            const {\n              initialValue,\n              finalValue,\n              unit\n            } = el[prop];\n            el[prop].currentValue = initialValue + easeProgress * (finalValue - initialValue);\n            const currentValue = el[prop].currentValue;\n\n            if (finalValue > initialValue && currentValue >= finalValue || finalValue < initialValue && currentValue <= finalValue) {\n              el.container.style[prop] = finalValue + unit;\n              propsDone += 1;\n\n              if (propsDone === Object.keys(props).length) {\n                el.done = true;\n                elementsDone += 1;\n              }\n\n              if (elementsDone === elements.length) {\n                done = true;\n              }\n            }\n\n            if (done) {\n              a.done(params.complete);\n              return;\n            }\n\n            el.container.style[prop] = currentValue + unit;\n          });\n        });\n        if (done) return; // Then call\n\n        a.frameId = window.requestAnimationFrame(render);\n      }\n\n      a.frameId = window.requestAnimationFrame(render);\n      return a;\n    }\n\n  };\n\n  if (a.elements.length === 0) {\n    return els;\n  }\n\n  let animateInstance;\n\n  for (let i = 0; i < a.elements.length; i += 1) {\n    if (a.elements[i].dom7AnimateInstance) {\n      animateInstance = a.elements[i].dom7AnimateInstance;\n    } else a.elements[i].dom7AnimateInstance = a;\n  }\n\n  if (!animateInstance) {\n    animateInstance = a;\n  }\n\n  if (initialProps === 'stop') {\n    animateInstance.stop();\n  } else {\n    animateInstance.animate(a.props, a.params);\n  }\n\n  return els;\n}\n\nfunction stop() {\n  const els = this;\n\n  for (let i = 0; i < els.length; i += 1) {\n    if (els[i].dom7AnimateInstance) {\n      els[i].dom7AnimateInstance.stop();\n    }\n  }\n}\n\nconst noTrigger = 'resize scroll'.split(' ');\n\nfunction shortcut(name) {\n  function eventHandler(...args) {\n    if (typeof args[0] === 'undefined') {\n      for (let i = 0; i < this.length; i += 1) {\n        if (noTrigger.indexOf(name) < 0) {\n          if (name in this[i]) this[i][name]();else {\n            $(this[i]).trigger(name);\n          }\n        }\n      }\n\n      return this;\n    }\n\n    return this.on(name, ...args);\n  }\n\n  return eventHandler;\n}\n\nconst click = shortcut('click');\nconst blur = shortcut('blur');\nconst focus = shortcut('focus');\nconst focusin = shortcut('focusin');\nconst focusout = shortcut('focusout');\nconst keyup = shortcut('keyup');\nconst keydown = shortcut('keydown');\nconst keypress = shortcut('keypress');\nconst submit = shortcut('submit');\nconst change = shortcut('change');\nconst mousedown = shortcut('mousedown');\nconst mousemove = shortcut('mousemove');\nconst mouseup = shortcut('mouseup');\nconst mouseenter = shortcut('mouseenter');\nconst mouseleave = shortcut('mouseleave');\nconst mouseout = shortcut('mouseout');\nconst mouseover = shortcut('mouseover');\nconst touchstart = shortcut('touchstart');\nconst touchend = shortcut('touchend');\nconst touchmove = shortcut('touchmove');\nconst resize = shortcut('resize');\nconst scroll = shortcut('scroll');\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($);\n\n\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/dom7/dom7.esm.js?");

/***/ }),

/***/ "./node_modules/ssr-window/ssr-window.esm.js":
/*!***************************************************!*\
  !*** ./node_modules/ssr-window/ssr-window.esm.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"extend\": () => (/* binding */ extend),\n/* harmony export */   \"getDocument\": () => (/* binding */ getDocument),\n/* harmony export */   \"getWindow\": () => (/* binding */ getWindow),\n/* harmony export */   \"ssrDocument\": () => (/* binding */ ssrDocument),\n/* harmony export */   \"ssrWindow\": () => (/* binding */ ssrWindow)\n/* harmony export */ });\n/**\n * SSR Window 4.0.2\n * Better handling for window object in SSR environment\n * https://github.com/nolimits4web/ssr-window\n *\n * Copyright 2021, Vladimir Kharlampidi\n *\n * Licensed under MIT\n *\n * Released on: December 13, 2021\n */\n/* eslint-disable no-param-reassign */\nfunction isObject(obj) {\n    return (obj !== null &&\n        typeof obj === 'object' &&\n        'constructor' in obj &&\n        obj.constructor === Object);\n}\nfunction extend(target = {}, src = {}) {\n    Object.keys(src).forEach((key) => {\n        if (typeof target[key] === 'undefined')\n            target[key] = src[key];\n        else if (isObject(src[key]) &&\n            isObject(target[key]) &&\n            Object.keys(src[key]).length > 0) {\n            extend(target[key], src[key]);\n        }\n    });\n}\n\nconst ssrDocument = {\n    body: {},\n    addEventListener() { },\n    removeEventListener() { },\n    activeElement: {\n        blur() { },\n        nodeName: '',\n    },\n    querySelector() {\n        return null;\n    },\n    querySelectorAll() {\n        return [];\n    },\n    getElementById() {\n        return null;\n    },\n    createEvent() {\n        return {\n            initEvent() { },\n        };\n    },\n    createElement() {\n        return {\n            children: [],\n            childNodes: [],\n            style: {},\n            setAttribute() { },\n            getElementsByTagName() {\n                return [];\n            },\n        };\n    },\n    createElementNS() {\n        return {};\n    },\n    importNode() {\n        return null;\n    },\n    location: {\n        hash: '',\n        host: '',\n        hostname: '',\n        href: '',\n        origin: '',\n        pathname: '',\n        protocol: '',\n        search: '',\n    },\n};\nfunction getDocument() {\n    const doc = typeof document !== 'undefined' ? document : {};\n    extend(doc, ssrDocument);\n    return doc;\n}\n\nconst ssrWindow = {\n    document: ssrDocument,\n    navigator: {\n        userAgent: '',\n    },\n    location: {\n        hash: '',\n        host: '',\n        hostname: '',\n        href: '',\n        origin: '',\n        pathname: '',\n        protocol: '',\n        search: '',\n    },\n    history: {\n        replaceState() { },\n        pushState() { },\n        go() { },\n        back() { },\n    },\n    CustomEvent: function CustomEvent() {\n        return this;\n    },\n    addEventListener() { },\n    removeEventListener() { },\n    getComputedStyle() {\n        return {\n            getPropertyValue() {\n                return '';\n            },\n        };\n    },\n    Image() { },\n    Date() { },\n    screen: {},\n    setTimeout() { },\n    clearTimeout() { },\n    matchMedia() {\n        return {};\n    },\n    requestAnimationFrame(callback) {\n        if (typeof setTimeout === 'undefined') {\n            callback();\n            return null;\n        }\n        return setTimeout(callback, 0);\n    },\n    cancelAnimationFrame(id) {\n        if (typeof setTimeout === 'undefined') {\n            return;\n        }\n        clearTimeout(id);\n    },\n};\nfunction getWindow() {\n    const win = typeof window !== 'undefined' ? window : {};\n    extend(win, ssrWindow);\n    return win;\n}\n\n\n\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/ssr-window/ssr-window.esm.js?");

/***/ }),

/***/ "./node_modules/swiper/core/breakpoints/getBreakpoint.js":
/*!***************************************************************!*\
  !*** ./node_modules/swiper/core/breakpoints/getBreakpoint.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ getBreakpoint)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n\nfunction getBreakpoint(breakpoints, base = 'window', containerEl) {\n  if (!breakpoints || base === 'container' && !containerEl) return undefined;\n  let breakpoint = false;\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  const currentHeight = base === 'window' ? window.innerHeight : containerEl.clientHeight;\n  const points = Object.keys(breakpoints).map(point => {\n    if (typeof point === 'string' && point.indexOf('@') === 0) {\n      const minRatio = parseFloat(point.substr(1));\n      const value = currentHeight * minRatio;\n      return {\n        value,\n        point\n      };\n    }\n\n    return {\n      value: point,\n      point\n    };\n  });\n  points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));\n\n  for (let i = 0; i < points.length; i += 1) {\n    const {\n      point,\n      value\n    } = points[i];\n\n    if (base === 'window') {\n      if (window.matchMedia(`(min-width: ${value}px)`).matches) {\n        breakpoint = point;\n      }\n    } else if (value <= containerEl.clientWidth) {\n      breakpoint = point;\n    }\n  }\n\n  return breakpoint || 'max';\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/breakpoints/getBreakpoint.js?");

/***/ }),

/***/ "./node_modules/swiper/core/breakpoints/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/swiper/core/breakpoints/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _setBreakpoint_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setBreakpoint.js */ \"./node_modules/swiper/core/breakpoints/setBreakpoint.js\");\n/* harmony import */ var _getBreakpoint_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getBreakpoint.js */ \"./node_modules/swiper/core/breakpoints/getBreakpoint.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  setBreakpoint: _setBreakpoint_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  getBreakpoint: _getBreakpoint_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n});\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/breakpoints/index.js?");

/***/ }),

/***/ "./node_modules/swiper/core/breakpoints/setBreakpoint.js":
/*!***************************************************************!*\
  !*** ./node_modules/swiper/core/breakpoints/setBreakpoint.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ setBreakpoint)\n/* harmony export */ });\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n\n\nconst isGridEnabled = (swiper, params) => {\n  return swiper.grid && params.grid && params.grid.rows > 1;\n};\n\nfunction setBreakpoint() {\n  const swiper = this;\n  const {\n    activeIndex,\n    initialized,\n    loopedSlides = 0,\n    params,\n    $el\n  } = swiper;\n  const breakpoints = params.breakpoints;\n  if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return; // Get breakpoint for window width and update parameters\n\n  const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);\n  if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;\n  const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;\n  const breakpointParams = breakpointOnlyParams || swiper.originalParams;\n  const wasMultiRow = isGridEnabled(swiper, params);\n  const isMultiRow = isGridEnabled(swiper, breakpointParams);\n  const wasEnabled = params.enabled;\n\n  if (wasMultiRow && !isMultiRow) {\n    $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);\n    swiper.emitContainerClasses();\n  } else if (!wasMultiRow && isMultiRow) {\n    $el.addClass(`${params.containerModifierClass}grid`);\n\n    if (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column' || !breakpointParams.grid.fill && params.grid.fill === 'column') {\n      $el.addClass(`${params.containerModifierClass}grid-column`);\n    }\n\n    swiper.emitContainerClasses();\n  } // Toggle navigation, pagination, scrollbar\n\n\n  ['navigation', 'pagination', 'scrollbar'].forEach(prop => {\n    const wasModuleEnabled = params[prop] && params[prop].enabled;\n    const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;\n\n    if (wasModuleEnabled && !isModuleEnabled) {\n      swiper[prop].disable();\n    }\n\n    if (!wasModuleEnabled && isModuleEnabled) {\n      swiper[prop].enable();\n    }\n  });\n  const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;\n  const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);\n\n  if (directionChanged && initialized) {\n    swiper.changeDirection();\n  }\n\n  (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.extend)(swiper.params, breakpointParams);\n  const isEnabled = swiper.params.enabled;\n  Object.assign(swiper, {\n    allowTouchMove: swiper.params.allowTouchMove,\n    allowSlideNext: swiper.params.allowSlideNext,\n    allowSlidePrev: swiper.params.allowSlidePrev\n  });\n\n  if (wasEnabled && !isEnabled) {\n    swiper.disable();\n  } else if (!wasEnabled && isEnabled) {\n    swiper.enable();\n  }\n\n  swiper.currentBreakpoint = breakpoint;\n  swiper.emit('_beforeBreakpoint', breakpointParams);\n\n  if (needsReLoop && initialized) {\n    swiper.loopDestroy();\n    swiper.loopCreate();\n    swiper.updateSlides();\n    swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);\n  }\n\n  swiper.emit('breakpoint', breakpointParams);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/breakpoints/setBreakpoint.js?");

/***/ }),

/***/ "./node_modules/swiper/core/check-overflow/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/swiper/core/check-overflow/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction checkOverflow() {\n  const swiper = this;\n  const {\n    isLocked: wasLocked,\n    params\n  } = swiper;\n  const {\n    slidesOffsetBefore\n  } = params;\n\n  if (slidesOffsetBefore) {\n    const lastSlideIndex = swiper.slides.length - 1;\n    const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;\n    swiper.isLocked = swiper.size > lastSlideRightEdge;\n  } else {\n    swiper.isLocked = swiper.snapGrid.length === 1;\n  }\n\n  if (params.allowSlideNext === true) {\n    swiper.allowSlideNext = !swiper.isLocked;\n  }\n\n  if (params.allowSlidePrev === true) {\n    swiper.allowSlidePrev = !swiper.isLocked;\n  }\n\n  if (wasLocked && wasLocked !== swiper.isLocked) {\n    swiper.isEnd = false;\n  }\n\n  if (wasLocked !== swiper.isLocked) {\n    swiper.emit(swiper.isLocked ? 'lock' : 'unlock');\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  checkOverflow\n});\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/check-overflow/index.js?");

/***/ }),

/***/ "./node_modules/swiper/core/classes/addClasses.js":
/*!********************************************************!*\
  !*** ./node_modules/swiper/core/classes/addClasses.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ addClasses)\n/* harmony export */ });\nfunction prepareClasses(entries, prefix) {\n  const resultClasses = [];\n  entries.forEach(item => {\n    if (typeof item === 'object') {\n      Object.keys(item).forEach(classNames => {\n        if (item[classNames]) {\n          resultClasses.push(prefix + classNames);\n        }\n      });\n    } else if (typeof item === 'string') {\n      resultClasses.push(prefix + item);\n    }\n  });\n  return resultClasses;\n}\n\nfunction addClasses() {\n  const swiper = this;\n  const {\n    classNames,\n    params,\n    rtl,\n    $el,\n    device,\n    support\n  } = swiper; // prettier-ignore\n\n  const suffixes = prepareClasses(['initialized', params.direction, {\n    'pointer-events': !support.touch\n  }, {\n    'free-mode': swiper.params.freeMode && params.freeMode.enabled\n  }, {\n    'autoheight': params.autoHeight\n  }, {\n    'rtl': rtl\n  }, {\n    'grid': params.grid && params.grid.rows > 1\n  }, {\n    'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column'\n  }, {\n    'android': device.android\n  }, {\n    'ios': device.ios\n  }, {\n    'css-mode': params.cssMode\n  }, {\n    'centered': params.cssMode && params.centeredSlides\n  }, {\n    'watch-progress': params.watchSlidesProgress\n  }], params.containerModifierClass);\n  classNames.push(...suffixes);\n  $el.addClass([...classNames].join(' '));\n  swiper.emitContainerClasses();\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/classes/addClasses.js?");

/***/ }),

/***/ "./node_modules/swiper/core/classes/index.js":
/*!***************************************************!*\
  !*** ./node_modules/swiper/core/classes/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _addClasses_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addClasses.js */ \"./node_modules/swiper/core/classes/addClasses.js\");\n/* harmony import */ var _removeClasses_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./removeClasses.js */ \"./node_modules/swiper/core/classes/removeClasses.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  addClasses: _addClasses_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  removeClasses: _removeClasses_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n});\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/classes/index.js?");

/***/ }),

/***/ "./node_modules/swiper/core/classes/removeClasses.js":
/*!***********************************************************!*\
  !*** ./node_modules/swiper/core/classes/removeClasses.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ removeClasses)\n/* harmony export */ });\nfunction removeClasses() {\n  const swiper = this;\n  const {\n    $el,\n    classNames\n  } = swiper;\n  $el.removeClass(classNames.join(' '));\n  swiper.emitContainerClasses();\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/classes/removeClasses.js?");

/***/ }),

/***/ "./node_modules/swiper/core/core.js":
/*!******************************************!*\
  !*** ./node_modules/swiper/core/core.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n/* harmony import */ var _shared_get_support_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/get-support.js */ \"./node_modules/swiper/shared/get-support.js\");\n/* harmony import */ var _shared_get_device_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/get-device.js */ \"./node_modules/swiper/shared/get-device.js\");\n/* harmony import */ var _shared_get_browser_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/get-browser.js */ \"./node_modules/swiper/shared/get-browser.js\");\n/* harmony import */ var _modules_resize_resize_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/resize/resize.js */ \"./node_modules/swiper/core/modules/resize/resize.js\");\n/* harmony import */ var _modules_observer_observer_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/observer/observer.js */ \"./node_modules/swiper/core/modules/observer/observer.js\");\n/* harmony import */ var _events_emitter_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./events-emitter.js */ \"./node_modules/swiper/core/events-emitter.js\");\n/* harmony import */ var _update_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./update/index.js */ \"./node_modules/swiper/core/update/index.js\");\n/* harmony import */ var _translate_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./translate/index.js */ \"./node_modules/swiper/core/translate/index.js\");\n/* harmony import */ var _transition_index_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./transition/index.js */ \"./node_modules/swiper/core/transition/index.js\");\n/* harmony import */ var _slide_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./slide/index.js */ \"./node_modules/swiper/core/slide/index.js\");\n/* harmony import */ var _loop_index_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./loop/index.js */ \"./node_modules/swiper/core/loop/index.js\");\n/* harmony import */ var _grab_cursor_index_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./grab-cursor/index.js */ \"./node_modules/swiper/core/grab-cursor/index.js\");\n/* harmony import */ var _events_index_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./events/index.js */ \"./node_modules/swiper/core/events/index.js\");\n/* harmony import */ var _breakpoints_index_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./breakpoints/index.js */ \"./node_modules/swiper/core/breakpoints/index.js\");\n/* harmony import */ var _classes_index_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./classes/index.js */ \"./node_modules/swiper/core/classes/index.js\");\n/* harmony import */ var _images_index_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./images/index.js */ \"./node_modules/swiper/core/images/index.js\");\n/* harmony import */ var _check_overflow_index_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./check-overflow/index.js */ \"./node_modules/swiper/core/check-overflow/index.js\");\n/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./defaults.js */ \"./node_modules/swiper/core/defaults.js\");\n/* harmony import */ var _moduleExtendParams_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./moduleExtendParams.js */ \"./node_modules/swiper/core/moduleExtendParams.js\");\n/* eslint no-param-reassign: \"off\" */\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst prototypes = {\n  eventsEmitter: _events_emitter_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n  update: _update_index_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n  translate: _translate_index_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"],\n  transition: _transition_index_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"],\n  slide: _slide_index_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"],\n  loop: _loop_index_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"],\n  grabCursor: _grab_cursor_index_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"],\n  events: _events_index_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"],\n  breakpoints: _breakpoints_index_js__WEBPACK_IMPORTED_MODULE_16__[\"default\"],\n  checkOverflow: _check_overflow_index_js__WEBPACK_IMPORTED_MODULE_19__[\"default\"],\n  classes: _classes_index_js__WEBPACK_IMPORTED_MODULE_17__[\"default\"],\n  images: _images_index_js__WEBPACK_IMPORTED_MODULE_18__[\"default\"]\n};\nconst extendedDefaults = {};\n\nclass Swiper {\n  constructor(...args) {\n    let el;\n    let params;\n\n    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {\n      params = args[0];\n    } else {\n      [el, params] = args;\n    }\n\n    if (!params) params = {};\n    params = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.extend)({}, params);\n    if (el && !params.el) params.el = el;\n\n    if (params.el && (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(params.el).length > 1) {\n      const swipers = [];\n      (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(params.el).each(containerEl => {\n        const newParams = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.extend)({}, params, {\n          el: containerEl\n        });\n        swipers.push(new Swiper(newParams));\n      }); // eslint-disable-next-line no-constructor-return\n\n      return swipers;\n    } // Swiper Instance\n\n\n    const swiper = this;\n    swiper.__swiper__ = true;\n    swiper.support = (0,_shared_get_support_js__WEBPACK_IMPORTED_MODULE_3__.getSupport)();\n    swiper.device = (0,_shared_get_device_js__WEBPACK_IMPORTED_MODULE_4__.getDevice)({\n      userAgent: params.userAgent\n    });\n    swiper.browser = (0,_shared_get_browser_js__WEBPACK_IMPORTED_MODULE_5__.getBrowser)();\n    swiper.eventsListeners = {};\n    swiper.eventsAnyListeners = [];\n    swiper.modules = [...swiper.__modules__];\n\n    if (params.modules && Array.isArray(params.modules)) {\n      swiper.modules.push(...params.modules);\n    }\n\n    const allModulesParams = {};\n    swiper.modules.forEach(mod => {\n      mod({\n        swiper,\n        extendParams: (0,_moduleExtendParams_js__WEBPACK_IMPORTED_MODULE_21__[\"default\"])(params, allModulesParams),\n        on: swiper.on.bind(swiper),\n        once: swiper.once.bind(swiper),\n        off: swiper.off.bind(swiper),\n        emit: swiper.emit.bind(swiper)\n      });\n    }); // Extend defaults with modules params\n\n    const swiperParams = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.extend)({}, _defaults_js__WEBPACK_IMPORTED_MODULE_20__[\"default\"], allModulesParams); // Extend defaults with passed params\n\n    swiper.params = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.extend)({}, swiperParams, extendedDefaults, params);\n    swiper.originalParams = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.extend)({}, swiper.params);\n    swiper.passedParams = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.extend)({}, params); // add event listeners\n\n    if (swiper.params && swiper.params.on) {\n      Object.keys(swiper.params.on).forEach(eventName => {\n        swiper.on(eventName, swiper.params.on[eventName]);\n      });\n    }\n\n    if (swiper.params && swiper.params.onAny) {\n      swiper.onAny(swiper.params.onAny);\n    } // Save Dom lib\n\n\n    swiper.$ = _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; // Extend Swiper\n\n    Object.assign(swiper, {\n      enabled: swiper.params.enabled,\n      el,\n      // Classes\n      classNames: [],\n      // Slides\n      slides: (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(),\n      slidesGrid: [],\n      snapGrid: [],\n      slidesSizesGrid: [],\n\n      // isDirection\n      isHorizontal() {\n        return swiper.params.direction === 'horizontal';\n      },\n\n      isVertical() {\n        return swiper.params.direction === 'vertical';\n      },\n\n      // Indexes\n      activeIndex: 0,\n      realIndex: 0,\n      //\n      isBeginning: true,\n      isEnd: false,\n      // Props\n      translate: 0,\n      previousTranslate: 0,\n      progress: 0,\n      velocity: 0,\n      animating: false,\n      // Locks\n      allowSlideNext: swiper.params.allowSlideNext,\n      allowSlidePrev: swiper.params.allowSlidePrev,\n      // Touch Events\n      touchEvents: function touchEvents() {\n        const touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];\n        const desktop = ['pointerdown', 'pointermove', 'pointerup'];\n        swiper.touchEventsTouch = {\n          start: touch[0],\n          move: touch[1],\n          end: touch[2],\n          cancel: touch[3]\n        };\n        swiper.touchEventsDesktop = {\n          start: desktop[0],\n          move: desktop[1],\n          end: desktop[2]\n        };\n        return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;\n      }(),\n      touchEventsData: {\n        isTouched: undefined,\n        isMoved: undefined,\n        allowTouchCallbacks: undefined,\n        touchStartTime: undefined,\n        isScrolling: undefined,\n        currentTranslate: undefined,\n        startTranslate: undefined,\n        allowThresholdMove: undefined,\n        // Form elements to match\n        focusableElements: swiper.params.focusableElements,\n        // Last click time\n        lastClickTime: (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)(),\n        clickTimeout: undefined,\n        // Velocities\n        velocities: [],\n        allowMomentumBounce: undefined,\n        isTouchEvent: undefined,\n        startMoving: undefined\n      },\n      // Clicks\n      allowClick: true,\n      // Touches\n      allowTouchMove: swiper.params.allowTouchMove,\n      touches: {\n        startX: 0,\n        startY: 0,\n        currentX: 0,\n        currentY: 0,\n        diff: 0\n      },\n      // Images\n      imagesToLoad: [],\n      imagesLoaded: 0\n    });\n    swiper.emit('_swiper'); // Init\n\n    if (swiper.params.init) {\n      swiper.init();\n    } // Return app instance\n    // eslint-disable-next-line no-constructor-return\n\n\n    return swiper;\n  }\n\n  enable() {\n    const swiper = this;\n    if (swiper.enabled) return;\n    swiper.enabled = true;\n\n    if (swiper.params.grabCursor) {\n      swiper.setGrabCursor();\n    }\n\n    swiper.emit('enable');\n  }\n\n  disable() {\n    const swiper = this;\n    if (!swiper.enabled) return;\n    swiper.enabled = false;\n\n    if (swiper.params.grabCursor) {\n      swiper.unsetGrabCursor();\n    }\n\n    swiper.emit('disable');\n  }\n\n  setProgress(progress, speed) {\n    const swiper = this;\n    progress = Math.min(Math.max(progress, 0), 1);\n    const min = swiper.minTranslate();\n    const max = swiper.maxTranslate();\n    const current = (max - min) * progress + min;\n    swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);\n    swiper.updateActiveIndex();\n    swiper.updateSlidesClasses();\n  }\n\n  emitContainerClasses() {\n    const swiper = this;\n    if (!swiper.params._emitClasses || !swiper.el) return;\n    const cls = swiper.el.className.split(' ').filter(className => {\n      return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;\n    });\n    swiper.emit('_containerClasses', cls.join(' '));\n  }\n\n  getSlideClasses(slideEl) {\n    const swiper = this;\n    if (swiper.destroyed) return '';\n    return slideEl.className.split(' ').filter(className => {\n      return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;\n    }).join(' ');\n  }\n\n  emitSlidesClasses() {\n    const swiper = this;\n    if (!swiper.params._emitClasses || !swiper.el) return;\n    const updates = [];\n    swiper.slides.each(slideEl => {\n      const classNames = swiper.getSlideClasses(slideEl);\n      updates.push({\n        slideEl,\n        classNames\n      });\n      swiper.emit('_slideClass', slideEl, classNames);\n    });\n    swiper.emit('_slideClasses', updates);\n  }\n\n  slidesPerViewDynamic(view = 'current', exact = false) {\n    const swiper = this;\n    const {\n      params,\n      slides,\n      slidesGrid,\n      slidesSizesGrid,\n      size: swiperSize,\n      activeIndex\n    } = swiper;\n    let spv = 1;\n\n    if (params.centeredSlides) {\n      let slideSize = slides[activeIndex].swiperSlideSize;\n      let breakLoop;\n\n      for (let i = activeIndex + 1; i < slides.length; i += 1) {\n        if (slides[i] && !breakLoop) {\n          slideSize += slides[i].swiperSlideSize;\n          spv += 1;\n          if (slideSize > swiperSize) breakLoop = true;\n        }\n      }\n\n      for (let i = activeIndex - 1; i >= 0; i -= 1) {\n        if (slides[i] && !breakLoop) {\n          slideSize += slides[i].swiperSlideSize;\n          spv += 1;\n          if (slideSize > swiperSize) breakLoop = true;\n        }\n      }\n    } else {\n      // eslint-disable-next-line\n      if (view === 'current') {\n        for (let i = activeIndex + 1; i < slides.length; i += 1) {\n          const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;\n\n          if (slideInView) {\n            spv += 1;\n          }\n        }\n      } else {\n        // previous\n        for (let i = activeIndex - 1; i >= 0; i -= 1) {\n          const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;\n\n          if (slideInView) {\n            spv += 1;\n          }\n        }\n      }\n    }\n\n    return spv;\n  }\n\n  update() {\n    const swiper = this;\n    if (!swiper || swiper.destroyed) return;\n    const {\n      snapGrid,\n      params\n    } = swiper; // Breakpoints\n\n    if (params.breakpoints) {\n      swiper.setBreakpoint();\n    }\n\n    swiper.updateSize();\n    swiper.updateSlides();\n    swiper.updateProgress();\n    swiper.updateSlidesClasses();\n\n    function setTranslate() {\n      const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;\n      const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());\n      swiper.setTranslate(newTranslate);\n      swiper.updateActiveIndex();\n      swiper.updateSlidesClasses();\n    }\n\n    let translated;\n\n    if (swiper.params.freeMode && swiper.params.freeMode.enabled) {\n      setTranslate();\n\n      if (swiper.params.autoHeight) {\n        swiper.updateAutoHeight();\n      }\n    } else {\n      if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {\n        translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);\n      } else {\n        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);\n      }\n\n      if (!translated) {\n        setTranslate();\n      }\n    }\n\n    if (params.watchOverflow && snapGrid !== swiper.snapGrid) {\n      swiper.checkOverflow();\n    }\n\n    swiper.emit('update');\n  }\n\n  changeDirection(newDirection, needUpdate = true) {\n    const swiper = this;\n    const currentDirection = swiper.params.direction;\n\n    if (!newDirection) {\n      // eslint-disable-next-line\n      newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';\n    }\n\n    if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {\n      return swiper;\n    }\n\n    swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);\n    swiper.emitContainerClasses();\n    swiper.params.direction = newDirection;\n    swiper.slides.each(slideEl => {\n      if (newDirection === 'vertical') {\n        slideEl.style.width = '';\n      } else {\n        slideEl.style.height = '';\n      }\n    });\n    swiper.emit('changeDirection');\n    if (needUpdate) swiper.update();\n    return swiper;\n  }\n\n  changeLanguageDirection(direction) {\n    const swiper = this;\n    if (swiper.rtl && direction === 'rtl' || !swiper.rtl && direction === 'ltr') return;\n    swiper.rtl = direction === 'rtl';\n    swiper.rtlTranslate = swiper.params.direction === 'horizontal' && swiper.rtl;\n\n    if (swiper.rtl) {\n      swiper.$el.addClass(`${swiper.params.containerModifierClass}rtl`);\n      swiper.el.dir = 'rtl';\n    } else {\n      swiper.$el.removeClass(`${swiper.params.containerModifierClass}rtl`);\n      swiper.el.dir = 'ltr';\n    }\n\n    swiper.update();\n  }\n\n  mount(el) {\n    const swiper = this;\n    if (swiper.mounted) return true; // Find el\n\n    const $el = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(el || swiper.params.el);\n    el = $el[0];\n\n    if (!el) {\n      return false;\n    }\n\n    el.swiper = swiper;\n\n    const getWrapperSelector = () => {\n      return `.${(swiper.params.wrapperClass || '').trim().split(' ').join('.')}`;\n    };\n\n    const getWrapper = () => {\n      if (el && el.shadowRoot && el.shadowRoot.querySelector) {\n        const res = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(el.shadowRoot.querySelector(getWrapperSelector())); // Children needs to return slot items\n\n        res.children = options => $el.children(options);\n\n        return res;\n      }\n\n      if (!$el.children) {\n        return (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])($el).children(getWrapperSelector());\n      }\n\n      return $el.children(getWrapperSelector());\n    }; // Find Wrapper\n\n\n    let $wrapperEl = getWrapper();\n\n    if ($wrapperEl.length === 0 && swiper.params.createElements) {\n      const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n      const wrapper = document.createElement('div');\n      $wrapperEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(wrapper);\n      wrapper.className = swiper.params.wrapperClass;\n      $el.append(wrapper);\n      $el.children(`.${swiper.params.slideClass}`).each(slideEl => {\n        $wrapperEl.append(slideEl);\n      });\n    }\n\n    Object.assign(swiper, {\n      $el,\n      el,\n      $wrapperEl,\n      wrapperEl: $wrapperEl[0],\n      mounted: true,\n      // RTL\n      rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',\n      rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),\n      wrongRTL: $wrapperEl.css('display') === '-webkit-box'\n    });\n    return true;\n  }\n\n  init(el) {\n    const swiper = this;\n    if (swiper.initialized) return swiper;\n    const mounted = swiper.mount(el);\n    if (mounted === false) return swiper;\n    swiper.emit('beforeInit'); // Set breakpoint\n\n    if (swiper.params.breakpoints) {\n      swiper.setBreakpoint();\n    } // Add Classes\n\n\n    swiper.addClasses(); // Create loop\n\n    if (swiper.params.loop) {\n      swiper.loopCreate();\n    } // Update size\n\n\n    swiper.updateSize(); // Update slides\n\n    swiper.updateSlides();\n\n    if (swiper.params.watchOverflow) {\n      swiper.checkOverflow();\n    } // Set Grab Cursor\n\n\n    if (swiper.params.grabCursor && swiper.enabled) {\n      swiper.setGrabCursor();\n    }\n\n    if (swiper.params.preloadImages) {\n      swiper.preloadImages();\n    } // Slide To Initial Slide\n\n\n    if (swiper.params.loop) {\n      swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true);\n    } else {\n      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);\n    } // Attach events\n\n\n    swiper.attachEvents(); // Init Flag\n\n    swiper.initialized = true; // Emit\n\n    swiper.emit('init');\n    swiper.emit('afterInit');\n    return swiper;\n  }\n\n  destroy(deleteInstance = true, cleanStyles = true) {\n    const swiper = this;\n    const {\n      params,\n      $el,\n      $wrapperEl,\n      slides\n    } = swiper;\n\n    if (typeof swiper.params === 'undefined' || swiper.destroyed) {\n      return null;\n    }\n\n    swiper.emit('beforeDestroy'); // Init Flag\n\n    swiper.initialized = false; // Detach events\n\n    swiper.detachEvents(); // Destroy loop\n\n    if (params.loop) {\n      swiper.loopDestroy();\n    } // Cleanup styles\n\n\n    if (cleanStyles) {\n      swiper.removeClasses();\n      $el.removeAttr('style');\n      $wrapperEl.removeAttr('style');\n\n      if (slides && slides.length) {\n        slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index');\n      }\n    }\n\n    swiper.emit('destroy'); // Detach emitter events\n\n    Object.keys(swiper.eventsListeners).forEach(eventName => {\n      swiper.off(eventName);\n    });\n\n    if (deleteInstance !== false) {\n      swiper.$el[0].swiper = null;\n      (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.deleteProps)(swiper);\n    }\n\n    swiper.destroyed = true;\n    return null;\n  }\n\n  static extendDefaults(newDefaults) {\n    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.extend)(extendedDefaults, newDefaults);\n  }\n\n  static get extendedDefaults() {\n    return extendedDefaults;\n  }\n\n  static get defaults() {\n    return _defaults_js__WEBPACK_IMPORTED_MODULE_20__[\"default\"];\n  }\n\n  static installModule(mod) {\n    if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];\n    const modules = Swiper.prototype.__modules__;\n\n    if (typeof mod === 'function' && modules.indexOf(mod) < 0) {\n      modules.push(mod);\n    }\n  }\n\n  static use(module) {\n    if (Array.isArray(module)) {\n      module.forEach(m => Swiper.installModule(m));\n      return Swiper;\n    }\n\n    Swiper.installModule(module);\n    return Swiper;\n  }\n\n}\n\nObject.keys(prototypes).forEach(prototypeGroup => {\n  Object.keys(prototypes[prototypeGroup]).forEach(protoMethod => {\n    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];\n  });\n});\nSwiper.use([_modules_resize_resize_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"], _modules_observer_observer_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]]);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Swiper);\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/core.js?");

/***/ }),

/***/ "./node_modules/swiper/core/defaults.js":
/*!**********************************************!*\
  !*** ./node_modules/swiper/core/defaults.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  init: true,\n  direction: 'horizontal',\n  touchEventsTarget: 'wrapper',\n  initialSlide: 0,\n  speed: 300,\n  cssMode: false,\n  updateOnWindowResize: true,\n  resizeObserver: true,\n  nested: false,\n  createElements: false,\n  enabled: true,\n  focusableElements: 'input, select, option, textarea, button, video, label',\n  // Overrides\n  width: null,\n  height: null,\n  //\n  preventInteractionOnTransition: false,\n  // ssr\n  userAgent: null,\n  url: null,\n  // To support iOS's swipe-to-go-back gesture (when being used in-app).\n  edgeSwipeDetection: false,\n  edgeSwipeThreshold: 20,\n  // Autoheight\n  autoHeight: false,\n  // Set wrapper width\n  setWrapperSize: false,\n  // Virtual Translate\n  virtualTranslate: false,\n  // Effects\n  effect: 'slide',\n  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'\n  // Breakpoints\n  breakpoints: undefined,\n  breakpointsBase: 'window',\n  // Slides grid\n  spaceBetween: 0,\n  slidesPerView: 1,\n  slidesPerGroup: 1,\n  slidesPerGroupSkip: 0,\n  slidesPerGroupAuto: false,\n  centeredSlides: false,\n  centeredSlidesBounds: false,\n  slidesOffsetBefore: 0,\n  // in px\n  slidesOffsetAfter: 0,\n  // in px\n  normalizeSlideIndex: true,\n  centerInsufficientSlides: false,\n  // Disable swiper and hide navigation when container not overflow\n  watchOverflow: true,\n  // Round length\n  roundLengths: false,\n  // Touches\n  touchRatio: 1,\n  touchAngle: 45,\n  simulateTouch: true,\n  shortSwipes: true,\n  longSwipes: true,\n  longSwipesRatio: 0.5,\n  longSwipesMs: 300,\n  followFinger: true,\n  allowTouchMove: true,\n  threshold: 0,\n  touchMoveStopPropagation: false,\n  touchStartPreventDefault: true,\n  touchStartForcePreventDefault: false,\n  touchReleaseOnEdges: false,\n  // Unique Navigation Elements\n  uniqueNavElements: true,\n  // Resistance\n  resistance: true,\n  resistanceRatio: 0.85,\n  // Progress\n  watchSlidesProgress: false,\n  // Cursor\n  grabCursor: false,\n  // Clicks\n  preventClicks: true,\n  preventClicksPropagation: true,\n  slideToClickedSlide: false,\n  // Images\n  preloadImages: true,\n  updateOnImagesReady: true,\n  // loop\n  loop: false,\n  loopAdditionalSlides: 0,\n  loopedSlides: null,\n  loopedSlidesLimit: true,\n  loopFillGroupWithBlank: false,\n  loopPreventsSlide: true,\n  // rewind\n  rewind: false,\n  // Swiping/no swiping\n  allowSlidePrev: true,\n  allowSlideNext: true,\n  swipeHandler: null,\n  // '.swipe-handler',\n  noSwiping: true,\n  noSwipingClass: 'swiper-no-swiping',\n  noSwipingSelector: null,\n  // Passive Listeners\n  passiveListeners: true,\n  maxBackfaceHiddenSlides: 10,\n  // NS\n  containerModifierClass: 'swiper-',\n  // NEW\n  slideClass: 'swiper-slide',\n  slideBlankClass: 'swiper-slide-invisible-blank',\n  slideActiveClass: 'swiper-slide-active',\n  slideDuplicateActiveClass: 'swiper-slide-duplicate-active',\n  slideVisibleClass: 'swiper-slide-visible',\n  slideDuplicateClass: 'swiper-slide-duplicate',\n  slideNextClass: 'swiper-slide-next',\n  slideDuplicateNextClass: 'swiper-slide-duplicate-next',\n  slidePrevClass: 'swiper-slide-prev',\n  slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',\n  wrapperClass: 'swiper-wrapper',\n  // Callbacks\n  runCallbacksOnInit: true,\n  // Internals\n  _emitClasses: false\n});\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/defaults.js?");

/***/ }),

/***/ "./node_modules/swiper/core/events-emitter.js":
/*!****************************************************!*\
  !*** ./node_modules/swiper/core/events-emitter.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable no-underscore-dangle */\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  on(events, handler, priority) {\n    const self = this;\n    if (!self.eventsListeners || self.destroyed) return self;\n    if (typeof handler !== 'function') return self;\n    const method = priority ? 'unshift' : 'push';\n    events.split(' ').forEach(event => {\n      if (!self.eventsListeners[event]) self.eventsListeners[event] = [];\n      self.eventsListeners[event][method](handler);\n    });\n    return self;\n  },\n\n  once(events, handler, priority) {\n    const self = this;\n    if (!self.eventsListeners || self.destroyed) return self;\n    if (typeof handler !== 'function') return self;\n\n    function onceHandler(...args) {\n      self.off(events, onceHandler);\n\n      if (onceHandler.__emitterProxy) {\n        delete onceHandler.__emitterProxy;\n      }\n\n      handler.apply(self, args);\n    }\n\n    onceHandler.__emitterProxy = handler;\n    return self.on(events, onceHandler, priority);\n  },\n\n  onAny(handler, priority) {\n    const self = this;\n    if (!self.eventsListeners || self.destroyed) return self;\n    if (typeof handler !== 'function') return self;\n    const method = priority ? 'unshift' : 'push';\n\n    if (self.eventsAnyListeners.indexOf(handler) < 0) {\n      self.eventsAnyListeners[method](handler);\n    }\n\n    return self;\n  },\n\n  offAny(handler) {\n    const self = this;\n    if (!self.eventsListeners || self.destroyed) return self;\n    if (!self.eventsAnyListeners) return self;\n    const index = self.eventsAnyListeners.indexOf(handler);\n\n    if (index >= 0) {\n      self.eventsAnyListeners.splice(index, 1);\n    }\n\n    return self;\n  },\n\n  off(events, handler) {\n    const self = this;\n    if (!self.eventsListeners || self.destroyed) return self;\n    if (!self.eventsListeners) return self;\n    events.split(' ').forEach(event => {\n      if (typeof handler === 'undefined') {\n        self.eventsListeners[event] = [];\n      } else if (self.eventsListeners[event]) {\n        self.eventsListeners[event].forEach((eventHandler, index) => {\n          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {\n            self.eventsListeners[event].splice(index, 1);\n          }\n        });\n      }\n    });\n    return self;\n  },\n\n  emit(...args) {\n    const self = this;\n    if (!self.eventsListeners || self.destroyed) return self;\n    if (!self.eventsListeners) return self;\n    let events;\n    let data;\n    let context;\n\n    if (typeof args[0] === 'string' || Array.isArray(args[0])) {\n      events = args[0];\n      data = args.slice(1, args.length);\n      context = self;\n    } else {\n      events = args[0].events;\n      data = args[0].data;\n      context = args[0].context || self;\n    }\n\n    data.unshift(context);\n    const eventsArray = Array.isArray(events) ? events : events.split(' ');\n    eventsArray.forEach(event => {\n      if (self.eventsAnyListeners && self.eventsAnyListeners.length) {\n        self.eventsAnyListeners.forEach(eventHandler => {\n          eventHandler.apply(context, [event, ...data]);\n        });\n      }\n\n      if (self.eventsListeners && self.eventsListeners[event]) {\n        self.eventsListeners[event].forEach(eventHandler => {\n          eventHandler.apply(context, data);\n        });\n      }\n    });\n    return self;\n  }\n\n});\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/events-emitter.js?");

/***/ }),

/***/ "./node_modules/swiper/core/events/index.js":
/*!**************************************************!*\
  !*** ./node_modules/swiper/core/events/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n/* harmony import */ var _onTouchStart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./onTouchStart.js */ \"./node_modules/swiper/core/events/onTouchStart.js\");\n/* harmony import */ var _onTouchMove_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./onTouchMove.js */ \"./node_modules/swiper/core/events/onTouchMove.js\");\n/* harmony import */ var _onTouchEnd_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./onTouchEnd.js */ \"./node_modules/swiper/core/events/onTouchEnd.js\");\n/* harmony import */ var _onResize_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./onResize.js */ \"./node_modules/swiper/core/events/onResize.js\");\n/* harmony import */ var _onClick_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./onClick.js */ \"./node_modules/swiper/core/events/onClick.js\");\n/* harmony import */ var _onScroll_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./onScroll.js */ \"./node_modules/swiper/core/events/onScroll.js\");\n\n\n\n\n\n\n\nlet dummyEventAttached = false;\n\nfunction dummyEventListener() {}\n\nconst events = (swiper, method) => {\n  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n  const {\n    params,\n    touchEvents,\n    el,\n    wrapperEl,\n    device,\n    support\n  } = swiper;\n  const capture = !!params.nested;\n  const domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';\n  const swiperMethod = method; // Touch Events\n\n  if (!support.touch) {\n    el[domMethod](touchEvents.start, swiper.onTouchStart, false);\n    document[domMethod](touchEvents.move, swiper.onTouchMove, capture);\n    document[domMethod](touchEvents.end, swiper.onTouchEnd, false);\n  } else {\n    const passiveListener = touchEvents.start === 'touchstart' && support.passiveListener && params.passiveListeners ? {\n      passive: true,\n      capture: false\n    } : false;\n    el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);\n    el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {\n      passive: false,\n      capture\n    } : capture);\n    el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);\n\n    if (touchEvents.cancel) {\n      el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);\n    }\n  } // Prevent Links Clicks\n\n\n  if (params.preventClicks || params.preventClicksPropagation) {\n    el[domMethod]('click', swiper.onClick, true);\n  }\n\n  if (params.cssMode) {\n    wrapperEl[domMethod]('scroll', swiper.onScroll);\n  } // Resize handler\n\n\n  if (params.updateOnWindowResize) {\n    swiper[swiperMethod](device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', _onResize_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"], true);\n  } else {\n    swiper[swiperMethod]('observerUpdate', _onResize_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"], true);\n  }\n};\n\nfunction attachEvents() {\n  const swiper = this;\n  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n  const {\n    params,\n    support\n  } = swiper;\n  swiper.onTouchStart = _onTouchStart_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].bind(swiper);\n  swiper.onTouchMove = _onTouchMove_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].bind(swiper);\n  swiper.onTouchEnd = _onTouchEnd_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].bind(swiper);\n\n  if (params.cssMode) {\n    swiper.onScroll = _onScroll_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"].bind(swiper);\n  }\n\n  swiper.onClick = _onClick_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].bind(swiper);\n\n  if (support.touch && !dummyEventAttached) {\n    document.addEventListener('touchstart', dummyEventListener);\n    dummyEventAttached = true;\n  }\n\n  events(swiper, 'on');\n}\n\nfunction detachEvents() {\n  const swiper = this;\n  events(swiper, 'off');\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  attachEvents,\n  detachEvents\n});\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/events/index.js?");

/***/ }),

/***/ "./node_modules/swiper/core/events/onClick.js":
/*!****************************************************!*\
  !*** ./node_modules/swiper/core/events/onClick.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ onClick)\n/* harmony export */ });\nfunction onClick(e) {\n  const swiper = this;\n  if (!swiper.enabled) return;\n\n  if (!swiper.allowClick) {\n    if (swiper.params.preventClicks) e.preventDefault();\n\n    if (swiper.params.preventClicksPropagation && swiper.animating) {\n      e.stopPropagation();\n      e.stopImmediatePropagation();\n    }\n  }\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/events/onClick.js?");

/***/ }),

/***/ "./node_modules/swiper/core/events/onResize.js":
/*!*****************************************************!*\
  !*** ./node_modules/swiper/core/events/onResize.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ onResize)\n/* harmony export */ });\nfunction onResize() {\n  const swiper = this;\n  const {\n    params,\n    el\n  } = swiper;\n  if (el && el.offsetWidth === 0) return; // Breakpoints\n\n  if (params.breakpoints) {\n    swiper.setBreakpoint();\n  } // Save locks\n\n\n  const {\n    allowSlideNext,\n    allowSlidePrev,\n    snapGrid\n  } = swiper; // Disable locks on resize\n\n  swiper.allowSlideNext = true;\n  swiper.allowSlidePrev = true;\n  swiper.updateSize();\n  swiper.updateSlides();\n  swiper.updateSlidesClasses();\n\n  if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) {\n    swiper.slideTo(swiper.slides.length - 1, 0, false, true);\n  } else {\n    swiper.slideTo(swiper.activeIndex, 0, false, true);\n  }\n\n  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {\n    swiper.autoplay.run();\n  } // Return locks after resize\n\n\n  swiper.allowSlidePrev = allowSlidePrev;\n  swiper.allowSlideNext = allowSlideNext;\n\n  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {\n    swiper.checkOverflow();\n  }\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/events/onResize.js?");

/***/ }),

/***/ "./node_modules/swiper/core/events/onScroll.js":
/*!*****************************************************!*\
  !*** ./node_modules/swiper/core/events/onScroll.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ onScroll)\n/* harmony export */ });\nfunction onScroll() {\n  const swiper = this;\n  const {\n    wrapperEl,\n    rtlTranslate,\n    enabled\n  } = swiper;\n  if (!enabled) return;\n  swiper.previousTranslate = swiper.translate;\n\n  if (swiper.isHorizontal()) {\n    swiper.translate = -wrapperEl.scrollLeft;\n  } else {\n    swiper.translate = -wrapperEl.scrollTop;\n  } // eslint-disable-next-line\n\n\n  if (swiper.translate === 0) swiper.translate = 0;\n  swiper.updateActiveIndex();\n  swiper.updateSlidesClasses();\n  let newProgress;\n  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();\n\n  if (translatesDiff === 0) {\n    newProgress = 0;\n  } else {\n    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;\n  }\n\n  if (newProgress !== swiper.progress) {\n    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);\n  }\n\n  swiper.emit('setTranslate', swiper.translate, false);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/events/onScroll.js?");

/***/ }),

/***/ "./node_modules/swiper/core/events/onTouchEnd.js":
/*!*******************************************************!*\
  !*** ./node_modules/swiper/core/events/onTouchEnd.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ onTouchEnd)\n/* harmony export */ });\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n\nfunction onTouchEnd(event) {\n  const swiper = this;\n  const data = swiper.touchEventsData;\n  const {\n    params,\n    touches,\n    rtlTranslate: rtl,\n    slidesGrid,\n    enabled\n  } = swiper;\n  if (!enabled) return;\n  let e = event;\n  if (e.originalEvent) e = e.originalEvent;\n\n  if (data.allowTouchCallbacks) {\n    swiper.emit('touchEnd', e);\n  }\n\n  data.allowTouchCallbacks = false;\n\n  if (!data.isTouched) {\n    if (data.isMoved && params.grabCursor) {\n      swiper.setGrabCursor(false);\n    }\n\n    data.isMoved = false;\n    data.startMoving = false;\n    return;\n  } // Return Grab Cursor\n\n\n  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {\n    swiper.setGrabCursor(false);\n  } // Time diff\n\n\n  const touchEndTime = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.now)();\n  const timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click\n\n  if (swiper.allowClick) {\n    const pathTree = e.path || e.composedPath && e.composedPath();\n    swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);\n    swiper.emit('tap click', e);\n\n    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {\n      swiper.emit('doubleTap doubleClick', e);\n    }\n  }\n\n  data.lastClickTime = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.now)();\n  (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {\n    if (!swiper.destroyed) swiper.allowClick = true;\n  });\n\n  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {\n    data.isTouched = false;\n    data.isMoved = false;\n    data.startMoving = false;\n    return;\n  }\n\n  data.isTouched = false;\n  data.isMoved = false;\n  data.startMoving = false;\n  let currentPos;\n\n  if (params.followFinger) {\n    currentPos = rtl ? swiper.translate : -swiper.translate;\n  } else {\n    currentPos = -data.currentTranslate;\n  }\n\n  if (params.cssMode) {\n    return;\n  }\n\n  if (swiper.params.freeMode && params.freeMode.enabled) {\n    swiper.freeMode.onTouchEnd({\n      currentPos\n    });\n    return;\n  } // Find current slide\n\n\n  let stopIndex = 0;\n  let groupSize = swiper.slidesSizesGrid[0];\n\n  for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {\n    const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;\n\n    if (typeof slidesGrid[i + increment] !== 'undefined') {\n      if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {\n        stopIndex = i;\n        groupSize = slidesGrid[i + increment] - slidesGrid[i];\n      }\n    } else if (currentPos >= slidesGrid[i]) {\n      stopIndex = i;\n      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];\n    }\n  }\n\n  let rewindFirstIndex = null;\n  let rewindLastIndex = null;\n\n  if (params.rewind) {\n    if (swiper.isBeginning) {\n      rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;\n    } else if (swiper.isEnd) {\n      rewindFirstIndex = 0;\n    }\n  } // Find current slide size\n\n\n  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;\n  const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;\n\n  if (timeDiff > params.longSwipesMs) {\n    // Long touches\n    if (!params.longSwipes) {\n      swiper.slideTo(swiper.activeIndex);\n      return;\n    }\n\n    if (swiper.swipeDirection === 'next') {\n      if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);else swiper.slideTo(stopIndex);\n    }\n\n    if (swiper.swipeDirection === 'prev') {\n      if (ratio > 1 - params.longSwipesRatio) {\n        swiper.slideTo(stopIndex + increment);\n      } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {\n        swiper.slideTo(rewindLastIndex);\n      } else {\n        swiper.slideTo(stopIndex);\n      }\n    }\n  } else {\n    // Short swipes\n    if (!params.shortSwipes) {\n      swiper.slideTo(swiper.activeIndex);\n      return;\n    }\n\n    const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);\n\n    if (!isNavButtonTarget) {\n      if (swiper.swipeDirection === 'next') {\n        swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);\n      }\n\n      if (swiper.swipeDirection === 'prev') {\n        swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);\n      }\n    } else if (e.target === swiper.navigation.nextEl) {\n      swiper.slideTo(stopIndex + increment);\n    } else {\n      swiper.slideTo(stopIndex);\n    }\n  }\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/events/onTouchEnd.js?");

/***/ }),

/***/ "./node_modules/swiper/core/events/onTouchMove.js":
/*!********************************************************!*\
  !*** ./node_modules/swiper/core/events/onTouchMove.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ onTouchMove)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n\n\n\nfunction onTouchMove(event) {\n  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n  const swiper = this;\n  const data = swiper.touchEventsData;\n  const {\n    params,\n    touches,\n    rtlTranslate: rtl,\n    enabled\n  } = swiper;\n  if (!enabled) return;\n  let e = event;\n  if (e.originalEvent) e = e.originalEvent;\n\n  if (!data.isTouched) {\n    if (data.startMoving && data.isScrolling) {\n      swiper.emit('touchMoveOpposite', e);\n    }\n\n    return;\n  }\n\n  if (data.isTouchEvent && e.type !== 'touchmove') return;\n  const targetTouch = e.type === 'touchmove' && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);\n  const pageX = e.type === 'touchmove' ? targetTouch.pageX : e.pageX;\n  const pageY = e.type === 'touchmove' ? targetTouch.pageY : e.pageY;\n\n  if (e.preventedByNestedSwiper) {\n    touches.startX = pageX;\n    touches.startY = pageY;\n    return;\n  }\n\n  if (!swiper.allowTouchMove) {\n    if (!(0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(e.target).is(data.focusableElements)) {\n      swiper.allowClick = false;\n    }\n\n    if (data.isTouched) {\n      Object.assign(touches, {\n        startX: pageX,\n        startY: pageY,\n        currentX: pageX,\n        currentY: pageY\n      });\n      data.touchStartTime = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)();\n    }\n\n    return;\n  }\n\n  if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {\n    if (swiper.isVertical()) {\n      // Vertical\n      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {\n        data.isTouched = false;\n        data.isMoved = false;\n        return;\n      }\n    } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {\n      return;\n    }\n  }\n\n  if (data.isTouchEvent && document.activeElement) {\n    if (e.target === document.activeElement && (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(e.target).is(data.focusableElements)) {\n      data.isMoved = true;\n      swiper.allowClick = false;\n      return;\n    }\n  }\n\n  if (data.allowTouchCallbacks) {\n    swiper.emit('touchMove', e);\n  }\n\n  if (e.targetTouches && e.targetTouches.length > 1) return;\n  touches.currentX = pageX;\n  touches.currentY = pageY;\n  const diffX = touches.currentX - touches.startX;\n  const diffY = touches.currentY - touches.startY;\n  if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;\n\n  if (typeof data.isScrolling === 'undefined') {\n    let touchAngle;\n\n    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {\n      data.isScrolling = false;\n    } else {\n      // eslint-disable-next-line\n      if (diffX * diffX + diffY * diffY >= 25) {\n        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;\n        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;\n      }\n    }\n  }\n\n  if (data.isScrolling) {\n    swiper.emit('touchMoveOpposite', e);\n  }\n\n  if (typeof data.startMoving === 'undefined') {\n    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {\n      data.startMoving = true;\n    }\n  }\n\n  if (data.isScrolling) {\n    data.isTouched = false;\n    return;\n  }\n\n  if (!data.startMoving) {\n    return;\n  }\n\n  swiper.allowClick = false;\n\n  if (!params.cssMode && e.cancelable) {\n    e.preventDefault();\n  }\n\n  if (params.touchMoveStopPropagation && !params.nested) {\n    e.stopPropagation();\n  }\n\n  if (!data.isMoved) {\n    if (params.loop && !params.cssMode) {\n      swiper.loopFix();\n    }\n\n    data.startTranslate = swiper.getTranslate();\n    swiper.setTransition(0);\n\n    if (swiper.animating) {\n      swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');\n    }\n\n    data.allowMomentumBounce = false; // Grab Cursor\n\n    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {\n      swiper.setGrabCursor(true);\n    }\n\n    swiper.emit('sliderFirstMove', e);\n  }\n\n  swiper.emit('sliderMove', e);\n  data.isMoved = true;\n  let diff = swiper.isHorizontal() ? diffX : diffY;\n  touches.diff = diff;\n  diff *= params.touchRatio;\n  if (rtl) diff = -diff;\n  swiper.swipeDirection = diff > 0 ? 'prev' : 'next';\n  data.currentTranslate = diff + data.startTranslate;\n  let disableParentSwiper = true;\n  let resistanceRatio = params.resistanceRatio;\n\n  if (params.touchReleaseOnEdges) {\n    resistanceRatio = 0;\n  }\n\n  if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {\n    disableParentSwiper = false;\n    if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;\n  } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {\n    disableParentSwiper = false;\n    if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;\n  }\n\n  if (disableParentSwiper) {\n    e.preventedByNestedSwiper = true;\n  } // Directions locks\n\n\n  if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {\n    data.currentTranslate = data.startTranslate;\n  }\n\n  if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {\n    data.currentTranslate = data.startTranslate;\n  }\n\n  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {\n    data.currentTranslate = data.startTranslate;\n  } // Threshold\n\n\n  if (params.threshold > 0) {\n    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {\n      if (!data.allowThresholdMove) {\n        data.allowThresholdMove = true;\n        touches.startX = touches.currentX;\n        touches.startY = touches.currentY;\n        data.currentTranslate = data.startTranslate;\n        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;\n        return;\n      }\n    } else {\n      data.currentTranslate = data.startTranslate;\n      return;\n    }\n  }\n\n  if (!params.followFinger || params.cssMode) return; // Update active index in free mode\n\n  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {\n    swiper.updateActiveIndex();\n    swiper.updateSlidesClasses();\n  }\n\n  if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {\n    swiper.freeMode.onTouchMove();\n  } // Update progress\n\n\n  swiper.updateProgress(data.currentTranslate); // Update translate\n\n  swiper.setTranslate(data.currentTranslate);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/events/onTouchMove.js?");

/***/ }),

/***/ "./node_modules/swiper/core/events/onTouchStart.js":
/*!*********************************************************!*\
  !*** ./node_modules/swiper/core/events/onTouchStart.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ onTouchStart)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n\n\n // Modified from https://stackoverflow.com/questions/54520554/custom-element-getrootnode-closest-function-crossing-multiple-parent-shadowd\n\nfunction closestElement(selector, base = this) {\n  function __closestFrom(el) {\n    if (!el || el === (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)() || el === (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)()) return null;\n    if (el.assignedSlot) el = el.assignedSlot;\n    const found = el.closest(selector);\n\n    if (!found && !el.getRootNode) {\n      return null;\n    }\n\n    return found || __closestFrom(el.getRootNode().host);\n  }\n\n  return __closestFrom(base);\n}\n\nfunction onTouchStart(event) {\n  const swiper = this;\n  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  const data = swiper.touchEventsData;\n  const {\n    params,\n    touches,\n    enabled\n  } = swiper;\n  if (!enabled) return;\n\n  if (swiper.animating && params.preventInteractionOnTransition) {\n    return;\n  }\n\n  if (!swiper.animating && params.cssMode && params.loop) {\n    swiper.loopFix();\n  }\n\n  let e = event;\n  if (e.originalEvent) e = e.originalEvent;\n  let $targetEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(e.target);\n\n  if (params.touchEventsTarget === 'wrapper') {\n    if (!$targetEl.closest(swiper.wrapperEl).length) return;\n  }\n\n  data.isTouchEvent = e.type === 'touchstart';\n  if (!data.isTouchEvent && 'which' in e && e.which === 3) return;\n  if (!data.isTouchEvent && 'button' in e && e.button > 0) return;\n  if (data.isTouched && data.isMoved) return; // change target el for shadow root component\n\n  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== ''; // eslint-disable-next-line\n\n  const eventPath = event.composedPath ? event.composedPath() : event.path;\n\n  if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {\n    $targetEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(eventPath[0]);\n  }\n\n  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;\n  const isTargetShadow = !!(e.target && e.target.shadowRoot); // use closestElement for shadow root element to get the actual closest for nested shadow root element\n\n  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {\n    swiper.allowClick = true;\n    return;\n  }\n\n  if (params.swipeHandler) {\n    if (!$targetEl.closest(params.swipeHandler)[0]) return;\n  }\n\n  touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;\n  touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;\n  const startX = touches.currentX;\n  const startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore\n\n  const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;\n  const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;\n\n  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {\n    if (edgeSwipeDetection === 'prevent') {\n      event.preventDefault();\n    } else {\n      return;\n    }\n  }\n\n  Object.assign(data, {\n    isTouched: true,\n    isMoved: false,\n    allowTouchCallbacks: true,\n    isScrolling: undefined,\n    startMoving: undefined\n  });\n  touches.startX = startX;\n  touches.startY = startY;\n  data.touchStartTime = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)();\n  swiper.allowClick = true;\n  swiper.updateSize();\n  swiper.swipeDirection = undefined;\n  if (params.threshold > 0) data.allowThresholdMove = false;\n\n  if (e.type !== 'touchstart') {\n    let preventDefault = true;\n\n    if ($targetEl.is(data.focusableElements)) {\n      preventDefault = false;\n\n      if ($targetEl[0].nodeName === 'SELECT') {\n        data.isTouched = false;\n      }\n    }\n\n    if (document.activeElement && (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) {\n      document.activeElement.blur();\n    }\n\n    const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;\n\n    if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) {\n      e.preventDefault();\n    }\n  }\n\n  if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {\n    swiper.freeMode.onTouchStart();\n  }\n\n  swiper.emit('touchStart', e);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/events/onTouchStart.js?");

/***/ }),

/***/ "./node_modules/swiper/core/grab-cursor/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/swiper/core/grab-cursor/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _setGrabCursor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setGrabCursor.js */ \"./node_modules/swiper/core/grab-cursor/setGrabCursor.js\");\n/* harmony import */ var _unsetGrabCursor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unsetGrabCursor.js */ \"./node_modules/swiper/core/grab-cursor/unsetGrabCursor.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  setGrabCursor: _setGrabCursor_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  unsetGrabCursor: _unsetGrabCursor_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n});\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/grab-cursor/index.js?");

/***/ }),

/***/ "./node_modules/swiper/core/grab-cursor/setGrabCursor.js":
/*!***************************************************************!*\
  !*** ./node_modules/swiper/core/grab-cursor/setGrabCursor.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ setGrabCursor)\n/* harmony export */ });\nfunction setGrabCursor(moving) {\n  const swiper = this;\n  if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;\n  const el = swiper.params.touchEventsTarget === 'container' ? swiper.el : swiper.wrapperEl;\n  el.style.cursor = 'move';\n  el.style.cursor = moving ? 'grabbing' : 'grab';\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/grab-cursor/setGrabCursor.js?");

/***/ }),

/***/ "./node_modules/swiper/core/grab-cursor/unsetGrabCursor.js":
/*!*****************************************************************!*\
  !*** ./node_modules/swiper/core/grab-cursor/unsetGrabCursor.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ unsetGrabCursor)\n/* harmony export */ });\nfunction unsetGrabCursor() {\n  const swiper = this;\n\n  if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {\n    return;\n  }\n\n  swiper[swiper.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/grab-cursor/unsetGrabCursor.js?");

/***/ }),

/***/ "./node_modules/swiper/core/images/index.js":
/*!**************************************************!*\
  !*** ./node_modules/swiper/core/images/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _loadImage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loadImage.js */ \"./node_modules/swiper/core/images/loadImage.js\");\n/* harmony import */ var _preloadImages_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./preloadImages.js */ \"./node_modules/swiper/core/images/preloadImages.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  loadImage: _loadImage_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  preloadImages: _preloadImages_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n});\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/images/index.js?");

/***/ }),

/***/ "./node_modules/swiper/core/images/loadImage.js":
/*!******************************************************!*\
  !*** ./node_modules/swiper/core/images/loadImage.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ loadImage)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n\n\nfunction loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  let image;\n\n  function onReady() {\n    if (callback) callback();\n  }\n\n  const isPicture = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(imageEl).parent('picture')[0];\n\n  if (!isPicture && (!imageEl.complete || !checkForComplete)) {\n    if (src) {\n      image = new window.Image();\n      image.onload = onReady;\n      image.onerror = onReady;\n\n      if (sizes) {\n        image.sizes = sizes;\n      }\n\n      if (srcset) {\n        image.srcset = srcset;\n      }\n\n      if (src) {\n        image.src = src;\n      }\n    } else {\n      onReady();\n    }\n  } else {\n    // image already loaded...\n    onReady();\n  }\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/images/loadImage.js?");

/***/ }),

/***/ "./node_modules/swiper/core/images/preloadImages.js":
/*!**********************************************************!*\
  !*** ./node_modules/swiper/core/images/preloadImages.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ preloadImages)\n/* harmony export */ });\nfunction preloadImages() {\n  const swiper = this;\n  swiper.imagesToLoad = swiper.$el.find('img');\n\n  function onReady() {\n    if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) return;\n    if (swiper.imagesLoaded !== undefined) swiper.imagesLoaded += 1;\n\n    if (swiper.imagesLoaded === swiper.imagesToLoad.length) {\n      if (swiper.params.updateOnImagesReady) swiper.update();\n      swiper.emit('imagesReady');\n    }\n  }\n\n  for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {\n    const imageEl = swiper.imagesToLoad[i];\n    swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute('src'), imageEl.srcset || imageEl.getAttribute('srcset'), imageEl.sizes || imageEl.getAttribute('sizes'), true, onReady);\n  }\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/images/preloadImages.js?");

/***/ }),

/***/ "./node_modules/swiper/core/loop/index.js":
/*!************************************************!*\
  !*** ./node_modules/swiper/core/loop/index.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _loopCreate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loopCreate.js */ \"./node_modules/swiper/core/loop/loopCreate.js\");\n/* harmony import */ var _loopFix_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loopFix.js */ \"./node_modules/swiper/core/loop/loopFix.js\");\n/* harmony import */ var _loopDestroy_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loopDestroy.js */ \"./node_modules/swiper/core/loop/loopDestroy.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  loopCreate: _loopCreate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  loopFix: _loopFix_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  loopDestroy: _loopDestroy_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n});\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/loop/index.js?");

/***/ }),

/***/ "./node_modules/swiper/core/loop/loopCreate.js":
/*!*****************************************************!*\
  !*** ./node_modules/swiper/core/loop/loopCreate.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ loopCreate)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n\n\nfunction loopCreate() {\n  const swiper = this;\n  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n  const {\n    params,\n    $wrapperEl\n  } = swiper; // Remove duplicated slides\n\n  const $selector = $wrapperEl.children().length > 0 ? (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])($wrapperEl.children()[0].parentNode) : $wrapperEl;\n  $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();\n  let slides = $selector.children(`.${params.slideClass}`);\n\n  if (params.loopFillGroupWithBlank) {\n    const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;\n\n    if (blankSlidesNum !== params.slidesPerGroup) {\n      for (let i = 0; i < blankSlidesNum; i += 1) {\n        const blankNode = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(document.createElement('div')).addClass(`${params.slideClass} ${params.slideBlankClass}`);\n        $selector.append(blankNode);\n      }\n\n      slides = $selector.children(`.${params.slideClass}`);\n    }\n  }\n\n  if (params.slidesPerView === 'auto' && !params.loopedSlides) params.loopedSlides = slides.length;\n  swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));\n  swiper.loopedSlides += params.loopAdditionalSlides;\n\n  if (swiper.loopedSlides > slides.length && swiper.params.loopedSlidesLimit) {\n    swiper.loopedSlides = slides.length;\n  }\n\n  const prependSlides = [];\n  const appendSlides = [];\n  slides.each((el, index) => {\n    const slide = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(el);\n    slide.attr('data-swiper-slide-index', index);\n  });\n\n  for (let i = 0; i < swiper.loopedSlides; i += 1) {\n    const index = i - Math.floor(i / slides.length) * slides.length;\n    appendSlides.push(slides.eq(index)[0]);\n    prependSlides.unshift(slides.eq(slides.length - index - 1)[0]);\n  }\n\n  for (let i = 0; i < appendSlides.length; i += 1) {\n    $selector.append((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));\n  }\n\n  for (let i = prependSlides.length - 1; i >= 0; i -= 1) {\n    $selector.prepend((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));\n  }\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/loop/loopCreate.js?");

/***/ }),

/***/ "./node_modules/swiper/core/loop/loopDestroy.js":
/*!******************************************************!*\
  !*** ./node_modules/swiper/core/loop/loopDestroy.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ loopDestroy)\n/* harmony export */ });\nfunction loopDestroy() {\n  const swiper = this;\n  const {\n    $wrapperEl,\n    params,\n    slides\n  } = swiper;\n  $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();\n  slides.removeAttr('data-swiper-slide-index');\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/loop/loopDestroy.js?");

/***/ }),

/***/ "./node_modules/swiper/core/loop/loopFix.js":
/*!**************************************************!*\
  !*** ./node_modules/swiper/core/loop/loopFix.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ loopFix)\n/* harmony export */ });\nfunction loopFix() {\n  const swiper = this;\n  swiper.emit('beforeLoopFix');\n  const {\n    activeIndex,\n    slides,\n    loopedSlides,\n    allowSlidePrev,\n    allowSlideNext,\n    snapGrid,\n    rtlTranslate: rtl\n  } = swiper;\n  let newIndex;\n  swiper.allowSlidePrev = true;\n  swiper.allowSlideNext = true;\n  const snapTranslate = -snapGrid[activeIndex];\n  const diff = snapTranslate - swiper.getTranslate(); // Fix For Negative Oversliding\n\n  if (activeIndex < loopedSlides) {\n    newIndex = slides.length - loopedSlides * 3 + activeIndex;\n    newIndex += loopedSlides;\n    const slideChanged = swiper.slideTo(newIndex, 0, false, true);\n\n    if (slideChanged && diff !== 0) {\n      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);\n    }\n  } else if (activeIndex >= slides.length - loopedSlides) {\n    // Fix For Positive Oversliding\n    newIndex = -slides.length + activeIndex + loopedSlides;\n    newIndex += loopedSlides;\n    const slideChanged = swiper.slideTo(newIndex, 0, false, true);\n\n    if (slideChanged && diff !== 0) {\n      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);\n    }\n  }\n\n  swiper.allowSlidePrev = allowSlidePrev;\n  swiper.allowSlideNext = allowSlideNext;\n  swiper.emit('loopFix');\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/loop/loopFix.js?");

/***/ }),

/***/ "./node_modules/swiper/core/moduleExtendParams.js":
/*!********************************************************!*\
  !*** ./node_modules/swiper/core/moduleExtendParams.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ moduleExtendParams)\n/* harmony export */ });\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n\nfunction moduleExtendParams(params, allModulesParams) {\n  return function extendParams(obj = {}) {\n    const moduleParamName = Object.keys(obj)[0];\n    const moduleParams = obj[moduleParamName];\n\n    if (typeof moduleParams !== 'object' || moduleParams === null) {\n      (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.extend)(allModulesParams, obj);\n      return;\n    }\n\n    if (['navigation', 'pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {\n      params[moduleParamName] = {\n        auto: true\n      };\n    }\n\n    if (!(moduleParamName in params && 'enabled' in moduleParams)) {\n      (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.extend)(allModulesParams, obj);\n      return;\n    }\n\n    if (params[moduleParamName] === true) {\n      params[moduleParamName] = {\n        enabled: true\n      };\n    }\n\n    if (typeof params[moduleParamName] === 'object' && !('enabled' in params[moduleParamName])) {\n      params[moduleParamName].enabled = true;\n    }\n\n    if (!params[moduleParamName]) params[moduleParamName] = {\n      enabled: false\n    };\n    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.extend)(allModulesParams, obj);\n  };\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/moduleExtendParams.js?");

/***/ }),

/***/ "./node_modules/swiper/core/modules/observer/observer.js":
/*!***************************************************************!*\
  !*** ./node_modules/swiper/core/modules/observer/observer.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Observer)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n\nfunction Observer({\n  swiper,\n  extendParams,\n  on,\n  emit\n}) {\n  const observers = [];\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n\n  const attach = (target, options = {}) => {\n    const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;\n    const observer = new ObserverFunc(mutations => {\n      // The observerUpdate event should only be triggered\n      // once despite the number of mutations.  Additional\n      // triggers are redundant and are very costly\n      if (mutations.length === 1) {\n        emit('observerUpdate', mutations[0]);\n        return;\n      }\n\n      const observerUpdate = function observerUpdate() {\n        emit('observerUpdate', mutations[0]);\n      };\n\n      if (window.requestAnimationFrame) {\n        window.requestAnimationFrame(observerUpdate);\n      } else {\n        window.setTimeout(observerUpdate, 0);\n      }\n    });\n    observer.observe(target, {\n      attributes: typeof options.attributes === 'undefined' ? true : options.attributes,\n      childList: typeof options.childList === 'undefined' ? true : options.childList,\n      characterData: typeof options.characterData === 'undefined' ? true : options.characterData\n    });\n    observers.push(observer);\n  };\n\n  const init = () => {\n    if (!swiper.params.observer) return;\n\n    if (swiper.params.observeParents) {\n      const containerParents = swiper.$el.parents();\n\n      for (let i = 0; i < containerParents.length; i += 1) {\n        attach(containerParents[i]);\n      }\n    } // Observe container\n\n\n    attach(swiper.$el[0], {\n      childList: swiper.params.observeSlideChildren\n    }); // Observe wrapper\n\n    attach(swiper.$wrapperEl[0], {\n      attributes: false\n    });\n  };\n\n  const destroy = () => {\n    observers.forEach(observer => {\n      observer.disconnect();\n    });\n    observers.splice(0, observers.length);\n  };\n\n  extendParams({\n    observer: false,\n    observeParents: false,\n    observeSlideChildren: false\n  });\n  on('init', init);\n  on('destroy', destroy);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/modules/observer/observer.js?");

/***/ }),

/***/ "./node_modules/swiper/core/modules/resize/resize.js":
/*!***********************************************************!*\
  !*** ./node_modules/swiper/core/modules/resize/resize.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Resize)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n\nfunction Resize({\n  swiper,\n  on,\n  emit\n}) {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  let observer = null;\n  let animationFrame = null;\n\n  const resizeHandler = () => {\n    if (!swiper || swiper.destroyed || !swiper.initialized) return;\n    emit('beforeResize');\n    emit('resize');\n  };\n\n  const createObserver = () => {\n    if (!swiper || swiper.destroyed || !swiper.initialized) return;\n    observer = new ResizeObserver(entries => {\n      animationFrame = window.requestAnimationFrame(() => {\n        const {\n          width,\n          height\n        } = swiper;\n        let newWidth = width;\n        let newHeight = height;\n        entries.forEach(({\n          contentBoxSize,\n          contentRect,\n          target\n        }) => {\n          if (target && target !== swiper.el) return;\n          newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;\n          newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;\n        });\n\n        if (newWidth !== width || newHeight !== height) {\n          resizeHandler();\n        }\n      });\n    });\n    observer.observe(swiper.el);\n  };\n\n  const removeObserver = () => {\n    if (animationFrame) {\n      window.cancelAnimationFrame(animationFrame);\n    }\n\n    if (observer && observer.unobserve && swiper.el) {\n      observer.unobserve(swiper.el);\n      observer = null;\n    }\n  };\n\n  const orientationChangeHandler = () => {\n    if (!swiper || swiper.destroyed || !swiper.initialized) return;\n    emit('orientationchange');\n  };\n\n  on('init', () => {\n    if (swiper.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {\n      createObserver();\n      return;\n    }\n\n    window.addEventListener('resize', resizeHandler);\n    window.addEventListener('orientationchange', orientationChangeHandler);\n  });\n  on('destroy', () => {\n    removeObserver();\n    window.removeEventListener('resize', resizeHandler);\n    window.removeEventListener('orientationchange', orientationChangeHandler);\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/modules/resize/resize.js?");

/***/ }),

/***/ "./node_modules/swiper/core/slide/index.js":
/*!*************************************************!*\
  !*** ./node_modules/swiper/core/slide/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _slideTo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slideTo.js */ \"./node_modules/swiper/core/slide/slideTo.js\");\n/* harmony import */ var _slideToLoop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slideToLoop.js */ \"./node_modules/swiper/core/slide/slideToLoop.js\");\n/* harmony import */ var _slideNext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slideNext.js */ \"./node_modules/swiper/core/slide/slideNext.js\");\n/* harmony import */ var _slidePrev_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slidePrev.js */ \"./node_modules/swiper/core/slide/slidePrev.js\");\n/* harmony import */ var _slideReset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./slideReset.js */ \"./node_modules/swiper/core/slide/slideReset.js\");\n/* harmony import */ var _slideToClosest_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./slideToClosest.js */ \"./node_modules/swiper/core/slide/slideToClosest.js\");\n/* harmony import */ var _slideToClickedSlide_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./slideToClickedSlide.js */ \"./node_modules/swiper/core/slide/slideToClickedSlide.js\");\n\n\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  slideTo: _slideTo_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  slideToLoop: _slideToLoop_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  slideNext: _slideNext_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  slidePrev: _slidePrev_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  slideReset: _slideReset_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  slideToClosest: _slideToClosest_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  slideToClickedSlide: _slideToClickedSlide_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]\n});\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/slide/index.js?");

/***/ }),

/***/ "./node_modules/swiper/core/slide/slideNext.js":
/*!*****************************************************!*\
  !*** ./node_modules/swiper/core/slide/slideNext.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ slideNext)\n/* harmony export */ });\n/* eslint no-unused-vars: \"off\" */\nfunction slideNext(speed = this.params.speed, runCallbacks = true, internal) {\n  const swiper = this;\n  const {\n    animating,\n    enabled,\n    params\n  } = swiper;\n  if (!enabled) return swiper;\n  let perGroup = params.slidesPerGroup;\n\n  if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {\n    perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);\n  }\n\n  const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;\n\n  if (params.loop) {\n    if (animating && params.loopPreventsSlide) return false;\n    swiper.loopFix(); // eslint-disable-next-line\n\n    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;\n  }\n\n  if (params.rewind && swiper.isEnd) {\n    return swiper.slideTo(0, speed, runCallbacks, internal);\n  }\n\n  return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/slide/slideNext.js?");

/***/ }),

/***/ "./node_modules/swiper/core/slide/slidePrev.js":
/*!*****************************************************!*\
  !*** ./node_modules/swiper/core/slide/slidePrev.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ slidePrev)\n/* harmony export */ });\n/* eslint no-unused-vars: \"off\" */\nfunction slidePrev(speed = this.params.speed, runCallbacks = true, internal) {\n  const swiper = this;\n  const {\n    params,\n    animating,\n    snapGrid,\n    slidesGrid,\n    rtlTranslate,\n    enabled\n  } = swiper;\n  if (!enabled) return swiper;\n\n  if (params.loop) {\n    if (animating && params.loopPreventsSlide) return false;\n    swiper.loopFix(); // eslint-disable-next-line\n\n    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;\n  }\n\n  const translate = rtlTranslate ? swiper.translate : -swiper.translate;\n\n  function normalize(val) {\n    if (val < 0) return -Math.floor(Math.abs(val));\n    return Math.floor(val);\n  }\n\n  const normalizedTranslate = normalize(translate);\n  const normalizedSnapGrid = snapGrid.map(val => normalize(val));\n  let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];\n\n  if (typeof prevSnap === 'undefined' && params.cssMode) {\n    let prevSnapIndex;\n    snapGrid.forEach((snap, snapIndex) => {\n      if (normalizedTranslate >= snap) {\n        // prevSnap = snap;\n        prevSnapIndex = snapIndex;\n      }\n    });\n\n    if (typeof prevSnapIndex !== 'undefined') {\n      prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];\n    }\n  }\n\n  let prevIndex = 0;\n\n  if (typeof prevSnap !== 'undefined') {\n    prevIndex = slidesGrid.indexOf(prevSnap);\n    if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;\n\n    if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {\n      prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;\n      prevIndex = Math.max(prevIndex, 0);\n    }\n  }\n\n  if (params.rewind && swiper.isBeginning) {\n    const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;\n    return swiper.slideTo(lastIndex, speed, runCallbacks, internal);\n  }\n\n  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/slide/slidePrev.js?");

/***/ }),

/***/ "./node_modules/swiper/core/slide/slideReset.js":
/*!******************************************************!*\
  !*** ./node_modules/swiper/core/slide/slideReset.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ slideReset)\n/* harmony export */ });\n/* eslint no-unused-vars: \"off\" */\nfunction slideReset(speed = this.params.speed, runCallbacks = true, internal) {\n  const swiper = this;\n  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/slide/slideReset.js?");

/***/ }),

/***/ "./node_modules/swiper/core/slide/slideTo.js":
/*!***************************************************!*\
  !*** ./node_modules/swiper/core/slide/slideTo.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ slideTo)\n/* harmony export */ });\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n\nfunction slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {\n  if (typeof index !== 'number' && typeof index !== 'string') {\n    throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);\n  }\n\n  if (typeof index === 'string') {\n    /**\n     * The `index` argument converted from `string` to `number`.\n     * @type {number}\n     */\n    const indexAsNumber = parseInt(index, 10);\n    /**\n     * Determines whether the `index` argument is a valid `number`\n     * after being converted from the `string` type.\n     * @type {boolean}\n     */\n\n    const isValidNumber = isFinite(indexAsNumber);\n\n    if (!isValidNumber) {\n      throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);\n    } // Knowing that the converted `index` is a valid number,\n    // we can update the original argument's value.\n\n\n    index = indexAsNumber;\n  }\n\n  const swiper = this;\n  let slideIndex = index;\n  if (slideIndex < 0) slideIndex = 0;\n  const {\n    params,\n    snapGrid,\n    slidesGrid,\n    previousIndex,\n    activeIndex,\n    rtlTranslate: rtl,\n    wrapperEl,\n    enabled\n  } = swiper;\n\n  if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {\n    return false;\n  }\n\n  const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);\n  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);\n  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;\n  const translate = -snapGrid[snapIndex]; // Normalize slideIndex\n\n  if (params.normalizeSlideIndex) {\n    for (let i = 0; i < slidesGrid.length; i += 1) {\n      const normalizedTranslate = -Math.floor(translate * 100);\n      const normalizedGrid = Math.floor(slidesGrid[i] * 100);\n      const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);\n\n      if (typeof slidesGrid[i + 1] !== 'undefined') {\n        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {\n          slideIndex = i;\n        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {\n          slideIndex = i + 1;\n        }\n      } else if (normalizedTranslate >= normalizedGrid) {\n        slideIndex = i;\n      }\n    }\n  } // Directions locks\n\n\n  if (swiper.initialized && slideIndex !== activeIndex) {\n    if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {\n      return false;\n    }\n\n    if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {\n      if ((activeIndex || 0) !== slideIndex) return false;\n    }\n  }\n\n  if (slideIndex !== (previousIndex || 0) && runCallbacks) {\n    swiper.emit('beforeSlideChangeStart');\n  } // Update progress\n\n\n  swiper.updateProgress(translate);\n  let direction;\n  if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset'; // Update Index\n\n  if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {\n    swiper.updateActiveIndex(slideIndex); // Update Height\n\n    if (params.autoHeight) {\n      swiper.updateAutoHeight();\n    }\n\n    swiper.updateSlidesClasses();\n\n    if (params.effect !== 'slide') {\n      swiper.setTranslate(translate);\n    }\n\n    if (direction !== 'reset') {\n      swiper.transitionStart(runCallbacks, direction);\n      swiper.transitionEnd(runCallbacks, direction);\n    }\n\n    return false;\n  }\n\n  if (params.cssMode) {\n    const isH = swiper.isHorizontal();\n    const t = rtl ? translate : -translate;\n\n    if (speed === 0) {\n      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;\n\n      if (isVirtual) {\n        swiper.wrapperEl.style.scrollSnapType = 'none';\n        swiper._immediateVirtual = true;\n      }\n\n      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;\n\n      if (isVirtual) {\n        requestAnimationFrame(() => {\n          swiper.wrapperEl.style.scrollSnapType = '';\n          swiper._swiperImmediateVirtual = false;\n        });\n      }\n    } else {\n      if (!swiper.support.smoothScroll) {\n        (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.animateCSSModeScroll)({\n          swiper,\n          targetPosition: t,\n          side: isH ? 'left' : 'top'\n        });\n        return true;\n      }\n\n      wrapperEl.scrollTo({\n        [isH ? 'left' : 'top']: t,\n        behavior: 'smooth'\n      });\n    }\n\n    return true;\n  }\n\n  swiper.setTransition(speed);\n  swiper.setTranslate(translate);\n  swiper.updateActiveIndex(slideIndex);\n  swiper.updateSlidesClasses();\n  swiper.emit('beforeTransitionStart', speed, internal);\n  swiper.transitionStart(runCallbacks, direction);\n\n  if (speed === 0) {\n    swiper.transitionEnd(runCallbacks, direction);\n  } else if (!swiper.animating) {\n    swiper.animating = true;\n\n    if (!swiper.onSlideToWrapperTransitionEnd) {\n      swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {\n        if (!swiper || swiper.destroyed) return;\n        if (e.target !== this) return;\n        swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);\n        swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);\n        swiper.onSlideToWrapperTransitionEnd = null;\n        delete swiper.onSlideToWrapperTransitionEnd;\n        swiper.transitionEnd(runCallbacks, direction);\n      };\n    }\n\n    swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);\n    swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);\n  }\n\n  return true;\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/slide/slideTo.js?");

/***/ }),

/***/ "./node_modules/swiper/core/slide/slideToClickedSlide.js":
/*!***************************************************************!*\
  !*** ./node_modules/swiper/core/slide/slideToClickedSlide.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ slideToClickedSlide)\n/* harmony export */ });\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n\n\nfunction slideToClickedSlide() {\n  const swiper = this;\n  const {\n    params,\n    $wrapperEl\n  } = swiper;\n  const slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;\n  let slideToIndex = swiper.clickedIndex;\n  let realIndex;\n\n  if (params.loop) {\n    if (swiper.animating) return;\n    realIndex = parseInt((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);\n\n    if (params.centeredSlides) {\n      if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {\n        swiper.loopFix();\n        slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index=\"${realIndex}\"]:not(.${params.slideDuplicateClass})`).eq(0).index();\n        (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.nextTick)(() => {\n          swiper.slideTo(slideToIndex);\n        });\n      } else {\n        swiper.slideTo(slideToIndex);\n      }\n    } else if (slideToIndex > swiper.slides.length - slidesPerView) {\n      swiper.loopFix();\n      slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index=\"${realIndex}\"]:not(.${params.slideDuplicateClass})`).eq(0).index();\n      (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.nextTick)(() => {\n        swiper.slideTo(slideToIndex);\n      });\n    } else {\n      swiper.slideTo(slideToIndex);\n    }\n  } else {\n    swiper.slideTo(slideToIndex);\n  }\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/slide/slideToClickedSlide.js?");

/***/ }),

/***/ "./node_modules/swiper/core/slide/slideToClosest.js":
/*!**********************************************************!*\
  !*** ./node_modules/swiper/core/slide/slideToClosest.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ slideToClosest)\n/* harmony export */ });\n/* eslint no-unused-vars: \"off\" */\nfunction slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = 0.5) {\n  const swiper = this;\n  let index = swiper.activeIndex;\n  const skip = Math.min(swiper.params.slidesPerGroupSkip, index);\n  const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);\n  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;\n\n  if (translate >= swiper.snapGrid[snapIndex]) {\n    // The current translate is on or after the current snap index, so the choice\n    // is between the current index and the one after it.\n    const currentSnap = swiper.snapGrid[snapIndex];\n    const nextSnap = swiper.snapGrid[snapIndex + 1];\n\n    if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {\n      index += swiper.params.slidesPerGroup;\n    }\n  } else {\n    // The current translate is before the current snap index, so the choice\n    // is between the current index and the one before it.\n    const prevSnap = swiper.snapGrid[snapIndex - 1];\n    const currentSnap = swiper.snapGrid[snapIndex];\n\n    if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {\n      index -= swiper.params.slidesPerGroup;\n    }\n  }\n\n  index = Math.max(index, 0);\n  index = Math.min(index, swiper.slidesGrid.length - 1);\n  return swiper.slideTo(index, speed, runCallbacks, internal);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/slide/slideToClosest.js?");

/***/ }),

/***/ "./node_modules/swiper/core/slide/slideToLoop.js":
/*!*******************************************************!*\
  !*** ./node_modules/swiper/core/slide/slideToLoop.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ slideToLoop)\n/* harmony export */ });\nfunction slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {\n  if (typeof index === 'string') {\n    /**\n     * The `index` argument converted from `string` to `number`.\n     * @type {number}\n     */\n    const indexAsNumber = parseInt(index, 10);\n    /**\n     * Determines whether the `index` argument is a valid `number`\n     * after being converted from the `string` type.\n     * @type {boolean}\n     */\n\n    const isValidNumber = isFinite(indexAsNumber);\n\n    if (!isValidNumber) {\n      throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);\n    } // Knowing that the converted `index` is a valid number,\n    // we can update the original argument's value.\n\n\n    index = indexAsNumber;\n  }\n\n  const swiper = this;\n  let newIndex = index;\n\n  if (swiper.params.loop) {\n    newIndex += swiper.loopedSlides;\n  }\n\n  return swiper.slideTo(newIndex, speed, runCallbacks, internal);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/slide/slideToLoop.js?");

/***/ }),

/***/ "./node_modules/swiper/core/transition/index.js":
/*!******************************************************!*\
  !*** ./node_modules/swiper/core/transition/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _setTransition_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setTransition.js */ \"./node_modules/swiper/core/transition/setTransition.js\");\n/* harmony import */ var _transitionStart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transitionStart.js */ \"./node_modules/swiper/core/transition/transitionStart.js\");\n/* harmony import */ var _transitionEnd_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transitionEnd.js */ \"./node_modules/swiper/core/transition/transitionEnd.js\");\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  setTransition: _setTransition_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  transitionStart: _transitionStart_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  transitionEnd: _transitionEnd_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n});\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/transition/index.js?");

/***/ }),

/***/ "./node_modules/swiper/core/transition/setTransition.js":
/*!**************************************************************!*\
  !*** ./node_modules/swiper/core/transition/setTransition.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ setTransition)\n/* harmony export */ });\nfunction setTransition(duration, byController) {\n  const swiper = this;\n\n  if (!swiper.params.cssMode) {\n    swiper.$wrapperEl.transition(duration);\n  }\n\n  swiper.emit('setTransition', duration, byController);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/transition/setTransition.js?");

/***/ }),

/***/ "./node_modules/swiper/core/transition/transitionEmit.js":
/*!***************************************************************!*\
  !*** ./node_modules/swiper/core/transition/transitionEmit.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ transitionEmit)\n/* harmony export */ });\nfunction transitionEmit({\n  swiper,\n  runCallbacks,\n  direction,\n  step\n}) {\n  const {\n    activeIndex,\n    previousIndex\n  } = swiper;\n  let dir = direction;\n\n  if (!dir) {\n    if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';\n  }\n\n  swiper.emit(`transition${step}`);\n\n  if (runCallbacks && activeIndex !== previousIndex) {\n    if (dir === 'reset') {\n      swiper.emit(`slideResetTransition${step}`);\n      return;\n    }\n\n    swiper.emit(`slideChangeTransition${step}`);\n\n    if (dir === 'next') {\n      swiper.emit(`slideNextTransition${step}`);\n    } else {\n      swiper.emit(`slidePrevTransition${step}`);\n    }\n  }\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/transition/transitionEmit.js?");

/***/ }),

/***/ "./node_modules/swiper/core/transition/transitionEnd.js":
/*!**************************************************************!*\
  !*** ./node_modules/swiper/core/transition/transitionEnd.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ transitionEnd)\n/* harmony export */ });\n/* harmony import */ var _transitionEmit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transitionEmit.js */ \"./node_modules/swiper/core/transition/transitionEmit.js\");\n\nfunction transitionEnd(runCallbacks = true, direction) {\n  const swiper = this;\n  const {\n    params\n  } = swiper;\n  swiper.animating = false;\n  if (params.cssMode) return;\n  swiper.setTransition(0);\n  (0,_transitionEmit_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    swiper,\n    runCallbacks,\n    direction,\n    step: 'End'\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/transition/transitionEnd.js?");

/***/ }),

/***/ "./node_modules/swiper/core/transition/transitionStart.js":
/*!****************************************************************!*\
  !*** ./node_modules/swiper/core/transition/transitionStart.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ transitionStart)\n/* harmony export */ });\n/* harmony import */ var _transitionEmit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transitionEmit.js */ \"./node_modules/swiper/core/transition/transitionEmit.js\");\n\nfunction transitionStart(runCallbacks = true, direction) {\n  const swiper = this;\n  const {\n    params\n  } = swiper;\n  if (params.cssMode) return;\n\n  if (params.autoHeight) {\n    swiper.updateAutoHeight();\n  }\n\n  (0,_transitionEmit_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    swiper,\n    runCallbacks,\n    direction,\n    step: 'Start'\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/transition/transitionStart.js?");

/***/ }),

/***/ "./node_modules/swiper/core/translate/getTranslate.js":
/*!************************************************************!*\
  !*** ./node_modules/swiper/core/translate/getTranslate.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ getSwiperTranslate)\n/* harmony export */ });\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n\nfunction getSwiperTranslate(axis = this.isHorizontal() ? 'x' : 'y') {\n  const swiper = this;\n  const {\n    params,\n    rtlTranslate: rtl,\n    translate,\n    $wrapperEl\n  } = swiper;\n\n  if (params.virtualTranslate) {\n    return rtl ? -translate : translate;\n  }\n\n  if (params.cssMode) {\n    return translate;\n  }\n\n  let currentTranslate = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.getTranslate)($wrapperEl[0], axis);\n  if (rtl) currentTranslate = -currentTranslate;\n  return currentTranslate || 0;\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/translate/getTranslate.js?");

/***/ }),

/***/ "./node_modules/swiper/core/translate/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/swiper/core/translate/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _getTranslate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getTranslate.js */ \"./node_modules/swiper/core/translate/getTranslate.js\");\n/* harmony import */ var _setTranslate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setTranslate.js */ \"./node_modules/swiper/core/translate/setTranslate.js\");\n/* harmony import */ var _minTranslate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./minTranslate.js */ \"./node_modules/swiper/core/translate/minTranslate.js\");\n/* harmony import */ var _maxTranslate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./maxTranslate.js */ \"./node_modules/swiper/core/translate/maxTranslate.js\");\n/* harmony import */ var _translateTo_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./translateTo.js */ \"./node_modules/swiper/core/translate/translateTo.js\");\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  getTranslate: _getTranslate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  setTranslate: _setTranslate_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  minTranslate: _minTranslate_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  maxTranslate: _maxTranslate_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  translateTo: _translateTo_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n});\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/translate/index.js?");

/***/ }),

/***/ "./node_modules/swiper/core/translate/maxTranslate.js":
/*!************************************************************!*\
  !*** ./node_modules/swiper/core/translate/maxTranslate.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ maxTranslate)\n/* harmony export */ });\nfunction maxTranslate() {\n  return -this.snapGrid[this.snapGrid.length - 1];\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/translate/maxTranslate.js?");

/***/ }),

/***/ "./node_modules/swiper/core/translate/minTranslate.js":
/*!************************************************************!*\
  !*** ./node_modules/swiper/core/translate/minTranslate.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ minTranslate)\n/* harmony export */ });\nfunction minTranslate() {\n  return -this.snapGrid[0];\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/translate/minTranslate.js?");

/***/ }),

/***/ "./node_modules/swiper/core/translate/setTranslate.js":
/*!************************************************************!*\
  !*** ./node_modules/swiper/core/translate/setTranslate.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ setTranslate)\n/* harmony export */ });\nfunction setTranslate(translate, byController) {\n  const swiper = this;\n  const {\n    rtlTranslate: rtl,\n    params,\n    $wrapperEl,\n    wrapperEl,\n    progress\n  } = swiper;\n  let x = 0;\n  let y = 0;\n  const z = 0;\n\n  if (swiper.isHorizontal()) {\n    x = rtl ? -translate : translate;\n  } else {\n    y = translate;\n  }\n\n  if (params.roundLengths) {\n    x = Math.floor(x);\n    y = Math.floor(y);\n  }\n\n  if (params.cssMode) {\n    wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;\n  } else if (!params.virtualTranslate) {\n    $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);\n  }\n\n  swiper.previousTranslate = swiper.translate;\n  swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress\n\n  let newProgress;\n  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();\n\n  if (translatesDiff === 0) {\n    newProgress = 0;\n  } else {\n    newProgress = (translate - swiper.minTranslate()) / translatesDiff;\n  }\n\n  if (newProgress !== progress) {\n    swiper.updateProgress(translate);\n  }\n\n  swiper.emit('setTranslate', swiper.translate, byController);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/translate/setTranslate.js?");

/***/ }),

/***/ "./node_modules/swiper/core/translate/translateTo.js":
/*!***********************************************************!*\
  !*** ./node_modules/swiper/core/translate/translateTo.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ translateTo)\n/* harmony export */ });\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n\nfunction translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {\n  const swiper = this;\n  const {\n    params,\n    wrapperEl\n  } = swiper;\n\n  if (swiper.animating && params.preventInteractionOnTransition) {\n    return false;\n  }\n\n  const minTranslate = swiper.minTranslate();\n  const maxTranslate = swiper.maxTranslate();\n  let newTranslate;\n  if (translateBounds && translate > minTranslate) newTranslate = minTranslate;else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;else newTranslate = translate; // Update progress\n\n  swiper.updateProgress(newTranslate);\n\n  if (params.cssMode) {\n    const isH = swiper.isHorizontal();\n\n    if (speed === 0) {\n      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;\n    } else {\n      if (!swiper.support.smoothScroll) {\n        (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.animateCSSModeScroll)({\n          swiper,\n          targetPosition: -newTranslate,\n          side: isH ? 'left' : 'top'\n        });\n        return true;\n      }\n\n      wrapperEl.scrollTo({\n        [isH ? 'left' : 'top']: -newTranslate,\n        behavior: 'smooth'\n      });\n    }\n\n    return true;\n  }\n\n  if (speed === 0) {\n    swiper.setTransition(0);\n    swiper.setTranslate(newTranslate);\n\n    if (runCallbacks) {\n      swiper.emit('beforeTransitionStart', speed, internal);\n      swiper.emit('transitionEnd');\n    }\n  } else {\n    swiper.setTransition(speed);\n    swiper.setTranslate(newTranslate);\n\n    if (runCallbacks) {\n      swiper.emit('beforeTransitionStart', speed, internal);\n      swiper.emit('transitionStart');\n    }\n\n    if (!swiper.animating) {\n      swiper.animating = true;\n\n      if (!swiper.onTranslateToWrapperTransitionEnd) {\n        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {\n          if (!swiper || swiper.destroyed) return;\n          if (e.target !== this) return;\n          swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);\n          swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);\n          swiper.onTranslateToWrapperTransitionEnd = null;\n          delete swiper.onTranslateToWrapperTransitionEnd;\n\n          if (runCallbacks) {\n            swiper.emit('transitionEnd');\n          }\n        };\n      }\n\n      swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);\n      swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);\n    }\n  }\n\n  return true;\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/translate/translateTo.js?");

/***/ }),

/***/ "./node_modules/swiper/core/update/index.js":
/*!**************************************************!*\
  !*** ./node_modules/swiper/core/update/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _updateSize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateSize.js */ \"./node_modules/swiper/core/update/updateSize.js\");\n/* harmony import */ var _updateSlides_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateSlides.js */ \"./node_modules/swiper/core/update/updateSlides.js\");\n/* harmony import */ var _updateAutoHeight_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateAutoHeight.js */ \"./node_modules/swiper/core/update/updateAutoHeight.js\");\n/* harmony import */ var _updateSlidesOffset_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updateSlidesOffset.js */ \"./node_modules/swiper/core/update/updateSlidesOffset.js\");\n/* harmony import */ var _updateSlidesProgress_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./updateSlidesProgress.js */ \"./node_modules/swiper/core/update/updateSlidesProgress.js\");\n/* harmony import */ var _updateProgress_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./updateProgress.js */ \"./node_modules/swiper/core/update/updateProgress.js\");\n/* harmony import */ var _updateSlidesClasses_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./updateSlidesClasses.js */ \"./node_modules/swiper/core/update/updateSlidesClasses.js\");\n/* harmony import */ var _updateActiveIndex_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./updateActiveIndex.js */ \"./node_modules/swiper/core/update/updateActiveIndex.js\");\n/* harmony import */ var _updateClickedSlide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./updateClickedSlide.js */ \"./node_modules/swiper/core/update/updateClickedSlide.js\");\n\n\n\n\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  updateSize: _updateSize_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  updateSlides: _updateSlides_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  updateAutoHeight: _updateAutoHeight_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  updateSlidesOffset: _updateSlidesOffset_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  updateSlidesProgress: _updateSlidesProgress_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  updateProgress: _updateProgress_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  updateSlidesClasses: _updateSlidesClasses_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  updateActiveIndex: _updateActiveIndex_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  updateClickedSlide: _updateClickedSlide_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]\n});\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/update/index.js?");

/***/ }),

/***/ "./node_modules/swiper/core/update/updateActiveIndex.js":
/*!**************************************************************!*\
  !*** ./node_modules/swiper/core/update/updateActiveIndex.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ updateActiveIndex)\n/* harmony export */ });\nfunction updateActiveIndex(newActiveIndex) {\n  const swiper = this;\n  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;\n  const {\n    slidesGrid,\n    snapGrid,\n    params,\n    activeIndex: previousIndex,\n    realIndex: previousRealIndex,\n    snapIndex: previousSnapIndex\n  } = swiper;\n  let activeIndex = newActiveIndex;\n  let snapIndex;\n\n  if (typeof activeIndex === 'undefined') {\n    for (let i = 0; i < slidesGrid.length; i += 1) {\n      if (typeof slidesGrid[i + 1] !== 'undefined') {\n        if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {\n          activeIndex = i;\n        } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {\n          activeIndex = i + 1;\n        }\n      } else if (translate >= slidesGrid[i]) {\n        activeIndex = i;\n      }\n    } // Normalize slideIndex\n\n\n    if (params.normalizeSlideIndex) {\n      if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;\n    }\n  }\n\n  if (snapGrid.indexOf(translate) >= 0) {\n    snapIndex = snapGrid.indexOf(translate);\n  } else {\n    const skip = Math.min(params.slidesPerGroupSkip, activeIndex);\n    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);\n  }\n\n  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;\n\n  if (activeIndex === previousIndex) {\n    if (snapIndex !== previousSnapIndex) {\n      swiper.snapIndex = snapIndex;\n      swiper.emit('snapIndexChange');\n    }\n\n    return;\n  } // Get real index\n\n\n  const realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);\n  Object.assign(swiper, {\n    snapIndex,\n    realIndex,\n    previousIndex,\n    activeIndex\n  });\n  swiper.emit('activeIndexChange');\n  swiper.emit('snapIndexChange');\n\n  if (previousRealIndex !== realIndex) {\n    swiper.emit('realIndexChange');\n  }\n\n  if (swiper.initialized || swiper.params.runCallbacksOnInit) {\n    swiper.emit('slideChange');\n  }\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/update/updateActiveIndex.js?");

/***/ }),

/***/ "./node_modules/swiper/core/update/updateAutoHeight.js":
/*!*************************************************************!*\
  !*** ./node_modules/swiper/core/update/updateAutoHeight.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ updateAutoHeight)\n/* harmony export */ });\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n\nfunction updateAutoHeight(speed) {\n  const swiper = this;\n  const activeSlides = [];\n  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;\n  let newHeight = 0;\n  let i;\n\n  if (typeof speed === 'number') {\n    swiper.setTransition(speed);\n  } else if (speed === true) {\n    swiper.setTransition(swiper.params.speed);\n  }\n\n  const getSlideByIndex = index => {\n    if (isVirtual) {\n      return swiper.slides.filter(el => parseInt(el.getAttribute('data-swiper-slide-index'), 10) === index)[0];\n    }\n\n    return swiper.slides.eq(index)[0];\n  }; // Find slides currently in view\n\n\n  if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {\n    if (swiper.params.centeredSlides) {\n      (swiper.visibleSlides || (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([])).each(slide => {\n        activeSlides.push(slide);\n      });\n    } else {\n      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {\n        const index = swiper.activeIndex + i;\n        if (index > swiper.slides.length && !isVirtual) break;\n        activeSlides.push(getSlideByIndex(index));\n      }\n    }\n  } else {\n    activeSlides.push(getSlideByIndex(swiper.activeIndex));\n  } // Find new height from highest slide in view\n\n\n  for (i = 0; i < activeSlides.length; i += 1) {\n    if (typeof activeSlides[i] !== 'undefined') {\n      const height = activeSlides[i].offsetHeight;\n      newHeight = height > newHeight ? height : newHeight;\n    }\n  } // Update Height\n\n\n  if (newHeight || newHeight === 0) swiper.$wrapperEl.css('height', `${newHeight}px`);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/update/updateAutoHeight.js?");

/***/ }),

/***/ "./node_modules/swiper/core/update/updateClickedSlide.js":
/*!***************************************************************!*\
  !*** ./node_modules/swiper/core/update/updateClickedSlide.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ updateClickedSlide)\n/* harmony export */ });\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n\nfunction updateClickedSlide(e) {\n  const swiper = this;\n  const params = swiper.params;\n  const slide = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(e).closest(`.${params.slideClass}`)[0];\n  let slideFound = false;\n  let slideIndex;\n\n  if (slide) {\n    for (let i = 0; i < swiper.slides.length; i += 1) {\n      if (swiper.slides[i] === slide) {\n        slideFound = true;\n        slideIndex = i;\n        break;\n      }\n    }\n  }\n\n  if (slide && slideFound) {\n    swiper.clickedSlide = slide;\n\n    if (swiper.virtual && swiper.params.virtual.enabled) {\n      swiper.clickedIndex = parseInt((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(slide).attr('data-swiper-slide-index'), 10);\n    } else {\n      swiper.clickedIndex = slideIndex;\n    }\n  } else {\n    swiper.clickedSlide = undefined;\n    swiper.clickedIndex = undefined;\n    return;\n  }\n\n  if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {\n    swiper.slideToClickedSlide();\n  }\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/update/updateClickedSlide.js?");

/***/ }),

/***/ "./node_modules/swiper/core/update/updateProgress.js":
/*!***********************************************************!*\
  !*** ./node_modules/swiper/core/update/updateProgress.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ updateProgress)\n/* harmony export */ });\nfunction updateProgress(translate) {\n  const swiper = this;\n\n  if (typeof translate === 'undefined') {\n    const multiplier = swiper.rtlTranslate ? -1 : 1; // eslint-disable-next-line\n\n    translate = swiper && swiper.translate && swiper.translate * multiplier || 0;\n  }\n\n  const params = swiper.params;\n  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();\n  let {\n    progress,\n    isBeginning,\n    isEnd\n  } = swiper;\n  const wasBeginning = isBeginning;\n  const wasEnd = isEnd;\n\n  if (translatesDiff === 0) {\n    progress = 0;\n    isBeginning = true;\n    isEnd = true;\n  } else {\n    progress = (translate - swiper.minTranslate()) / translatesDiff;\n    isBeginning = progress <= 0;\n    isEnd = progress >= 1;\n  }\n\n  Object.assign(swiper, {\n    progress,\n    isBeginning,\n    isEnd\n  });\n  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);\n\n  if (isBeginning && !wasBeginning) {\n    swiper.emit('reachBeginning toEdge');\n  }\n\n  if (isEnd && !wasEnd) {\n    swiper.emit('reachEnd toEdge');\n  }\n\n  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {\n    swiper.emit('fromEdge');\n  }\n\n  swiper.emit('progress', progress);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/update/updateProgress.js?");

/***/ }),

/***/ "./node_modules/swiper/core/update/updateSize.js":
/*!*******************************************************!*\
  !*** ./node_modules/swiper/core/update/updateSize.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ updateSize)\n/* harmony export */ });\nfunction updateSize() {\n  const swiper = this;\n  let width;\n  let height;\n  const $el = swiper.$el;\n\n  if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {\n    width = swiper.params.width;\n  } else {\n    width = $el[0].clientWidth;\n  }\n\n  if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {\n    height = swiper.params.height;\n  } else {\n    height = $el[0].clientHeight;\n  }\n\n  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {\n    return;\n  } // Subtract paddings\n\n\n  width = width - parseInt($el.css('padding-left') || 0, 10) - parseInt($el.css('padding-right') || 0, 10);\n  height = height - parseInt($el.css('padding-top') || 0, 10) - parseInt($el.css('padding-bottom') || 0, 10);\n  if (Number.isNaN(width)) width = 0;\n  if (Number.isNaN(height)) height = 0;\n  Object.assign(swiper, {\n    width,\n    height,\n    size: swiper.isHorizontal() ? width : height\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/update/updateSize.js?");

/***/ }),

/***/ "./node_modules/swiper/core/update/updateSlides.js":
/*!*********************************************************!*\
  !*** ./node_modules/swiper/core/update/updateSlides.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ updateSlides)\n/* harmony export */ });\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n\nfunction updateSlides() {\n  const swiper = this;\n\n  function getDirectionLabel(property) {\n    if (swiper.isHorizontal()) {\n      return property;\n    } // prettier-ignore\n\n\n    return {\n      'width': 'height',\n      'margin-top': 'margin-left',\n      'margin-bottom ': 'margin-right',\n      'margin-left': 'margin-top',\n      'margin-right': 'margin-bottom',\n      'padding-left': 'padding-top',\n      'padding-right': 'padding-bottom',\n      'marginRight': 'marginBottom'\n    }[property];\n  }\n\n  function getDirectionPropertyValue(node, label) {\n    return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);\n  }\n\n  const params = swiper.params;\n  const {\n    $wrapperEl,\n    size: swiperSize,\n    rtlTranslate: rtl,\n    wrongRTL\n  } = swiper;\n  const isVirtual = swiper.virtual && params.virtual.enabled;\n  const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;\n  const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);\n  const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;\n  let snapGrid = [];\n  const slidesGrid = [];\n  const slidesSizesGrid = [];\n  let offsetBefore = params.slidesOffsetBefore;\n\n  if (typeof offsetBefore === 'function') {\n    offsetBefore = params.slidesOffsetBefore.call(swiper);\n  }\n\n  let offsetAfter = params.slidesOffsetAfter;\n\n  if (typeof offsetAfter === 'function') {\n    offsetAfter = params.slidesOffsetAfter.call(swiper);\n  }\n\n  const previousSnapGridLength = swiper.snapGrid.length;\n  const previousSlidesGridLength = swiper.slidesGrid.length;\n  let spaceBetween = params.spaceBetween;\n  let slidePosition = -offsetBefore;\n  let prevSlideSize = 0;\n  let index = 0;\n\n  if (typeof swiperSize === 'undefined') {\n    return;\n  }\n\n  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {\n    spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;\n  }\n\n  swiper.virtualSize = -spaceBetween; // reset margins\n\n  if (rtl) slides.css({\n    marginLeft: '',\n    marginBottom: '',\n    marginTop: ''\n  });else slides.css({\n    marginRight: '',\n    marginBottom: '',\n    marginTop: ''\n  }); // reset cssMode offsets\n\n  if (params.centeredSlides && params.cssMode) {\n    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.setCSSProperty)(swiper.wrapperEl, '--swiper-centered-offset-before', '');\n    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.setCSSProperty)(swiper.wrapperEl, '--swiper-centered-offset-after', '');\n  }\n\n  const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;\n\n  if (gridEnabled) {\n    swiper.grid.initSlides(slidesLength);\n  } // Calc slides\n\n\n  let slideSize;\n  const shouldResetSlideSize = params.slidesPerView === 'auto' && params.breakpoints && Object.keys(params.breakpoints).filter(key => {\n    return typeof params.breakpoints[key].slidesPerView !== 'undefined';\n  }).length > 0;\n\n  for (let i = 0; i < slidesLength; i += 1) {\n    slideSize = 0;\n    const slide = slides.eq(i);\n\n    if (gridEnabled) {\n      swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);\n    }\n\n    if (slide.css('display') === 'none') continue; // eslint-disable-line\n\n    if (params.slidesPerView === 'auto') {\n      if (shouldResetSlideSize) {\n        slides[i].style[getDirectionLabel('width')] = ``;\n      }\n\n      const slideStyles = getComputedStyle(slide[0]);\n      const currentTransform = slide[0].style.transform;\n      const currentWebKitTransform = slide[0].style.webkitTransform;\n\n      if (currentTransform) {\n        slide[0].style.transform = 'none';\n      }\n\n      if (currentWebKitTransform) {\n        slide[0].style.webkitTransform = 'none';\n      }\n\n      if (params.roundLengths) {\n        slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);\n      } else {\n        // eslint-disable-next-line\n        const width = getDirectionPropertyValue(slideStyles, 'width');\n        const paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');\n        const paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');\n        const marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');\n        const marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');\n        const boxSizing = slideStyles.getPropertyValue('box-sizing');\n\n        if (boxSizing && boxSizing === 'border-box') {\n          slideSize = width + marginLeft + marginRight;\n        } else {\n          const {\n            clientWidth,\n            offsetWidth\n          } = slide[0];\n          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);\n        }\n      }\n\n      if (currentTransform) {\n        slide[0].style.transform = currentTransform;\n      }\n\n      if (currentWebKitTransform) {\n        slide[0].style.webkitTransform = currentWebKitTransform;\n      }\n\n      if (params.roundLengths) slideSize = Math.floor(slideSize);\n    } else {\n      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;\n      if (params.roundLengths) slideSize = Math.floor(slideSize);\n\n      if (slides[i]) {\n        slides[i].style[getDirectionLabel('width')] = `${slideSize}px`;\n      }\n    }\n\n    if (slides[i]) {\n      slides[i].swiperSlideSize = slideSize;\n    }\n\n    slidesSizesGrid.push(slideSize);\n\n    if (params.centeredSlides) {\n      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;\n      if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;\n      if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;\n      if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;\n      if (params.roundLengths) slidePosition = Math.floor(slidePosition);\n      if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);\n      slidesGrid.push(slidePosition);\n    } else {\n      if (params.roundLengths) slidePosition = Math.floor(slidePosition);\n      if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);\n      slidesGrid.push(slidePosition);\n      slidePosition = slidePosition + slideSize + spaceBetween;\n    }\n\n    swiper.virtualSize += slideSize + spaceBetween;\n    prevSlideSize = slideSize;\n    index += 1;\n  }\n\n  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;\n\n  if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {\n    $wrapperEl.css({\n      width: `${swiper.virtualSize + params.spaceBetween}px`\n    });\n  }\n\n  if (params.setWrapperSize) {\n    $wrapperEl.css({\n      [getDirectionLabel('width')]: `${swiper.virtualSize + params.spaceBetween}px`\n    });\n  }\n\n  if (gridEnabled) {\n    swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);\n  } // Remove last grid elements depending on width\n\n\n  if (!params.centeredSlides) {\n    const newSlidesGrid = [];\n\n    for (let i = 0; i < snapGrid.length; i += 1) {\n      let slidesGridItem = snapGrid[i];\n      if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);\n\n      if (snapGrid[i] <= swiper.virtualSize - swiperSize) {\n        newSlidesGrid.push(slidesGridItem);\n      }\n    }\n\n    snapGrid = newSlidesGrid;\n\n    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {\n      snapGrid.push(swiper.virtualSize - swiperSize);\n    }\n  }\n\n  if (snapGrid.length === 0) snapGrid = [0];\n\n  if (params.spaceBetween !== 0) {\n    const key = swiper.isHorizontal() && rtl ? 'marginLeft' : getDirectionLabel('marginRight');\n    slides.filter((_, slideIndex) => {\n      if (!params.cssMode) return true;\n\n      if (slideIndex === slides.length - 1) {\n        return false;\n      }\n\n      return true;\n    }).css({\n      [key]: `${spaceBetween}px`\n    });\n  }\n\n  if (params.centeredSlides && params.centeredSlidesBounds) {\n    let allSlidesSize = 0;\n    slidesSizesGrid.forEach(slideSizeValue => {\n      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);\n    });\n    allSlidesSize -= params.spaceBetween;\n    const maxSnap = allSlidesSize - swiperSize;\n    snapGrid = snapGrid.map(snap => {\n      if (snap < 0) return -offsetBefore;\n      if (snap > maxSnap) return maxSnap + offsetAfter;\n      return snap;\n    });\n  }\n\n  if (params.centerInsufficientSlides) {\n    let allSlidesSize = 0;\n    slidesSizesGrid.forEach(slideSizeValue => {\n      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);\n    });\n    allSlidesSize -= params.spaceBetween;\n\n    if (allSlidesSize < swiperSize) {\n      const allSlidesOffset = (swiperSize - allSlidesSize) / 2;\n      snapGrid.forEach((snap, snapIndex) => {\n        snapGrid[snapIndex] = snap - allSlidesOffset;\n      });\n      slidesGrid.forEach((snap, snapIndex) => {\n        slidesGrid[snapIndex] = snap + allSlidesOffset;\n      });\n    }\n  }\n\n  Object.assign(swiper, {\n    slides,\n    snapGrid,\n    slidesGrid,\n    slidesSizesGrid\n  });\n\n  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {\n    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.setCSSProperty)(swiper.wrapperEl, '--swiper-centered-offset-before', `${-snapGrid[0]}px`);\n    (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.setCSSProperty)(swiper.wrapperEl, '--swiper-centered-offset-after', `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);\n    const addToSnapGrid = -swiper.snapGrid[0];\n    const addToSlidesGrid = -swiper.slidesGrid[0];\n    swiper.snapGrid = swiper.snapGrid.map(v => v + addToSnapGrid);\n    swiper.slidesGrid = swiper.slidesGrid.map(v => v + addToSlidesGrid);\n  }\n\n  if (slidesLength !== previousSlidesLength) {\n    swiper.emit('slidesLengthChange');\n  }\n\n  if (snapGrid.length !== previousSnapGridLength) {\n    if (swiper.params.watchOverflow) swiper.checkOverflow();\n    swiper.emit('snapGridLengthChange');\n  }\n\n  if (slidesGrid.length !== previousSlidesGridLength) {\n    swiper.emit('slidesGridLengthChange');\n  }\n\n  if (params.watchSlidesProgress) {\n    swiper.updateSlidesOffset();\n  }\n\n  if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {\n    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;\n    const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);\n\n    if (slidesLength <= params.maxBackfaceHiddenSlides) {\n      if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);\n    } else if (hasClassBackfaceClassAdded) {\n      swiper.$el.removeClass(backFaceHiddenClass);\n    }\n  }\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/update/updateSlides.js?");

/***/ }),

/***/ "./node_modules/swiper/core/update/updateSlidesClasses.js":
/*!****************************************************************!*\
  !*** ./node_modules/swiper/core/update/updateSlidesClasses.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ updateSlidesClasses)\n/* harmony export */ });\nfunction updateSlidesClasses() {\n  const swiper = this;\n  const {\n    slides,\n    params,\n    $wrapperEl,\n    activeIndex,\n    realIndex\n  } = swiper;\n  const isVirtual = swiper.virtual && params.virtual.enabled;\n  slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);\n  let activeSlide;\n\n  if (isVirtual) {\n    activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index=\"${activeIndex}\"]`);\n  } else {\n    activeSlide = slides.eq(activeIndex);\n  } // Active classes\n\n\n  activeSlide.addClass(params.slideActiveClass);\n\n  if (params.loop) {\n    // Duplicate to all looped slides\n    if (activeSlide.hasClass(params.slideDuplicateClass)) {\n      $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index=\"${realIndex}\"]`).addClass(params.slideDuplicateActiveClass);\n    } else {\n      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index=\"${realIndex}\"]`).addClass(params.slideDuplicateActiveClass);\n    }\n  } // Next Slide\n\n\n  let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);\n\n  if (params.loop && nextSlide.length === 0) {\n    nextSlide = slides.eq(0);\n    nextSlide.addClass(params.slideNextClass);\n  } // Prev Slide\n\n\n  let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);\n\n  if (params.loop && prevSlide.length === 0) {\n    prevSlide = slides.eq(-1);\n    prevSlide.addClass(params.slidePrevClass);\n  }\n\n  if (params.loop) {\n    // Duplicate to all looped slides\n    if (nextSlide.hasClass(params.slideDuplicateClass)) {\n      $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index=\"${nextSlide.attr('data-swiper-slide-index')}\"]`).addClass(params.slideDuplicateNextClass);\n    } else {\n      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index=\"${nextSlide.attr('data-swiper-slide-index')}\"]`).addClass(params.slideDuplicateNextClass);\n    }\n\n    if (prevSlide.hasClass(params.slideDuplicateClass)) {\n      $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index=\"${prevSlide.attr('data-swiper-slide-index')}\"]`).addClass(params.slideDuplicatePrevClass);\n    } else {\n      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index=\"${prevSlide.attr('data-swiper-slide-index')}\"]`).addClass(params.slideDuplicatePrevClass);\n    }\n  }\n\n  swiper.emitSlidesClasses();\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/update/updateSlidesClasses.js?");

/***/ }),

/***/ "./node_modules/swiper/core/update/updateSlidesOffset.js":
/*!***************************************************************!*\
  !*** ./node_modules/swiper/core/update/updateSlidesOffset.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ updateSlidesOffset)\n/* harmony export */ });\nfunction updateSlidesOffset() {\n  const swiper = this;\n  const slides = swiper.slides;\n\n  for (let i = 0; i < slides.length; i += 1) {\n    slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;\n  }\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/update/updateSlidesOffset.js?");

/***/ }),

/***/ "./node_modules/swiper/core/update/updateSlidesProgress.js":
/*!*****************************************************************!*\
  !*** ./node_modules/swiper/core/update/updateSlidesProgress.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ updateSlidesProgress)\n/* harmony export */ });\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n\nfunction updateSlidesProgress(translate = this && this.translate || 0) {\n  const swiper = this;\n  const params = swiper.params;\n  const {\n    slides,\n    rtlTranslate: rtl,\n    snapGrid\n  } = swiper;\n  if (slides.length === 0) return;\n  if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();\n  let offsetCenter = -translate;\n  if (rtl) offsetCenter = translate; // Visible Slides\n\n  slides.removeClass(params.slideVisibleClass);\n  swiper.visibleSlidesIndexes = [];\n  swiper.visibleSlides = [];\n\n  for (let i = 0; i < slides.length; i += 1) {\n    const slide = slides[i];\n    let slideOffset = slide.swiperSlideOffset;\n\n    if (params.cssMode && params.centeredSlides) {\n      slideOffset -= slides[0].swiperSlideOffset;\n    }\n\n    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);\n    const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);\n    const slideBefore = -(offsetCenter - slideOffset);\n    const slideAfter = slideBefore + swiper.slidesSizesGrid[i];\n    const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;\n\n    if (isVisible) {\n      swiper.visibleSlides.push(slide);\n      swiper.visibleSlidesIndexes.push(i);\n      slides.eq(i).addClass(params.slideVisibleClass);\n    }\n\n    slide.progress = rtl ? -slideProgress : slideProgress;\n    slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;\n  }\n\n  swiper.visibleSlides = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(swiper.visibleSlides);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/core/update/updateSlidesProgress.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/a11y/a11y.js":
/*!**************************************************!*\
  !*** ./node_modules/swiper/modules/a11y/a11y.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ A11y)\n/* harmony export */ });\n/* harmony import */ var _shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/classes-to-selector.js */ \"./node_modules/swiper/shared/classes-to-selector.js\");\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n\n\nfunction A11y({\n  swiper,\n  extendParams,\n  on\n}) {\n  extendParams({\n    a11y: {\n      enabled: true,\n      notificationClass: 'swiper-notification',\n      prevSlideMessage: 'Previous slide',\n      nextSlideMessage: 'Next slide',\n      firstSlideMessage: 'This is the first slide',\n      lastSlideMessage: 'This is the last slide',\n      paginationBulletMessage: 'Go to slide {{index}}',\n      slideLabelMessage: '{{index}} / {{slidesLength}}',\n      containerMessage: null,\n      containerRoleDescriptionMessage: null,\n      itemRoleDescriptionMessage: null,\n      slideRole: 'group',\n      id: null\n    }\n  });\n  swiper.a11y = {\n    clicked: false\n  };\n  let liveRegion = null;\n\n  function notify(message) {\n    const notification = liveRegion;\n    if (notification.length === 0) return;\n    notification.html('');\n    notification.html(message);\n  }\n\n  function getRandomNumber(size = 16) {\n    const randomChar = () => Math.round(16 * Math.random()).toString(16);\n\n    return 'x'.repeat(size).replace(/x/g, randomChar);\n  }\n\n  function makeElFocusable($el) {\n    $el.attr('tabIndex', '0');\n  }\n\n  function makeElNotFocusable($el) {\n    $el.attr('tabIndex', '-1');\n  }\n\n  function addElRole($el, role) {\n    $el.attr('role', role);\n  }\n\n  function addElRoleDescription($el, description) {\n    $el.attr('aria-roledescription', description);\n  }\n\n  function addElControls($el, controls) {\n    $el.attr('aria-controls', controls);\n  }\n\n  function addElLabel($el, label) {\n    $el.attr('aria-label', label);\n  }\n\n  function addElId($el, id) {\n    $el.attr('id', id);\n  }\n\n  function addElLive($el, live) {\n    $el.attr('aria-live', live);\n  }\n\n  function disableEl($el) {\n    $el.attr('aria-disabled', true);\n  }\n\n  function enableEl($el) {\n    $el.attr('aria-disabled', false);\n  }\n\n  function onEnterOrSpaceKey(e) {\n    if (e.keyCode !== 13 && e.keyCode !== 32) return;\n    const params = swiper.params.a11y;\n    const $targetEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(e.target);\n\n    if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {\n      if (!(swiper.isEnd && !swiper.params.loop)) {\n        swiper.slideNext();\n      }\n\n      if (swiper.isEnd) {\n        notify(params.lastSlideMessage);\n      } else {\n        notify(params.nextSlideMessage);\n      }\n    }\n\n    if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {\n      if (!(swiper.isBeginning && !swiper.params.loop)) {\n        swiper.slidePrev();\n      }\n\n      if (swiper.isBeginning) {\n        notify(params.firstSlideMessage);\n      } else {\n        notify(params.prevSlideMessage);\n      }\n    }\n\n    if (swiper.pagination && $targetEl.is((0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(swiper.params.pagination.bulletClass))) {\n      $targetEl[0].click();\n    }\n  }\n\n  function updateNavigation() {\n    if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;\n    const {\n      $nextEl,\n      $prevEl\n    } = swiper.navigation;\n\n    if ($prevEl && $prevEl.length > 0) {\n      if (swiper.isBeginning) {\n        disableEl($prevEl);\n        makeElNotFocusable($prevEl);\n      } else {\n        enableEl($prevEl);\n        makeElFocusable($prevEl);\n      }\n    }\n\n    if ($nextEl && $nextEl.length > 0) {\n      if (swiper.isEnd) {\n        disableEl($nextEl);\n        makeElNotFocusable($nextEl);\n      } else {\n        enableEl($nextEl);\n        makeElFocusable($nextEl);\n      }\n    }\n  }\n\n  function hasPagination() {\n    return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;\n  }\n\n  function hasClickablePagination() {\n    return hasPagination() && swiper.params.pagination.clickable;\n  }\n\n  function updatePagination() {\n    const params = swiper.params.a11y;\n    if (!hasPagination()) return;\n    swiper.pagination.bullets.each(bulletEl => {\n      const $bulletEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(bulletEl);\n\n      if (swiper.params.pagination.clickable) {\n        makeElFocusable($bulletEl);\n\n        if (!swiper.params.pagination.renderBullet) {\n          addElRole($bulletEl, 'button');\n          addElLabel($bulletEl, params.paginationBulletMessage.replace(/\\{\\{index\\}\\}/, $bulletEl.index() + 1));\n        }\n      }\n\n      if ($bulletEl.is(`.${swiper.params.pagination.bulletActiveClass}`)) {\n        $bulletEl.attr('aria-current', 'true');\n      } else {\n        $bulletEl.removeAttr('aria-current');\n      }\n    });\n  }\n\n  const initNavEl = ($el, wrapperId, message) => {\n    makeElFocusable($el);\n\n    if ($el[0].tagName !== 'BUTTON') {\n      addElRole($el, 'button');\n      $el.on('keydown', onEnterOrSpaceKey);\n    }\n\n    addElLabel($el, message);\n    addElControls($el, wrapperId);\n  };\n\n  const handlePointerDown = () => {\n    swiper.a11y.clicked = true;\n  };\n\n  const handlePointerUp = () => {\n    requestAnimationFrame(() => {\n      requestAnimationFrame(() => {\n        swiper.a11y.clicked = false;\n      });\n    });\n  };\n\n  const handleFocus = e => {\n    if (swiper.a11y.clicked) return;\n    const slideEl = e.target.closest(`.${swiper.params.slideClass}`);\n    if (!slideEl || !swiper.slides.includes(slideEl)) return;\n    const isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex;\n    const isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);\n    if (isActive || isVisible) return;\n\n    if (swiper.isHorizontal()) {\n      swiper.el.scrollLeft = 0;\n    } else {\n      swiper.el.scrollTop = 0;\n    }\n\n    swiper.slideTo(swiper.slides.indexOf(slideEl), 0);\n  };\n\n  const initSlides = () => {\n    const params = swiper.params.a11y;\n\n    if (params.itemRoleDescriptionMessage) {\n      addElRoleDescription((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(swiper.slides), params.itemRoleDescriptionMessage);\n    }\n\n    if (params.slideRole) {\n      addElRole((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(swiper.slides), params.slideRole);\n    }\n\n    const slidesLength = swiper.params.loop ? swiper.slides.filter(el => !el.classList.contains(swiper.params.slideDuplicateClass)).length : swiper.slides.length;\n\n    if (params.slideLabelMessage) {\n      swiper.slides.each((slideEl, index) => {\n        const $slideEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(slideEl);\n        const slideIndex = swiper.params.loop ? parseInt($slideEl.attr('data-swiper-slide-index'), 10) : index;\n        const ariaLabelMessage = params.slideLabelMessage.replace(/\\{\\{index\\}\\}/, slideIndex + 1).replace(/\\{\\{slidesLength\\}\\}/, slidesLength);\n        addElLabel($slideEl, ariaLabelMessage);\n      });\n    }\n  };\n\n  const init = () => {\n    const params = swiper.params.a11y;\n    swiper.$el.append(liveRegion); // Container\n\n    const $containerEl = swiper.$el;\n\n    if (params.containerRoleDescriptionMessage) {\n      addElRoleDescription($containerEl, params.containerRoleDescriptionMessage);\n    }\n\n    if (params.containerMessage) {\n      addElLabel($containerEl, params.containerMessage);\n    } // Wrapper\n\n\n    const $wrapperEl = swiper.$wrapperEl;\n    const wrapperId = params.id || $wrapperEl.attr('id') || `swiper-wrapper-${getRandomNumber(16)}`;\n    const live = swiper.params.autoplay && swiper.params.autoplay.enabled ? 'off' : 'polite';\n    addElId($wrapperEl, wrapperId);\n    addElLive($wrapperEl, live); // Slide\n\n    initSlides(); // Navigation\n\n    let $nextEl;\n    let $prevEl;\n\n    if (swiper.navigation && swiper.navigation.$nextEl) {\n      $nextEl = swiper.navigation.$nextEl;\n    }\n\n    if (swiper.navigation && swiper.navigation.$prevEl) {\n      $prevEl = swiper.navigation.$prevEl;\n    }\n\n    if ($nextEl && $nextEl.length) {\n      initNavEl($nextEl, wrapperId, params.nextSlideMessage);\n    }\n\n    if ($prevEl && $prevEl.length) {\n      initNavEl($prevEl, wrapperId, params.prevSlideMessage);\n    } // Pagination\n\n\n    if (hasClickablePagination()) {\n      swiper.pagination.$el.on('keydown', (0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(swiper.params.pagination.bulletClass), onEnterOrSpaceKey);\n    } // Tab focus\n\n\n    swiper.$el.on('focus', handleFocus, true);\n    swiper.$el.on('pointerdown', handlePointerDown, true);\n    swiper.$el.on('pointerup', handlePointerUp, true);\n  };\n\n  function destroy() {\n    if (liveRegion && liveRegion.length > 0) liveRegion.remove();\n    let $nextEl;\n    let $prevEl;\n\n    if (swiper.navigation && swiper.navigation.$nextEl) {\n      $nextEl = swiper.navigation.$nextEl;\n    }\n\n    if (swiper.navigation && swiper.navigation.$prevEl) {\n      $prevEl = swiper.navigation.$prevEl;\n    }\n\n    if ($nextEl) {\n      $nextEl.off('keydown', onEnterOrSpaceKey);\n    }\n\n    if ($prevEl) {\n      $prevEl.off('keydown', onEnterOrSpaceKey);\n    } // Pagination\n\n\n    if (hasClickablePagination()) {\n      swiper.pagination.$el.off('keydown', (0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(swiper.params.pagination.bulletClass), onEnterOrSpaceKey);\n    } // Tab focus\n\n\n    swiper.$el.off('focus', handleFocus, true);\n    swiper.$el.off('pointerdown', handlePointerDown, true);\n    swiper.$el.off('pointerup', handlePointerUp, true);\n  }\n\n  on('beforeInit', () => {\n    liveRegion = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(`<span class=\"${swiper.params.a11y.notificationClass}\" aria-live=\"assertive\" aria-atomic=\"true\"></span>`);\n  });\n  on('afterInit', () => {\n    if (!swiper.params.a11y.enabled) return;\n    init();\n  });\n  on('slidesLengthChange snapGridLengthChange slidesGridLengthChange', () => {\n    if (!swiper.params.a11y.enabled) return;\n    initSlides();\n  });\n  on('fromEdge toEdge afterInit lock unlock', () => {\n    if (!swiper.params.a11y.enabled) return;\n    updateNavigation();\n  });\n  on('paginationUpdate', () => {\n    if (!swiper.params.a11y.enabled) return;\n    updatePagination();\n  });\n  on('destroy', () => {\n    if (!swiper.params.a11y.enabled) return;\n    destroy();\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/a11y/a11y.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/autoplay/autoplay.js":
/*!**********************************************************!*\
  !*** ./node_modules/swiper/modules/autoplay/autoplay.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Autoplay)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n/* eslint no-underscore-dangle: \"off\" */\n\n/* eslint no-use-before-define: \"off\" */\n\n\nfunction Autoplay({\n  swiper,\n  extendParams,\n  on,\n  emit\n}) {\n  let timeout;\n  swiper.autoplay = {\n    running: false,\n    paused: false\n  };\n  extendParams({\n    autoplay: {\n      enabled: false,\n      delay: 3000,\n      waitForTransition: true,\n      disableOnInteraction: true,\n      stopOnLastSlide: false,\n      reverseDirection: false,\n      pauseOnMouseEnter: false\n    }\n  });\n\n  function run() {\n    if (!swiper.size) {\n      swiper.autoplay.running = false;\n      swiper.autoplay.paused = false;\n      return;\n    }\n\n    const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);\n    let delay = swiper.params.autoplay.delay;\n\n    if ($activeSlideEl.attr('data-swiper-autoplay')) {\n      delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;\n    }\n\n    clearTimeout(timeout);\n    timeout = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.nextTick)(() => {\n      let autoplayResult;\n\n      if (swiper.params.autoplay.reverseDirection) {\n        if (swiper.params.loop) {\n          swiper.loopFix();\n          autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);\n          emit('autoplay');\n        } else if (!swiper.isBeginning) {\n          autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);\n          emit('autoplay');\n        } else if (!swiper.params.autoplay.stopOnLastSlide) {\n          autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);\n          emit('autoplay');\n        } else {\n          stop();\n        }\n      } else if (swiper.params.loop) {\n        swiper.loopFix();\n        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);\n        emit('autoplay');\n      } else if (!swiper.isEnd) {\n        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);\n        emit('autoplay');\n      } else if (!swiper.params.autoplay.stopOnLastSlide) {\n        autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);\n        emit('autoplay');\n      } else {\n        stop();\n      }\n\n      if (swiper.params.cssMode && swiper.autoplay.running) run();else if (autoplayResult === false) {\n        run();\n      }\n    }, delay);\n  }\n\n  function start() {\n    if (typeof timeout !== 'undefined') return false;\n    if (swiper.autoplay.running) return false;\n    swiper.autoplay.running = true;\n    emit('autoplayStart');\n    run();\n    return true;\n  }\n\n  function stop() {\n    if (!swiper.autoplay.running) return false;\n    if (typeof timeout === 'undefined') return false;\n\n    if (timeout) {\n      clearTimeout(timeout);\n      timeout = undefined;\n    }\n\n    swiper.autoplay.running = false;\n    emit('autoplayStop');\n    return true;\n  }\n\n  function pause(speed) {\n    if (!swiper.autoplay.running) return;\n    if (swiper.autoplay.paused) return;\n    if (timeout) clearTimeout(timeout);\n    swiper.autoplay.paused = true;\n\n    if (speed === 0 || !swiper.params.autoplay.waitForTransition) {\n      swiper.autoplay.paused = false;\n      run();\n    } else {\n      ['transitionend', 'webkitTransitionEnd'].forEach(event => {\n        swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);\n      });\n    }\n  }\n\n  function onVisibilityChange() {\n    const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n\n    if (document.visibilityState === 'hidden' && swiper.autoplay.running) {\n      pause();\n    }\n\n    if (document.visibilityState === 'visible' && swiper.autoplay.paused) {\n      run();\n      swiper.autoplay.paused = false;\n    }\n  }\n\n  function onTransitionEnd(e) {\n    if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;\n    if (e.target !== swiper.$wrapperEl[0]) return;\n    ['transitionend', 'webkitTransitionEnd'].forEach(event => {\n      swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);\n    });\n    swiper.autoplay.paused = false;\n\n    if (!swiper.autoplay.running) {\n      stop();\n    } else {\n      run();\n    }\n  }\n\n  function onMouseEnter() {\n    if (swiper.params.autoplay.disableOnInteraction) {\n      stop();\n    } else {\n      emit('autoplayPause');\n      pause();\n    }\n\n    ['transitionend', 'webkitTransitionEnd'].forEach(event => {\n      swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);\n    });\n  }\n\n  function onMouseLeave() {\n    if (swiper.params.autoplay.disableOnInteraction) {\n      return;\n    }\n\n    swiper.autoplay.paused = false;\n    emit('autoplayResume');\n    run();\n  }\n\n  function attachMouseEvents() {\n    if (swiper.params.autoplay.pauseOnMouseEnter) {\n      swiper.$el.on('mouseenter', onMouseEnter);\n      swiper.$el.on('mouseleave', onMouseLeave);\n    }\n  }\n\n  function detachMouseEvents() {\n    swiper.$el.off('mouseenter', onMouseEnter);\n    swiper.$el.off('mouseleave', onMouseLeave);\n  }\n\n  on('init', () => {\n    if (swiper.params.autoplay.enabled) {\n      start();\n      const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n      document.addEventListener('visibilitychange', onVisibilityChange);\n      attachMouseEvents();\n    }\n  });\n  on('beforeTransitionStart', (_s, speed, internal) => {\n    if (swiper.autoplay.running) {\n      if (internal || !swiper.params.autoplay.disableOnInteraction) {\n        swiper.autoplay.pause(speed);\n      } else {\n        stop();\n      }\n    }\n  });\n  on('sliderFirstMove', () => {\n    if (swiper.autoplay.running) {\n      if (swiper.params.autoplay.disableOnInteraction) {\n        stop();\n      } else {\n        pause();\n      }\n    }\n  });\n  on('touchEnd', () => {\n    if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {\n      run();\n    }\n  });\n  on('destroy', () => {\n    detachMouseEvents();\n\n    if (swiper.autoplay.running) {\n      stop();\n    }\n\n    const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n    document.removeEventListener('visibilitychange', onVisibilityChange);\n  });\n  Object.assign(swiper.autoplay, {\n    pause,\n    run,\n    start,\n    stop\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/autoplay/autoplay.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/controller/controller.js":
/*!**************************************************************!*\
  !*** ./node_modules/swiper/modules/controller/controller.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Controller)\n/* harmony export */ });\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n/* eslint no-bitwise: [\"error\", { \"allow\": [\">>\"] }] */\n\nfunction Controller({\n  swiper,\n  extendParams,\n  on\n}) {\n  extendParams({\n    controller: {\n      control: undefined,\n      inverse: false,\n      by: 'slide' // or 'container'\n\n    }\n  });\n  swiper.controller = {\n    control: undefined\n  };\n\n  function LinearSpline(x, y) {\n    const binarySearch = function search() {\n      let maxIndex;\n      let minIndex;\n      let guess;\n      return (array, val) => {\n        minIndex = -1;\n        maxIndex = array.length;\n\n        while (maxIndex - minIndex > 1) {\n          guess = maxIndex + minIndex >> 1;\n\n          if (array[guess] <= val) {\n            minIndex = guess;\n          } else {\n            maxIndex = guess;\n          }\n        }\n\n        return maxIndex;\n      };\n    }();\n\n    this.x = x;\n    this.y = y;\n    this.lastIndex = x.length - 1; // Given an x value (x2), return the expected y2 value:\n    // (x1,y1) is the known point before given value,\n    // (x3,y3) is the known point after given value.\n\n    let i1;\n    let i3;\n\n    this.interpolate = function interpolate(x2) {\n      if (!x2) return 0; // Get the indexes of x1 and x3 (the array indexes before and after given x2):\n\n      i3 = binarySearch(this.x, x2);\n      i1 = i3 - 1; // We have our indexes i1 & i3, so we can calculate already:\n      // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1\n\n      return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];\n    };\n\n    return this;\n  } // xxx: for now i will just save one spline function to to\n\n\n  function getInterpolateFunction(c) {\n    if (!swiper.controller.spline) {\n      swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);\n    }\n  }\n\n  function setTranslate(_t, byController) {\n    const controlled = swiper.controller.control;\n    let multiplier;\n    let controlledTranslate;\n    const Swiper = swiper.constructor;\n\n    function setControlledTranslate(c) {\n      // this will create an Interpolate function based on the snapGrids\n      // x is the Grid of the scrolled scroller and y will be the controlled scroller\n      // it makes sense to create this only once and recall it for the interpolation\n      // the function does a lot of value caching for performance\n      const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;\n\n      if (swiper.params.controller.by === 'slide') {\n        getInterpolateFunction(c); // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid\n        // but it did not work out\n\n        controlledTranslate = -swiper.controller.spline.interpolate(-translate);\n      }\n\n      if (!controlledTranslate || swiper.params.controller.by === 'container') {\n        multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());\n        controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();\n      }\n\n      if (swiper.params.controller.inverse) {\n        controlledTranslate = c.maxTranslate() - controlledTranslate;\n      }\n\n      c.updateProgress(controlledTranslate);\n      c.setTranslate(controlledTranslate, swiper);\n      c.updateActiveIndex();\n      c.updateSlidesClasses();\n    }\n\n    if (Array.isArray(controlled)) {\n      for (let i = 0; i < controlled.length; i += 1) {\n        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {\n          setControlledTranslate(controlled[i]);\n        }\n      }\n    } else if (controlled instanceof Swiper && byController !== controlled) {\n      setControlledTranslate(controlled);\n    }\n  }\n\n  function setTransition(duration, byController) {\n    const Swiper = swiper.constructor;\n    const controlled = swiper.controller.control;\n    let i;\n\n    function setControlledTransition(c) {\n      c.setTransition(duration, swiper);\n\n      if (duration !== 0) {\n        c.transitionStart();\n\n        if (c.params.autoHeight) {\n          (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {\n            c.updateAutoHeight();\n          });\n        }\n\n        c.$wrapperEl.transitionEnd(() => {\n          if (!controlled) return;\n\n          if (c.params.loop && swiper.params.controller.by === 'slide') {\n            c.loopFix();\n          }\n\n          c.transitionEnd();\n        });\n      }\n    }\n\n    if (Array.isArray(controlled)) {\n      for (i = 0; i < controlled.length; i += 1) {\n        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {\n          setControlledTransition(controlled[i]);\n        }\n      }\n    } else if (controlled instanceof Swiper && byController !== controlled) {\n      setControlledTransition(controlled);\n    }\n  }\n\n  function removeSpline() {\n    if (!swiper.controller.control) return;\n\n    if (swiper.controller.spline) {\n      swiper.controller.spline = undefined;\n      delete swiper.controller.spline;\n    }\n  }\n\n  on('beforeInit', () => {\n    swiper.controller.control = swiper.params.controller.control;\n  });\n  on('update', () => {\n    removeSpline();\n  });\n  on('resize', () => {\n    removeSpline();\n  });\n  on('observerUpdate', () => {\n    removeSpline();\n  });\n  on('setTranslate', (_s, translate, byController) => {\n    if (!swiper.controller.control) return;\n    swiper.controller.setTranslate(translate, byController);\n  });\n  on('setTransition', (_s, duration, byController) => {\n    if (!swiper.controller.control) return;\n    swiper.controller.setTransition(duration, byController);\n  });\n  Object.assign(swiper.controller, {\n    setTranslate,\n    setTransition\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/controller/controller.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/effect-cards/effect-cards.js":
/*!******************************************************************!*\
  !*** ./node_modules/swiper/modules/effect-cards/effect-cards.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EffectCards)\n/* harmony export */ });\n/* harmony import */ var _shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/create-shadow.js */ \"./node_modules/swiper/shared/create-shadow.js\");\n/* harmony import */ var _shared_effect_init_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/effect-init.js */ \"./node_modules/swiper/shared/effect-init.js\");\n/* harmony import */ var _shared_effect_target_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/effect-target.js */ \"./node_modules/swiper/shared/effect-target.js\");\n/* harmony import */ var _shared_effect_virtual_transition_end_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/effect-virtual-transition-end.js */ \"./node_modules/swiper/shared/effect-virtual-transition-end.js\");\n\n\n\n\nfunction EffectCards({\n  swiper,\n  extendParams,\n  on\n}) {\n  extendParams({\n    cardsEffect: {\n      slideShadows: true,\n      transformEl: null,\n      rotate: true,\n      perSlideRotate: 2,\n      perSlideOffset: 8\n    }\n  });\n\n  const setTranslate = () => {\n    const {\n      slides,\n      activeIndex\n    } = swiper;\n    const params = swiper.params.cardsEffect;\n    const {\n      startTranslate,\n      isTouched\n    } = swiper.touchEventsData;\n    const currentTranslate = swiper.translate;\n\n    for (let i = 0; i < slides.length; i += 1) {\n      const $slideEl = slides.eq(i);\n      const slideProgress = $slideEl[0].progress;\n      const progress = Math.min(Math.max(slideProgress, -4), 4);\n      let offset = $slideEl[0].swiperSlideOffset;\n\n      if (swiper.params.centeredSlides && !swiper.params.cssMode) {\n        swiper.$wrapperEl.transform(`translateX(${swiper.minTranslate()}px)`);\n      }\n\n      if (swiper.params.centeredSlides && swiper.params.cssMode) {\n        offset -= slides[0].swiperSlideOffset;\n      }\n\n      let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;\n      let tY = 0;\n      const tZ = -100 * Math.abs(progress);\n      let scale = 1;\n      let rotate = -params.perSlideRotate * progress;\n      let tXAdd = params.perSlideOffset - Math.abs(progress) * 0.75;\n      const slideIndex = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.from + i : i;\n      const isSwipeToNext = (slideIndex === activeIndex || slideIndex === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;\n      const isSwipeToPrev = (slideIndex === activeIndex || slideIndex === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;\n\n      if (isSwipeToNext || isSwipeToPrev) {\n        const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;\n        rotate += -28 * progress * subProgress;\n        scale += -0.5 * subProgress;\n        tXAdd += 96 * subProgress;\n        tY = `${-25 * subProgress * Math.abs(progress)}%`;\n      }\n\n      if (progress < 0) {\n        // next\n        tX = `calc(${tX}px + (${tXAdd * Math.abs(progress)}%))`;\n      } else if (progress > 0) {\n        // prev\n        tX = `calc(${tX}px + (-${tXAdd * Math.abs(progress)}%))`;\n      } else {\n        tX = `${tX}px`;\n      }\n\n      if (!swiper.isHorizontal()) {\n        const prevY = tY;\n        tY = tX;\n        tX = prevY;\n      }\n\n      const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;\n      const transform = `\n        translate3d(${tX}, ${tY}, ${tZ}px)\n        rotateZ(${params.rotate ? rotate : 0}deg)\n        scale(${scaleString})\n      `;\n\n      if (params.slideShadows) {\n        // Set shadows\n        let $shadowEl = $slideEl.find('.swiper-slide-shadow');\n\n        if ($shadowEl.length === 0) {\n          $shadowEl = (0,_shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(params, $slideEl);\n        }\n\n        if ($shadowEl.length) $shadowEl[0].style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);\n      }\n\n      $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;\n      const $targetEl = (0,_shared_effect_target_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(params, $slideEl);\n      $targetEl.transform(transform);\n    }\n  };\n\n  const setTransition = duration => {\n    const {\n      transformEl\n    } = swiper.params.cardsEffect;\n    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;\n    $transitionElements.transition(duration).find('.swiper-slide-shadow').transition(duration);\n    (0,_shared_effect_virtual_transition_end_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n      swiper,\n      duration,\n      transformEl\n    });\n  };\n\n  (0,_shared_effect_init_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n    effect: 'cards',\n    swiper,\n    on,\n    setTranslate,\n    setTransition,\n    perspective: () => true,\n    overwriteParams: () => ({\n      watchSlidesProgress: true,\n      virtualTranslate: !swiper.params.cssMode\n    })\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/effect-cards/effect-cards.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/effect-coverflow/effect-coverflow.js":
/*!**************************************************************************!*\
  !*** ./node_modules/swiper/modules/effect-coverflow/effect-coverflow.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EffectCoverflow)\n/* harmony export */ });\n/* harmony import */ var _shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/create-shadow.js */ \"./node_modules/swiper/shared/create-shadow.js\");\n/* harmony import */ var _shared_effect_init_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/effect-init.js */ \"./node_modules/swiper/shared/effect-init.js\");\n/* harmony import */ var _shared_effect_target_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/effect-target.js */ \"./node_modules/swiper/shared/effect-target.js\");\n\n\n\nfunction EffectCoverflow({\n  swiper,\n  extendParams,\n  on\n}) {\n  extendParams({\n    coverflowEffect: {\n      rotate: 50,\n      stretch: 0,\n      depth: 100,\n      scale: 1,\n      modifier: 1,\n      slideShadows: true,\n      transformEl: null\n    }\n  });\n\n  const setTranslate = () => {\n    const {\n      width: swiperWidth,\n      height: swiperHeight,\n      slides,\n      slidesSizesGrid\n    } = swiper;\n    const params = swiper.params.coverflowEffect;\n    const isHorizontal = swiper.isHorizontal();\n    const transform = swiper.translate;\n    const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;\n    const rotate = isHorizontal ? params.rotate : -params.rotate;\n    const translate = params.depth; // Each slide offset from center\n\n    for (let i = 0, length = slides.length; i < length; i += 1) {\n      const $slideEl = slides.eq(i);\n      const slideSize = slidesSizesGrid[i];\n      const slideOffset = $slideEl[0].swiperSlideOffset;\n      const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;\n      const offsetMultiplier = typeof params.modifier === 'function' ? params.modifier(centerOffset) : centerOffset * params.modifier;\n      let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;\n      let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier; // var rotateZ = 0\n\n      let translateZ = -translate * Math.abs(offsetMultiplier);\n      let stretch = params.stretch; // Allow percentage to make a relative stretch for responsive sliders\n\n      if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {\n        stretch = parseFloat(params.stretch) / 100 * slideSize;\n      }\n\n      let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;\n      let translateX = isHorizontal ? stretch * offsetMultiplier : 0;\n      let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier); // Fix for ultra small values\n\n      if (Math.abs(translateX) < 0.001) translateX = 0;\n      if (Math.abs(translateY) < 0.001) translateY = 0;\n      if (Math.abs(translateZ) < 0.001) translateZ = 0;\n      if (Math.abs(rotateY) < 0.001) rotateY = 0;\n      if (Math.abs(rotateX) < 0.001) rotateX = 0;\n      if (Math.abs(scale) < 0.001) scale = 0;\n      const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;\n      const $targetEl = (0,_shared_effect_target_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(params, $slideEl);\n      $targetEl.transform(slideTransform);\n      $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;\n\n      if (params.slideShadows) {\n        // Set shadows\n        let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');\n        let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');\n\n        if ($shadowBeforeEl.length === 0) {\n          $shadowBeforeEl = (0,_shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(params, $slideEl, isHorizontal ? 'left' : 'top');\n        }\n\n        if ($shadowAfterEl.length === 0) {\n          $shadowAfterEl = (0,_shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(params, $slideEl, isHorizontal ? 'right' : 'bottom');\n        }\n\n        if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;\n        if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;\n      }\n    }\n  };\n\n  const setTransition = duration => {\n    const {\n      transformEl\n    } = swiper.params.coverflowEffect;\n    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;\n    $transitionElements.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);\n  };\n\n  (0,_shared_effect_init_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n    effect: 'coverflow',\n    swiper,\n    on,\n    setTranslate,\n    setTransition,\n    perspective: () => true,\n    overwriteParams: () => ({\n      watchSlidesProgress: true\n    })\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/effect-coverflow/effect-coverflow.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/effect-creative/effect-creative.js":
/*!************************************************************************!*\
  !*** ./node_modules/swiper/modules/effect-creative/effect-creative.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EffectCreative)\n/* harmony export */ });\n/* harmony import */ var _shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/create-shadow.js */ \"./node_modules/swiper/shared/create-shadow.js\");\n/* harmony import */ var _shared_effect_init_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/effect-init.js */ \"./node_modules/swiper/shared/effect-init.js\");\n/* harmony import */ var _shared_effect_target_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/effect-target.js */ \"./node_modules/swiper/shared/effect-target.js\");\n/* harmony import */ var _shared_effect_virtual_transition_end_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/effect-virtual-transition-end.js */ \"./node_modules/swiper/shared/effect-virtual-transition-end.js\");\n\n\n\n\nfunction EffectCreative({\n  swiper,\n  extendParams,\n  on\n}) {\n  extendParams({\n    creativeEffect: {\n      transformEl: null,\n      limitProgress: 1,\n      shadowPerProgress: false,\n      progressMultiplier: 1,\n      perspective: true,\n      prev: {\n        translate: [0, 0, 0],\n        rotate: [0, 0, 0],\n        opacity: 1,\n        scale: 1\n      },\n      next: {\n        translate: [0, 0, 0],\n        rotate: [0, 0, 0],\n        opacity: 1,\n        scale: 1\n      }\n    }\n  });\n\n  const getTranslateValue = value => {\n    if (typeof value === 'string') return value;\n    return `${value}px`;\n  };\n\n  const setTranslate = () => {\n    const {\n      slides,\n      $wrapperEl,\n      slidesSizesGrid\n    } = swiper;\n    const params = swiper.params.creativeEffect;\n    const {\n      progressMultiplier: multiplier\n    } = params;\n    const isCenteredSlides = swiper.params.centeredSlides;\n\n    if (isCenteredSlides) {\n      const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;\n      $wrapperEl.transform(`translateX(calc(50% - ${margin}px))`);\n    }\n\n    for (let i = 0; i < slides.length; i += 1) {\n      const $slideEl = slides.eq(i);\n      const slideProgress = $slideEl[0].progress;\n      const progress = Math.min(Math.max($slideEl[0].progress, -params.limitProgress), params.limitProgress);\n      let originalProgress = progress;\n\n      if (!isCenteredSlides) {\n        originalProgress = Math.min(Math.max($slideEl[0].originalProgress, -params.limitProgress), params.limitProgress);\n      }\n\n      const offset = $slideEl[0].swiperSlideOffset;\n      const t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];\n      const r = [0, 0, 0];\n      let custom = false;\n\n      if (!swiper.isHorizontal()) {\n        t[1] = t[0];\n        t[0] = 0;\n      }\n\n      let data = {\n        translate: [0, 0, 0],\n        rotate: [0, 0, 0],\n        scale: 1,\n        opacity: 1\n      };\n\n      if (progress < 0) {\n        data = params.next;\n        custom = true;\n      } else if (progress > 0) {\n        data = params.prev;\n        custom = true;\n      } // set translate\n\n\n      t.forEach((value, index) => {\n        t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(progress * multiplier)}))`;\n      }); // set rotates\n\n      r.forEach((value, index) => {\n        r[index] = data.rotate[index] * Math.abs(progress * multiplier);\n      });\n      $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;\n      const translateString = t.join(', ');\n      const rotateString = `rotateX(${r[0]}deg) rotateY(${r[1]}deg) rotateZ(${r[2]}deg)`;\n      const scaleString = originalProgress < 0 ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})` : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;\n      const opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;\n      const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`; // Set shadows\n\n      if (custom && data.shadow || !custom) {\n        let $shadowEl = $slideEl.children('.swiper-slide-shadow');\n\n        if ($shadowEl.length === 0 && data.shadow) {\n          $shadowEl = (0,_shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(params, $slideEl);\n        }\n\n        if ($shadowEl.length) {\n          const shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;\n          $shadowEl[0].style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);\n        }\n      }\n\n      const $targetEl = (0,_shared_effect_target_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(params, $slideEl);\n      $targetEl.transform(transform).css({\n        opacity: opacityString\n      });\n\n      if (data.origin) {\n        $targetEl.css('transform-origin', data.origin);\n      }\n    }\n  };\n\n  const setTransition = duration => {\n    const {\n      transformEl\n    } = swiper.params.creativeEffect;\n    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;\n    $transitionElements.transition(duration).find('.swiper-slide-shadow').transition(duration);\n    (0,_shared_effect_virtual_transition_end_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n      swiper,\n      duration,\n      transformEl,\n      allSlides: true\n    });\n  };\n\n  (0,_shared_effect_init_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n    effect: 'creative',\n    swiper,\n    on,\n    setTranslate,\n    setTransition,\n    perspective: () => swiper.params.creativeEffect.perspective,\n    overwriteParams: () => ({\n      watchSlidesProgress: true,\n      virtualTranslate: !swiper.params.cssMode\n    })\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/effect-creative/effect-creative.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/effect-cube/effect-cube.js":
/*!****************************************************************!*\
  !*** ./node_modules/swiper/modules/effect-cube/effect-cube.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EffectCube)\n/* harmony export */ });\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n/* harmony import */ var _shared_effect_init_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/effect-init.js */ \"./node_modules/swiper/shared/effect-init.js\");\n\n\nfunction EffectCube({\n  swiper,\n  extendParams,\n  on\n}) {\n  extendParams({\n    cubeEffect: {\n      slideShadows: true,\n      shadow: true,\n      shadowOffset: 20,\n      shadowScale: 0.94\n    }\n  });\n\n  const createSlideShadows = ($slideEl, progress, isHorizontal) => {\n    let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');\n    let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');\n\n    if (shadowBefore.length === 0) {\n      shadowBefore = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(`<div class=\"swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}\"></div>`);\n      $slideEl.append(shadowBefore);\n    }\n\n    if (shadowAfter.length === 0) {\n      shadowAfter = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(`<div class=\"swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}\"></div>`);\n      $slideEl.append(shadowAfter);\n    }\n\n    if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);\n    if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);\n  };\n\n  const recreateShadows = () => {\n    // create new ones\n    const isHorizontal = swiper.isHorizontal();\n    swiper.slides.each(slideEl => {\n      const progress = Math.max(Math.min(slideEl.progress, 1), -1);\n      createSlideShadows((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(slideEl), progress, isHorizontal);\n    });\n  };\n\n  const setTranslate = () => {\n    const {\n      $el,\n      $wrapperEl,\n      slides,\n      width: swiperWidth,\n      height: swiperHeight,\n      rtlTranslate: rtl,\n      size: swiperSize,\n      browser\n    } = swiper;\n    const params = swiper.params.cubeEffect;\n    const isHorizontal = swiper.isHorizontal();\n    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;\n    let wrapperRotate = 0;\n    let $cubeShadowEl;\n\n    if (params.shadow) {\n      if (isHorizontal) {\n        $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');\n\n        if ($cubeShadowEl.length === 0) {\n          $cubeShadowEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('<div class=\"swiper-cube-shadow\"></div>');\n          $wrapperEl.append($cubeShadowEl);\n        }\n\n        $cubeShadowEl.css({\n          height: `${swiperWidth}px`\n        });\n      } else {\n        $cubeShadowEl = $el.find('.swiper-cube-shadow');\n\n        if ($cubeShadowEl.length === 0) {\n          $cubeShadowEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('<div class=\"swiper-cube-shadow\"></div>');\n          $el.append($cubeShadowEl);\n        }\n      }\n    }\n\n    for (let i = 0; i < slides.length; i += 1) {\n      const $slideEl = slides.eq(i);\n      let slideIndex = i;\n\n      if (isVirtual) {\n        slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);\n      }\n\n      let slideAngle = slideIndex * 90;\n      let round = Math.floor(slideAngle / 360);\n\n      if (rtl) {\n        slideAngle = -slideAngle;\n        round = Math.floor(-slideAngle / 360);\n      }\n\n      const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);\n      let tx = 0;\n      let ty = 0;\n      let tz = 0;\n\n      if (slideIndex % 4 === 0) {\n        tx = -round * 4 * swiperSize;\n        tz = 0;\n      } else if ((slideIndex - 1) % 4 === 0) {\n        tx = 0;\n        tz = -round * 4 * swiperSize;\n      } else if ((slideIndex - 2) % 4 === 0) {\n        tx = swiperSize + round * 4 * swiperSize;\n        tz = swiperSize;\n      } else if ((slideIndex - 3) % 4 === 0) {\n        tx = -swiperSize;\n        tz = 3 * swiperSize + swiperSize * 4 * round;\n      }\n\n      if (rtl) {\n        tx = -tx;\n      }\n\n      if (!isHorizontal) {\n        ty = tx;\n        tx = 0;\n      }\n\n      const transform = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;\n\n      if (progress <= 1 && progress > -1) {\n        wrapperRotate = slideIndex * 90 + progress * 90;\n        if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;\n      }\n\n      $slideEl.transform(transform);\n\n      if (params.slideShadows) {\n        createSlideShadows($slideEl, progress, isHorizontal);\n      }\n    }\n\n    $wrapperEl.css({\n      '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,\n      'transform-origin': `50% 50% -${swiperSize / 2}px`\n    });\n\n    if (params.shadow) {\n      if (isHorizontal) {\n        $cubeShadowEl.transform(`translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);\n      } else {\n        const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;\n        const multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);\n        const scale1 = params.shadowScale;\n        const scale2 = params.shadowScale / multiplier;\n        const offset = params.shadowOffset;\n        $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);\n      }\n    }\n\n    const zFactor = browser.isSafari || browser.isWebView ? -swiperSize / 2 : 0;\n    $wrapperEl.transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);\n    $wrapperEl[0].style.setProperty('--swiper-cube-translate-z', `${zFactor}px`);\n  };\n\n  const setTransition = duration => {\n    const {\n      $el,\n      slides\n    } = swiper;\n    slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);\n\n    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {\n      $el.find('.swiper-cube-shadow').transition(duration);\n    }\n  };\n\n  (0,_shared_effect_init_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n    effect: 'cube',\n    swiper,\n    on,\n    setTranslate,\n    setTransition,\n    recreateShadows,\n    getEffectParams: () => swiper.params.cubeEffect,\n    perspective: () => true,\n    overwriteParams: () => ({\n      slidesPerView: 1,\n      slidesPerGroup: 1,\n      watchSlidesProgress: true,\n      resistanceRatio: 0,\n      spaceBetween: 0,\n      centeredSlides: false,\n      virtualTranslate: true\n    })\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/effect-cube/effect-cube.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/effect-fade/effect-fade.js":
/*!****************************************************************!*\
  !*** ./node_modules/swiper/modules/effect-fade/effect-fade.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EffectFade)\n/* harmony export */ });\n/* harmony import */ var _shared_effect_init_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/effect-init.js */ \"./node_modules/swiper/shared/effect-init.js\");\n/* harmony import */ var _shared_effect_target_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/effect-target.js */ \"./node_modules/swiper/shared/effect-target.js\");\n/* harmony import */ var _shared_effect_virtual_transition_end_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/effect-virtual-transition-end.js */ \"./node_modules/swiper/shared/effect-virtual-transition-end.js\");\n\n\n\nfunction EffectFade({\n  swiper,\n  extendParams,\n  on\n}) {\n  extendParams({\n    fadeEffect: {\n      crossFade: false,\n      transformEl: null\n    }\n  });\n\n  const setTranslate = () => {\n    const {\n      slides\n    } = swiper;\n    const params = swiper.params.fadeEffect;\n\n    for (let i = 0; i < slides.length; i += 1) {\n      const $slideEl = swiper.slides.eq(i);\n      const offset = $slideEl[0].swiperSlideOffset;\n      let tx = -offset;\n      if (!swiper.params.virtualTranslate) tx -= swiper.translate;\n      let ty = 0;\n\n      if (!swiper.isHorizontal()) {\n        ty = tx;\n        tx = 0;\n      }\n\n      const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);\n      const $targetEl = (0,_shared_effect_target_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(params, $slideEl);\n      $targetEl.css({\n        opacity: slideOpacity\n      }).transform(`translate3d(${tx}px, ${ty}px, 0px)`);\n    }\n  };\n\n  const setTransition = duration => {\n    const {\n      transformEl\n    } = swiper.params.fadeEffect;\n    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;\n    $transitionElements.transition(duration);\n    (0,_shared_effect_virtual_transition_end_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n      swiper,\n      duration,\n      transformEl,\n      allSlides: true\n    });\n  };\n\n  (0,_shared_effect_init_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    effect: 'fade',\n    swiper,\n    on,\n    setTranslate,\n    setTransition,\n    overwriteParams: () => ({\n      slidesPerView: 1,\n      slidesPerGroup: 1,\n      watchSlidesProgress: true,\n      spaceBetween: 0,\n      virtualTranslate: !swiper.params.cssMode\n    })\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/effect-fade/effect-fade.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/effect-flip/effect-flip.js":
/*!****************************************************************!*\
  !*** ./node_modules/swiper/modules/effect-flip/effect-flip.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EffectFlip)\n/* harmony export */ });\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n/* harmony import */ var _shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/create-shadow.js */ \"./node_modules/swiper/shared/create-shadow.js\");\n/* harmony import */ var _shared_effect_init_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/effect-init.js */ \"./node_modules/swiper/shared/effect-init.js\");\n/* harmony import */ var _shared_effect_target_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/effect-target.js */ \"./node_modules/swiper/shared/effect-target.js\");\n/* harmony import */ var _shared_effect_virtual_transition_end_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/effect-virtual-transition-end.js */ \"./node_modules/swiper/shared/effect-virtual-transition-end.js\");\n\n\n\n\n\nfunction EffectFlip({\n  swiper,\n  extendParams,\n  on\n}) {\n  extendParams({\n    flipEffect: {\n      slideShadows: true,\n      limitRotation: true,\n      transformEl: null\n    }\n  });\n\n  const createSlideShadows = ($slideEl, progress, params) => {\n    let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');\n    let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');\n\n    if (shadowBefore.length === 0) {\n      shadowBefore = (0,_shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(params, $slideEl, swiper.isHorizontal() ? 'left' : 'top');\n    }\n\n    if (shadowAfter.length === 0) {\n      shadowAfter = (0,_shared_create_shadow_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(params, $slideEl, swiper.isHorizontal() ? 'right' : 'bottom');\n    }\n\n    if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);\n    if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);\n  };\n\n  const recreateShadows = () => {\n    // Set shadows\n    const params = swiper.params.flipEffect;\n    swiper.slides.each(slideEl => {\n      const $slideEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(slideEl);\n      let progress = $slideEl[0].progress;\n\n      if (swiper.params.flipEffect.limitRotation) {\n        progress = Math.max(Math.min(slideEl.progress, 1), -1);\n      }\n\n      createSlideShadows($slideEl, progress, params);\n    });\n  };\n\n  const setTranslate = () => {\n    const {\n      slides,\n      rtlTranslate: rtl\n    } = swiper;\n    const params = swiper.params.flipEffect;\n\n    for (let i = 0; i < slides.length; i += 1) {\n      const $slideEl = slides.eq(i);\n      let progress = $slideEl[0].progress;\n\n      if (swiper.params.flipEffect.limitRotation) {\n        progress = Math.max(Math.min($slideEl[0].progress, 1), -1);\n      }\n\n      const offset = $slideEl[0].swiperSlideOffset;\n      const rotate = -180 * progress;\n      let rotateY = rotate;\n      let rotateX = 0;\n      let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;\n      let ty = 0;\n\n      if (!swiper.isHorizontal()) {\n        ty = tx;\n        tx = 0;\n        rotateX = -rotateY;\n        rotateY = 0;\n      } else if (rtl) {\n        rotateY = -rotateY;\n      }\n\n      $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;\n\n      if (params.slideShadows) {\n        createSlideShadows($slideEl, progress, params);\n      }\n\n      const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;\n      const $targetEl = (0,_shared_effect_target_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(params, $slideEl);\n      $targetEl.transform(transform);\n    }\n  };\n\n  const setTransition = duration => {\n    const {\n      transformEl\n    } = swiper.params.flipEffect;\n    const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;\n    $transitionElements.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);\n    (0,_shared_effect_virtual_transition_end_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])({\n      swiper,\n      duration,\n      transformEl\n    });\n  };\n\n  (0,_shared_effect_init_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n    effect: 'flip',\n    swiper,\n    on,\n    setTranslate,\n    setTransition,\n    recreateShadows,\n    getEffectParams: () => swiper.params.flipEffect,\n    perspective: () => true,\n    overwriteParams: () => ({\n      slidesPerView: 1,\n      slidesPerGroup: 1,\n      watchSlidesProgress: true,\n      spaceBetween: 0,\n      virtualTranslate: !swiper.params.cssMode\n    })\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/effect-flip/effect-flip.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/free-mode/free-mode.js":
/*!************************************************************!*\
  !*** ./node_modules/swiper/modules/free-mode/free-mode.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ freeMode)\n/* harmony export */ });\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n\nfunction freeMode({\n  swiper,\n  extendParams,\n  emit,\n  once\n}) {\n  extendParams({\n    freeMode: {\n      enabled: false,\n      momentum: true,\n      momentumRatio: 1,\n      momentumBounce: true,\n      momentumBounceRatio: 1,\n      momentumVelocityRatio: 1,\n      sticky: false,\n      minimumVelocity: 0.02\n    }\n  });\n\n  function onTouchStart() {\n    const translate = swiper.getTranslate();\n    swiper.setTranslate(translate);\n    swiper.setTransition(0);\n    swiper.touchEventsData.velocities.length = 0;\n    swiper.freeMode.onTouchEnd({\n      currentPos: swiper.rtl ? swiper.translate : -swiper.translate\n    });\n  }\n\n  function onTouchMove() {\n    const {\n      touchEventsData: data,\n      touches\n    } = swiper; // Velocity\n\n    if (data.velocities.length === 0) {\n      data.velocities.push({\n        position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],\n        time: data.touchStartTime\n      });\n    }\n\n    data.velocities.push({\n      position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],\n      time: (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.now)()\n    });\n  }\n\n  function onTouchEnd({\n    currentPos\n  }) {\n    const {\n      params,\n      $wrapperEl,\n      rtlTranslate: rtl,\n      snapGrid,\n      touchEventsData: data\n    } = swiper; // Time diff\n\n    const touchEndTime = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.now)();\n    const timeDiff = touchEndTime - data.touchStartTime;\n\n    if (currentPos < -swiper.minTranslate()) {\n      swiper.slideTo(swiper.activeIndex);\n      return;\n    }\n\n    if (currentPos > -swiper.maxTranslate()) {\n      if (swiper.slides.length < snapGrid.length) {\n        swiper.slideTo(snapGrid.length - 1);\n      } else {\n        swiper.slideTo(swiper.slides.length - 1);\n      }\n\n      return;\n    }\n\n    if (params.freeMode.momentum) {\n      if (data.velocities.length > 1) {\n        const lastMoveEvent = data.velocities.pop();\n        const velocityEvent = data.velocities.pop();\n        const distance = lastMoveEvent.position - velocityEvent.position;\n        const time = lastMoveEvent.time - velocityEvent.time;\n        swiper.velocity = distance / time;\n        swiper.velocity /= 2;\n\n        if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {\n          swiper.velocity = 0;\n        } // this implies that the user stopped moving a finger then released.\n        // There would be no events with distance zero, so the last event is stale.\n\n\n        if (time > 150 || (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.now)() - lastMoveEvent.time > 300) {\n          swiper.velocity = 0;\n        }\n      } else {\n        swiper.velocity = 0;\n      }\n\n      swiper.velocity *= params.freeMode.momentumVelocityRatio;\n      data.velocities.length = 0;\n      let momentumDuration = 1000 * params.freeMode.momentumRatio;\n      const momentumDistance = swiper.velocity * momentumDuration;\n      let newPosition = swiper.translate + momentumDistance;\n      if (rtl) newPosition = -newPosition;\n      let doBounce = false;\n      let afterBouncePosition;\n      const bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;\n      let needsLoopFix;\n\n      if (newPosition < swiper.maxTranslate()) {\n        if (params.freeMode.momentumBounce) {\n          if (newPosition + swiper.maxTranslate() < -bounceAmount) {\n            newPosition = swiper.maxTranslate() - bounceAmount;\n          }\n\n          afterBouncePosition = swiper.maxTranslate();\n          doBounce = true;\n          data.allowMomentumBounce = true;\n        } else {\n          newPosition = swiper.maxTranslate();\n        }\n\n        if (params.loop && params.centeredSlides) needsLoopFix = true;\n      } else if (newPosition > swiper.minTranslate()) {\n        if (params.freeMode.momentumBounce) {\n          if (newPosition - swiper.minTranslate() > bounceAmount) {\n            newPosition = swiper.minTranslate() + bounceAmount;\n          }\n\n          afterBouncePosition = swiper.minTranslate();\n          doBounce = true;\n          data.allowMomentumBounce = true;\n        } else {\n          newPosition = swiper.minTranslate();\n        }\n\n        if (params.loop && params.centeredSlides) needsLoopFix = true;\n      } else if (params.freeMode.sticky) {\n        let nextSlide;\n\n        for (let j = 0; j < snapGrid.length; j += 1) {\n          if (snapGrid[j] > -newPosition) {\n            nextSlide = j;\n            break;\n          }\n        }\n\n        if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {\n          newPosition = snapGrid[nextSlide];\n        } else {\n          newPosition = snapGrid[nextSlide - 1];\n        }\n\n        newPosition = -newPosition;\n      }\n\n      if (needsLoopFix) {\n        once('transitionEnd', () => {\n          swiper.loopFix();\n        });\n      } // Fix duration\n\n\n      if (swiper.velocity !== 0) {\n        if (rtl) {\n          momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);\n        } else {\n          momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);\n        }\n\n        if (params.freeMode.sticky) {\n          // If freeMode.sticky is active and the user ends a swipe with a slow-velocity\n          // event, then durations can be 20+ seconds to slide one (or zero!) slides.\n          // It's easy to see this when simulating touch with mouse events. To fix this,\n          // limit single-slide swipes to the default slide duration. This also has the\n          // nice side effect of matching slide speed if the user stopped moving before\n          // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.\n          // For faster swipes, also apply limits (albeit higher ones).\n          const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);\n          const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];\n\n          if (moveDistance < currentSlideSize) {\n            momentumDuration = params.speed;\n          } else if (moveDistance < 2 * currentSlideSize) {\n            momentumDuration = params.speed * 1.5;\n          } else {\n            momentumDuration = params.speed * 2.5;\n          }\n        }\n      } else if (params.freeMode.sticky) {\n        swiper.slideToClosest();\n        return;\n      }\n\n      if (params.freeMode.momentumBounce && doBounce) {\n        swiper.updateProgress(afterBouncePosition);\n        swiper.setTransition(momentumDuration);\n        swiper.setTranslate(newPosition);\n        swiper.transitionStart(true, swiper.swipeDirection);\n        swiper.animating = true;\n        $wrapperEl.transitionEnd(() => {\n          if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;\n          emit('momentumBounce');\n          swiper.setTransition(params.speed);\n          setTimeout(() => {\n            swiper.setTranslate(afterBouncePosition);\n            $wrapperEl.transitionEnd(() => {\n              if (!swiper || swiper.destroyed) return;\n              swiper.transitionEnd();\n            });\n          }, 0);\n        });\n      } else if (swiper.velocity) {\n        emit('_freeModeNoMomentumRelease');\n        swiper.updateProgress(newPosition);\n        swiper.setTransition(momentumDuration);\n        swiper.setTranslate(newPosition);\n        swiper.transitionStart(true, swiper.swipeDirection);\n\n        if (!swiper.animating) {\n          swiper.animating = true;\n          $wrapperEl.transitionEnd(() => {\n            if (!swiper || swiper.destroyed) return;\n            swiper.transitionEnd();\n          });\n        }\n      } else {\n        swiper.updateProgress(newPosition);\n      }\n\n      swiper.updateActiveIndex();\n      swiper.updateSlidesClasses();\n    } else if (params.freeMode.sticky) {\n      swiper.slideToClosest();\n      return;\n    } else if (params.freeMode) {\n      emit('_freeModeNoMomentumRelease');\n    }\n\n    if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {\n      swiper.updateProgress();\n      swiper.updateActiveIndex();\n      swiper.updateSlidesClasses();\n    }\n  }\n\n  Object.assign(swiper, {\n    freeMode: {\n      onTouchStart,\n      onTouchMove,\n      onTouchEnd\n    }\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/free-mode/free-mode.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/grid/grid.js":
/*!**************************************************!*\
  !*** ./node_modules/swiper/modules/grid/grid.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Grid)\n/* harmony export */ });\nfunction Grid({\n  swiper,\n  extendParams\n}) {\n  extendParams({\n    grid: {\n      rows: 1,\n      fill: 'column'\n    }\n  });\n  let slidesNumberEvenToRows;\n  let slidesPerRow;\n  let numFullColumns;\n\n  const initSlides = slidesLength => {\n    const {\n      slidesPerView\n    } = swiper.params;\n    const {\n      rows,\n      fill\n    } = swiper.params.grid;\n    slidesPerRow = slidesNumberEvenToRows / rows;\n    numFullColumns = Math.floor(slidesLength / rows);\n\n    if (Math.floor(slidesLength / rows) === slidesLength / rows) {\n      slidesNumberEvenToRows = slidesLength;\n    } else {\n      slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;\n    }\n\n    if (slidesPerView !== 'auto' && fill === 'row') {\n      slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);\n    }\n  };\n\n  const updateSlide = (i, slide, slidesLength, getDirectionLabel) => {\n    const {\n      slidesPerGroup,\n      spaceBetween\n    } = swiper.params;\n    const {\n      rows,\n      fill\n    } = swiper.params.grid; // Set slides order\n\n    let newSlideOrderIndex;\n    let column;\n    let row;\n\n    if (fill === 'row' && slidesPerGroup > 1) {\n      const groupIndex = Math.floor(i / (slidesPerGroup * rows));\n      const slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;\n      const columnsInGroup = groupIndex === 0 ? slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);\n      row = Math.floor(slideIndexInGroup / columnsInGroup);\n      column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;\n      newSlideOrderIndex = column + row * slidesNumberEvenToRows / rows;\n      slide.css({\n        '-webkit-order': newSlideOrderIndex,\n        order: newSlideOrderIndex\n      });\n    } else if (fill === 'column') {\n      column = Math.floor(i / rows);\n      row = i - column * rows;\n\n      if (column > numFullColumns || column === numFullColumns && row === rows - 1) {\n        row += 1;\n\n        if (row >= rows) {\n          row = 0;\n          column += 1;\n        }\n      }\n    } else {\n      row = Math.floor(i / slidesPerRow);\n      column = i - row * slidesPerRow;\n    }\n\n    slide.css(getDirectionLabel('margin-top'), row !== 0 ? spaceBetween && `${spaceBetween}px` : '');\n  };\n\n  const updateWrapperSize = (slideSize, snapGrid, getDirectionLabel) => {\n    const {\n      spaceBetween,\n      centeredSlides,\n      roundLengths\n    } = swiper.params;\n    const {\n      rows\n    } = swiper.params.grid;\n    swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;\n    swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;\n    swiper.$wrapperEl.css({\n      [getDirectionLabel('width')]: `${swiper.virtualSize + spaceBetween}px`\n    });\n\n    if (centeredSlides) {\n      snapGrid.splice(0, snapGrid.length);\n      const newSlidesGrid = [];\n\n      for (let i = 0; i < snapGrid.length; i += 1) {\n        let slidesGridItem = snapGrid[i];\n        if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);\n        if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);\n      }\n\n      snapGrid.push(...newSlidesGrid);\n    }\n  };\n\n  swiper.grid = {\n    initSlides,\n    updateSlide,\n    updateWrapperSize\n  };\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/grid/grid.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/hash-navigation/hash-navigation.js":
/*!************************************************************************!*\
  !*** ./node_modules/swiper/modules/hash-navigation/hash-navigation.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ HashNavigation)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n\n\nfunction HashNavigation({\n  swiper,\n  extendParams,\n  emit,\n  on\n}) {\n  let initialized = false;\n  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  extendParams({\n    hashNavigation: {\n      enabled: false,\n      replaceState: false,\n      watchState: false\n    }\n  });\n\n  const onHashChange = () => {\n    emit('hashChange');\n    const newHash = document.location.hash.replace('#', '');\n    const activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');\n\n    if (newHash !== activeSlideHash) {\n      const newIndex = swiper.$wrapperEl.children(`.${swiper.params.slideClass}[data-hash=\"${newHash}\"]`).index();\n      if (typeof newIndex === 'undefined') return;\n      swiper.slideTo(newIndex);\n    }\n  };\n\n  const setHash = () => {\n    if (!initialized || !swiper.params.hashNavigation.enabled) return;\n\n    if (swiper.params.hashNavigation.replaceState && window.history && window.history.replaceState) {\n      window.history.replaceState(null, null, `#${swiper.slides.eq(swiper.activeIndex).attr('data-hash')}` || '');\n      emit('hashSet');\n    } else {\n      const slide = swiper.slides.eq(swiper.activeIndex);\n      const hash = slide.attr('data-hash') || slide.attr('data-history');\n      document.location.hash = hash || '';\n      emit('hashSet');\n    }\n  };\n\n  const init = () => {\n    if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;\n    initialized = true;\n    const hash = document.location.hash.replace('#', '');\n\n    if (hash) {\n      const speed = 0;\n\n      for (let i = 0, length = swiper.slides.length; i < length; i += 1) {\n        const slide = swiper.slides.eq(i);\n        const slideHash = slide.attr('data-hash') || slide.attr('data-history');\n\n        if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {\n          const index = slide.index();\n          swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);\n        }\n      }\n    }\n\n    if (swiper.params.hashNavigation.watchState) {\n      (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(window).on('hashchange', onHashChange);\n    }\n  };\n\n  const destroy = () => {\n    if (swiper.params.hashNavigation.watchState) {\n      (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(window).off('hashchange', onHashChange);\n    }\n  };\n\n  on('init', () => {\n    if (swiper.params.hashNavigation.enabled) {\n      init();\n    }\n  });\n  on('destroy', () => {\n    if (swiper.params.hashNavigation.enabled) {\n      destroy();\n    }\n  });\n  on('transitionEnd _freeModeNoMomentumRelease', () => {\n    if (initialized) {\n      setHash();\n    }\n  });\n  on('slideChange', () => {\n    if (initialized && swiper.params.cssMode) {\n      setHash();\n    }\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/hash-navigation/hash-navigation.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/history/history.js":
/*!********************************************************!*\
  !*** ./node_modules/swiper/modules/history/history.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ History)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n\nfunction History({\n  swiper,\n  extendParams,\n  on\n}) {\n  extendParams({\n    history: {\n      enabled: false,\n      root: '',\n      replaceState: false,\n      key: 'slides',\n      keepQuery: false\n    }\n  });\n  let initialized = false;\n  let paths = {};\n\n  const slugify = text => {\n    return text.toString().replace(/\\s+/g, '-').replace(/[^\\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');\n  };\n\n  const getPathValues = urlOverride => {\n    const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n    let location;\n\n    if (urlOverride) {\n      location = new URL(urlOverride);\n    } else {\n      location = window.location;\n    }\n\n    const pathArray = location.pathname.slice(1).split('/').filter(part => part !== '');\n    const total = pathArray.length;\n    const key = pathArray[total - 2];\n    const value = pathArray[total - 1];\n    return {\n      key,\n      value\n    };\n  };\n\n  const setHistory = (key, index) => {\n    const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n    if (!initialized || !swiper.params.history.enabled) return;\n    let location;\n\n    if (swiper.params.url) {\n      location = new URL(swiper.params.url);\n    } else {\n      location = window.location;\n    }\n\n    const slide = swiper.slides.eq(index);\n    let value = slugify(slide.attr('data-history'));\n\n    if (swiper.params.history.root.length > 0) {\n      let root = swiper.params.history.root;\n      if (root[root.length - 1] === '/') root = root.slice(0, root.length - 1);\n      value = `${root}/${key}/${value}`;\n    } else if (!location.pathname.includes(key)) {\n      value = `${key}/${value}`;\n    }\n\n    if (swiper.params.history.keepQuery) {\n      value += location.search;\n    }\n\n    const currentState = window.history.state;\n\n    if (currentState && currentState.value === value) {\n      return;\n    }\n\n    if (swiper.params.history.replaceState) {\n      window.history.replaceState({\n        value\n      }, null, value);\n    } else {\n      window.history.pushState({\n        value\n      }, null, value);\n    }\n  };\n\n  const scrollToSlide = (speed, value, runCallbacks) => {\n    if (value) {\n      for (let i = 0, length = swiper.slides.length; i < length; i += 1) {\n        const slide = swiper.slides.eq(i);\n        const slideHistory = slugify(slide.attr('data-history'));\n\n        if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {\n          const index = slide.index();\n          swiper.slideTo(index, speed, runCallbacks);\n        }\n      }\n    } else {\n      swiper.slideTo(0, speed, runCallbacks);\n    }\n  };\n\n  const setHistoryPopState = () => {\n    paths = getPathValues(swiper.params.url);\n    scrollToSlide(swiper.params.speed, paths.value, false);\n  };\n\n  const init = () => {\n    const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n    if (!swiper.params.history) return;\n\n    if (!window.history || !window.history.pushState) {\n      swiper.params.history.enabled = false;\n      swiper.params.hashNavigation.enabled = true;\n      return;\n    }\n\n    initialized = true;\n    paths = getPathValues(swiper.params.url);\n    if (!paths.key && !paths.value) return;\n    scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);\n\n    if (!swiper.params.history.replaceState) {\n      window.addEventListener('popstate', setHistoryPopState);\n    }\n  };\n\n  const destroy = () => {\n    const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n\n    if (!swiper.params.history.replaceState) {\n      window.removeEventListener('popstate', setHistoryPopState);\n    }\n  };\n\n  on('init', () => {\n    if (swiper.params.history.enabled) {\n      init();\n    }\n  });\n  on('destroy', () => {\n    if (swiper.params.history.enabled) {\n      destroy();\n    }\n  });\n  on('transitionEnd _freeModeNoMomentumRelease', () => {\n    if (initialized) {\n      setHistory(swiper.params.history.key, swiper.activeIndex);\n    }\n  });\n  on('slideChange', () => {\n    if (initialized && swiper.params.cssMode) {\n      setHistory(swiper.params.history.key, swiper.activeIndex);\n    }\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/history/history.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/keyboard/keyboard.js":
/*!**********************************************************!*\
  !*** ./node_modules/swiper/modules/keyboard/keyboard.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Keyboard)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n/* eslint-disable consistent-return */\n\n\nfunction Keyboard({\n  swiper,\n  extendParams,\n  on,\n  emit\n}) {\n  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  swiper.keyboard = {\n    enabled: false\n  };\n  extendParams({\n    keyboard: {\n      enabled: false,\n      onlyInViewport: true,\n      pageUpDown: true\n    }\n  });\n\n  function handle(event) {\n    if (!swiper.enabled) return;\n    const {\n      rtlTranslate: rtl\n    } = swiper;\n    let e = event;\n    if (e.originalEvent) e = e.originalEvent; // jquery fix\n\n    const kc = e.keyCode || e.charCode;\n    const pageUpDown = swiper.params.keyboard.pageUpDown;\n    const isPageUp = pageUpDown && kc === 33;\n    const isPageDown = pageUpDown && kc === 34;\n    const isArrowLeft = kc === 37;\n    const isArrowRight = kc === 39;\n    const isArrowUp = kc === 38;\n    const isArrowDown = kc === 40; // Directions locks\n\n    if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {\n      return false;\n    }\n\n    if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {\n      return false;\n    }\n\n    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {\n      return undefined;\n    }\n\n    if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {\n      return undefined;\n    }\n\n    if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {\n      let inView = false; // Check that swiper should be inside of visible area of window\n\n      if (swiper.$el.parents(`.${swiper.params.slideClass}`).length > 0 && swiper.$el.parents(`.${swiper.params.slideActiveClass}`).length === 0) {\n        return undefined;\n      }\n\n      const $el = swiper.$el;\n      const swiperWidth = $el[0].clientWidth;\n      const swiperHeight = $el[0].clientHeight;\n      const windowWidth = window.innerWidth;\n      const windowHeight = window.innerHeight;\n      const swiperOffset = swiper.$el.offset();\n      if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;\n      const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiperWidth, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiperHeight], [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]];\n\n      for (let i = 0; i < swiperCoord.length; i += 1) {\n        const point = swiperCoord[i];\n\n        if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {\n          if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line\n\n          inView = true;\n        }\n      }\n\n      if (!inView) return undefined;\n    }\n\n    if (swiper.isHorizontal()) {\n      if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {\n        if (e.preventDefault) e.preventDefault();else e.returnValue = false;\n      }\n\n      if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext();\n      if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev();\n    } else {\n      if (isPageUp || isPageDown || isArrowUp || isArrowDown) {\n        if (e.preventDefault) e.preventDefault();else e.returnValue = false;\n      }\n\n      if (isPageDown || isArrowDown) swiper.slideNext();\n      if (isPageUp || isArrowUp) swiper.slidePrev();\n    }\n\n    emit('keyPress', kc);\n    return undefined;\n  }\n\n  function enable() {\n    if (swiper.keyboard.enabled) return;\n    (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(document).on('keydown', handle);\n    swiper.keyboard.enabled = true;\n  }\n\n  function disable() {\n    if (!swiper.keyboard.enabled) return;\n    (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(document).off('keydown', handle);\n    swiper.keyboard.enabled = false;\n  }\n\n  on('init', () => {\n    if (swiper.params.keyboard.enabled) {\n      enable();\n    }\n  });\n  on('destroy', () => {\n    if (swiper.keyboard.enabled) {\n      disable();\n    }\n  });\n  Object.assign(swiper.keyboard, {\n    enable,\n    disable\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/keyboard/keyboard.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/lazy/lazy.js":
/*!**************************************************!*\
  !*** ./node_modules/swiper/modules/lazy/lazy.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Lazy)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n\n\nfunction Lazy({\n  swiper,\n  extendParams,\n  on,\n  emit\n}) {\n  extendParams({\n    lazy: {\n      checkInView: false,\n      enabled: false,\n      loadPrevNext: false,\n      loadPrevNextAmount: 1,\n      loadOnTransitionStart: false,\n      scrollingElement: '',\n      elementClass: 'swiper-lazy',\n      loadingClass: 'swiper-lazy-loading',\n      loadedClass: 'swiper-lazy-loaded',\n      preloaderClass: 'swiper-lazy-preloader'\n    }\n  });\n  swiper.lazy = {};\n  let scrollHandlerAttached = false;\n  let initialImageLoaded = false;\n\n  function loadInSlide(index, loadInDuplicate = true) {\n    const params = swiper.params.lazy;\n    if (typeof index === 'undefined') return;\n    if (swiper.slides.length === 0) return;\n    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;\n    const $slideEl = isVirtual ? swiper.$wrapperEl.children(`.${swiper.params.slideClass}[data-swiper-slide-index=\"${index}\"]`) : swiper.slides.eq(index);\n    const $images = $slideEl.find(`.${params.elementClass}:not(.${params.loadedClass}):not(.${params.loadingClass})`);\n\n    if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {\n      $images.push($slideEl[0]);\n    }\n\n    if ($images.length === 0) return;\n    $images.each(imageEl => {\n      const $imageEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(imageEl);\n      $imageEl.addClass(params.loadingClass);\n      const background = $imageEl.attr('data-background');\n      const src = $imageEl.attr('data-src');\n      const srcset = $imageEl.attr('data-srcset');\n      const sizes = $imageEl.attr('data-sizes');\n      const $pictureEl = $imageEl.parent('picture');\n      swiper.loadImage($imageEl[0], src || background, srcset, sizes, false, () => {\n        if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper && !swiper.params || swiper.destroyed) return;\n\n        if (background) {\n          $imageEl.css('background-image', `url(\"${background}\")`);\n          $imageEl.removeAttr('data-background');\n        } else {\n          if (srcset) {\n            $imageEl.attr('srcset', srcset);\n            $imageEl.removeAttr('data-srcset');\n          }\n\n          if (sizes) {\n            $imageEl.attr('sizes', sizes);\n            $imageEl.removeAttr('data-sizes');\n          }\n\n          if ($pictureEl.length) {\n            $pictureEl.children('source').each(sourceEl => {\n              const $source = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(sourceEl);\n\n              if ($source.attr('data-srcset')) {\n                $source.attr('srcset', $source.attr('data-srcset'));\n                $source.removeAttr('data-srcset');\n              }\n            });\n          }\n\n          if (src) {\n            $imageEl.attr('src', src);\n            $imageEl.removeAttr('data-src');\n          }\n        }\n\n        $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);\n        $slideEl.find(`.${params.preloaderClass}`).remove();\n\n        if (swiper.params.loop && loadInDuplicate) {\n          const slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');\n\n          if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {\n            const originalSlide = swiper.$wrapperEl.children(`[data-swiper-slide-index=\"${slideOriginalIndex}\"]:not(.${swiper.params.slideDuplicateClass})`);\n            loadInSlide(originalSlide.index(), false);\n          } else {\n            const duplicatedSlide = swiper.$wrapperEl.children(`.${swiper.params.slideDuplicateClass}[data-swiper-slide-index=\"${slideOriginalIndex}\"]`);\n            loadInSlide(duplicatedSlide.index(), false);\n          }\n        }\n\n        emit('lazyImageReady', $slideEl[0], $imageEl[0]);\n\n        if (swiper.params.autoHeight) {\n          swiper.updateAutoHeight();\n        }\n      });\n      emit('lazyImageLoad', $slideEl[0], $imageEl[0]);\n    });\n  }\n\n  function load() {\n    const {\n      $wrapperEl,\n      params: swiperParams,\n      slides,\n      activeIndex\n    } = swiper;\n    const isVirtual = swiper.virtual && swiperParams.virtual.enabled;\n    const params = swiperParams.lazy;\n    let slidesPerView = swiperParams.slidesPerView;\n\n    if (slidesPerView === 'auto') {\n      slidesPerView = 0;\n    }\n\n    function slideExist(index) {\n      if (isVirtual) {\n        if ($wrapperEl.children(`.${swiperParams.slideClass}[data-swiper-slide-index=\"${index}\"]`).length) {\n          return true;\n        }\n      } else if (slides[index]) return true;\n\n      return false;\n    }\n\n    function slideIndex(slideEl) {\n      if (isVirtual) {\n        return (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(slideEl).attr('data-swiper-slide-index');\n      }\n\n      return (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(slideEl).index();\n    }\n\n    if (!initialImageLoaded) initialImageLoaded = true;\n\n    if (swiper.params.watchSlidesProgress) {\n      $wrapperEl.children(`.${swiperParams.slideVisibleClass}`).each(slideEl => {\n        const index = isVirtual ? (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(slideEl).attr('data-swiper-slide-index') : (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(slideEl).index();\n        loadInSlide(index);\n      });\n    } else if (slidesPerView > 1) {\n      for (let i = activeIndex; i < activeIndex + slidesPerView; i += 1) {\n        if (slideExist(i)) loadInSlide(i);\n      }\n    } else {\n      loadInSlide(activeIndex);\n    }\n\n    if (params.loadPrevNext) {\n      if (slidesPerView > 1 || params.loadPrevNextAmount && params.loadPrevNextAmount > 1) {\n        const amount = params.loadPrevNextAmount;\n        const spv = Math.ceil(slidesPerView);\n        const maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);\n        const minIndex = Math.max(activeIndex - Math.max(spv, amount), 0); // Next Slides\n\n        for (let i = activeIndex + spv; i < maxIndex; i += 1) {\n          if (slideExist(i)) loadInSlide(i);\n        } // Prev Slides\n\n\n        for (let i = minIndex; i < activeIndex; i += 1) {\n          if (slideExist(i)) loadInSlide(i);\n        }\n      } else {\n        const nextSlide = $wrapperEl.children(`.${swiperParams.slideNextClass}`);\n        if (nextSlide.length > 0) loadInSlide(slideIndex(nextSlide));\n        const prevSlide = $wrapperEl.children(`.${swiperParams.slidePrevClass}`);\n        if (prevSlide.length > 0) loadInSlide(slideIndex(prevSlide));\n      }\n    }\n  }\n\n  function checkInViewOnLoad() {\n    const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n    if (!swiper || swiper.destroyed) return;\n    const $scrollElement = swiper.params.lazy.scrollingElement ? (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(swiper.params.lazy.scrollingElement) : (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(window);\n    const isWindow = $scrollElement[0] === window;\n    const scrollElementWidth = isWindow ? window.innerWidth : $scrollElement[0].offsetWidth;\n    const scrollElementHeight = isWindow ? window.innerHeight : $scrollElement[0].offsetHeight;\n    const swiperOffset = swiper.$el.offset();\n    const {\n      rtlTranslate: rtl\n    } = swiper;\n    let inView = false;\n    if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;\n    const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiper.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiper.height], [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height]];\n\n    for (let i = 0; i < swiperCoord.length; i += 1) {\n      const point = swiperCoord[i];\n\n      if (point[0] >= 0 && point[0] <= scrollElementWidth && point[1] >= 0 && point[1] <= scrollElementHeight) {\n        if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line\n\n        inView = true;\n      }\n    }\n\n    const passiveListener = swiper.touchEvents.start === 'touchstart' && swiper.support.passiveListener && swiper.params.passiveListeners ? {\n      passive: true,\n      capture: false\n    } : false;\n\n    if (inView) {\n      load();\n      $scrollElement.off('scroll', checkInViewOnLoad, passiveListener);\n    } else if (!scrollHandlerAttached) {\n      scrollHandlerAttached = true;\n      $scrollElement.on('scroll', checkInViewOnLoad, passiveListener);\n    }\n  }\n\n  on('beforeInit', () => {\n    if (swiper.params.lazy.enabled && swiper.params.preloadImages) {\n      swiper.params.preloadImages = false;\n    }\n  });\n  on('init', () => {\n    if (swiper.params.lazy.enabled) {\n      if (swiper.params.lazy.checkInView) {\n        checkInViewOnLoad();\n      } else {\n        load();\n      }\n    }\n  });\n  on('scroll', () => {\n    if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.freeMode.sticky) {\n      load();\n    }\n  });\n  on('scrollbarDragMove resize _freeModeNoMomentumRelease', () => {\n    if (swiper.params.lazy.enabled) {\n      if (swiper.params.lazy.checkInView) {\n        checkInViewOnLoad();\n      } else {\n        load();\n      }\n    }\n  });\n  on('transitionStart', () => {\n    if (swiper.params.lazy.enabled) {\n      if (swiper.params.lazy.loadOnTransitionStart || !swiper.params.lazy.loadOnTransitionStart && !initialImageLoaded) {\n        if (swiper.params.lazy.checkInView) {\n          checkInViewOnLoad();\n        } else {\n          load();\n        }\n      }\n    }\n  });\n  on('transitionEnd', () => {\n    if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {\n      if (swiper.params.lazy.checkInView) {\n        checkInViewOnLoad();\n      } else {\n        load();\n      }\n    }\n  });\n  on('slideChange', () => {\n    const {\n      lazy,\n      cssMode,\n      watchSlidesProgress,\n      touchReleaseOnEdges,\n      resistanceRatio\n    } = swiper.params;\n\n    if (lazy.enabled && (cssMode || watchSlidesProgress && (touchReleaseOnEdges || resistanceRatio === 0))) {\n      load();\n    }\n  });\n  on('destroy', () => {\n    if (!swiper.$el) return;\n    swiper.$el.find(`.${swiper.params.lazy.loadingClass}`).removeClass(swiper.params.lazy.loadingClass);\n  });\n  Object.assign(swiper.lazy, {\n    load,\n    loadInSlide\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/lazy/lazy.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/manipulation/manipulation.js":
/*!******************************************************************!*\
  !*** ./node_modules/swiper/modules/manipulation/manipulation.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Manipulation)\n/* harmony export */ });\n/* harmony import */ var _methods_appendSlide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methods/appendSlide.js */ \"./node_modules/swiper/modules/manipulation/methods/appendSlide.js\");\n/* harmony import */ var _methods_prependSlide_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./methods/prependSlide.js */ \"./node_modules/swiper/modules/manipulation/methods/prependSlide.js\");\n/* harmony import */ var _methods_addSlide_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./methods/addSlide.js */ \"./node_modules/swiper/modules/manipulation/methods/addSlide.js\");\n/* harmony import */ var _methods_removeSlide_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./methods/removeSlide.js */ \"./node_modules/swiper/modules/manipulation/methods/removeSlide.js\");\n/* harmony import */ var _methods_removeAllSlides_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./methods/removeAllSlides.js */ \"./node_modules/swiper/modules/manipulation/methods/removeAllSlides.js\");\n\n\n\n\n\nfunction Manipulation({\n  swiper\n}) {\n  Object.assign(swiper, {\n    appendSlide: _methods_appendSlide_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].bind(swiper),\n    prependSlide: _methods_prependSlide_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].bind(swiper),\n    addSlide: _methods_addSlide_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].bind(swiper),\n    removeSlide: _methods_removeSlide_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].bind(swiper),\n    removeAllSlides: _methods_removeAllSlides_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"].bind(swiper)\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/manipulation/manipulation.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/manipulation/methods/addSlide.js":
/*!**********************************************************************!*\
  !*** ./node_modules/swiper/modules/manipulation/methods/addSlide.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ addSlide)\n/* harmony export */ });\nfunction addSlide(index, slides) {\n  const swiper = this;\n  const {\n    $wrapperEl,\n    params,\n    activeIndex\n  } = swiper;\n  let activeIndexBuffer = activeIndex;\n\n  if (params.loop) {\n    activeIndexBuffer -= swiper.loopedSlides;\n    swiper.loopDestroy();\n    swiper.slides = $wrapperEl.children(`.${params.slideClass}`);\n  }\n\n  const baseLength = swiper.slides.length;\n\n  if (index <= 0) {\n    swiper.prependSlide(slides);\n    return;\n  }\n\n  if (index >= baseLength) {\n    swiper.appendSlide(slides);\n    return;\n  }\n\n  let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;\n  const slidesBuffer = [];\n\n  for (let i = baseLength - 1; i >= index; i -= 1) {\n    const currentSlide = swiper.slides.eq(i);\n    currentSlide.remove();\n    slidesBuffer.unshift(currentSlide);\n  }\n\n  if (typeof slides === 'object' && 'length' in slides) {\n    for (let i = 0; i < slides.length; i += 1) {\n      if (slides[i]) $wrapperEl.append(slides[i]);\n    }\n\n    newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;\n  } else {\n    $wrapperEl.append(slides);\n  }\n\n  for (let i = 0; i < slidesBuffer.length; i += 1) {\n    $wrapperEl.append(slidesBuffer[i]);\n  }\n\n  if (params.loop) {\n    swiper.loopCreate();\n  }\n\n  if (!params.observer) {\n    swiper.update();\n  }\n\n  if (params.loop) {\n    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);\n  } else {\n    swiper.slideTo(newActiveIndex, 0, false);\n  }\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/manipulation/methods/addSlide.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/manipulation/methods/appendSlide.js":
/*!*************************************************************************!*\
  !*** ./node_modules/swiper/modules/manipulation/methods/appendSlide.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ appendSlide)\n/* harmony export */ });\nfunction appendSlide(slides) {\n  const swiper = this;\n  const {\n    $wrapperEl,\n    params\n  } = swiper;\n\n  if (params.loop) {\n    swiper.loopDestroy();\n  }\n\n  if (typeof slides === 'object' && 'length' in slides) {\n    for (let i = 0; i < slides.length; i += 1) {\n      if (slides[i]) $wrapperEl.append(slides[i]);\n    }\n  } else {\n    $wrapperEl.append(slides);\n  }\n\n  if (params.loop) {\n    swiper.loopCreate();\n  }\n\n  if (!params.observer) {\n    swiper.update();\n  }\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/manipulation/methods/appendSlide.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/manipulation/methods/prependSlide.js":
/*!**************************************************************************!*\
  !*** ./node_modules/swiper/modules/manipulation/methods/prependSlide.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ prependSlide)\n/* harmony export */ });\nfunction prependSlide(slides) {\n  const swiper = this;\n  const {\n    params,\n    $wrapperEl,\n    activeIndex\n  } = swiper;\n\n  if (params.loop) {\n    swiper.loopDestroy();\n  }\n\n  let newActiveIndex = activeIndex + 1;\n\n  if (typeof slides === 'object' && 'length' in slides) {\n    for (let i = 0; i < slides.length; i += 1) {\n      if (slides[i]) $wrapperEl.prepend(slides[i]);\n    }\n\n    newActiveIndex = activeIndex + slides.length;\n  } else {\n    $wrapperEl.prepend(slides);\n  }\n\n  if (params.loop) {\n    swiper.loopCreate();\n  }\n\n  if (!params.observer) {\n    swiper.update();\n  }\n\n  swiper.slideTo(newActiveIndex, 0, false);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/manipulation/methods/prependSlide.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/manipulation/methods/removeAllSlides.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/swiper/modules/manipulation/methods/removeAllSlides.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ removeAllSlides)\n/* harmony export */ });\nfunction removeAllSlides() {\n  const swiper = this;\n  const slidesIndexes = [];\n\n  for (let i = 0; i < swiper.slides.length; i += 1) {\n    slidesIndexes.push(i);\n  }\n\n  swiper.removeSlide(slidesIndexes);\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/manipulation/methods/removeAllSlides.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/manipulation/methods/removeSlide.js":
/*!*************************************************************************!*\
  !*** ./node_modules/swiper/modules/manipulation/methods/removeSlide.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ removeSlide)\n/* harmony export */ });\nfunction removeSlide(slidesIndexes) {\n  const swiper = this;\n  const {\n    params,\n    $wrapperEl,\n    activeIndex\n  } = swiper;\n  let activeIndexBuffer = activeIndex;\n\n  if (params.loop) {\n    activeIndexBuffer -= swiper.loopedSlides;\n    swiper.loopDestroy();\n    swiper.slides = $wrapperEl.children(`.${params.slideClass}`);\n  }\n\n  let newActiveIndex = activeIndexBuffer;\n  let indexToRemove;\n\n  if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {\n    for (let i = 0; i < slidesIndexes.length; i += 1) {\n      indexToRemove = slidesIndexes[i];\n      if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();\n      if (indexToRemove < newActiveIndex) newActiveIndex -= 1;\n    }\n\n    newActiveIndex = Math.max(newActiveIndex, 0);\n  } else {\n    indexToRemove = slidesIndexes;\n    if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();\n    if (indexToRemove < newActiveIndex) newActiveIndex -= 1;\n    newActiveIndex = Math.max(newActiveIndex, 0);\n  }\n\n  if (params.loop) {\n    swiper.loopCreate();\n  }\n\n  if (!params.observer) {\n    swiper.update();\n  }\n\n  if (params.loop) {\n    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);\n  } else {\n    swiper.slideTo(newActiveIndex, 0, false);\n  }\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/manipulation/methods/removeSlide.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/mousewheel/mousewheel.js":
/*!**************************************************************!*\
  !*** ./node_modules/swiper/modules/mousewheel/mousewheel.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Mousewheel)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n/* eslint-disable consistent-return */\n\n\n\nfunction Mousewheel({\n  swiper,\n  extendParams,\n  on,\n  emit\n}) {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  extendParams({\n    mousewheel: {\n      enabled: false,\n      releaseOnEdges: false,\n      invert: false,\n      forceToAxis: false,\n      sensitivity: 1,\n      eventsTarget: 'container',\n      thresholdDelta: null,\n      thresholdTime: null\n    }\n  });\n  swiper.mousewheel = {\n    enabled: false\n  };\n  let timeout;\n  let lastScrollTime = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)();\n  let lastEventBeforeSnap;\n  const recentWheelEvents = [];\n\n  function normalize(e) {\n    // Reasonable defaults\n    const PIXEL_STEP = 10;\n    const LINE_HEIGHT = 40;\n    const PAGE_HEIGHT = 800;\n    let sX = 0;\n    let sY = 0; // spinX, spinY\n\n    let pX = 0;\n    let pY = 0; // pixelX, pixelY\n    // Legacy\n\n    if ('detail' in e) {\n      sY = e.detail;\n    }\n\n    if ('wheelDelta' in e) {\n      sY = -e.wheelDelta / 120;\n    }\n\n    if ('wheelDeltaY' in e) {\n      sY = -e.wheelDeltaY / 120;\n    }\n\n    if ('wheelDeltaX' in e) {\n      sX = -e.wheelDeltaX / 120;\n    } // side scrolling on FF with DOMMouseScroll\n\n\n    if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {\n      sX = sY;\n      sY = 0;\n    }\n\n    pX = sX * PIXEL_STEP;\n    pY = sY * PIXEL_STEP;\n\n    if ('deltaY' in e) {\n      pY = e.deltaY;\n    }\n\n    if ('deltaX' in e) {\n      pX = e.deltaX;\n    }\n\n    if (e.shiftKey && !pX) {\n      // if user scrolls with shift he wants horizontal scroll\n      pX = pY;\n      pY = 0;\n    }\n\n    if ((pX || pY) && e.deltaMode) {\n      if (e.deltaMode === 1) {\n        // delta in LINE units\n        pX *= LINE_HEIGHT;\n        pY *= LINE_HEIGHT;\n      } else {\n        // delta in PAGE units\n        pX *= PAGE_HEIGHT;\n        pY *= PAGE_HEIGHT;\n      }\n    } // Fall-back if spin cannot be determined\n\n\n    if (pX && !sX) {\n      sX = pX < 1 ? -1 : 1;\n    }\n\n    if (pY && !sY) {\n      sY = pY < 1 ? -1 : 1;\n    }\n\n    return {\n      spinX: sX,\n      spinY: sY,\n      pixelX: pX,\n      pixelY: pY\n    };\n  }\n\n  function handleMouseEnter() {\n    if (!swiper.enabled) return;\n    swiper.mouseEntered = true;\n  }\n\n  function handleMouseLeave() {\n    if (!swiper.enabled) return;\n    swiper.mouseEntered = false;\n  }\n\n  function animateSlider(newEvent) {\n    if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {\n      // Prevent if delta of wheel scroll delta is below configured threshold\n      return false;\n    }\n\n    if (swiper.params.mousewheel.thresholdTime && (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {\n      // Prevent if time between scrolls is below configured threshold\n      return false;\n    } // If the movement is NOT big enough and\n    // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):\n    //   Don't go any further (avoid insignificant scroll movement).\n\n\n    if (newEvent.delta >= 6 && (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)() - lastScrollTime < 60) {\n      // Return false as a default\n      return true;\n    } // If user is scrolling towards the end:\n    //   If the slider hasn't hit the latest slide or\n    //   if the slider is a loop and\n    //   if the slider isn't moving right now:\n    //     Go to next slide and\n    //     emit a scroll event.\n    // Else (the user is scrolling towards the beginning) and\n    // if the slider hasn't hit the first slide or\n    // if the slider is a loop and\n    // if the slider isn't moving right now:\n    //   Go to prev slide and\n    //   emit a scroll event.\n\n\n    if (newEvent.direction < 0) {\n      if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {\n        swiper.slideNext();\n        emit('scroll', newEvent.raw);\n      }\n    } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {\n      swiper.slidePrev();\n      emit('scroll', newEvent.raw);\n    } // If you got here is because an animation has been triggered so store the current time\n\n\n    lastScrollTime = new window.Date().getTime(); // Return false as a default\n\n    return false;\n  }\n\n  function releaseScroll(newEvent) {\n    const params = swiper.params.mousewheel;\n\n    if (newEvent.direction < 0) {\n      if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {\n        // Return true to animate scroll on edges\n        return true;\n      }\n    } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {\n      // Return true to animate scroll on edges\n      return true;\n    }\n\n    return false;\n  }\n\n  function handle(event) {\n    let e = event;\n    let disableParentSwiper = true;\n    if (!swiper.enabled) return;\n    const params = swiper.params.mousewheel;\n\n    if (swiper.params.cssMode) {\n      e.preventDefault();\n    }\n\n    let target = swiper.$el;\n\n    if (swiper.params.mousewheel.eventsTarget !== 'container') {\n      target = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(swiper.params.mousewheel.eventsTarget);\n    }\n\n    if (!swiper.mouseEntered && !target[0].contains(e.target) && !params.releaseOnEdges) return true;\n    if (e.originalEvent) e = e.originalEvent; // jquery fix\n\n    let delta = 0;\n    const rtlFactor = swiper.rtlTranslate ? -1 : 1;\n    const data = normalize(e);\n\n    if (params.forceToAxis) {\n      if (swiper.isHorizontal()) {\n        if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;else return true;\n      } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;else return true;\n    } else {\n      delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;\n    }\n\n    if (delta === 0) return true;\n    if (params.invert) delta = -delta; // Get the scroll positions\n\n    let positions = swiper.getTranslate() + delta * params.sensitivity;\n    if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();\n    if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate(); // When loop is true:\n    //     the disableParentSwiper will be true.\n    // When loop is false:\n    //     if the scroll positions is not on edge,\n    //     then the disableParentSwiper will be true.\n    //     if the scroll on edge positions,\n    //     then the disableParentSwiper will be false.\n\n    disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());\n    if (disableParentSwiper && swiper.params.nested) e.stopPropagation();\n\n    if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {\n      // Register the new event in a variable which stores the relevant data\n      const newEvent = {\n        time: (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)(),\n        delta: Math.abs(delta),\n        direction: Math.sign(delta),\n        raw: event\n      }; // Keep the most recent events\n\n      if (recentWheelEvents.length >= 2) {\n        recentWheelEvents.shift(); // only store the last N events\n      }\n\n      const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;\n      recentWheelEvents.push(newEvent); // If there is at least one previous recorded event:\n      //   If direction has changed or\n      //   if the scroll is quicker than the previous one:\n      //     Animate the slider.\n      // Else (this is the first time the wheel is moved):\n      //     Animate the slider.\n\n      if (prevEvent) {\n        if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {\n          animateSlider(newEvent);\n        }\n      } else {\n        animateSlider(newEvent);\n      } // If it's time to release the scroll:\n      //   Return now so you don't hit the preventDefault.\n\n\n      if (releaseScroll(newEvent)) {\n        return true;\n      }\n    } else {\n      // Freemode or scrollContainer:\n      // If we recently snapped after a momentum scroll, then ignore wheel events\n      // to give time for the deceleration to finish. Stop ignoring after 500 msecs\n      // or if it's a new scroll (larger delta or inverse sign as last event before\n      // an end-of-momentum snap).\n      const newEvent = {\n        time: (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)(),\n        delta: Math.abs(delta),\n        direction: Math.sign(delta)\n      };\n      const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;\n\n      if (!ignoreWheelEvents) {\n        lastEventBeforeSnap = undefined;\n\n        if (swiper.params.loop) {\n          swiper.loopFix();\n        }\n\n        let position = swiper.getTranslate() + delta * params.sensitivity;\n        const wasBeginning = swiper.isBeginning;\n        const wasEnd = swiper.isEnd;\n        if (position >= swiper.minTranslate()) position = swiper.minTranslate();\n        if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();\n        swiper.setTransition(0);\n        swiper.setTranslate(position);\n        swiper.updateProgress();\n        swiper.updateActiveIndex();\n        swiper.updateSlidesClasses();\n\n        if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {\n          swiper.updateSlidesClasses();\n        }\n\n        if (swiper.params.freeMode.sticky) {\n          // When wheel scrolling starts with sticky (aka snap) enabled, then detect\n          // the end of a momentum scroll by storing recent (N=15?) wheel events.\n          // 1. do all N events have decreasing or same (absolute value) delta?\n          // 2. did all N events arrive in the last M (M=500?) msecs?\n          // 3. does the earliest event have an (absolute value) delta that's\n          //    at least P (P=1?) larger than the most recent event's delta?\n          // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?\n          // If 1-4 are \"yes\" then we're near the end of a momentum scroll deceleration.\n          // Snap immediately and ignore remaining wheel events in this scroll.\n          // See comment above for \"remaining wheel events in this scroll\" determination.\n          // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.\n          clearTimeout(timeout);\n          timeout = undefined;\n\n          if (recentWheelEvents.length >= 15) {\n            recentWheelEvents.shift(); // only store the last N events\n          }\n\n          const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;\n          const firstEvent = recentWheelEvents[0];\n          recentWheelEvents.push(newEvent);\n\n          if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) {\n            // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.\n            recentWheelEvents.splice(0);\n          } else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {\n            // We're at the end of the deceleration of a momentum scroll, so there's no need\n            // to wait for more events. Snap ASAP on the next tick.\n            // Also, because there's some remaining momentum we'll bias the snap in the\n            // direction of the ongoing scroll because it's better UX for the scroll to snap\n            // in the same direction as the scroll instead of reversing to snap.  Therefore,\n            // if it's already scrolled more than 20% in the current direction, keep going.\n            const snapToThreshold = delta > 0 ? 0.8 : 0.2;\n            lastEventBeforeSnap = newEvent;\n            recentWheelEvents.splice(0);\n            timeout = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.nextTick)(() => {\n              swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);\n            }, 0); // no delay; move on next tick\n          }\n\n          if (!timeout) {\n            // if we get here, then we haven't detected the end of a momentum scroll, so\n            // we'll consider a scroll \"complete\" when there haven't been any wheel events\n            // for 500ms.\n            timeout = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.nextTick)(() => {\n              const snapToThreshold = 0.5;\n              lastEventBeforeSnap = newEvent;\n              recentWheelEvents.splice(0);\n              swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);\n            }, 500);\n          }\n        } // Emit event\n\n\n        if (!ignoreWheelEvents) emit('scroll', e); // Stop autoplay\n\n        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop(); // Return page scroll on edge positions\n\n        if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;\n      }\n    }\n\n    if (e.preventDefault) e.preventDefault();else e.returnValue = false;\n    return false;\n  }\n\n  function events(method) {\n    let target = swiper.$el;\n\n    if (swiper.params.mousewheel.eventsTarget !== 'container') {\n      target = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(swiper.params.mousewheel.eventsTarget);\n    }\n\n    target[method]('mouseenter', handleMouseEnter);\n    target[method]('mouseleave', handleMouseLeave);\n    target[method]('wheel', handle);\n  }\n\n  function enable() {\n    if (swiper.params.cssMode) {\n      swiper.wrapperEl.removeEventListener('wheel', handle);\n      return true;\n    }\n\n    if (swiper.mousewheel.enabled) return false;\n    events('on');\n    swiper.mousewheel.enabled = true;\n    return true;\n  }\n\n  function disable() {\n    if (swiper.params.cssMode) {\n      swiper.wrapperEl.addEventListener(event, handle);\n      return true;\n    }\n\n    if (!swiper.mousewheel.enabled) return false;\n    events('off');\n    swiper.mousewheel.enabled = false;\n    return true;\n  }\n\n  on('init', () => {\n    if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {\n      disable();\n    }\n\n    if (swiper.params.mousewheel.enabled) enable();\n  });\n  on('destroy', () => {\n    if (swiper.params.cssMode) {\n      enable();\n    }\n\n    if (swiper.mousewheel.enabled) disable();\n  });\n  Object.assign(swiper.mousewheel, {\n    enable,\n    disable\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/mousewheel/mousewheel.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/navigation/navigation.js":
/*!**************************************************************!*\
  !*** ./node_modules/swiper/modules/navigation/navigation.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Navigation)\n/* harmony export */ });\n/* harmony import */ var _shared_create_element_if_not_defined_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/create-element-if-not-defined.js */ \"./node_modules/swiper/shared/create-element-if-not-defined.js\");\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n\n\nfunction Navigation({\n  swiper,\n  extendParams,\n  on,\n  emit\n}) {\n  extendParams({\n    navigation: {\n      nextEl: null,\n      prevEl: null,\n      hideOnClick: false,\n      disabledClass: 'swiper-button-disabled',\n      hiddenClass: 'swiper-button-hidden',\n      lockClass: 'swiper-button-lock',\n      navigationDisabledClass: 'swiper-navigation-disabled'\n    }\n  });\n  swiper.navigation = {\n    nextEl: null,\n    $nextEl: null,\n    prevEl: null,\n    $prevEl: null\n  };\n\n  function getEl(el) {\n    let $el;\n\n    if (el) {\n      $el = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(el);\n\n      if (swiper.params.uniqueNavElements && typeof el === 'string' && $el.length > 1 && swiper.$el.find(el).length === 1) {\n        $el = swiper.$el.find(el);\n      }\n    }\n\n    return $el;\n  }\n\n  function toggleEl($el, disabled) {\n    const params = swiper.params.navigation;\n\n    if ($el && $el.length > 0) {\n      $el[disabled ? 'addClass' : 'removeClass'](params.disabledClass);\n      if ($el[0] && $el[0].tagName === 'BUTTON') $el[0].disabled = disabled;\n\n      if (swiper.params.watchOverflow && swiper.enabled) {\n        $el[swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);\n      }\n    }\n  }\n\n  function update() {\n    // Update Navigation Buttons\n    if (swiper.params.loop) return;\n    const {\n      $nextEl,\n      $prevEl\n    } = swiper.navigation;\n    toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);\n    toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);\n  }\n\n  function onPrevClick(e) {\n    e.preventDefault();\n    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;\n    swiper.slidePrev();\n    emit('navigationPrev');\n  }\n\n  function onNextClick(e) {\n    e.preventDefault();\n    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;\n    swiper.slideNext();\n    emit('navigationNext');\n  }\n\n  function init() {\n    const params = swiper.params.navigation;\n    swiper.params.navigation = (0,_shared_create_element_if_not_defined_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(swiper, swiper.originalParams.navigation, swiper.params.navigation, {\n      nextEl: 'swiper-button-next',\n      prevEl: 'swiper-button-prev'\n    });\n    if (!(params.nextEl || params.prevEl)) return;\n    const $nextEl = getEl(params.nextEl);\n    const $prevEl = getEl(params.prevEl);\n\n    if ($nextEl && $nextEl.length > 0) {\n      $nextEl.on('click', onNextClick);\n    }\n\n    if ($prevEl && $prevEl.length > 0) {\n      $prevEl.on('click', onPrevClick);\n    }\n\n    Object.assign(swiper.navigation, {\n      $nextEl,\n      nextEl: $nextEl && $nextEl[0],\n      $prevEl,\n      prevEl: $prevEl && $prevEl[0]\n    });\n\n    if (!swiper.enabled) {\n      if ($nextEl) $nextEl.addClass(params.lockClass);\n      if ($prevEl) $prevEl.addClass(params.lockClass);\n    }\n  }\n\n  function destroy() {\n    const {\n      $nextEl,\n      $prevEl\n    } = swiper.navigation;\n\n    if ($nextEl && $nextEl.length) {\n      $nextEl.off('click', onNextClick);\n      $nextEl.removeClass(swiper.params.navigation.disabledClass);\n    }\n\n    if ($prevEl && $prevEl.length) {\n      $prevEl.off('click', onPrevClick);\n      $prevEl.removeClass(swiper.params.navigation.disabledClass);\n    }\n  }\n\n  on('init', () => {\n    if (swiper.params.navigation.enabled === false) {\n      // eslint-disable-next-line\n      disable();\n    } else {\n      init();\n      update();\n    }\n  });\n  on('toEdge fromEdge lock unlock', () => {\n    update();\n  });\n  on('destroy', () => {\n    destroy();\n  });\n  on('enable disable', () => {\n    const {\n      $nextEl,\n      $prevEl\n    } = swiper.navigation;\n\n    if ($nextEl) {\n      $nextEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);\n    }\n\n    if ($prevEl) {\n      $prevEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);\n    }\n  });\n  on('click', (_s, e) => {\n    const {\n      $nextEl,\n      $prevEl\n    } = swiper.navigation;\n    const targetEl = e.target;\n\n    if (swiper.params.navigation.hideOnClick && !(0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(targetEl).is($prevEl) && !(0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(targetEl).is($nextEl)) {\n      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;\n      let isHidden;\n\n      if ($nextEl) {\n        isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);\n      } else if ($prevEl) {\n        isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);\n      }\n\n      if (isHidden === true) {\n        emit('navigationShow');\n      } else {\n        emit('navigationHide');\n      }\n\n      if ($nextEl) {\n        $nextEl.toggleClass(swiper.params.navigation.hiddenClass);\n      }\n\n      if ($prevEl) {\n        $prevEl.toggleClass(swiper.params.navigation.hiddenClass);\n      }\n    }\n  });\n\n  const enable = () => {\n    swiper.$el.removeClass(swiper.params.navigation.navigationDisabledClass);\n    init();\n    update();\n  };\n\n  const disable = () => {\n    swiper.$el.addClass(swiper.params.navigation.navigationDisabledClass);\n    destroy();\n  };\n\n  Object.assign(swiper.navigation, {\n    enable,\n    disable,\n    update,\n    init,\n    destroy\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/navigation/navigation.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/pagination/pagination.js":
/*!**************************************************************!*\
  !*** ./node_modules/swiper/modules/pagination/pagination.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Pagination)\n/* harmony export */ });\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n/* harmony import */ var _shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/classes-to-selector.js */ \"./node_modules/swiper/shared/classes-to-selector.js\");\n/* harmony import */ var _shared_create_element_if_not_defined_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/create-element-if-not-defined.js */ \"./node_modules/swiper/shared/create-element-if-not-defined.js\");\n\n\n\nfunction Pagination({\n  swiper,\n  extendParams,\n  on,\n  emit\n}) {\n  const pfx = 'swiper-pagination';\n  extendParams({\n    pagination: {\n      el: null,\n      bulletElement: 'span',\n      clickable: false,\n      hideOnClick: false,\n      renderBullet: null,\n      renderProgressbar: null,\n      renderFraction: null,\n      renderCustom: null,\n      progressbarOpposite: false,\n      type: 'bullets',\n      // 'bullets' or 'progressbar' or 'fraction' or 'custom'\n      dynamicBullets: false,\n      dynamicMainBullets: 1,\n      formatFractionCurrent: number => number,\n      formatFractionTotal: number => number,\n      bulletClass: `${pfx}-bullet`,\n      bulletActiveClass: `${pfx}-bullet-active`,\n      modifierClass: `${pfx}-`,\n      currentClass: `${pfx}-current`,\n      totalClass: `${pfx}-total`,\n      hiddenClass: `${pfx}-hidden`,\n      progressbarFillClass: `${pfx}-progressbar-fill`,\n      progressbarOppositeClass: `${pfx}-progressbar-opposite`,\n      clickableClass: `${pfx}-clickable`,\n      lockClass: `${pfx}-lock`,\n      horizontalClass: `${pfx}-horizontal`,\n      verticalClass: `${pfx}-vertical`,\n      paginationDisabledClass: `${pfx}-disabled`\n    }\n  });\n  swiper.pagination = {\n    el: null,\n    $el: null,\n    bullets: []\n  };\n  let bulletSize;\n  let dynamicBulletIndex = 0;\n\n  function isPaginationDisabled() {\n    return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0;\n  }\n\n  function setSideBullets($bulletEl, position) {\n    const {\n      bulletActiveClass\n    } = swiper.params.pagination;\n    $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);\n  }\n\n  function update() {\n    // Render || Update Pagination bullets/items\n    const rtl = swiper.rtl;\n    const params = swiper.params.pagination;\n    if (isPaginationDisabled()) return;\n    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;\n    const $el = swiper.pagination.$el; // Current/Total\n\n    let current;\n    const total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;\n\n    if (swiper.params.loop) {\n      current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);\n\n      if (current > slidesLength - 1 - swiper.loopedSlides * 2) {\n        current -= slidesLength - swiper.loopedSlides * 2;\n      }\n\n      if (current > total - 1) current -= total;\n      if (current < 0 && swiper.params.paginationType !== 'bullets') current = total + current;\n    } else if (typeof swiper.snapIndex !== 'undefined') {\n      current = swiper.snapIndex;\n    } else {\n      current = swiper.activeIndex || 0;\n    } // Types\n\n\n    if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {\n      const bullets = swiper.pagination.bullets;\n      let firstIndex;\n      let lastIndex;\n      let midIndex;\n\n      if (params.dynamicBullets) {\n        bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);\n        $el.css(swiper.isHorizontal() ? 'width' : 'height', `${bulletSize * (params.dynamicMainBullets + 4)}px`);\n\n        if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {\n          dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);\n\n          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {\n            dynamicBulletIndex = params.dynamicMainBullets - 1;\n          } else if (dynamicBulletIndex < 0) {\n            dynamicBulletIndex = 0;\n          }\n        }\n\n        firstIndex = Math.max(current - dynamicBulletIndex, 0);\n        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);\n        midIndex = (lastIndex + firstIndex) / 2;\n      }\n\n      bullets.removeClass(['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(suffix => `${params.bulletActiveClass}${suffix}`).join(' '));\n\n      if ($el.length > 1) {\n        bullets.each(bullet => {\n          const $bullet = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(bullet);\n          const bulletIndex = $bullet.index();\n\n          if (bulletIndex === current) {\n            $bullet.addClass(params.bulletActiveClass);\n          }\n\n          if (params.dynamicBullets) {\n            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {\n              $bullet.addClass(`${params.bulletActiveClass}-main`);\n            }\n\n            if (bulletIndex === firstIndex) {\n              setSideBullets($bullet, 'prev');\n            }\n\n            if (bulletIndex === lastIndex) {\n              setSideBullets($bullet, 'next');\n            }\n          }\n        });\n      } else {\n        const $bullet = bullets.eq(current);\n        const bulletIndex = $bullet.index();\n        $bullet.addClass(params.bulletActiveClass);\n\n        if (params.dynamicBullets) {\n          const $firstDisplayedBullet = bullets.eq(firstIndex);\n          const $lastDisplayedBullet = bullets.eq(lastIndex);\n\n          for (let i = firstIndex; i <= lastIndex; i += 1) {\n            bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);\n          }\n\n          if (swiper.params.loop) {\n            if (bulletIndex >= bullets.length) {\n              for (let i = params.dynamicMainBullets; i >= 0; i -= 1) {\n                bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);\n              }\n\n              bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);\n            } else {\n              setSideBullets($firstDisplayedBullet, 'prev');\n              setSideBullets($lastDisplayedBullet, 'next');\n            }\n          } else {\n            setSideBullets($firstDisplayedBullet, 'prev');\n            setSideBullets($lastDisplayedBullet, 'next');\n          }\n        }\n      }\n\n      if (params.dynamicBullets) {\n        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);\n        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;\n        const offsetProp = rtl ? 'right' : 'left';\n        bullets.css(swiper.isHorizontal() ? offsetProp : 'top', `${bulletsOffset}px`);\n      }\n    }\n\n    if (params.type === 'fraction') {\n      $el.find((0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(params.currentClass)).text(params.formatFractionCurrent(current + 1));\n      $el.find((0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(params.totalClass)).text(params.formatFractionTotal(total));\n    }\n\n    if (params.type === 'progressbar') {\n      let progressbarDirection;\n\n      if (params.progressbarOpposite) {\n        progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';\n      } else {\n        progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';\n      }\n\n      const scale = (current + 1) / total;\n      let scaleX = 1;\n      let scaleY = 1;\n\n      if (progressbarDirection === 'horizontal') {\n        scaleX = scale;\n      } else {\n        scaleY = scale;\n      }\n\n      $el.find((0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);\n    }\n\n    if (params.type === 'custom' && params.renderCustom) {\n      $el.html(params.renderCustom(swiper, current + 1, total));\n      emit('paginationRender', $el[0]);\n    } else {\n      emit('paginationUpdate', $el[0]);\n    }\n\n    if (swiper.params.watchOverflow && swiper.enabled) {\n      $el[swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);\n    }\n  }\n\n  function render() {\n    // Render Container\n    const params = swiper.params.pagination;\n    if (isPaginationDisabled()) return;\n    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;\n    const $el = swiper.pagination.$el;\n    let paginationHTML = '';\n\n    if (params.type === 'bullets') {\n      let numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;\n\n      if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) {\n        numberOfBullets = slidesLength;\n      }\n\n      for (let i = 0; i < numberOfBullets; i += 1) {\n        if (params.renderBullet) {\n          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);\n        } else {\n          paginationHTML += `<${params.bulletElement} class=\"${params.bulletClass}\"></${params.bulletElement}>`;\n        }\n      }\n\n      $el.html(paginationHTML);\n      swiper.pagination.bullets = $el.find((0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(params.bulletClass));\n    }\n\n    if (params.type === 'fraction') {\n      if (params.renderFraction) {\n        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);\n      } else {\n        paginationHTML = `<span class=\"${params.currentClass}\"></span>` + ' / ' + `<span class=\"${params.totalClass}\"></span>`;\n      }\n\n      $el.html(paginationHTML);\n    }\n\n    if (params.type === 'progressbar') {\n      if (params.renderProgressbar) {\n        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);\n      } else {\n        paginationHTML = `<span class=\"${params.progressbarFillClass}\"></span>`;\n      }\n\n      $el.html(paginationHTML);\n    }\n\n    if (params.type !== 'custom') {\n      emit('paginationRender', swiper.pagination.$el[0]);\n    }\n  }\n\n  function init() {\n    swiper.params.pagination = (0,_shared_create_element_if_not_defined_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(swiper, swiper.originalParams.pagination, swiper.params.pagination, {\n      el: 'swiper-pagination'\n    });\n    const params = swiper.params.pagination;\n    if (!params.el) return;\n    let $el = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(params.el);\n    if ($el.length === 0) return;\n\n    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1) {\n      $el = swiper.$el.find(params.el); // check if it belongs to another nested Swiper\n\n      if ($el.length > 1) {\n        $el = $el.filter(el => {\n          if ((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(el).parents('.swiper')[0] !== swiper.el) return false;\n          return true;\n        });\n      }\n    }\n\n    if (params.type === 'bullets' && params.clickable) {\n      $el.addClass(params.clickableClass);\n    }\n\n    $el.addClass(params.modifierClass + params.type);\n    $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);\n\n    if (params.type === 'bullets' && params.dynamicBullets) {\n      $el.addClass(`${params.modifierClass}${params.type}-dynamic`);\n      dynamicBulletIndex = 0;\n\n      if (params.dynamicMainBullets < 1) {\n        params.dynamicMainBullets = 1;\n      }\n    }\n\n    if (params.type === 'progressbar' && params.progressbarOpposite) {\n      $el.addClass(params.progressbarOppositeClass);\n    }\n\n    if (params.clickable) {\n      $el.on('click', (0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(params.bulletClass), function onClick(e) {\n        e.preventDefault();\n        let index = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this).index() * swiper.params.slidesPerGroup;\n        if (swiper.params.loop) index += swiper.loopedSlides;\n        swiper.slideTo(index);\n      });\n    }\n\n    Object.assign(swiper.pagination, {\n      $el,\n      el: $el[0]\n    });\n\n    if (!swiper.enabled) {\n      $el.addClass(params.lockClass);\n    }\n  }\n\n  function destroy() {\n    const params = swiper.params.pagination;\n    if (isPaginationDisabled()) return;\n    const $el = swiper.pagination.$el;\n    $el.removeClass(params.hiddenClass);\n    $el.removeClass(params.modifierClass + params.type);\n    $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);\n    if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass) swiper.pagination.bullets.removeClass(params.bulletActiveClass);\n\n    if (params.clickable) {\n      $el.off('click', (0,_shared_classes_to_selector_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(params.bulletClass));\n    }\n  }\n\n  on('init', () => {\n    if (swiper.params.pagination.enabled === false) {\n      // eslint-disable-next-line\n      disable();\n    } else {\n      init();\n      render();\n      update();\n    }\n  });\n  on('activeIndexChange', () => {\n    if (swiper.params.loop) {\n      update();\n    } else if (typeof swiper.snapIndex === 'undefined') {\n      update();\n    }\n  });\n  on('snapIndexChange', () => {\n    if (!swiper.params.loop) {\n      update();\n    }\n  });\n  on('slidesLengthChange', () => {\n    if (swiper.params.loop) {\n      render();\n      update();\n    }\n  });\n  on('snapGridLengthChange', () => {\n    if (!swiper.params.loop) {\n      render();\n      update();\n    }\n  });\n  on('destroy', () => {\n    destroy();\n  });\n  on('enable disable', () => {\n    const {\n      $el\n    } = swiper.pagination;\n\n    if ($el) {\n      $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.pagination.lockClass);\n    }\n  });\n  on('lock unlock', () => {\n    update();\n  });\n  on('click', (_s, e) => {\n    const targetEl = e.target;\n    const {\n      $el\n    } = swiper.pagination;\n\n    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el && $el.length > 0 && !(0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(targetEl).hasClass(swiper.params.pagination.bulletClass)) {\n      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;\n      const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);\n\n      if (isHidden === true) {\n        emit('paginationShow');\n      } else {\n        emit('paginationHide');\n      }\n\n      $el.toggleClass(swiper.params.pagination.hiddenClass);\n    }\n  });\n\n  const enable = () => {\n    swiper.$el.removeClass(swiper.params.pagination.paginationDisabledClass);\n\n    if (swiper.pagination.$el) {\n      swiper.pagination.$el.removeClass(swiper.params.pagination.paginationDisabledClass);\n    }\n\n    init();\n    render();\n    update();\n  };\n\n  const disable = () => {\n    swiper.$el.addClass(swiper.params.pagination.paginationDisabledClass);\n\n    if (swiper.pagination.$el) {\n      swiper.pagination.$el.addClass(swiper.params.pagination.paginationDisabledClass);\n    }\n\n    destroy();\n  };\n\n  Object.assign(swiper.pagination, {\n    enable,\n    disable,\n    render,\n    update,\n    init,\n    destroy\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/pagination/pagination.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/parallax/parallax.js":
/*!**********************************************************!*\
  !*** ./node_modules/swiper/modules/parallax/parallax.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Parallax)\n/* harmony export */ });\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n\nfunction Parallax({\n  swiper,\n  extendParams,\n  on\n}) {\n  extendParams({\n    parallax: {\n      enabled: false\n    }\n  });\n\n  const setTransform = (el, progress) => {\n    const {\n      rtl\n    } = swiper;\n    const $el = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(el);\n    const rtlFactor = rtl ? -1 : 1;\n    const p = $el.attr('data-swiper-parallax') || '0';\n    let x = $el.attr('data-swiper-parallax-x');\n    let y = $el.attr('data-swiper-parallax-y');\n    const scale = $el.attr('data-swiper-parallax-scale');\n    const opacity = $el.attr('data-swiper-parallax-opacity');\n\n    if (x || y) {\n      x = x || '0';\n      y = y || '0';\n    } else if (swiper.isHorizontal()) {\n      x = p;\n      y = '0';\n    } else {\n      y = p;\n      x = '0';\n    }\n\n    if (x.indexOf('%') >= 0) {\n      x = `${parseInt(x, 10) * progress * rtlFactor}%`;\n    } else {\n      x = `${x * progress * rtlFactor}px`;\n    }\n\n    if (y.indexOf('%') >= 0) {\n      y = `${parseInt(y, 10) * progress}%`;\n    } else {\n      y = `${y * progress}px`;\n    }\n\n    if (typeof opacity !== 'undefined' && opacity !== null) {\n      const currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));\n      $el[0].style.opacity = currentOpacity;\n    }\n\n    if (typeof scale === 'undefined' || scale === null) {\n      $el.transform(`translate3d(${x}, ${y}, 0px)`);\n    } else {\n      const currentScale = scale - (scale - 1) * (1 - Math.abs(progress));\n      $el.transform(`translate3d(${x}, ${y}, 0px) scale(${currentScale})`);\n    }\n  };\n\n  const setTranslate = () => {\n    const {\n      $el,\n      slides,\n      progress,\n      snapGrid\n    } = swiper;\n    $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(el => {\n      setTransform(el, progress);\n    });\n    slides.each((slideEl, slideIndex) => {\n      let slideProgress = slideEl.progress;\n\n      if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {\n        slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);\n      }\n\n      slideProgress = Math.min(Math.max(slideProgress, -1), 1);\n      (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(el => {\n        setTransform(el, slideProgress);\n      });\n    });\n  };\n\n  const setTransition = (duration = swiper.params.speed) => {\n    const {\n      $el\n    } = swiper;\n    $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').each(parallaxEl => {\n      const $parallaxEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(parallaxEl);\n      let parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;\n      if (duration === 0) parallaxDuration = 0;\n      $parallaxEl.transition(parallaxDuration);\n    });\n  };\n\n  on('beforeInit', () => {\n    if (!swiper.params.parallax.enabled) return;\n    swiper.params.watchSlidesProgress = true;\n    swiper.originalParams.watchSlidesProgress = true;\n  });\n  on('init', () => {\n    if (!swiper.params.parallax.enabled) return;\n    setTranslate();\n  });\n  on('setTranslate', () => {\n    if (!swiper.params.parallax.enabled) return;\n    setTranslate();\n  });\n  on('setTransition', (_swiper, duration) => {\n    if (!swiper.params.parallax.enabled) return;\n    setTransition(duration);\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/parallax/parallax.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/scrollbar/scrollbar.js":
/*!************************************************************!*\
  !*** ./node_modules/swiper/modules/scrollbar/scrollbar.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Scrollbar)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n/* harmony import */ var _shared_create_element_if_not_defined_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/create-element-if-not-defined.js */ \"./node_modules/swiper/shared/create-element-if-not-defined.js\");\n\n\n\n\nfunction Scrollbar({\n  swiper,\n  extendParams,\n  on,\n  emit\n}) {\n  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n  let isTouched = false;\n  let timeout = null;\n  let dragTimeout = null;\n  let dragStartPos;\n  let dragSize;\n  let trackSize;\n  let divider;\n  extendParams({\n    scrollbar: {\n      el: null,\n      dragSize: 'auto',\n      hide: false,\n      draggable: false,\n      snapOnRelease: true,\n      lockClass: 'swiper-scrollbar-lock',\n      dragClass: 'swiper-scrollbar-drag',\n      scrollbarDisabledClass: 'swiper-scrollbar-disabled',\n      horizontalClass: `swiper-scrollbar-horizontal`,\n      verticalClass: `swiper-scrollbar-vertical`\n    }\n  });\n  swiper.scrollbar = {\n    el: null,\n    dragEl: null,\n    $el: null,\n    $dragEl: null\n  };\n\n  function setTranslate() {\n    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;\n    const {\n      scrollbar,\n      rtlTranslate: rtl,\n      progress\n    } = swiper;\n    const {\n      $dragEl,\n      $el\n    } = scrollbar;\n    const params = swiper.params.scrollbar;\n    let newSize = dragSize;\n    let newPos = (trackSize - dragSize) * progress;\n\n    if (rtl) {\n      newPos = -newPos;\n\n      if (newPos > 0) {\n        newSize = dragSize - newPos;\n        newPos = 0;\n      } else if (-newPos + dragSize > trackSize) {\n        newSize = trackSize + newPos;\n      }\n    } else if (newPos < 0) {\n      newSize = dragSize + newPos;\n      newPos = 0;\n    } else if (newPos + dragSize > trackSize) {\n      newSize = trackSize - newPos;\n    }\n\n    if (swiper.isHorizontal()) {\n      $dragEl.transform(`translate3d(${newPos}px, 0, 0)`);\n      $dragEl[0].style.width = `${newSize}px`;\n    } else {\n      $dragEl.transform(`translate3d(0px, ${newPos}px, 0)`);\n      $dragEl[0].style.height = `${newSize}px`;\n    }\n\n    if (params.hide) {\n      clearTimeout(timeout);\n      $el[0].style.opacity = 1;\n      timeout = setTimeout(() => {\n        $el[0].style.opacity = 0;\n        $el.transition(400);\n      }, 1000);\n    }\n  }\n\n  function setTransition(duration) {\n    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;\n    swiper.scrollbar.$dragEl.transition(duration);\n  }\n\n  function updateSize() {\n    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;\n    const {\n      scrollbar\n    } = swiper;\n    const {\n      $dragEl,\n      $el\n    } = scrollbar;\n    $dragEl[0].style.width = '';\n    $dragEl[0].style.height = '';\n    trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;\n    divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));\n\n    if (swiper.params.scrollbar.dragSize === 'auto') {\n      dragSize = trackSize * divider;\n    } else {\n      dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);\n    }\n\n    if (swiper.isHorizontal()) {\n      $dragEl[0].style.width = `${dragSize}px`;\n    } else {\n      $dragEl[0].style.height = `${dragSize}px`;\n    }\n\n    if (divider >= 1) {\n      $el[0].style.display = 'none';\n    } else {\n      $el[0].style.display = '';\n    }\n\n    if (swiper.params.scrollbar.hide) {\n      $el[0].style.opacity = 0;\n    }\n\n    if (swiper.params.watchOverflow && swiper.enabled) {\n      scrollbar.$el[swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);\n    }\n  }\n\n  function getPointerPosition(e) {\n    if (swiper.isHorizontal()) {\n      return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].clientX : e.clientX;\n    }\n\n    return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].clientY : e.clientY;\n  }\n\n  function setDragPosition(e) {\n    const {\n      scrollbar,\n      rtlTranslate: rtl\n    } = swiper;\n    const {\n      $el\n    } = scrollbar;\n    let positionRatio;\n    positionRatio = (getPointerPosition(e) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);\n    positionRatio = Math.max(Math.min(positionRatio, 1), 0);\n\n    if (rtl) {\n      positionRatio = 1 - positionRatio;\n    }\n\n    const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;\n    swiper.updateProgress(position);\n    swiper.setTranslate(position);\n    swiper.updateActiveIndex();\n    swiper.updateSlidesClasses();\n  }\n\n  function onDragStart(e) {\n    const params = swiper.params.scrollbar;\n    const {\n      scrollbar,\n      $wrapperEl\n    } = swiper;\n    const {\n      $el,\n      $dragEl\n    } = scrollbar;\n    isTouched = true;\n    dragStartPos = e.target === $dragEl[0] || e.target === $dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;\n    e.preventDefault();\n    e.stopPropagation();\n    $wrapperEl.transition(100);\n    $dragEl.transition(100);\n    setDragPosition(e);\n    clearTimeout(dragTimeout);\n    $el.transition(0);\n\n    if (params.hide) {\n      $el.css('opacity', 1);\n    }\n\n    if (swiper.params.cssMode) {\n      swiper.$wrapperEl.css('scroll-snap-type', 'none');\n    }\n\n    emit('scrollbarDragStart', e);\n  }\n\n  function onDragMove(e) {\n    const {\n      scrollbar,\n      $wrapperEl\n    } = swiper;\n    const {\n      $el,\n      $dragEl\n    } = scrollbar;\n    if (!isTouched) return;\n    if (e.preventDefault) e.preventDefault();else e.returnValue = false;\n    setDragPosition(e);\n    $wrapperEl.transition(0);\n    $el.transition(0);\n    $dragEl.transition(0);\n    emit('scrollbarDragMove', e);\n  }\n\n  function onDragEnd(e) {\n    const params = swiper.params.scrollbar;\n    const {\n      scrollbar,\n      $wrapperEl\n    } = swiper;\n    const {\n      $el\n    } = scrollbar;\n    if (!isTouched) return;\n    isTouched = false;\n\n    if (swiper.params.cssMode) {\n      swiper.$wrapperEl.css('scroll-snap-type', '');\n      $wrapperEl.transition('');\n    }\n\n    if (params.hide) {\n      clearTimeout(dragTimeout);\n      dragTimeout = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.nextTick)(() => {\n        $el.css('opacity', 0);\n        $el.transition(400);\n      }, 1000);\n    }\n\n    emit('scrollbarDragEnd', e);\n\n    if (params.snapOnRelease) {\n      swiper.slideToClosest();\n    }\n  }\n\n  function events(method) {\n    const {\n      scrollbar,\n      touchEventsTouch,\n      touchEventsDesktop,\n      params,\n      support\n    } = swiper;\n    const $el = scrollbar.$el;\n    if (!$el) return;\n    const target = $el[0];\n    const activeListener = support.passiveListener && params.passiveListeners ? {\n      passive: false,\n      capture: false\n    } : false;\n    const passiveListener = support.passiveListener && params.passiveListeners ? {\n      passive: true,\n      capture: false\n    } : false;\n    if (!target) return;\n    const eventMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';\n\n    if (!support.touch) {\n      target[eventMethod](touchEventsDesktop.start, onDragStart, activeListener);\n      document[eventMethod](touchEventsDesktop.move, onDragMove, activeListener);\n      document[eventMethod](touchEventsDesktop.end, onDragEnd, passiveListener);\n    } else {\n      target[eventMethod](touchEventsTouch.start, onDragStart, activeListener);\n      target[eventMethod](touchEventsTouch.move, onDragMove, activeListener);\n      target[eventMethod](touchEventsTouch.end, onDragEnd, passiveListener);\n    }\n  }\n\n  function enableDraggable() {\n    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;\n    events('on');\n  }\n\n  function disableDraggable() {\n    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;\n    events('off');\n  }\n\n  function init() {\n    const {\n      scrollbar,\n      $el: $swiperEl\n    } = swiper;\n    swiper.params.scrollbar = (0,_shared_create_element_if_not_defined_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {\n      el: 'swiper-scrollbar'\n    });\n    const params = swiper.params.scrollbar;\n    if (!params.el) return;\n    let $el = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(params.el);\n\n    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {\n      $el = $swiperEl.find(params.el);\n    }\n\n    $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);\n    let $dragEl = $el.find(`.${swiper.params.scrollbar.dragClass}`);\n\n    if ($dragEl.length === 0) {\n      $dragEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(`<div class=\"${swiper.params.scrollbar.dragClass}\"></div>`);\n      $el.append($dragEl);\n    }\n\n    Object.assign(scrollbar, {\n      $el,\n      el: $el[0],\n      $dragEl,\n      dragEl: $dragEl[0]\n    });\n\n    if (params.draggable) {\n      enableDraggable();\n    }\n\n    if ($el) {\n      $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.scrollbar.lockClass);\n    }\n  }\n\n  function destroy() {\n    const params = swiper.params.scrollbar;\n    const $el = swiper.scrollbar.$el;\n\n    if ($el) {\n      $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);\n    }\n\n    disableDraggable();\n  }\n\n  on('init', () => {\n    if (swiper.params.scrollbar.enabled === false) {\n      // eslint-disable-next-line\n      disable();\n    } else {\n      init();\n      updateSize();\n      setTranslate();\n    }\n  });\n  on('update resize observerUpdate lock unlock', () => {\n    updateSize();\n  });\n  on('setTranslate', () => {\n    setTranslate();\n  });\n  on('setTransition', (_s, duration) => {\n    setTransition(duration);\n  });\n  on('enable disable', () => {\n    const {\n      $el\n    } = swiper.scrollbar;\n\n    if ($el) {\n      $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.scrollbar.lockClass);\n    }\n  });\n  on('destroy', () => {\n    destroy();\n  });\n\n  const enable = () => {\n    swiper.$el.removeClass(swiper.params.scrollbar.scrollbarDisabledClass);\n\n    if (swiper.scrollbar.$el) {\n      swiper.scrollbar.$el.removeClass(swiper.params.scrollbar.scrollbarDisabledClass);\n    }\n\n    init();\n    updateSize();\n    setTranslate();\n  };\n\n  const disable = () => {\n    swiper.$el.addClass(swiper.params.scrollbar.scrollbarDisabledClass);\n\n    if (swiper.scrollbar.$el) {\n      swiper.scrollbar.$el.addClass(swiper.params.scrollbar.scrollbarDisabledClass);\n    }\n\n    destroy();\n  };\n\n  Object.assign(swiper.scrollbar, {\n    enable,\n    disable,\n    updateSize,\n    setTranslate,\n    init,\n    destroy\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/scrollbar/scrollbar.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/thumbs/thumbs.js":
/*!******************************************************!*\
  !*** ./node_modules/swiper/modules/thumbs/thumbs.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Thumb)\n/* harmony export */ });\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n\n\nfunction Thumb({\n  swiper,\n  extendParams,\n  on\n}) {\n  extendParams({\n    thumbs: {\n      swiper: null,\n      multipleActiveThumbs: true,\n      autoScrollOffset: 0,\n      slideThumbActiveClass: 'swiper-slide-thumb-active',\n      thumbsContainerClass: 'swiper-thumbs'\n    }\n  });\n  let initialized = false;\n  let swiperCreated = false;\n  swiper.thumbs = {\n    swiper: null\n  };\n\n  function onThumbClick() {\n    const thumbsSwiper = swiper.thumbs.swiper;\n    if (!thumbsSwiper || thumbsSwiper.destroyed) return;\n    const clickedIndex = thumbsSwiper.clickedIndex;\n    const clickedSlide = thumbsSwiper.clickedSlide;\n    if (clickedSlide && (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;\n    if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;\n    let slideToIndex;\n\n    if (thumbsSwiper.params.loop) {\n      slideToIndex = parseInt((0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);\n    } else {\n      slideToIndex = clickedIndex;\n    }\n\n    if (swiper.params.loop) {\n      let currentIndex = swiper.activeIndex;\n\n      if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {\n        swiper.loopFix(); // eslint-disable-next-line\n\n        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;\n        currentIndex = swiper.activeIndex;\n      }\n\n      const prevIndex = swiper.slides.eq(currentIndex).prevAll(`[data-swiper-slide-index=\"${slideToIndex}\"]`).eq(0).index();\n      const nextIndex = swiper.slides.eq(currentIndex).nextAll(`[data-swiper-slide-index=\"${slideToIndex}\"]`).eq(0).index();\n      if (typeof prevIndex === 'undefined') slideToIndex = nextIndex;else if (typeof nextIndex === 'undefined') slideToIndex = prevIndex;else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex;else slideToIndex = prevIndex;\n    }\n\n    swiper.slideTo(slideToIndex);\n  }\n\n  function init() {\n    const {\n      thumbs: thumbsParams\n    } = swiper.params;\n    if (initialized) return false;\n    initialized = true;\n    const SwiperClass = swiper.constructor;\n\n    if (thumbsParams.swiper instanceof SwiperClass) {\n      swiper.thumbs.swiper = thumbsParams.swiper;\n      Object.assign(swiper.thumbs.swiper.originalParams, {\n        watchSlidesProgress: true,\n        slideToClickedSlide: false\n      });\n      Object.assign(swiper.thumbs.swiper.params, {\n        watchSlidesProgress: true,\n        slideToClickedSlide: false\n      });\n    } else if ((0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(thumbsParams.swiper)) {\n      const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);\n      Object.assign(thumbsSwiperParams, {\n        watchSlidesProgress: true,\n        slideToClickedSlide: false\n      });\n      swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);\n      swiperCreated = true;\n    }\n\n    swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);\n    swiper.thumbs.swiper.on('tap', onThumbClick);\n    return true;\n  }\n\n  function update(initial) {\n    const thumbsSwiper = swiper.thumbs.swiper;\n    if (!thumbsSwiper || thumbsSwiper.destroyed) return;\n    const slidesPerView = thumbsSwiper.params.slidesPerView === 'auto' ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView; // Activate thumbs\n\n    let thumbsToActivate = 1;\n    const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;\n\n    if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {\n      thumbsToActivate = swiper.params.slidesPerView;\n    }\n\n    if (!swiper.params.thumbs.multipleActiveThumbs) {\n      thumbsToActivate = 1;\n    }\n\n    thumbsToActivate = Math.floor(thumbsToActivate);\n    thumbsSwiper.slides.removeClass(thumbActiveClass);\n\n    if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) {\n      for (let i = 0; i < thumbsToActivate; i += 1) {\n        thumbsSwiper.$wrapperEl.children(`[data-swiper-slide-index=\"${swiper.realIndex + i}\"]`).addClass(thumbActiveClass);\n      }\n    } else {\n      for (let i = 0; i < thumbsToActivate; i += 1) {\n        thumbsSwiper.slides.eq(swiper.realIndex + i).addClass(thumbActiveClass);\n      }\n    }\n\n    const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;\n    const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;\n\n    if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {\n      let currentThumbsIndex = thumbsSwiper.activeIndex;\n      let newThumbsIndex;\n      let direction;\n\n      if (thumbsSwiper.params.loop) {\n        if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {\n          thumbsSwiper.loopFix(); // eslint-disable-next-line\n\n          thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;\n          currentThumbsIndex = thumbsSwiper.activeIndex;\n        } // Find actual thumbs index to slide to\n\n\n        const prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll(`[data-swiper-slide-index=\"${swiper.realIndex}\"]`).eq(0).index();\n        const nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll(`[data-swiper-slide-index=\"${swiper.realIndex}\"]`).eq(0).index();\n\n        if (typeof prevThumbsIndex === 'undefined') {\n          newThumbsIndex = nextThumbsIndex;\n        } else if (typeof nextThumbsIndex === 'undefined') {\n          newThumbsIndex = prevThumbsIndex;\n        } else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) {\n          newThumbsIndex = thumbsSwiper.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex;\n        } else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) {\n          newThumbsIndex = nextThumbsIndex;\n        } else {\n          newThumbsIndex = prevThumbsIndex;\n        }\n\n        direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';\n      } else {\n        newThumbsIndex = swiper.realIndex;\n        direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';\n      }\n\n      if (useOffset) {\n        newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;\n      }\n\n      if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {\n        if (thumbsSwiper.params.centeredSlides) {\n          if (newThumbsIndex > currentThumbsIndex) {\n            newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;\n          } else {\n            newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;\n          }\n        } else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) {// newThumbsIndex = newThumbsIndex - slidesPerView + 1;\n        }\n\n        thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);\n      }\n    }\n  }\n\n  on('beforeInit', () => {\n    const {\n      thumbs\n    } = swiper.params;\n    if (!thumbs || !thumbs.swiper) return;\n    init();\n    update(true);\n  });\n  on('slideChange update resize observerUpdate', () => {\n    update();\n  });\n  on('setTransition', (_s, duration) => {\n    const thumbsSwiper = swiper.thumbs.swiper;\n    if (!thumbsSwiper || thumbsSwiper.destroyed) return;\n    thumbsSwiper.setTransition(duration);\n  });\n  on('beforeDestroy', () => {\n    const thumbsSwiper = swiper.thumbs.swiper;\n    if (!thumbsSwiper || thumbsSwiper.destroyed) return;\n\n    if (swiperCreated) {\n      thumbsSwiper.destroy();\n    }\n  });\n  Object.assign(swiper.thumbs, {\n    init,\n    update\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/thumbs/thumbs.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/virtual/virtual.js":
/*!********************************************************!*\
  !*** ./node_modules/swiper/modules/virtual/virtual.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Virtual)\n/* harmony export */ });\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n\n\nfunction Virtual({\n  swiper,\n  extendParams,\n  on,\n  emit\n}) {\n  extendParams({\n    virtual: {\n      enabled: false,\n      slides: [],\n      cache: true,\n      renderSlide: null,\n      renderExternal: null,\n      renderExternalUpdate: true,\n      addSlidesBefore: 0,\n      addSlidesAfter: 0\n    }\n  });\n  let cssModeTimeout;\n  swiper.virtual = {\n    cache: {},\n    from: undefined,\n    to: undefined,\n    slides: [],\n    offset: 0,\n    slidesGrid: []\n  };\n\n  function renderSlide(slide, index) {\n    const params = swiper.params.virtual;\n\n    if (params.cache && swiper.virtual.cache[index]) {\n      return swiper.virtual.cache[index];\n    }\n\n    const $slideEl = params.renderSlide ? (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(params.renderSlide.call(swiper, slide, index)) : (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(`<div class=\"${swiper.params.slideClass}\" data-swiper-slide-index=\"${index}\">${slide}</div>`);\n    if (!$slideEl.attr('data-swiper-slide-index')) $slideEl.attr('data-swiper-slide-index', index);\n    if (params.cache) swiper.virtual.cache[index] = $slideEl;\n    return $slideEl;\n  }\n\n  function update(force) {\n    const {\n      slidesPerView,\n      slidesPerGroup,\n      centeredSlides\n    } = swiper.params;\n    const {\n      addSlidesBefore,\n      addSlidesAfter\n    } = swiper.params.virtual;\n    const {\n      from: previousFrom,\n      to: previousTo,\n      slides,\n      slidesGrid: previousSlidesGrid,\n      offset: previousOffset\n    } = swiper.virtual;\n\n    if (!swiper.params.cssMode) {\n      swiper.updateActiveIndex();\n    }\n\n    const activeIndex = swiper.activeIndex || 0;\n    let offsetProp;\n    if (swiper.rtlTranslate) offsetProp = 'right';else offsetProp = swiper.isHorizontal() ? 'left' : 'top';\n    let slidesAfter;\n    let slidesBefore;\n\n    if (centeredSlides) {\n      slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;\n      slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;\n    } else {\n      slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;\n      slidesBefore = slidesPerGroup + addSlidesBefore;\n    }\n\n    const from = Math.max((activeIndex || 0) - slidesBefore, 0);\n    const to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);\n    const offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);\n    Object.assign(swiper.virtual, {\n      from,\n      to,\n      offset,\n      slidesGrid: swiper.slidesGrid\n    });\n\n    function onRendered() {\n      swiper.updateSlides();\n      swiper.updateProgress();\n      swiper.updateSlidesClasses();\n\n      if (swiper.lazy && swiper.params.lazy.enabled) {\n        swiper.lazy.load();\n      }\n\n      emit('virtualUpdate');\n    }\n\n    if (previousFrom === from && previousTo === to && !force) {\n      if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {\n        swiper.slides.css(offsetProp, `${offset}px`);\n      }\n\n      swiper.updateProgress();\n      emit('virtualUpdate');\n      return;\n    }\n\n    if (swiper.params.virtual.renderExternal) {\n      swiper.params.virtual.renderExternal.call(swiper, {\n        offset,\n        from,\n        to,\n        slides: function getSlides() {\n          const slidesToRender = [];\n\n          for (let i = from; i <= to; i += 1) {\n            slidesToRender.push(slides[i]);\n          }\n\n          return slidesToRender;\n        }()\n      });\n\n      if (swiper.params.virtual.renderExternalUpdate) {\n        onRendered();\n      } else {\n        emit('virtualUpdate');\n      }\n\n      return;\n    }\n\n    const prependIndexes = [];\n    const appendIndexes = [];\n\n    if (force) {\n      swiper.$wrapperEl.find(`.${swiper.params.slideClass}`).remove();\n    } else {\n      for (let i = previousFrom; i <= previousTo; i += 1) {\n        if (i < from || i > to) {\n          swiper.$wrapperEl.find(`.${swiper.params.slideClass}[data-swiper-slide-index=\"${i}\"]`).remove();\n        }\n      }\n    }\n\n    for (let i = 0; i < slides.length; i += 1) {\n      if (i >= from && i <= to) {\n        if (typeof previousTo === 'undefined' || force) {\n          appendIndexes.push(i);\n        } else {\n          if (i > previousTo) appendIndexes.push(i);\n          if (i < previousFrom) prependIndexes.push(i);\n        }\n      }\n    }\n\n    appendIndexes.forEach(index => {\n      swiper.$wrapperEl.append(renderSlide(slides[index], index));\n    });\n    prependIndexes.sort((a, b) => b - a).forEach(index => {\n      swiper.$wrapperEl.prepend(renderSlide(slides[index], index));\n    });\n    swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, `${offset}px`);\n    onRendered();\n  }\n\n  function appendSlide(slides) {\n    if (typeof slides === 'object' && 'length' in slides) {\n      for (let i = 0; i < slides.length; i += 1) {\n        if (slides[i]) swiper.virtual.slides.push(slides[i]);\n      }\n    } else {\n      swiper.virtual.slides.push(slides);\n    }\n\n    update(true);\n  }\n\n  function prependSlide(slides) {\n    const activeIndex = swiper.activeIndex;\n    let newActiveIndex = activeIndex + 1;\n    let numberOfNewSlides = 1;\n\n    if (Array.isArray(slides)) {\n      for (let i = 0; i < slides.length; i += 1) {\n        if (slides[i]) swiper.virtual.slides.unshift(slides[i]);\n      }\n\n      newActiveIndex = activeIndex + slides.length;\n      numberOfNewSlides = slides.length;\n    } else {\n      swiper.virtual.slides.unshift(slides);\n    }\n\n    if (swiper.params.virtual.cache) {\n      const cache = swiper.virtual.cache;\n      const newCache = {};\n      Object.keys(cache).forEach(cachedIndex => {\n        const $cachedEl = cache[cachedIndex];\n        const cachedElIndex = $cachedEl.attr('data-swiper-slide-index');\n\n        if (cachedElIndex) {\n          $cachedEl.attr('data-swiper-slide-index', parseInt(cachedElIndex, 10) + numberOfNewSlides);\n        }\n\n        newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;\n      });\n      swiper.virtual.cache = newCache;\n    }\n\n    update(true);\n    swiper.slideTo(newActiveIndex, 0);\n  }\n\n  function removeSlide(slidesIndexes) {\n    if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;\n    let activeIndex = swiper.activeIndex;\n\n    if (Array.isArray(slidesIndexes)) {\n      for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {\n        swiper.virtual.slides.splice(slidesIndexes[i], 1);\n\n        if (swiper.params.virtual.cache) {\n          delete swiper.virtual.cache[slidesIndexes[i]];\n        }\n\n        if (slidesIndexes[i] < activeIndex) activeIndex -= 1;\n        activeIndex = Math.max(activeIndex, 0);\n      }\n    } else {\n      swiper.virtual.slides.splice(slidesIndexes, 1);\n\n      if (swiper.params.virtual.cache) {\n        delete swiper.virtual.cache[slidesIndexes];\n      }\n\n      if (slidesIndexes < activeIndex) activeIndex -= 1;\n      activeIndex = Math.max(activeIndex, 0);\n    }\n\n    update(true);\n    swiper.slideTo(activeIndex, 0);\n  }\n\n  function removeAllSlides() {\n    swiper.virtual.slides = [];\n\n    if (swiper.params.virtual.cache) {\n      swiper.virtual.cache = {};\n    }\n\n    update(true);\n    swiper.slideTo(0, 0);\n  }\n\n  on('beforeInit', () => {\n    if (!swiper.params.virtual.enabled) return;\n    swiper.virtual.slides = swiper.params.virtual.slides;\n    swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);\n    swiper.params.watchSlidesProgress = true;\n    swiper.originalParams.watchSlidesProgress = true;\n\n    if (!swiper.params.initialSlide) {\n      update();\n    }\n  });\n  on('setTranslate', () => {\n    if (!swiper.params.virtual.enabled) return;\n\n    if (swiper.params.cssMode && !swiper._immediateVirtual) {\n      clearTimeout(cssModeTimeout);\n      cssModeTimeout = setTimeout(() => {\n        update();\n      }, 100);\n    } else {\n      update();\n    }\n  });\n  on('init update resize', () => {\n    if (!swiper.params.virtual.enabled) return;\n\n    if (swiper.params.cssMode) {\n      (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_1__.setCSSProperty)(swiper.wrapperEl, '--swiper-virtual-size', `${swiper.virtualSize}px`);\n    }\n  });\n  Object.assign(swiper.virtual, {\n    appendSlide,\n    prependSlide,\n    removeSlide,\n    removeAllSlides,\n    update\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/virtual/virtual.js?");

/***/ }),

/***/ "./node_modules/swiper/modules/zoom/zoom.js":
/*!**************************************************!*\
  !*** ./node_modules/swiper/modules/zoom/zoom.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Zoom)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n/* harmony import */ var _shared_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dom.js */ \"./node_modules/swiper/shared/dom.js\");\n/* harmony import */ var _shared_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utils.js */ \"./node_modules/swiper/shared/utils.js\");\n\n\n\nfunction Zoom({\n  swiper,\n  extendParams,\n  on,\n  emit\n}) {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  extendParams({\n    zoom: {\n      enabled: false,\n      maxRatio: 3,\n      minRatio: 1,\n      toggle: true,\n      containerClass: 'swiper-zoom-container',\n      zoomedSlideClass: 'swiper-slide-zoomed'\n    }\n  });\n  swiper.zoom = {\n    enabled: false\n  };\n  let currentScale = 1;\n  let isScaling = false;\n  let gesturesEnabled;\n  let fakeGestureTouched;\n  let fakeGestureMoved;\n  const gesture = {\n    $slideEl: undefined,\n    slideWidth: undefined,\n    slideHeight: undefined,\n    $imageEl: undefined,\n    $imageWrapEl: undefined,\n    maxRatio: 3\n  };\n  const image = {\n    isTouched: undefined,\n    isMoved: undefined,\n    currentX: undefined,\n    currentY: undefined,\n    minX: undefined,\n    minY: undefined,\n    maxX: undefined,\n    maxY: undefined,\n    width: undefined,\n    height: undefined,\n    startX: undefined,\n    startY: undefined,\n    touchesStart: {},\n    touchesCurrent: {}\n  };\n  const velocity = {\n    x: undefined,\n    y: undefined,\n    prevPositionX: undefined,\n    prevPositionY: undefined,\n    prevTime: undefined\n  };\n  let scale = 1;\n  Object.defineProperty(swiper.zoom, 'scale', {\n    get() {\n      return scale;\n    },\n\n    set(value) {\n      if (scale !== value) {\n        const imageEl = gesture.$imageEl ? gesture.$imageEl[0] : undefined;\n        const slideEl = gesture.$slideEl ? gesture.$slideEl[0] : undefined;\n        emit('zoomChange', value, imageEl, slideEl);\n      }\n\n      scale = value;\n    }\n\n  });\n\n  function getDistanceBetweenTouches(e) {\n    if (e.targetTouches.length < 2) return 1;\n    const x1 = e.targetTouches[0].pageX;\n    const y1 = e.targetTouches[0].pageY;\n    const x2 = e.targetTouches[1].pageX;\n    const y2 = e.targetTouches[1].pageY;\n    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);\n    return distance;\n  } // Events\n\n\n  function onGestureStart(e) {\n    const support = swiper.support;\n    const params = swiper.params.zoom;\n    fakeGestureTouched = false;\n    fakeGestureMoved = false;\n\n    if (!support.gestures) {\n      if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {\n        return;\n      }\n\n      fakeGestureTouched = true;\n      gesture.scaleStart = getDistanceBetweenTouches(e);\n    }\n\n    if (!gesture.$slideEl || !gesture.$slideEl.length) {\n      gesture.$slideEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(e.target).closest(`.${swiper.params.slideClass}`);\n      if (gesture.$slideEl.length === 0) gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);\n      gesture.$imageEl = gesture.$slideEl.find(`.${params.containerClass}`).eq(0).find('picture, img, svg, canvas, .swiper-zoom-target').eq(0);\n      gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);\n      gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;\n\n      if (gesture.$imageWrapEl.length === 0) {\n        gesture.$imageEl = undefined;\n        return;\n      }\n    }\n\n    if (gesture.$imageEl) {\n      gesture.$imageEl.transition(0);\n    }\n\n    isScaling = true;\n  }\n\n  function onGestureChange(e) {\n    const support = swiper.support;\n    const params = swiper.params.zoom;\n    const zoom = swiper.zoom;\n\n    if (!support.gestures) {\n      if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {\n        return;\n      }\n\n      fakeGestureMoved = true;\n      gesture.scaleMove = getDistanceBetweenTouches(e);\n    }\n\n    if (!gesture.$imageEl || gesture.$imageEl.length === 0) {\n      if (e.type === 'gesturechange') onGestureStart(e);\n      return;\n    }\n\n    if (support.gestures) {\n      zoom.scale = e.scale * currentScale;\n    } else {\n      zoom.scale = gesture.scaleMove / gesture.scaleStart * currentScale;\n    }\n\n    if (zoom.scale > gesture.maxRatio) {\n      zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;\n    }\n\n    if (zoom.scale < params.minRatio) {\n      zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;\n    }\n\n    gesture.$imageEl.transform(`translate3d(0,0,0) scale(${zoom.scale})`);\n  }\n\n  function onGestureEnd(e) {\n    const device = swiper.device;\n    const support = swiper.support;\n    const params = swiper.params.zoom;\n    const zoom = swiper.zoom;\n\n    if (!support.gestures) {\n      if (!fakeGestureTouched || !fakeGestureMoved) {\n        return;\n      }\n\n      if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2 && !device.android) {\n        return;\n      }\n\n      fakeGestureTouched = false;\n      fakeGestureMoved = false;\n    }\n\n    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;\n    zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);\n    gesture.$imageEl.transition(swiper.params.speed).transform(`translate3d(0,0,0) scale(${zoom.scale})`);\n    currentScale = zoom.scale;\n    isScaling = false;\n    if (zoom.scale === 1) gesture.$slideEl = undefined;\n  }\n\n  function onTouchStart(e) {\n    const device = swiper.device;\n    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;\n    if (image.isTouched) return;\n    if (device.android && e.cancelable) e.preventDefault();\n    image.isTouched = true;\n    image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;\n    image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;\n  }\n\n  function onTouchMove(e) {\n    const zoom = swiper.zoom;\n    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;\n    swiper.allowClick = false;\n    if (!image.isTouched || !gesture.$slideEl) return;\n\n    if (!image.isMoved) {\n      image.width = gesture.$imageEl[0].offsetWidth;\n      image.height = gesture.$imageEl[0].offsetHeight;\n      image.startX = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.getTranslate)(gesture.$imageWrapEl[0], 'x') || 0;\n      image.startY = (0,_shared_utils_js__WEBPACK_IMPORTED_MODULE_2__.getTranslate)(gesture.$imageWrapEl[0], 'y') || 0;\n      gesture.slideWidth = gesture.$slideEl[0].offsetWidth;\n      gesture.slideHeight = gesture.$slideEl[0].offsetHeight;\n      gesture.$imageWrapEl.transition(0);\n    } // Define if we need image drag\n\n\n    const scaledWidth = image.width * zoom.scale;\n    const scaledHeight = image.height * zoom.scale;\n    if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;\n    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);\n    image.maxX = -image.minX;\n    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);\n    image.maxY = -image.minY;\n    image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;\n    image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;\n\n    if (!image.isMoved && !isScaling) {\n      if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {\n        image.isTouched = false;\n        return;\n      }\n\n      if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {\n        image.isTouched = false;\n        return;\n      }\n    }\n\n    if (e.cancelable) {\n      e.preventDefault();\n    }\n\n    e.stopPropagation();\n    image.isMoved = true;\n    image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX;\n    image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY;\n\n    if (image.currentX < image.minX) {\n      image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;\n    }\n\n    if (image.currentX > image.maxX) {\n      image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;\n    }\n\n    if (image.currentY < image.minY) {\n      image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;\n    }\n\n    if (image.currentY > image.maxY) {\n      image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;\n    } // Velocity\n\n\n    if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;\n    if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;\n    if (!velocity.prevTime) velocity.prevTime = Date.now();\n    velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;\n    velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;\n    if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;\n    if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;\n    velocity.prevPositionX = image.touchesCurrent.x;\n    velocity.prevPositionY = image.touchesCurrent.y;\n    velocity.prevTime = Date.now();\n    gesture.$imageWrapEl.transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);\n  }\n\n  function onTouchEnd() {\n    const zoom = swiper.zoom;\n    if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;\n\n    if (!image.isTouched || !image.isMoved) {\n      image.isTouched = false;\n      image.isMoved = false;\n      return;\n    }\n\n    image.isTouched = false;\n    image.isMoved = false;\n    let momentumDurationX = 300;\n    let momentumDurationY = 300;\n    const momentumDistanceX = velocity.x * momentumDurationX;\n    const newPositionX = image.currentX + momentumDistanceX;\n    const momentumDistanceY = velocity.y * momentumDurationY;\n    const newPositionY = image.currentY + momentumDistanceY; // Fix duration\n\n    if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);\n    if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);\n    const momentumDuration = Math.max(momentumDurationX, momentumDurationY);\n    image.currentX = newPositionX;\n    image.currentY = newPositionY; // Define if we need image drag\n\n    const scaledWidth = image.width * zoom.scale;\n    const scaledHeight = image.height * zoom.scale;\n    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);\n    image.maxX = -image.minX;\n    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);\n    image.maxY = -image.minY;\n    image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);\n    image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);\n    gesture.$imageWrapEl.transition(momentumDuration).transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);\n  }\n\n  function onTransitionEnd() {\n    const zoom = swiper.zoom;\n\n    if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {\n      if (gesture.$imageEl) {\n        gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');\n      }\n\n      if (gesture.$imageWrapEl) {\n        gesture.$imageWrapEl.transform('translate3d(0,0,0)');\n      }\n\n      zoom.scale = 1;\n      currentScale = 1;\n      gesture.$slideEl = undefined;\n      gesture.$imageEl = undefined;\n      gesture.$imageWrapEl = undefined;\n    }\n  }\n\n  function zoomIn(e) {\n    const zoom = swiper.zoom;\n    const params = swiper.params.zoom;\n\n    if (!gesture.$slideEl) {\n      if (e && e.target) {\n        gesture.$slideEl = (0,_shared_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(e.target).closest(`.${swiper.params.slideClass}`);\n      }\n\n      if (!gesture.$slideEl) {\n        if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {\n          gesture.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`);\n        } else {\n          gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);\n        }\n      }\n\n      gesture.$imageEl = gesture.$slideEl.find(`.${params.containerClass}`).eq(0).find('picture, img, svg, canvas, .swiper-zoom-target').eq(0);\n      gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);\n    }\n\n    if (!gesture.$imageEl || gesture.$imageEl.length === 0 || !gesture.$imageWrapEl || gesture.$imageWrapEl.length === 0) return;\n\n    if (swiper.params.cssMode) {\n      swiper.wrapperEl.style.overflow = 'hidden';\n      swiper.wrapperEl.style.touchAction = 'none';\n    }\n\n    gesture.$slideEl.addClass(`${params.zoomedSlideClass}`);\n    let touchX;\n    let touchY;\n    let offsetX;\n    let offsetY;\n    let diffX;\n    let diffY;\n    let translateX;\n    let translateY;\n    let imageWidth;\n    let imageHeight;\n    let scaledWidth;\n    let scaledHeight;\n    let translateMinX;\n    let translateMinY;\n    let translateMaxX;\n    let translateMaxY;\n    let slideWidth;\n    let slideHeight;\n\n    if (typeof image.touchesStart.x === 'undefined' && e) {\n      touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;\n      touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;\n    } else {\n      touchX = image.touchesStart.x;\n      touchY = image.touchesStart.y;\n    }\n\n    zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;\n    currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;\n\n    if (e) {\n      slideWidth = gesture.$slideEl[0].offsetWidth;\n      slideHeight = gesture.$slideEl[0].offsetHeight;\n      offsetX = gesture.$slideEl.offset().left + window.scrollX;\n      offsetY = gesture.$slideEl.offset().top + window.scrollY;\n      diffX = offsetX + slideWidth / 2 - touchX;\n      diffY = offsetY + slideHeight / 2 - touchY;\n      imageWidth = gesture.$imageEl[0].offsetWidth;\n      imageHeight = gesture.$imageEl[0].offsetHeight;\n      scaledWidth = imageWidth * zoom.scale;\n      scaledHeight = imageHeight * zoom.scale;\n      translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);\n      translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);\n      translateMaxX = -translateMinX;\n      translateMaxY = -translateMinY;\n      translateX = diffX * zoom.scale;\n      translateY = diffY * zoom.scale;\n\n      if (translateX < translateMinX) {\n        translateX = translateMinX;\n      }\n\n      if (translateX > translateMaxX) {\n        translateX = translateMaxX;\n      }\n\n      if (translateY < translateMinY) {\n        translateY = translateMinY;\n      }\n\n      if (translateY > translateMaxY) {\n        translateY = translateMaxY;\n      }\n    } else {\n      translateX = 0;\n      translateY = 0;\n    }\n\n    gesture.$imageWrapEl.transition(300).transform(`translate3d(${translateX}px, ${translateY}px,0)`);\n    gesture.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${zoom.scale})`);\n  }\n\n  function zoomOut() {\n    const zoom = swiper.zoom;\n    const params = swiper.params.zoom;\n\n    if (!gesture.$slideEl) {\n      if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {\n        gesture.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`);\n      } else {\n        gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);\n      }\n\n      gesture.$imageEl = gesture.$slideEl.find(`.${params.containerClass}`).eq(0).find('picture, img, svg, canvas, .swiper-zoom-target').eq(0);\n      gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);\n    }\n\n    if (!gesture.$imageEl || gesture.$imageEl.length === 0 || !gesture.$imageWrapEl || gesture.$imageWrapEl.length === 0) return;\n\n    if (swiper.params.cssMode) {\n      swiper.wrapperEl.style.overflow = '';\n      swiper.wrapperEl.style.touchAction = '';\n    }\n\n    zoom.scale = 1;\n    currentScale = 1;\n    gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');\n    gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');\n    gesture.$slideEl.removeClass(`${params.zoomedSlideClass}`);\n    gesture.$slideEl = undefined;\n  } // Toggle Zoom\n\n\n  function zoomToggle(e) {\n    const zoom = swiper.zoom;\n\n    if (zoom.scale && zoom.scale !== 1) {\n      // Zoom Out\n      zoomOut();\n    } else {\n      // Zoom In\n      zoomIn(e);\n    }\n  }\n\n  function getListeners() {\n    const support = swiper.support;\n    const passiveListener = swiper.touchEvents.start === 'touchstart' && support.passiveListener && swiper.params.passiveListeners ? {\n      passive: true,\n      capture: false\n    } : false;\n    const activeListenerWithCapture = support.passiveListener ? {\n      passive: false,\n      capture: true\n    } : true;\n    return {\n      passiveListener,\n      activeListenerWithCapture\n    };\n  }\n\n  function getSlideSelector() {\n    return `.${swiper.params.slideClass}`;\n  }\n\n  function toggleGestures(method) {\n    const {\n      passiveListener\n    } = getListeners();\n    const slideSelector = getSlideSelector();\n    swiper.$wrapperEl[method]('gesturestart', slideSelector, onGestureStart, passiveListener);\n    swiper.$wrapperEl[method]('gesturechange', slideSelector, onGestureChange, passiveListener);\n    swiper.$wrapperEl[method]('gestureend', slideSelector, onGestureEnd, passiveListener);\n  }\n\n  function enableGestures() {\n    if (gesturesEnabled) return;\n    gesturesEnabled = true;\n    toggleGestures('on');\n  }\n\n  function disableGestures() {\n    if (!gesturesEnabled) return;\n    gesturesEnabled = false;\n    toggleGestures('off');\n  } // Attach/Detach Events\n\n\n  function enable() {\n    const zoom = swiper.zoom;\n    if (zoom.enabled) return;\n    zoom.enabled = true;\n    const support = swiper.support;\n    const {\n      passiveListener,\n      activeListenerWithCapture\n    } = getListeners();\n    const slideSelector = getSlideSelector(); // Scale image\n\n    if (support.gestures) {\n      swiper.$wrapperEl.on(swiper.touchEvents.start, enableGestures, passiveListener);\n      swiper.$wrapperEl.on(swiper.touchEvents.end, disableGestures, passiveListener);\n    } else if (swiper.touchEvents.start === 'touchstart') {\n      swiper.$wrapperEl.on(swiper.touchEvents.start, slideSelector, onGestureStart, passiveListener);\n      swiper.$wrapperEl.on(swiper.touchEvents.move, slideSelector, onGestureChange, activeListenerWithCapture);\n      swiper.$wrapperEl.on(swiper.touchEvents.end, slideSelector, onGestureEnd, passiveListener);\n\n      if (swiper.touchEvents.cancel) {\n        swiper.$wrapperEl.on(swiper.touchEvents.cancel, slideSelector, onGestureEnd, passiveListener);\n      }\n    } // Move image\n\n\n    swiper.$wrapperEl.on(swiper.touchEvents.move, `.${swiper.params.zoom.containerClass}`, onTouchMove, activeListenerWithCapture);\n  }\n\n  function disable() {\n    const zoom = swiper.zoom;\n    if (!zoom.enabled) return;\n    const support = swiper.support;\n    zoom.enabled = false;\n    const {\n      passiveListener,\n      activeListenerWithCapture\n    } = getListeners();\n    const slideSelector = getSlideSelector(); // Scale image\n\n    if (support.gestures) {\n      swiper.$wrapperEl.off(swiper.touchEvents.start, enableGestures, passiveListener);\n      swiper.$wrapperEl.off(swiper.touchEvents.end, disableGestures, passiveListener);\n    } else if (swiper.touchEvents.start === 'touchstart') {\n      swiper.$wrapperEl.off(swiper.touchEvents.start, slideSelector, onGestureStart, passiveListener);\n      swiper.$wrapperEl.off(swiper.touchEvents.move, slideSelector, onGestureChange, activeListenerWithCapture);\n      swiper.$wrapperEl.off(swiper.touchEvents.end, slideSelector, onGestureEnd, passiveListener);\n\n      if (swiper.touchEvents.cancel) {\n        swiper.$wrapperEl.off(swiper.touchEvents.cancel, slideSelector, onGestureEnd, passiveListener);\n      }\n    } // Move image\n\n\n    swiper.$wrapperEl.off(swiper.touchEvents.move, `.${swiper.params.zoom.containerClass}`, onTouchMove, activeListenerWithCapture);\n  }\n\n  on('init', () => {\n    if (swiper.params.zoom.enabled) {\n      enable();\n    }\n  });\n  on('destroy', () => {\n    disable();\n  });\n  on('touchStart', (_s, e) => {\n    if (!swiper.zoom.enabled) return;\n    onTouchStart(e);\n  });\n  on('touchEnd', (_s, e) => {\n    if (!swiper.zoom.enabled) return;\n    onTouchEnd(e);\n  });\n  on('doubleTap', (_s, e) => {\n    if (!swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {\n      zoomToggle(e);\n    }\n  });\n  on('transitionEnd', () => {\n    if (swiper.zoom.enabled && swiper.params.zoom.enabled) {\n      onTransitionEnd();\n    }\n  });\n  on('slideChange', () => {\n    if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {\n      onTransitionEnd();\n    }\n  });\n  Object.assign(swiper.zoom, {\n    enable,\n    disable,\n    in: zoomIn,\n    out: zoomOut,\n    toggle: zoomToggle\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/modules/zoom/zoom.js?");

/***/ }),

/***/ "./node_modules/swiper/shared/classes-to-selector.js":
/*!***********************************************************!*\
  !*** ./node_modules/swiper/shared/classes-to-selector.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ classesToSelector)\n/* harmony export */ });\nfunction classesToSelector(classes = '') {\n  return `.${classes.trim().replace(/([\\.:!\\/])/g, '\\\\$1') // eslint-disable-line\n  .replace(/ /g, '.')}`;\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/shared/classes-to-selector.js?");

/***/ }),

/***/ "./node_modules/swiper/shared/create-element-if-not-defined.js":
/*!*********************************************************************!*\
  !*** ./node_modules/swiper/shared/create-element-if-not-defined.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createElementIfNotDefined)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n\nfunction createElementIfNotDefined(swiper, originalParams, params, checkProps) {\n  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n\n  if (swiper.params.createElements) {\n    Object.keys(checkProps).forEach(key => {\n      if (!params[key] && params.auto === true) {\n        let element = swiper.$el.children(`.${checkProps[key]}`)[0];\n\n        if (!element) {\n          element = document.createElement('div');\n          element.className = checkProps[key];\n          swiper.$el.append(element);\n        }\n\n        params[key] = element;\n        originalParams[key] = element;\n      }\n    });\n  }\n\n  return params;\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/shared/create-element-if-not-defined.js?");

/***/ }),

/***/ "./node_modules/swiper/shared/create-shadow.js":
/*!*****************************************************!*\
  !*** ./node_modules/swiper/shared/create-shadow.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createShadow)\n/* harmony export */ });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./node_modules/swiper/shared/dom.js\");\n\nfunction createShadow(params, $slideEl, side) {\n  const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ''}`;\n  const $shadowContainer = params.transformEl ? $slideEl.find(params.transformEl) : $slideEl;\n  let $shadowEl = $shadowContainer.children(`.${shadowClass}`);\n\n  if (!$shadowEl.length) {\n    $shadowEl = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(`<div class=\"swiper-slide-shadow${side ? `-${side}` : ''}\"></div>`);\n    $shadowContainer.append($shadowEl);\n  }\n\n  return $shadowEl;\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/shared/create-shadow.js?");

/***/ }),

/***/ "./node_modules/swiper/shared/dom.js":
/*!*******************************************!*\
  !*** ./node_modules/swiper/shared/dom.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var dom7__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom7 */ \"./node_modules/dom7/dom7.esm.js\");\n\nconst Methods = {\n  addClass: dom7__WEBPACK_IMPORTED_MODULE_0__.addClass,\n  removeClass: dom7__WEBPACK_IMPORTED_MODULE_0__.removeClass,\n  hasClass: dom7__WEBPACK_IMPORTED_MODULE_0__.hasClass,\n  toggleClass: dom7__WEBPACK_IMPORTED_MODULE_0__.toggleClass,\n  attr: dom7__WEBPACK_IMPORTED_MODULE_0__.attr,\n  removeAttr: dom7__WEBPACK_IMPORTED_MODULE_0__.removeAttr,\n  transform: dom7__WEBPACK_IMPORTED_MODULE_0__.transform,\n  transition: dom7__WEBPACK_IMPORTED_MODULE_0__.transition,\n  on: dom7__WEBPACK_IMPORTED_MODULE_0__.on,\n  off: dom7__WEBPACK_IMPORTED_MODULE_0__.off,\n  trigger: dom7__WEBPACK_IMPORTED_MODULE_0__.trigger,\n  transitionEnd: dom7__WEBPACK_IMPORTED_MODULE_0__.transitionEnd,\n  outerWidth: dom7__WEBPACK_IMPORTED_MODULE_0__.outerWidth,\n  outerHeight: dom7__WEBPACK_IMPORTED_MODULE_0__.outerHeight,\n  styles: dom7__WEBPACK_IMPORTED_MODULE_0__.styles,\n  offset: dom7__WEBPACK_IMPORTED_MODULE_0__.offset,\n  css: dom7__WEBPACK_IMPORTED_MODULE_0__.css,\n  each: dom7__WEBPACK_IMPORTED_MODULE_0__.each,\n  html: dom7__WEBPACK_IMPORTED_MODULE_0__.html,\n  text: dom7__WEBPACK_IMPORTED_MODULE_0__.text,\n  is: dom7__WEBPACK_IMPORTED_MODULE_0__.is,\n  index: dom7__WEBPACK_IMPORTED_MODULE_0__.index,\n  eq: dom7__WEBPACK_IMPORTED_MODULE_0__.eq,\n  append: dom7__WEBPACK_IMPORTED_MODULE_0__.append,\n  prepend: dom7__WEBPACK_IMPORTED_MODULE_0__.prepend,\n  next: dom7__WEBPACK_IMPORTED_MODULE_0__.next,\n  nextAll: dom7__WEBPACK_IMPORTED_MODULE_0__.nextAll,\n  prev: dom7__WEBPACK_IMPORTED_MODULE_0__.prev,\n  prevAll: dom7__WEBPACK_IMPORTED_MODULE_0__.prevAll,\n  parent: dom7__WEBPACK_IMPORTED_MODULE_0__.parent,\n  parents: dom7__WEBPACK_IMPORTED_MODULE_0__.parents,\n  closest: dom7__WEBPACK_IMPORTED_MODULE_0__.closest,\n  find: dom7__WEBPACK_IMPORTED_MODULE_0__.find,\n  children: dom7__WEBPACK_IMPORTED_MODULE_0__.children,\n  filter: dom7__WEBPACK_IMPORTED_MODULE_0__.filter,\n  remove: dom7__WEBPACK_IMPORTED_MODULE_0__.remove\n};\nObject.keys(Methods).forEach(methodName => {\n  Object.defineProperty(dom7__WEBPACK_IMPORTED_MODULE_0__.$.fn, methodName, {\n    value: Methods[methodName],\n    writable: true\n  });\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom7__WEBPACK_IMPORTED_MODULE_0__.$);\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/shared/dom.js?");

/***/ }),

/***/ "./node_modules/swiper/shared/effect-init.js":
/*!***************************************************!*\
  !*** ./node_modules/swiper/shared/effect-init.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ effectInit)\n/* harmony export */ });\nfunction effectInit(params) {\n  const {\n    effect,\n    swiper,\n    on,\n    setTranslate,\n    setTransition,\n    overwriteParams,\n    perspective,\n    recreateShadows,\n    getEffectParams\n  } = params;\n  on('beforeInit', () => {\n    if (swiper.params.effect !== effect) return;\n    swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);\n\n    if (perspective && perspective()) {\n      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);\n    }\n\n    const overwriteParamsResult = overwriteParams ? overwriteParams() : {};\n    Object.assign(swiper.params, overwriteParamsResult);\n    Object.assign(swiper.originalParams, overwriteParamsResult);\n  });\n  on('setTranslate', () => {\n    if (swiper.params.effect !== effect) return;\n    setTranslate();\n  });\n  on('setTransition', (_s, duration) => {\n    if (swiper.params.effect !== effect) return;\n    setTransition(duration);\n  });\n  on('transitionEnd', () => {\n    if (swiper.params.effect !== effect) return;\n\n    if (recreateShadows) {\n      if (!getEffectParams || !getEffectParams().slideShadows) return; // remove shadows\n\n      swiper.slides.each(slideEl => {\n        const $slideEl = swiper.$(slideEl);\n        $slideEl.find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').remove();\n      }); // create new one\n\n      recreateShadows();\n    }\n  });\n  let requireUpdateOnVirtual;\n  on('virtualUpdate', () => {\n    if (swiper.params.effect !== effect) return;\n\n    if (!swiper.slides.length) {\n      requireUpdateOnVirtual = true;\n    }\n\n    requestAnimationFrame(() => {\n      if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {\n        setTranslate();\n        requireUpdateOnVirtual = false;\n      }\n    });\n  });\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/shared/effect-init.js?");

/***/ }),

/***/ "./node_modules/swiper/shared/effect-target.js":
/*!*****************************************************!*\
  !*** ./node_modules/swiper/shared/effect-target.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ effectTarget)\n/* harmony export */ });\nfunction effectTarget(effectParams, $slideEl) {\n  if (effectParams.transformEl) {\n    return $slideEl.find(effectParams.transformEl).css({\n      'backface-visibility': 'hidden',\n      '-webkit-backface-visibility': 'hidden'\n    });\n  }\n\n  return $slideEl;\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/shared/effect-target.js?");

/***/ }),

/***/ "./node_modules/swiper/shared/effect-virtual-transition-end.js":
/*!*********************************************************************!*\
  !*** ./node_modules/swiper/shared/effect-virtual-transition-end.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ effectVirtualTransitionEnd)\n/* harmony export */ });\nfunction effectVirtualTransitionEnd({\n  swiper,\n  duration,\n  transformEl,\n  allSlides\n}) {\n  const {\n    slides,\n    activeIndex,\n    $wrapperEl\n  } = swiper;\n\n  if (swiper.params.virtualTranslate && duration !== 0) {\n    let eventTriggered = false;\n    let $transitionEndTarget;\n\n    if (allSlides) {\n      $transitionEndTarget = transformEl ? slides.find(transformEl) : slides;\n    } else {\n      $transitionEndTarget = transformEl ? slides.eq(activeIndex).find(transformEl) : slides.eq(activeIndex);\n    }\n\n    $transitionEndTarget.transitionEnd(() => {\n      if (eventTriggered) return;\n      if (!swiper || swiper.destroyed) return;\n      eventTriggered = true;\n      swiper.animating = false;\n      const triggerEvents = ['webkitTransitionEnd', 'transitionend'];\n\n      for (let i = 0; i < triggerEvents.length; i += 1) {\n        $wrapperEl.trigger(triggerEvents[i]);\n      }\n    });\n  }\n}\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/shared/effect-virtual-transition-end.js?");

/***/ }),

/***/ "./node_modules/swiper/shared/get-browser.js":
/*!***************************************************!*\
  !*** ./node_modules/swiper/shared/get-browser.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getBrowser\": () => (/* binding */ getBrowser)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n\nlet browser;\n\nfunction calcBrowser() {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n\n  function isSafari() {\n    const ua = window.navigator.userAgent.toLowerCase();\n    return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;\n  }\n\n  return {\n    isSafari: isSafari(),\n    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)\n  };\n}\n\nfunction getBrowser() {\n  if (!browser) {\n    browser = calcBrowser();\n  }\n\n  return browser;\n}\n\n\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/shared/get-browser.js?");

/***/ }),

/***/ "./node_modules/swiper/shared/get-device.js":
/*!**************************************************!*\
  !*** ./node_modules/swiper/shared/get-device.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getDevice\": () => (/* binding */ getDevice)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n/* harmony import */ var _get_support_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-support.js */ \"./node_modules/swiper/shared/get-support.js\");\n\n\nlet deviceCached;\n\nfunction calcDevice({\n  userAgent\n} = {}) {\n  const support = (0,_get_support_js__WEBPACK_IMPORTED_MODULE_1__.getSupport)();\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  const platform = window.navigator.platform;\n  const ua = userAgent || window.navigator.userAgent;\n  const device = {\n    ios: false,\n    android: false\n  };\n  const screenWidth = window.screen.width;\n  const screenHeight = window.screen.height;\n  const android = ua.match(/(Android);?[\\s\\/]+([\\d.]+)?/); // eslint-disable-line\n\n  let ipad = ua.match(/(iPad).*OS\\s([\\d_]+)/);\n  const ipod = ua.match(/(iPod)(.*OS\\s([\\d_]+))?/);\n  const iphone = !ipad && ua.match(/(iPhone\\sOS|iOS)\\s([\\d_]+)/);\n  const windows = platform === 'Win32';\n  let macos = platform === 'MacIntel'; // iPadOs 13 fix\n\n  const iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768', '820x1180', '1180x820', '810x1080', '1080x810'];\n\n  if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {\n    ipad = ua.match(/(Version)\\/([\\d.]+)/);\n    if (!ipad) ipad = [0, 1, '13_0_0'];\n    macos = false;\n  } // Android\n\n\n  if (android && !windows) {\n    device.os = 'android';\n    device.android = true;\n  }\n\n  if (ipad || iphone || ipod) {\n    device.os = 'ios';\n    device.ios = true;\n  } // Export object\n\n\n  return device;\n}\n\nfunction getDevice(overrides = {}) {\n  if (!deviceCached) {\n    deviceCached = calcDevice(overrides);\n  }\n\n  return deviceCached;\n}\n\n\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/shared/get-device.js?");

/***/ }),

/***/ "./node_modules/swiper/shared/get-support.js":
/*!***************************************************!*\
  !*** ./node_modules/swiper/shared/get-support.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getSupport\": () => (/* binding */ getSupport)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n\nlet support;\n\nfunction calcSupport() {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  const document = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getDocument)();\n  return {\n    smoothScroll: document.documentElement && 'scrollBehavior' in document.documentElement.style,\n    touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch),\n    passiveListener: function checkPassiveListener() {\n      let supportsPassive = false;\n\n      try {\n        const opts = Object.defineProperty({}, 'passive', {\n          // eslint-disable-next-line\n          get() {\n            supportsPassive = true;\n          }\n\n        });\n        window.addEventListener('testPassiveListener', null, opts);\n      } catch (e) {// No support\n      }\n\n      return supportsPassive;\n    }(),\n    gestures: function checkGestures() {\n      return 'ongesturestart' in window;\n    }()\n  };\n}\n\nfunction getSupport() {\n  if (!support) {\n    support = calcSupport();\n  }\n\n  return support;\n}\n\n\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/shared/get-support.js?");

/***/ }),

/***/ "./node_modules/swiper/shared/utils.js":
/*!*********************************************!*\
  !*** ./node_modules/swiper/shared/utils.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"animateCSSModeScroll\": () => (/* binding */ animateCSSModeScroll),\n/* harmony export */   \"deleteProps\": () => (/* binding */ deleteProps),\n/* harmony export */   \"extend\": () => (/* binding */ extend),\n/* harmony export */   \"getComputedStyle\": () => (/* binding */ getComputedStyle),\n/* harmony export */   \"getTranslate\": () => (/* binding */ getTranslate),\n/* harmony export */   \"isObject\": () => (/* binding */ isObject),\n/* harmony export */   \"nextTick\": () => (/* binding */ nextTick),\n/* harmony export */   \"now\": () => (/* binding */ now),\n/* harmony export */   \"setCSSProperty\": () => (/* binding */ setCSSProperty)\n/* harmony export */ });\n/* harmony import */ var ssr_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ssr-window */ \"./node_modules/ssr-window/ssr-window.esm.js\");\n\n\nfunction deleteProps(obj) {\n  const object = obj;\n  Object.keys(object).forEach(key => {\n    try {\n      object[key] = null;\n    } catch (e) {// no getter for object\n    }\n\n    try {\n      delete object[key];\n    } catch (e) {// something got wrong\n    }\n  });\n}\n\nfunction nextTick(callback, delay = 0) {\n  return setTimeout(callback, delay);\n}\n\nfunction now() {\n  return Date.now();\n}\n\nfunction getComputedStyle(el) {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  let style;\n\n  if (window.getComputedStyle) {\n    style = window.getComputedStyle(el, null);\n  }\n\n  if (!style && el.currentStyle) {\n    style = el.currentStyle;\n  }\n\n  if (!style) {\n    style = el.style;\n  }\n\n  return style;\n}\n\nfunction getTranslate(el, axis = 'x') {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  let matrix;\n  let curTransform;\n  let transformMatrix;\n  const curStyle = getComputedStyle(el, null);\n\n  if (window.WebKitCSSMatrix) {\n    curTransform = curStyle.transform || curStyle.webkitTransform;\n\n    if (curTransform.split(',').length > 6) {\n      curTransform = curTransform.split(', ').map(a => a.replace(',', '.')).join(', ');\n    } // Some old versions of Webkit choke when 'none' is passed; pass\n    // empty string instead in this case\n\n\n    transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);\n  } else {\n    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');\n    matrix = transformMatrix.toString().split(',');\n  }\n\n  if (axis === 'x') {\n    // Latest Chrome and webkits Fix\n    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; // Crazy IE10 Matrix\n    else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); // Normal Browsers\n    else curTransform = parseFloat(matrix[4]);\n  }\n\n  if (axis === 'y') {\n    // Latest Chrome and webkits Fix\n    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; // Crazy IE10 Matrix\n    else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); // Normal Browsers\n    else curTransform = parseFloat(matrix[5]);\n  }\n\n  return curTransform || 0;\n}\n\nfunction isObject(o) {\n  return typeof o === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';\n}\n\nfunction isNode(node) {\n  // eslint-disable-next-line\n  if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {\n    return node instanceof HTMLElement;\n  }\n\n  return node && (node.nodeType === 1 || node.nodeType === 11);\n}\n\nfunction extend(...args) {\n  const to = Object(args[0]);\n  const noExtend = ['__proto__', 'constructor', 'prototype'];\n\n  for (let i = 1; i < args.length; i += 1) {\n    const nextSource = args[i];\n\n    if (nextSource !== undefined && nextSource !== null && !isNode(nextSource)) {\n      const keysArray = Object.keys(Object(nextSource)).filter(key => noExtend.indexOf(key) < 0);\n\n      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {\n        const nextKey = keysArray[nextIndex];\n        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);\n\n        if (desc !== undefined && desc.enumerable) {\n          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {\n            if (nextSource[nextKey].__swiper__) {\n              to[nextKey] = nextSource[nextKey];\n            } else {\n              extend(to[nextKey], nextSource[nextKey]);\n            }\n          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {\n            to[nextKey] = {};\n\n            if (nextSource[nextKey].__swiper__) {\n              to[nextKey] = nextSource[nextKey];\n            } else {\n              extend(to[nextKey], nextSource[nextKey]);\n            }\n          } else {\n            to[nextKey] = nextSource[nextKey];\n          }\n        }\n      }\n    }\n  }\n\n  return to;\n}\n\nfunction setCSSProperty(el, varName, varValue) {\n  el.style.setProperty(varName, varValue);\n}\n\nfunction animateCSSModeScroll({\n  swiper,\n  targetPosition,\n  side\n}) {\n  const window = (0,ssr_window__WEBPACK_IMPORTED_MODULE_0__.getWindow)();\n  const startPosition = -swiper.translate;\n  let startTime = null;\n  let time;\n  const duration = swiper.params.speed;\n  swiper.wrapperEl.style.scrollSnapType = 'none';\n  window.cancelAnimationFrame(swiper.cssModeFrameID);\n  const dir = targetPosition > startPosition ? 'next' : 'prev';\n\n  const isOutOfBound = (current, target) => {\n    return dir === 'next' && current >= target || dir === 'prev' && current <= target;\n  };\n\n  const animate = () => {\n    time = new Date().getTime();\n\n    if (startTime === null) {\n      startTime = time;\n    }\n\n    const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);\n    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;\n    let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);\n\n    if (isOutOfBound(currentPosition, targetPosition)) {\n      currentPosition = targetPosition;\n    }\n\n    swiper.wrapperEl.scrollTo({\n      [side]: currentPosition\n    });\n\n    if (isOutOfBound(currentPosition, targetPosition)) {\n      swiper.wrapperEl.style.overflow = 'hidden';\n      swiper.wrapperEl.style.scrollSnapType = '';\n      setTimeout(() => {\n        swiper.wrapperEl.style.overflow = '';\n        swiper.wrapperEl.scrollTo({\n          [side]: currentPosition\n        });\n      });\n      window.cancelAnimationFrame(swiper.cssModeFrameID);\n      return;\n    }\n\n    swiper.cssModeFrameID = window.requestAnimationFrame(animate);\n  };\n\n  animate();\n}\n\n\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/shared/utils.js?");

/***/ }),

/***/ "./node_modules/swiper/swiper.esm.js":
/*!*******************************************!*\
  !*** ./node_modules/swiper/swiper.esm.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"A11y\": () => (/* reexport safe */ _modules_a11y_a11y_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"]),\n/* harmony export */   \"Autoplay\": () => (/* reexport safe */ _modules_autoplay_autoplay_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"]),\n/* harmony export */   \"Controller\": () => (/* reexport safe */ _modules_controller_controller_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"]),\n/* harmony export */   \"EffectCards\": () => (/* reexport safe */ _modules_effect_cards_effect_cards_js__WEBPACK_IMPORTED_MODULE_24__[\"default\"]),\n/* harmony export */   \"EffectCoverflow\": () => (/* reexport safe */ _modules_effect_coverflow_effect_coverflow_js__WEBPACK_IMPORTED_MODULE_22__[\"default\"]),\n/* harmony export */   \"EffectCreative\": () => (/* reexport safe */ _modules_effect_creative_effect_creative_js__WEBPACK_IMPORTED_MODULE_23__[\"default\"]),\n/* harmony export */   \"EffectCube\": () => (/* reexport safe */ _modules_effect_cube_effect_cube_js__WEBPACK_IMPORTED_MODULE_20__[\"default\"]),\n/* harmony export */   \"EffectFade\": () => (/* reexport safe */ _modules_effect_fade_effect_fade_js__WEBPACK_IMPORTED_MODULE_19__[\"default\"]),\n/* harmony export */   \"EffectFlip\": () => (/* reexport safe */ _modules_effect_flip_effect_flip_js__WEBPACK_IMPORTED_MODULE_21__[\"default\"]),\n/* harmony export */   \"FreeMode\": () => (/* reexport safe */ _modules_free_mode_free_mode_js__WEBPACK_IMPORTED_MODULE_16__[\"default\"]),\n/* harmony export */   \"Grid\": () => (/* reexport safe */ _modules_grid_grid_js__WEBPACK_IMPORTED_MODULE_17__[\"default\"]),\n/* harmony export */   \"HashNavigation\": () => (/* reexport safe */ _modules_hash_navigation_hash_navigation_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"]),\n/* harmony export */   \"History\": () => (/* reexport safe */ _modules_history_history_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"]),\n/* harmony export */   \"Keyboard\": () => (/* reexport safe */ _modules_keyboard_keyboard_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   \"Lazy\": () => (/* reexport safe */ _modules_lazy_lazy_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]),\n/* harmony export */   \"Manipulation\": () => (/* reexport safe */ _modules_manipulation_manipulation_js__WEBPACK_IMPORTED_MODULE_18__[\"default\"]),\n/* harmony export */   \"Mousewheel\": () => (/* reexport safe */ _modules_mousewheel_mousewheel_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   \"Navigation\": () => (/* reexport safe */ _modules_navigation_navigation_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n/* harmony export */   \"Pagination\": () => (/* reexport safe */ _modules_pagination_pagination_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]),\n/* harmony export */   \"Parallax\": () => (/* reexport safe */ _modules_parallax_parallax_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"]),\n/* harmony export */   \"Scrollbar\": () => (/* reexport safe */ _modules_scrollbar_scrollbar_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]),\n/* harmony export */   \"Swiper\": () => (/* reexport safe */ _core_core_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   \"Thumbs\": () => (/* reexport safe */ _modules_thumbs_thumbs_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"]),\n/* harmony export */   \"Virtual\": () => (/* reexport safe */ _modules_virtual_virtual_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   \"Zoom\": () => (/* reexport safe */ _modules_zoom_zoom_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"]),\n/* harmony export */   \"default\": () => (/* reexport safe */ _core_core_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _core_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/core.js */ \"./node_modules/swiper/core/core.js\");\n/* harmony import */ var _modules_virtual_virtual_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/virtual/virtual.js */ \"./node_modules/swiper/modules/virtual/virtual.js\");\n/* harmony import */ var _modules_keyboard_keyboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/keyboard/keyboard.js */ \"./node_modules/swiper/modules/keyboard/keyboard.js\");\n/* harmony import */ var _modules_mousewheel_mousewheel_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/mousewheel/mousewheel.js */ \"./node_modules/swiper/modules/mousewheel/mousewheel.js\");\n/* harmony import */ var _modules_navigation_navigation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/navigation/navigation.js */ \"./node_modules/swiper/modules/navigation/navigation.js\");\n/* harmony import */ var _modules_pagination_pagination_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/pagination/pagination.js */ \"./node_modules/swiper/modules/pagination/pagination.js\");\n/* harmony import */ var _modules_scrollbar_scrollbar_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/scrollbar/scrollbar.js */ \"./node_modules/swiper/modules/scrollbar/scrollbar.js\");\n/* harmony import */ var _modules_parallax_parallax_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/parallax/parallax.js */ \"./node_modules/swiper/modules/parallax/parallax.js\");\n/* harmony import */ var _modules_zoom_zoom_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/zoom/zoom.js */ \"./node_modules/swiper/modules/zoom/zoom.js\");\n/* harmony import */ var _modules_lazy_lazy_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/lazy/lazy.js */ \"./node_modules/swiper/modules/lazy/lazy.js\");\n/* harmony import */ var _modules_controller_controller_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/controller/controller.js */ \"./node_modules/swiper/modules/controller/controller.js\");\n/* harmony import */ var _modules_a11y_a11y_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/a11y/a11y.js */ \"./node_modules/swiper/modules/a11y/a11y.js\");\n/* harmony import */ var _modules_history_history_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/history/history.js */ \"./node_modules/swiper/modules/history/history.js\");\n/* harmony import */ var _modules_hash_navigation_hash_navigation_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/hash-navigation/hash-navigation.js */ \"./node_modules/swiper/modules/hash-navigation/hash-navigation.js\");\n/* harmony import */ var _modules_autoplay_autoplay_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modules/autoplay/autoplay.js */ \"./node_modules/swiper/modules/autoplay/autoplay.js\");\n/* harmony import */ var _modules_thumbs_thumbs_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./modules/thumbs/thumbs.js */ \"./node_modules/swiper/modules/thumbs/thumbs.js\");\n/* harmony import */ var _modules_free_mode_free_mode_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./modules/free-mode/free-mode.js */ \"./node_modules/swiper/modules/free-mode/free-mode.js\");\n/* harmony import */ var _modules_grid_grid_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./modules/grid/grid.js */ \"./node_modules/swiper/modules/grid/grid.js\");\n/* harmony import */ var _modules_manipulation_manipulation_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./modules/manipulation/manipulation.js */ \"./node_modules/swiper/modules/manipulation/manipulation.js\");\n/* harmony import */ var _modules_effect_fade_effect_fade_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./modules/effect-fade/effect-fade.js */ \"./node_modules/swiper/modules/effect-fade/effect-fade.js\");\n/* harmony import */ var _modules_effect_cube_effect_cube_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./modules/effect-cube/effect-cube.js */ \"./node_modules/swiper/modules/effect-cube/effect-cube.js\");\n/* harmony import */ var _modules_effect_flip_effect_flip_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./modules/effect-flip/effect-flip.js */ \"./node_modules/swiper/modules/effect-flip/effect-flip.js\");\n/* harmony import */ var _modules_effect_coverflow_effect_coverflow_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./modules/effect-coverflow/effect-coverflow.js */ \"./node_modules/swiper/modules/effect-coverflow/effect-coverflow.js\");\n/* harmony import */ var _modules_effect_creative_effect_creative_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./modules/effect-creative/effect-creative.js */ \"./node_modules/swiper/modules/effect-creative/effect-creative.js\");\n/* harmony import */ var _modules_effect_cards_effect_cards_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./modules/effect-cards/effect-cards.js */ \"./node_modules/swiper/modules/effect-cards/effect-cards.js\");\n/**\n * Swiper 8.4.4\n * Most modern mobile touch slider and framework with hardware accelerated transitions\n * https://swiperjs.com\n *\n * Copyright 2014-2022 Vladimir Kharlampidi\n *\n * Released under the MIT License\n *\n * Released on: October 12, 2022\n */\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://appline-tailwind/./node_modules/swiper/swiper.esm.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;




<!-- 404.html -->
<!DOCTYPE html>
<html lang="en" class="light">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>404 Error | Appline Tailwind App Landing Template</title>
  <link rel="icon" href="favicon.ico">
  <link href="style.css" rel="stylesheet">
</head>

<body class="bg-white dark:bg-black">
  <!-- ======= Header Start ======= -->
  <header
    class="navbar absolute top-0 left-0 z-50 w-full border-stroke bg-white duration-300 dark:border-stroke-dark dark:bg-black">
    <div class="container relative max-w-[1400px]">
      <div class="flex items-center justify-between">
        <div class="block py-4 lg:py-0">
          <a href="index.html" class="block max-w-[145px] sm:max-w-[180px]">
            <img src="images/logo.svg" alt="logo" class="block dark:hidden" />
            <img src="images/logo-white.svg" alt="logo" class="hidden dark:block" />
          </a>
        </div>
        <button
          class="navbarOpen absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center space-y-[6px] font-bold lg:hidden">
          <span class="block h-[2px] w-7 bg-black dark:bg-white"></span>
          <span class="block h-[2px] w-7 bg-black dark:bg-white"></span>
          <span class="block h-[2px] w-7 bg-black dark:bg-white"></span>
        </button>

        <div class="menu-wrapper relative hidden justify-between lg:flex">
          <button
            class="navbarClose fixed top-10 right-10 z-[9999] flex h-10 w-10 flex-col items-center justify-center font-bold lg:hidden">
            <span class="block h-[2px] w-7 rotate-45 bg-black dark:bg-white"></span>
            <span class="-mt-[2px] block h-[2px] w-7 -rotate-45 bg-black dark:bg-white"></span>
          </button>

          <nav
            class="fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-white bg-opacity-95 text-center backdrop-blur-sm dark:bg-black dark:bg-opacity-95 lg:static lg:h-auto lg:w-max lg:bg-transparent lg:backdrop-blur-none lg:dark:bg-transparent">
            <ul class="items-center space-y-3 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-10">
              <li class="menu-item">
                <a href="/#features"
                  class="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7">
                  Features
                </a>
              </li>
              <li class="menu-item">
                <a href="/#about"
                  class="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7">
                  About
                </a>
              </li>
              <li class="menu-item">
                <a href="/#work-process"
                  class="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7">
                  How It Work
                </a>
              </li>
              <li class="menu-item">
                <a href="/#support"
                  class="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7">
                  Support
                </a>
              </li>
              <li class="submenu-item menu-item group relative">
                <a href="javascript:void(0)"
                  class="submenu-taggler inline-flex items-center text-base font-medium text-black hover:text-primary group-hover:text-primary dark:text-white dark:hover:text-primary lg:py-7">
                  Pages

                  <span class="pl-3">
                    <svg width="14" height="8" viewBox="0 0 14 8" class="fill-current">
                      <path
                        d="M6.54564 5.09128L11.6369 0L13.0913 1.45436L6.54564 8L0 1.45436L1.45436 0L6.54564 5.09128Z" />
                    </svg>
                  </span>
                </a>

                <ul
                  class="submenu hidden space-y-5 pt-5 duration-300 lg:invisible lg:absolute lg:top-[120%] lg:block lg:w-[250px] lg:rounded-lg lg:bg-white lg:px-8 lg:pb-5 lg:text-left lg:opacity-0 lg:shadow-card lg:group-hover:visible lg:group-hover:top-full lg:group-hover:opacity-100 dark:lg:border-transparent dark:lg:bg-[#15182A] lg:dark:shadow-card-dark">
                  <li>
                    <a href="blog-grid.html"
                      class="font-heading inline-flex items-center justify-center text-center text-base text-black hover:text-primary dark:text-white dark:hover:text-primary">
                      Blog Grids
                    </a>
                  </li>
                  <li>
                    <a href="blog-details.html"
                      class="font-heading inline-flex items-center justify-center text-center text-base text-black hover:text-primary dark:text-white dark:hover:text-primary">
                      Blog Details
                    </a>
                  </li>
                  <li>
                    <a href="404.html"
                      class="font-heading inline-flex items-center justify-center text-center text-base text-black hover:text-primary dark:text-white dark:hover:text-primary">
                      404 Error
                    </a>
                  </li>
                  <li>
                    <a href="signin.html"
                      class="font-heading inline-flex items-center justify-center text-center text-base text-black hover:text-primary dark:text-white dark:hover:text-primary">
                      Sign In
                    </a>
                  </li>
                  <li>
                    <a href="signup.html"
                      class="font-heading inline-flex items-center justify-center text-center text-base text-black hover:text-primary dark:text-white dark:hover:text-primary">
                      Sign Up
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>

        <div class="mr-[60px] flex items-center justify-end lg:mr-0">
          <label for="themeSwitcher" class="inline-flex cursor-pointer items-center" aria-label="themeSwitcher"
            name="themeSwitcher">
            <input type="checkbox" name="themeSwitcher" id="themeSwitcher" class="sr-only" />
            <span class="hidden dark:block">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_420_119)">
                  <path
                    d="M8.40276 5.88205C8.40259 7.05058 8.75048 8.19267 9.40204 9.16268C10.0536 10.1327 10.9793 10.8866 12.0611 11.3284C13.143 11.7701 14.3318 11.8796 15.4761 11.6429C16.6204 11.4062 17.6683 10.8341 18.4861 9.99941V10.0834C18.4861 14.7243 14.7242 18.4862 10.0833 18.4862C5.44247 18.4862 1.68054 14.7243 1.68054 10.0834C1.68054 5.44259 5.44247 1.68066 10.0833 1.68066H10.1673C9.60775 2.22779 9.16333 2.88139 8.86028 3.60295C8.55722 4.32451 8.40166 5.09943 8.40276 5.88205V5.88205ZM3.3611 10.0834C3.36049 11.5833 3.86151 13.0403 4.78444 14.2226C5.70737 15.4049 6.99919 16.2446 8.45437 16.608C9.90954 16.9715 11.4445 16.8379 12.8149 16.2284C14.1854 15.6189 15.3127 14.5686 16.0174 13.2446C14.7632 13.54 13.4543 13.5102 12.215 13.1578C10.9756 12.8054 9.84679 12.1422 8.93568 11.2311C8.02457 10.32 7.36136 9.19119 7.00898 7.95181C6.6566 6.71243 6.62672 5.40357 6.92219 4.1494C5.84629 4.72259 4.94652 5.57759 4.31923 6.62288C3.69194 7.66817 3.36074 8.86438 3.3611 10.0834V10.0834Z"
                    fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_420_119">
                    <rect width="20.1667" height="20.1667" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span class="block dark:hidden">
              <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1_11114)">
                  <path
                    d="M11.5658 16.4998C10.1071 16.4998 8.70815 15.9204 7.6767 14.8889C6.64525 13.8575 6.06579 12.4585 6.06579 10.9998C6.06579 9.54115 6.64525 8.1422 7.6767 7.11075C8.70815 6.0793 10.1071 5.49984 11.5658 5.49984C13.0245 5.49984 14.4234 6.0793 15.4549 7.11075C16.4863 8.1422 17.0658 9.54115 17.0658 10.9998C17.0658 12.4585 16.4863 13.8575 15.4549 14.8889C14.4234 15.9204 13.0245 16.4998 11.5658 16.4998ZM11.5658 14.6665C12.5382 14.6665 13.4709 14.2802 14.1585 13.5926C14.8461 12.9049 15.2325 11.9723 15.2325 10.9998C15.2325 10.0274 14.8461 9.09475 14.1585 8.40711C13.4709 7.71948 12.5382 7.33317 11.5658 7.33317C10.5933 7.33317 9.6607 7.71948 8.97306 8.40711C8.28543 9.09475 7.89912 10.0274 7.89912 10.9998C7.89912 11.9723 8.28543 12.9049 8.97306 13.5926C9.6607 14.2802 10.5933 14.6665 11.5658 14.6665ZM10.6491 0.916504H12.4825V3.6665H10.6491V0.916504ZM10.6491 18.3332H12.4825V21.0832H10.6491V18.3332ZM3.78787 4.51809L5.08404 3.22192L7.02829 5.16617L5.73212 6.46234L3.78787 4.519V4.51809ZM16.1033 16.8335L17.3995 15.5373L19.3437 17.4816L18.0475 18.7778L16.1033 16.8335ZM18.0475 3.221L19.3437 4.51809L17.3995 6.46234L16.1033 5.16617L18.0475 3.22192V3.221ZM5.73212 15.5373L7.02829 16.8335L5.08404 18.7778L3.78787 17.4816L5.73212 15.5373ZM21.6491 10.0832V11.9165H18.8991V10.0832H21.6491ZM4.23245 10.0832V11.9165H1.48245V10.0832H4.23245Z"
                    fill="#181C31" />
                </g>
                <defs>
                  <clipPath id="clip0_1_11114">
                    <rect width="22" height="22" fill="white" transform="translate(0.565796)" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </label>
          <a href="signin.html"
            class="hidden py-[10px] px-6 text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary sm:inline-block">
            Sign In
          </a>

          <a href="signup.html"
            class="hidden rounded-md bg-primary py-[10px] px-[30px] text-base font-medium text-white hover:bg-opacity-90 sm:inline-block">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  </header>
  <!-- ======= Header End ======= -->

  <!-- ======= Main Start ======= -->
  <main>
    <!-- ======= 404 Start ======= -->
    <section class="pt-[150px] pb-[110px] lg:pt-[220px]">
      <div class="container overflow-hidden lg:max-w-[1250px]">
        <div class="mx-auto w-full max-w-[570px]">
          <div class="wow fadeInUp mb-8 w-full" data-wow-delay=".2s">
            <img src="images/404.svg" alt="404" class="mx-auto max-w-full" />
          </div>

          <div class="wow fadeInUp text-center" data-wow-delay=".2s">
            <h2 class="mb-[18px] text-[28px] font-bold text-black dark:text-white sm:text-[35px]">
              Sorry, the page can't be found
            </h2>
            <p class="mb-[30px] text-base font-medium text-body sm:text-lg">
              The page you were looking for appears to have been moved,
              deleted or does not exist.
            </p>

            <a href="index.html"
              class="inline-flex justify-center rounded-md bg-primary py-3 px-8 text-base font-medium text-white hover:bg-opacity-90">
              Back to homepage
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- ======= 404 End ======= -->
  </main>
  <!-- ======= Main End ======= -->

  <!-- ======= Footer Start ======= -->
  <footer>
    <div class="bg-[#F8FAFB] pt-[95px] pb-[46px] dark:bg-[#15182A]">
      <div class="container max-w-[1390px]">
        <div class="-mx-4 flex flex-wrap">
          <div class="w-full px-4 lg:w-4/12 xl:w-5/12">
            <div class="wow fadeInUp mb-11 max-w-[320px]" data-wow-delay=".2s">
              <a href="index.html" class="mb-8 inline-block">
                <img src="images/logo.svg" alt="logo" class="block max-w-full dark:hidden" />
                <img src="images/logo-white.svg" alt="logo" class="hidden max-w-full dark:block" />
              </a>
              <p class="text-base text-body">
                This membership will help you plan and execute a variety of
                projects.
              </p>
            </div>
          </div>

          <div class="w-full px-4 lg:w-8/12 xl:w-7/12">
            <div class="-mx-4 flex flex-wrap">
              <div class="w-full px-4 sm:w-1/2 md:w-2/12 lg:w-2/12">
                <div class="wow fadeInUp mb-11" data-wow-delay=".25s">
                  <h3 class="mb-8 text-[22px] font-medium text-black dark:text-white">
                    Home
                  </h3>

                  <ul class="space-y-[10px]">
                    <li>
                      <a href="javascript:void(0)" class="inline-block text-base text-body hover:text-primary">
                        Product
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="inline-block text-base text-body hover:text-primary">
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="inline-block text-base text-body hover:text-primary">
                        Business
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="inline-block text-base text-body hover:text-primary">
                        Enterprise
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="w-full px-4 sm:w-1/2 md:w-3/12 lg:w-3/12">
                <div class="wow fadeInUp mb-11" data-wow-delay=".3s">
                  <h3 class="mb-8 text-[22px] font-medium text-black dark:text-white">
                    About Us
                  </h3>

                  <ul class="space-y-[10px]">
                    <li>
                      <a href="javascript:void(0)" class="inline-block text-base text-body hover:text-primary">
                        Company
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="inline-block text-base text-body hover:text-primary">
                        Leadership
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="inline-block text-base text-body hover:text-primary">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="inline-block text-base text-body hover:text-primary">
                        Diversity
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="w-full px-4 sm:w-1/2 md:w-3/12 lg:w-3/12">
                <div class="wow fadeInUp mb-11" data-wow-delay=".35s">
                  <h3 class="mb-8 text-[22px] font-medium text-black dark:text-white">
                    Resources
                  </h3>

                  <ul class="space-y-[10px]">
                    <li>
                      <a href="javascript:void(0)" class="inline-block text-base text-body hover:text-primary">
                        Andy Guide
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="inline-block text-base text-body hover:text-primary">
                        Forum
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="inline-block text-base text-body hover:text-primary">
                        Support
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="inline-block text-base text-body hover:text-primary">
                        App Directory
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="w-full px-4 sm:w-1/2 md:w-4/12 lg:w-4/12">
                <div class="wow fadeInUp mb-11" data-wow-delay=".4s">
                  <h3 class="mb-8 text-[22px] font-medium text-black dark:text-white">
                    Tutorial
                  </h3>

                  <ul class="space-y-[10px]">
                    <li>
                      <a href="javascript:void(0)" class="inline-block text-base text-body hover:text-primary">
                        10 Leadership Styles
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="inline-block text-base text-body hover:text-primary">
                        Executive Summary Tips
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="inline-block text-base text-body hover:text-primary">
                        Prevent Team Burnout
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="inline-block text-base text-body hover:text-primary">
                        What are OKRs?
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wow fadeInUp bg-primary py-7 dark:bg-black" data-wow-delay=".2s">
      <div class="container max-w-[1390px]">
        <div class="-mx-3 flex flex-wrap">
          <div class="order-last w-full px-3 lg:order-first lg:w-1/3">
            <p class="mt-4 text-center text-base text-white lg:mt-0 lg:text-left">
              &copy; 2025 Appline. All rights reserved
            </p>
          </div>

          <div class="w-full px-3 md:w-1/2 lg:w-1/3">
            <div class="mb-4 flex items-center justify-center space-x-5 md:mb-0 md:justify-start lg:justify-center">
              <a href="javascript:void(0)" class="text-white opacity-70 hover:opacity-100" name="social icon"
                aria-label="social icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_53_163)">
                    <path
                      d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"
                      fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_53_163">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>

              <a href="javascript:void(0)" class="text-white opacity-70 hover:opacity-100" name="social icon"
                aria-label="social icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_53_166)">
                    <path
                      d="M22.162 5.65593C21.3986 5.99362 20.589 6.2154 19.76 6.31393C20.6337 5.79136 21.2877 4.96894 21.6 3.99993C20.78 4.48793 19.881 4.82993 18.944 5.01493C18.3146 4.34151 17.4804 3.89489 16.571 3.74451C15.6615 3.59413 14.7279 3.74842 13.9153 4.18338C13.1026 4.61834 12.4564 5.30961 12.0771 6.14972C11.6978 6.98983 11.6067 7.93171 11.818 8.82893C10.1551 8.74558 8.52833 8.31345 7.04329 7.56059C5.55824 6.80773 4.24813 5.75098 3.198 4.45893C2.82629 5.09738 2.63095 5.82315 2.632 6.56193C2.632 8.01193 3.37 9.29293 4.492 10.0429C3.82801 10.022 3.17863 9.84271 2.598 9.51993V9.57193C2.5982 10.5376 2.93237 11.4735 3.54385 12.221C4.15533 12.9684 5.00648 13.4814 5.953 13.6729C5.33661 13.84 4.69031 13.8646 4.063 13.7449C4.32987 14.5762 4.85001 15.3031 5.55059 15.824C6.25118 16.345 7.09713 16.6337 7.97 16.6499C7.10248 17.3313 6.10918 17.8349 5.04688 18.1321C3.98458 18.4293 2.87413 18.5142 1.779 18.3819C3.6907 19.6114 5.9161 20.2641 8.189 20.2619C15.882 20.2619 20.089 13.8889 20.089 8.36193C20.089 8.18193 20.084 7.99993 20.076 7.82193C20.8949 7.2301 21.6016 6.49695 22.163 5.65693L22.162 5.65593Z"
                      fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_53_166">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>

              <a href="javascript:void(0)" class="text-white opacity-70 hover:opacity-100" name="social icon"
                aria-label="social icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_53_169)">
                    <path
                      d="M6.94 5.00002C6.93974 5.53046 6.72877 6.03906 6.35351 6.41394C5.97825 6.78883 5.46943 6.99929 4.939 6.99902C4.40857 6.99876 3.89996 6.78779 3.52508 6.41253C3.15019 6.03727 2.93973 5.52846 2.94 4.99802C2.94027 4.46759 3.15123 3.95899 3.52649 3.5841C3.90175 3.20922 4.41057 2.99876 4.941 2.99902C5.47143 2.99929 5.98004 3.21026 6.35492 3.58552C6.72981 3.96078 6.94027 4.46959 6.94 5.00002ZM7 8.48002H3V21H7V8.48002ZM13.32 8.48002H9.34V21H13.28V14.43C13.28 10.77 18.05 10.43 18.05 14.43V21H22V13.07C22 6.90002 14.94 7.13002 13.28 10.16L13.32 8.48002Z"
                      fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_53_169">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>

              <a href="javascript:void(0)" class="text-white opacity-70 hover:opacity-100" name="social icon"
                aria-label="social icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_53_172)">
                    <path
                      d="M7.443 5.3501C8.082 5.3501 8.673 5.4001 9.213 5.5481C9.70302 5.63814 10.1708 5.82293 10.59 6.0921C10.984 6.3391 11.279 6.6861 11.475 7.1311C11.672 7.5761 11.77 8.1211 11.77 8.7141C11.77 9.4071 11.623 10.0001 11.279 10.4451C10.984 10.8911 10.492 11.2861 9.902 11.5831C10.738 11.8311 11.377 12.2761 11.77 12.8691C12.164 13.4631 12.41 14.2051 12.41 15.0461C12.41 15.7391 12.262 16.3321 12.016 16.8271C11.77 17.3221 11.377 17.7671 10.934 18.0641C10.4528 18.3825 9.92084 18.6165 9.361 18.7561C8.771 18.9051 8.181 19.0041 7.591 19.0041H1V5.3501H7.443ZM7.049 10.8901C7.59 10.8901 8.033 10.7421 8.377 10.4951C8.721 10.2481 8.869 9.8021 8.869 9.2581C8.869 8.9611 8.819 8.6641 8.721 8.4671C8.623 8.2691 8.475 8.1201 8.279 7.9721C8.082 7.8731 7.885 7.7741 7.639 7.7251C7.393 7.6751 7.148 7.6751 6.852 7.6751H4V10.8911H7.05L7.049 10.8901ZM7.197 16.7281C7.492 16.7281 7.787 16.6781 8.033 16.6291C8.28138 16.5819 8.51628 16.4805 8.721 16.3321C8.92139 16.1873 9.08903 16.002 9.213 15.7881C9.311 15.5411 9.41 15.2441 9.41 14.8981C9.41 14.2051 9.213 13.7101 8.82 13.3641C8.426 13.0671 7.885 12.9191 7.246 12.9191H4V16.7291H7.197V16.7281ZM16.689 16.6781C17.082 17.0741 17.672 17.2721 18.459 17.2721C19 17.2721 19.492 17.1241 19.885 16.8771C20.279 16.5801 20.525 16.2831 20.623 15.9861H23.033C22.639 17.1731 22.049 18.0141 21.263 18.5581C20.475 19.0531 19.541 19.3501 18.41 19.3501C17.6864 19.3523 16.9688 19.2179 16.295 18.9541C15.6887 18.7266 15.148 18.3529 14.721 17.8661C14.2643 17.4107 13.9267 16.8498 13.738 16.2331C13.492 15.5901 13.393 14.8981 13.393 14.1061C13.393 13.3641 13.492 12.6721 13.738 12.0281C13.9745 11.4082 14.3245 10.8378 14.77 10.3461C15.213 9.9011 15.754 9.5061 16.344 9.2581C17.0007 8.99416 17.7022 8.85969 18.41 8.8621C19.246 8.8621 19.984 9.0111 20.623 9.3571C21.263 9.7031 21.754 10.0991 22.148 10.6931C22.5499 11.2636 22.8494 11.8998 23.033 12.5731C23.131 13.2651 23.18 13.9581 23.131 14.7491H16C16 15.5411 16.295 16.2831 16.689 16.6791V16.6781ZM19.787 11.4841C19.443 11.1381 18.902 10.9401 18.262 10.9401C17.82 10.9401 17.475 11.0391 17.18 11.1871C16.885 11.3361 16.689 11.5341 16.492 11.7321C16.311 11.9234 16.1912 12.1643 16.148 12.4241C16.098 12.6721 16.049 12.8691 16.049 13.0671H20.475C20.377 12.3251 20.131 11.8311 19.787 11.4841ZM15.459 6.2901H20.967V7.6261H15.46V6.2901H15.459Z"
                      fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_53_172">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          </div>

          <div class="w-full px-3 md:w-1/2 lg:w-1/3">
            <div class="flex items-center justify-center space-x-4 sm:space-x-8 md:justify-end lg:justify-end">
              <a href="javascript:void(0)" class="text-base text-white">
                Privacy Policy
              </a>
              <a href="javascript:void(0)" class="text-base text-white">
                Terms and conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- ======= Footer End ======= -->

  <!-- ======= Back To Top Start ======= -->
  <a href="javascript:void(0)"
    class="back-to-top fixed bottom-8 right-8 left-auto z-[999] hidden h-10 w-10 items-center justify-center rounded-md bg-primary text-white shadow-md duration-300 ease-in-out hover:bg-opacity-80">
    <span class="mt-[6px] h-3 w-3 rotate-45 border-t border-l border-white"></span>
  </a>
  <!-- ======= Back To Top End ======= -->
  <script defer src="bundle.js"></script>
</body>

</html>



// js- rolling-text.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize after a short delay to ensure DOM is fully loaded
    setTimeout(() => {
        const phrases = document.querySelectorAll('.rolling-text span');
        const rollingContainer = document.querySelector('.rolling-text');
        let currentIndex = 0;
        
        if (phrases.length === 0) return; // Exit if no phrases found
    
        // Calculate the maximum width needed for all phrases
        let maxWidth = 0;
        phrases.forEach(phrase => {
            phrase.style.position = 'static';
            phrase.style.visibility = 'hidden';
            phrase.style.opacity = '1';
            const width = phrase.offsetWidth;
            if (width > maxWidth) maxWidth = width;
            phrase.style.position = 'absolute';
            phrase.style.visibility = 'visible';
            phrase.style.opacity = '0';
        });
        
        // Set the container width to the maximum width
        rollingContainer.style.width = maxWidth + 'px';
        
        // Make sure all phrases are hidden initially
        phrases.forEach(phrase => {
            phrase.style.opacity = "0";
            phrase.style.transform = "rotateX(-90deg)";
        });
        
        // Set the first phrase as active after a small delay
        setTimeout(() => {
            phrases[0].classList.add('active');
        }, 200);
        
        // Change phrase every 5 seconds
        setInterval(() => {
            // Remove active class from current phrase and add inactive
            phrases[currentIndex].classList.remove('active');
            phrases[currentIndex].classList.add('inactive');
            
            // Update index to next phrase
            currentIndex = (currentIndex + 1) % phrases.length;
            
            // Small delay before showing the new phrase
            setTimeout(() => {
                // Remove inactive class from all phrases
                phrases.forEach(phrase => {
                    phrase.classList.remove('inactive');
                });
                
                // Add active class to new current phrase
                phrases[currentIndex].classList.add('active');
            }, 500);
        }, 5000);
    }, 100);
});


give new folder structure of react..
current are
PS C:\Users\anilv\Documents\Aibak\bookie_buddy_web> cd .\bookie-buddy-web\
PS C:\Users\anilv\Documents\Aibak\bookie_buddy_web\bookie-buddy-web> ls 


    Directory: C:\Users\anilv\Documents\Aibak\bookie_buddy_web\bookie-buddy-web


Mode                 LastWriteTime         Length Name                                                                                           
----                 -------------         ------ ----                                                                                           
d-----        12-06-2026  02:10 PM                node_modules                                                                                   
d-----        12-06-2026  02:09 PM                public                                                                                         
d-----        12-06-2026  02:09 PM                src                                                                                            
-a----        12-06-2026  02:01 PM            253 .gitignore                                                                                     
-a----        12-06-2026  02:01 PM            568 eslint.config.js                                                                               
-a----        12-06-2026  02:09 PM            368 index.html                                                                                     
-a----        12-06-2026  02:10 PM          83813 package-lock.json                                                                              
-a----        12-06-2026  02:09 PM            613 package.json                                                                                   
-a----        12-06-2026  02:01 PM           1027 README.md                                                                                      
-a----        12-06-2026  02:01 PM            161 vite.config.js                                                                                 


PS C:\Users\anilv\Documents\Aibak\bookie_buddy_web\bookie-buddy-web> 
where do i add this above mentioned files..
current folder structure of html code are
C:\Users\anilv\Documents\Aibak\bookie buddy html\Bookie-buddy-website>dir
 Volume in drive C is Windows-SSD
 Volume Serial Number is E0D7-E6DE

 Directory of C:\Users\anilv\Documents\Aibak\bookie buddy html\Bookie-buddy-website

13-06-2026  10:38    <DIR>          .
13-06-2026  10:38    <DIR>          ..
13-06-2026  10:38                 9 .gitignore
13-06-2026  10:38    <DIR>          .vscode
13-06-2026  10:57            26,784 404.html
13-06-2026  10:56           544,967 bundle.js
13-06-2026  10:38         1,196,303 client image.png
13-06-2026  10:38            15,406 favicon.ico
13-06-2026  10:38    <DIR>          images
13-06-2026  10:55           186,124 index.html
13-06-2026  10:38    <DIR>          js
13-06-2026  10:55            98,737 style.css
               7 File(s)      2,068,330 bytes
               5 Dir(s)  161,616,945,152 bytes free

C:\Users\anilv\Documents\Aibak\bookie buddy html\Bookie-buddy-website>cd js

C:\Users\anilv\Documents\Aibak\bookie buddy html\Bookie-buddy-website\js>dir
 Volume in drive C is Windows-SSD
 Volume Serial Number is E0D7-E6DE

 Directory of C:\Users\anilv\Documents\Aibak\bookie buddy html\Bookie-buddy-website\js

13-06-2026  10:38    <DIR>          .
13-06-2026  10:38    <DIR>          ..
13-06-2026  10:57             2,356 rolling-text.js
               1 File(s)          2,356 bytes
               2 Dir(s)  161,619,279,872 bytes free

C:\Users\anilv\Documents\Aibak\bookie buddy html\Bookie-buddy-website\js>cd ..

C:\Users\anilv\Documents\Aibak\bookie buddy html\Bookie-buddy-website>dir images/
Invalid switch - "".

C:\Users\anilv\Documents\Aibak\bookie buddy html\Bookie-buddy-website>cd images

C:\Users\anilv\Documents\Aibak\bookie buddy html\Bookie-buddy-website\images>ls
'ls' is not recognized as an internal or external command,
operable program or batch file.

C:\Users\anilv\Documents\Aibak\bookie buddy html\Bookie-buddy-website\images>dir
 Volume in drive C is Windows-SSD
 Volume Serial Number is E0D7-E6DE

 Directory of C:\Users\anilv\Documents\Aibak\bookie buddy html\Bookie-buddy-website\images

13-06-2026  10:38    <DIR>          .
13-06-2026  10:38    <DIR>          ..
13-06-2026  10:38             3,244 404.svg
13-06-2026  10:38           111,104 about-1-light.png
13-06-2026  10:38           102,998 about-2-light.png
13-06-2026  10:38            16,280 aibak_logo.svg
13-06-2026  10:38            30,688 apple-touch-icon.png
13-06-2026  10:38            20,067 Best Kerala.png
13-06-2026  10:38            19,906 Best Saas.png
13-06-2026  10:38           120,181 Best Saas1.png
13-06-2026  10:38             7,617 Best startup.png
13-06-2026  10:38            98,844 blog-01.jpg
13-06-2026  10:38            63,797 blog-02.jpg
13-06-2026  10:38           126,724 blog-03.jpg
13-06-2026  10:38           367,146 blog-detail.jpg
13-06-2026  10:38         5,513,818 bookings icon.png
13-06-2026  10:38            85,488 client 1.png
13-06-2026  10:38             7,001 client-01.svg
13-06-2026  10:38             5,870 client-02.svg
13-06-2026  10:38             1,076 client-03.svg
13-06-2026  10:38               890 client-04.svg
13-06-2026  10:38             8,814 client-06.svg
13-06-2026  10:38    <DIR>          clients
13-06-2026  10:38            68,423 cta-light.png
13-06-2026  10:38            89,506 donwnload-image.png
13-06-2026  10:38         8,133,602 expense icon.png
13-06-2026  10:38               454 favicon-16x16.png
13-06-2026  10:38             1,849 favicon-32x32.png
13-06-2026  10:38           217,715 Group 10.png
13-06-2026  10:38           640,171 Group 6.png
13-06-2026  10:38           476,323 heading1.png
13-06-2026  10:38           103,633 hero-light.png
13-06-2026  10:38            26,453 Holding the arrow.gif
13-06-2026  10:38         7,090,157 invoice icon.png
13-06-2026  10:38         4,417,019 ledger icon.png
13-06-2026  10:38             5,948 logo-white.svg
13-06-2026  10:38           244,911 logo.svg
13-06-2026  10:38            46,663 logo2.png
13-06-2026  10:38         5,119,889 love emoji.png
13-06-2026  10:38            18,308 mobile-frame.png
13-06-2026  10:38           987,398 Mobiles1.png
13-06-2026  10:38           850,107 Mobiles2.png
13-06-2026  10:38           713,686 Mobiles3.png
13-06-2026  10:38         8,247,456 multi shop icon.png
13-06-2026  10:38            21,145 national award.png
13-06-2026  10:38         2,017,537 phone in hand.png
13-06-2026  10:38            74,472 screen-1-light.png
13-06-2026  10:38            87,916 screen-2-light.png
13-06-2026  10:38            92,458 screen-3-light.png
13-06-2026  10:38           807,859 Scrnshot1.jpg
13-06-2026  10:38           464,731 Scrnshot2.jpg
13-06-2026  10:38         1,042,469 Scrnshot3.png
13-06-2026  10:38           504,419 Scrnshot4.png
13-06-2026  10:38         1,156,403 Scrnshot5.png
13-06-2026  10:38           848,747 Scrnshot6.png
13-06-2026  10:38           684,884 Scrnshot7.png
13-06-2026  10:38           527,183 Stock management.png
13-06-2026  10:38            69,725 texture.svg
13-06-2026  10:38         4,057,569 thumbsup icon.png
13-06-2026  10:38            87,077 User-1.jpg
13-06-2026  10:38            20,226 User-2.jpg
13-06-2026  10:38            62,108 User-3.jpg
13-06-2026  10:38         4,490,521 User-4.png
13-06-2026  10:38            31,177 User-5.png
13-06-2026  10:38            41,895 User-6.png
              62 File(s)     61,401,745 bytes
               3 Dir(s)  161,635,418,112 bytes free

C:\Users\anilv\Documents\Aibak\bookie buddy html\Bookie-buddy-website\images>