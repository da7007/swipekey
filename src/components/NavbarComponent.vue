<template>
  <div class="swipekey-navbar-root">
    <button
      class="btn btn-outline"
      v-for="NavbarItem in NavbarItems"
      :key="NavbarItem.id"
    @click="NavbarItem.link">
      {{ NavbarItem.name }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface NavbarItem {
  id: number;
  name: string;
  link: string;
}
export default defineComponent({
  name: "NavbarComponent",
  data() {
    return {
      showingYourSecrets: false as boolean,
      NavbarItems: [
        { id: 0, name: "Your Secrets", link: this.$router.push("/secrets") },
        { id: 1, name: "User Directory", link: "#" }
      ] as NavbarItem[],
    };
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
