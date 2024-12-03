import React from "react";
import { useDrop } from "react-dnd";
import Container from "../KanbanContainer/Container.tsx";

const DropContainer = ({ column, tasks, handleDrop, onAddTask }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "TASK",
    drop: (item) => {
      if (!column?.id) {
        console.error("Column ID está ausente:", column);
        return;
      }
      handleDrop(item, column.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  if (!tasks || !column) return null;

  return (
    <div ref={dropRef} style={{ flex: 1, border: isOver ? "2px dashed #000" : "none" }}>
      <Container
        title={column.title}
        tasks={tasks}
        bgColor={column.bgColor}
        onAddTask={onAddTask} // Adiciona a propriedade aqui
      />
    </div>
  );
};


export default DropContainer;