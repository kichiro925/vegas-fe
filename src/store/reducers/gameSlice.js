import { createSlice } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();

const initialState = {
    gameList: [],
    mobileGameList: [],
    provider: '',
    gameUrl: '',
    pageSize: 8,
    currentPage: 1,
    mobileCurrentPage: 1,
    totalPages: 0,
    error: null,
    gamePlayed: false,
    gameSession: '',
    isTransitioning: false,
    viewPoint: 0,
    cols: 4,
    rows: 2,
    galleryGapH: 0,
    galleryGapW: 0,
};

const gameSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setGameList: (state, action) => {
            state.gameList = action.payload;
        },
        setMobileGameList: (state, action) => {
            state.mobileGameList = action.payload;
        },
        setProvider: (state, action) => {
            state.provider = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setGamePlayed: (state, action) => {
            state.gamePlayed = action.payload;
        },
        setGameUrl: (state, action) => {
            state.gameUrl = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setMobileCurrentPage: (state, action) => {
            state.mobileCurrentPage = action.payload;
        },
        setGameSession: (state, action) => {
            state.gameSession = action.payload;
        },
        setIsTransitioning: (state, action) => {
            state.isTransitioning = action.payload;
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload;
        },
        setViewPoint: (state, action) => {
            state.viewPoint = action.payload;
        },
        setCols: (state, action) => {
            state.cols = action.payload;
        },
        setRows: (state, action) => {
            state.rows = action.payload;
        },
        setGalleryGapH: (state, action) => {
            state.galleryGapH = action.payload;
        },
        setGalleryGapW: (state, action) => {
            state.galleryGapW = action.payload;
        },
    },
});

export const {
    setGameList,
    setMobileGameList,
    setProvider,
    setPageSize,
    setError,
    setGamePlayed,
    setGameUrl,
    setGameSession,
    setCurrentPage,
    setMobileCurrentPage,
    setIsTransitioning,
    setTotalPages,
    setViewPoint,
    setCols,
    setRows,
    setGalleryGapH,
    setGalleryGapW,
} = gameSlice.actions;
export default gameSlice.reducer; 