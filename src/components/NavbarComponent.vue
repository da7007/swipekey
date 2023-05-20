<template>
  <div class="swipekey-navbar-root">
    <button
      class="btn btn-outline"
      v-for="NavbarItem in NavbarItems"
      :key="NavbarItem.id"
    @click="showTab(NavbarItem.name)">
      {{ NavbarItem.name }}
    </button>
    <YourSecrets v-if="showingYourSecrets" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import YourSecrets from "./YourSecrets.vue";

interface NavbarItem {
  id: number;
  name: string;
  link: string;
}
export default defineComponent({
  name: "NavbarComponent",
  components: {
    YourSecrets,
  },
  data() {
    return {
      showingYourSecrets: false as boolean,
      NavbarItems: [
        { id: 0, name: "Your Secrets", link: "#" },
        { id: 1, name: "User Directory", link: "#" }
      ] as NavbarItem[],
    };
  },
  methods: {
    showTab(component: string) {
      switch (component) {
        case "Your Secrets":
          this.showingYourSecrets = !this.showingYourSecrets;
          break;
        default:
          break;
      }
    },
  },
});
</script>
<style scoped>
.swipekey-navbar-root {
  position: fixed;
  height: 100%;
  width: 10%;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
button {
  width: 100%;
  display: flex;
  padding: 5px;
  margin-bottom: 5px;
}
</style>
