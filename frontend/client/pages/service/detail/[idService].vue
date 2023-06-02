<template>
  <NuxtLayout name="toppage"
    ><div class="page-service w-full">
      <Header />
      <div class="page-service-sp-box">
        <ContentService />
        <RatePlan />
        <FlowService />
        <Map />
        <CommentService />
        <RecommendService />
        <LinkService />
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
import ContentService from "@/components/service/detail/ContentService";
import Header from "@/components/service/detail/Header";
import RatePlan from "@/components/service/detail/RatePlan";
import FlowService from "@/components/service/detail/FlowService";
import Map from "@/components/service/detail/Map";
import CommentService from "@/components/service/detail/CommentService";
import RecommendService from "@/components/service/detail/RecommendService";
import LinkService from "@/components/service/detail/LinkService";

export default {
  name: "Detail Service",
  // created() {
  //   window.scrollTo(0, 0);
  // },
  components: {
    ContentService,
    Header,
    RatePlan,
    FlowService,
    Map,
    CommentService,
    RecommendService,
    LinkService,
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/service/index.scss";

.page-service {
  @include screen (1280) {
    padding: 0;
    max-width: 600px;
    margin: 0 auto;
    &-header {
      padding: 0;
      &-img {
        max-width: 100vw;
        overflow: hidden;
        .img-main {
          .carousel {
            max-width: 100vw;
            img {
              max-width: 100vw;
            }
          }
          position: relative;
        }
      }
      &-title,
      &-detail,
      &-footer {
        padding-left: 30px;
        padding-right: 30px;
      }
    }
    &-sp-box {
      padding: 0 30px;
    }
  }
}
</style>
