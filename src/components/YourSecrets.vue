<template>
  <div class="swipekey-your-secrets-root">
    <h4>Your Secrets</h4>
    <p>
      This page contains all of your application secrets for use within your
      applications. All of these are encrypted and can only be read with your
      SwipeKey master token.
    </p>
    <div v-if="isAuthenticated" className="add-secret">
      <h6>Add a new secret for your app:</h6>
      <input
        v-model="app_name"
        type="text"
        class="form-control"
        placeholder="Application Name"
      />
      <input
        v-model="secret_name"
        type="text"
        class="form-control"
        placeholder="Secret Name"
      />
      <input
        v-model="secret_value"
        type="text"
        class="form-control"
        placeholder="Secret Value"
      />
      <button class="btn btn-success" @click="createSecret()">
        Add Secret
      </button>
    </div>

    <h6>Or to view secrets, please enter your master token:</h6>
    <input
      v-model="token"
      type="password"
      class="form-control"
      placeholder="Enter master token here"
      @keyup.enter="validateToken(token)"
    />
    <button id="fetch-secrets-btn" @click="getSecrets" v-if="isAuthenticated" class="btn btn-success">Fetch Secrets</button>
    <table v-if="isAuthenticated" class="secrets-table">
      <tr>
        <th>Application</th>
        <th>Secret Name</th>
        <th>Secret Value</th>
      </tr>
      <tr v-for="secret, idx in secrets" :key="idx">
        <td>{{ secret.application }}</td>
        <td>{{ secret.secret_name }}</td>
        <td v-if="!secret.secret_revealed">
          <button class="btn btn-danger" @click="secret.secret_revealed = true">
            Reveal
          </button>
        </td>
        <td v-if="secret.secret_revealed">{{ secret.secret_value }}</td>
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

interface Secret {
  application: string;
  secret_name: string;
  secret_value: string;
  secret_revealed: boolean;
}

export default defineComponent({
  name: "YourSecrets",
  data() {
    return {
      token: "" as string,
      app_name: "" as string,
      secret_name: "" as string,
      secret_value: "" as string,
      isAuthenticated: false,
      secrets: [] as Secret[],
    };
  },
  methods: {
    async validateToken(token: string) {
      const request: ApiRequest = {
        username: "",
        email: "",
        password: "",
        token: token,
      };

      await axios
        .post("http://localhost:3000/auth", null, { params: request })
        .then((response) => {
          if (response.status === 200) {
            this.isAuthenticated = true;
          } else {
            this.isAuthenticated = false;
          }
        });
      },
    getSecrets() {
      if(this.isAuthenticated) {
        axios.get("http://localhost:3000/secrets").then(response => {
          for(let i in response.data.secrets) {
            if(this.secrets.length === response.data.secrets.length) {
              return;
            } else {
              this.secrets.push(response.data.secrets[i])
            }
            
          }
        })
      }
    },
    createSecret() {
      if (this.isAuthenticated) {
        let secret: Secret = {
          application: this.app_name,
          secret_name: this.secret_name,
          secret_value: this.secret_value,
          secret_revealed: false,
        };
        this.secrets.push(secret);
      }
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
  top: 225px;
}
.add-secret {
  position:fixed;
  top:425px;
  padding:5px;
}
.form-control {
  margin:5px;
  padding:5px;
  width:450px;
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
#fetch-secrets-btn {
  position:fixed;
  top:175px;
}
</style>
