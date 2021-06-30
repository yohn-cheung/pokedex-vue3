<template>
  <q-page class="q-pa-md">
    <list />
    <fab-button />
  </q-page>
</template>

<script>
// @ is an alias to /src
import List from "../components/List.vue";
import FabButton from "../components/FabButton.vue";

export default {
  name: "Home",
  components: {
    List,
    FabButton,
  },
};
</script>
