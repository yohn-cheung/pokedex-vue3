import { onBeforeMount, watch, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export const pokemonFunctions = () => {
  
  
  // set basic settings
  const store = useStore();
  const router = useRouter();

  // routes
  const routePath = computed(() => router.currentRoute.value.name);
  const routerBack = computed(() => router.back);

  // dialog filters gen, region, transformation
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

  const showSelectedFilter = watch(selection, (value) => {
    toggleDialog.value = false;
    store.dispatch("GET_POKEMONS", value);
  });


  const searchText = ref("");
  // search input for pokemon
  function searchInput(value) {
    const searchValue = value.toLowerCase();
    if (searchValue.length > 2) {
      store.dispatch("GET_SEARCH_RESULT", searchValue);
    } else if (searchValue.length == 0) {
      loadPokemons
    }
  }

  // loading list of pokemon
  function loadPokemons() {
    store.dispatch("GET_POKEMONS", selection.value);
  }

  const listPokemons = computed(() => store.getters.listPokemons);

  function getImage(url) {
    let id = url.split("/")[6];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  function openPage(url) {
    const num = url.split("/")[6];
    router.push(`/pokemon/` + num);
  }

  onBeforeMount(() => {
    // get all pokemons list for search filter
    store.dispatch("GET_SEARCH_POKEMONS");
    // load selected gen
    store.dispatch("GET_POKEMONS", selection.value);
  });

    return {
      searchText,
      searchInput,
      loadPokemons,

      openDialog,
      titleDialog,
      toggleDialog,
      selection,
      selectedFilter,
      showSelectedFilter,

      routePath,
      routerBack,

      listPokemons,
      getImage,
      openPage,
    };
}