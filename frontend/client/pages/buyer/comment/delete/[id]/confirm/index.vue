<template>
  <b-container fluid class="page-detete-preview w-full">
    <b-row class="w-full">
      <b-col cols="12" class="flex sm-d-none">
        <div class="mb-5 flex flex-col">
          <div class="page-detete-preview-link flex items-center flex-wrap">
            <div>
              <NuxtLink to="/buyer/service/management">サービス管理</NuxtLink>
            </div>
            <div class="mx-2">
              <BootstrapIcon icon="chevron-right" size="sm" />
            </div>
            <div>
              <NuxtLink
                v-bind:to="
                  '/buyer/service/service-manage/' + detailService.hash_id
                "
                >{{ detailService.name }}</NuxtLink
              >
            </div>
            <div class="mx-2">
              <BootstrapIcon icon="chevron-right" size="sm" />
            </div>
            <div>レビュー削除の確認</div>
          </div>
          <div class="page-detete-preview-text">レビュー削除の確認</div>
          <div class="page-detete-preview-description my-5">
            下記の投稿を削除します。よろしければ、下の「レビューを削除する」ボタンを押してください。
          </div>
        </div>
      </b-col>

      <b-col cols="12" class="flex">
        <div class="mb-5 flex flex-col">
          <div class="page-detete-preview-post flex items-center w-full">
            <div class="post-info flex">
              <div class="post-info-image">
                <img
                  :src="
                    detailService.images.length > 0
                      ? detailService.images[0].path
                      : imgDefault
                  "
                  alt=""
                  v-if="detailService.images"
                />
              </div>
              <div class="post-info-text flex flex-col">
                <div class="post-info-text-top">
                  {{ detailService.service_content }}
                </div>
                <div class="post-info-text-bottom">
                  {{ detailService.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>

      <b-col cols="12" class="flex">
        <div class="page-detete-preview-star mb-5 flex flex-col">
          <div class="page-detete-preview-title">このサービスの評価</div>
          <div
            class="
              page-detete-preview-star-rating
              flex
              justify-center
              relative
              items-center
              flex-row-reverse
            "
          >
            <div class="text-right mx-3 text-[22px] decoration-orange-800">
              {{ detailCommentBuyer.rating }}
            </div>
            <input
              type="radio"
              name="rating"
              id="rating-5"
              checked
              v-if="detailCommentBuyer.rating == 5"
            />
            <label for="rating-5"></label>
            <input
              type="radio"
              name="rating"
              id="rating-4"
              checked
              v-if="detailCommentBuyer.rating == 4"
            />
            <label for="rating-4"></label>
            <input
              type="radio"
              name="rating"
              id="rating-3"
              checked
              v-if="detailCommentBuyer.rating == 3"
            />
            <label for="rating-3"></label>
            <input
              type="radio"
              name="rating"
              id="rating-2"
              checked
              v-if="detailCommentBuyer.rating == 2"
            />
            <label for="rating-2"></label>
            <input
              type="radio"
              name="rating"
              id="rating-1"
              checked
              v-if="detailCommentBuyer.rating == 1"
            />
            <label for="rating-1"></label>
          </div>
        </div>
      </b-col>

      <b-col cols="12" class="flex">
        <div class="page-detete-preview-review mb-5 flex flex-col">
          <div class="page-detete-preview-title">レビュー内容</div>
          <div class="page-detete-preview-textSpecial flex flex-col">
            <b-form-textarea
              id="textarea-rows"
              placeholder="ここに説明文が入ります。"
              rows="6"
              v-model="detailCommentBuyer.description"
              v-bind:disabled="true"
            ></b-form-textarea>
          </div>
        </div>
      </b-col>

      <b-col
        cols="12"
        class="flex"
        v-if="detailCommentBuyer.images && detailCommentBuyer.images.length > 0"
      >
        <div class="page-detete-preview-image mb-5 flex flex-col">
          <div class="page-detete-preview-title">画像</div>
          <div>
            <div class="page-detete-preview-image-list flex">
              <b-col
                cols="3"
                v-for="(image, index) in detailCommentBuyer.images"
                :key="index"
              >
                <img
                  :src="image.path"
                  alt=""
                  class="img-main"
                  style="height: 100px"
                />
              </b-col>
            </div>
          </div>
          <div class="page-detete-preview-description mt-5">
            ・投稿の削除を取り消すことはできませんので、削除は慎重に行ってください。
          </div>
        </div>
      </b-col>

      <b-col cols="12">
        <div class="page-detete-preview-button flex flex-col">
          <b-button
            class="button-submit w-full"
            v-on:click="deleteComment(detailCommentBuyer.id)"
            >レビューを削除する</b-button
          >
          <b-button class="button-preview w-full" v-on:click="goTopPage()"
            >サービス管理TOPに戻る</b-button
          >
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { buyerStore } from "@/store/buyer";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import Cookies from "js-cookie";
import imgDefault from "@/assets/images/detail1.png";

export default {
  setup() {
    const store = buyerStore();
    const toast = useToast();
    return {
      store,
      toast,
    };
  },
  components: {
    BootstrapIcon,
  },
  data() {
    return {
      imgDefault,
      remaining: "",
      detailCommentBuyer: {},
      detailService: {},
      listServiceImage: [],
      listImage: [],
      hash_id: this.$route.params.id,
      account_id: null
    };
  },
  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
    } else {
      this.account_id = Cookies.get("account_id");
    }
    const request = {
      hash_id: this.hash_id,
      buyer_id: this.account_id,
    };
    this.store.getDetailComment(request);
    this.store.getDetailServiceByHashId(this.hash_id);
    if (!localStorage.getItem("id_service")) {
      this.$router.push("/buyer/service/management");
    }
  },
  computed: {
    ...mapState(buyerStore, [
      "success",
      "message",
      "error",
      "detailComment",
      "detailServiceByHashId",
    ]),
  },
  watch: {
    detailComment() {
      this.detailCommentBuyer = this.detailComment;
    },
    detailServiceByHashId() {
      this.detailService = this.detailServiceByHashId;
    },
    success() {
      if (this.store.success === true) {
        this.toast.success(this.store.message, this.optionToast);
        this.store.success === "";
        this.store.message === "";
        this.$router.push("/buyer/comment/delete/completed");
      }
    },
    error() {
      if (this.store.error === true) {
        this.toast.error(this.store.message, this.optionToast);
        this.store.error === "";
        this.store.message === "";
      }
    },
  },
  methods: {
    onChangeTextarea() {
      this.remaining = 250 - this.text.length;
    },
    goTopPage() {
      localStorage.removeItem("id_service");
      this.$router.push("/buyer/service/management");
    },
    deleteComment(id) {
      this.store.deleteComment(id);
    },
  },
};
definePageMeta({
  layout: "buyer",
});
</script>

