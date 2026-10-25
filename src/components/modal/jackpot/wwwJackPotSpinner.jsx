import React, { useEffect, useState, useRef } from "react";
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
import Digit from "../../Digit";

import { useDispatch } from 'react-redux';
import { setIsJackPot, setIsJackPotInfo } from "../../../store/reducers/modal";

const JackPotSpinner = () => {
    const canvasRef = useRef(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    
    const imgBackground = new Image();
    const wheelFrame = new Image();
    const wheelMarker = new Image();
    const wheelOuter = new Image();
    const wheelInner = new Image();
    const wheelBtn = new Image();
    const wheelBtnText = new Image();

    imgBackground.src = jack_mainBg;
    wheelFrame.src = wheel_frame;
    wheelMarker.src = wheel_marker;
    wheelOuter.src = wheel_outer;
    wheelInner.src = wheel_inner;
    wheelBtn.src = wheel_btn;
    wheelBtnText.src = wheelBtnText;
    
    const handlePlay = () => {
        if (isSpinning) return; // Prevent multiple spins
        
        setIsSpinning(true);
        const randomRotations = Math.floor(Math.random() * 3) + 3; // 3-5 full rotations
        const randomAngle = Math.floor(Math.random() * 360); // 0-359 degrees
        const totalRotation = (randomRotations * 360) + randomAngle;

        let startTime = null;
        const duration = 3000; // 3 seconds spin

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            if (elapsed < duration) {
                const progress = elapsed / duration;
                const easeOut = 1 - Math.pow(1 - progress, 3);
                setRotation(easeOut * totalRotation);
                requestAnimationFrame(animate);
            } else {
                setRotation(totalRotation);
                setIsSpinning(false);
            }
        };

        requestAnimationFrame(animate);
    };
    
    const draw = (ctx) => {
        const canvas = canvasRef.current;
        const width = canvas.width;
        const height = canvas.height;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        ctx.clearRect(0, 0, width, height);
        
        ctx.drawImage(imgBackground, 0, 0, width, height);
        const widthPercentage = 0.4622;
        const size1 = Math.max(canvas.width, canvas.height) * widthPercentage;

        const topPercentage1 = 0.15;
        const leftPercentage1 = 0.27;
        const xPos1 = canvas.width * leftPercentage1;
        const yPos1 = canvas.height * topPercentage1;
        ctx.drawImage(wheelFrame, xPos1, yPos1, size1, size1);
        
        const markerLeftPercentage = 0.39; // 39% from the left of the wheelFrame
        const markerWidthPercentage = 0.58; // 58% of the width of the wheelMarker
        const markerHeightPercentage = 0.35; // 35% of the height of the wheelMarker

        // Calculate the actual position and size for the wheelMarker
        const xPos2 = xPos1 + size1 * markerLeftPercentage; // Center the marker
        const yPos2 = yPos1 + (size1 - (size1 * markerHeightPercentage)) / 2; // Center vertically

        // Draw the wheel marker
        ctx.drawImage(wheelMarker, xPos2, yPos2, size1 * markerWidthPercentage, size1 * markerHeightPercentage);
    }
        
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        const render = () => {
            draw(ctx);
            requestAnimationFrame(render);
        }
        render();
        
        const handleResize = () => {
            canvas.width = window.innerWidth * 0.67; // Adjust as needed
            canvas.height = window.innerHeight * 0.873; // Adjust as needed
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        <div className="absolute z-[200] flex w-full justify-center"
            style={{
                height: 'calc(var(--vh, 1vh) * 100)',
            }}
        >
            <canvas ref={canvasRef} style={{width: '67%', height: '87.3%'}}/>
        </div>
    );
};

export default JackPotSpinner;