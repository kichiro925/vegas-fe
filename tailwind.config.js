/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        headerBg: '#1f2023',
        bronzeBg: '#b16b45',
        cashbackBg: '#420571',
        cashbackFt: '#ffa500',
        cashbacktx: '#ffff00',
        searchTx: '#2390c2',
        borderTx: '#ced4da',
        lgBtnBg: '#007bff',
        borderTx2: '#ced4da',
        errorBg: '#3253c1',
        errorBtn: 'rgba(169, 161, 161, 0.7)',
        splashTx: '#fcfc00',
        preloaderBg: '#420571',
        bonusTx: '#ffff00',
        settingBg: '#9176D4',
        settingHeadBorder: '#dee2e6',
        emailBg: '#e9ecef', 
        emailBd: '#ced4da',
        emailTx: '#495057',
        saveBg: '#007bff',
        referralTx: '#00ffff',
        referralTx2: '#ffff00',
        referralTx3: '#28a745',
        referralTx4: '#212529',
        referralTx5: '#f8f9fa',
        referralTx6: '#ffa500',
        attentionBg: '#dc3545',
        jackBd: '#dd26e0',
        bannerBd: '#a35ef1',
      },
      screens: {
        'screen-7': '866px',
        'screen-6': '413px',
        'screen-5': '500px',
        'md': '768px',
        'lg': '1025px',
        'screen-4': '992px',
        'screen-3': '1200px',
        'screen-2': '1350px',
        'screen-1': '1560px',
      },
      height: {
        'screen-sm': '700px',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui'],
        impact: ['Impact', 'sans-serif'],
      },
      fontSize: {
        base: ['16px', '20.16px'],
      },
      keyframes: {
        zoomEffect: {
          '0%': {
              transform: 'scale(2)',
              backgroundPosition: '50% 50%',
          },
          '25%': {
              transform: 'scale(1.75)',
              backgroundPosition: '30% 15%',
          },
          '50%': {
              transform: 'scale(1.5)',
              backgroundPosition: '20% 10%',
          },
          '75%': {
              transform: 'scale(1.25)',
              backgroundPosition: '40% 15%',
          },
          '100%': {
              transform: 'scale(1.1)',
              backgroundPosition: '50% 50%',
          }
        },
        preloaderImg: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          }
        },
        slowSpin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        zoomEffect: 'zoomEffect 60s ease-in-out infinite alternate',
        preloaderImg: 'preloaderImg 1s linear infinite',
        slowSpin: 'slow-spin 10s linear infinite',
      },
    },
  },
  plugins: [],
}