<style lang="scss" scoped>
.page-detete-preview {
  .sm-d-none{
    @include screen(480){
      display: none;
    }
  }
  padding: 0 100px;
  @include screen(991) {
    padding: 0 20px;
  }
  &-text {
    font-size: 22px;
    font-weight: 600;
    color: $gray-800;
    @include screen(480){
      display: none;
    }
  }
  &-link {
    font-size: 14px;
    font-weight: 600;
    color: $gray-800;
    margin-bottom: 50px;
    margin-top: 30px;
    @include screen(480){
      display: none;
    }
  }
  &-post {
    .post-info {
      @include screen(480) {
        flex-direction: column !important;
      }
      &-image {
        width: 120px;
        height: 120px;
        max-width: unset;
      }
      &-text {
        margin-left: 30px;
        color: $gray-800;
        @include screen(480) {
          margin-left: unset;
          margin-top: 20px;
        }
        &-top {
          font-size: 18px;
          font-weight: 600;
        }
        &-bottom {
          margin-top: 10px;
          font-size: 16px;
          font-weight: 500;
        }
      }
    }
  }
  &-star {
    height: 100%;
    width: 60%;
    @include screen(991) {
      width: 100%;
    }
    &-rating {
      margin-top: 20px;
      background: $white;
      width: 100%;
      height: 65px;
      overflow: hidden;
      > input {
        display: none;
      }
      > label {
        cursor: pointer;
        width: 40px;
        height: 40px;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23e3e3e3' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 76%;
        transition: 0.3s;
      }
    }

    &-rating > input:checked ~ label,
    &-rating > input:checked ~ label ~ label {
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23F79158' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
    }

    &-rating > input:not(:checked) ~ label:hover,
    &-rating > input:not(:checked) ~ label:hover ~ label {
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23F79158' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
    }
  }
  &-review {
    height: 100%;
    width: 60%;
    @include screen(991) {
      width: 100%;
    }
  }
  &-title {
    font-size: 18px;
    color: $gray-800;
    font-weight: 600;
  }
  &-description {
    font-size: 14px;
    color: $gray-500;
    font-weight: 600;
    margin-top: 20px;
  }
  &-image {
    height: 100%;
    width: 60%;
    @include screen(991) {
      width: 100%;
    }
    &-list {
      width: 100%;
      background: $white;
      margin-top: 20px;
      padding: 30px;
      @include screen(480){
        padding: 0px 5px;
        display: flex;
        flex-wrap: wrap;
      }
      .img-main {
        margin: 0 10px;
        width: 90%;
        object-fit: cover;
      }
    }
  }
  &-button {
    height: 100%;
    width: 60%;
    @include screen(991) {
      width: 100%;
    }
    .button-submit {
      padding: 10px 0;
      background: $orange;
      color: $white;
      border: none;
    }
    .button-preview {
      margin-top: 20px;
      padding: 10px 0;
      background: $gray-300;
      color: $white;
      border: none;
      margin-bottom: 50px;
    }
  }
}
</style>