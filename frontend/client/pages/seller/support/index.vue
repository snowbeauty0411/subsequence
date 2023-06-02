<template>
  <div class="supportPage flex flex-col">
    <div class="supportPage-content">
      <div class="supportPage-content-title flex items-end">
        <div class="title-main">後ほどサポートよりご案内致します</div>
        <!-- <div class="title-description">Application Completed</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import SDIcon from "@/components/SDIcon";
export default {
  data() {
    return {};
  },
  components: {
    SDIcon,
  },
  methods: {},
};
definePageMeta({
  layout: "seller",
});
</script>


<style lang="scss" scoped>
.supportPage {
  padding: 30px 100px;

  &-content {
    @include screen(767) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding: 30px;
    }
    @include screen(480) {
      padding: 20px;
    }
    &-title {
      .title-main {
        font-size: 22px;
        color: #5e5c5c;
        font-weight: 600;
        @include screen(480) {
          font-size: 16px;
        }
      }
      .title-description {
        margin-left: 20px;
        font-size: 14px;
        color: #5e5c5c;
        @include screen(480) {
          font-size: 12px;
        }
      }
    }
  }
}
</style>