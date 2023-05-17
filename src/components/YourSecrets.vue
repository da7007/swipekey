<template>
  <div class="swipekey-your-secrets-root">
    <h4>Your Secrets</h4>
    <p>
      This page contains all of your application secrets for use within your
      applications. All of these are encrypted and can only be read with your
      SwipeKey master token.
    </p>
    <input
      @keyup.enter="validateToken(token)"
      v-model="token"
      class="form-control"
      type="password"
      placeholder="Enter master token to gain access"
    />
    <table class="secrets-table">
      <tr>
        <th>Id</th>
        <th>Application</th>
        <th>Encrypted Secret</th>
      </tr>
      <tr>
        <td>0</td>
        <td>Hello World</td>
        <td>Testsecret</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

interface ApiRequest {
  username: string;
  email: string;
  password: string;
  token: string;
}

export default defineComponent({
  name: "YourSecrets",
  data() {
    return {
      token: "" as string,
    };
  },
  methods: {
    async validateToken(token: string) {
      const request: ApiRequest = {
        username: "dylanarmstrong",
        email: "dylan.armstrong@dylanarmstrong.net",
        password: "whatever123",
        token: token,
      };

      const response = await axios.post("http://localhost:3000/auth", request);
      console.log(response.status);
    },
  },
});
</script>

<style>
.swipekey-your-secrets-root {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  width: 95%;
  top: 0;
  left: 10%;
  height: 100%;
  padding: 15px;
}
.secrets-table {
  position: fixed;
  top: 150px;
}
th {
  padding: 10px;
  border: 1px solid white;
  background-color: white;
}
td {
  padding: 10px;
  border: 1px solid white;
}
input {
  position: fixed;
  width: 200px;
  height: 35px;
}
</style>
