<template>
  <div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="white" text-color="dark" icon="keyboard_arrow_up" direction="up">
        <q-fab-action
          external-label
          label-position="left"
          color="white"
          text-color="dark"
          @click="openDialog('gens')"
          icon="filter_list"
          label="generation"
        />
        <q-fab-action
          external-label
          label-position="left"
          color="white"
          text-color="dark"
          @click="openDialog('forms')"
          icon="map"
          label="regional form"
        />
        <q-fab-action
          external-label
          label-position="left"
          color="white"
          text-color="dark"
          @click="openDialog('transformation')"
          icon="bolt"
          label="transformation"
        />
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="toggleDialog" position="bottom">
      <q-card>
        <q-bar>
          <div>{{ titleDialog }}</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>

        <q-card-section>
          <div v-for="(filter, index) in selectedFilter" :key="index">
            <q-radio
              v-model="selection"
              color="info"
              :val="filter"
              :label="filter.name"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { onBeforeMount, watch, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "FabButton",
  setup() {
    const store = useStore();
    const titleDialog = ref(false);
    const toggleDialog = ref(false);
    const selection = ref(store.getters.gens[0]);
    let selectedFilter = ref(false);

    function openDialog(filter) {
      // position.value = pos
      switch (filter) {
        case "gens":
          selectedFilter.value = store.getters.gens;
          titleDialog.value = "Select generation";
          break;
        case "forms":
          selectedFilter.value = store.getters.forms;
          titleDialog.value = "Select regional form";
          break;
        case "transformation":
          selectedFilter.value = store.getters.transformation;
          titleDialog.value = "Select transformation form";
          break;
        default:
          break;
      }
      toggleDialog.value = true;
    }

    function onLoad() {
      store.dispatch("GET_POKEMONS", selection.value);
    }

    onBeforeMount(() => {
      onLoad();
    });

    watch(selection, (value) => {
      toggleDialog.value = false;
      store.dispatch("GET_POKEMONS", value);
    });

    return {
      titleDialog,
      openDialog,
      toggleDialog,
      selection,
      selectedFilter,
    };
  },
};
</script>
