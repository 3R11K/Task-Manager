import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Filters = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
  select {
    padding: 5px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.thead`
  background-color: #f4f4f4;
  th {
    padding: 8px; /* Reduzimos o padding para diminuir a altura */
    border: 1px solid #ddd;
    text-align: center; /* Centraliza o conteúdo do cabeçalho */
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableCell = styled.td`
  padding: 4px;
  border: 1px solid #ddd;
  text-align: center; /* Centraliza o texto em todas as células */
  vertical-align: middle; /* Centraliza verticalmente */

  /* Define largura específica para a coluna Description */
  &:nth-child(3) {
  width: 150px;
  max-width: 150px;
  padding: 0; /* Remova o padding da célula */
  border: 0.5px solid #ddd;

  /* Adiciona rolagem em um contêiner interno */
  div {
    max-height: 75px; /* Limita a altura máxima a 150px */
    padding: 4px;
    height: auto; /* Permite que a altura aumente até 150px */
    overflow-y: auto; /* Ativa a rolagem quando o conteúdo excede */
    overflow-x: hidden; /* Opcional, para evitar rolagem horizontal */
    white-space: pre-wrap;
    word-wrap: break-word;
    box-sizing: border-box; /* Garante que o padding não estoure o limite */
  }
}

  &:nth-child(1) {
    width: 7.5%; /* Ajuste conforme necessário */
  }

  /* Define largura menor para a coluna Reviewer */
  &:nth-child(3) {
    width: 7.5%; /* Ajuste conforme necessário */
  }

  /* Define largura menor para a coluna Assignee */
  &:nth-child(4) {
    width: 7.5%; /* Ajuste conforme necessário */
  }

  /* Define largura menor para a coluna Status */
  &:nth-child(6) {
    width: 10%; /* Ajuste conforme necessário */
  }
`;


const StoryContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #333;
  }

  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const DetailBox = styled.div`
  background-color: #f4f4f4;
  padding: 15px; /* Um pouco mais de espaço interno */
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center; /* Garante centralização do texto */
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centraliza verticalmente */
  align-items: center; /* Centraliza horizontalmente */
  height: 100%; /* Garante que o elemento use a altura total disponível */

  strong {
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  span, a {
    font-size: 13px;
    color: #555;
  }

  a {
    text-decoration: none;
    color: #007bff;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const AddTaskButton = styled.button`
  margin-left: auto;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  height: 60px;
  width: 60px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bolder;

  &:hover {
    background-color: #3e3e3e;
  }
`;

const ContainerFilters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;


export { Container, Filters, Table, TableHeader, TableRow, TableCell, StoryContainer, DetailBox, AddTaskButton, ContainerFilters };

