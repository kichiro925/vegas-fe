import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import useApi from '../hooks/useApi';
import { useSelector, useDispatch } from 'react-redux';
import { setGalleryGapH, setGalleryGapW, setGamePlayed, setMobileGameList, setGameUrl, setGameSession, setMobileCurrentPage, setIsTransitioning, setTotalPages, setViewPoint, setGameList } from '../store/reducers/gameSlice';
import { setIsBonusModal } from '../store/reducers/modal';
import { fetchGameList } from '../helpers/fetchGameList';
import { setLoading, setIsGameLoading } from '../store/reducers/load';

import IconMenu from './IconMenu';
import InfiniteScroll from 'react-infinite-scroll-component';
import GameModal from './modal/gameModal';
import BonusModal from './modal/BonusModal';
import ProviderImage from './ProviderImage';
import LogoAnimation from './LogoAnimation';

import Banner from './banner/Banner';
import clickSound from '../assets/sounds/themes/vegasxwinter/click.mp3';
import slideSound from '../assets/sounds/themes/vegasxwinter/slide.mp3';
import wagerBox from '../assets/img/themes/wager_box.png';
import dailyBox from '../assets/img/themes/dailybox.png';
import goldbonusbg from '../assets/img/win/goldbonusbg.png';
import goldbonustitle from '../assets/img/win/goldbonustitle.png';
import frame from '../assets/img/themes/frame.png';
import leftArrow from '../assets/img/themes/leftarrow.png';
import rightArrow from '../assets/img/themes/rightarrow.png';

