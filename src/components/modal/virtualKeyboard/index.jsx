import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Keyboard from "react-simple-keyboard";
import useApi from '../../../hooks/useApi';
import { fetchGameList } from '../../../helpers/fetchGameList';

import "react-simple-keyboard/build/css/index.css";
import "../../../assets/css/virtualKeyboard.css";
import crossSymbol from "../../../assets/img/virtualKey/virtual_kb_x.png";
import { setIsVirtualKeyboard } from "../../../store/reducers/modal";
import { useDispatch } from "react-redux";

const VirtualKeyboard = () => {
    const dispatch = useDispatch();
    const keyboardRef = useRef(null);
    const Api = useApi();
    const [input, setInput] = useState("");
    const [activeButton, setActiveButton] = useState(null);
    const [isScreenRatio, setIsScreenRatio] = useState(window.innerWidth / window.innerHeight);
    const [loadingQueue, setLoadingQueue] = useState(new Set());
    const isTransitioning = useSelector(state => state.games.isTransitioning);
    const gameList = useSelector(state => state.games.gameList);
    const provider = useSelector(state => state.games.provider);
    const pageSize = useSelector(state => state.games.pageSize);

    useEffect(() => {
        const handleResize = () => {
            const ratio = window.innerWidth / window.innerHeight;
            setIsScreenRatio(ratio);

            // Find the internal .hg-theme-default keyboard container
            const keyboardContainer = document.querySelector(".hg-theme-default");
            if (keyboardContainer) {
                keyboardContainer.classList.toggle("portrait", ratio < 1);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Run on mount

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const keyboardContainer = document.querySelector(".hg-theme-default");

        if (keyboardContainer) {
            if (isScreenRatio < 1) {
                keyboardContainer.classList.add("portrait");
            } else {
                keyboardContainer.classList.remove("portrait");
            }
        }
    }, [isScreenRatio, input, activeButton]);

    const onChange = (input) => {
        setInput(input);
        fetchGameList({
            Api,
            provider,
            page: 1,
            pageSize,
            filter: input,
            dispatch,
            gameList,
        });
    };

    const handleKeyPress = (button) => {
        setActiveButton(button);
    };

    const handleKeyReleased = () => {
        setActiveButton(null);
    };

    const allKeys = "1234567890qwertyuiopasdfghjklzxcvbnm".split("");

    const buttonTheme = allKeys.map((key) => ({
        class: (activeButton === key)
            ? (/\d/.test(key) ? `btn-${key}-active` : `btn-${key.toLowerCase()}-active`)
            : (/\d/.test(key) ? `btn-${key}` : `btn-${key.toLowerCase()}`),
        buttons: key,
    }));

    useEffect(() => {
        const handleOrientationChange = () => {
            setIsScreenRatio(window.innerWidth / window.innerHeight);
        };
        window.addEventListener("orientationchange", handleOrientationChange);
        return () => window.removeEventListener("orientationchange", handleOrientationChange);
    }, []);

    return (
        <div className="absolute z-[200] flex items-center justify-center w-full h-full">
            <button onClick={() => { dispatch(setIsVirtualKeyboard(false)) }}
                className={`absolute ${isScreenRatio < 1 ? 'top-[26.3%] right-[3%]' : 'top-[44%] right-[13%]'} w-[12%] aspect-square rounded-full`}
                style={{ WebkitClipPath: 'circle(50% at 50% 50%)', clipPath: 'circle(50% at 50% 50%)' }}
            >
                <img src={crossSymbol} alt="cross Symbol" className="w-full h-full pointer-events-none" />
            </button>

            <div ref={keyboardRef} className={`flex flex-col items-center justify-center ${isScreenRatio >= 1 ? 'w-[80vw]' : 'w-full'} bg-black/50 rounded-[10px] border-[2px] border-white/80`}>
                <input
                    value={input}
                    readOnly
                    className="virtual-input font-['Impact'] bg-black/50 mt-[3vh]"
                />

                {/* {
                    input && (
                        <button onClick={() => {setInput("")}}>
                            <img
                                src={x_small}
                                alt="custom"
                                className={`absolute ${isScreenRatio < 1 ? 'top-[29%] right-[30%] w-[8%]' : 'top-[19%] right-[34%] w-[3%]'} aspect-square`}
                            />
                        </button>
                )} */}

                <Keyboard
                    onChange={onChange}
                    onKeyPress={handleKeyPress}
                    onKeyReleased={handleKeyReleased}
                    layout={{
                        default: [
                            "1 2 3 4 5 6 7 8 9 0 {backspace}",
                            "Q W E R T Y U I O P",
                            "A S D F G H J K L",
                            "Z X C V B N M - ' {space}"
                        ]
                    }}
                    display={{
                        "{del}": "DEL",
                        "{enter}": "SPACE"
                    }}
                    buttonTheme={buttonTheme}
                />
            </div>
        </div>
    );
};

export default VirtualKeyboard;