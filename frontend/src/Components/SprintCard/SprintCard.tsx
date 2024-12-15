import React, { useEffect } from "react";
import { CardContainer, CardTitle, CardDescription } from "./style.tsx";

interface SprintCardProps {
  config_data: {
    id: string;
    sprint_name: string;
    sprint_description: string;
  };
}

const SprintCard: React.FC<SprintCardProps> = ({ config_data }) => {
  useEffect(() => {
    console.log("SprintCard component mounted");
    console.log(config_data);
  });

  return (
    <CardContainer>
      <CardTitle>{config_data.sprint_name}</CardTitle>
      <CardDescription>{config_data.sprint_description}</CardDescription>
    </CardContainer>
  );
};

export default SprintCard;
