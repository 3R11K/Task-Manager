import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextProps {
    user_id: string;
    name: string;
    email: string;
    group: string;
    isAuthenticated: boolean;
    loading: boolean; // Novo estado de loading
    setAuthToken: (logged: boolean) => void;
    logout: () => void;
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
    const [group, setGroup] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento

    useEffect(() => {
        const token = Cookies.get('access_token');
        console.log('Token:', token);

        if (token) {
            try {
                //{"user_id": 2,"name": "1","email": "teste1@gmail.com","group": "grupo teste","exp": 1732737525}
                const decoded = decodeJwt(token);
                console.log('Decoded:', decoded);
                setName(decoded.name);
                setGroup(decoded.group);
                setEmail(decoded.email);
                setUser_id(decoded.user_id);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Invalid JWT:', error);
                Cookies.remove('access_token');
                setIsAuthenticated(false); // Caso o token seja inválido
            }
        } else {
            setIsAuthenticated(false); // Caso o token não exista
        }

        setLoading(false); // Define como false após verificar o token
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
        setGroup('');
        setEmail('');
        setUser_id('');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user_id,name, email, group, isAuthenticated, loading, setAuthToken, logout }}>
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
