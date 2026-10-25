import { useState, useEffect, useRef } from 'react';
import '../../../assets/css/modal.css'

export default function GameFrame({ gameUrl, handleIframeLoad }) {
    const iframeRef = useRef(null);
    const [heightType, setHeightType] = useState('both');

    useEffect(() => {
        const updateMode = () => {
            const height = window.innerHeight;

            if (height > 650) {
                setHeightType('style'); // Use inline style only
            } else if (height < 500) {
                setHeightType('class'); // Use full-height class only
            }
        };

        updateMode(); // Initial check

        window.addEventListener('resize', updateMode);
        window.addEventListener('orientationchange', () => {
            setTimeout(updateMode, 300); // Delay to allow orientation settle
        });

        return () => {
            window.removeEventListener('resize', updateMode);
            window.removeEventListener('orientationchange', updateMode);
        };
    }, []);

    return (
        <iframe
            src={gameUrl}
            ref={iframeRef}
            onLoad={handleIframeLoad}
            title="Game Frame"
            allow="fullscreen"
            className={`w-full border-none ${heightType !== 'style' ? 'full-height' : ''}`}
            style={
                heightType !== 'class'
                    ? {
                        height: `${window.innerHeight}px`,
                        overflow: 'hidden',
                    }
                    : {}
            }
        />
    );
}