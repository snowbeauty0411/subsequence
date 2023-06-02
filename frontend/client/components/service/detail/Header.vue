<template>
  <div class="page-service-header">
    <PreLoad :preload="preload" />
    <div class="sp-content">
      <div class="page-service-header-img">
        <b-container fluid class="g-0">
          <b-row
            ><b-col lg="6" class="relative mb-4">
              <div
                class="img-main"
                :style="'background-image: url(' + imgService1 + ')'"
                v-on:click="showModal(0)"
              >
                <Carousel
                  :wrap-around="true"
                  :autoplay="5000"
                >
                  <Slide :key="1">                                                            
                    <img :src="imgService1" :alt="serviceDetail.name"/>
                  </Slide>
                  <Slide :key="2" :if="imgService2">                                                            
                    <img :src="imgService2" :alt="serviceDetail.name"/>
                  </Slide>
                  <Slide :key="3" :if="imgService3">                                                            
                    <img :src="imgService3" :alt="serviceDetail.name"/>
                  </Slide>
                  <Slide :key="4" :if="imgService4">                                                            
                    <img :src="imgService4" :alt="serviceDetail.name"/>
                  </Slide>
                  <Slide :key="5" :if="imgService5">                                                            
                    <img :src="imgService5" :alt="serviceDetail.name"/>
                  </Slide>
                  <template #addons>
                    <Pagination class="custom-pagination" />
                  </template>
                </Carousel>
              </div>
              <div class="favourite absolute" v-if="isFavorite">
                <button
                  type="button"
                  class="btn btn-favourite"
                  v-bind:class="{ isLike: isLike }"
                  v-on:click="addServiceFavorite()"
                >
                  <img v-if="isLike" src="@/assets/images/iconWhiteHeart.png" />
                  <img v-else src="@/assets/images/iconHeart.png" />
                </button>
              </div>
            </b-col>
            <b-col lg="6" class="pc-content">
              <b-row>
                <b-col lg="6" cols="6" class="mb-3">
                  <div
                    class="w-full img-element"
                    :style="'background-image: url(' + imgService2 + ')'"
                    v-if="imgService2"
                    v-on:click="showModal(1)"
                  ></div> </b-col
                ><b-col lg="6" cols="6" class="mb-3"
                  ><div
                    class="w-full img-element"
                    :style="'background-image: url(' + imgService3 + ')'"
                    v-if="imgService3"
                    v-on:click="showModal(2)"
                  ></div></b-col
                ><b-col lg="6" cols="6" class="mb-3"
                  ><div
                    class="w-full img-element"
                    :style="'background-image: url(' + imgService4 + ')'"
                    v-if="imgService4"
                    v-on:click="showModal(3)"
                  ></div></b-col
                ><b-col lg="6" cols="6" class="mb-3"
                  ><div
                    class="w-full img-element"
                    :style="'background-image: url(' + imgService5 + ')'"
                    v-if="imgService5"
                    v-on:click="showModal(4)"
                  ></div></b-col
              ></b-row>
            </b-col> </b-row
        ></b-container>
      </div>
    </div>
    <div class="page-service-header-title">
      {{ serviceDetail.caption }}<br />
      「{{ serviceDetail.name }}」
    </div>
    <div class="page-service-header-detail flex flex-col">
      <div class="country flex" v-if="listArea.length == 8">
        <div>全国</div>
      </div>
      <div class="country flex" v-else>
        <div v-for="(item, index) in listArea" :key="index" class="mx-2">
          {{ item }}
        </div>
      </div>
      <div
        class="page-service-header-detail-link flex justify-between items-end"
      >
        <div class="page-service-header-detail-link-left flex flex-wrap">
          <div class="star flex items-center">
            <img
              src="@/assets/images/star1.png"
              alt=""
              v-if="parseInt(serviceDetail.avg_reviews) > 0"
            />
            <img
              src="@/assets/images/star1.png"
              alt=""
              v-if="parseInt(serviceDetail.avg_reviews) > 1"
            />
            <img
              src="@/assets/images/star1.png"
              alt=""
              v-if="parseInt(serviceDetail.avg_reviews) > 2"
            />
            <img
              src="@/assets/images/star1.png"
              alt=""
              v-if="parseInt(serviceDetail.avg_reviews) > 3"
            />
            <img
              src="@/assets/images/star1.png"
              alt=""
              v-if="parseInt(serviceDetail.avg_reviews) > 4"
            />
            <span class="amount-star">{{ serviceDetail.avg_reviews }}</span>
            <span class="amount-vote"
              >({{ serviceDetail.reviews_count }}件)</span
            >
          </div>
          <div class="heart flex items-center">
            <img src="@/assets/images/heart.png" />
            <span class="amount-vote"
              >お気に入り({{ serviceDetail.favorites_count }}件)</span
            >
          </div>
          <div class="share flex items-center" @click="copyLinkDetail()">
            <img src="@/assets/images/share.png" />
            <span class="text-share">シェア</span>
          </div>
        </div>
        <div
          class="page-service-header-detail-link-right flex items-end"
          v-if="serviceDetail.max == null || serviceDetail.max == 0"
        >
          <div class="remaining-text h-[35px]"></div>
        </div>
        <div
          class="page-service-header-detail-link-right flex items-end"
          v-else
        >
          <div class="remaining-text h-[35px]" v-if="serviceDetail.current_quantity >= 0">
            残り{{ serviceDetail.current_quantity }}
          </div>
        </div>
      </div>
    </div>
    <div class="page-service-header pc-content">
      <div class="page-service-header-img">
        <b-container fluid class="g-0">
          <b-row
            ><b-col lg="6" class="relative">
              <div
                class="img-main"
                :style="'background-image: url(' + imgService1 + ')'"
                v-on:click="showModal(0)"
              >
              </div>
              <div class="favourite absolute" v-if="isFavorite">
                <button
                  type="button"
                  class="btn btn-favourite"
                  v-bind:class="{ isLike: isLike }"
                  v-on:click="addServiceFavorite()"
                >
                  <img v-if="isLike" src="@/assets/images/iconWhiteHeart.png" />
                  <img v-else src="@/assets/images/iconHeart.png" />
                </button>
              </div>
            </b-col>
            <b-col lg="6">
              <b-row>
                <b-col lg="6" cols="6" class="mb-3">
                  <div
                    class="w-full img-element"
                    :style="'background-image: url(' + imgService2 + ')'"
                    v-if="imgService2"
                    v-on:click="showModal(1)"
                  ></div> </b-col
                ><b-col lg="6" cols="6" class="mb-3"
                  ><div
                    class="w-full img-element"
                    :style="'background-image: url(' + imgService3 + ')'"
                    v-if="imgService3"
                    v-on:click="showModal(2)"
                  ></div></b-col
                ><b-col lg="6" cols="6" class="mb-3"
                  ><div
                    class="w-full img-element"
                    :style="'background-image: url(' + imgService4 + ')'"
                    v-if="imgService4"
                    v-on:click="showModal(3)"
                  ></div></b-col
                ><b-col lg="6" cols="6" class="mb-3"
                  ><div
                    class="w-full img-element"
                    :style="'background-image: url(' + imgService5 + ')'"
                    v-if="imgService5"
                    v-on:click="showModal(4)"
                  ></div></b-col
              ></b-row>
            </b-col> </b-row
        ></b-container>
      </div>
    </div>
    <div class="page-service-header-footer flex justify-between">
      <div class="page-service-header-footer-left">
        <div class="service-name">{{ serviceDetail.name }}</div>
        <div class="service-head">
          <div class="name">
            <div class="service-restaurant">{{ category }}</div>
          </div>
          <div class="remain">
            <div
              class="remain_area"
              v-if="serviceDetail.max == null || serviceDetail.max == 0"
            >
              <div class="remaining-text h-[35px]"></div>
            </div>
            <div
              class="remain_area"
              v-else
            >
              <div class="remaining-text h-[35px]" v-if="serviceDetail.current_quantity >= 0">
                残り<span>{{ serviceDetail.current_quantity }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="service-info flex items-center">
          <div class="service-info-avatar">
            <Nuxt-Link :to="`/profile/seller/${dataSeller.account_id}`">
              <img
                :src="
                  dataSeller.profile_image_url_sell
                    ? dataSeller.profile_image_url_sell
                    : imgAvatarDefault
                "
              />
            </Nuxt-Link>
          </div>
          <div class="service-info-link flex flex-col justify-between">
            <div class="service-info-link-top">
              <Nuxt-Link
                :to="`/profile/seller/${dataSeller.account_id}`"
                class="hover:text-[#e79c3a]"
              >
                {{ dataSeller.account_name }}
              </Nuxt-Link>
            </div>
            <div class="service-info-link-bottom" v-if="user_type != 'SELLER'">
              <div v-on:click="createThreadChat()" style="cursor: pointer">
                <img src="@/assets/images/sendMail.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-service-header-footer-right flex flex-col">
        <div class="page-service-header-footer-right-button">
          <a :href="dataSeller.url_official">Official site</a>
        </div>
        <div
          class="
            page-service-header-footer-right-socialNetwork
            flex
            justify-center
            w-full
          "
        >
          <a
            :href="`https://www.facebook.com/${dataSeller.url_facebook}`"
            class="mx-2"
            ><img src="@/assets/images/iconFacebook.png"
          /></a>
          <a
            :href="`https://www.instagram.com/${dataSeller.url_instagram}`"
            class="mx-2"
            ><img src="@/assets/images/iconInsta.png"
          /></a>
          <a
            :href="`https://twitter.com/${dataSeller.url_twitter}`"
            class="mx-2"
            ><img src="@/assets/images/iconTwitter.png"
          /></a>
        </div>
      </div>
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
                  <!-- <b-row>
                    <div class="font-bold my-[50px]">
                      {{ index + 1 + "/" + listImageSlide.length }}
                    </div>
                  </b-row> -->
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
          <b-row>
            <div class="font-bold text-center mb-2">
              {{ currentImage + "/" + listImageSlide.length }}
            </div>
          </b-row>
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
                  isActiceImage.findIndex((item) => item === index) !== -1
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
import { ServiceStore } from "@/store/service/index.ts";
import { SearchStore } from "@/store/search/index.ts";
import { ChatStore } from "@/store/chat/index.ts";
import { mapState } from "pinia";
import imgServiceDefault from "@/assets/images/detail1.png";
import imgAvatarDefault from "@/assets/images/ellipse.png";
import { TopPageStore } from "@/store/service/topPage.ts";
import Cookies from "js-cookie";
import PreLoad from "@/components/SDPreLoad";
import { useToast } from "vue-toastification";
import SDIcon from "@/components/SDIcon";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { Message } from "@/utils/message";
export default {
  name: "Header",
  setup() {
    const serviceStore = ServiceStore();
    const searchStore = SearchStore();
    const chatStore = ChatStore();
    const toast = useToast();
    const topPageStore = TopPageStore();
    const myCarousel = ref(null);
    return {
      serviceStore,
      searchStore,
      chatStore,
      toast,
      myCarousel,
      TopPageStore
    };
  },
  components: {
    PreLoad,
    SDIcon,
    Carousel,
    Slide,
    Navigation,
    Pagination,
  },
  computed: {
    ...mapState(ServiceStore, ["detailService"]),
    ...mapState(ChatStore, ["idThreadChat", "success", "message", "error"]),
    ...mapState(SearchStore, [
      "successFavorite",
      "messageFavorite",
      "errorFavorite",
    ]),
  },
  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.token = localStorage.getItem("token_user");
      this.user_type = localStorage.getItem("type");
      this.account_id = localStorage.getItem("account_id");
    } else {
      this.token = Cookies.get("token_user");
      this.user_type = Cookies.get("type");
      this.account_id = Cookies.get("account_id");
    }
    this.getDetail();
  },
  data() {
    return {
      isShowModal: false,
      preload: true,
      remaining: 20,
      serviceDetail: {},
      imgService1: null,
      imgServiceDefault,
      detailRestaurant: {},
      imgService2: null,
      imgService3: null,
      imgService4: null,
      imgService5: null,
      listImage: null,
      dataSeller: {},
      imgAvatarDefault,
      isFavorite: false,
      isLogin: false,
      category: "",
      isLike: false,
      id: "",
      user_type: "",
      optionToast: {
        type: "error",
        position: "top-right",
        duration: 3000,
        keepOnHover: true,
        singleton: true,
        theme: "toasted-primary",
        iconPack: "material",
        fitToScreen: true,
      },
      listArea: [],
      token: "",
      settingsRecommend: {
        itemsToShow: 1,
        snapAlign: "start",
        // autoplay: 2000,
        slideTo: 2,
      },
      listImageSlide: [],
      isActiceImage: [0],
      account_id: null,
      Message: Message.DETAIL,
      currentImage: 1
    };
  },
  watch: {
    detailService() {
      this.preload = true;
      this.serviceDetail = this.detailService;
      this.listImage = this.serviceDetail.images;
      this.dataSeller = this.serviceDetail.seller;
      if (this.listImage && this.listImage.length > 0) {
        this.listImage.forEach((item, index) => {
          this["imgService" + (index + 1)] = item.path;
          if (item.path != null) {
            this.listImageSlide.push(item);
          }
        });
      }
      if (this.detailService.categories.name) {
        this.category = this.detailService.categories.name;
      }
      if (this.serviceDetail.is_favorite == 1) {
        this.isLike = 1;
      } else {
        this.isLike = 0;
      }
      this.id = this.serviceDetail.id;
      if (this.serviceDetail.service_areas.length > 0) {
        this.serviceDetail.service_areas.map((item) => {
          const isExist = this.listArea.indexOf(item.area);
          if (isExist === -1) {
            this.listArea.push(item.area);
          }
        });
      }
      this.preload = false;
    },

    success() {
      if (this.chatStore.success === true) {
        if (this.chatStore.idThreadChat === "") {
          this.chatStore.success = "";
          this.chatStore.message = "";
          if (this.user_type === "BUYER") {
            this.$router.push({
              path: `/buyer/chat/thread/list`,
            });
          } else {
            this.$router.push({
              path: `/seller/chat/thread/list`,
            });
          }
        } else {
          const idThreadChat = this.chatStore.idThreadChat;
          if (this.user_type === "BUYER") {
            this.$router.push({
              path: `/buyer/chat/thread/${idThreadChat}`,
            });
          } else {
            this.$router.push({
              path: `/seller/chat/thread/${idThreadChat}`,
            });
          }
        }
      }
    },

    error() {
      if (this.chatStore.error === true) {
        this.toast.error(this.chatStore.message, this.optionToast);
        this.chatStore.error = "";
        this.chatStore.message = "";
      }
    },

    successFavorite() {
      if (this.successFavorite === true) {
        this.toast.success(this.searchStore.messageFavorite, this.optionToast);
        this.searchStore.successFavorite = "";
        this.searchStore.messageFavorite = "";
        this.getDetail();
      }
    },

    errorFavorite() {
      if (this.errorFavorite === true) {
        this.toast.error(this.searchStore.messageFavorite, this.optionToast);
        this.searchStore.errorFavorite = "";
        this.searchStore.messageFavorite = "";
      }
    },
    
  },
  methods: {
    getRecommenList() {
      if (this.token) {
        this.topPageStore.getRecommendedListLogined(this.account_id);
      } else {
        this.topPageStore.getRecommendedList();
      }
    },

    getSpecialList() {
      this.topPageStore.getSpecialList();
    },

    getHashTagList() {
      this.topPageStore.getHashTagList();
    },

    getNewList() {
      if (this.token) {
        const request = {
          sort: 1,
          buyer_id: this.account_id,
        };
        this.topPageStore.getNewList(request);
      } else {
        const request = {
          sort: 1,
        };
        this.topPageStore.getNewList(request);
      }
    },

    getFeaturedList() {
      if (this.token) {
        const request = {
          sort: 0,
          buyer_id: this.account_id,
        };
        this.topPageStore.getFeaturedList(request);
      } else {
        const request = {
          sort: 0,
        };
        this.topPageStore.getFeaturedList(request);
      }
    },

    async addServiceFavorite() {
      const request = {
        buyer_id: Number(this.account_id),
        id: Number(this.id),
      };
      await this.searchStore.registerFavoriteService(request);
    },

    getDetail() {
      if (this.token) {
        if (this.user_type === "BUYER") {
          this.isFavorite = true;
        } else {
          this.isFavorite = false;
        }
        this.isLogin = true;
        const dataForm = {
          hash_id: this.$route.params.idService === null ? localStorage.getItem("hash_id_detail") : this.$route.params.idService === undefined ? localStorage.getItem("hash_id_detail") : this.$route.params.idService,
          buyer_id: this.account_id,
          is_guest: true,
        };
        this.serviceStore.getDetailServiceByIdLogined(dataForm);
      } else {
        this.serviceStore.getDetailServiceById(this.$route.params.idService);
      }
    },

    copyLinkDetail() {
      const href = window.location.href;
      navigator.clipboard.writeText(href);
      this.toast.success(this.Message.copy_success, this.optionToast);
    },

    createThreadChat() {
      if (this.token) {
        const request = {
          login_type: this.user_type === "BUYER" ? 1 : 2,
          receiver_id: this.serviceDetail.seller_id,
        };
        this.chatStore.createThreadChat(request);
      } else {
        this.$router.push("/login");
      }
    },

    showModal(index) {
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
        if (item < 4) {
          this.isActiceImage = [];
          this.isActiceImage.push(item + 1);
        } else {
          this.isActiceImage = [];
          this.isActiceImage.push(0);
        }
      });

      if(this.currentImage + 1 <= this.listImageSlide.length) {
        this.currentImage++;
      }else{
        this.currentImage = 1
      }
      
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

      if(this.currentImage - 1 >= 1) {
        this.currentImage--;
      }else{
        this.currentImage = this.listImageSlide.length
      }
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
</style>
