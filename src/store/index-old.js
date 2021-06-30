import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    listPokemons: null,
    dataPokemon: null,
    evoPokemon: null,
    gens: [
      {
        gen: 1,
        name: "Kanto",
        offset: 0,
        limit: 151,
      },
      {
        gen: 2,
        name: "Johto",
        offset: 151,
        limit: 100,
      },
      {
        gen: 3,
        name: "Hoenn",
        offset: 251,
        limit: 135,
      },
      {
        gen: 4,
        name: "Sinnoh",
        offset: 386,
        limit: 107,
      },
      {
        gen: 5,
        name: "Unova",
        offset: 493,
        limit: 156,
      },
      {
        gen: 6,
        name: "Kalos", 
        offset: 649,
        limit: 72,
      },
      {
        gen: 7,
        name: "Alola", 
        offset: 721,
        limit: 88,
      },
      {
        gen: 8,
        name: "Galar", 
        offset: 809,
        limit: 89,
      }
    ],
    forms:[
      { 
        name: "Alola", 
        offset: 988,
        limit: 25,
        // need to remove some pokemons
      },
      {
        name: "Galar", 
        offset: 1055,
        limit: 20,
      }
    ],
    transformation: [
      {
        transform: 'Mega',
        offset: 930,
        limit: 58,
        // Needs to remove other pokemons
      },
      {
        transform: 'Gigantamax',
        offset: 1083,
        limit: 35,
        // Needs to remove other pokemons
      }
    ]
  },
  getters: {
    listPokemons (state) {
      return state.listPokemons
    },
    dataPokemon(state) {
      return state.dataPokemon
    },
    evoPokemon(state) {
      return state.evoPokemon
    }, 
    gens(state) {
      return state.gens
    },
    forms(state) {
      return state.forms
    }
  },
  mutations: {
    SET_POKEMONS(state, payload){
      state.listPokemons = payload.data.results
    },
    SET_DATA_POKEMON(state, payload){
      state.dataPokemon = payload
    },
    SET_EVO_POKEMON(state, payload){
      state.evoPokemon = payload
    }
  },
  actions: {
    GET_POKEMONS: async(context, payload) => {
      // total = 898
      
      // const gens = context.state.gens
      // const object = gens.find(item => item.name === payload);
      const limit = payload.limit
      const offset = payload.offset

      const list = await axios.get('https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+offset)
      context.commit('SET_POKEMONS', list)
    },
    GET_DATA_POKEMON: async(context, payload) => {
      const id = payload
      const result = await axios.get('https://pokeapi.co/api/v2/pokemon/'+id)
      const description = await axios.get('https://pokeapi.co/api/v2/pokemon-species/'+id)
      
      // let id
      // switch (payload.length) {
      //   case 1:
      //     id = '00' + payload
      //     break;
      //   case 2:
      //       id = '0' + payload
      //       break;
      //   default:
      //     id = payload
      //     break;
      // }

      const data = [
        { 
          id: id,
          name: result.data.name,
          types: result.data.types,
          height: result.data.height,
          weight: result.data.weight,
          desc: description.data.flavor_text_entries.find(e => e.language.name === 'en').flavor_text,
          evo: description.data.evolution_chain.url,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          // img: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`
        }
      ]
      context.commit('SET_DATA_POKEMON', data)
    },
    GET_EVO_POKEMON: async(context, url) => {
      const chain = await axios.get(url)
      let data = null
      if(chain.data.chain.evolves_to.length > 0) {
        data = []
        let evoData = chain.data.chain
        // let index = 0

        while (evoData) {
          const url = evoData.species.url
          let id = url.split('/')[6];
          let imageID
          switch (id.length) {
            case 1:
              imageID = '00' + id
              break;
            case 2:
              imageID = '0' + id
              break;
            default:
              imageID = id
              break;
          }

          data.push({ 
            id: id,
            imageID: imageID,
            name: evoData.species.name
          });
          
          evoData = evoData.evolves_to[0];
        }

        // console.log('evoData ddd: ', evoData)
        
        // const chainLength = evoData.evolves_to.length

        // for(let i = 0; i < chainLength; i++) {
        //   const url = evoData.evolves_to[i].species.url
        //   let urlID = url.split('/')[6];
        //   let id
        //   switch (urlID.length) {
        //     case 1:
        //       id = '00' + urlID
        //       break;
        //     case 2:
        //       id = '0' + urlID
        //       break;
        //     default:
        //       id = urlID
        //       break;
        //   }

        //   data.push({ 
        //     id: id,
        //     urlID: urlID,
        //     name: evoData.evolves_to[i].species.name
        //   });
        // }
      }
      context.commit('SET_EVO_POKEMON', data)
    },
    
  },
  // strict: true
})
