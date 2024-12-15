import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

export const AddSprintButton = styled.button`
    border: none;
    border-radius: 10px;
    padding: 10px;
    height: 50px;
    width: 200px;
    font-weight: bolder;
    margin-top: 10px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        background-color: #2d2d2d;
    }
    `;