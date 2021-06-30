<template>
  <q-page>
    <q-img class="relative-position" src="../assets/pkbackground.jpeg">
      <q-toolbar class="text-white transparent">
        <q-btn flat round dense icon="arrow_back" @click="routerBack" />
      </q-toolbar>

      <figure class="absolute-center">
        <q-img
          width="180px"
          height="180px"
          :src="dataPokemon[0].img"
          :img-style="{ background: '#ffffff' }"
          style="border-radius: 50%"
        />
        <figcaption class="text-white text-center">
          <p>{{ dataPokemon[0].name }}</p>
        </figcaption>
      </figure>
    </q-img>

    <div>
      <q-card flat>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="dark"
          indicator-color="dark"
          align="justify"
          narrow-indicator
        >
          <q-tab name="info" label="Info" />
          <q-tab name="forms" label="Forms" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="info">
            <section v-for="(pokemon, index) in dataPokemon" :key="index">
              <div class="row">
                <div class="col">#{{ pokemon.id }}</div>
                <div class="col">
                  Type:
                  <q-badge
                    v-for="(type, index) in pokemon.types"
                    :style="{ backgroundColor: typeColors[type.type.name] }"
                    :key="index"
                    :label="type.type.name"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col">Height: {{ pokemon.height / 10 }} m</div>
                <div class="col">Weight: {{ pokemon.weight / 10 }} kg</div>
              </div>

              <div class="row">
                <div class="col">
                  {{ pokemon.desc }}
                </div>
              </div>
            </section>
          </q-tab-panel>

          <q-tab-panel name="forms">
            <q-list v-if="evoPokemon">
              <q-item-label header>Evolutions</q-item-label>
              <div v-for="(pokemon, index) in evoPokemon" :key="index">
                <q-item clickable v-ripple @click="openPage(pokemon.id)">
                  <q-item-section avatar>
                    <q-avatar>
                      <img
                        :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.imageID}.png`"
                      />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ pokemon.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </q-list>

            <q-list v-if="formPokemon">
              <q-item-label header>Transformations/Regional Form</q-item-label>

              <div v-for="(pokemon, index) in formPokemon" :key="index">
                <q-item clickable v-ripple @click="openPage(pokemon.id)">
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="pokemon.img" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ pokemon.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { computed, onBeforeMount, ref, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Pokemon",
  props: ["id"],
  setup(props) {
    const tab = ref("info");
    const typeColors = reactive({
      bug: "#99C32E",
      dark: "#5F5A6B",
      dragon: "#086CC0",
      electric: "#F4D644",
      fairy: "#EB92E5",
      fighting: "#D34364",
      fire: "#FEA152",
      flying: "#93ADDF",
      ghost: "#5F6CBA",
      grass: "#5CBB57",
      ground: "#D97F4D",
      ice: "#79D1C6",
      normal: "#919B9F",
      poison: "#A965C7",
      psychic: "#F77277",
      rock: "#C8B88B",
      steel: "#548D9E",
      water: "#59A0DB",
    });

    const store = useStore();
    const router = useRouter();

    // let dataPokemon = reactive(store.getters.dataPokemon);
    // let evoPokemon = reactive(store.getters.evoPokemon);
    // let formPokemon = reactive(store.getters.formPokemon);

    let dataPokemon = computed(() => store.getters.dataPokemon);
    let evoPokemon = computed(() => store.getters.evoPokemon);
    let formPokemon = computed(() => store.getters.formPokemon);
    // const routerBack = computed(() => router.back);

    function onLoad() {
      console.log("test: ", props.id);
      store.dispatch("GET_DATA_POKEMON", props.id);
    }

    function routerBack() {
      router.go(-1);
      onLoad();
    }

    function openPage(num) {
      router.push(`/pokemon/` + num);
      onLoad();
      tab.value = "info";
    }

    // eslint-disable-next-line no-unused-vars
    watch(tab, (newValue, oldValue) => {
      console.log("newValue: ", tab.value);
      const url = dataPokemon.value[0].evo;
      // console.log("url: ", url);
      store.dispatch("GET_EVO_POKEMON", url);
    });

    onBeforeMount(() => {
      // store.dispatch("GET_DATA_POKEMON", props.id);
      onLoad();
    });

    return {
      tab,
      typeColors,
      dataPokemon,
      evoPokemon,
      formPokemon,
      routerBack,
      openPage,
      onLoad,
    };
  },
};
</script>

<style scoped>
figure {
  margin: 0;
}
</style>
