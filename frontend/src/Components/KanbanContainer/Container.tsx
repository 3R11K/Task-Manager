import React, { useState } from "react";
import { ContainerWrapper, Title, AddButton } from "./style.tsx";
import TaskCard from "../TaskCard/TaskCard.tsx";

const Container = ({ title, tasks, bgColor, onAddTask }) => {
  return (
    <ContainerWrapper bgColor={bgColor}>
      <Title>{title}</Title>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      {onAddTask && title === "To Do" && (
        <AddButton onClick={onAddTask}>+ Add Task</AddButton>
      )}
    </ContainerWrapper>
  );
};


export default Container;