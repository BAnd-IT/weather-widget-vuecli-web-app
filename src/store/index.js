import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    editing: false,
    weather: [],
    locations: [],
  },
  getters: {
    GET_LOCATIONS(state) {
      return state.locations;
    },

    GET_WEATHER(state) {
      return state.weather;
    },

    GET_EDITING(state) {
      return state.editing;
    },
  },
  mutations: {
    TOGGLE_EDITING: (state, value) => {
      state.editing = value;
    },

    UPDATE_LOCATIONS(state) {
      let locations = JSON.parse(localStorage.getItem("locations"));
      locations !== null
        ? (state.locations = locations)
        : (state.locations = []);
    },

    UPDATE_WEATHER(state, ids) {
      state.weather.sort(
        (a, b) => ids.indexOf(a.location_id) - ids.indexOf(b.location_id)
      );
    },

    ADD_WEATHER(state, data) {
      state.weather.push(data);
    },

    REMOVE_WEATHER(state, index) {
      state.weather.splice(index, 1);
    },
  },
  actions: {
    setLocalStorageLocations({ commit }, locations) {
      localStorage.setItem("locations", JSON.stringify(locations));
      commit("UPDATE_LOCATIONS");
    },

    async check({ state, dispatch }) {
      if (!state.locations[0]) {
        await dispatch("getUserLocaiton").then((user_location) => {
          let locations = [
            {
              city: user_location.city,
              country: user_location.country,
              location_id: new Date(),
            },
          ];
          dispatch("setLocalStorageLocations", locations);
        });
      }

      dispatch("loadData");
    },

    async getUserLocaiton() {
      try {
        let response = await axios.get(
          `https://ipinfo.io/json?token=${process.env.VUE_APP_IPINFO_API_TOKEN}`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async loadData({ state, dispatch }) {
      for (let i = 0; i < state.locations.length; i++) {
        const location = {
          city: state.locations[i].city,
          country: state.locations[i].country,
          location_id: state.locations[i].location_id,
        };

        await dispatch("getWeather", location);
      }
    },

    async getWeather({ commit }, payload) {
      try {
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${payload.city},${payload.country}&units=metric&appid=${process.env.VUE_APP_OPENWEATHERMAP_API_TOKEN}`
          )
          .then((response) => {
            let newWeather = response.data;
            newWeather.location_id = payload.location_id;
            commit("ADD_WEATHER", newWeather);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});

export default store;

