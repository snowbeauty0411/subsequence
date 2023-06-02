<template>
  <div
    class="input-group border rounded-pill bg-white p-2 pr-3 pl-3 sd-shadow"
    v-bind:class="sdClass"
  >
    <input
      v-model.trim="keyword"
      v-bind:type="type"
      v-bind:style="sdInputStyle"
      v-bind:placeholder="placeholder"
      v-bind:disabled="disabled"
      v-bind:readonly="isReadOnly"
      v-on:value="value"
      @keyup.down="$emit('onArrowDown')"
      @keyup.up="$emit('onArrowUp')"
      @keypress.enter="$emit('onEnter')"
      v-on:keyup.enter="$emit('handle-search', keyword)"
      @input="$emit('handle-change', keyword)"
      aria-describedby="button-search-bar"
      class="form-control bg-none border-0 input-search"
    />
    <div class="input-group-append border-0">
      <button
        id="button-search-bar"
        type="button"
        class="btn sd-text-gray"
        v-on:click="$emit('handle-search', keyword)"
        style="cursor: default !important"
      >
        <img src="@/assets/images/iconSearch.png" />
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "SDSearchBar",
  props: {
    placeholder: {
      type: String,
      default: "最寄り駅を入力",
    },
    disabled: {
      type: Number,
      default() {
        return 0;
      },
    },
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
    sdClass: {
      type: String,
      default: "",
    },
    isReadOnly: {
      type: Boolean,
      default: false,
    },
    sdInputStyle: {
      type: String,
      default: "",
    },
    keyword: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // keyword: "",
    };
  },
};
</script>
<style lang="scss">
.sd-shadow {
  box-shadow: 0 0 5pt 0.5pt rgb(0 0 0 / 15%);
  z-index: 2;
}
.sd-text-gray {
  color: #5e5c5c;
}
.input-search {
  &::placeholder {
    color: #5e5c5c;
  }
}
</style>
