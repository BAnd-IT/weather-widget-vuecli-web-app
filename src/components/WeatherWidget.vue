<template>
  <div class="weather-widget">
    <WeatherWidgetSettings v-if="editing" />
    <WeatherWidgetView v-else />
  </div>
</template>

<script>
import WeatherWidgetSettings from "./WeatherWidgetSettings/WidgetSettings";
import WeatherWidgetView from "./WeatherWidgetView";

import { mapGetters } from "vuex";

export default {
  name: "weather-widget",

  components: {
    WeatherWidgetSettings,
    WeatherWidgetView,
  },

  props: {},

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      editing: "GET_EDITING",
    }),
  },

  mounted() {
    this.$store.commit("UPDATE_LOCATIONS");
    this.$store.dispatch("check");
  },

  methods: {},
};
</script>

<style lang="scss">
.weather-widget {
  position: relative;
  padding: 0 18px;
  min-height: 228px;

  background-image: repeating-linear-gradient(180deg, #496f9b 0, #9599b9);
  color: #fff;

  svg {
    fill: currentColor;
  }
}
</style>
