<template>
  <q-page class="q-pa-md">
    <article>
      <p>This is a fanmade pokedex, developed with Vue3 and PokeAPI.</p>
    </article>

    <article>
      <p>
        This pokedex is build with the
        <a href="https://quasar.dev/" target="_blank">Quasar framework</a>, a Vue.js based
        framework which allows me as a web developer to quickly create responsive++
        websites/apps. I use the latest version of
        <a
          href="https://v3.vuejs.org/guide/composition-api-introduction.html"
          target="_blank"
          >Vue 3</a
        >, making use of the composition API. To share data between the pages and
        components, I made use of <a href="https://next.vuex.vuejs.org/">Vuex 4</a>, state
        management system.
      </p>
    </article>

    <article>
      <p>
        All the content and images is provided by
        <a href="https://pokeapi.co" target="_blank">PokeAPI</a>.
      </p>
    </article>
  </q-page>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000000;
  font-weight: bold;
}
</style>
