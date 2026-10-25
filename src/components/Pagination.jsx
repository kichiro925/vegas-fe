import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsTransitioning } from '../store/reducers/gameSlice';
import { fetchGameList } from '../helpers/fetchGameList';

import pagesphere from '../assets/img/themes/pagesphere.png';
import pagesphere_current from '../assets/img/themes/pagesphere_current.png';
import useApi from '../hooks/useApi';
import slideSound from '../assets/sounds/themes/vegasxwinter/slide.mp3';

function getPagination(currentPage, totalPages, maxLength = 15) {
    const half = Math.floor(maxLength / 2);
    
    let start = Math.max(1, currentPage - half);
    let end = start + maxLength - 1;

    if (end > totalPages) {
        end = totalPages;
        start = Math.max(1, end - maxLength + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const Pagination = () => {
    const currentPage = useSelector(state => state.games.currentPage);
    const totalPages = useSelector(state => state.games.totalPages);
    const isTransitioning = useSelector(state => state.games.isTransitioning);
    const dispatch = useDispatch();
    const gameList = useSelector(state => state.games.gameList);
    const Api = useApi();
    const provider = useSelector(state => state.games.provider);
    const pageSize = useSelector(state => state.games.pageSize);
    
    const playSlideSound = () => {
        const audio = new Audio(slideSound);
        audio.play();
    }
    
    const handleNavigation = async (newPage) => {
        if (isTransitioning) return;

        dispatch(setIsTransitioning(true));
        playSlideSound();

        await fetchGameList({
            Api,
            provider,
            page: newPage,
            pageSize,
            dispatch,
            gameList,
        });
    };
    
    return (
        <div className={`flex mh-pagination mha-pagination-pb h-[2.5rem] w-full gap-[2%] justify-center items-center px-[2.8%] pb-[3%] ${totalPages > 1 ? 'block' : 'hidden'}`}>
            {getPagination(currentPage, totalPages).map((page, index) => (
                <button key={index} className="flex mh-pagination-btn mha-pagination-btn-p mha-pagination-fontSize justify-center items-center w-[5.5%] p-1 lg:p-[0.3rem] text-white font-['Impact'] md:text-[13px] lg:text-[15px] screen-3:text-[16px] screen-2:text-[20px] cursor-pointer" style={{ backgroundImage: `url(${currentPage === page ? pagesphere_current : pagesphere})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
                    onClick={() => handleNavigation(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;