import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLevelModal } from '../../store/reducers/modal';
import msgBox from "../../assets/img/themes/msgbox.png";
import botBtnMain from '../../assets/img/themes/botbutton_main.png';
import botBtnHover from '../../assets/img/themes/botbutton_hover.png';
import botBtnDown from '../../assets/img/themes/botbutton_down.png';
import ok_text from '../../assets/img/themes/ok_text.png';

export default function LevelModal() {
    const [closeHovered, setCloseHovered] = useState(false);
    const [closeClicked, setCloseClicked] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.auth);

    const handleCloseDown = () => {
        setCloseClicked(true);
    };

    const handleCloseUp = () => {
        setCloseClicked(false);
    };

    const handleClose = () => {
        dispatch(setIsLevelModal(false));
    };

    return (
        <div className="fixed top-[20%] md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 inset-0 z-[100] w-screen md:w-[50%] h-[60%] md:h-[67.7%]" >
            <div className="h-full w-full">
                <div className="flex flex-col items-center relative w-full h-full font-['Impact']" style={{ backgroundImage: `url(${msgBox})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <p className='absolute text-bonusTx top-[6%] text-[42px] md:text-[44px] text-referralTx2 eading-[1]' style={{ textShadow: '2px 1px 1px rgba(0,0,0,1)' }}>Your level is {user?.level?.toFixed(2)}</p>
                    <p className='absolute top-[25%] text-white text-center text-[14px] lg:text-[24px]' style={{ textShadow: '2px 1px 1px rgba(0,0,0,1)' }}>
                        Levels unlock bonus features!<br />
                        The progress is updated every few minutes.
                    </p>

                    <div className='absolute flex flex-col items-center top-[39%]'>
                        {user?.level >= 1 &&
                            <p className='text-white text-[14px] lg:text-[24px] mt-[5px] mb-[3px] md:mb-[10px]' style={{ textShadow: '2px 1px 1px rgba(0,0,0,1)' }}>★ Current Level features ★</p>
                        }
                        {
                            user?.leve >= 1 &&
                            <p className='text-white text-[14px] lg:text-[24px]' style={{ textShadow: '2px 1px 1px rgba(0,0,0,1)' }}>Daily Bonus is Now Available! Every 24h if balance is below 100</p>
                        }
                        {user?.level >= 3 &&
                            <p className='text-white text-[14px] lg:text-[24px]' style={{ textShadow: '2px 1px 1px rgba(0,0,0,1)' }}>Gold Bonus is now available!</p>
                        }
                        {user?.level >= 3 &&
                            <p className='text-white text-[14px] lg:text-[24px]' style={{ textShadow: '2px 1px 1px rgba(0,0,0,1)' }}>Extra Cashback bonus +{user?.level >= 3 ? `${user?.level * 2}%` : '0%'} now available!</p>
                        }
                        <p className='text-white text-[14px] lg:text-[24px]' style={{ textShadow: '2px 1px 1px rgba(0,0,0,1)' }}>Play to level up and unlock more bonus features!</p>
                    </div>

                    <button
                        onClick={handleClose}
                        onMouseEnter={() => setCloseHovered(true)}
                        onMouseLeave={() => {
                            setCloseHovered(false);
                            setCloseClicked(false);
                        }}
                        onMouseDown={handleCloseDown}
                        onMouseUp={handleCloseUp}
                        className="z-[50] absolute w-[20%] h-[10%] text-[1.56rem] text-white font-['Impact'] bottom-[5%] left-1/2 transform -translate-x-1/2 z-50"
                        style={{
                            backgroundImage: `url(${msgBox})`,
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                            backgroundImage: `url(${closeClicked ? botBtnDown : (closeHovered ? botBtnHover : botBtnMain)})`,
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <img src={ok_text} alt='ok text' className='w-full h-full' />
                    </button>
                </div>
            </div>
        </div>
    )
}