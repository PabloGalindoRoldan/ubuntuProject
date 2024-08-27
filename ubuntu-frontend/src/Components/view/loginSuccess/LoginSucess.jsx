import { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../../token/auth/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function LoginSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (token) {
            setToken(token);
            setLoading(false); 
        }
    }, [location, setToken]);

    useEffect(() => {
        if (!loading) {
            navigate('/admin/dashboard');
        }
    }, [loading, navigate]);

    if (loading) {
        return (
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return null;
}

export default LoginSuccess;