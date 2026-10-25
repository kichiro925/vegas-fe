import React, { useState, useEffect } from 'react';
import preloader from '../assets/img/themes/preloader.png';
import { useDispatch, useSelector } from 'react-redux';
import { setIsFirstLoad } from '../store/reducers/load';

const PreLoader = () => {
    const dispatch = useDispatch();
    const isFirstLoad = useSelector((state) => state.load.isFirstLoad);
    const [loadingPercent, setLoadingPercent] = useState(0);

    useEffect(() => {
        if (isFirstLoad) {
            const interval = setInterval(() => {
                setLoadingPercent((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 7);

            return () => clearInterval(interval);
        }

        return () => clearInterval();
    }, [isFirstLoad]);

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center bg-preloaderBg">
            <p className="text-white text-[20px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-['Impact'] mb-[25px]" style={{ textShadow: '2px 4px 3px rgba(0,0,0,1)' }}>Loading {loadingPercent}%</p>
            <img src={preloader} alt="preloader" className="w-[100px] h-[100px] animate-preloaderImg" />
        </div>
    );
};

export default PreLoader;

