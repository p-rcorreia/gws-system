<template>
    <q-page padding>
      <h1 class="q-mb-md">Lista de Empresas</h1>

      <q-table 
        :rows="empresas"
        :colums="colunas"
        row-key="id"
        :pagination="pagination"
        v-if="empresas.length > 0"
      />
    </q-page>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import api from '../axiosEmpresas';

  // 'empresas' vai armazenar os dados das empresas
  const empresas = ref<{ nome: string; cnpj: string; razaoSocial: string }[]>([]);
  
  // 'paginaAtual' controla a página da tabela que estamos visualizando
  const pagination = ref({
    page: 0, // Primeira página que o DB  gera
    rowsPerPage: 10, // Quantidade de itens por página
    rowsNumber: 0 // Número total de itens (será atualizado após a requisição)
  });

  // Definição das colunas da tabela
  const colunas = [
    { name: 'nome', label: 'Nome', align: 'left', field: 'nome'},
    { name: 'cnpj', label: 'CNPJ', align: 'left', field: 'cnpj' },
    { name: 'razaoSocial', label: 'Razão Social', align: 'left', field: 'razaoSocial' }
  ];

  function carregarEmpresas() {
    // Fazemos uma requisição para a API, passando a página e o número de itens por página
    api.get('/listar-paginas', {
      params: {
        page: pagination.value.page,
        size: pagination.value.rowsPerPage
      }
    })
    .then(response => {
      console.log(response.data.data)
      empresas.value = response.data.data.content;  // Atualiza a lista de empresas
      pagination.value.rowsNumber = response.data.data.totalElements;  // Atualiza o número total de empresas (precisa que a API envie isso)
    })
    .catch(error => {
      console.error('Erro ao carregar empresas:', error);  // Caso haja erro na requisição
    });
  }

  // Quando a página ou o número de itens por página mudar, recarrega as empresas
  watch(() => pagination.value.page, carregarEmpresas);
  watch(() => pagination.value.rowsPerPage, carregarEmpresas);

  // Chamamos a função assim que o componente é montado
  onMounted(() => carregarEmpresas());  
  </script>
  
  <style scoped>
  .q-page {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
  }
  </style>