import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DropContainer from "../DropContainer/DropContainer.tsx";
import AddTaskModal from "../AddTaskModal/AddTaskModal.tsx";

const DndWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

interface Task {
  data: object;
  name: string;
  status: string;
  id: number;
}

const DndContainer = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

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
      let keys = Object.keys(data.tasks[0]);

      console.log("Keys:", keys);

      // Atualizar o estado com as tasks recebidas
      const formattedTasks: Task[] = []

      for (let i = 0; i < data.tasks.length; i++) {
        formattedTasks.push({
          data: data.tasks[i],
          name: data.tasks[i].name,
          status: data.tasks[i].status.toLowerCase(),
          id: Math.random()
        })
      }
    

      console.log("status:",data.tasks[0].status)

      setTasks(formattedTasks);
    } catch (error) {
      console.error("Erro ao buscar tasks:", error);
    }
  };

  useEffect(() => {
    getTasks();
    console.log("Tasks:", tasks);
  }, []); 

  const handleDrop = (task: Task, newStatus: string) => {
    console.log("Task sendo movida:", task);
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
    );
  };

  const handleAddTask = (newTask: Task) => {
    if (!newTask) {
      console.error("Tentativa de adicionar uma task inválida:", newTask);
      return;
    }
    setTasks((prev) => [...prev, newTask]);
  };

  const columns = [
    { id: "to do", title: "To Do", bgColor: "#fef3c7" },
    { id: "doing", title: "Doing", bgColor: "#c7d2fe" },
    { id: "reviewing", title: "Reviewing", bgColor: "#c7f7e5" },
    { id: "done", title: "Done", bgColor: "#d1fae5" },
  ];

  return (
    <>
      <DndWrapper>
        {columns.map((column) => (
          <DropContainer
            key={column.id}
            column={column}
            tasks={tasks.filter((task) => task.status === column.id)}
            handleDrop={handleDrop}
            onAddTask={column.id === "to do" ? () => setModalOpen(true) : null}
          />
        ))}
      </DndWrapper>
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddTask}
      />
    </>
  );
};

export default DndContainer;
