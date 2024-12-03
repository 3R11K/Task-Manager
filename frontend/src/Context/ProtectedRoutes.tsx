import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext.tsx';
import { Loading } from '../Components/Loading/Loading.tsx';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, loading } = useAuth();

    // Enquanto estiver verificando o token (loading), exiba uma tela de carregamento
    if (loading) {
        return <Loading />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
