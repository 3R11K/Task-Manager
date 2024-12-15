import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext.tsx';
import { Loading } from '../Components/Loading/Loading.tsx';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, loading, group } = useAuth();
    const location = useLocation();

    // Enquanto estiver verificando o token (loading), exiba uma tela de carregamento
    if (loading) {
        return <Loading />;
    }

    if (isAuthenticated) {
        if (!group && location.pathname !== '/set-group') {
            return <Navigate to="/set-group" />;
        }
        return <Outlet />;
    }

    return <Navigate to="/login" />;
};

export default ProtectedRoute;
