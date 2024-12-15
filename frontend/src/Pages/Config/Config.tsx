import React, {useState,useEffect} from "react";
import { useAuth } from "../../Context/AuthContext.tsx";
import Header from "../../Components/Header/Header.tsx";
import {Loading} from "../../Components/Loading/Loading.tsx";
import { ToastContainer, toast } from "react-toastify"; // Importe o toast
import "react-toastify/dist/ReactToastify.css"; // Importe o estilo padrão do react-toastify

const ConfigPage: React.FC = () => {
    const { name, group } = useAuth();  
    const [loading, setLoading] = useState(false);

    const getConfigs = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/conf/get_conf", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (!response.ok) {
                setLoading(false); 
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            const data = await response.json();
            setLoading(false);
            notify("Configs recebidas com sucesso!", false);
            console.log("Configs recebidas:", data);
        } catch (error) {
            setLoading(false);
            console.error("Erro ao buscar configs:", error);
        }
    }

    useEffect(() => {
        getConfigs();
    }, []);

    const notify = (message, error) =>{
        if(error){
            toast.error(message);
        }else{
            toast.success(message);
        }
    }

    return (
        <div>
            <Header />
            <ToastContainer />
            <h1>Configurações</h1>
            {
                loading ? <Loading /> : null
            }
            <ToastContainer />
        </div>
    )
}

export default ConfigPage;