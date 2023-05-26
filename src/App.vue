<template>
  <div class="swipekey-root">
    <NavbarComponent />
    <div v-if="!isAuthenticated" className="login-root">
      <h3>Login or register below:</h3>

      <div className="login">
        <h6>Login with existing SwipeKey Account</h6>
        <input
          v-model="login_email"
          class="form-control"
          placeholder="Enter your email address"
          type="text"
        />
        <input
          v-model="login_password"
          class="form-control"
          placeholder="Enter your password"
          type="password"
        />
        <button
          @click="login(login_email, login_password)"
          class="btn btn-dark"
        >
          Login
        </button>
      </div>

      <div className="register">
        <h6>Register a new SwipeKey Account</h6>
        <input
          v-model="register_email"
          class="form-control"
          placeholder="Email address"
          type="text"
        />
        <input
          v-model="register_username"
          class="form-control"
          placeholder="Username"
          type="text"
        />
        <input
          v-model="register_password"
          class="form-control"
          placeholder="Enter your password"
          type="password"
        />
        <button
          @click="
            register(register_email, register_username, register_password)
          "
          class="btn btn-dark"
        >
          Register
        </button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavbarComponent from "./components/NavbarComponent.vue";
import axios from "axios";

export default defineComponent({
  name: "App",
  components: {
    NavbarComponent,
  },
  data() {
    return {
      login_email: "" as string,
      login_password: "" as string,
      register_email: "" as string,
      register_username: "" as string,
      register_password: "" as string,
      isAuthenticated: false
    };
  },
  methods: {
    async register(email: string, username: string, password: string) {
      await axios.post("http://localhost:3000/register", null, {
        params: {
          username: username,
          email: email,
          password: password,
        },
      });
    },
    async login(email: string, password: string) {
      await axios
        .post("http://localhost:3000/login", null, {
          params: {
            email: email,
            password: password,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push(`/secrets?qisAuthenticated=true`);
          } else {
            alert("Invalid credentials. Please try again.")
          }
        });
    },
  },
});
</script>

<style>
.swipekey-root {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 95%;
  top: 0;
  left: 10%;
  height: 100%;
}
</style>
