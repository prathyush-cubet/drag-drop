import { createWebHistory, createRouter } from "vue-router";
import AdminComponent from '@/components/AdminComponent.vue'
import LearnerComponent from '@/components/LearnerComponent.vue'
import DragComponentVue from "@/components/DragComponent.vue";

const routes = [
  { path: '/', component: AdminComponent },
  { path: '/admin', component: AdminComponent },
  { path: '/learner', component: LearnerComponent },
  { path: '/drag', component: DragComponentVue },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active", // active class for non-exact links.
  linkExactActiveClass: "active"
});

export default router;
