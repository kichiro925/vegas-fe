import React, { useEffect, useState } from 'react';
import welcomeImg from '../assets/img/welcome.png';
import welcome_mobile from '../assets/img/welcome_mobile.png';

const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkening, setIsDarkening] = useState(false);
  const [isBrightening, setIsBrightening] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    const darkenTimer = setTimeout(() => {
      setIsDarkening(true);
      setBgOpacity(0.9);
    }, 100);

    const brightenTimer = setTimeout(() => {
      setIsBrightening(true);
      setBgOpacity(0);
    }, 1000);

    const imageFadeTimer = setTimeout(() => {
      setShowImage(false);
    }, 5000);

    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 6000);

    return () => {
      clearTimeout(darkenTimer);
      clearTimeout(brightenTimer);
      clearTimeout(imageFadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 w-full h-auto flex justify-center items-center z-50 overflow-hidden m-0 p-0 box-border'>
      <div 
        className="absolute inset-0 bg-black"
        style={{
          opacity: bgOpacity,
          transition: 'opacity 1000ms ease-out',
        }}
      />
      {showImage && (
        <>
          <img 
            src={welcomeImg} 
            alt="Welcome" 
            className="hidden md:block w-[60%] h-full max-w-full max-h-full object-contain relative z-10"
            style={{
              opacity: isBrightening ? 0 : 1,
              transition: 'opacity 3500ms ease-out',
              willChange: 'opacity'
            }}
          />
          <img 
            src={welcome_mobile} 
            alt="Welcome Mobile" 
            className="block md:hidden w-[64%] h-full max-w-full max-h-full object-contain relative z-10 scale-[1.5]"
            style={{
              opacity: isBrightening ? 0 : 1,
              transition: 'opacity 3500ms ease-out',
              willChange: 'opacity'
            }}
          />
        </>
      )}
    </div>
  );
};

export default SplashScreen; 