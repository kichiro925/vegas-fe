import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isBonusModal: false,
    isLevelModal: false,
    isSettingModal: false,
    isHelpModal: false,
    isReferral: false,
    isProfile: true,
    isPswChange: false,
    isLayout: false,

    isFavorite: false,
    isJackPot: false,
    isJackPotInfo: false,
    isJackPotResult: false,
    isVirtualKeyboard: false,
};

const modal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setIsBonusModal(state, action) {
            state.isBonusModal = action.payload;
        },
        setIsLevelModal(state, action) {
            state.isLevelModal = action.payload;
        },
        setIsSettingModal(state, action) {
            state.isSettingModal = action.payload;
        },
        setIsHelpModal(state, action) {
            state.isHelpModal = action.payload;
        },
        setIsReferral(state, action) {
            state.isReferral = action.payload;
        },
        setIsProfile(state, action) {
            state.isProfile = action.payload;
        },
        setIsPswChange(state, action) {
            state.isPswChange = action.payload;
        },
        setIsFavorite(state, action) {
            state.isFavorite = action.payload;
        },
        setIsJackPot(state, action) {
            state.isJackPot = action.payload;
        },
        setIsJackPotInfo(state, action) {
            state.isJackPotInfo = action.payload;
        },
        setIsJackPotResult(state, action) {
            state.isJackPotResult = action.payload;
        },
        setIsVirtualKeyboard(state, action) {
            state.isVirtualKeyboard = action.payload;
        },
        setIsLayout(state, action) {
            state.isLayout = action.payload;
        }
    },
});

export const { setIsBonusModal, setIsLevelModal, setIsSettingModal, setIsReferral, setIsProfile, setIsPswChange, setIsHelpModal, setIsFavorite, setIsJackPot, setIsJackPotInfo, setIsJackPotResult, setIsVirtualKeyboard, setIsLayout } = modal.actions;
export default modal.reducer;
