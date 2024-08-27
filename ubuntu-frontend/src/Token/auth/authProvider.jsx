import { createContext, useMemo, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(sessionStorage.getItem('token'));
    const [user, setUser] = useState(null);

    const setToken = (newToken) => {
        setToken_(newToken);
        if (newToken) {
            const decodedToken = jwtDecode(newToken);
            const userData = {
                username: decodedToken.sub,
                firstName: decodedToken.first_name || '',
                lastName: decodedToken.last_name || '',
                role: decodedToken.role || 'user',
                id: decodedToken.id,
            };
            setUser(userData);
        } else {
            setUser(null);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            sessionStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            sessionStorage.removeItem('token');
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
            token,
            user,
            setToken,
            logout,
        }),
        [token, user]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;