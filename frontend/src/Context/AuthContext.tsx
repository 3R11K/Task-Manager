import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextProps {
    user_id: string;
    name: string;
    email: string;
    group: string;
    isAuthenticated: boolean;
    loading: boolean;
    setAuthToken: (logged: boolean) => void;
    logout: () => void;
    setNewGroup: (group: string) => void; // Add setGroup to the context interface
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const decodeJwt = (token: string) => {
    const payload = token.split('.')[1];
    let base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4;
    if (padding) {
        base64 += '='.repeat(4 - padding);
    }
    const decoded = JSON.parse(atob(base64));
    return decoded;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user_id, setUser_id] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [group, setGroupState] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = Cookies.get('access_token');
        console.log('Token:', token);

        if (token) {
            try {
                const decoded = decodeJwt(token);
                console.log('Decoded:', decoded);
                setName(decoded.name);
                setGroupState(decoded.group);
                setEmail(decoded.email);
                setUser_id(decoded.user_id);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Invalid JWT:', error);
                Cookies.remove('access_token');
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }

        setLoading(false);
    }, []);

    const setAuthToken = (logged) => {
        if (logged) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        Cookies.remove('access_token');
        setName('');
        setGroupState('');
        setEmail('');
        setUser_id('');
        setIsAuthenticated(false);
    };

    const setNewGroup = (group: string) => {
        setGroupState(group);
    };

    return (
        <AuthContext.Provider value={{ user_id, name, email, group, isAuthenticated, loading, setAuthToken, logout, setNewGroup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
