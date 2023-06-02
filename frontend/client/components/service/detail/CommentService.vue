<template>
  <div class="page-service-comment">
    <div class="page-service-comment-header flex">
      <div class="page-service-comment-header-title">レビュー{{ total }}件</div>
      <div class="star flex items-center">
        <img
          src="@/assets/images/star1.png"
          alt=""
          v-if="parseInt(avgRating) > 0"
        />
        <img
          src="@/assets/images/star1.png"
          alt=""
          v-if="parseInt(avgRating) > 1"
        />
        <img
          src="@/assets/images/star1.png"
          alt=""
          v-if="parseInt(avgRating) > 2"
        />
        <img
          src="@/assets/images/star1.png"
          alt=""
          v-if="parseInt(avgRating) > 3"
        />
        <img
          src="@/assets/images/star1.png"
          alt=""
          v-if="parseInt(avgRating) > 4"
        />
        <span class="amount-star">{{ avgRating }}</span>
      </div>
    </div>
    <div class="page-service-comment-list" v-if="listData.length > 0">
      <div
        v-if="preloadListComment"
        class="sd-preloads flex justify-center items-center"
      >
        <div class="snippet" data-title=".dot-flashing">
          <div class="stage">
            <div class="dot-flashing"></div>
          </div>
        </div>
      </div>
      <div
        class="c-comment-item"
        v-for="(item, index) in listData"
        :key="index"
      >
        <div class="c-comment-item__top flex justify-between">
          <div class="c-comment-item__avatar flex">
            <div class="c-comment-item__avatar-left">
              <img
                :src="
                  item.buyer.profile_image_url_buy === null
                    ? avatarDefault
                    : item.buyer.profile_image_url_buyer
                "
              />
            </div>
            <div class="c-comment-item__avatar-right flex flex-col justify-between">
              <div class="c-comment-item__avatar-right-top flex items-center">
                <img
                  src="@/assets/images/star1.png"
                  alt=""
                  v-if="item.rating > 0"
                />
                <img
                  src="@/assets/images/star1.png"
                  alt=""
                  v-if="item.rating > 1"
                />
                <img
                  src="@/assets/images/star1.png"
                  alt=""
                  v-if="item.rating > 2"
                />
                <img
                  src="@/assets/images/star1.png"
                  alt=""
                  v-if="item.rating > 3"
                />
                <img
                  src="@/assets/images/star1.png"
                  alt=""
                  v-if="item.rating > 4"
                />
                <div class="text-[#f79158] ml-[18px] text-xl font-bold pc-content">
                  {{ item.rating }}
                </div>
              </div>
              <div class="c-comment-item__avatar-right-bottom">
                {{ item.buyer.account_name }}
              </div>
            </div>
          </div>
          <div class="c-comment-item__date-time font-semibold">
            {{
              item.created_at === null
                ? "-"
                : $moment(item.created_at).format("YYYY-MM-DD HH:mm")
            }}
          </div>
        </div>
        <div class="c-comment-item__bottom flex flex-col">
          <div class="text-comment my-3">
            <div
              v-if="item.description"
              v-html="replaceText(item.description)"
            ></div>
          </div>
          <div class="list-image flex my-3">
            <div
              class="list-image-item cursor-pointer"
              v-on:click="showModal(item.id, 0)"
            >
              <img
                :src="item.images[0].path"
                alt=""
                v-if="item.images.length > 0"
              />
            </div>
            <div
              class="list-image-item cursor-pointer"
              v-on:click="showModal(item.id, 1)"
            >
              <img
                :src="item.images[1].path"
                alt=""
                v-if="item.images.length > 1"
              />
            </div>
            <div
              class="list-image-item cursor-pointer"
              v-on:click="showModal(item.id, 2)"
            >
              <img
                :src="item.images[2].path"
                alt=""
                v-if="item.images.length > 2"
              />
            </div>
            <div
              class="list-image-item cursor-pointer"
              v-on:click="showModal(item.id, 3)"
            >
              <img
                :src="item.images[3].path"
                alt=""
                v-if="item.images.length > 3"
              />
            </div>
          </div>
          <div
            class="text-reply flex items-center"
            v-on:click="openSelect(index)"
            v-if="item.seller_reply != '' && item.seller_reply != null"
          >
            {{
              isActive.findIndex((item) => item === index) !== -1
                ? "出品者からの返信を非表示にする"
                : "出品者からの返信を読む"
            }}
            <BootstrapIcon
              icon="chevron-down"
              size="sm"
              class="mx-2"
              :class="
                isActive.findIndex((item) => item === index) !== -1
                  ? 'closeS'
                  : 'openS'
              "
            />
          </div>
          <div
            :class="
              isActive.findIndex((item) => item === index) !== -1
                ? 'block'
                : 'hidden'
            "
            class="flex reply-comment my-3 items-center cursor-pointer"
          >
            <img
              :src="
                item.seller.profile_image_url_seller
                  ? item.seller.profile_image_url_seller
                  : avatarDefault
              "
            />
            <div class="mx-2 text-[#E79C3A] text-[14px] font-semibold">
              {{ item.seller.account_name }}
            </div>
          </div>
          <div
            class="text-comment my-3"
            :class="
              isActive.findIndex((item) => item === index) !== -1
                ? 'block'
                : 'hidden'
            "
          >
            <div
              v-if="item.seller_reply"
              v-html="replaceText(item.seller_reply)"
            ></div>
          </div>
        </div>
      </div>
      <SDPagination
        v-if="totalComment > 1"
        :totalpage="totalComment"
        :currentPage="currentPage"
        v-on:update-page="updatePage"
      />
      <!-- <button
        class="button-viewall flex items-center"
        v-if="listData.length < total"
        v-on:click="viewAll()"
      >
        View All
        <img src="@/assets/images/iconArrowRight.png" />
      </button>
      <button
        class="button-viewall flex items-center"
        v-if="listData.length === total"
        v-on:click="viewDefault()"
      >
        隠れる
        <img src="@/assets/images/iconArrowRight.png" />
      </button> -->
    </div>
    <b-modal
      hide-footer
      hide-header
      v-model="isShowModal"
      size="xl"
      id="modal-detail-image"
      ><div class="modal-image-header flex justify-end">
        <div class="header-btn-close" v-on:click="hideModal()">
          <SDIcon icon="x-lg" />
        </div>
      </div>
      <div class="modal-image-middle">
        <b-container>
          <b-row>
            <b-col cols="2" class="relative">
              <div class="middle-btn-prev" v-on:click="prevStep()">
                <SDIcon icon="chevron-left" />
              </div>
            </b-col>
            <b-col cols="8">
              <Carousel
                :settings="settingsRecommend"
                :wrap-around="true"
                ref="myCarousel"
                v-if="listImageSlide.length !== 0"
              >
                <Slide
                  v-for="(item, index) in listImageSlide"
                  :key="index"
                  class="slide-detail"
                >
                  <img :src="item.path" alt="" />
                  <div class="font-bold my-[50px]">
                    {{ index + 1 + "/" + listImageSlide.length }}
                  </div>
                </Slide>
              </Carousel>
            </b-col>
            <b-col cols="2" class="relative">
              <div class="middle-btn-next" v-on:click="nextStep()">
                <SDIcon icon="chevron-right" />
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div class="modal-image-footer flex">
        <b-container>
          <b-row class="flex justify-center">
            <b-col
              cols="2"
              v-for="(item, index) in listImageSlide"
              :key="index"
            >
              <img
                :src="item.path"
                alt=""
                v-on:click="nextSlide(index)"
                :class="
                  isActiceImage.findIndex((item1) => item1 === index) !== -1
                    ? 'active'
                    : ''
                "
              />
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-modal>
  </div>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import avatarDefault from "@/assets/images/ellipse.png";
