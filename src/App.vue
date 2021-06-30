<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered v-if="routePath === 'Home'">
      <q-toolbar>
        <q-toolbar-title> Pokedex </q-toolbar-title>
        <q-space></q-space>
        <toolbar-search />
        <toolbar-buttons />
      </q-toolbar>
    </q-header>

    <q-header bordered v-else-if="routePath === 'About'">
      <q-toolbar>
        <q-btn flat round dense icon="arrow_back" @click="routerBack" />
        <q-toolbar-title> About </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import ToolbarSearch from "./components/ToolbarSearch.vue";
import ToolbarButtons from "./components/ToolbarButtons.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LayoutDefault",
  components: {
    "toolbar-buttons": ToolbarButtons,
    "toolbar-search": ToolbarSearch,
  },
  setup() {
    const router = useRouter();
    const routePath = computed(() => router.currentRoute.value.name);
    const routerBack = computed(() => router.back);

    return {
      routePath,
      routerBack,
    };
  },
};
</script>

<style scoped>
.q-layout__section--marginal {
  color: #000000;
}
</style>
