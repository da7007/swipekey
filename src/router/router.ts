import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import YourSecrets from "../components/YourSecrets.vue";


export default createRouter({
  history: createWebHistory(),
  routes: [
    { name: "root", path: "/", component: App },
    { name: "secrets", path: "/secrets", component: YourSecrets, props: route => ({
        isAuthenticated: route.query.q
    })}
  ],
});
