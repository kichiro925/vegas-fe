import React, { createContext, useState } from "react";
import axios from "../utils/Axios";
import { toast, Slide } from 'react-toastify';
import { store } from "../store";
import { Logout } from "../store/reducers/auth";

const APIContext = createContext(null);

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// Add request interceptor to set headers before each request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const authToken = store.getState().auth.token;
    config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
        'admin': true,
        'token': token,
        'authorization': authToken
    };

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;
        if (response && response.status === 400) {
            const msg = `${response.data}`;
            toast.error(msg, {
                position: "top-right",
                transition: Slide,
                hideProgressBar: true,
                autoClose: 5000,
                style: { zIndex: 999999 }
            });
        } else if (response && response.status === 401) {
            store.dispatch(Logout({}));
        } else if (response && response.status === 429) {
            toast.error(response.data, {
                position: "top-right",
                transition: Slide,
                hideProgressBar: true,
                autoClose: 5000,
                style: { zIndex: 999999 }
            });
        } else {
            console.log(response);
        }
        // return Promise.reject(error);
    }
);

export const ApiProvider = ({ children }) => {

    const getGameList = async (provider, page, pageSize, filter = "") => {
        const res = await api.post(`api/v2/casinos/get-gamelists`, {
            provider,
            page,
            pageSize,
            filter,
        });
        return res;
    }

    const triggerGame = async (PlayerId, GameId, aggregator) => {
        const res = await api.post(`api/v2/casinos/createSession`, {
            PlayerId,
            GameId,
            aggregator
        });
        return res;
    }

    const openDemo = async (BankGroupId, GameId) => {

        const res = await api.post(`api/v2/casinos/create-demo`, {
            BankGroupId,
            GameId,
        });
        return res;
    }

    const closeGame = async (SessionId) => {
        const res = await api.post(`api/v2/casinos/closeSession`, {
            SessionId
        });
    }

    const login = async (email, password) => {
        const data = await api.post(`api/v2/users/signin`, {
            email,
            password,
        });
        return data;
    };

    const logout = async (userId) => {
        const res = await api.post(`api/v2/users/logout`, {
            userId
        });
        return res;
    }

    const getInfo = async (userId) => {
        const res = await api.post(`api/v2/users/info`, {
            userId,
            update: false
        });
        return res;
    }

    const getProviders = async () => {
        const res = await api.post(`api/v2/casinos/get-providers`);
        return res;
    }

    const getJackpot = async () => {
        const res = await api.post(`api/v2/jackpot/getJackpot`, {
            userId: store.getState().auth.user._id
        });
        return res;
    }

    const spinJackpot = async (userId) => {
        const res = await api.post(`api/v2/jackpot/spinJackpot`, {
            userId
        });
        return res;
    }

    const getJackpotNumber = async (userId) => {
        const res = await api.post(`api/v2/jackpot/getJackpotNumber`, {
            userId
        });
        return res;
    }

    const getFavoriteGame = async (userId) => {
        const res = await api.post(`api/v2/casinos/get-favorite-game`, {
            userId
        });
        return res;
    }

    const changePassword = async (params) => {
        const res = await api.post(`api/v2/users/c-password`, params);
        return res;
    }

    const changeEmail = async (params) => {
        const res = await api.post(`api/v2/users/c-email`, params);
        return res;
    }

    return (
        <APIContext.Provider
            value={{
                getGameList,
                triggerGame,
                closeGame,
                openDemo,
                login,
                logout,
                getInfo,
                getProviders,
                getJackpot,
                getFavoriteGame,
                changePassword,
                changeEmail,
                spinJackpot,
                getJackpotNumber
            }}
        >
            {children}
        </APIContext.Provider>
    );
};

export default APIContext;