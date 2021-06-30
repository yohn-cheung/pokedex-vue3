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
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "List",
  setup() {
    const router = useRouter();
    const store = useStore();

    const listPokemons = computed(() => store.getters.listPokemons);

    function getImage(url) {
      let id = url.split("/")[6];
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    }

    function openPage(url) {
      const num = url.split("/")[6];
      router.push(`/pokemon/` + num);
    }

    return {
      listPokemons,
      getImage,
      openPage,
    };
  },
};
</script>
