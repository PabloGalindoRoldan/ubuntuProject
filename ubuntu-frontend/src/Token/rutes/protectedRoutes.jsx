import { Navigate } from 'react-router-dom';
import UseAuth from '../jwt/UseAuth';

const ProtectedRoute = ({ element, roles }) => {
    const { user } = UseAuth();

    if (!user) {
        return <Navigate to="/acceder" replace />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return element;
};

export default ProtectedRoute;