const MainContent = () => {
    const Api = useApi();
    const dispatch = useDispatch();

    const { user } = useSelector((store) => store.auth);
    const { gamePlayed, gameList: reduxGameList, mobileGameList: reduxMobileGameList } = useSelector((state) => state.games);
    const isFirstLoad = useSelector(state => state.load.isFirstLoad);
    const isBonusModal = useSelector(state => state.modal.isBonusModal);

    const [mobileGridItems, setMobileGridItems] = useState([]);
    const [slides, setSlides] = useState([]);
    const [swiperInstance, setSwiperInstance] = useState(null);

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const [mhSwiperTop, setMhSwiperTop] = useState(0);
    const [galleryImgheight, setGalleryImgheight] = useState(windowSize.height * 0.2);
    const [logoHeight, setLogoHeight] = useState(windowSize.height * 0.115);
    const [swiperBtnH, setSwiperBtnH] = useState(windowSize.height * 0.13);
    const [swiperBtnTop, setSwiperBtnTop] = useState(0);
    const [logoMB, setLogoMB] = useState(0);
    const [isMobileBg, setIsMobileBg] = useState(false);

    const [TmpMt, setTmpMt] = useState(windowSize.height * 0.2227);
    const [wBoxTop, setwBoxTop] = useState(TmpMt - 48 - 5);

    const currentPage = useSelector(state => state.games.currentPage);
    const mobileCurrentPage = useSelector(state => state.games.mobileCurrentPage);
    const mobilePageSize = 8;
    const pageSize = useSelector(state => state.games.pageSize);
    const totalPages = useSelector(state => state.games.totalPages);
    const isTransitioning = useSelector(state => state.games.isTransitioning);
    const provider = useSelector(state => state.games.provider);
    const gameList = useSelector(state => state.games.gameList);
    const mobileGameList = useSelector(state => state.games.mobileGameList);
    const viewPoint = useSelector(state => state.games.viewPoint);
    const cols = useSelector(state => state.games.cols);
    const rows = useSelector(state => state.games.rows);
    const galleryGapH = useSelector(state => state.games.galleryGapH);
    const galleryGapW = useSelector(state => state.games.galleryGapW);
    const isFavorite = useSelector(state => state.modal.isFavorite);

    // Detect screen resize/orientation change
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setWindowSize({ width, height });

            setGalleryImgheight(height * 0.2);
            setLogoHeight(height * 0.115);
            dispatch(setGalleryGapH(height * 0.018));
            dispatch(setGalleryGapW(width * 0.00885));
            setSwiperBtnH(height * 0.13);

            if (window.matchMedia('(min-width: 1025px) and (max-width: 2000px) and (min-height: 501px) and (max-height: 1500px)').matches) {
                setMhSwiperTop(height * 0.0587);
                setSwiperBtnTop(22 + height * 0.0787 + height * 0.115 + height * 0.018 + height * 0.0587 + height * 0.2 + height * 0.009 - height * 0.13 / 2);
            }
            else {
                setMhSwiperTop(height * 0.087);
                setSwiperBtnTop(22 + height * 0.126 + height * 0.0787 + height * 0.087 + height * 0.2 + height * 0.009 - height * 0.13 / 2);
            }

            dispatch(setViewPoint(height * 0.436));

            setLogoMB(height * 0.018);

            const newTmpMt = height * 0.2227;
            setTmpMt(newTmpMt);
            setwBoxTop(newTmpMt - 48 - 5);
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

    useEffect(() => {
        const handleMobileBg = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setWindowSize({ width, height });

            if (
                window.matchMedia(
                    '(min-width: 100px) and (max-width: 640px) and (min-height: 301px) and (max-height: 1000px)'
                ).matches
            ) {
                setIsMobileBg(true);
            } else if (
                window.matchMedia(
                    '(min-width: 301px) and (max-width: 1000px) and (min-height: 100px) and (max-height: 640px)'
                ).matches
            ) {
                setIsMobileBg(true);
            }
            else {
                setIsMobileBg(false);
            }
        };

        handleMobileBg();

        window.addEventListener('resize', handleMobileBg);
        window.addEventListener('orientationchange', handleMobileBg);
        window.addEventListener('scroll', handleMobileBg);
        window.visualViewport?.addEventListener('resize', handleMobileBg);

        return () => {
            window.removeEventListener('resize', handleMobileBg);
            window.removeEventListener('orientationchange', handleMobileBg);
            window.removeEventListener('scroll', handleMobileBg);
            window.visualViewport?.removeEventListener('resize', handleMobileBg);
        };
    }, []);

    const handleGameClick = async (gameId, aggregator) => {
        const tryTriggerGame = async () => {
            try {
                dispatch(setGamePlayed(true));
                const response = await Api.triggerGame(user.username, gameId, aggregator);
                // console.log(response, "response")
                if (response?.data?.result?.SessionUrl) {
                    dispatch(setIsGameLoading(false));

                    const fullUrl = response.data.result.SessionUrl;
                    const session = response.data.result.SessionId;
                    dispatch(setGameSession(session))
                    dispatch(setGameUrl(fullUrl));
                } else {
                    throw new Error('Failed to get SessionUrl');
                }
            } catch (error) {
                console.error('Error triggering game:', error);
                console.error('Error details:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                });
                return error;
            }
        };

        let result = await tryTriggerGame();
        if (result instanceof Error) {
            // Try one more time if first attempt failed
            result = await tryTriggerGame();
        }
    };

    const playClickSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    }

    const playSlideSound = () => {
        const audio = new Audio(slideSound);
        audio.play();
    }

    const mobileFetchGameList = async (provider, page, pageSize) => {
        try {
            const response = await Api.getGameList(provider, page, pageSize);

            if (response?.data?.result) {
                dispatch(setMobileGameList({
                    count: response.data.count,
                    result: [...(mobileGameList?.result || []), ...response.data.result]
                }));
                dispatch(setMobileCurrentPage(page));
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        if (mobileGameList && mobileGameList.result) {
            // Update mobile grid items
            setMobileGridItems(mobileGenerateGridItems(mobileGameList.result, galleryImgheight));
        }
    }, [mobileGameList, galleryGapW, galleryGapH, galleryImgheight]);

    const mobileGenerateGridItems = (games = [], height) => {

        const items = games.map((game, index) => {
            const isLastItem = index === games.length - 1;

            if (isLastItem) {
                dispatch(setLoading(false));
            }

            return (
                <div
                    key={`${game.code}_${index}` || index}
                    className="relative z-[40] cursor-pointer hover:opacity-90 transition-opacity w-full touch-pan-y"
                    style={{ height: height ? `${height}px` : 'auto' }}
                    onClick={() => { handleGameClick(game.Id, game.aggregator); playClickSound(); }}
                >
                    <ProviderImage
                        game={game}
                        frame={frame}
                        height={height}
                    />
                </div>
            );
        });

        items.push(
            <div
                key="empty-child"
                className="relative h-[21vh]"
                style={{ minHeight: '200px' }}
            >
                <div className="absolute w-full inset-0" />
            </div>
        );

        return items;
    };

    const generateGridItems = (games = [], height) => {

        const items = games.map((game, index) => {
            const isLastItem = index === games.length - 1;

            if (isLastItem) {
                dispatch(setLoading(false));
            }

            return (
                <div
                    key={`${game.code}_${index}` || index}
                    className="relative z-[40] cursor-pointer hover:opacity-90 transition-opacity w-full touch-pan-y"
                    style={{ height: height ? `${height}px` : 'auto' }}
                    onClick={() => { handleGameClick(game.Id, game.aggregator); playClickSound(); }}
                >
                    <ProviderImage
                        game={game}
                        frame={frame}
                        height={height}
                    />
                </div>
            );
        });

        return items;
    };

    useEffect(() => {
        if (gameList && gameList.result) {
            dispatch(setTotalPages(Math.ceil(gameList.count / pageSize)));

            // Update slider content
            const newSlides = [{
                id: currentPage,
                content: (
                    <div className={`grid ${cols === 6 && rows === 4 ? 'grid-cols-6 grid-rows-4' : 'grid-cols-4 grid-rows-2'} px-[6%] h-full mx-[30px] overflow-y-hidden`}
                        style={{ columnGap: `${galleryGapW}px`, rowGap: `${galleryGapH}px` }}
                    >
                        {generateGridItems(gameList.result)}
                    </div>
                )
            }];

            setSlides(newSlides);

            // Force Swiper reinitialization if needed
            if (swiperInstance) {
                setTimeout(() => {
                    swiperInstance.update();
                    swiperInstance.slideToLoop(0, 0);
                }, 100);
            }
        }
    }, [gameList, currentPage, pageSize, swiperInstance, galleryGapW, galleryGapH, galleryImgheight, cols, rows]);

    const handleNavigation = async (direction) => {
        if (isTransitioning) return;

        dispatch(setIsTransitioning(true));
        playSlideSound();

        const newPage = direction === 'next'
            ? (currentPage % totalPages) + 1
            : (currentPage - 2 + totalPages) % totalPages + 1;

        await fetchGameList({
            Api,
            provider,
            page: newPage,
            pageSize,
            dispatch,
            gameList,
        });
    };

    useEffect(() => {
        if (reduxMobileGameList && reduxMobileGameList.result) {
            setMobileGridItems(mobileGenerateGridItems(reduxMobileGameList.result, galleryImgheight));
        }
    }, [reduxMobileGameList, galleryImgheight]);

    // Update effect for initial load
    useEffect(() => {
        fetchGameList({
            Api,
            provider,
            page: 1,
            pageSize,
            dispatch,
            gameList,
            isScroll: true,
        });
        mobileFetchGameList(provider, 1, mobilePageSize);
    }, []);

    return (
        <main className="relative flex flex-col w-full h-full mh-main-content lg:min-h-[calc(100dvh-62px)] overflow-hidden touch-none">
            {gamePlayed && (
                <GameModal />
            )}
            {isBonusModal && (
                <BonusModal />
            )}

            <div
                className="absolute inset-0 w-full h-full animate-zoomEffect touch-none"
                style={{
                    backgroundImage: `url(${isMobileBg ? '/mobileMainBg.jpg' : '/mainBg.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            {/* Wager Box on Mobile only */}
            <div className='absolute left-[21.6%] flex mh-display-none md:hidden justify-center items-center w-[56.8%] h-[3rem] self-end' style={{ backgroundImage: `url(${wagerBox})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', top: `${wBoxTop}px` }}>
                <p className="text-center text-white text-[0.625rem] font-['Impact'] leading-[1.1] tracking-[0.4rem]" style={{ textShadow: '2px 2px 3px rgba(0,0,0,1)', letterSpacing: '0.05em' }}>
                    BALANCE 8056 CHARGEABLE BALANCE 2028
                    <br />
                    WAGER GOOD CASHBACK BONUS 1560
                    <br />
                    DAILY BONUS 28
                </p>
            </div>

            {/* Gold Bonus Button on Mobile only */}
            <button onClick={() => { dispatch(setIsBonusModal(true)) }} className='absolute right-[10px] flex mh-display-none md:hidden justify-center items-center w-[2.75rem] h-[2.75rem] self-end' style={{ backgroundImage: `url(${dailyBox})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', top: `${wBoxTop + 2}px` }}>
                <img src={goldbonusbg} alt="goldbonusbg" className="w-[2rem] h-[2rem]" />
                <img src={goldbonustitle} alt="goldbonustitle" className="absolute bottom-0 w-full h-[8px] px-[4px] mb-[2px]" />
            </button>

            <div className="z-10 h-auto md:mt-0">
                <Banner className="hidden mha-hidden lg:flex" />
                <div className="hidden mh-display-show md:flex md:flex-col w-full items-center justify-center"
                    style={{ marginBottom: `${logoMB}px` }}
                >
                    <LogoAnimation className="w-[42%] mha-logo-w mh-logo" style={{ height: `${logoHeight}px` }} />

                </div>
                <Banner className="hidden mha-display-show mh-display-show md:flex lg:hidden" />
            </div>

            <div className="hidden mh-display-show mh-swiper-H md:block h-screen" style={{ marginTop: `${mhSwiperTop}px`, height: `${viewPoint}px` }}>
                {slides.map(slide => (
                    <div key={slide.id} className="relative w-full h-full">
                        {slide.content}
                    </div>
                ))}
            </div>

            <div
                className={`absolute mhMobile-hidden swiper-button-prev !items-center !justify-center !w-[7%] !bg-contain !bg-no-repeat !bg-center ${totalPages > 1 ? '!flex' : '!hidden'}`}
                onClick={() => handleNavigation('prev')}
                style={{
                    backgroundImage: `url(${leftArrow})`,
                    left: '0',
                    display: 'flex',
                    top: `${swiperBtnTop}px`,
                    display: 'flex',
                    position: 'absolute',
                    height: `${swiperBtnH}px`,
                }}
            />
            <div
                className={`absolute mhMobile-hidden swiper-button-next !items-center !justify-center !w-[7%] !bg-contain !bg-no-repeat !bg-center ${totalPages > 1 ? '!flex' : '!hidden'}`}
                onClick={() => handleNavigation('next')}
                style={{
                    backgroundImage: `url(${rightArrow})`,
                    right: '0',
                    display: 'flex',
                    top: `${swiperBtnTop}px`,
                    display: 'flex',
                    position: 'absolute',
                    height: `${swiperBtnH}px`,
                }}
            />

            <div className='flex flex-col mh-display-none md:hidden px-[13.5%] h-[calc(100vh-200px)] overflow-y-auto overflow-hidden'
                id="scrollableDiv"
                style={{
                    transform: 'translateZ(0)',
                    contain: 'content',
                    marginTop: `${TmpMt}px`
                }}
            >
                <InfiniteScroll
                    dataLength={mobileGameList?.result?.length || 0}
                    next={() => { mobileFetchGameList(provider, mobileCurrentPage + 1, mobilePageSize); }}
                    hasMore={mobileGameList?.count > (mobileGameList?.result?.length || 0)}
                    loader={
                        <div className="flex justify-center items-center py-4">
                            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    }
                    scrollableTarget="scrollableDiv"
                    endMessage={
                        <div className="text-center text-white py-4">
                            No more games to load
                        </div>
                    }
                >
                    <div className="grid grid-cols-1 gap-8">
                        {mobileGridItems}
                    </div>
                </InfiniteScroll>
            </div>

            <IconMenu />
        </main >
    );
};

export default MainContent;