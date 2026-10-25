import React, { useState, useEffect } from 'react';
import { setIsHelpModal, setIsLevelModal, setIsVirtualKeyboard } from '../../store/reducers/modal';
import enFlag from '../../assets/img/flag/en.png';
import esFlag from '../../assets/img/flag/es.png';
import layoutImg from '../../assets/img/temp/layout_8.png';
import wagerBox from '../../assets/img/themes/wager_box.png';
import botBtnMain from '../../assets/img/themes/botbutton_main.png';
import botBtnHover from '../../assets/img/themes/botbutton_hover.png';
import botBtnDown from '../../assets/img/themes/botbutton_down.png';
import lvlBg from '../../assets/img/themes/lvl_bg.png';
import lvlProgress from '../../assets/img/themes/lvl_progress.png';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../store/reducers/auth';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../assets/sounds/themes/vegasxwinter/click.mp3';
import '../../assets/css/mobileHorizon.css';
import PrizePart from '../PrizePart';
import Pagination from '../Pagination';

const MhFooter = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth);
    const [imgHeight, setImgHeight] = useState(40);
    const [logoutHovered, setLogoutHovered] = useState(false);
    const [helpHovered, setHelpHovered] = useState(false);
    const [logoutClicked, setLogoutClicked] = useState(false);
    const [helpClicked, setHelpClicked] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const { gamePlayed } = useSelector((state) => state.games);

    const logout = () => {
        dispatch(Logout());
        navigate('/login')
    }

    const playClickSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    }

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleClick = () => {
        setImgHeight(50);
    };

    const handleMouseLeave = () => {
        setImgHeight(40);
    };

    const handleLogoutMouseDown = () => {
        setLogoutClicked(true);
    };

    const handleLogoutMouseUp = () => {
        setLogoutClicked(false);
    };

    const handleHelpMouseDown = () => {
        setHelpClicked(true);
    };

    const handleHelpMouseUp = () => {
        setHelpClicked(false);
    };

    return (
        !gamePlayed ? (
            <>
                <PrizePart />

                <footer className='hidden mh-footer absolute bottom-0 left-0 right-0 z-[30] h-[15%]'>
                    <div className="flex flex-col justify-end h-full w-[21.5%] text-white font-bold relative rounded-tr-[8px] bg-gradient-to-r from-[#6921bc] via-[#e8b3ff] via-[30%] to-[#943bf8]">
                        <div className="flex flex-col pb-[2px] w-[97%] h-[93%] rounded-tr-[8px] text-white font-bold relative bg-[#601eae] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] shadow-[inset_0_0_10px_rgb(0 0 0 / 100%)]">
                            <div className='flex w-full h-[41%] pb-[2px] items-center justify-center'>
                                <div className='flex flex-col w-[66.5%] cursor-pointer items-center justify-center h-full'>
                                    <span className='text-[16px] tracking-[0.3rem] leading-full text-cashbackFt font-normal font-["Impact"] drop-shadow-[2px_2px_3px_rgba(0,0,0,0.5)]'>BALANCE</span>
                                </div>
                                <div className='flex w-[33.5%] justify-between h-full'>
                                    <button className='w-[47.76%]' onClick={() => { handleClick(); playClickSound(); }} onMouseLeave={handleMouseLeave}>
                                        <img src={enFlag} alt="English" className={`cursor-pointer w-full h-full rounded-full`} />
                                    </button>
                                </div>
                            </div>

                            <div className='flex w-full h-[53%] mr-[2px] shadow-[0_0_5px_rgba(0,0,0,0.6)] shadow-[0_0_5px_rgb(0 0 0 / 1)]'>
                                <div className='flex flex-col w-[66.5%] h-full cursor-pointer items-center justify-center'>
                                    <span className='text-[18px] tracking-[0.1rem] leading-full font-normal font-["Impact"]' style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>{Math.abs(user?.balance)?.toFixed(2)}</span>
                                </div>
                                <div className='flex w-[33.5%] h-full flex-col justify-center bg-cashbackBg rounded-[1px]'>
                                    <p className="text-[6px] text-center leading-full text-cashbacktx font-normal font-impact cursor-pointer" style={{ textShadow: '2px 2px 3px rgba(0,0,0,0.5)' }}>CASHBACK BONUS</p>
                                    <p className="text-[12px] leading-full screen-3:text-[20px] screen-2:text-[23px] screen-1:text-[25px] text-center font-normal font-impact cursor-pointer" style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>{(user?.bonus)?.toFixed(2) ?? 0}</p>
                                </div>
                            </div>
                            <div className='w-full h-[6%]'></div>
                        </div>
                    </div>

                    <div className="flex flex-col w-[57%] h-full justify-end items-end">
                        <Pagination />
                        <div className='flex w-full h-[70.5%]'>
                            <div className='flex justify-center items-center ml-[1.04%] mr-[2.96%] w-[52%] h-full self-end' style={{ backgroundImage: `url(${wagerBox})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                                <p className="text-center text-white text-[6px] font-['Impact'] leading-[1.1]" style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)', letterSpacing: '0.05em' }}>
                                    BALANCE {Math.abs(user?.balance)?.toFixed(2) ?? 0} CHARGEABLE BALANCE {Math.abs(user?.balance - user?.wagerBonus)?.toFixed(2) ?? 0}
                                    <br />
                                    WAGER {Math.abs(user?.wagerBonus)?.toFixed(2) ?? 0} CASHBACK BONUS {Math.abs(user?.bonus)?.toFixed(2) ?? 0}
                                    <br />
                                    DAILY BONUS 0
                                </p>
                            </div>

                            <div className='flex w-[48%] h-full mr-[5%] items-end'>
                                <button
                                    className='w-full text-white text-[15px] font-["Impact"] tracking-[0.1em] h-[89.79%] cursor-pointer'
                                    style={{
                                        textShadow: '2px 2px 3px rgba(0,0,0,1)',
                                        backgroundImage: `url(${logoutClicked ? botBtnDown : (logoutHovered ? botBtnHover : botBtnMain)})`,
                                        backgroundSize: '100% 100%',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    onMouseEnter={() => setLogoutHovered(true)}
                                    onMouseLeave={() => {
                                        setLogoutHovered(false);
                                        setLogoutClicked(false);
                                    }}
                                    onMouseDown={handleLogoutMouseDown}
                                    onMouseUp={handleLogoutMouseUp}
                                    onClick={() => {
                                        playClickSound();
                                        logout();
                                    }}
                                >
                                    LOGOUT
                                </button>
                                <button
                                    className='w-full text-white text-[15px] font-["Impact"] tracking-[0.1em] h-[89.79%] cursor-pointer'
                                    style={{
                                        textShadow: '2px 2px 3px rgba(0,0,0,1)',
                                        backgroundImage: `url(${helpClicked ? botBtnDown : (helpHovered ? botBtnHover : botBtnMain)})`,
                                        backgroundSize: '100% 100%',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    onMouseEnter={() => setHelpHovered(true)}
                                    onMouseLeave={() => {
                                        setHelpHovered(false);
                                        setHelpClicked(false);
                                    }}
                                    onMouseDown={handleHelpMouseDown}
                                    onMouseUp={handleHelpMouseUp}
                                    onClick={() => {
                                        playClickSound();
                                        dispatch(setIsHelpModal(true));
                                    }}
                                >
                                    HELP
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end ml-auto justify-end h-full w-[21.5%] text-white font-bold relative rounded-tl-[8px] bg-gradient-to-l from-[#6921bc] via-[#e8b3ff] via-[30%] to-[#943bf8]">
                        <div className="flex flex-col pb-[2px] w-[97%] h-[93%] rounded-tl-[8px] text-white font-bold relative bg-[#601eae] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] shadow-[inset_0_0_10px_rgb(0 0 0 / 100%)]">
                            <div className='flex w-full h-[53%] px-[2px] mt-[4px]'>
                                <div className="flex w-full items-center h-[68.9%]" style={{ backgroundImage: `url(${lvlBg})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                                    <div className='relative w-[86.2%] h-full'>
                                        <div className='flex w-full h-full items-center justify-center'>
                                            <p className='z-[30] text-cashbackFt text-[13px] mb-[1px] leading-full font-["Impact"] tracking-[0.2em]' style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>{user?.username}</p>
                                        </div>
                                        <img src={lvlProgress} alt="Lvl Progress" className="absolute pl-[2.5px] py-[2.5px] top-0 h-full" style={{ width: `${((user?.level % 1) * 100 || 0)}%` }} />
                                    </div>
                                    <div className='flex items-center justify-center cursor-pointer w-[12.8%] h-[100%]' onClick={() => { dispatch(setIsLevelModal(true)) }}>
                                        <p className='text-right text-searchTx text-[13px] leading-[17px] font-["Impact"]' style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>{Math.floor(user?.level ?? 0)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full h-[39.7%] ml-[3px] shadow-[0_0_5px_rgba(0,0,0,0.3)] shadow-[0_0_5px_rgb(0 0 0 / 1)]'>
                                <div className='flex z-[30] pl-[15px] w-[30%] h-full items-center'>
                                    <p className='text-[13px] tracking-[0.2em] text-cashbackFt font-["Impact"] tracking-[0.15em]' style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>{currentTime}</p>
                                </div>
                                <button onClick={() => { dispatch(setIsVirtualKeyboard(true)) }} className='flex w-[70%] h-full items-center justify-center' style={{ backgroundImage: `url(${botBtnMain})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                                    <p className='text-[12px] tracking-[0.2em] font-["Impact"] tracking-[0.15em]' style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>Find...</p>
                                </button>
                            </div>
                            <div className='w-full h-[7.3%]'></div>
                        </div>
                    </div>
                </footer>
            </>
        ) : null
    );
};

export default MhFooter;
