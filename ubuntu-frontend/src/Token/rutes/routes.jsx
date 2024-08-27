import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import LandingPage from '../../components/view/landing/LandingPage';
import Login from '../../components/view/login/Login';
import ViewMicroEmprendimientos from '../../components/view/microEmprendimientos/ViewMicroEmprendimientos';
import ViewPublicaciones from '../../components/view/publicaciones/ViewPublicaciones';

const Routes = () => {
    const { token } = useAuth();

    const routesForPublic = [
        { path: "/home", element: <LandingPage /> },
        { path: "/login", element: <Login /> },
        { path: "/microemprendimientos", element: <ViewMicroEmprendimientos /> },
        { path: "/publicaciones", element: <ViewPublicaciones /> },
    ];

    const routesForAdmins = [
        { path: "/admin", element: <ProtectedRoute component={"admincomp"} roles={['ADMIN']} /> },
    ];

    const router = createBrowserRouter([
        ...routesForPublic,
        ...(token ? routesForAdmins : []),
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;
