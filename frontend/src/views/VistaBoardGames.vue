<template>
  <div>
    <div v-if="loading">Cargando....</div>
    <div v-else>
      <h1>Boardgames</h1>
         <b-button :to="'/Boardgames/Agregar}' " class="mx-1">Agregar</b-button>
      <div v-for="boardgame in boardgames" :key="boardgame.BID">
        <hr />
          <Tarjeta
            :key="boardgame.BID"
            :id="boardgame.BID"
            :name="boardgame.BName"
            :publisher="boardgame.Publisher"
            :year="boardgame.BYear"
          />
      </div>
    </div>
  </div>
</template>

<script>
import Tarjeta from '../components/Tarjeta.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'VistaBoardGames',
  components: {
    Tarjeta
  },
  computed: {
        ...mapState(['boardgames','loading','favoritos'])
    },
  methods: {
    ...mapActions(["listar"]),
  },
  mounted() {
    this.listar();
  },
};
</script>

