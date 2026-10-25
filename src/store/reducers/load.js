import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFirstLoad: true,
    loading: false,
    isGameLoading: false,
};

const load = createSlice({
    name: 'load',
    initialState,
    reducers: {
        setIsFirstLoad(state, action) {
            state.isFirstLoad = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setIsGameLoading(state, action) {
            state.isGameLoading = action.payload;
        },
    },
});

export const { setIsFirstLoad, setLoading, setIsGameLoading } = load.actions;
export default load.reducer;
