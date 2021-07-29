<template>
  <router-link :to="`/pelicula/detalle/${id}`">
    <div>
      <h5>Name:{{ name }}</h5>
      <h5>Publisher:{{ publisher }}</h5>
      <h5>Year:{{ year }}</h5>

    <template slot="actions" slot-scope="{item}">
         <b-button :to="`/detalle/${item.id}`" class="mx-1">Detalle</b-button>
         <b-button :to="`/editar/${item.id}`" class="mx-1">Editar</b-button>
         <b-button @click="eliminar(item.id)" class="mx-1">Eliminar</b-button>
         <div class="form-check form-check-inline">
        <input
          v-model="todo.tipo"
          class="form-check-input"
          type="checkbox"
          id="Favoritos"
          value="Favoritos"
        />
        <label class="form-check-label" for="Favoritos">Favoritos</label>
      </div>
    </template>
      <hr />
    </div>
  </router-link>
</template>

<script>

export default {

  name: "Tarjeta",
  props: {

    id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    publisher: {
      type: String,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },

  },

};

</script>
<style></style>