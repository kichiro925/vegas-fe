import { useState, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector, useDispatch } from 'react-redux'
import { setGamePlayed, setGameUrl } from '../../../store/reducers/gameSlice'
import '../../../assets/css/modal.css'
import GameFrame from './GameFrame'
import useApi from '../../../hooks/useApi'
import { UpdateBalance } from '../../../store/reducers/auth'
import { setIsGameLoading } from '../../../store/reducers/load'

export default function GameModal() {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const { closeGame, getInfo } = useApi();
    const { gamePlayed } = useSelector((state) => state.games);
    const { gameUrl, gameSession } = useSelector((state) => state.games || {});
    const [open, setOpen] = useState(false)
    const isGameLoading = useSelector(state => state.load.isGameLoading);

    useEffect(() => {
        if (gamePlayed) {
            setOpen(true);
            dispatch(setIsGameLoading(true));
        }
    }, [gamePlayed]);

    const handleClose = () => {
        setOpen(false);
        dispatch(setGamePlayed(false));
        dispatch(setGameUrl(''));
        getInfo(user._id).then((res) => {
            if (res.data) {
                dispatch(UpdateBalance(res.data.balance));
            }
        });
        // if (provider !== 'skyxspin') {
        //     closeGame(gameSession);
        // }
    };

    return (
        <Dialog open={open} onClose={handleClose} className="relative z-[1000]">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-[1000] w-screen h-screen" >
                <div className="flex h-full w-full">
                    <DialogPanel
                        transition
                        className="relative transform bg-black text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in w-full h-full"
                    >
                        <div className="bg-black h-full w-full">
                            <div className="flex flex-col relative h-full">
                                <button
                                    onClick={handleClose}
                                    className="rounded-full bg-red-100 p-2 absolute top-5 right-[34px] z-[1000]"
                                >
                                    <XMarkIcon aria-hidden="true" className="size-6 text-red-600" />
                                </button>
                                <div className="flex-1 h-full">
                                    {window.navigator.userAgent.includes('Android') ? (
                                        <iframe
                                            src={gameUrl}
                                            className="w-full border-none h-[100dvh] overflow-hidden"
                                            title="Game Frame"
                                            allow='fullscreen'
                                        />
                                    ) : window.navigator.userAgent.includes('iPhone') || window.navigator.userAgent.includes('iPad') ? (
                                        <GameFrame gameUrl={gameUrl} />
                                    ) : (
                                        <iframe
                                            src={gameUrl}
                                            className="w-full border-none h-full overflow-hidden"
                                            title="Game Frame"
                                            allow='fullscreen'
                                        />
                                    )}
                                </div>
                                {isGameLoading && (
                                    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center">
                                        <h1 id="loading-text" style={{
                                            fontSize: "2rem",
                                            fontWeight: "bold",
                                            letterSpacing: "2px",
                                            textTransform: "uppercase",
                                            background: "linear-gradient(90deg, #0078ff, #00e4ff)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            animation: "pulse 1.5s infinite alternate"
                                        }}>
                                            LOADING...
                                        </h1>
                                        <div className="text-center mt-4">
                                            <button
                                                onClick={handleClose}
                                                className="text-white bg-[#686868] rounded px-5 py-3 text-base cursor-pointer transition duration-300 hover:bg-[#585858]"
                                            >
                                                BACK
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}