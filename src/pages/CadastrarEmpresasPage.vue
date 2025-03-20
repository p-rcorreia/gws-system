<template>
  <q-page padding>
    <q-banner class="bg-primary text-white q-mb-md" rounded>
      <template v-slot:avatar>
        <q-icon name="business" size="xl" />
      </template>
      <div class="text-h3 q-mb-xs">Cadastro de Empresa</div>
      <div class="text-subtitle2">Preencha os dados da empresa para cadastrá-la no sistema</div>
    </q-banner>

    <q-form @submit.prevent="enviarFormulario">
      <q-input
        v-model="nome"
        label="Nome"
        autofocus
        :rules="[val => val && val.length > 0 || 'Campo obrigatório']"
        class="q-mb-md"
      />

      <q-input
        v-model="cnpj"
        label="CNPJ"
        mask="##.###.###/####-##"
        :rules="[val => val && val.length > 0 || 'Campo obrigatório']"
        class="q-mb-md"
      />

      <q-input
        v-model="razaoSocial"
        label="Razão Social"
        :rules="[val => val && val.length > 0 || 'Campo obrigatório']"
        class="q-mb-md"
      />

      <q-btn label="Cadastrar Empresa" color="primary" type="submit" class="full-width" />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import api from '../axiosEmpresas';

  const nome = ref('');
  const cnpj = ref('');
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
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }

  /* Estilização do banner */
  .q-banner {
    display: flex;
    align-items: center;
    padding: 24px;
    border-radius: 12px;
  }

  .q-banner .text-h3 {
    font-weight: bold;
    letter-spacing: 1px;
  }

  .q-banner .text-subtitle2 {
    margin-top: 4px;
    opacity: 0.9;
  }

  /* Estilo para inputs */
  .q-input {
    width: 100%;
  }

  /* Estilização do botão */
  .q-btn {
    width: 100%;
    margin-top: 10px;
  }
</style>
