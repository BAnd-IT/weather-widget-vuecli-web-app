<template>
  <div class="locations-list__list">
    <div
      v-for="item in locations"
      :key="item.id"
      class="locations-list__item js-draggable"
      :data-id="item.location_id"
    >
      <div class="locations-list__item-tile">
        <div class="locations-list__item-drag-action js-draggable-handle">
          <svg viewBox="0 0 24 24">
            <path
              d="M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z"
            />
          </svg>
        </div>
        <div class="locations-list__item-location">
          <div>{{ `${item.city}, ${item.country}` }}</div>
        </div>
        <div class="locations-list__item-action">
          <button
            @click="removeLocationItem(item)"
            class="locations-list__item-delete-button"
          >
            <svg viewBox="0 0 24 24">
              <path
                d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Sortable } from "@shopify/draggable";

export default {
  name: "locations-list",

  computed: {
    ...mapGetters({
      locations: "GET_LOCATIONS",
    }),
  },

  mounted() {
    const sortable = new Sortable(this.$el, {
      draggable: ".js-draggable",
      handle: ".js-draggable-handle",
      delay: 250,
      mirror: {
        constrainDimensions: true,
      },
    });

    sortable.on("sortable:stop", () => {
      setTimeout(() => {
        const orderedLocations = this.$el.querySelectorAll(".js-draggable");
        const ids = Array.prototype.map.call(
          orderedLocations,
          (el) => el.dataset.id
        );

        const newLocationsOrder = this.locations.sort(
          (a, b) => ids.indexOf(a.location_id) - ids.indexOf(b.location_id)
        );

        this.$store.dispatch("setLocalStorageLocations", newLocationsOrder);
        this.$store.commit("UPDATE_WEATHER", ids);
      });
    });

    this.$on("hook:destroyed", () => {
      sortable.destroy();
    });
  },

  methods: {
    removeLocationItem(item) {
      // Remove weather data
      let index = this.locations.findIndex((e) => e.id == item.id);
      this.$store.commit("REMOVE_WEATHER", index);

      // Remove location
      let locations = this.locations.filter((e) => e.id !== item.id);
      this.$store.dispatch("setLocalStorageLocations", locations);

      // User removed all locations
      if (!this.locations[0]) {
        this.$store.dispatch("check");
      }
    },
  },
};
</script>

<style lang="scss">
.locations-list {
  margin: -4px 0;

  &__item {
    padding: 4px 0;

    &-tile {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      padding: 8px;
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 4px;
    }

    &-drag-action {
      cursor: move;
    }

    &-delete-button {
      @include button-reset;
    }

    &-drag-action,
    &-delete-button {
      @include block-size(24px, 24px);
      flex-grow: 0;
      flex-shrink: 1;
    }

    &-location {
      flex-grow: 1;
      flex-shrink: 0;
      user-select: none;
    }
  }
}
</style>