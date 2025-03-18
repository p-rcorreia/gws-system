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

        <q-item clickable @click="irParaIndex" class="q-item-elevated q-pa-md q-item-spacing">
          <q-item-section avatar>
            <q-icon name="home"/>
          </q-item-section>
          <q-item-section>
            Início
          </q-item-section>
        </q-item>

        <q-expansion-item icon="business" label="Empresas" class="q-item-elevated q-item-spacing">
          <q-list class="q-submenu">
            <q-item clickable @click="irParaCadastrarEmpresas" class="q-item-sub q-pa-md">
              <q-item-section avatar>
                <q-icon name="add_business" />
              </q-item-section>
              <q-item-section>
                <span class="q-submenu-text">Nova Empresa</span>
              </q-item-section>
            </q-item>

            <q-item clickable @click="irParaListarEmpresas" class="q-item-sub q-pa-md">
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                <span class="q-submenu-text">Lista de Empresas</span>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        
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

function irParaIndex() {
  void router.push('/index'); // Navega para a página index
}
function irParaCadastrarEmpresas() {
  void router.push('/cadastrar-empresas'); // Navega para a página de cadastro de empresas
}
function irParaListarEmpresas() {
  void router.push('/listar-empresas'); // Navega para a página de listagem de empresas
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

.q-submenu {
  background-color: white ; /* Cor de fundo para destacar o submenu */
  padding-right: 20px; /* Recuo para diferenciar dos itens principais */
  padding-top: 1px;
}

.q-item-sub {
  font-size: 13px; /* Reduz o tamanho do texto para parecer um subitem */
  color: #027be3 !important;
  border-radius: 3px;
  background-color: #e8f5ff;
  margin-top: 4px;
  padding: 6px 10px; /* Reduz o padding para diminuir o tamanho */
  height: 36px; /* Define uma altura menor */
  transition: transform 0.2s ease-in-out; /* Efeito de transição suave */
}

.q-item-sub:hover {
  transform: scale(1.03); /* Cresce um pouco menos para não ficar exagerado */
  background-color: #e3f2fd !important; /* Mantém o destaque ao passar o mouse */
}

/* Efeito de clique mais natural */
.q-item-sub:active {
  transform: scale(0.99); /* Reduz um pouco para parecer pressionado */
  box-shadow: inset 0px 2px 4px rgba(0, 98, 255, 0.27); /* Menos sombra para focar o efeito */
  background-color: #c5dbfc !important; /* Muda levemente a cor ao pressionar */
}

.q-submenu-text {
  font-weight: 500; /* Deixa o texto mais leve para diferenciar */
}

.q-item-sub:hover {
  background-color: #e3f2fd !important; /* Destaque ao passar o mouse */
}
</style>