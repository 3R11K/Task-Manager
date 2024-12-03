import React, {useState,useEffect} from "react";
import { useAuth } from "../../Context/AuthContext.tsx";
import Header from "../../Components/Header/Header.tsx";
import TaskList from "../../Components/TaskTable/TaskTable.tsx";
import {Loading} from "../../Components/Loading/Loading.tsx";
import { ToastContainer, toast } from "react-toastify"; // Importe o toast
import "react-toastify/dist/ReactToastify.css"; // Importe o estilo padrão do react-toastify

interface Task {
    data: object;
    name: string;
    status: string;
    id: number;
  }

const Home: React.FC = () => {
  const { name, group } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  }

  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Tasks recebidas:", data);

      // Verificar se o resultado é um array
      if (!Array.isArray(data.tasks)) {
        throw new Error("A resposta da API não é um array.");
      }
      // Atualizar o estado com as tasks recebidas
      const formattedTasks: Task[] = []

      for (let i = 0; i < data.tasks.length; i++) {
        formattedTasks.push({
          data: data.tasks[i],
          name: data.tasks[i].name,
          status: data.tasks[i].status,
          id: data.tasks[i].id,
        })
      }
    

      console.log("status:",data.tasks[0].status)

      setTasks(formattedTasks);
    } catch (error) {
      console.error("Erro ao buscar tasks:", error);
    }
  };

  const handleErrors = (message) => {
    toast.error(message);
  }

  const handleSuccess = (message) => {
    toast.success(message);
  }

  useEffect(() => {
    getTasks();
    console.log("Tasks:", tasks);
  }, []); 

  return (
    <div>
        <Header />
        <TaskList tasks={tasks}
          onError={handleErrors}
          onSuccess={handleSuccess}
          onTasksUpdate={(updatedTasks => setTasks(updatedTasks))}
          onLoading={handleLoading}/>
        {
            tasks.length === 0 && <Loading />
        }
        <ToastContainer />
        {
            loading && <Loading />
        }
    </div>
    
  );
};

export default Home;
