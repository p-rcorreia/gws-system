<template>
  <q-page padding>
    <h1 class="q-mb-md">Cadastro de Empresa</h1>

    <q-form @submit.prevent="enviarFormulario">
      
      <q-input
      v-model="nome"
      label="Nome"
      autofocus
      :rules="[val => val && val.length > 0 || 'Campo obrigatório']"/>

      <q-input
      v-model="cnpj"
      label="CNPJ"
      mask="##.###.###/####-##"
      :rules="[val => val && val.length > 0 || 'Campo obrigatório']"/>

      <q-input
      v-model="razaoSocial"
      label="Razão Social"
      :rules="[val => val && val.length > 0 || 'Campo obrigatório']"/>

      <q-btn label="Cadastrar Empresa" color="primary" type="submit" style="margin-top: 10px;" />
    </q-form>

  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import api from '../axiosEmpresas';

  const nome = ref('');
  const cnpj = ref( );
  const razaoSocial = ref('');

  function enviarFormulario() {
    const empresaObj = {
      nome: nome.value,
      cnpj: cnpj.value,
      razaoSocial: razaoSocial.value
    }

    // Faz a requisição POST para a URL base configurada no axiosEmpresas.js
    api.post('', empresaObj) // O '' faz referência ao endpoint base '/api/empresas'
      .then(response => {
        console.log('Resposta da API:', response.data);
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });
  }
</script>

<style scoped>
  .q-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
  }

  .q-input {
    width: 100%;
  }

  .q-btn {
    width: 100%;
  }
</style>