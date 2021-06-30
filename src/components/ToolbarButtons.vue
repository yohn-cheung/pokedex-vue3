<template>
  <div>
    <q-btn flat round dense icon="more_vert">
      <q-menu auto-close :offset="[110, 8]">
        <q-list style="min-width: 150px">
          <q-item clickable to="/about" exact>
            <q-item-section>About</q-item-section>
          </q-item>
          <!-- <q-item clickable>
            <q-item-section>Dark Mode</q-item-section>
          </q-item> -->
          <q-item clickable @click="refresh()">
            <q-item-section>Refresh</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "ToolbarButton",
  setup() {
    const router = useRouter();
    function refresh() {
      router.go();
    }

    return {
      refresh,
    };
  },
};
</script>
