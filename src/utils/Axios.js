import axios from 'axios';
import { store } from '../store';
import { Logout } from '../store/reducers/auth';
// import toast from 'react-hot-toast';
// import { showMaintenance } from '../store/reducers/load';

const axiosServices = axios.create();

axiosServices.interceptors.request.use(
    (config) => {
        config.baseURL = process.env.REACT_APP_API_URL;
        const state = store.getState();
        const accessToken = state.auth.token;
        if (accessToken) {
            config.headers.authorization = accessToken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code && error.code === "ERR_NETWORK") {
            // store.dispatch(showMaintenance());
            return Promise.reject(error);
        }
        const { response } = error;
        if (response && response.status === 400) {
            // toast.error(response.data, 'error');
        } else if (response && response.status === 401) {
            store.dispatch(Logout({}));
        } else if (response && response.status === 413) {
            // toast.error(response.data, 'error');
        } else if (response && response.status === 429) {
            // toast.error(response.data, 'error');
        } else if (response && (response.status === 500 || response.status === 502)) {
            // store.dispatch(showMaintenance());
            return Promise.reject(error);
        }
        else {
            console.log(response);
        }
        return Promise.reject(error);
    }
);

export default axiosServices;
