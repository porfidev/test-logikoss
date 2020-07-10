<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="344"
      outlined
      v-for="card in cards"
      v-bind:key="card.id"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">{{ card.name }}</div>
          <v-list-item-title class="headline mb-1">{{
            card.full_name
          }}</v-list-item-title>
          <v-list-item-subtitle>{{ card.description }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn text>Button</v-btn>
        <v-btn text>Button</v-btn>
      </v-card-actions>
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
