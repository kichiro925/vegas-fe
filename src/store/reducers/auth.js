import { createSlice } from '@reduxjs/toolkit';

const initialUser = {
    _id: '',
    email: '',
    username: '',
    iReferral: '',
    balance: 0,
    bonus: 0,
    wagerBonus: 0,
    name: '',
    avatar: '',
    level: 0,
    luckyNumber: [],
    spunNumber: [],
    jackpotWin: 0
};

const initialState = {
    isInitialized: false,
    isLoggedIn: false,
    token: '',
    user: initialUser
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        Login(state, action) {
            const { user, session } = action.payload;
            state.user = user;
            state.token = session.accessToken;
            state.isLoggedIn = true;
            state.isInitialized = true;
        },

        UpdateInfo(state, action) {
            state.user = action.payload;
        },

        UpdateEmail(state, action) {
            state.user.email = action.payload;
        },

        UpdateBalance(state, action) {
            state.user.balance = action.payload;
        },

        UpdateBonus(state, action) {
            state.user.bonus = action.payload;
        },

        UpdateLuckyNumber(state, action) {
            state.user.luckyNumber = action.payload;
        },

        UpdateSpunNumber(state, action) {
            state.user.spunNumber = action.payload;
        },

        UpdateJackpotWin(state, action) {
            state.user.jackpotWin = action.payload;
        },

        UpdateLevel(state, action) {
            state.user.level = action.payload;
        },

        Logout(state, action) {
            state.token = '';
            state.user = initialUser;
            state.isLoggedIn = false;
            state.isInitialized = true;
            state = { ...state };
        }
    }
});

export const { Login, Logout, UpdateInfo, UpdateBalance, UpdateBonus, UpdateEmail, UpdateLuckyNumber, UpdateSpunNumber, UpdateJackpotWin, UpdateLevel } = auth.actions;
export default auth.reducer;

