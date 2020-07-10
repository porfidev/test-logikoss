<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Iniciar Sesión</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="validForm" ref="loginForm" lazy-validation>
                  <v-text-field
                    label="Correo electrónico"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="email"
                    :rules="emailRules"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Contraseña"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                  ></v-text-field>
                </v-form>
                <pre>{{ email }} . {{ password }}</pre>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="validateLoginForm"
                  >Iniciar sesión</v-btn
                >
              </v-card-actions>
            </v-card>
            <v-dialog v-model="showError" persistent max-width="290">
              <v-alert border="right" colored-border type="error" elevation="2">
                Los datos de inicio de sesión no son válidos.
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="showError = false"
                  >Aceptar</v-btn
                >
              </v-alert>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { setAuthToken } from "@/helpers/Auth";

export default {
  name: "Login.vue",

  data: () => ({
    showError: false,
    email: "",
    password: "",
    validForm: true,
    emailRules: [
      v => !!v || "El correo electrónico es requerido",
      v => /.+@.+\..+/.test(v) || "El correo electrónico no es válido",
      v => /.+@logikoss.com/.test(v) || "El correo electrónico no tiene un dominio autorizado",
    ],
    passwordRules: [v => !!v || "La contraseña es requerida"]
  }),

  props: {
    source: String
  },

  methods: {
    validateLoginForm: function() {
      console.log("validando tu formulario");
      this.validForm = this.$refs.loginForm.validate();

      if (this.validForm) {
        this.doLogin();
      }
    },
    doLogin: function() {
      const self = this;
      axios
        .post(
          "https://api-dev.logikoss.com/v1/auth/login",
          {
            email: this.email,
            password: this.password
          },
          { headers: { "x-app": "B2B" } }
        )
        .then(function(response) {
          if (response.data && response.data.access_token) {
            return setAuthToken(response.data.access_token);
          }
          throw Error("Error on receive auth token");
        })
        .then(function() {
          self.$router.push({ name: "Home" });
        })
        .catch(function(error) {
          self.showError = true;
          console.log(error);
        });
    }
  }
};
</script>

<style scoped></style>
