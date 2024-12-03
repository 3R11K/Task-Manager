import React from "react";
import { useDrag } from "react-dnd";
import { CardWrapper } from "./styles.tsx";

const TaskCard = ({ task }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK",
    item: { id: task?.id || 0, status: task?.status || "to-do" }, // Valores padrão
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (!task) return null; // Adicionar verificação de segurança

  return (
    <CardWrapper ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {task.name}
    </CardWrapper>
  );
};

export default TaskCard;
