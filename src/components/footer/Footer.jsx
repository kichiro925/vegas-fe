import React, { useState, useEffect } from 'react';
import { setIsHelpModal, setIsLevelModal, setIsVirtualKeyboard } from '../../store/reducers/modal';
import Pagination from '../Pagination';
import { setIsLayout } from '../../store/reducers/modal';
import { setCols, setRows, setPageSize, setViewPoint, setGalleryGapH, setGalleryGapW, setCurrentPage } from '../../store/reducers/gameSlice';
import { fetchGameList } from '../../helpers/fetchGameList';
import useApi from '../../hooks/useApi';
import { useDispatch, useSelector } from 'react-redux';

import enFlag from '../../assets/img/flag/en.png';
import esFlag from '../../assets/img/flag/es.png';
import layoutImg from '../../assets/img/temp/layout_8.png';
import bigLayoutImg from '../../assets/img/temp/layout_24.png';
import wagerBox from '../../assets/img/themes/wager_box.png';
import botBtnMain from '../../assets/img/themes/botbutton_main.png';
import botBtnHover from '../../assets/img/themes/botbutton_hover.png';
import botBtnDown from '../../assets/img/themes/botbutton_down.png';
import lvlBg from '../../assets/img/themes/lvl_bg.png';
import lvlProgress from '../../assets/img/themes/lvl_progress.png';
import { Logout } from '../../store/reducers/auth';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../assets/sounds/themes/vegasxwinter/click.mp3';
import '../../assets/css/mobileHorizon.css';

