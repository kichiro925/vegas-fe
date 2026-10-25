import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setIsFavorite } from "../../store/reducers/modal";
import { motion, AnimatePresence } from 'framer-motion';

const Favourites = () => {
    const dispatch = useDispatch();
    const [show, setShow] = React.useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 2000); // fade duration

        return () => clearTimeout(timer);
    }, []);

    const handleExitComplete = () => {
        dispatch(setIsFavorite(false));
    };

    return (
        <AnimatePresence onExitComplete={handleExitComplete}>
            {
                show && (
                <motion.div
                    className="fixed inset-0 w-full h-auto flex justify-center items-center z-50 overflow-hidden m-0 p-0 box-border"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Background black overlay fading from 0.8 to 0 */}
                    <motion.div
                        className="absolute inset-0 bg-black"
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    />

                    {/* Text fading from 1 to 0 simultaneously */}
                    <motion.div
                        className='w-[60%] z-10 font-["Impact",sans-serif] mha-splash-fontSize text-[28px] screen-6:text-[30px] screen-5:text-[38px] sm:text-[47px] md:text-[58px] screen-4:text-[75px] screen-3:text-[90px] screen-2:text-[102px] screen-1:text-[118px] text-splashTx text-center'
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    >
                        <p>FAVORITES</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Favourites;