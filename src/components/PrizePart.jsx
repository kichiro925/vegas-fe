import React, { useEffect, useState } from "react";
import jp_bronze_frame from '../assets/img/themes/jp_bronze_frame.png';
import jp_silver_frame from '../assets/img/themes/jp_silver_frame.png';
import jp_gold_frame from '../assets/img/themes/jp_gold_frame.png';
import jp_bronze_logo from '../assets/img/themes/jp_bronze_logo.png';
import jp_silver_logo from '../assets/img/themes/jp_silver_logo.png';
import jp_gold_logo from '../assets/img/themes/jp_gold_logo.png';
import useApi from "../hooks/useApi";

const PrizePart = () => {
    const { getJackpot } = useApi();

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const [jackpots, setJackpots] = useState([]);

    const [isPrizeBottom, setIsPrizeBottom] = useState(windowSize.height * 0.174);
    const [isPrizeHeight, setIsPrizeHeight] = useState(windowSize.height * 0.059);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            setWindowSize({ width, height });
            setIsPrizeBottom(height * 0.174);
            setIsPrizeHeight(height * 0.059);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);
        window.addEventListener('scroll', handleResize);
        window.visualViewport?.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
            window.removeEventListener('scroll', handleResize);
            window.visualViewport?.removeEventListener('resize', handleResize);
        };
    }, []);

    const getJackpots = async () => {
        const res = await getJackpot();
        if (res?.data) {
            setJackpots(res.data);
        }
    }

    useEffect(() => {
        getJackpots();
    }, []);

    return (
        <>
            <div className="flex z-[50] mh-display-none md:hidden justify-between fixed h-[4.34%] w-full bottom-[15%] px-[1.86%]">
                <div className="flex flex-col items-center justify-center h-[100%] w-[29.3%]" style={{ backgroundImage: `url(${jp_bronze_frame})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <p className="font-['Impact'] text-[1.5rem] text-white">{Math.floor(jackpots?.bronze * 100)}</p>
                </div>
                <div className="flex flex-col items-center justify-center h-[100%] w-[29.3%]" style={{ backgroundImage: `url(${jp_silver_frame})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <p className="font-['Impact'] text-[1.5rem] text-white">{Math.floor(jackpots?.silver * 100)}</p>
                </div>
                <div className="flex flex-col items-center justify-center h-[100%] w-[29.3%]" style={{ backgroundImage: `url(${jp_gold_frame})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <p className="font-['Impact'] text-[1.5rem] text-white">{Math.floor(jackpots?.gold * 100)}</p>
                </div>
            </div>

            <div className="mh-middle-part hidden mh-display-show md:flex lg:hidden fixed w-full pl-[10.75%] pr-[15.53%]"
                style={{ height: `${isPrizeHeight}px`, bottom: `${isPrizeBottom}px` }}
            >
                <div className="mh-middle-part-mt flex flex-col items-center justify-center mt-[-7px] h-[135%] w-[16.67%]" style={{ backgroundImage: `url(${jp_bronze_logo})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                <div className="flex flex-col items-center justify-center h-[100%] w-[16.67%]" style={{ backgroundImage: `url(${jp_bronze_frame})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <p className="font-['Impact'] text-[2.2rem] text-white">{Math.floor(jackpots?.bronze * 100)}</p>
                </div>
                <div className="mh-middle-part-mt flex flex-col items-center justify-center mt-[-7px] h-[135%] w-[16.67%]" style={{ backgroundImage: `url(${jp_silver_logo})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                <div className="flex flex-col items-center justify-center h-[100%] w-[16.67%]" style={{ backgroundImage: `url(${jp_silver_frame})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <p className="font-['Impact'] text-[2.2rem] text-white">{Math.floor(jackpots?.silver * 100)}</p>
                </div>
                <div className="mh-middle-part-mt flex flex-col items-center justify-center mt-[-7px] h-[135%] w-[16.67%]" style={{ backgroundImage: `url(${jp_gold_logo})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                <div className="flex flex-col items-center justify-center h-[100%] w-[16.67%]" style={{ backgroundImage: `url(${jp_gold_frame})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <p className="font-['Impact'] text-[2.2rem] text-white">{Math.floor(jackpots?.gold * 100)}</p>
                </div>
            </div>
        </>
    );
};

export default PrizePart;