import imageTest from "@/assets/images/image1.png";
import { ServiceStore } from "@/store/service/index.ts";
import { mapState } from "pinia";
import SDPagination from "@/components/SDPagination";
import SDIcon from "@/components/SDIcon";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {
  name: "CommentService",
  setup() {
    const serviceStore = ServiceStore();
    const myCarousel = ref();
    return {
      serviceStore,
      myCarousel,
    };
  },
  computed: {
    ...mapState(ServiceStore, ["listReviewByService", "detailService"]),
  },
  created() {
    this.viewDefault();
  },
  watch: {
    detailService() {
      this.serviceDetail = this.detailService;
      if (this.serviceDetail.avg_reviews) {
        this.avgRating = this.serviceDetail.avg_reviews;
      } else {
        this.avgRating = 0;
      }
    },

    listReviewByService() {
      this.preloadListComment = false;
      this.listData = this.listReviewByService.data;
      this.totalComment = this.listReviewByService.last_page;
      this.listRating = this.listData.map((item) => item.rating);
      this.seller_reply = this.listRating.seller_reply;
      this.total = this.listReviewByService.total;
      if (this.listData.length === 0) {
        this.avgRating = 0;
      }
    },
  },
  data() {
    return {
      serviceDetail: {},
      preloadListComment: false,
      avatarDefault,
      imageTest,
      listData: [],
      listRating: [],
      avgRating: 0,
      sumRating: null,
      isActive: [],
      total: "",
      currentPage: 1,
      totalComment: "",
      isShowModal: false,
      isActiceImage: [],
      listImageSlide: [],
      settingsRecommend: {
        itemsToShow: 1,
        snapAlign: "start",
        // autoplay: 2000,
        slideTo: 2,
      },
    };
  },
  components: {
    BootstrapIcon,
    SDPagination,
    Carousel,
    Slide,
    Navigation,
    Pagination,
    SDIcon,
  },
  methods: {
    replaceText(data) {
      return data.replace(/(?:\r\n|\r|\n)/g, "<br>");
    },

    openSelect(index) {
      const checkValue = this.isActive.findIndex((item) => item === index);
      if (checkValue !== -1) {
        this.isActive.splice(checkValue, 1);
      } else {
        this.isActive.push(index);
      }
    },

    viewAll() {
      const dataForm = {
        id: this.$route.params.idService,
        per_page: this.total,
      };
      this.serviceStore.getListReviewByService(dataForm);
    },

    viewDefault() {
      const dataForm = {
        id: this.$route.params.idService,
        per_page: 3,
        page: 1,
      };
      this.serviceStore.getListReviewByService(dataForm);
    },

    updatePage(page) {
      this.preloadListComment = true;
      this.currentPage = page;
      const dataForm = {
        id: this.$route.params.idService,
        per_page: 3,
        page: this.currentPage,
      };
      this.serviceStore.getListReviewByService(dataForm);
    },

    showModal(id, index) {
      this.listData.map((item) => {
        if (item.id === id) {
          this.listImageSlide = item.images;
        }
      });
      this.isActiceImage = [index];
      this.isShowModal = true;
      this.myCarousel.slideTo(index);
    },

    hideModal() {
      this.isShowModal = false;
    },

    nextSlide(index) {
      this.myCarousel.slideTo(index);
      const checkValue = this.isActiceImage.findIndex((item) => item === index);
      this.isActiceImage.splice(checkValue, 1, index);
    },

    nextStep() {
      this.myCarousel.next();
      this.isActiceImage.map((item) => {
        if (item < 3) {
          this.isActiceImage = [];
          this.isActiceImage.push(item + 1);
        } else {
          this.isActiceImage = [];
          this.isActiceImage.push(0);
        }
      });
    },

    prevStep() {
      this.myCarousel.prev();
      this.isActiceImage.map((item) => {
        if (item < 1) {
          this.isActiceImage = [];
          this.isActiceImage.push(4);
        } else {
          this.isActiceImage = [];
          this.isActiceImage.push(item - 1);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pc-content {
  @include screen(01023) {
    display: none!important;
  }
}
.sp-content {
  @include screen(1024) {
    display: none!important;
  }
}
.list-image {
  @include screen(01023) {
    overflow: scroll;
    max-width: 100%;
  }
  &-item {
    margin-right: 10px !important;
    width: unset !important;
    min-width: 130px;
    img {
      width: 169px;
      height: 151px;
      object-fit: cover;
      margin-right: 10px !important;
      @include screen(991) {
        width: 100%;
        //height: 40px;
        margin-left: 0;
      }
    }
  }
}
</style>
