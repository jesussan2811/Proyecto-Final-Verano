import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VistaBoardGames from '../views/VistaBoardGames.vue'
import VistaDetalle from '../views/VistaDetalle.vue'
import VistaAgregar from '../views/VistaAgregar.vue'
import VistaEditar from '../views/VistaEditar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Boardgames',
    name: 'VistaBoardGames',
    component: VistaBoardGames
  },
  {
    path: '/Boardgames/Agregar',
    name: 'VistaAgregar',
    component: VistaAgregar
  },
  {
    path: '/Boardgames/Editar/:id',
    name: 'VistaEditar',
    component: VistaEditar
  },
  {
    path: '/Boardgames/Detalle/:id',
    name: 'VistaDetalle',
    component: VistaDetalle
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
