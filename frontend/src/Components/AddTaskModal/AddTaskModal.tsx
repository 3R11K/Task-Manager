import React, { useState } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
`;

const Button = styled.button`
  margin-top: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
const AddTaskModal = ({ isOpen, onClose, onAdd }) => {
    const [taskTitle, setTaskTitle] = useState("");
  
    if (!isOpen) return null;
  
    const handleSubmit = () => {
      if (!onAdd || typeof onAdd !== "function") {
        console.error("onAdd não é uma função válida!");
        return;
      }
      if (taskTitle.trim()) {
        onAdd({ id: Date.now(), title: taskTitle, status: "to-do" });
        setTaskTitle("");
        onClose?.(); // Uso de `?.` para segurança
      }
    };
  
    return (
      <ModalWrapper>
        <ModalContent>
          <h2>Add New Task</h2>
          <input
            type="text"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "16px" }}
          />
          <Button onClick={handleSubmit}>Add Task</Button>
          <Button onClick={onClose} style={{ backgroundColor: "#f44336" }}>
            Cancel
          </Button>
        </ModalContent>
      </ModalWrapper>
    );
};

export default AddTaskModal;
  