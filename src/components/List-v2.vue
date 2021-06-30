<template>
  <div>
    <q-infinite-scroll class="row" @load="onLoad" :offset="250">
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
      <template v-slot:loading>
        <div class="full-width">
          <q-spinner-dots color="info" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<style></style>

<script>
import { computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "List",
  setup() {
    const router = useRouter();
    const store = useStore();

    const listPokemons = computed(() => store.getters.listPokemons);
    // const selected = computed(() => store.getters.filter.selected);
    const params = computed(() => store.getters.filter.params);

    // console.log("selectedsadasd: ", selected.value);

    // eslint-disable-next-line no-unused-vars
    function onLoad(index, done) {
      // console.log("selected dsfdf: ", selected);
      setTimeout(() => {
        const payload = params;
        if (listPokemons.value.length != 0) {
          payload.limit = listPokemons.value.length + 20;
          // console.log("payloadasasd: ", payload);
        }

        store.dispatch("GET_POKEMONS", payload);
        done();
      }, 1000);
    }

    onBeforeMount(() => {
      onLoad();
    });

    function getImage(url) {
      let id = url.split("/")[6];
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      // return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${num}.png`;
    }

    function openPage(url) {
      const num = url.split("/")[6];
      router.push(`/pokemon/` + num);
    }

    return {
      listPokemons,
      getImage,
      openPage,
      onLoad,
    };
  },
};
</script>
