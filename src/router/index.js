import Vue from "vue";
import VueRouter from "vue-router";
// 组件 
import Login from "../views/Login/index.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/about",
    name: "About",
    component: () => import( "../views/About.vue" )
  }
];

const router = new VueRouter({
  routes
});

export default router;
