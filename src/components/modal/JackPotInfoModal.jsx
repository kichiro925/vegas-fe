import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsJackPotInfo } from '../../store/reducers/modal';
import msgBox from "../../assets/img/themes/msgbox.png";
import botBtnMain from '../../assets/img/themes/botbutton_main.png';
import botBtnHover from '../../assets/img/themes/botbutton_hover.png';
import botBtnDown from '../../assets/img/themes/botbutton_down.png';
import ok_text from '../../assets/img/themes/ok_text.png';
import jackpot_info from '../../assets/img/themes/jackpot_info.png';

export default function JackPotInfoModal() {
    const [closeHovered, setCloseHovered] = useState(false);
    const [closeClicked, setCloseClicked] = useState(false);
    const dispatch = useDispatch();

    const handleCloseDown = () => {
        setCloseClicked(true);
    };

    const handleCloseUp = () => {
        setCloseClicked(false);
    };
    
    const handleClose = () => {
        dispatch(setIsJackPotInfo(false));
    };

    return (
        <div className="z-[210] fixed top-[10%] md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 inset-0 z-[100] w-screen md:w-[50%] h-[80%] md:h-[67.7%]" >
            <div className="h-full w-full">
                <div className="flex flex-col items-center relative w-full h-full"  style={{ backgroundImage: `url(${msgBox})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <img src={jackpot_info} alt='jackpot info' className='w-full h-full' />
                    
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