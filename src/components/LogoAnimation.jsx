import React, { useRef, useEffect, useState } from "react";
import logo_anim from '../assets/img/logo_anim.png';

const FRAME_WIDTH = 802; // Each frame width
const FRAME_HEIGHT = 119; // Each frame height
const COLUMNS = 2; // Number of columns in the sprite sheet
const ROWS = 9; // Number of rows in the sprite sheet
const TOTAL_FRAMES = COLUMNS * ROWS; // Total frames in the sprite sheet
const FPS = 20;
const ANIMATION_DURATION = 1970; // Total duration for one complete cycle in milliseconds

const LogoAnimation = ({ className, style }) => {
    const canvasRef = useRef(null);
    const frameRef = useRef(0);
    const spriteRef = useRef(new Image());
    const directionRef = useRef(1); // 1 for forward, -1 for backward
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        spriteRef.current.src = logo_anim;

        let animationFrameId;
        let lastFrameTime = 0;
        const frameDuration = 1000 / FPS;

        const drawFrame = (timestamp) => {
            if (timestamp - lastFrameTime >= frameDuration) {
                const frame = frameRef.current;

                const col = frame % COLUMNS;
                const row = Math.floor(frame / COLUMNS);

                ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
                ctx.drawImage(
                spriteRef.current,
                col * FRAME_WIDTH,
                row * FRAME_HEIGHT,
                FRAME_WIDTH,
                FRAME_HEIGHT,
                0,
                0,
                FRAME_WIDTH,
                FRAME_HEIGHT
                );

                frameRef.current += directionRef.current;

                if (frameRef.current >= TOTAL_FRAMES) {
                    frameRef.current = TOTAL_FRAMES - 1;
                    directionRef.current = -1;
                } else if (frameRef.current < 0) {
                    frameRef.current = 0;
                    directionRef.current = 1;
                }

                lastFrameTime = timestamp;
            }
            animationFrameId = requestAnimationFrame(drawFrame);
        };

        const startAnimation = () => {
        
            if (isAnimating) {
                animationFrameId = requestAnimationFrame(drawFrame);
            }
        };

        spriteRef.current.onload = startAnimation;

        spriteRef.current.onerror = () => {
            console.error("Failed to load the sprite image.");
        };

        return () => cancelAnimationFrame(animationFrameId);
    }, [isAnimating]);

    useEffect(() => {
        const cycleAnimation = () => {
            setIsAnimating(true);
            frameRef.current = 0; // Reset frame to the first frame
            directionRef.current = 1; // Start forward

            const startTime = performance.now();

            const animateCycle = (timestamp) => {
                const elapsed = timestamp - startTime;

                if (elapsed < ANIMATION_DURATION) {
                    requestAnimationFrame(animateCycle);
                } else {
                    // Stop animation
                    setIsAnimating(false);
                    frameRef.current = 0; // Reset frame to the first frame
                    
                    // Add null check for canvas
                    const canvas = canvasRef.current;
                    if (canvas) {
                        const ctx = canvas.getContext("2d");
                        // Draw the first frame (first row, first column)
                        ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
                        ctx.drawImage(
                            spriteRef.current,
                            0,
                            0,
                            FRAME_WIDTH,
                            FRAME_HEIGHT,
                            0,
                            0,
                            FRAME_WIDTH,
                            FRAME_HEIGHT
                        );
                    }

                    // Only schedule next cycle if component is still mounted
                    if (canvas) {
                        setTimeout(cycleAnimation, 5000); // Restart after 5 seconds
                    }
                }
            };

            requestAnimationFrame(animateCycle);
        };

        // Start the cycle when the component mounts
        spriteRef.current.onload = cycleAnimation;

        return () => {
            setIsAnimating(false); // Cleanup
            // Clear any pending timeouts
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
            }
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                width={FRAME_WIDTH}
                height={FRAME_HEIGHT}
                className={className}
                style={style}
            />
        </>
    );
};

export default LogoAnimation;