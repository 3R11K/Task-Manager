import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

export const CardTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 8px;
`;

export const CardDescription = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
`;
