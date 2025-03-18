import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/empresas', // Coloque a URL base da sua API
  timeout: 10000, // Tempo limite para requisição (em ms)
});

export default instance;