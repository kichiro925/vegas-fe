import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import PreLoader from '../components/PreLoader';

const AuthGuard = lazy(() => import("../utils/AuthGuard"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Error = lazy(() => import("../pages/Error"));
const Maintain = lazy(() => import("../pages/Maintainence"));

const AppRoutes = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    return (
        <Routes>
            <Route path="/error" element={
                <Suspense fallback={<PreLoader />}>
                    <Error />
                </Suspense>
            } />

            <Route path="/login" element={
                isLoggedIn ? <Navigate to="/" /> : (
                    // <Maintain />
                    <Login />
                )
            } />

            <Route path="/" element={
                <AuthGuard>
                    <Suspense fallback={<PreLoader />}>
                        {/* <Maintain /> */}
                        <Home />
                    </Suspense>
                </AuthGuard>
            } />

        </Routes>
    );
};

export default AppRoutes;
