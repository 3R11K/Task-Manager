import React from "react";
import { useAuth } from "../../Context/AuthContext.tsx";
import Logout from "../../Components/LogoutButton/LogoutButton.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DndContainer from "../../Components/DndWrapper/DndWrapper.tsx";

const Kanban: React.FC = () => {
  const { name, group } = useAuth();

  return (
    <div>
      <Logout />
      <DndProvider backend={HTML5Backend}>
        <DndContainer />
      </DndProvider>
    </div>
  );
};

export default Kanban;
