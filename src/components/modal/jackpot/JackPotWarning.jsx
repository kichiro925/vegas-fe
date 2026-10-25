import React from "react";
import { useDispatch } from "react-redux";
import { setIsJackPot } from "../../../store/reducers/modal";
import jackpot_warning from "../../../assets/img/jackpot/jackpot_warning.png";
import button_close from "../../../assets/img/jackpot/button-close.default.png";
import rotate_phone from "../../../assets/img/jackpot/rotatephone.png";

const JackPotWarning = () => {
    const dispatch = useDispatch();
    
    return (
        <div className="absolute flex z-[150] w-full h-screen">
            <div className="absolute flex w-full h-full bg-black opacity-[0.7]"></div>
            
            <button onClick={() => { dispatch(setIsJackPot(false)) }} className="absolute w-[15%] aspect-square top-[8%] right-[41%]"
                style={{
                    backgroundImage: `url(${button_close})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
            </button>
            
            <img src={jackpot_warning} alt="jackpot_warning" className="absolute top-[20%] left-[13%] w-[75%] h-[18%]" />
            
            <img src={rotate_phone} alt="rotate phone" className="absolute top-[45%] left-[26%] w-[50%] h-[35%]" />
        </div>
    );
}

export default JackPotWarning;