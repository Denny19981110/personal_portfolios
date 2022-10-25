export default{
    props:{
        pokemon:{
            type:Object,
            //defalut, if you not require data
            default:function(){
                return{
                    id:'006',
                    name:'噴火龍',
                    img:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png'
                }
            }
            // or you can use 
            // require:true
        }
    },
    //子組件方法
    methods:{
        showPokemon(){
            this.$emit('show-modal')
        }
    },
    //card template
    template:`
        <div class="col-6 col-md-4 col-lg-3 my-3">
                <div class="card ">
                    <div class="card-body p-0">
                        <div class="card-img">
                            <img :src="pokemon.img" class="card-img-top">
                        </div>
                        <h5 class="card-title rounded bg-dark text-light d-flex p-1 ">
                            <span class="pokemon-id pl-2">{{pokemon.id}}</span>
                            <span>．</span>
                            <span class="pokemon-name">{{ pokemon.name }}</span>
                        </h5>
                    </div>
                    <div class="card-footer text-center bg-light border-0">
                        <a href="#" class="btn" data-toggle="modal" data-target=".modal" @click="showPokemon" >詳細資訊</a>
                    </div>
                </div>
            </div>
        `
}