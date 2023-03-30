<template>
  <div class="add-location-form">
    <form class="add-location-form__tile" @submit.prevent="addLocation()">
      <div class="add-location-form__input">
        <input
          class="ui-input"
          :class="{ 'ui-input--error': error }"
          type="text"
          v-model="city"
          placeholder="Type location..."
          @blur="onCityInput"
          @keyup="onCityInput"
        />
        <div v-if="error" class="add-location-form__error">{{ error }}</div>
      </div>
      <div class="add-location-form__action">
        <button class="ui-button" type="submit" :disabled="!city">
          <svg viewBox="0 0 24 24">
            <path
              d="M19,7V11H5.83L9.41,7.41L8,6L2,12L8,18L9.41,16.58L5.83,13H21V7H19Z"
            />
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "add-location-form",

  data() {
    return {
      city: null,
      error: null,
    };
  },

  computed: {
    ...mapGetters({
      locations: "GET_LOCATIONS",
    }),
  },

  methods: {
    isUnique(locations, city) {
      return locations.filter(
        (e) => e.city.toLowerCase() === city.toLowerCase()
      );
    },

    onCityInput(event) {
      if (this.error) {
        this.error = null;

        if (event.ctrlKey || event.keyCode == 32) {
          return;
        }
      }
    },

    addLocation() {
      if (this.isUnique(this.locations, this.city).length == 0) {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=6d7941780ab2639cb20864db54125426`
          )
          .then((r) => {
            const city = r.data.name;
            const country = r.data.sys.country;
            const id = new Date();
            let new_location = {
              city: city,
              country: country,
              location_id: id,
            };
            this.locations.push(new_location);
            this.$store.dispatch("setLocalStorageLocations", this.locations);
            this.$store.dispatch("getWeather", new_location);
            this.city = null;
          })
          .catch((error) => {
            console.log(error);
            this.city = null;
            this.error = "City not found";
          });
      } else {
        this.error = "City already present, choose another";
        this.city = null;
      }
    },
  },
};
</script>

<style lang="scss">
.add-location-form {
  &__tile {
    display: flex;
    flex-wrap: nowrap;
  }

  &__input {
    padding-right: 4px;
    flex-grow: 1;

    .ui-input {
      @include input-reset;
      border: 1px solid #fff;
      border-radius: 4px;
      height: 40px;
      padding: 8px;

      &::placeholder {
        color: currentColor;
        opacity: 0.5;
      }

      &--error {
        border-color: red;
      }
    }
  }

  &__error {
    font-size: 12px;
    color: red;
  }

  &__action {
    padding-left: 4px;

    .ui-button {
      @include button-reset;
      @include block-size(40px, 40px);
      padding: 4px;
      border: 1px solid #fff;
      border-radius: 4px;
      transition: 0.35s ease;
    }
  }
}
</style>