<template>
  <ul class="new-services">
    <template v-for="(item, itemIndex) in itemsData" :key="itemIndex">
      <li v-if="itemIndex < 2">
        <a @click="redirectToDetailService(item.hash_id)" :key="itemIndex">
          <div class="image">
            <div class="favourite">
              <button
                class="btn btn-favourite"
                v-bind:class="{ liked: item.is_favorite }"
                @click="addServiceFavorite(item.id)"
                :disabled="!detail"
              >
                <img
                  v-if="item.is_favorite"
                  src="@/assets/images/iconWhiteHeart.png"
                />
                <img v-else src="@/assets/images/iconHeart.png" />
              </button>
            </div>
            <span class="c-area">
              <img
                src="@/assets/images/iconLocation.png"
                alt="location_ico"
                width="12"
              />{{ item.area }}</span
            >
            <Carousel :wrap-around="true" :autoplay="5000" v-if="item.images.length > 1">
              <template v-for="(image, imageIndex) in item.images"
              :key="imageIndex">
              <template v-if="image">
                <Slide>
                  <img :src="image" :alt="item.name + '_' + imageIndex" />
                </Slide>
              </template>
              </template>
              <template #addons>
                <Pagination class="custom-pagination" />
              </template>
            </Carousel>
            <img  v-else :src="item.images[0]" :alt="item.name" />
          </div>
          <div class="text">
            <h3>{{ item.name }}</h3>
            <h5 class="rating">
              <span
                >{{ item.avg_reviews }}
                <img
                  src="@/assets/images/iconStar.png"
                  alt="rating_start"
                  width="15"
              /></span>
            </h5>
            <p>
              {{ item.service_content }}
            </p>
            <ul class="tag" v-if="item.tags">
              <li v-for="t in item.tags" :key="t.id">#{{ t.name }}</li>
            </ul>
          </div>
        </a>
      </li>
    </template>
  </ul>
</template>

<script>
import { SearchStore } from "@/store/search";
import { useToast } from "vue-toastification";
import { mapState } from "pinia";
import { Carousel, Slide, Pagination } from "vue3-carousel";
import Cookies from "js-cookie";

export default {
  name: "NewServicesSP",
  data() {
    return {
      isActive: false,
      liked: 1,
      account_id: "",
      detail: true,
      itemsData: [],   
    };
  },
  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    let token = null;
    let type = "";

    if (rememberLogin === "true") {
      token = localStorage.getItem("token_user");
      type = localStorage.getItem("type");
    } else {
      token = Cookies.get("token_user");
      type = Cookies.get("type");
    }
    if (token && type === "BUYER") {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  },
  setup() {
    const searchStore = SearchStore();
    const toast = useToast();
    return {
      searchStore,
      toast,
    };
  },
  props: {
    itemsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    ...mapState(SearchStore, [
      "successFavorite",
      "messageFavorite",
      "errorFavorite",
    ]),
  },

  watch: {
    successFavorite() {
      if (this.searchStore.successFavorite === true) {
        this.toast.success(this.searchStore.messageFavorite, this.optionToast);
        this.searchStore.successFavorite = "";
        this.searchStore.messageFavorite = "";
        this.$emit("successFavorite");
        this.detail = true;
      }
    },

    errorFavorite() {
      if (this.searchStore.errorFavorite === true) {
        this.toast.error(this.searchStore.messageFavorite, this.optionToast);
        this.searchStore.errorFavorite = "";
        this.searchStore.messageFavorite = "";
        this.detail = true;
      }
    },
  },

  components: {
    Carousel,
    Slide,
    Pagination,
  },
  methods: {
    redirectToDetailService(id) {
      if (this.detail) {
        this.$router.push(`/service/detail/${id}`);
      }
    },

    async addServiceFavorite(id) {
      this.detail = false;
      let rememberLogin = localStorage.getItem("rememberLogin");
      if (rememberLogin === "true") {
        this.account_id = localStorage.getItem("account_id");
      } else {
        this.account_id = Cookies.get("account_id");
      }
      const request = {
        buyer_id: Number(this.account_id),
        id: Number(id),
      };
      await this.searchStore.registerFavoriteService(request);
      this.detail = true;
    },

    changeImageArray(){
      const result = this.itemsList.map((item) => {
        return {
          ...item,
          images: item.images.filter((x) => x),
        };
      });
      this.itemsData = result;
      return this.itemsData;
    }
  },
  mounted() {
    this.changeImageArray();
  }
};
</script>

