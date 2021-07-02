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
// import { onBeforeMount, watch, ref } from "vue";
// import { useStore } from "vuex";

import { pokemonFunctions } from "../cmp-functions/pokemonFunctions.js";

export default {
  name: "FabButton",
  setup() {
    const {
      titleDialog,
      openDialog,
      toggleDialog,
      selection,
      selectedFilter,
      showSelectedFilter,
    } = pokemonFunctions();

    return {
      titleDialog,
      openDialog,
      toggleDialog,
      selection,
      selectedFilter,
      showSelectedFilter,
    };
  },
};
</script>
