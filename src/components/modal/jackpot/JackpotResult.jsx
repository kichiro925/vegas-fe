import React from "react";
import win_background from "../../../assets/img/jackpot/win_background.png";
import win_coins from "../../../assets/img/jackpot/win_coins.png";
import button_img from "../../../assets/img/jackpot/button-cta.default.png";
import { useDispatch, useSelector } from "react-redux";
import { setIsJackPotResult } from "../../../store/reducers/modal";
import Digit from "../../Digit";

const JackpotResult = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { luckyNumber, spunNumber, jackpotWin } = user;
    console.log(luckyNumber, spunNumber, jackpotWin, luckyNumber?.[0], "luckyNumber, spunNumber, jackpotWin");
    return (
        <div className="absolute z-[200] flex w-full justify-center"
            style={{
                height: 'calc(var(--vh, 1vh) * 100)'
            }}
        >
            <div className="flex w-full h-full z-[50] bg-black opacity-[0.7]"></div>
            <div className="absolute z-[70] w-[600px] top-[30%] h-[240px] translate-y-[-50%] aspect-[8/5]"
                style={{
                    backgroundImage: `url(${win_background})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <p className="absolute top-[45%] left-[7%] text-[white] font-bold text-[16px]">Numbers Spun</p>
                {
                    spunNumber?.[0] &&
                    <Digit number={spunNumber?.[0]} className="absolute top-[46%] left-[30%] text-[white] font-bold text-[18px]"></Digit>
                }
                {
                    spunNumber?.[1] &&
                    <Digit number={spunNumber?.[1]} className="absolute top-[46%] left-[40.5%] text-[white] font-bold text-[18px]"></Digit>
                }
                {
                    spunNumber?.[2] &&
                    <Digit number={spunNumber?.[2]} className="absolute top-[46%] left-[51%] text-[white] font-bold text-[18px]"></Digit>
                }
                {
                    spunNumber?.[3] &&
                    <Digit number={spunNumber?.[3]} className="absolute top-[46%] left-[61.5%] text-[white] font-bold text-[18px]"></Digit>
                }
                {
                    spunNumber?.[4] &&
                    <Digit number={spunNumber?.[4]} className="absolute top-[46%] left-[73%] text-[white] font-bold text-[18px]"></Digit>
                }
                {
                    spunNumber?.[5] &&
                    <Digit number={spunNumber?.[5]} className="absolute top-[46%] left-[83.5%] text-[white] font-bold text-[18px]"></Digit>
                }

                <p className="absolute top-[67%] left-[7%] text-[white] font-bold h-[20%]">Your Numbers</p>
                {
                    luckyNumber?.[0] &&
                    <Digit number={luckyNumber?.[0]} className="absolute top-[67%] left-[30%] text-[white] font-bold" />
                }
                {
                    luckyNumber?.[1] &&
                    <Digit number={luckyNumber?.[1]} className="absolute top-[67%] left-[40.5%] text-[white] font-bold" />
                }
                {
                    luckyNumber?.[2] &&
                    <Digit number={luckyNumber?.[2]} className="absolute top-[67%] left-[51%] text-[white] font-bold" />
                }
                {
                    luckyNumber?.[3] &&
                    <Digit number={luckyNumber?.[3]} className="absolute top-[67%] left-[61.5%] text-[white] font-bold" />
                }
                {
                    luckyNumber?.[4] &&
                    <Digit number={luckyNumber?.[4]} className="absolute top-[67%] left-[73%] text-[white] font-bold" />
                }
                {
                    luckyNumber?.[5] &&
                    <Digit number={luckyNumber?.[5]} className="absolute top-[67%] left-[83.5%] text-[white] font-bold" />
                }

            </div>
            {
                jackpotWin > 0 ?
                    <div className="absolute z-[70] w-[40%] top-[50%] h-[30%]"
                        style={{
                            backgroundImage: `url(${win_coins})`,
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <Digit number={jackpotWin} className="absolute bottom-[50%] left-[50%] -translate-x-1/2 text-[white] font-bold text-[36px]"></Digit>
                        <button className="absolute bottom-[10%] left-[50%] -translate-x-1/2 w-[200px] h-[60px]"
                            onClick={() => dispatch(setIsJackPotResult(false))}
                            style={{
                                backgroundImage: `url(${button_img})`,
                                backgroundSize: '100% 100%',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            <p className="text-[white] font-bold text-[16px]">Continue</p>
                        </button>
                    </div> :
                    <div className="absolute z-[70] w-[100%] top-[50%] h-[45%]">
                        <div className="relative w-[100%] h-[100%] flex flex-col items-center justify-center gap-[20px]">
                            <p className="text-[white] font-bold text-[22px]">NO MATCH! BETTER LUCK NEXT TIME!</p>
                            <button className="w-[200px] h-[60px]"
                                onClick={() => dispatch(setIsJackPotResult(false))}
                                style={{
                                    backgroundImage: `url(${button_img})`,
                                    backgroundSize: '100% 100%',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            >
                                <p className="text-[white] font-bold text-[16px]">Continue</p>
                            </button>
                        </div>
                    </div>
            }
        </div>
    );
};

export default JackpotResult;