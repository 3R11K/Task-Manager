import styled from "styled-components";

// Container principal, com borda e sombra
const SetGroupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const SquareContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 300px;
  background-color: #fff; /* Fundo branco */
  border-radius: 20px;
  border: 2px solid #000; /* Borda preta */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
  padding: 20px;
  position: relative; /* Define o contexto de posicionamento */
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  height: 40px;
  border-radius: 20px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  margin-bottom: 20px;
  border: 1px solid #484848;
`;

const ToggleSlider = styled.div<{ selected: boolean }>`
  position: absolute;
  width: 50%;
  height: 100%;
  border-radius: 20px;
  background-color: #000;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.selected ? "translateX(100%)" : "translateX(0)")};
`;

const Label = styled.span<{ selected: boolean }>`
  flex: 1;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  z-index: 1;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin: 5px 0;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  background-color: #f4f4f4;
  color: #000;

  &:focus {
    outline: 2px solid #007bff;
  }
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: 100%; /* Posiciona logo abaixo do input */
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
  z-index: 1000; /* Certifique-se de que aparece acima de outros elementos */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Adiciona sombra para destaque */
`;

export const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

// Certifique-se de que o contêiner principal seja posicionado relativamente.

export { SetGroupContainer, SquareContainer, ToggleContainer, ToggleSlider, Label, Input };