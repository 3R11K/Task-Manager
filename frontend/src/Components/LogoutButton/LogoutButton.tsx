import React from 'react';
import { useAuth } from '../../Context/AuthContext.tsx'; // Importa o contexto de autenticação
import { useNavigate } from 'react-router-dom'; // Para redirecionar o usuário após o logout

const Logout: React.FC = () => {
    const { logout } = useAuth(); // Acessa a função de logout do contexto
    const navigate = useNavigate(); // Usado para redirecionar o usuário após o logout

    const handleLogout = () => {
        logout(); // Chama a função de logout que limpa o token e o estado
        navigate('/login'); // Redireciona o usuário para a página de login
    };

    return (
        <div>
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
};

export default Logout;
