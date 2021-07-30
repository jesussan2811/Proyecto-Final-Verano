<template>
  <div>
    <h1>Editar BoardGame</h1>
    <form @submit.prevent="guardarBoardGame()">
      <Input v-model="boardgame.id" titulo="ID" id="id" disabled />
      <Input
        v-model="BoardGame.BName"
        titulo="Nombre"
        id="nombre"
        placeholder="Ingrese un nombre."
        :maxlength="80"
        :value="BoardGame.BName"
        mensajeError="Es necesario ingresar el nombre"
        :error="erroresValidacion && !validacionNombre"
      />

      <Input
        v-model="BoardGame.Publisher"
        titulo="Marca"
        id="publisher"
        placeholder="Ingrese una marca"
        :maxlength="60"
        :value="BoardGame.Publisher"
        :error="erroresValidacion && !validacionPublisher"
      />
      <div>
        <Input
          v-model="BoardGame.Category"
          class="form-check-input"
          type="radio"
          id="category11"
          value="11"
          :error="erroresValidacion && !validacionCategory"         
        />
        <label for="category11">Adventure</label>
        <Input
          v-model="BoardGame.Category"
          class="form-check-input"
          type="radio"
          id="category12"
          value="12"
          :error="erroresValidacion && !validacionCategory"         
        />
        <label for="category12">Puzzle</label>
        <Input
          v-model="BoardGame.Category"
          class="form-check-input"
          type="radio"
          id="category13"
          value="13"
          :error="erroresValidacion && !validacionCategory"         
        />
        <label for="category13">Strategy</label>
        <Input
          v-model="BoardGame.Category"
          class="form-check-input"
          type="radio"
          id="category14"
          value="14"
          :error="erroresValidacion && !validacionCategory"         
        />
        <label for="category14">Fantasy</label>
        <Input
          v-model="BoardGame.Category"
          class="form-check-input"
          type="radio"
          id="category15"
          value="15"
          :error="erroresValidacion && !validacionCategory"         
        />
        <label for="category15">Civilization</label>
      </div>
      
        <Input
        v-model="BoardGame.BDescription"
        titulo="Descripcion"
        id="description"
        placeholder="Ingrese una descripcion"
        :value="BoardGame.BDescription"
        :maxlength="200"
      />

      <Input
        v-model="BoardGame.BYear"
        titulo="Año"
        id="year"
        placeholder="Ingrese el año de salida"
        :value="BoardGame.BYear"
        :maxlength="4"
      />

      <b-button type="submit" variant="primary" class="my-2">Guardar</b-button>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import Input from "../components/Input.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "Editar",
  components: { Input },
  data() {
    return {
      persona: {},
      erroresValidacion: false,
    };
  },
  computed: {
    validacionNombre() {
      return (
        this.boardgame.BName !== undefined && this.boardgame.BName.trim() !== ""
      );
    },
    validacionPublisher() {
      return (
        this.boardgame.Publisher !== undefined && this.boardgame.Publisher.trim() !== ""
      );
    },
    validacionCategory() {
      return (
        this.boardgame.Category !== undefined && this.boardgame.Category.trim() !== ""
      );
    },
  },
  methods: {
    ...mapActions(["editarBoardgame", "obtenerboardgame"]),
    guardarBoardGame() {
      if (this.validacionNombre) {
        // Si tengo los datos que valide
        this.erroresValidacion = false;
        console.log("Si puedo guardar");
        this.editarBoardgame({
          id: this.$route.params.id,
          params: this.persona,
          onComplete: (response) => {
            console.log(response);
            this.$notify({
              title: response.data.mensaje,
              type: "success",
            });
            this.$router.push({
              name: "VistaBoardGames",
            });
          },
          onError: (error) => {
            console.log(error.response.data.mensaje);
            this.$notify({
              type: "error",
              title: error.response.data.mensaje,
            });
          },
        });
      } else {
        this.erroresValidacion = true;
      }
    },
  },
  mounted() {
    this.obtenerboardgame({
      id: this.$route.params.id,
      onComplete: (response) => {
        Vue.set(this, "boardgame", response.data.result);
      },
    });
  },
};
</script>

<style></style>