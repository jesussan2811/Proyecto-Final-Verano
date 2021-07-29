<template>
  <div class="home">
    <h1>Vista Favoritos</h1>
    <Tabla :items="favoritos" :busy="loading" :fields="fields">

    </Tabla>

  </div>
</template>

<script>
import Tabla from '../components/Tabla.vue';
import {mapState, mapActions} from 'vuex'
export default {
  name: 'Home',
  components: {
    Tabla
  },
  data() {
    return {
       fields: [
        {key: 'FID', label: 'id'},
        {key: 'BName', label: 'nombre'},
        {key: 'Publisher', label: 'marca'},
        {key: 'Category', label: 'categoria'},

        {
          key: 'BYear',
          label: 'año',
          formatter: value => {
            return value || "----"
          }
        },
        'acciones'
      ]
    }
  },
  computed: {
    ...mapState(['favoritos', 'loading'])
  },
methods: {
    ...mapActions(['listarFavorites']),
            
  },
  mounted() {
    this.listarFavorites();
  }
}


</script>
