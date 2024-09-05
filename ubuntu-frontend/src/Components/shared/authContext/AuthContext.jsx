import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (response) => {
        setUser(response);
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, handleLoginSuccess, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);