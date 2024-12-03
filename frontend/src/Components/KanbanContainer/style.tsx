import styled from "styled-components";

interface ContainerWrapperProps {
  bgColor: string;
}

export const ContainerWrapper = styled.div<ContainerWrapperProps>`
  background-color: ${(props) => props.bgColor};
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h3`
  margin-bottom: 16px;
  font-size: 1.2rem;
`;

export const AddButton = styled.button`
  margin-top: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;

  &:hover {
    background-color: #45a049;
  }
`;
