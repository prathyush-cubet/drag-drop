import { createWebHistory, createRouter } from "vue-router";
import AdminComponent from '@/components/AdminComponent.vue'
import LearnerComponent from '@/components/LearnerComponent.vue'

const routes = [
  { path: '/', component: AdminComponent, name:'dashboard' },
  { path: '/admin', component: AdminComponent, name:'admin'},
  { path: '/learner', component: LearnerComponent, name:'learner' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active", // active class for non-exact links.
  linkExactActiveClass: "active"
});

export default router;
