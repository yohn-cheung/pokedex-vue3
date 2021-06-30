<template>
  <q-input
    filled
    dense
    borderless
    debounce="500"
    v-model="text"
    @update:model-value="searchInput"
    @blur="onLoad"
    placeholder="search"
  >
    <template v-slot:after>
      <q-icon v-if="text === ''" name="search" />
      <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
    </template>
  </q-input>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const text = ref("");
    const store = useStore();

    const selection = ref(store.getters.gens[0]);

    function searchInput(value) {
      const searchValue = value.toLowerCase();
      if (searchValue.length > 2) {
        store.dispatch("GET_SEARCH_RESULT", searchValue);
      } else if (searchValue.length == 0) {
        store.dispatch("GET_POKEMONS", selection.value);
      }
    }

    function onLoad() {
      // console.log("onload");
      if (text.value.length != 0) {
        text.value = "";
        store.dispatch("GET_POKEMONS", selection.value);
      }
    }

    onBeforeMount(() => {
      store.dispatch("GET_SEARCH_POKEMONS");
    });

    return {
      text,
      searchInput,
      onLoad,
    };
  },
};
</script>
