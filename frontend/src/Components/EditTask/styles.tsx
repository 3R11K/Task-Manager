import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  width: 600px; /* Aumentado para acomodar melhor as colunas */
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalContent = styled.div`
  padding: 20px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;

  h2 {
    margin: 0;
  }

  button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Três colunas de tamanho igual */
  gap: 20px;
  margin: 20px 0;

  label {
    display: flex;
    flex-direction: column;

    input,
    textarea,
    select {
      margin-top: 5px;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 100%;
    }
  }

  /* Especificação de layout para cada campo */
  label:nth-child(1) { grid-column: span 1; } /* Name */
  label:nth-child(2) { grid-column: span 1; } /* Description */
  label:nth-child(3) { grid-column: span 1; } /* To Do */
  label:nth-child(4) { grid-column: span 1; } /* Assignee */
  label:nth-child(5) { grid-column: span 1; } /* Reviewer */
  label:nth-child(6) { grid-column: span 1; } /* Size */
  label:nth-child(7) { grid-column: span 2; } /* Story */
  label:nth-child(8) { grid-column: span 1; } /* Due Date */
  label:nth-child(9) { grid-column: span 1; } /* DoR */
  label:nth-child(10) { grid-column: span 1; } /* DoD */
  label:nth-child(11) { grid-column: span 3; } /* PR Link */

  .definition {
    width: 100%;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;

  button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:nth-child(1) {
      background-color: #007bff;
      color: white;
    }

    &:nth-child(2) {
      background-color: #ddd;
    }
  }
`;