const Footer = () => {
    const Api = useApi();
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
    const { isLayout } = useSelector((state) => state.modal);
    const { gameList } = useSelector((state) => state.games);
    const provider = useSelector((state) => state.games.provider);
    const currentPage = useSelector((state) => state.games.currentPage);
    const totalPages = useSelector((state) => state.games.totalPages);
    const Cols = useSelector((state) => state.games.Cols);
    const Rows = useSelector((state) => state.games.Rows);

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
        setImgHeight(40);
    };

    function calculateTotalPages(totalItems, itemsPerPage) {
        return Math.ceil(totalItems / itemsPerPage);
    }

    const handleLayoutClick = () => {
        const newIsLayout = !isLayout;

        dispatch(setIsLayout(newIsLayout));

        if (newIsLayout) {
            dispatch(setCols(6));
            dispatch(setRows(4));
            dispatch(setPageSize(24));
            dispatch(setViewPoint(window.innerHeight * 0.4933));
            dispatch(setGalleryGapH(window.innerHeight * 0.0058));
            dispatch(setGalleryGapW(window.innerWidth * 0.0347));

            const newTotalPages = Math.ceil(totalPages * 8 / 24);

            fetchGameList({
                Api,
                provider,
                page: currentPage < newTotalPages ? currentPage : newTotalPages,
                pageSize: 24,
                dispatch,
                gameList,
            });

            dispatch(setCurrentPage(currentPage < newTotalPages ? currentPage : newTotalPages));

        } else {
            dispatch(setCols(4));
            dispatch(setRows(2));
            dispatch(setPageSize(8));
            dispatch(setViewPoint(window.innerHeight * 0.436));
            dispatch(setGalleryGapH(window.innerHeight * 0.018));
            dispatch(setGalleryGapW(window.innerWidth * 0.00885));

            fetchGameList({
                Api,
                provider,
                page: currentPage,
                pageSize: 8,
                dispatch,
                gameList,
            });
        }
        playClickSound();
    };

    const handleMouseLeave = () => {
        setImgHeight(35);
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

            // also contain mha footer
            <footer className='hidden regular-footer md:flex absolute bottom-0 left-0 right-0 z-[100] w-full h-[15%]'>
                <div className="flex flex-col justify-end h-full w-[21.5%] text-white font-bold relative rounded-tr-[8px] bg-gradient-to-r from-[#6921bc] via-[#e8b3ff] via-[30%] to-[#943bf8]">
                    <div className="flex flex-col pb-[2px] w-[97%] h-[93%] rounded-tr-[8px] text-white font-bold relative bg-[#601eae] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] shadow-[inset_0_0_10px_rgb(0 0 0 / 100%)]">
                        <div className='flex w-full h-[41%] pb-[2px] items-center justify-center'>
                            <div className='flex flex-col w-[66.5%] cursor-pointer items-center justify-center h-full'>
                                <span className='leading-[0.8] mha-balance-fontSize text-[27px] lg:text-[28px] screen-3:text-[33px] screen-2:text-[28px] text-cashbackFt font-normal font-["Impact"] screen-3:tracking-[0.1rem] screen-2:tracking-[0.3rem] screen-1:tracking-[0.5rem] drop-shadow-[2px_2px_3px_rgba(0,0,0,1)]'>BALANCE</span>
                            </div>
                            <div className='flex w-[33.5%] items-center justify-between h-full'>
                                <button className='w-[45%] h-[80.39%] cursor-pointer rounded-full' onClick={() => { handleClick(); playClickSound(); }} onMouseLeave={handleMouseLeave} style={{ backgroundImage: `url(${enFlag})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></button>
                                <button className='w-[47.6%] h-[80.39%] cursor-pointer' onClick={() => { handleLayoutClick(); playClickSound(); }} style={{ backgroundImage: ` url(${!isLayout ? layoutImg : bigLayoutImg})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></button>
                            </div>
                        </div>

                        <div className='flex w-full h-[53%] mr-[2px] shadow-[0_0_5px_rgba(0,0,0,0.6)] shadow-[0_0_5px_rgb(0 0 0 / 1)]'>
                            <div className='flex flex-col w-[66.5%] h-full cursor-pointer items-center justify-center'>
                                <span className='text-[25px] screen-3:text-[28px] screen-2:text-[30px] screen-1:text-[30px] font-normal font-["Impact"] tracking-[0.2rem]' style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>{Math.abs(user?.balance)?.toFixed(2)}</span>
                            </div>
                            <div className='flex w-[33.5%] h-full flex-col justify-center bg-cashbackBg rounded-[1px]'>
                                <p className="text-[7px] lg:text-[9px] screen-3:text-[11px] screen-1:text-[13px] text-center leading-full text-cashbacktx font-normal font-impact cursor-pointer" style={{ textShadow: '2px 2px 3px rgba(0,0,0,0.5)' }}>CASHBACK BONUS</p>
                                <p className="leading-[1.5rem] text-[20px] lg:text-[22px] screen-3:text-[20px] screen-2:text-[23px] screen-1:text-[25px] text-center font-normal font-impact cursor-pointer" style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>{(user?.bonus)?.toFixed(2) ?? 0}</p>
                            </div>
                        </div>
                        <div className='w-full h-[6%]'></div>
                    </div>
                </div>

                <div className="flex flex-col w-[57%] h-full justify-end items-end">
                    <Pagination />
                    <div className='flex w-full h-[70.5%]'>
                        <div className='flex justify-center items-center ml-[1.04%] mr-[2.96%] w-[52%] h-full self-end' style={{ backgroundImage: `url(${wagerBox})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                            <p className="mha-wagerBox-fontSize text-center text-white text-[10px] lg:text-[12px] screen-3:text-[13px] screen-2:text-[13px] screen-1:text-[14px] font-['Impact'] leading-[1.1] tracking-wider" style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)', letterSpacing: '0.05em' }}>
                                BALANCE {Math.abs(user?.balance)?.toFixed(2) ?? 0} CHARGEABLE BALANCE {Math.abs(user?.balance - user?.wagerBonus)?.toFixed(2) ?? 0}
                                <br />
                                WAGER {Math.abs(user?.wagerBonus)?.toFixed(2) ?? 0} CASHBACK BONUS {Math.abs(user?.bonus)?.toFixed(2) ?? 0}
                                <br />
                                DAILY BONUS 0
                            </p>
                        </div>

                        <div className='flex w-[48%] h-full mr-[5%] items-end'>
                            <button
                                className='mha-logout-fontSize w-full h-[88%] text-white text-[20px] lg:text-[23px] screen-1:text-[25px] font-["Impact"] tracking-[0.1em] h-[4.88rem] cursor-pointer'
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
                                className='mha-logout-fontSize w-full h-[88%] text-white text-[20px] lg:text-[23px] screen-1:text-[25px] font-["Impact"] tracking-[0.1em] cursor-pointer'
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
                                        <p className='inset-0 z-[20] flex items-center text-cashbackFt mha-username-fontSize text-[24px] lg:text-[23px] screen2:text-[23px] mb-[3px] font-["Impact"] tracking-[0.15em]' style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>{user?.username}</p>
                                    </div>
                                    <img src={lvlProgress} alt="Lvl Progress" className="absolute pl-[2.5px] py-[2.5px] top-0 h-full" style={{ width: `${((user?.level % 1) * 100 || 0)}%` }} />
                                </div>
                                <div className='flex items-center justify-center cursor-pointer w-[12.8%] h-[100%]' onClick={() => { dispatch(setIsLevelModal(true)) }}>
                                    <p className='text-right text-searchTx text-[21px]  screen-3:text-[23px] screen-1:text-[28px] font-["Impact"]' style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>{Math.floor(user?.level ?? 0)}</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex w-full h-[39.7%] ml-[3px] shadow-[0_0_5px_rgba(0,0,0,0.3)] shadow-[0_0_5px_rgb(0 0 0 / 1)]'>
                            <div className='flex z-10 w-[30%] h-full justify-center items-center'>
                                <p className='mha-username-fontSize text-[18px] lg:text-[21px] screen-3:text-[23px] text-cashbackFt font-["Impact"] tracking-[0.15em]' style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>{currentTime}</p>
                            </div>
                            <button onClick={() => { dispatch(setIsVirtualKeyboard(true)) }} className='flex w-[70%] h-full items-center justify-center' style={{ backgroundImage: `url(${botBtnMain})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                                <p className='mha-username-fontSize text-[20px] lg:text-[21px] screen-3:text-[23px] font-["Impact"] tracking-[0.15em]' style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)' }}>Find...</p>
                            </button>
                        </div>
                        <div className='w-full h-[7.3%]'></div>
                    </div>
                </div>
            </footer>
        ) : null
    );
};

export default Footer;
