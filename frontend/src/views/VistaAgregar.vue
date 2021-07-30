<template>
  <div>
    <h1>Agregar BoardGame</h1>
    <form @submit.prevent="guardarBoardGame()">
      <Input
        v-model="boardgame.BName"
        titulo="Nombre"
        id="nombre"
        placeholder="Ingrese un nombre."
        :maxlength="80"
        mensajeError="Es necesario ingresar el nombre"
        :error="erroresValidacion && !validacionNombre"
      />

      <Input
        v-model="boardgame.Publisher"
        titulo="Marca"
        id="publisher"
        placeholder="Ingrese una marca"
        :maxlength="60"
        :error="erroresValidacion && !validacionPublisher"
      />
      <h6>Categorias</h6>
      <div id="v-model-radiobutton">
        <div>
          <input
          v-model="boardgame.Category"
          name="Category"
          type="radio"
          id="category11"
          value="11"
          :error="erroresValidacion && !validacionCategory"         
        />
        <label for="category11">Adventure</label>
        </div>
        <div>
          <input
          v-model="boardgame.Category"
          name="Category"
          type="radio"
          id="category12"
          value="12"
          :error="erroresValidacion && !validacionCategory"         
        />
        <label for="category12">Puzzle</label>
        </div>
        <div>
        <input
          v-model="boardgame.Category"
          name="Category"
          type="radio"
          id="category13"
          value="13"
          :error="erroresValidacion && !validacionCategory"         
        />
        <label for="category13">Strategy</label>
        </div>
        <div>
        <input
          v-model="boardgame.Category"
          name="Category"
          type="radio"
          id="category14"
          value="14"
          :error="erroresValidacion && !validacionCategory"         
        />
        <label for="category14">Fantasy</label>
        </div>
        <div>
        <input
          v-model="boardgame.Category"
          name="Category"
          type="radio"
          id="category15"
          value="15"
          :error="erroresValidacion && !validacionCategory"         
        />
        <label for="category15">Civilization</label>
        </div>
      </div>

        <Input
        v-model="boardgame.BDescription"
        titulo="Descripcion"
        id="description"
        placeholder="Ingrese una descripcion"
        :maxlength="200"
      />

      <Input
        v-model="boardgame.BYear"
        titulo="Año"
        id="year"
        placeholder="Ingrese el año de salida"
        :maxlength="4"
      />

      <b-button type="submit" variant="primary" class="my-2">Guardar</b-button>
    </form>
  </div>
</template>

<script>
import Input from "../components/Input.vue";
import { mapActions } from "vuex";
export default {
  name: "Agregar",
  components: { Input },
  data() {
    return {
        boardgame: {
        BName:"",
        Publisher: "",
        Category: "",
        BDescription: "",
        BYear: "",
      },
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
    ...mapActions(["crearBoardgame"]),
    guardarBoardGame() {
      if (this.validacionNombre && this.validacionPublisher && this.validacionCategory) {
        // Si tengo los datos que valide
        this.erroresValidacion = false;
        console.log("Si puedo guardar");
        this.crearBoardgame({
          params: this.boardgame,
          onComplete: (response) => {
            console.log(response);
            this.$notify({
              title: response.data.mensaje,
              type: "success",
            });
            this.$router.push({
                name: 'VistaBoardGames'
            })
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
    limpiar() {
      this.boardgame = {
        BName:"",
        Publisher: "",
        Category: "",
        BDescription: "",
        BYear: "",
      };
    },
  },
};
</script>

<style>
#v-model-radiobutton {
  display: inline-flex;
  width: 100%;
}
#v-model-radiobutton {
  justify-content: space-around;
}
#v-model-radiobutton input[type="radio"]{
  width: 60px;
}
#v-model-radiobutton label{
  display: flex;
}
</style>