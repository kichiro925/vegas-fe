import React, { useEffect, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { ApiProvider } from './context/ApiContext';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";
import { Logout, UpdateInfo } from './store/reducers/auth';
import { authenticateSockets } from './utils/socket';
import PreLoader from './components/PreLoader';
import useApi from './hooks/useApi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppContent() {
  const dispatch = useDispatch();
  const { getInfo } = useApi();
  const { user, isLoggedIn, token } = useSelector((store) => store.auth)

  const getUserInfo = async () => {
    try {
      const response = await getInfo(user._id);
      if (response.data) {
        dispatch(UpdateInfo(response.data))
      }
    } catch (err) {
      console.log(err, "err")
    }
  }

  useEffect(() => {
    let socket = io(`${process.env.REACT_APP_API_URL}`);
    if (isLoggedIn) {
      socket = io(`${process.env.REACT_APP_API_URL}`, { query: { auth: token } });
      authenticateSockets(user._id);
      socket.on("logout", () => {
        dispatch(Logout({}));
      });
      socket.on("reload", () => {
        window.location.reload();
      });
      socket.on("balance", (data) => {
        if (!isLoggedIn) return;
        if (data.balance !== user.balance) {
          // dispatch(UpdateBalance(data.balance));
          getUserInfo();
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("logout");
        socket.off("reload");
        socket.off("balance");
      }
    };
  }, [token, isLoggedIn, user, dispatch]);

  return <AppRoutes />;
}

function App() {
  const { isLoggedIn } = useSelector((store) => store.auth);
  console.log(isLoggedIn, "isLoggedIn")
  return (
    <BrowserRouter>
      <Suspense fallback={isLoggedIn ? <PreLoader /> : null}>
        <ApiProvider>
          <AppContent />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </ApiProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