<style lang="scss" scoped>
.new-services {
  @include screen(01199) {
    margin: 25px auto;
    max-width: 600px;
    & > li {
      &:not(:last-child) {
        margin-bottom: 15px;
      }
      a {
        display: flex;
        align-items: flex-start;
      }
      p {
        font-size: 14px;
        letter-spacing: 0px;
        color: #7e7d7d;
        font: normal normal bold 14px/25px NotoSansCJKjp-Medium;
        font-weight: 500;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* number of lines to show */
        line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
    .favourite {
      position: absolute;
      bottom: 3%;
      right: 3%;
      z-index: 2;
    }
    .image {
      position: relative;
      z-index: 2;
      width: 48.8%;
      max-width: 230px;
      &::before {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
      & > img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        top: 0;
        left: 0;
        z-index: -1;
      }
      .carousel {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
          .carousel__pagination {
            position: absolute;
            margin: 0;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 0);
          }
        &__viewport {
          height: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
    .text {
      flex: 1;
      padding-left: 13px;
      h3 {
        font-size: 18px;
        text-align: left;
        letter-spacing: 0.9px;
        color: #5e5c5c;
        font: normal normal normal 18px/29px NotoSansCJKjp-Bold;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        height: 30px;
        max-height: 30px;
        text-transform: uppercase;
      }
    }
    .rating {
      width: 80px;
      span {
        width: 100%;
        background: transparent
          linear-gradient(
            270deg,
            #fc8757 0%,
            rgba(248, 138, 82, 0.968627451) 11%,
            rgba(239, 147, 69, 0.8784313725) 47%,
            rgba(233, 153, 60, 0.8196078431) 78%,
            rgba(231, 156, 58, 0.8) 100%
          )
          0% 0% no-repeat padding-box;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0.45px;
        border-radius: 15px;
        padding: 3px 10px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        img {
          margin-left: 10px;
        }
      }
    }
    .tag {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: clip;
      color: #a4a4a0;
      font-size: 12px;
      li {
        margin: 0 4px 8px;
      }
    }
    .rating,
    p {
      margin-top: 5px;
    }
  }
  @include screen(10241365) {
    margin: 40px auto;
    & > li {
      &:not(:last-child) {
        margin-bottom: 25px;
      }
      a {
        display: flex;
      }
      p {
        font-size: 16px;
        letter-spacing: 0px;
        color: #7e7d7d;
        font: normal normal bold 14px/25px NotoSansCJKjp-Medium;
        font-weight: 500;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* number of lines to show */
        line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
    .favourite {
      position: absolute;
      bottom: 3%;
      right: 3%;
      z-index: 2;
    }
    .image {
      position: relative;
      z-index: 2;
      width: 48.8%;
      max-width: 230px;
      &::before {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
      & > img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        top: 0;
        left: 0;
        z-index: -1;
      }
      .carousel {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        .carousel__pagination {
          position: absolute;
          margin: 0;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 0);
        }
      }
    }
    .text {
      flex: 1;
      padding-left: 25px;
      h3 {
        font-size: 18px;
        text-align: left;
        letter-spacing: 0.9px;
        color: #5e5c5c;
        font: normal normal normal 18px/29px NotoSansCJKjp-Bold;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        height: 30px;
        max-height: 30px;
        text-transform: uppercase;
      }
    }
    .rating {
      width: 80px;
      span {
        width: 100%;
        background: transparent
          linear-gradient(
            270deg,
            #fc8757 0%,
            rgba(248, 138, 82, 0.968627451) 11%,
            rgba(239, 147, 69, 0.8784313725) 47%,
            rgba(233, 153, 60, 0.8196078431) 78%,
            rgba(231, 156, 58, 0.8) 100%
          )
          0% 0% no-repeat padding-box;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0.45px;
        border-radius: 15px;
        padding: 3px 10px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        img {
          margin-left: 10px;
        }
      }
    }
    .tag {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: clip;
      color: #a4a4a0;
      font-size: 12px;
      li {
        margin: 0 4px 8px;
      }
    }
    .rating,
    p {
      margin-top: 5px;
    }
  }
}
</style>
