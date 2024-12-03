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
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
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
  padding: 10px;
  border: 1px solid #ddd;
`;

export { Container, Filters, Table, TableHeader, TableRow, TableCell };