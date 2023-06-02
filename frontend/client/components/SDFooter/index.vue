<template>
  <div class="sdFooter">
    <b-container fluid>
      <b-row>
        <b-col
          cols="12"
          lg="5"
          class="
            sdFooter-subscription-service
            text-white
            flex flex-col
            justify-center
            items-center
            py-5
          "
        >
          <Nuxt-link to="/">
            <img src="@/assets/images/subsQ_logo2.svg" class="img-footer" />
          </Nuxt-link>
          <!-- <div>
            <p class="mt-4 xsm:text-[12px] text-[14px]">
              サブスクマッチングサービスのサブスキュー
            </p>
          </div> -->
        </b-col>
        <b-col
          cols="12"
          lg="5"
          class="sdFooter-contact-item flex lg:justify-center items-center py-5"
        >
          <ul class="sdFooter-list xsm:text-[12px]">
            <li class="sdFooter-item">
              <NuxtLink to="/help" class="sdFooter-link text-white">
                ヘルプセンター
              </NuxtLink>
            </li>
            <li class="sdFooter-item">
              <NuxtLink to="/contact" class="sdFooter-link text-white">
                お問い合わせ
              </NuxtLink>
            </li>
            <li class="sdFooter-item sdFooter-item--pc-only">
              <NuxtLink to="/policy" class="sdFooter-link text-white">
                プライバシーポリシー
              </NuxtLink>
            </li>
            <li class="sdFooter-item sdFooter-item--pc-only">
              <NuxtLink to="/term" class="sdFooter-link text-white">
                利用規約
              </NuxtLink>
            </li>
            <li class="sdFooter-item sdFooter-item--pc-only">
              <NuxtLink
                to="/operating-company"
                class="sdFooter-link text-white"
              >
                運営会社
              </NuxtLink>
            </li>
            <li class="sdFooter-item sdFooter-item--pc-only">
              <NuxtLink
                to="/specified-commercial"
                class="sdFooter-link text-white"
              >
                特定商取引法に基づく表⽰
              </NuxtLink>
            </li>
          </ul>
        </b-col>
        <b-col
          cols="12"
          lg="2"
          class="
            sdFooter-icon
            text-white text-center
            py-5
            flex flex-col
            items-center
            xsm:text-[16px]
          "
        >
          <a href="#" class="my-2"
            ><img src="@/assets/images/facebookF.svg"
          /></a>
          <a href="#" class="my-2"><img src="@/assets/images/cameraF.svg" /></a>
          <a href="#" class="my-2"
            ><img src="@/assets/images/twitterF.svg"
          /></a>
        </b-col>
        <ul class="sdFooter-spMenu flex flex-wrap justify-center">
          <li>
            <NuxtLink to="/term" class="sdFooter-link text-white">
              利用規約
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/policy" class="sdFooter-link text-white">
              プライバシーポリシー
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/operating-company"
              class="sdFooter-link text-white"
            >
              運営会社
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/specified-commercial"
              class="sdFooter-link text-white"
            >
              特定商取引法に基づく表⽰
            </NuxtLink>
          </li>
        </ul>
        <div
          class="
            text-center
            w-full
            text-white
            sdFooter-text
            py-4
            xsm:text-[12px]
          "
        >
          Copyright©Stucco Co.Ltd., All Rights Reserved.
        </div>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: "Footer",
  components: {},
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.sdFooter {
  @include screen(01023) {
    padding-top: 20px;
  }
  background-image: linear-gradient(
    to right,
    #fc8757,
    #fc8758,
    #fd8f77,
    #fe948a,
    #ff9691
  );
  height: 100%;
  &-subscription-service {
    font-weight: bold;
    letter-spacing: 1px;
    .img-footer {
      width: 200px;
      @include screen(991) {
        width: 130px;
      }
    }
    @include screen(991) {
      padding: 10px 0 !important;
    }
  }
  &-contact-item {
    font-weight: bold;
    padding-left: 118px;
    @include screen(01199) {
      padding-left: 20px;
      padding-right: 20px;
    }
    @include screen(991) {
      padding: 10px 15px !important;
    }
    @include screen(480) {
      padding: 10px 15px !important;
    }
    .sdFooter-list {
      line-height: 38px;
      .sdFooter-item {
        list-style: none;
        @include screen(01023) {
          font-size: 16px;
        }
        a {
          text-decoration: none;
        }
        &--pc-only {
          @include screen(01023) {
            display: none!important;
          }
        }
      }
    }
  }
  &-icon {
    font-size: 24px;
    @include screen(991) {
      padding: 10px 0 !important;
      flex-direction: row !important;
      justify-content: center;
    }
    @include screen(480) {
      padding: 10px 0 !important;
      flex-direction: row !important;
      justify-content: center;
    }
    a {
      color: $white;
      cursor: pointer;
      display: block;
      @include screen(991) {
        padding: 10px 20px;
      }
      @include screen(480) {
        margin: 10px 20px;
      }
    }
  }
  &-text {
    //border-top: 1px solid $graybland;
  }
  &-spMenu {
    font-size: 12px;
    max-width: 350px;
    margin: 20px auto;
    li {
      margin: 5px 8px;
    }
  }
}
</style>
