<template>
  <div class="widget-settings">
    <button class="widget-settings__close-button" @click="toggleEditing">
      <svg viewBox="0 0 24 24">
        <path
          d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
        />
      </svg>
    </button>

    <div class="widget-settings__content">
      <div class="widget-settings__heading">Settings</div>

      <div class="widget-settings__locations">
        <LocationsList />
      </div>

      <div class="widget-settings__form">
        <AddLocationForm />
      </div>
    </div>
  </div>
</template>

<script>
import LocationsList from "./LocationsList";
import AddLocationForm from "./AddLocationForm";

export default {
  name: "widget-settings",

  components: {
    LocationsList,
    AddLocationForm,
  },

  methods: {
    toggleEditing() {
      this.$store.commit("TOGGLE_EDITING", false);
    },
  },
};
</script>

<style lang="scss">
.widget-settings {
  padding: 16px 0;

  &__content {
    margin: -8px 0;
  }

  &__heading,
  &__locations,
  &__form {
    padding: 8px 0px;
  }

  &__heading {
    font-size: 18px;
  }

  &__close-button {
    @include button-reset;
    position: absolute;
    top: 12px;
    right: 12px;
    @include block-size(24px, 24px);
  }
}
</style>
