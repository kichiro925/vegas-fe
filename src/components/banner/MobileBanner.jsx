import React, { useEffect } from "react";
import { useState, useRef } from "react";
import useApi from "../../hooks/useApi";
import { useDispatch } from 'react-redux';
import { setGameList, setMobileGameList, setError, setProvider, setMobileCurrentPage, setCurrentPage } from '../../store/reducers/gameSlice';
import { setLoading } from "../../store/reducers/load";

import leftBtn from "../../assets/img/themes/catarrowleft.png";
import leftBtnHover from "../../assets/img/themes/catarrowleft_highlight.png";
import rightBtn from "../../assets/img/themes/catarrowright.png";
import rightBtnHover from "../../assets/img/themes/catarrowright_highlight.png";
import topbutton_down from "../../assets/img/themes/topbutton_down.png";
import topbutton_hover from "../../assets/img/themes/topbutton_hover.png";
import topbutton_main from "../../assets/img/themes/topbutton_main.png";

import all from "../../assets/img/themes/categories/all.png";
import amatic from "../../assets/img/themes/categories/amatic.png";
import aristocrat from "../../assets/img/themes/categories/aristocrat.png";
import bgaming from "../../assets/img/themes/categories/bgaming.png";
import bomba from "../../assets/img/themes/categories/bomba.png";
import egt from "../../assets/img/themes/categories/egt.png";
import fishing from "../../assets/img/themes/categories/fishing.png";
import lnw from "../../assets/img/themes/categories/lnw.png";
import netent from "../../assets/img/themes/categories/netent.png";
import novomatic from "../../assets/img/themes/categories/novomatic.png";
import pragmatic from "../../assets/img/themes/categories/pragmatic.png";
import racing from "../../assets/img/themes/categories/racing.png";
import table from "../../assets/img/themes/categories/table.png";
import wazdan from "../../assets/img/themes/categories/wazdan.png";
import evoplay from "../../assets/img/themes/categories/evoplay1.svg";
import apollo from "../../assets/img/themes/categories/apollo.png";
import betsoft from "../../assets/img/themes/categories/betsoft.png";
import greentube from "../../assets/img/themes/categories/greentube.png";
import stake from "../../assets/img/themes/categories/stake.png";
import igrosoft from "../../assets/img/themes/categories/igrosoft.png";
import booongo from "../../assets/img/themes/categories/booongo.png";
import merkur from "../../assets/img/themes/categories/merkur.png";
import mga from "../../assets/img/themes/categories/mga.png";
import microgaming from "../../assets/img/themes/categories/microgaming.png";
import quickspin from "../../assets/img/themes/categories/quickspin.png";
import gaminator from "../../assets/img/themes/categories/gaminator.png";
import tada from "../../assets/img/themes/categories/tada.png";
import hacksaw from "../../assets/img/themes/categories/hacksaw.svg";
import jdb from "../../assets/img/themes/categories/jdb.svg";
import jili from "../../assets/img/themes/categories/jili.svg";
import konami from "../../assets/img/themes/categories/konami.png";
import kajot from "../../assets/img/themes/categories/kajot.png";

import spribe from "../../assets/img/themes/categories/spribe.png";
import ssg from "../../assets/img/themes/categories/ssg.png";
import relaxgaming from "../../assets/img/themes/categories/relaxgaming.png";
import wmg from "../../assets/img/themes/categories/wmg.png";
import playtech from "../../assets/img/themes/categories/playtech.png";
import nolimit from "../../assets/img/themes/categories/nolimit.png";
import austria from "../../assets/img/themes/categories/austria.png";
import blueprint from "../../assets/img/themes/categories/blueprint.png";
import igt from "../../assets/img/themes/categories/igt.png";
import pocket from "../../assets/img/themes/categories/pg-black.png";
import redrake from "../../assets/img/themes/categories/redrake.png";
import playngo from "../../assets/img/themes/categories/playngo.png";
import elbet from "../../assets/img/themes/categories/elbet.png";
import cqgaming from "../../assets/img/themes/categories/cqgaming.png";
import pushgaming from "../../assets/img/themes/categories/pushgaming.png";
import rubyplay from "../../assets/img/themes/categories/rubyplay.png";
import xgaming from "../../assets/img/themes/categories/xgaming.png";
import playstar from "../../assets/img/themes/categories/playstar.svg";
import habanero from "../../assets/img/themes/categories/habanero.png";
// import spadeGaming from "../../assets/img/themes/categories/spadeGaming.png";
import playson from "../../assets/img/themes/categories/playson.png"
import inout from "../../assets/img/themes/categories/inout.png"
import aviatrix from "../../assets/img/themes/categories/aviatrix.png"

import clickSound from '../../assets/sounds/themes/vegasxwinter/click.mp3';

import { useSelector } from 'react-redux';

