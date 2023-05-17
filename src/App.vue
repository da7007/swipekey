<template>
  <div class="swipekey-root">
    <NavbarComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavbarComponent from "./components/NavbarComponent.vue";

export default defineComponent({
  name: 'App',
  components: {
    NavbarComponent
  }
});
</script>

<style>
.swipekey-root {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  position:fixed;
  background-color:rgba(0,0,0,0.5);
  width:95%;
  top:0;
  left:10%;
  height:100%;
}

</style>
