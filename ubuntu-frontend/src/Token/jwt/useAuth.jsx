import { useContext } from 'react';
import  AuthContext  from '../auth/AuthProvider';

const UseAuth = () => {
    return useContext(AuthContext);
};

export default UseAuth;