const MobileBanner = () => {
    const Api = useApi();
    const dispatch = useDispatch();
    const [isLeftHovered, setIsLeftHovered] = useState(false);
    const [isRightHovered, setIsRightHovered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [buttonStates, setButtonStates] = useState({
        all: { hovered: false, clicked: false },
        amatic: { hovered: false, clicked: false },
        aristocrat: { hovered: false, clicked: false },
        // bgaming: { hovered: false, clicked: false },
        // bomba: { hovered: false, clicked: false },
        egt: { hovered: false, clicked: false },
        fishing: { hovered: false, clicked: false },
        lnw: { hovered: false, clicked: false },
        netent: { hovered: false, clicked: false },
        // novomatic: { hovered: false, clicked: false },
        pp: { hovered: false, clicked: false },
        pg: { hovered: false, clicked: false },
        // racing: { hovered: false, clicked: false },
        table: { hovered: false, clicked: false },
        wazdan: { hovered: false, clicked: false },
        evoplay: { hovered: false, clicked: false },
        playngo: { hovered: false, clicked: false },
        // tada: { hovered: false, clicked: false },
        // hacksaw: { hovered: false, clicked: false },
        // jdb: { hovered: false, clicked: false },
        // jili: { hovered: false, clicked: false },
        konami: { hovered: false, clicked: false },
        kajot: { hovered: false, clicked: false },
        spribe: { hovered: false, clicked: false },
        ssg: { hovered: false, clicked: false },
        relaxgaming: { hovered: false, clicked: false },
        wmg: { hovered: false, clicked: false },
        playtech: { hovered: false, clicked: false },
        nolimit: { hovered: false, clicked: false },
        austria: { hovered: false, clicked: false },
        blueprint: { hovered: false, clicked: false },
        igt: { hovered: false, clicked: false },
        redrake: { hovered: false, clicked: false },
        playngo: { hovered: false, clicked: false },
        elbet: { hovered: false, clicked: false },
        cqgaming: { hovered: false, clicked: false },
        pushgaming: { hovered: false, clicked: false },
        rubyplay: { hovered: false, clicked: false },
        xgaming: { hovered: false, clicked: false },
        playstar: { hovered: false, clicked: false },
        habanero: { hovered: false, clicked: false },
        // spadeGaming: { hovered: false, clicked: false },
        playson: { hovered: false, clicked: false },
        inout: { hovered: false, clicked: false },
        aviatrix: { hovered: false, clicked: false },
    });
    // const [prId, setPrId] = useState('all');

    const playClickSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    }

    const baseButtonStyle = {
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        border: 'none',
        padding: 0,
        height: '4.3rem',
        cursor: 'pointer',
        transition: 'background-image 0.2s ease'
    };

    const getMainBtnStyle = (isHovered, isClicked) => ({
        ...baseButtonStyle,
        backgroundImage: `url(${isClicked ? topbutton_down :
            isHovered ? topbutton_hover :
                topbutton_main
            })`
    });

    const categories = [
        { id: '', image: all, name: 'All' },
        { id: 'amatic', image: amatic, name: 'Amatic' },
        { id: 'fishing', image: fishing, name: 'Fishing' },
        { id: 'tablegames', image: table, name: 'Table' },
        { id: 'netent', image: netent, name: 'Netent' },
        // { id: 'novomatic', image: novomatic, name: 'Novomatic' },
        { id: 'egt', image: egt, name: 'Egt' },
        { id: 'wazdan', image: wazdan, name: 'Wazdan' },
        // { id: 'racing', image: racing, name: 'Racing' },
        // { id: 'bomba', image: bomba, name: 'Bomba' },
        { id: 'aristocrat', image: aristocrat, name: 'Aristocrat' },
        { id: 'pp', image: pragmatic, name: 'Pragmatic' },
        { id: 'pg', image: pocket, name: 'Pocket' },
        // { id: 'lnw', image: lnw, name: 'Lnw' },
        { id: 'evoplay', image: evoplay, name: 'Evoplay' },
        { id: 'apollo', image: apollo, name: 'Apollo' },
        { id: 'betsoft', image: betsoft, name: 'Betsoft' },
        { id: 'greentube', image: greentube, name: 'Greentube' },
        { id: 'stake', image: stake, name: 'Stake' },
        { id: 'igrosoft', image: igrosoft, name: 'Igrosoft' },
        { id: 'booongo', image: booongo, name: 'Booongo' },
        { id: 'merkur', image: merkur, name: 'Merkur' },
        { id: 'mga', image: mga, name: 'MGA' },
        { id: 'microgaming', image: microgaming, name: 'Microgaming' },
        { id: 'quickspin', image: quickspin, name: 'Quickspin' },
        { id: 'gaminator', image: gaminator, name: 'Gaminator' },
        // { id: 'tada', image: tada, name: 'Tada' },
        // { id: 'hacksaw', image: hacksaw, name: 'Hacksaw' },
        // { id: 'jdb', image: jdb, name: 'JDB' },
        // { id: 'jili', image: jili, name: 'Jili' },
        { id: 'konami', image: konami, name: 'Konami' },
        { id: 'kajot', image: kajot, name: 'Kajot' },
        { id: 'spribe', image: spribe, name: 'Spribe' },
        { id: 'ssg', image: ssg, name: 'SSG' },
        { id: 'relaxgaming', image: relaxgaming, name: 'Relax Gaming' },
        { id: 'wmg', image: wmg, name: 'Wmg' },
        { id: 'playtech', image: playtech, name: 'Playtech' },
        { id: 'nolimit', image: nolimit, name: 'Nolimit' },
        { id: 'austria', image: austria, name: 'Austria' },
        { id: 'blueprint', image: blueprint, name: 'Blueprint' },
        { id: 'igt', image: igt, name: 'Igt' },
        { id: 'redrake', image: redrake, name: 'Redrake' },
        { id: 'playngo', image: playngo, name: 'Playngo' },
        { id: 'elbet', image: elbet, name: 'Elbet' },
        { id: 'cqgaming', image: cqgaming, name: 'Cqgaming' },
        { id: 'pushgaming', image: pushgaming, name: 'Pushgaming' },
        { id: 'rubyplay', image: rubyplay, name: 'Rubyplay' },
        { id: 'xgaming', image: xgaming, name: 'Xgaming' },
        { id: 'playstar', image: playstar, name: 'PlayStar' },
        { id: 'habanero', image: habanero, name: 'Habanero' },
        // { id: 'spadeGaming', image: spadeGaming, name: 'SpadeGaming' },
        { id: 'playson', image: playson, name: 'Playson' },
        { id: 'inout', image: inout, name: 'Inout' },
        { id: 'aviatrix', image: aviatrix, name: 'Aviatrix' },
    ];

    const handleButtonState = (categoryId, stateType, value) => {
        setButtonStates(prev => ({
            ...prev,
            [categoryId]: {
                ...prev[categoryId],
                [stateType]: value
            }
        }));
    };

    const handleNavigation = (direction) => {
        let newIndex;
        if (direction === 'left') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
        } else {
            newIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
        }
        setCurrentIndex(newIndex);
        handleCategoryClick(categories[newIndex].id);
        dispatch(setMobileCurrentPage(1));
        dispatch(setCurrentPage(1));
        dispatch(setProvider(categories[newIndex].id));
    };

    const handleCategoryClick = async (categoryId) => {
        // console.log('Category clicked:', categoryId);
        try {
            dispatch(setLoading(true));

            const response = await Api.getGameList(categoryId);
            dispatch(setMobileGameList(response.data));
            dispatch(setGameList(response.data));
            dispatch(setLoading(false));
        } catch (error) {
            console.error('Error in handleCategoryClick:', error);
            dispatch(setError(error));
            dispatch(setLoading(false));
        }
    };

    const currentCategory = categories[currentIndex];
    const { gamePlayed } = useSelector((state) => state.games);
    const provider = useSelector(state => state.games.provider);

    useEffect(() => {
        const targetId = provider;
        const currentIndex = categories.findIndex(category => category.id === targetId);
        setCurrentIndex(currentIndex);
    }, [provider]);

    return (
        !gamePlayed ? (
            <div
                className={`flex fixed z-10 top-[2.7%] mh-display-none md:hidden items-center w-full h-[7.5%] bg-no-repeat bg-[length:100%_100%] overflow-hidden`}
            >
                <button
                    className="h-full w-[21.4%] ml-2 mr-6 cursor-pointer transition-[background-image] duration-200 ease-in-out bg-no-repeat bg-center bg-[length:100%_100%] border-0 p-0"
                    style={{ backgroundImage: `url(${leftBtn})` }}
                    onMouseEnter={() => setIsLeftHovered(true)}
                    onMouseLeave={() => setIsLeftHovered(false)}
                    onClick={() => handleNavigation('left')}
                />

                <div className="flex flex-1 justify-center">
                    <button
                        key={currentCategory.id}
                        onClick={() => {
                            handleCategoryClick(currentCategory.id);
                            playClickSound();
                        }}
                        className="flex-shrink-0 h-full w-full cursor-pointer transition-[background-image] duration-200 ease-in-out bg-no-repeat bg-center bg-[length:100%_100%] border-0 p-0"
                        style={getMainBtnStyle(
                            buttonStates[currentCategory.id]?.hovered || false,
                            buttonStates[currentCategory.id]?.clicked || false
                        )}
                        onMouseEnter={() => handleButtonState(currentCategory.id, 'hovered', true)}
                        onMouseLeave={() => handleButtonState(currentCategory.id, 'hovered', false)}
                        onMouseDown={() => handleButtonState(currentCategory.id, 'clicked', true)}
                        onMouseUp={() => handleButtonState(currentCategory.id, 'clicked', false)}
                    >
                        <img
                            src={currentCategory.image}
                            className="h-full w-full object-contain"
                            alt={currentCategory.name}
                        />
                    </button>
                </div>

                <button
                    className="h-full w-[21.4%] ml-6 mr-2 cursor-pointer transition-[background-image] duration-200 ease-in-out bg-no-repeat bg-center bg-[length:100%_100%] border-0 p-0"
                    style={{ backgroundImage: `url(${rightBtn})` }}
                    onMouseEnter={() => setIsRightHovered(true)}
                    onMouseLeave={() => setIsRightHovered(false)}
                    onClick={() => handleNavigation('right')}
                />
            </div>
        ) : null
    );
};

export default MobileBanner;