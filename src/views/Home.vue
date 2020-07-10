<template>
  <v-app id="inspire">
    <Sidebar v-bind:show-sidebar="drawer" />
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Logikoss Test</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="start" justify="start" align-content="start">
          <v-col>
            <SearchGit v-on:item-selected="fillResultCards" />
            <ResultCards v-bind:cards="cards" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text"
        >elporfirio &copy; {{ new Date().getFullYear() }}</span
      >
    </v-footer>
  </v-app>
</template>

<script>
import ResultCards from "@/components/ResultCards";
import SearchGit from "@/components/SearchGit";
import Sidebar from "@/components/Sidebar";
// @ is an alias to /src

export default {
  name: "Home",
  components: { ResultCards, SearchGit, Sidebar },
  props: {
    source: String
  },
  data: () => ({
    drawer: true,
    cards: []
  }),
  methods: {
    fillResultCards(cards) {
      this.cards = cards;
    }
  }
};
</script>
