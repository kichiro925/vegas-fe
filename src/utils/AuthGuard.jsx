import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthGuard = ({ children }) => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    if (isLoggedIn === undefined) {
        // Optional: show loading spinner or return null if auth state is not ready
        return null;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AuthGuard;