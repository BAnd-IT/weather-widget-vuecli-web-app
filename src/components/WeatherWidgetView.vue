<template>
  <div class="widget-view">
    <button class="widget-view__settings-button" @click="toggleEditing">
      <svg viewBox="0 0 24 24">
        <path
          d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z"
        />
      </svg>
    </button>
    <div class="widget-view__content">
      <div class="widget-view__item" v-for="item in weather" :key="item.id">
        <!-- Current location -->
        <div class="widget-view__location">
          {{ `${item.name}, ${item.sys.country}` }}
        </div>

        <!-- Current weather -->
        <div class="widget-view__weather">
          <img
            class="widget-view__weather-icon"
            :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
            alt="weather"
          />
          <p class="widget-view__weather-text">
            {{ Math.round(item.main.temp) }}°C
          </p>
        </div>

        <!-- Current description -->
        <div class="widget-view__description">
          {{
            `Feels like ${Math.round(item.main.feels_like)}. ${
              item.weather[0].main
            } (${item.weather[0].description})`
          }}
        </div>

        <!-- Current other data -->
        <div class="widget-view__other">
          <ul class="widget-view__other-list">
            <li class="other-data-item" title="Wing direction & speed">
              <i
                ><svg
                  viewBox="0 0 24 24"
                  :style="`transform: rotate(${item.wind.deg + 180}deg)`"
                >
                  <path
                    d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z"
                  /></svg
              ></i>
              <p>{{ `${item.wind.speed} m/s` }}</p>
            </li>

            <li class="other-data-item" title="Pressure">
              <i
                ><svg viewBox="0 0 24 24">
                  <path
                    d="M9,7H13A2,2 0 0,1 15,9V11A2,2 0 0,1 13,13H11V17H9V7M11,9V11H13V9H11M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
                  /></svg
              ></i>
              <p>{{ item.main.pressure }}hPa</p>
            </li>

            <li class="other-data-item" title="Humidity">
              <i
                ><svg viewBox="0 0 24 24">
                  <path
                    d="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z"
                  /></svg
              ></i>
              <p>{{ item.main.humidity }}%</p>
            </li>

            <li class="other-data-item" title="Visibility">
              <i
                ><svg viewBox="0 0 24 24">
                  <path
                    d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"
                  /></svg
              ></i>
              <p>{{ item.visibility }}km</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "weather-widget-view",

  computed: {
    ...mapGetters({
      weather: "GET_WEATHER",
      editing: "GET_EDITING",
    }),
  },

  methods: {
    toggleEditing() {
      this.$store.commit("TOGGLE_EDITING", true);
    },
  },
};
</script>

<style lang="scss">
.widget-view {
  padding: 16px 0;

  &__content {
    margin: -24px 0;
  }

  &__item {
    padding: 24px 0;

    &:not(:last-child) {
      border-bottom: 1px dotted #fff;
    }
  }

  &__location {
    font-size: 18px;
  }

  &__weather {
    display: flex;
    justify-content: center;

    &-text {
      font-size: 38px;
      line-height: 100px;
      margin: 0;
    }
  }

  &__description {
    text-align: center;
  }

  &__other {
    &-list {
      display: flex;
      flex-wrap: wrap;

      .other-data-item {
        display: flex;
        width: 50%;
        margin-top: 8px;

        i {
          @include block-size(24px, 24px);
          margin-right: 6px;
        }

        p {
          margin: 0;
        }
      }
    }
  }

  &__other-list {
    @include list-reset;
  }

  &__settings-button {
    @include button-reset;
    position: absolute;
    top: 12px;
    right: 12px;
    @include block-size(24px, 24px);
  }
}
</style>
