import PokemonCard from './card.js'
let headerImgArray = document.querySelectorAll('.randomImgbox')
console.log(headerImgArray)

const app = new Vue({
    el: '#app',
    data: {
        //頁首照片
        headerSettings: {
            mainImg: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/890.png',
            leftFirstImg:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/231.png',
            lefSecondstImg:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png',
            leftThirdtImg:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/120.png',
            rightFirstImg:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/034.png',
            rightSecondImg:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/621.png',
            rightThirdImg:'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/569.png',
        },
        //for Pokemon
        pokemonData:{
            PokemonJSONUrl:'https://raw.githubusercontent.com/jacko1114/Homeworks/main/Pokemon/js/pokemons.json',
            //storage pokemon
            pokemonArray:[],
            //pokemon which you sellect
            currentPokemon:{
                index:'',
                id:'',
                name:'',
                hp:'',
                attack:'',
                defense:'',
                sp_attack:'',
                sp_defense:'',
                speed:'',
                img:'',
                //屬性
                type:'',
                //for 進化
                evolution:'',
                evolutionImg:'',
                //for 基礎
                genus:'',
                genusImg:''
            },
            // wanna show
            cardArray:[],
            //show the current card, default 0
            cardIndex:0,

        } 
    },
    // created is while new Vue , will do the methods whose announce bellow it, before mounted
    created(){
        this.getpokemonData()
        this.randomImg()
    },
    methods:{
        getpokemonData(){
            axios.get(this.pokemonData.PokemonJSONUrl)
                .then(res=>{
                    console.log(res)
                    if(res.status == 200 && Array.isArray(res.data)){
                        this.pokemonData.pokemonArray = res.data.map((item,index) =>({
                            index:index,
                            //if the id is less than 100 , add "0" before the number like "003"
                            id:item.id.toString().padStart(3,"0"),
                            name:item.name.chinese,
                            hp:item.base.HP,
                            attack: item.base.Attack,
                            defense: item.base.Defense,
                            sp_attack: item.base["Sp_Attack"],
                            sp_defense: item.base["Sp_Defense"],
                            speed: item.base.Speed,
                            img: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${item.id.toString().padStart(3, "0")}.png`,
                            type: item.type,
                            evolution: item.evolution[0].name,
                            evolutionImg:`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${item.evolution[0].id.toString().padStart(3, "0")}.png`,
                            genus: item.genus,
                        }))
                    }
                })
                .catch(err=>console.log(err))
        },
        showModalData(index){
            this.pokemonData.currentPokemon = this.pokemonData.pokemonArray[index]
        },
        addOneCard(){
            if(this.pokemonData.cardIndex > this.pokemonData.pokemonArray.length -1) return
            this.pokemonData.cardArray.push(this.pokemonData.pokemonArray[this.pokemonData.cardIndex])
            this.pokemonData.cardIndex++
        },
        removeOneCard(){
            if(this.pokemonData.cardIndex == 0) return
            this.pokemonData.cardIndex = this.pokemonData.cardArray.length
            this.pokemonData.cardArray.splice(this.pokemonData.cardIndex - 1,1)
            console.log(this.pokemonData.cardIndex)

        },
        addAllCard(){
            this.pokemonData.cardArray = this.pokemonData.pokemonArray
            this.pokemonData.cardIndex = this.pokemonData.pokemonArray.length
        },
        removeAllCard(){
            this.pokemonData.cardArray = [],
            this.pokemonData.cardIndex = 0
        },
        randomImg(){
            headerImgArray.forEach(element => {
                let number = Math.random(2,809)*100
                let random = Math.floor(number).toString().padStart(3,"0")
                console.log(element)
                element.innerHTML = `<img class="ramdomImg" src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${random}.png" alt="">`
            });
        },
        showRandomPokemons(){
            this.pokemonData.cardArray = []
            this.pokemonData.cardIndex = 0
            
            do{
                let randNum = Math.floor((Math.random(2,809)*100))
                this.pokemonData.cardArray.push(this.pokemonData.pokemonArray[randNum])
                this.pokemonData.cardIndex++
                console.log(this.pokemonData.cardIndex)
            }while(this.pokemonData.cardArray.length < 15){
                let randNum = Math.floor((Math.random(2,809)*100))
                if(!(this.pokemonData.cardArray).includes(randNum)){
                    this.pokemonData.cardArray.push(this.pokemonData.pokemonArray[randNum])
                }
            }
        }
    },
    components:{
        'pokemon':PokemonCard
    }
})