<template>
  <div class="app">
    <WeatherWidget />
  </div>
</template>

<script>
import WeatherWidget from "./components/WeatherWidget";

export default { name: "App", components: { WeatherWidget } };
</script>

<style lang="scss">
.app {
  max-width: 400px;
  margin: 0 auto;
}
</style>
