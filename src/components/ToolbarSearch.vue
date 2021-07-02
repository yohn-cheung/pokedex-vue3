<template>
  <q-input
    filled
    dense
    borderless
    debounce="500"
    v-model="searchText"
    @update:model-value="searchInput"
    @blur="loadPokemons"
    placeholder="search"
  >
    <template v-slot:after>
      <q-icon v-if="searchText === ''" name="search" />
      <q-icon v-else name="clear" class="cursor-pointer" @click="searchText = ''" />
    </template>
  </q-input>
</template>

<script>
import { pokemonFunctions } from "../cmp-functions/pokemonFunctions.js";

export default {
  setup() {
    const { searchText, searchInput, loadPokemons } = pokemonFunctions();

    return {
      searchText,
      searchInput,
      loadPokemons,
    };
  },
};
</script>
