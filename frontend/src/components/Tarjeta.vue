<template>
  <router-link :to="`/Boardgames/Detalle/${id}`">
    <div>
      <h5>Name:{{ name }}</h5>
      <h5>Publisher:{{ publisher }}</h5>
      <h5>Year:{{ year }}</h5>

    <template slot="actions" slot-scope="{item}">
         <b-button :to="`/Boardgames/Editar/${item.id}`" class="mx-1">Editar</b-button>
         <b-button @click="eliminar(item.id)" class="mx-1">Eliminar</b-button>
         <div class="form-check form-check-inline">
           
        <input type="checkbox" id="checkbox" v-model="fav" @click="favorito">
        <label for="checkbox">{{ checked }}</label>

        <label class="form-check-label" for="Favoritos">Favoritos</label>
      </div>
    </template>
      <hr />
    </div>
  </router-link>
</template>

<script>
import {mapState, mapActions} from 'vuex' 
export default {

  name: "Tarjeta",
  props: {

    id: {
      type: Number,
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

    fav: {
      type: Boolean,
    },

  },
  methods: {
    ...mapActions(['eliminarBoardgame']),
    eliminar(idItem) {
      this.$bvModal.msgBoxConfirm('Esta opción no se puede deshacer.', {
          title: '¿Desea eliminar el BoardGame?',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'ACEPTAR',
          cancelTitle: 'CANCELAR',
          footerClass: 'p-2',
          hideHeaderClose: true,
          centered: true
        })
          .then(value => {
            if(value) {
              this.eliminarBoardgame({
                id: idItem,
                onComplete: (response) => {
                  this.$notify({
                    type: 'success',
                    title: response.data.mensaje
                  });
                  this.$router.push({
                name: 'VistaBoardGames'
                 })
                }
              })
            }
          })
          .catch(err => {
            // An error occurred
          })

    },
    favorito 
  },

};

</script>
<style></style>