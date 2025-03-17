<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Google Workspace System
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>

        <q-item clickable @click="irParaEmpresas" class="q-item-elevated q-pa-md q-item-spacing">
          <q-item-section avatar>
            <q-icon name="business"/>
          </q-item-section>
          <q-item-section>
            Empresas
          </q-item-section>
        </q-item>

        <q-item clickable @click="irParaDominios" class="q-item-elevated q-pa-md q-item-spacing">
          <q-item-section avatar>
            <q-icon name="public"/>
          </q-item-section>
          <q-item-section>
            Domínios
          </q-item-section>
        </q-item>

        <q-item clickable @click="irParaContatos" class="q-item-elevated q-pa-md q-item-spacing">
          <q-item-section avatar>
            <q-icon name="contact_page"/>
          </q-item-section>
          <q-item-section>
            Contatos
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// Acesso ao roteador para navegação
const router = useRouter();

// Função para navegar para a página de Empresas
function irParaEmpresas() {
  void router.push('/empresas'); // Navega para a página de empresas
}
function irParaDominios() {
  void router.push('/dominios'); // Navega para a página de empresas
}
function irParaContatos() {
  void router.push('/contatos'); // Navega para a página de empresas
}

</script>

<style scoped>
.q-item-elevated {
  border-radius: 6px; /* Arredonda os cantos do item */
  background-color: #027be3; /* Cor de fundo do item */
  color: white;
}

.q-item-elevated:hover {
  background-color: rgb(231, 231, 231) !important;
  color: #027be3 !important; /* Ajuste a cor do texto/ícone se necessário */
}

.q-item-section {
  display: flex;
  align-items: center; /* Alinha o ícone e o texto na vertical */
}

.q-item-section avatar {
  margin-right: 8px; /* Espaço entre o ícone e o texto */
}

.q-item-spacing {
  margin-top: 10px; /* Distância do topo para todos os itens */
  margin-left: 6px; /* Espaçamento à esquerda */
  margin-right: 6px; /* Espaçamento à direita */
}
</style>