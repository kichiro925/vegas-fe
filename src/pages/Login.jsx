import React, { useEffect, useState } from 'react';
import vegasLogo from '../assets/img/login/vegas-logo.png';
import googlePlay from '../assets/img/login/1_OIIv4FEjJQMqh-zEPhtlYA.png';
// import vegasBg from '../assets/img/login/vegas.png';
import useApi from '../hooks/useApi';
import { useDispatch } from 'react-redux';
import { Login } from '../store/reducers/auth';
import { useNavigate } from 'react-router-dom';
import { showLoading } from '../store/reducers/load';

const LoginPage = () => {
    const { login } = useApi();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMiniScreen, setIsMiniScreen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkScreenHeight = () => {
            // Only check screen height when keyboard is not visible
            if (document.activeElement.tagName !== 'INPUT') {
                const visualHeight = window.visualViewport?.height || window.innerHeight;
                setIsMiniScreen(visualHeight < 750);
            }
        };

        // Initial check
        checkScreenHeight();

        // Use visualViewport API if available for better mobile handling
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', checkScreenHeight);
            return () => window.visualViewport.removeEventListener('resize', checkScreenHeight);
        } else {
            window.addEventListener('resize', checkScreenHeight);
            return () => window.removeEventListener('resize', checkScreenHeight);
        }
    }, []);

    const loginUser = async () => {
        setLoading(true);
        try {
            await login(username, password)
                .then(
                    ({ data }) => {
                        dispatch(Login(data));
                        setLoading(false);
                    }
                )
                .catch((error) => {
                    setLoading(false);
                    navigate('/error')
                    console.log(error)
                });
        } catch (err) {
            setLoading(false);
            navigate('/error')
            console.log(err)
        }
    }

    return (
        <div className="min-h-screen font-sans text-center"
            style={{
                backgroundImage: `url(/vegas.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'local',
                overflow: 'hidden',
                padding: '20px 0px 20px 0px'
            }}
        >
            <div className="Mycontainer">
                <div className="hidden screen-3:block lg:block md:block mt-[3rem]"></div>

                <div className="flex flex-wrap mr-[-15px] ml-[-15px]">

                    {!isMiniScreen ? (
                        <div className="w-full md:hidden md:px-[15px]">
                            <div className="inline-block px-[15px]">
                                <img src={vegasLogo} style={{ maxWidth: 'min(100%, 500px)' }} className="w-full h-[30%] object-contain" alt="Vegas-xx" />
                            </div>
                            <div className="bg-gray-400/70 p-1 rounded-3xl mt-11 mx-[15px] md:mx-0">
                                <div className="flex flex-col p-6" method="post" acceptCharset="UTF-8">
                                    <div className="w-[98%] mb-[1rem]">
                                        <input type="text" className="w-full border-[1px] border-borderTx py-[0.375rem] px-[0.75rem] mb-[1rem] rounded" name="username" autoComplete="username" placeholder="USERNAME" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        <input type="password" className="w-full border-[1px] border-borderTx py-[0.375rem] px-[0.75rem] mb-[1rem] rounded" name="password" autoComplete="current-password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <div className="flex items-center justify-center m-1">
                                            <input type="checkbox" className="h-3 w-3" name="rememberme" id="rememberme" />
                                            <label className="text-white cursor-pointer ml-2" htmlFor="rememberme">REMEMBER ME</label>
                                        </div>
                                        <div className='w-full flex justify-center mt-[1rem]'>
                                            <button onClick={loginUser} className="bg-lgBtnBg border-[1px] border-lgBtnBg text-white px-2 py-[0.4rem] m-1 rounded hover:bg-blue-600">{loading ? 'Loading...' : 'ENTER'}</button>
                                        </div>
                                    </div>
                                    <div className="w-full text-center">
                                        <p className="text-white mb-[1rem]">sales[at]vegas-xx.org</p>
                                    </div>
                                    <div className="w-full text-center">
                                        <a className="text-white hover:underline" href="/lobby/?forgotpass=1">Forgot password?</a>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden">
                                <a href="https://play.google.com/store/apps/details?id=lol.gapi.vxgames">
                                    <img src={googlePlay} width="200" alt="Computer Hope" className="" />
                                </a>
                            </div>
                        </div>
                    ) :
                        <div className="w-full md:hidden md:px-[15px]">
                            <div className="bg-gray-400/70 p-1 rounded-3xl mx-[15px] md:mx-0">
                                <div className="flex flex-col" method="post" acceptCharset="UTF-8">
                                    <div className="w-[98%] mb-[1rem]">
                                        <input type="text" className="w-full border-[1px] border-borderTx py-[0.375rem] px-[0.75rem] m-1 rounded" name="username" autoComplete="username" placeholder="USERNAME" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        <input type="password" className="w-full border-[1px] border-borderTx py-[0.375rem] px-[0.75rem] mt-0 mr-1 mb-1 ml-1 rounded" name="password" autoComplete="current-password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <button onClick={loginUser} className="bg-lgBtnBg border-[1px] border-lgBtnBg text-white px-2 py-[0.4rem] m-1 rounded hover:bg-blue-600">{loading ? 'Loading...' : 'ENTER'}</button>
                                        <div className="flex items-center justify-center m-1 pl-[1.25rem]">
                                            <input type="checkbox" className="h-3 w-3" name="rememberme" id="rememberme" />
                                            <label className="text-white cursor-pointer ml-2" htmlFor="rememberme">REMEMBER</label>
                                        </div>
                                    </div>
                                    <div className="w-full text-center">
                                        <a className="text-white hover:underline" href="/lobby/?forgotpass=1">Forgot password?</a>
                                    </div>
                                </div>
                            </div>
                            <div className="inline-block px-[30px]">
                                <img src={vegasLogo} style={{ maxWidth: 'min(100%, 500px)' }} className="w-full h-[30%] object-contain" alt="Vegas-xx" />
                            </div>
                            <div className="hidden">
                                <a href="https://play.google.com/store/apps/details?id=lol.gapi.vxgames">
                                    <img src={googlePlay} width="200" alt="Computer Hope" className="" />
                                </a>
                            </div>
                        </div>
                    }
                    {
                        isMiniScreen ?
                            <div className='flex flex-col justify-center items-center w-full mt-5 hidden md:flex'>
                                <div className="w-[690px] mt-[-15px] md:block">
                                    <div className="bg-gray-400/70 p-1 rounded-3xl">
                                        <div className="flex w-[98%]" method="post" acceptCharset="UTF-8" >
                                            <input type="text" className="w-[216px] h-[38px] text-[#495057] m-1 py-[0.375rem] px-[0.75rem] rounded border-[1px] border-borderTx2 focus:border-[#80bdff] focus:outline-none" name="username" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="USERNAME" />
                                            <input type="password" className="w-[216px] h-[38px] text-[#495057] m-1 py-[0.375rem] px-[0.75rem] rounded border-[1px] border-borderTx2 focus:border-[#80bdff] focus:outline-none" name="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="PASSWORD" />
                                            <button onClick={loginUser} className="m-1 bg-lgBtnBg border-[1px] border-lgBtnBg text-white py-[0.375rem] px-[0.75rem] rounded hover:bg-blue-600">{loading ? 'Loading...' : 'ENTER'}</button>
                                            <div className="flex items-center justify-center m-1">
                                                <input type="checkbox" className="h-[13px] w-[13px" name="rememberme" id="rememberme2" />
                                                <label className="text-[#fff] cursor-pointer ml-[0.25rem]" htmlFor="rememberme">REMEMBER</label>
                                            </div>
                                        </div>
                                        <div>
                                            <a className="text-white hover:underline" href="/lobby/?forgotpass=1">Forgot password?</a>
                                        </div>
                                    </div>
                                    <div className="hidden pt-12">
                                        <a href="https://play.google.com/store/apps/details?id=lol.gapi.vxgames">
                                            <img src={googlePlay} width="200" alt="Computer Hope" className="" />
                                        </a>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center w-full'>
                                    <img src={vegasLogo} style={{ width: '245px' }} className="w-full h-auto object-contain" alt="Vegas-xx" />
                                </div>
                            </div>
                            :
                            <>
                                <div className="w-full screen-4:w-1/2 screen-3:w-1/2 lg:w-1/2 md:w-5/12 hidden md:block pr-[15px] pl-[15px]">
                                    <img src={vegasLogo} style={{ maxWidth: 'min(100%, 500px)' }} className="w-full h-auto object-contain" alt="Vegas-xx" />
                                </div>
                                <div className="w-full md:w-1/12 lg:w-1/12 screen-3:w-1/6 hidden md:block">
                                </div>
                                <div className="w-full screen-4:w-[41.6667%] screen-3:w-1/3 lg:w-5/12 md:w-1/2 hidden md:block pr-[15px] pl-[15px]">
                                    <div className="bg-gray-400/70 p-[1.875rem] rounded-3xl mt-[3.125rem]">
                                        <div className="flex flex-col justify-center" method="post" acceptCharset="UTF-8" >
                                            <div className="mb-4">
                                                <label className="sr-only">USERNAME</label>
                                                <input type="text" className="w-full py-[0.375rem] px-[0.75rem] rounded border-[1px] border-borderTx2" name="username" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="USERNAME..." />
                                            </div>
                                            <div className="mb-4">
                                                <label className="sr-only">PASSWORD</label>
                                                <input type="password" className="w-full py-[0.375rem] px-[0.75rem] rounded border-[1px] border-borderTx2" name="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="PASSWORD..." />
                                            </div>
                                            <div className="flex items-center justify-center mb-4 pl-[2px]">
                                                <input type="checkbox" className="h-[13px] w-[13px]" name="rememberme" id="rememberme2" />
                                                <label className="text-white cursor-pointer ml-2" htmlFor="rememberme">REMEMBER ME</label>
                                            </div>
                                            <div className="mb-[1rem]">
                                                <button onClick={loginUser} className="bg-lgBtnBg border-[1px] border-lgBtnBg text-white px-2 py-[0.4rem] rounded hover:bg-blue-600">{loading ? 'Loading...' : 'ENTER'}</button>
                                            </div>
                                            <p className="text-white mb-[1rem]">sales[at]vegas-xx.org</p>
                                            <div>
                                                <a className="text-white hover:underline" href="/lobby/?forgotpass=1">Forgot password?</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden pt-12">
                                        <a href="https://play.google.com/store/apps/details?id=lol.gapi.vxgames">
                                            <img src={googlePlay} width="200" alt="Computer Hope" className="" />
                                        </a>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
            <div className="absolute bottom-0 w-full h-24">
                {/* Footer content */}
            </div>
        </div>
    );
};

export default LoginPage;