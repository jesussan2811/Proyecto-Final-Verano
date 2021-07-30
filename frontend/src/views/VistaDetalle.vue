<template>
    <div>
        {{$route.params.id}}
        <h1>Boardgame Detalle</h1>
        <h2>ID: {{boardgame.ID}}</h2>
        <h3>Nombre: {{boardgame.BName}}</h3>
        <h3>Marca: {{boardgame.Publisher}}</h3>
        <h3>Categoria: {{categoria}}</h3>
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
        return{categoria: ""}
    },
    computed: {
        ...mapState(['boardgame']),
        verCategoria(boardgame) {
            switch(boardgame.Category){
                case "11":
                    return{categoria: "Adventure"};
                case "12":
                    return{categoria: "Puzzle"};
                case "13":
                    return{categoria: "Strategy"};
                case "14":
                    return{categoria: "Fantasy"};
                case "15":
                    return{categoria: "Civilization"};

            }
        }
    },
    methods: {
        ...mapActions(['obtenerboardgame'])
    },
    created() {
        this.obtenerboardgame(this.$route.params.id)
    }
}
</script>