import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const LoadingOverlay = () => {
    const loading = useSelector((state) => state.load.loading);
    const [loadingPercent, setLoadingPercent] = useState(0);

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setLoadingPercent((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 50);

            return () => clearInterval(interval);
        }

        return () => clearInterval();
    }, [loading]);
    
    return (
         <div className="hidden mh-display-show absolute z-50 md:flex inset-0 w-full h-screen items-center justify-center">
            <p className="text-white mh-loading-font md:text-[45px] lg:text-[65px] tracking-[0.5rem] font-['Impact'] mb-[25px]" style={{ textShadow: '2px 4px 3px rgba(0,0,0,1)' }}>Loading {loadingPercent}%</p>
        </div>
    );
};

export default LoadingOverlay;
