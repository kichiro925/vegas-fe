import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setIsHelpModal, setIsLevelModal, setIsVirtualKeyboard } from '../../store/reducers/modal';
import enFlag from '../../assets/img/flag/en.png';
import layoutImg from '../../assets/img/temp/layout_8.png';
import botBtnMain from '../../assets/img/themes/mBtnMain.png';
import botBtnHover from '../../assets/img/themes/mBtnHover.png';
import botBtnDown from '../../assets/img/themes/mBtnDown.png';
import topButtonMain from '../../assets/img/themes/topbutton_main.png';
import topButtonHover from '../../assets/img/themes/topbutton_hover.png';
import topButtonDown from '../../assets/img/themes/topbutton_down.png';
import lvlBg from '../../assets/img/themes/lvl_bg.png';
import lvlProgress from '../../assets/img/themes/lvl_progress.png';
import mobNavbar from '../../assets/img/themes/mob_navbar.png';
import { Logout } from "../../store/reducers/auth";
import { useNavigate } from "react-router-dom";
import clickSound from '../../assets/sounds/themes/vegasxwinter/click.mp3';

const MobileFooter = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth);
    const { gamePlayed } = useSelector((state) => state.games);
    const [imgHeight, setImgHeight] = useState(35);
    const [logoutHovered, setLogoutHovered] = useState(false);
    const [logoutClicked, setLogoutClicked] = useState(false);
    const [helpHovered, setHelpHovered] = useState(false);
    const [helpClicked, setHelpClicked] = useState(false);
    const [findHovered, setFindHovered] = useState(false);
    const [findClicked, setFindClicked] = useState(false);

    const playClickSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    }

    const logout = () => {
        dispatch(Logout());
        navigate('/login')
    }

    const handleClick = () => {
        setImgHeight(45);
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

    const handleFindMouseDown = () => {
        setFindClicked(true);
    };

    const handleFindMouseUp = () => {
        setFindClicked(false);
    };

    return (
        !gamePlayed ? (
            <footer className="fixed bottom-0 left-0 h-[15.3%] right-0 mh-display-none md:hidden">
                <div className="flex flex-col px-[0.1rem] w-full h-full text-white font-bold relative">
                    <div className="flex flex-col h-full items-center justify-end w-full rounded-t-[7px] text-white font-bold relative" style={{ backgroundImage: `url(${mobNavbar})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                        <div className="flex h-[44.23%] w-full pt-[2%] px-[3px]">
                            <button
                                className='w-[18%] text-white text-[14px] tracking-[0.1em] font-["Impact"] h-full cursor-pointer'
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
                                className='w-[18%] text-white text-[14px] tracking-[0.1em] font-["Impact"] h-full cursor-pointer'
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

                            <div className="flex w-[44%] h-[85%]">
                                <button className="ml-[21%]" onClick={() => { handleClick(); playClickSound(); }} onMouseLeave={handleMouseLeave}><img src={enFlag} alt="English" className={`cursor-pointer w-auto h-full rounded-full`} /></button>
                            </div>

                            <button
                                className='w-[20%] text-white text-[14px] font-["Impact"] tracking-[0.1em] h-[94%] cursor-pointer'
                                style={{
                                    textShadow: '2px 2px 3px rgba(0,0,0,1)',
                                    backgroundImage: `url(${findClicked ? topButtonDown : (findHovered ? topButtonHover : topButtonMain)})`,
                                    backgroundSize: '100% 100%',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                                onMouseEnter={() => setFindHovered(true)}
                                onMouseLeave={() => {
                                    setFindHovered(false);
                                    setFindClicked(false);
                                }}
                                onMouseDown={handleFindMouseDown}
                                onMouseUp={handleFindMouseUp}
                                onClick={() => {
                                    playClickSound();
                                    dispatch(setIsVirtualKeyboard(true));
                                }}
                            >
                                Find...
                            </button>
                        </div>
                        <div className="flex h-[42.3%] w-full">
                            <div className="flex w-[42%] h-full">
                                <div className='flex flex-col w-[66.5%] cursor-pointer items-center justify-center'>
                                    <span className='text-[23px] font-normal font-["Impact"]' style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>{Math.abs(user?.balance)?.toFixed(2)}</span>
                                </div>
                                <div className='flex w-[33.5%] h-full flex-col justify-center rounded-[4px]'>
                                    <p className="text-[7px] text-center text-cashbacktx font-normal font-impact cursor-pointer" style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>CASHBACK BONUS</p>
                                    <p className="text-[17px] text-center font-normal font-impact cursor-pointer" style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>{(user?.bonus)?.toFixed(2) ?? 0}</p>
                                </div>
                            </div>
                            <div className="w-[19%]"></div>
                            <div className="w-[39%]">
                                <div className='flex items-center w-full h-full pr-[4px]'>
                                    <div className="flex w-full h-[74%] items-center" style={{ backgroundImage: `url(${lvlBg})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                                        <div className='relative flex items-center justify-center py-[2px] w-[86.2%] h-full'>
                                            <p className='inset-0 z-[10] flex items-center text-cashbackFt text-[20px] left-[10%] font-["Impact"] tracking-[0.15em]' style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>{user?.username}</p>
                                            <img src={lvlProgress} alt="Lvl Progress" className="absolute pl-[2.5px] py-[2.5px] top-0 h-full" style={{ width: `${((user?.level % 1) * 100 || 0)}%` }} />
                                        </div>
                                        <div className='flex items-center justify-center cursor-pointer w-[12.8%] h-full' onClick={() => { dispatch(setIsLevelModal(true)) }}>
                                            <p className='text-right text-searchTx text-[18px] font-["Impact"]' style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>{Math.floor(user?.level ?? 0)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex h-[13.47%] w-full"></div>
                    </div>
                </div>
            </footer>
        ) : null
    );
};

export default MobileFooter;