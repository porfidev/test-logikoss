<template>
  <v-row>
    <v-col cols="12">
      <v-toolbar dark color="teal">
        <v-toolbar-title>Búsqueda Git</v-toolbar-title>
        <v-autocomplete
          v-on:change="testChange"
          v-model="select"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          cache-items
          class="mx-4"
          flat
          hide-no-data
          hide-details
          label="Ingresa un término de búsqueda"
          solo-inverted
        ></v-autocomplete>
        <v-btn icon>
          <v-icon>mdi-git</v-icon>
        </v-btn>
      </v-toolbar>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import { debounce } from "lodash";

export default {
  name: "SearchGit",
  data: () => ({
    loading: false,
    items: [],
    search: null,
    select: null,
    cache: []
  }),
  watch: {
    search: debounce(function(val) {
      if (val && val !== this.select) {
        this.querySelections(val);
      }
    }, 500)
  },
  methods: {
    querySelections(v) {
      const self = this;
      this.loading = true;
      // Simulated ajax query
      axios
        .get(`https://api.github.com/search/repositories?q=${v}`)
        .then(response => {
          console.log(response);
          self.cache = response.data.items;
          self.items = response.data.items.map(item => item.full_name);
          self.loading = false;
        });
    },
    testChange(textSearch) {
      this.$emit(
        "item-selected",
        this.cache.filter(item => item.full_name === textSearch)
      );
    }
  }
};
</script>

<style scoped></style>
