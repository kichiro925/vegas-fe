import React, { useState, useEffect } from 'react';
import jackpot from "../assets/img/jack/jackpot.png";
import DiceNumber from './DiceNumber';
import useApi from '../hooks/useApi';

const Header = () => {
    const { getJackpot } = useApi();
    const [jackpots, setJackpot] = useState({ gold: 0, silver: 0, bronze: 0 });
    const [currentHeight, setCurrentHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setCurrentHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getJackpots = async () => {
        const res = await getJackpot();
        if (res?.data) {
            setJackpot(res.data);
        }
    }

    useEffect(() => {
        getJackpots();
    }, []);

    const headerH = currentHeight * 0.07;

    return (
        <div
            className="hidden mha-hidden lg:flex items-center w-full bg-no-repeat bg-[length:100%_100%] scrollbar-hide"
            style={{ backgroundImage: `url(${jackpot})`, height: `${headerH}px` }}
        >
            <DiceNumber number={Math.floor(jackpots?.bronze * 100 || 0)} id={1} />
            <DiceNumber number={Math.floor(jackpots?.silver * 100 || 0)} id={2} />
            <DiceNumber number={Math.floor(jackpots?.gold * 100 || 0)} id={3} />
        </div>
    );
};

export default Header;