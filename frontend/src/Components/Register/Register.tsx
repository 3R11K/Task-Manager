import React, { useState } from "react";
import { RegContainer, PageContainer } from "./style.tsx";
import { useAuth } from "../../Context/AuthContext.tsx"; // Certifique-se de ajustar o caminho conforme necessário
import { Loading } from "../../Components/Loading/Loading.tsx";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, name }),
                credentials: "include", // Inclui cookies na requisição
            });            
    
            if (response.ok) {
                console.log("Registered successful!");
                window.location.href = "/login"; 
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
            <RegContainer>
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
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    
                    <button type="submit">Register</button>
                </form>
            </RegContainer>
            {loading && <Loading />}
        </PageContainer>
    );
};

export default Register;
