<template>
  <v-navigation-drawer v-bind:value="showSidebar" app>
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img v-bind:src="avatar" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ email }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item link v-on:click="doLogout">
        <v-list-item-action>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Cerrar Sesión</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { deleteAuthToken, getAuthToken } from "@/helpers/Auth";
import axios from "axios";

export default {
  name: "Sidebar",
  props: {
    showSidebar: Boolean
  },
  data: () => ({
    email: "",
    avatar: ""
  }),
  mounted() {
    const { authToken, tokenType } = getAuthToken();
    const self = this;
    axios
      .get("https://api-dev.logikoss.com/v1/users/me", {
        headers: {
          Authorization: `${tokenType && tokenType + " "}${authToken}`
        }
      })
      .then(response => {
        self.email = response.data.email;
        self.avatar = "https://randomuser.me/api/portraits/men/17.jpg";
      });
  },
  methods: {
    doLogout: function() {
      const self = this;
      const { authToken, tokenType } = getAuthToken();
      axios
        .post("https://api-dev.logikoss.com/v1/auth/logout", null, {
          headers: {
            Authorization: `${tokenType && tokenType + " "}${authToken}`
          }
        })
        .then(function(response) {
          if (response.status === 204) {
            deleteAuthToken();
            self.$router.push({ name: "Login" });
            return;
          }
          throw Error("Error on logout");
        })
        .catch(function(error) {
          self.showError = true;
          console.error(error);
        });
    }
  }
};
</script>

<style scoped></style>
