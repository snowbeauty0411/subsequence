<template>
  <BootstrapIcon
    v-bind:icon="icon"
    v-bind:size="size"
    :class="sdClass"
  />
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
export default {
  components: { BootstrapIcon },
  name: "SDIcon",
  props: {
    icon: {
      type: String,
      default() {
        return "";
      },
    },
    size: {
      type: String,
      default() {
        return "sm";
      },
    },
    sdClass: {
      type: String,
      default() {
        return "";
      },
    },
  },
};
</script>

<style>
</style>