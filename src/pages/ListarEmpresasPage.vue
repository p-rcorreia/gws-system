<template>
  <q-page padding>
    <q-banner class="bg-primary text-white q-mb-md" rounded>
      <template v-slot:avatar>
        <q-icon name="business" size="xl" />
      </template>
      <div class="text-h3 q-mb-xs">Lista de Empresas</div>
      <div class="text-subtitle2">Confira as empresas cadastradas no sistema</div>
    </q-banner>

    <!-- Listagem das Empresas -->
    <q-card v-for="(empresa, index) in empresas" :key="index" class="my-card q-mb-md">
      <q-card-section>
        <q-item>
          <q-item-section>
            <div class="text-h6 q-mb-xs">{{ empresa.nome }}</div>
            <div><strong>CNPJ:</strong> {{ empresa.cnpj }}</div>
            <div><strong>Razão Social:</strong> {{ empresa.razaoSocial }}</div>
          </q-item-section>
          <q-item-section side>
            <q-btn 
              color="negative"
              icon="delete"
              size="md"
              no-caps
              @click="excluirEmpresa(empresa)"
            />
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator />
    </q-card>

    <!-- Paginação -->
    <div class="pagination-wrapper">
      <!-- Contêiner para a paginação centralizada -->
      <div class="pagination-container">
        <q-pagination
          v-model="paginaAtual"
          :max="totalPaginas"
          :max-pages="5"
          boundary-numbers
          direction-links
          @update:model-value="carregarEmpresas"
          size="lg"
          dense
        />
      </div>

      <!-- Contêiner para o select alinhado à direita -->
      <div class="select-container">
        <q-select
          v-model="itensPorPagina"
          :options="[5, 10, 20, 50]"
          label="Itens por página"
          outlined
          dense
          class="itens-por-pagina"
          @update:model-value="carregarEmpresas"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../axiosEmpresas';

// 'empresas' vai armazenar os dados das empresas
const empresas = ref<{ id: number; nome: string; cnpj: string; razaoSocial: string }[]>([]);

const paginaAtual = ref(1); // Página inicial
const itensPorPagina = ref(10);
const totalPaginas = ref(1); // Total de páginas

function carregarEmpresas() {
  // Fazemos uma requisição para a API, passando a página e o número de itens por página
  api.get('/listar-paginas', {
    params: {
      page: paginaAtual.value - 1,
      size: itensPorPagina.value
    }
  })
  .then(response => {
    empresas.value = response.data.data.content;  // Atualiza a lista de empresas
    totalPaginas.value = response.data.data.totalPages;
  })
  .catch(error => {
    console.error('Erro ao carregar empresas:', error);  // Caso haja erro na requisição
  });
}

function excluirEmpresa(empresa: { id: number; nome: string }) {
  // Faz a requisição para excluir a empresa diretamente
  api.delete(`/${empresa.id}`)
    .then(() => {
      // Filtra a empresa excluída da lista
      empresas.value = empresas.value.filter(e => e.id !== empresa.id);
    })
    .catch(error => {
      // Caso ocorra algum erro, exibe a notificação de erro
      console.error('Erro ao excluir empresa:', error);
    });
}

// Chamamos a função assim que o componente é montado
onMounted(() => carregarEmpresas());
</script>

<style scoped>
/* Estrutura da página */
.q-page {
  display: block; /* Garante que a q-page ocupe a largura disponível */
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

/* Estilização dos cards */
.my-card {
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.q-mb-md {
  margin-bottom: 10px;
}

/* Ajustes nos textos */
.text-h6 {
  color: var(--q-primary);
  font-size: 1rem; /* Era maior */
}

.text-subtitle2 {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.85rem;
}

/* Ícone do banner */
.q-banner .q-icon {
  margin-right: 12px;
}

/* Estilo para o separador dos cards */
.q-separator {
  width: 100%;
  height: 1px;
  background: var(--q-primary);  
  opacity: 0.5;
}

/* Centralizar a div de paginação */
.pagination-wrapper {
  display: flex;
  justify-content: space-between; /* Distribui espaço entre os dois elementos */
  align-items: center;
  width: 100%;
  margin-top: 24px;
}

/* Contêiner para a paginação centralizada */
.pagination-container {
  display: flex;
  justify-content: center; /* Centraliza a paginação */
  flex-grow: 1; /* Garante que a paginação ocupe o espaço necessário */
}

/* Contêiner para o select alinhado à direita */
.select-container {
  display: flex;
  justify-content: flex-end; /* Alinha o select à direita */
  flex-grow: 0; /* Não deixa o contêiner ocupar mais espaço */
}

.itens-por-pagina {
  min-width: 140px;  /* Largura mínima para acomodar o título (ex: "Itens por página") */
  max-width: 150px;  /* Limita a largura máxima para manter o select compacto */
}

/* Ajuste no item para ocupar menos espaço */
.q-item {
  padding: 0px 0px; /* Diminui o espaçamento interno */
}
</style>
