<template>
  <div class="row">
    <q-card
      class="col-4"
      v-ripple
      flat
      bordered
      v-for="(pokemon, index) in listPokemons"
      :key="index"
      @click="openPage(pokemon.url)"
    >
      <q-img :src="getImage(pokemon.url)">
        <div class="absolute-bottom text-subtitle2 text-center">
          {{ pokemon.name }}
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<style></style>

<script>
import { pokemonFunctions } from "../cmp-functions/pokemonFunctions.js";

export default {
  name: "List",
  setup() {
    const { listPokemons, getImage, openPage } = pokemonFunctions();

    return {
      listPokemons,
      getImage,
      openPage,
    };
  },
};
</script>
