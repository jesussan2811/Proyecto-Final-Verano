<template>
    <div>
        {{$route.params.id}}
        <h1>Boardgame Detalle</h1>
        <h2>ID: {{boardgame.BID}}</h2>
        <h3>Nombre: {{boardgame.BName}}</h3>
        <h3>Marca: {{boardgame.Publisher}}</h3>
        <h3 v-if="boardgame.Category == '11'">Categoria: Adventure</h3>
        <h3 v-if="boardgame.Category == '12'">Categoria: Puzzle</h3>
        <h3 v-if="boardgame.Category == '13'">Categoria: Strategy</h3>
        <h3 v-if="boardgame.Category == '14'">Categoria: Fantasy</h3>
        <h3 v-if="boardgame.Category == '15'">Categoria: Civilization</h3>
        <h3>Descripcion: {{boardgame.BDescription}}</h3>
        <h3>Fecha de lanzamiento: {{boardgame.BYear}}</h3>
        <h3 v-if="boardgame.FID">Es un Favorito</h3>
        <h3 v-else>...</h3>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'VistaDetalle',
    data(){
        return{
            bgame:{
                id:this.$route.params.id,
            }
        }
    },
    computed: {
        ...mapState(['boardgame','bgame'])
    },
    methods: {
        ...mapActions(['obtenerboardgame'])
    },
    created() {
        this.obtenerboardgame(this.bgame)
    }
}
</script>