//crie um header react com botões logout, home, kanban e configurações

import React from "react";
import { Link } from "react-router-dom";
import { useAuth, AuthProvider } from "../../Context/AuthContext.tsx";
import { HeaderWrapper, Button } from "./style.tsx";

const Header = () => {
    const { name, group, logout } = useAuth();


    return (
        <HeaderWrapper>
            <Link to="/">
                <Button>Home</Button>
            </Link>
            <Link to="/kanban">
                <Button>Kanban</Button>
            </Link>
            <Link to="/config">
                <Button>Configs</Button>
            </Link>
            <Link to="/">
                <Button onClick={logout}>Logout</Button>
            </Link>
        </HeaderWrapper>
        );
    };

export default Header;