import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsBonusModal } from '../../store/reducers/modal';
import msgBox from "../../assets/img/themes/msgbox.png";
import botBtnMain from '../../assets/img/themes/botbutton_main.png';
import botBtnHover from '../../assets/img/themes/botbutton_hover.png';
import botBtnDown from '../../assets/img/themes/botbutton_down.png';
import ok_text from '../../assets/img/themes/ok_text.png';

export default function BonusModal() {
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
        dispatch(setIsBonusModal(false));
    };

    return (
        <div className="fixed top-[20%] md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 inset-0 z-[100] w-screen md:w-[50%] h-[60%] md:h-[67.7%]" >
            <div className="h-full w-full">
                <div className="flex flex-col items-center relative w-full h-full font-['Impact']"  style={{ backgroundImage: `url(${msgBox})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <p className='absolute text-bonusTx top-[6%] text-[36px] md:text-[38px] text-referralTx2 eading-[1]' style={{ textShadow: '2px 1px 1px rgba(0,0,0,1)' }}>GOLD BONUS</p>
                    
                    <div className='absolute flex flex-col items-center top-[39%]'>
                        <p className='text-white text-[12px] md:text-[17px]' style={{ textShadow: '2px 1px 1px rgba(0,0,0,1)' }}>
                            The Gold Bonus is tied to your level
                        </p>
                        
                        <p className='text-white text-[12px] md:text-[17px] mt-[-5px] mb-[3px] md:mb-[10px]' style={{ textShadow: '2px 1px 1px rgba(0,0,0,1)' }}>It is collected after leveling up.</p>
                        
                        <p className='text-white text-[12px] md:text-[17px]' style={{ textShadow: '2px 1px 1px rgba(0,0,0,1)' }}>Collect 500 when you reach next level</p>
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