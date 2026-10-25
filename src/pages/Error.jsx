import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {

    const navigate = useNavigate();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [boxHeight, setBoxHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setBoxHeight(window.innerWidth * 0.309);
        };

        handleResize(); // Initial calculation
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='w-full flex items-center justify-center h-screen bg-errorBg'>
            <div
                className="flex justify-center items-center w-[43.6%] lg:w-[446px] lg:h-[302px] bg-errorBtn border-[1px] border-errorBtn rounded-[10px] absolute lg:top-[38.13%] top-[38%]"
                style={{ height: windowWidth < 1024 ? `${boxHeight}px` : '34.88%' }}
            >
                <div className="relative flex flex-col justify-center items-center text-white w-full h-full">
                    <p className="text-[10px] sm:text-[20px] md:text-[22px] lg:text-[24px]">LOGIN FAILED</p>
                    <div className="absolute flex justify-center bottom-[4.33%] w-full h-[21.81%] lg:h-[67px]">
                        <button className="rounded-[4px] bg-lgBtnBg w-[24.71%] lg:w-[110px] h-full lg:py-[15px] lg:px-[32px] text-[12px] sm:text-[24px] md:text-[28px] lg:text-[32px] text-white flex items-center justify-center" onClick={() => navigate('/login')}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;
