import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    listPokemons: [],
    searchPokemons: [],
    dataPokemon: null,
    formPokemon: null,
    evoPokemon: null,
    filter: {
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
          name: 'Mega',
          offset: 930,
          limit: 58,
          // Needs to remove other pokemons
        },
        {
          name: 'Gigantamax',
          offset: 1083,
          limit: 35,
          // Needs to remove other pokemons
        }
      ]
    },
    
  },
  getters: {
    listPokemons (state) {
      return state.listPokemons
    },
    searchPokemons (state) {
      return state.searchPokemons
    },
    dataPokemon(state) {
      return state.dataPokemon
    },
    evoPokemon(state) {
      return state.evoPokemon
    },
    formPokemon(state) {
      return state.formPokemon
    },
    gens(state) {
      return state.filter.gens
    },
    forms(state) {
      return state.filter.forms
    },
    transformation(state) {
      return state.filter.transformation
    }
  },
  mutations: {
    SET_POKEMONS(state, payload){
      state.listPokemons = []
      setTimeout(() => {
        state.listPokemons = payload.data.results
      }, 10);
      
    },
    SET_DATA_POKEMON(state, payload){
      state.dataPokemon = payload
    },
    SET_FORM_POKEMON(state, payload) {
      state.formPokemon = payload
    },
    SET_EVO_POKEMON(state, payload){
      state.evoPokemon = payload
    },
    SET_SEARCH_POKEMONS(state, payload) {
      state.searchPokemons = payload.data.results
    } ,
    SET_SEARCH_RESULTS(state, payload) {
      
      state.listPokemons = []
      setTimeout(() => {
        state.listPokemons = payload
      }, 10);
    } 
  },
  actions: {
    GET_POKEMONS: async(context, payload) => {
      // total = 898
      const limit = payload.limit
      const offset = payload.offset
      const list = await axios.get('https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+offset)
      context.commit('SET_POKEMONS', list)
    },
    GET_DATA_POKEMON: async(context, payload) => {
      const id = payload
      const result = await axios.get('https://pokeapi.co/api/v2/pokemon/'+id)

      const urlDesc = result.data.species.url
      const urlForm = result.data.forms[0].url

      const description = await axios.get(urlDesc)
      const form = await axios.get(urlForm)

      // set pokemon info
      let formName, originalName
      
      if(form.data.form_names.length === 0) {
        console.log('')
        formName == null
        originalName = description.data.names.find(object => object.language.name === 'en').name
      } else {
        formName = form.data.names.find(object => object.language.name === 'en').name
      }
      const name = formName ? formName : originalName
      
      const data = [
        { 
          id: id,
          name: name,
          types: result.data.types,
          height: result.data.height,
          weight: result.data.weight,
          desc: description.data.flavor_text_entries.find(e => e.language.name === 'en').flavor_text,
          evo: description.data.evolution_chain.url,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          // img: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png` 
        }
      ]

      // set transformation/regional forms
      const array = description.data.varieties
      let varieties = []
      for(let i = 0; i < array.length; i++) {
        console.log(array[i])

        let condition = array[i].is_default === true || array[i].pokemon.name.includes('mega') || array[i].pokemon.name.includes('gmax') || array[i].pokemon.name.includes('alola') || array[i].pokemon.name.includes('galar')

          if(condition) {
            // console.log('object: ', )
            
            const name = array[i].pokemon.name.split("-");
            let formName
            if(name.length === 2) {
              formName = name[1]+' '+name[0]
            } else if(name.length === 2) {
              formName = name[1]+' '+name[0]+' '+name[2]
            } else {
              formName = name[0]
            }

            const url = array[i].pokemon.url
            // console.log('url: ', url)
            const id = url.split('/')[6];
            // console.log('id: ', id)

            const item = {
              id: id,
              name: formName,
              img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            }

            varieties.push(item)
          }
      }
      context.commit('SET_DATA_POKEMON', data)
      context.commit('SET_FORM_POKEMON', varieties)
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
    GET_SEARCH_POKEMONS: async(context) =>  {
      const list = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=898&offset=0')
      context.commit('SET_SEARCH_POKEMONS', list)
    }, 
    GET_SEARCH_RESULT(context, payload) {
      
        const searchPokemons = context.state.searchPokemons
        const searchResult = searchPokemons.filter(item => item.name.includes(payload))
        context.commit('SET_SEARCH_RESULTS', searchResult)
      
    }
  },
  // strict: true
})
