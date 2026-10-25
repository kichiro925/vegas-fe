import React, { useEffect, useState } from "react";
import jack_mainBg from "../../../assets/img/jackpot/background.default.png";
import wheel_frame from "../../../assets/img/jackpot/wheel-frame.default.png";
import wheel_outer from "../../../assets/img/jackpot/wheel-outer.default.png";
import wheel_inner from "../../../assets/img/jackpot/wheel-inner.default.png";
import wheel_btn from "../../../assets/img/jackpot/wheel-btn.default.png";
import wheel_btn_text from "../../../assets/img/jackpot/wheel-btn-text.default.en.png";
import wheel_marker from "../../../assets/img/jackpot/wheel-marker.default.png";
import number_background from "../../../assets/img/jackpot/numbers_background.png";
import progress_start from "../../../assets/img/jackpot/progress-start.default.png";
import button_info from "../../../assets/img/jackpot/button-info.default.png";
import button_close from "../../../assets/img/jackpot/button-close.default.png";
import lucky_number from "../../../assets/img/jackpot/jack1.png";
import spins_text from "../../../assets/img/jackpot/jack2.png";
import select_png from "../../../assets/img/jackpot/select.png";
import Digit from "../../Digit";

import { useDispatch, useSelector } from 'react-redux';
import { setIsJackPot, setIsJackPotInfo, setIsJackPotResult } from "../../../store/reducers/modal";
import useApi from "../../../hooks/useApi";
import { UpdateBalance, UpdateJackpotWin, UpdateLuckyNumber, UpdateSpunNumber } from "../../../store/reducers/auth";

const outerSegments = 10;
const innerSegments = 5;
const outerAnglePerSegment = 360 / outerSegments;
const innerAnglePerSegment = 360 / innerSegments;

