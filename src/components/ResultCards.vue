<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="600"
      outlined
      v-for="card in cards"
      v-bind:key="card.id"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-6">{{ card.name }}</div>
          <v-list-item-title class="headline mb-1"
            ><a :href="card.html_url" target="_blank">
              {{ card.full_name }}</a
            ></v-list-item-title
          >
          <v-list-item-subtitle>{{ card.description }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey">
          <img v-bind:src="card.owner.avatar_url" alt="avatar" />
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ResultCards.vue",
  props: {
    cards: Array
  }
};
</script>

<style scoped></style>
