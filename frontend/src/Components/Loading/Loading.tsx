import React from "react";
//loading girando com fundo borrado usando styled components
import { Container, Spinner } from "./style.tsx";

export const Loading: React.FC = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};