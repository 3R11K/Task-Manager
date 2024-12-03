import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Reset básico para eliminar inconsistências entre navegadores */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #fff;
    color: #333;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #000;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  p {
    margin-bottom: 1rem;
    color: #555;
    font-size: 1rem;
  }

  a {
    color: #000;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #007BFF;
  }

  button {
    display: inline-block;
    background-color: #000;
    color: #fff;
    font-size: 1rem;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #333;
  }

  input, textarea, select {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 1rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  input:focus, textarea:focus, select:focus {
    border-color: #007BFF;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
    outline: none;
  }

  form {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    display: block;
    border-radius: 10px;
  }

  footer {
    text-align: center;
    padding: 20px;
    background-color: #f8f8f8;
    font-size: 0.875rem;
    color: #555;
  }
`;

export default GlobalStyle;
