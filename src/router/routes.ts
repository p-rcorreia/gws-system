import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '/index',
        component: () => import('pages/IndexPage.vue') 
      },
      {
        path: '/cadastrar-empresas',
        component: () => import('pages/CadastrarEmpresasPage.vue')
      },
      {
        path: '/listar-empresas',
        component: () => import('pages/ListarEmpresasPage.vue')
      },
      {
        path: '/dominios',
        component: () => import('pages/DominiosPage.vue')
      },
      {
        path: '/contatos',
        component: () => import('pages/ContatosPage.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