const JackPotSpinner = () => {
    const dispatch = useDispatch();
    const { spinJackpot, getJackpotNumber } = useApi();
    const { user } = useSelector((state) => state.auth);
    const [isSpinning, setIsSpinning] = useState(false);
    const [outerRotation, setOuterRotation] = useState(0);
    const [innerRotation, setInnerRotation] = useState(0);
    const [selectPosition, setSelectPosition] = useState(6); // Track select position 1-6
    const [luckyNumber, setLuckyNumber] = useState([]);

    useEffect(() => {
        const setRealHeight = () => {
            const vh = (window.visualViewport?.height || window.innerHeight) * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
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

    const startAnimation = (number, index) => {
        return new Promise((resolve) => {
            setSelectPosition(luckyNumber.length - index);
            const innerIndex = number < 10 ? 0 : Math.floor(number / 10);
            const outerIndex = number < 10 ? number : number % 10;
            const outerSpins = Math.floor(Math.random() * 10) + 5;
            const innerSpins = Math.floor(Math.random() * 15) + 5;

            const outerTargetAngle = 360 - (outerIndex * outerAnglePerSegment);
            const innerTargetAngle = 360 - (innerIndex * innerAnglePerSegment);
            const outerTotalRotation = outerSpins * 360 + outerTargetAngle;
            const innerTotalRotation = innerSpins * 360 + innerTargetAngle;
            const startTime = Date.now();
            const duration = 3000;

            const animate = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;

                if (elapsed < duration) {
                    const progress = elapsed / duration;
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const currentOuterRotation = easeOut * outerTotalRotation;
                    const currentInnerRotation = easeOut * innerTotalRotation;

                    setOuterRotation(currentOuterRotation);
                    setInnerRotation(currentInnerRotation);
                    requestAnimationFrame(animate);
                } else {
                    setOuterRotation(outerTotalRotation);
                    setInnerRotation(innerTotalRotation);
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    }

    const handlePlay = async () => {
        if (isSpinning) return;

        setIsSpinning(true);

        const res = await spinJackpot(user._id);
        if (res.data) {
            const { number, amount, balance } = res.data;
            dispatch(UpdateLuckyNumber(luckyNumber));
            dispatch(UpdateJackpotWin(amount * 100));
            for (let i = 0; i < number.length; i++) {
                await startAnimation(number[i], i);
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            setSelectPosition(0);
            setLuckyNumber([]);
            setIsSpinning(false);
            dispatch(setIsJackPotResult(true));
            dispatch(UpdateSpunNumber(number));
            dispatch(UpdateBalance(balance));
        }
    }

    const getSelectPosition = () => {
        const leftPx = [13.4, 25, 40.6, 56.2, 71.8, 86.3];
        return {
            bottom: '-4.7%',
            left: `${leftPx[selectPosition - 1]}%`
        };
    };

    const getNumber = async () => {
        const res = await getJackpotNumber(user._id);
        if (res.data) {
            const { number } = res.data;
            setLuckyNumber(number);
            setSelectPosition(number.length);
        }
    }

    useEffect(() => {
        getNumber();
    }, []);

    return (
        <div className="absolute z-[200] flex w-full justify-center"
            style={{
                height: 'calc(var(--vh, 1vh) * 100)'
            }}
        >
            <div className="flex w-full h-full z-[50] bg-black opacity-[0.7]"></div>
            <div className="absolute z-[70] w-[67%] top-[40%] translate-y-[-50%] aspect-[8/5]"
                style={{
                    backgroundImage: `url(${jack_mainBg})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div>
                    {
                        selectPosition !== 0 &&
                        <img
                            src={select_png}
                            alt="select_png"
                            className="absolute w-[10%] b-[-4.7%] h-[21.8%] md:h-[21.8%] lg:h-[21.8%] screen-3:h-[21.8%] transition-all duration-200"
                            style={{
                                ...getSelectPosition()
                            }}
                        />
                    }
                    {
                        selectPosition !== 0 &&
                        <img className="absolute top-[53.5%] left-[8.5%] w-[20%] h-[5%]" src={lucky_number} alt="lucky_number" />
                    }
                    <img src={spins_text} className="absolute top-[52%] right-[11.5%] w-[13%] h-[9%]" alt="spins_text" />

                    <Digit number={300000} className={`absolute bottom-[4.5%] right-[3%] w-[10%] h-[2.5%] md:h-[3%] lg:h-[3.5%] screen-3:h-[4%]`} />
                    <Digit number={100000} className={`absolute bottom-[4.5%] right-[17%] w-[10%] h-[2.5%] md:h-[3%] lg:h-[3.5%] screen-3:h-[4%]`} />
                    <Digit number={25000} className={`absolute bottom-[4.5%] right-[34%] w-[8%] h-[2.5%] md:h-[3%] lg:h-[3.5%] screen-3:h-[4%]`} />
                    <Digit number={5000} className={`absolute bottom-[4.5%] right-[50%] w-[6%] h-[2.5%] md:h-[3%] lg:h-[3.5%] screen-3:h-[4%]`} />
                    <Digit number={1500} className={`absolute bottom-[4.5%] right-[64%] w-[6%] h-[2.5%] md:h-[3%] lg:h-[3.5%] screen-3:h-[4%]`} />
                    <Digit number={500} className={`absolute bottom-[4.5%] right-[80%] w-[4%] h-[2.5%] md:h-[3%] lg:h-[3.5%] screen-3:h-[4%]`} />

                    <p className="absolute bottom-[20%] right-[14.2%] w-[7%] h-[14%] text-white text-[60px] font-bold text-center flex items-center justify-center" alt="spins_text" >{selectPosition}</p>

                    <button onClick={() => { dispatch(setIsJackPotInfo(true)) }} className="absolute w-[7.5%] h-[11%] top-[21.5%] right-[15%]"
                        style={{
                            backgroundImage: `url(${button_info})`,
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                    </button>

                    <button onClick={() => { dispatch(setIsJackPot(false)) }} className="absolute w-[7.5%] h-[11%] top-[21.5%] right-[7.3%]"
                        style={{
                            backgroundImage: `url(${button_close})`,
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                    </button>

                    <div className="absolute flex bottom-[26.5%] left-[9.2%] w-[25.5%] h-[11.5%]">
                        {[0, 1, 2].map((index) => (
                            <div key={index} className="relative w-[31%] h-full scale-[1.2]">
                                <img src={number_background} alt="number_background" />
                                <p className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
                                    {luckyNumber?.[index] || ''}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="absolute flex bottom-[16%] left-[10.3%] w-[25.5%] h-[11.5%]">
                        {[3, 4, 5].map((index) => (
                            <div key={index} className="relative w-[31%] h-full scale-[1.2]">
                                <img src={number_background} alt="number_background" />
                                <p className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
                                    {luckyNumber?.[index] || ''}
                                </p>
                            </div>
                        ))}
                    </div>

                    <button>
                        <img className="absolute left-[0.8%] bottom-[0.9%] w-[11.8%] h-[11.2%]" src={progress_start} alt="progress_start" />
                    </button>
                </div>

                <div className="absolute top-[54%] left-[53%] -translate-x-[50%] -translate-y-[50%] z-50">

                    <img className="w-[90%] h-[90%]"
                        src={wheel_frame}
                        alt="wheel_marker"
                    />
                    <img className="absolute top-0 left-0 w-[90%]" src={wheel_outer} alt="wheel_outer"
                        style={{
                            transform: `rotate(${outerRotation}deg)`,
                            transformOrigin: 'center',
                            transition: isSpinning ? 'none' : 'transform 0.1s ease-out'
                        }}
                    />
                    <img className="absolute top-0 left-0 w-[90%]"
                        src={wheel_inner}
                        alt="wheel_inner"
                        style={{
                            transform: `rotate(${innerRotation}deg)`,
                            transformOrigin: 'center',
                            transition: isSpinning ? 'none' : 'transform 0.1s ease-out'
                        }}
                    />

                    <img className="absolute top-0 left-0 w-[90%]"
                        src={wheel_frame}
                        alt="wheel_marker"
                    />

                    <img className="absolute left-[50%] top-[50%] -translate-y-[50%] -translate-x-[28%] w-[52%] h-[36%]"
                        src={wheel_marker}
                        alt="wheel_marker"
                    />

                    <button className="absolute top-[50%] left-[45%] -translate-x-[50%] -translate-y-[50%] w-[26.5%] aspect-[1/1]" style={{
                        backgroundImage: `url(${wheel_btn})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}></button>

                    <button disabled={isSpinning || !luckyNumber?.length} onClick={handlePlay} className="absolute top-[50%] left-[45%] -translate-x-[50%] -translate-y-[50%] w-[26.5%] aspect-[1/1] opacity-40 hover:opacity-100" style={{
                        backgroundImage: `url(${wheel_btn_text})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}>

                    </button>

                </div>
            </div>
        </div>
    );
};

export default JackPotSpinner;