const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <label
      htmlFor="themeSwitcher"
      className="inline-flex cursor-pointer items-center"
      aria-label="Toggle theme"
    >
      <input
        type="checkbox"
        name="themeSwitcher"
        id="themeSwitcher"
        className="sr-only"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      {/* Dark mode icon (moon) — visible in dark */}
      <span className="hidden dark:block">
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_420_119)">
            <path
              d="M8.40276 5.88205C8.40259 7.05058 8.75048 8.19267 9.40204 9.16268C10.0536 10.1327 10.9793 10.8866 12.0611 11.3284C13.143 11.7701 14.3318 11.8796 15.4761 11.6429C16.6204 11.4062 17.6683 10.8341 18.4861 9.99941V10.0834C18.4861 14.7243 14.7242 18.4862 10.0833 18.4862C5.44247 18.4862 1.68054 14.7243 1.68054 10.0834C1.68054 5.44259 5.44247 1.68066 10.0833 1.68066H10.1673C9.60775 2.22779 9.16333 2.88139 8.86028 3.60295C8.55722 4.32451 8.40166 5.09943 8.40276 5.88205ZM3.3611 10.0834C3.36049 11.5833 3.86151 13.0403 4.78444 14.2226C5.70737 15.4049 6.99919 16.2446 8.45437 16.608C9.90954 16.9715 11.4445 16.8379 12.8149 16.2284C14.1854 15.6189 15.3127 14.5686 16.0174 13.2446C14.7632 13.54 13.4543 13.5102 12.215 13.1578C10.9756 12.8054 9.84679 12.1422 8.93568 11.2311C8.02457 10.32 7.36136 9.19119 7.00898 7.95181C6.6566 6.71243 6.62672 5.40357 6.92219 4.1494C5.84629 4.72259 4.94652 5.57759 4.31923 6.62288C3.69194 7.66817 3.36074 8.86438 3.3611 10.0834Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_420_119">
              <rect width="20.1667" height="20.1667" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </span>
      {/* Light mode icon (sun) — visible in light */}
      <span className="block dark:hidden">
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_sun)">
            <circle cx="10.5" cy="10.5" r="4" stroke="#1D2144" strokeWidth="1.5" />
            <path d="M10.5 2V4" stroke="#1D2144" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M10.5 17V19" stroke="#1D2144" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2 10.5H4" stroke="#1D2144" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M17 10.5H19" stroke="#1D2144" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4.22 4.22L5.64 5.64" stroke="#1D2144" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15.36 15.36L16.78 16.78" stroke="#1D2144" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16.78 4.22L15.36 5.64" stroke="#1D2144" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5.64 15.36L4.22 16.78" stroke="#1D2144" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <defs>
            <clipPath id="clip0_sun">
              <rect width="21" height="21" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </span>
    </label>
  );
};

export default ThemeToggle;
