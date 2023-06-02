<template>
  <div class="service-card relative">
    <a @click="redirectToDetailService(id)">
      <article class="card mb-2">
        <div
          class="service-card-head relative"
          :style="'background-image: url(' + dataImg[0] + ')'"
          v-if="Array.isArray(dataImg)"
        >
          <div class="area flex items-center">
            <img src="@/assets/images/iconLocation.png" class="mx-2" />
            <p>
              {{ area }}
            </p>
          </div>
          <div class="favourite" v-if="isActive">
            <button
              type="button"
              class="btn btn-favourite"
              v-bind:class="{ liked: isLike }"
              v-on:click="addServiceFavorite(idService)"
            >
              <img v-if="isLike" src="@/assets/images/iconWhiteHeart.png" />
              <img v-else src="@/assets/images/iconHeart.png" />
            </button>
          </div>
        </div>
        <div
          class="service-card-head relative"
          :style="'background-image: url(' + dataImg + ')'"
          v-else :src="dataImg"
        >
          <div class="area flex items-center">
            <img src="@/assets/images/iconLocation.png" class="mx-2" />
            <p>
              {{ area }}
            </p>
          </div>
          <div class="favourite" v-if="isActive">
            <button
              type="button"
              class="btn btn-favourite"
              v-bind:class="{ liked: isLike }"
              v-on:click="addServiceFavorite(idService)"
            >
              <img v-if="isLike" src="@/assets/images/iconWhiteHeart.png" />
              <img v-else src="@/assets/images/iconHeart.png" />
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="service-card-top w-100">
            <h4 class="title">
              <span>{{ name }}</span>
              <div class="avg_review flex">
                <span class="flex items-center justify-center"
                  >{{ star }} <img src="@/assets/images/iconStar.png"
                /></span>
              </div>
          </h4>
            <p class="text">
              {{ caption }}
            </p>
            <h5 class="price">
              {{ formatPrice(parseInt(price)) }} /
              <span>{{ cycle === null ? "週" : cycle+'〜' }}</span>
            </h5>
          </div>
          <div
            class="service-card-bottom flex justify-between items-center w-full"
          >
            <div class="avg_review flex">
              <span class="flex items-center justify-center"
                >{{ star }} <img src="@/assets/images/iconStar.png"
              /></span>
            </div>
            <div
              class="hashTag list-tag flex flex-wrap items-center"
              v-if="tags.length > 0"
            >
              <div v-for="(tag, index) in tags" :key="index" class="mx-2">
                <div v-if="index < 4">#{{ tag.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </a>
  </div>
</template>
<script>
import { SearchStore } from "@/store/search";
import { useToast } from "vue-toastification";
import { mapState } from "pinia";
import Cookies from "js-cookie";

