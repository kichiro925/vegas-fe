import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setIsBonusModal, setIsSettingModal, setIsFavorite, setIsJackPot } from '../store/reducers/modal';
import { setGameList, setMobileGameList } from '../store/reducers/gameSlice';

import music_off from '../assets/img/temp/music_off.png';
import music_on from '../assets/img/temp/music_on.png';
import favorites from '../assets/img/temp/favorites.png';
import gear_normal from '../assets/img/temp/gear_normal.png';
import myjp_icon from '../assets/img/temp/myjp_icon.png';
import jackpotSound from '../assets/sounds/myjackpot/intro.default.mp3';
import bgmusic from '../assets/sounds/common/bgmusic.mp3';
import dailyBox from '../assets/img/themes/dailybox.png';
import goldbonusbg from '../assets/img/win/goldbonusbg.png';
import goldbonustitle from '../assets/img/win/goldbonustitle.png';
import useApi from "../hooks/useApi";

const IconMenu = () => {
    const dispatch = useDispatch();
    const [isMusicOn, setIsMusicOn] = useState(false);
    const audioRef = useRef(null);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const Api = useApi();
    const { user } = useSelector(state => state.auth);
    const [isIconWidth, setIsIconWidth] = useState(windowSize.width * 0.05);
    const [isIconHeight, setIsIconHeight] = useState(windowSize.height * 0.09);
    const [isWagerBoxWidth, setIsWagerBoxWidth] = useState(windowSize.width * 0.07);
    const [isWagerBoxHeight, setIsWagerBoxHeight] = useState(windowSize.height * 0.09);
    const [isWagerTop, setIsWagerTop] = useState(windowSize.height * 0.154);
    const [isWagerMhaTop, setIsisWagerMhaTop] = useState(windowSize.height * 0.228);
    const [isGapY, setIsGapY] = useState(windowSize.height * 0.03);
    
    const playJackpotSound = () => {
        const audio = new Audio(jackpotSound);
        audio.play();
    }

    useEffect(() => {
        audioRef.current = new Audio(bgmusic);
        audioRef.current.loop = true;
        
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (isMusicOn) {
                audioRef.current.play().catch(error => {
                    console.error('Error playing audio:', error);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isMusicOn]);
    
    const toggleMusic = () => {
        setIsMusicOn(!isMusicOn);
    }

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setWindowSize({ width, height });

            // Recalculate based on new size
            setIsIconWidth(width * 0.05);
            setIsIconHeight(height * 0.09);
            setIsWagerBoxWidth(width * 0.07);
            setIsWagerBoxHeight(height * 0.09);
            setIsWagerTop(height * 0.154);
            setIsisWagerMhaTop(height * 0.228);
            setIsGapY(height * 0.01);
        };

        handleResize(); // Call once on mount

        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);

        return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("orientationchange", handleResize);
        };
    }, []);
    
    const handleFavourite = async () => {
        const response = await Api.getFavoriteGame(user._id);
        
        console.log(response.data, user._id, "favourite, userId");
        dispatch(setGameList(response.data));
        dispatch(setMobileGameList(response.data));
        dispatch(setIsFavorite(true));
    }
    
    return (
        <>
            {/* on Mobile */}
            <div className="flex mh-display-none md:hidden justify-between fixed bottom-[20%] px-[2px] w-full h-[8.48%]">
                <div className="w-[39.6%] flex justify-between">
                    <button className="w-[50%] h-full" onClick={toggleMusic} style={{ backgroundImage: `url(${isMusicOn ? music_on : music_off})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></button>
                    <button className="w-[50%] h-full scale-[1.4]" onClick={() => { dispatch(setIsJackPot(true)) }} style={{ backgroundImage: `url(${myjp_icon})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></button>
                </div>

                <div className="w-[39.6%] flex justify-between">
                    <button className="w-[50%] h-full" onClick={handleFavourite} style={{ backgroundImage: `url(${favorites})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></button>
                    <button className="w-[50%] h-full" onClick={() => { dispatch(setIsSettingModal(true)) }} style={{ backgroundImage: `url(${gear_normal})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></button>
                </div>
            </div>
            
            {/* on Desktop */}
            
            {/* over lg */}
            <button onClick={() => { dispatch(setIsBonusModal(true)) } } className='hidden mha-hidden lg:flex absolute right-0 z-[30] justify-center items-center' style={{ backgroundImage: `url(${dailyBox})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: `${isWagerBoxWidth}px`, height: `${isWagerBoxHeight}px`, top: `${isWagerTop}px` }}>
                <img src={goldbonusbg} alt="goldbonusbg" className="w-[80%] h-[80%]" />
                <img src={goldbonustitle} alt="goldbonustitle" className="absolute bottom-0 w-full h-[16%] px-[10%] mb-[8%]" />
            </button>
            {/* in mha area */}
            <button onClick={() => { dispatch(setIsBonusModal(true)) } } className='hidden mhaOut-hidden mha-display-show lg:flex absolute right-[1.67%] z-[30] justify-center items-center' style={{ backgroundImage: `url(${dailyBox})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: `${isIconWidth}px`, height: `${isIconHeight}px`, top: `${isWagerMhaTop}px` }}>
                <img src={goldbonusbg} alt="goldbonusbg" className="w-[80%] h-[80%]" />
                <img src={goldbonustitle} alt="goldbonustitle" className="absolute bottom-0 w-full h-[16%] px-[10%] mb-[8%]" />
            </button>
            {/* md to md */}
            <button onClick={() => { dispatch(setIsBonusModal(true)) } } className='hidden mh-display-show md:flex mha-hidden lg:hidden absolute right-0 z-[30] justify-center items-center' style={{ backgroundImage: `url(${dailyBox})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: `${isWagerBoxWidth}px`, height: `${isWagerBoxHeight}px`, top: `${isWagerMhaTop}px` }}>
                <img src={goldbonusbg} alt="goldbonusbg" className="w-[80%] h-[80%]" />
                <img src={goldbonustitle} alt="goldbonustitle" className="absolute bottom-0 w-full h-[16%] px-[10%] mb-[8%]" />
            </button>
            
            <div className="absolute hidden z-[30] pl-[1.67%] mh-display-show md:flex bottom-[18%] justify-between">
                <div className="flex flex-col" style={{gap: `${isGapY}px`}}>
                    <button className="w-[50%] h-full scale-[1.4]" onClick={() => { dispatch(setIsJackPot(true)) }} style={{ backgroundImage: `url(${myjp_icon})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: `${isIconWidth}px`, height: `${isIconHeight}px` }}></button>
                    <button className="w-[50%] h-full" onClick={toggleMusic} style={{ backgroundImage: `url(${isMusicOn ? music_on : music_off})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: `${isIconWidth}px`, height: `${isIconHeight}px` }}></button>
                </div>
            </div>
            
            <div className="absolute hidden z-[30] right-[1.67%] mh-display-show md:flex bottom-[18%] justify-between">
                <div className="flex flex-col" style={{ gap: `${isGapY}px` }}>
                    <button className="w-[50%] h-full" onClick={handleFavourite} style={{ backgroundImage: `url(${favorites})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: `${isIconWidth}px`, height: `${isIconHeight}px` }}></button>
                    <button className="w-[50%] h-full slowSpin" onClick={() => { dispatch(setIsSettingModal(true)) }} style={{ backgroundImage: `url(${gear_normal})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: `${isIconWidth}px`, height: `${isIconHeight}px` }}></button>
                </div>
            </div>
        </>    
    );
};

export default IconMenu;