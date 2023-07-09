import { createRouter, createWebHashHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import FrontPage from '../components/FrontPage.vue'
import InputCsv from '../components/InputCsv.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: FrontPage
  },
  {
    path:'/input',
    name:'input-csv',
    component:InputCsv

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
