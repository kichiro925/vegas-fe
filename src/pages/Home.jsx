import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import Footer from '../components/footer/Footer';
import MhFooter from '../components/footer/MhFooter';
import MobileFooter from '../components/footer/mobileFooter';
import MobileBanner from '../components/banner/MobileBanner';
import SplashScreen from '../components/SplashScreen';
import Setting from './Setting';
import Help from './Help';
import LoadingOverlay from '../components/LoadingOverlay';
import { useSelector } from 'react-redux';
import Favourites from '../components/modal/Favourites';
import JackPotSpinner from '../components/modal/jackpot/JackPotSpinner';
import JackPotWarning from "../components/modal/jackpot/JackPotWarning";
import JackPotInfoModal from '../components/modal/JackPotInfoModal';
import VirtualKeyboard from '../components/modal/virtualKeyboard';
import JackpotResult from '../components/modal/jackpot/JackpotResult';
import LevelModal from '../components/modal/LevelModal';

const Home = () => {
    const [showSplash, setShowSplash] = useState(true);
    const { loading } = useSelector((state) => state.load);
    const isSettingModal = useSelector(state => state.modal.isSettingModal);
    const isHelpModal = useSelector(state => state.modal.isHelpModal);
    const isFavorite = useSelector(state => state.modal.isFavorite);
    const isJackPot = useSelector(state => state.modal.isJackPot);
    const isJackPotInfo = useSelector(state => state.modal.isJackPotInfo);
    const isJackPotResult = useSelector(state => state.modal.isJackPotResult);
    const isVirtualKeyboard = useSelector(state => state.modal.isVirtualKeyboard);
    const isLevelModal = useSelector(state => state.modal.isLevelModal);
    const [isScreenRatio, setIsScreenRatio] = useState(window.innerWidth / window.innerHeight);

    useEffect(() => {
        const setRealHeight = () => {
            const vh = (window.visualViewport?.height || window.innerHeight) * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            setIsScreenRatio(window.innerWidth / window.innerHeight);
        };

        setRealHeight();

        window.addEventListener('resize', setRealHeight);
        window.addEventListener('orientationchange', setRealHeight);
        window.addEventListener('scroll', setRealHeight); // iOS toolbar hides on scroll
        window.visualViewport?.addEventListener('resize', setRealHeight); // for better accuracy

        return () => {
            window.removeEventListener('resize', setRealHeight);
            window.removeEventListener('orientationchange', setRealHeight);
            window.removeEventListener('scroll', setRealHeight);
            window.visualViewport?.removeEventListener('resize', setRealHeight);
        };
    }, []);

    useEffect(() => {
        const lockScroll = () => {
            document.body.style.overflow = 'hidden';
        };

        const unlockScroll = () => {
            document.body.style.overflow = '';
        };

        if (isScreenRatio < 1) {
            lockScroll();
        }

        return () => {
            unlockScroll();
        }
    }, [isScreenRatio])

    return (
        <div className={`${isScreenRatio >= 1 ? 'fixed' : 'relative'} touch-none flex flex-col w-full h-screen md:h-screen android:h-screen md:overflow-hidden`}
            style={{
                height: 'calc(var(--vh, 1vh) * 100)'
            }}
        >
            {loading && <LoadingOverlay />}
            {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

            {isSettingModal && (
                <Setting />
            )}
            {isHelpModal && (
                <Help />
            )}
            {isFavorite && (
                <Favourites />
            )}
            {
                isJackPot ? (isScreenRatio >= 1 ? <JackPotSpinner /> : <JackPotWarning />) : null
            }
            {
                isJackPotResult ? (isScreenRatio >= 1 ? <JackpotResult /> : <JackPotWarning />) : null
            }
            {
                isJackPotInfo && (
                    <JackPotInfoModal />
                )}
            {
                isVirtualKeyboard && (
                    <VirtualKeyboard />
                )}

            <Header />
            <MobileBanner />

            <MainContent />
            <Footer />
            <MobileFooter />
            <MhFooter />
            {isLevelModal && (
                <LevelModal />
            )}
        </div>
    );
}

export default Home;
