<template>
  <div v-bind:class="sdClass">
    <label for>タグ</label>
    <div class="input-wrapper form-group">
      <input
        v-model="model"
        class="space-left-input-wrapper"
        v-bind:style="sdInputStyle"
        v-bind:placeholder="placeholder"
        v-bind:disabled="disabled"
        v-bind:type="type"
        v-bind:readonly="isReadOnly"
        v-on:value="value"
        v-on:keyup.enter="$emit('add-tag', model)"
      />
    </div>
    <div class="tag">
      <div class="tag-item" v-for="(tag, index) in tags" :key="index">
        <span class="tag-item-icon" v-if="index == 0" v-on:click="$emit('remove-tag', tag)">
          <SDIcon icon="Minus" />
        </span>
        <span class="tag-item-text">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SDFormTag",
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: String,
      default() {
        return "false";
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
    tags: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      model: this.value,
    };
  },
  watch: {
    value() {
      this.model = this.value;
    },
  },
  async created() {},
  methods: {},
};
</script>

<style lang="scss">
.input-wrapper {
  display: inline-block;
  position: relative;
  width: 100%;
}
.space-left-input-wrapper {
  padding-left: 33px !important;
  padding-right: 33px !important;
  font-size: 16px !important;
  border-radius: 8px !important;
  height: 50px !important;
  border: 1px solid #5e5c5c;
  font-size: unset;
  color: #7e7d7d;
  width: 100%;
  &:focus {
    box-shadow: unset;
    border: 1px solid #e79c3a !important;
    outline: none;
  }
}

.tag {
  display: flex;

  &-item {
    background: #e79c3a 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 2px #4d4d4d33;
    border-radius: 17px;
    padding: 0 15px;
    position: relative;
    margin-right: 10px;

    &-icon {
      position: absolute;
      right: -5px;
      top: -10px;
      background: #cccbcb 0% 0% no-repeat padding-box;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
      svg {
        color: $white;
      }
    }

    &-text {
      font-size: 14px;
      color: $white;
    }
  }
}
</style>