export default {
  name: "SDServiceCard",

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

  data() {
    return {
      isActive: false,
      liked: 1,
      account_id: "",
      detail: true,
      dataImg: null
    };
  },

  props: {
    id: {
      type: String,
      default() {
        return "";
      },
    },
    idService: {
      type: Number,
      default() {
        return "";
      },
    },
    area: {
      type: String,
      default() {
        return "";
      },
    },
    imgUrl: {
      type: [String, Array],
      default() {
        return [];
      },
    },
    isLike: {
      type: Number,
      default() {
        return 0;
      },
    },
    name: {
      type: String,
      default() {
        return "";
      },
    },
    caption: {
      type: String,
      default() {
        return "";
      },
    },
    price: {
      type: Number,
      default() {
        return 0;
      },
    },
    star: {
      type: String,
      default() {
        return "0";
      },
    },
    tags: {
      type: Array,
      default() {
        return [];
      },
    },
    cycle: {
      type: String,
      default() {
        return "";
      },
    },

    cycle_format: {
      type: String,
      default() {
        return "";
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
        this.detail = true
      }
    },

    errorFavorite() {
      if (this.searchStore.errorFavorite === true) {
        this.toast.error(this.searchStore.messageFavorite, this.optionToast);
        this.searchStore.errorFavorite = "";
        this.searchStore.messageFavorite = "";
        this.detail = true
      }
    },
  },

  components: {},

  methods: {
    redirectToDetailService(id) {
      if (this.detail) {
        this.$router.push(`/service/detail/${id}`);
      }
    },
    formatPrice(value) {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(value);
    },

    async addServiceFavorite(id) {
      this.detail = false
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
      this.detail = true
    },
    checkDataImg(){
      if(Array.isArray(this.imgUrl)){
        const result = this.imgUrl.filter(x=>x);
        this.dataImg = result;
      }else{
        this.dataImg = this.imgUrl;
      }
      return this.dataImg;
    }
  },
  mounted() {
    this.checkDataImg()
  }
};
</script>
<style lang="scss">
.service-card {
  margin: 0 10px;
  width: 100%;
  @include screen(1280) {
    width: calc(100vw - 10px);
    max-width: 100%;
    overflow: hidden;
  }
  .card {
    border: none;
    width: 100%;
    max-width: 100%;
    box-shadow: 2px 2px 2px #4d4d4d33;
    @include screen (01023) {
      background-color: transparent;
      box-shadow: none;
    }
  }

  &-head {
    width: 100%;
    background-position: center center;
    background-color: $white;
    background-size: cover, 60%;
    object-fit: cover;
    height: 0;
    padding-bottom: 67%;
    .area {
      position: absolute;
      background: transparent
        linear-gradient(
          90deg,
          #fc8757 0%,
          #fc8758 2%,
          #fd8f77 42%,
          #fe948a 76%,
          #ff9691 100%
        )
        0% 0% no-repeat padding-box;
      padding: 5px;
      top: 0;
      right: 0;
      letter-spacing: 2.8px;
      opacity: 0.8;
      max-width: 50%;

      p {
        font-size: 14px;
        color: $white;
        opacity: 1;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .card-body {
    padding: 20px;
    background-color: $white;
    @include screen (01023) {
      background-color: transparent;
      padding: 10px 0px 20px;
    }
  }

  &-top {
    .title {
      @include screen(01023) {
        display: flex!important;
        align-items: baseline;
        justify-content: space-between;
      }
      & > span {
        display: inline-block;
        font-size: 18px;
        text-align: left;
        letter-spacing: 0.9px;
        color: #5e5c5c;
        font: normal normal normal 18px/29px NotoSansCJKjp-Bold;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        height: 30px;
        max-height: 30px;
        flex: 1;
        @include screen(01023) {
          font-size: 16px;
        }
      }
      .avg_review {
        width: 80px;
        font-weight: 600;
        @include screen(1024){
          display: none;
        }
        span {
          width: 100%;
          background: transparent
            linear-gradient(
              270deg,
              #fc8757 0%,
              #f88a52f7 11%,
              #ef9345e0 47%,
              #e9993cd1 78%,
              #e79c3acc 100%
            )
            0% 0% no-repeat padding-box;
          font-size: 18px;
          color: $white;
          letter-spacing: 0.45px;
          border-radius: 15px;
          padding: 3px 10px;
    
          img {
            margin-left: 10px;
          }
    
          svg {
            font-size: 14px;
          }
        }
        @include screen(01023) {
          width: 65px;
          span {
            font-size: 14px;
            img {
              margin-left: 5px;
            }
          }
        }
      }
    }

    .text {
      font-size: 14px;
      letter-spacing: 0px;
      color: #7e7d7d;
      font: normal normal bold 14px/25px NotoSansCJKjp-Medium;
      font-weight: 500;
      text-align: left;
      height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .price {
      text-align: right;
      font-size: 21px;
      font-weight: bold;
      margin-top: 5px;
      color: #5e5c5c;
      @include screen(01023) {
        text-align: left;
        font-size: 16px;
      }
      @include screen(765) {
        font-size: 20px;
      }
    }
  }

  &-bottom {
    height: 50px;
    @include screen(01023) {
      height: unset;
      margin-top: 10px;
    }
    .avg_review {
      width: 80px;
      font-weight: 600;
      @include screen(01023){
        display: none;
      }
    }
    .hashTag {
      width: calc(100% - 80px);
    }
    span {
      width: 100%;
      background: transparent
        linear-gradient(
          270deg,
          #fc8757 0%,
          #f88a52f7 11%,
          #ef9345e0 47%,
          #e9993cd1 78%,
          #e79c3acc 100%
        )
        0% 0% no-repeat padding-box;
      font-size: 18px;
      color: $white;
      letter-spacing: 0.45px;
      border-radius: 15px;
      padding: 3px 10px;

      img {
        margin-left: 10px;
      }

      svg {
        font-size: 14px;
      }
    }
    .list-tag {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: clip;
      color: $gray-700;
      font-size: 18px;
      height: 50px;
      @include screen(01023) {
        font-size: 12px;
        height: auto;
        width: 100%;
      }
    }

    a {
      padding: 0 5px;
      letter-spacing: 0.7px;
      color: #a4a4a0;
      font-size: 14px;
    }
  }
}
.favourite {
  position: absolute;
  right: 20px;
  bottom: 20px;
  @include screen(480) {
    right: 10px;
    bottom: 10px;
  }
  background: $white 0% 0% no-repeat padding-box;
  width: auto;
  height: auto;
  border-radius: 50%;
  opacity: 0.9;
  .btn-favourite {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: $white 0% 0% no-repeat padding-box;
    border-style: initial;
    border: 1px solid rgba(0, 0, 0, 0.15);
    color: #b2b2b2;
    transition: all 0.5s ease;
    opacity: 1;
    padding: 0;
    @include screen(480) {
      width: 35px;
      height: 35px;
    }
    img {
      @include screen(480) {
        width: 50%;
      }
    }

    &:focus {
      outline: none;
      border-color: rgba(0, 0, 0, 0.15);
    }

    &:hover {
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.15);
      color: rgba(0, 0, 0, 0.15);
      background-color: $white;
      border: 1px solid rgba(0, 0, 0, 0.15);
    }

    &.liked {
      border-color: #d93749;
      background: #d93749;

      svg {
        //   animation: heart-grow 0.7s;
        color: $red;
      }

      &:hover {
        @include screen(1200) {
          box-shadow: 0 0 5px 1px rgba(255, 0, 0, 0.15);
          color: rgba(255, 0, 0, 0.15);
          background-color: $white;
          border: 1px solid rgba(255, 0, 0, 0.15);
        }
      }
    }

    svg {
      font-size: 30px;
    }
  }
}

@keyframes shadow-grow {
  0% {
    box-shadow: 0 0;
  }

  50% {
    box-shadow: 0 0 5px 20px rgba(255, 255, 255, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

@keyframes heart-grow {
  0% {
    transform: scale(3);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: scale(1);
  }
}
</style>
