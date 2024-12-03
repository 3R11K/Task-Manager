import React, { useState } from "react";
import { LoginContainer, PageContainer } from "./styles";
import { useAuth } from "../../Context/AuthContext.tsx"; // Certifique-se de ajustar o caminho conforme necessário
import { Loading } from "../../Components/Loading/Loading.tsx";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthToken } = useAuth(); // Obtenha o método setAuthToken do contexto
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include", // Inclui cookies na requisição
            });            
    
            if (response.ok) {
                console.log("Login successful!");
                setAuthToken(true); // Atualiza o estado de autenticação
                window.location.href = "/"; 
            } else {
                const errorData = await response.json();
                console.error("Login failed:", errorData.message);
            }
        } catch (error) {
            console.error("There was an error logging in!", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer>
            <LoginContainer>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </LoginContainer>
            {loading && <Loading />}
        </PageContainer>
    );
};

export default Login;
