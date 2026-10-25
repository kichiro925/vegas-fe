import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onFinish }) => {
  const { user } = useSelector((state) => state.auth);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 3000); // matches total animation time
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='fixed inset-0 w-full h-auto flex justify-center items-center z-50 overflow-hidden m-0 p-0 box-border'
          style={{ pointerEvents: 'none' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background animation */}
          <motion.div
            className="absolute inset-0 bg-black"
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{
              duration: 5,
              times: [0, 0.2, 1], // 0ms, 100ms, 3000ms
              ease: "easeOut",
            }}
          />

          {/* Text fade out */}
          <motion.div
            className='w-[60%] z-10 font-["Impact",sans-serif] mha-splash-fontSize text-[28px] screen-6:text-[30px] screen-5:text-[38px] sm:text-[47px] md:text-[58px] screen-4:text-[75px] screen-3:text-[90px] screen-2:text-[102px] screen-1:text-[118px] text-splashTx text-center'
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 5,
              ease: "easeOut",
            }}
          >
            <p>
              Welcome {user.username}!
              <br />
              GOOD LUCK!!!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;