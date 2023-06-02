<template>
  <b-container fluid class="page-preview w-full">
    <b-row class="w-full">
      <b-col cols="12" class="flex sm-d-none">
        <div class="mb-5 flex flex-col">
          <div class="page-preview-link flex items-center flex-wrap">
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
            <div>
              <NuxtLink
                v-bind:to="'/buyer/comment/post/' + detailService.hash_id"
                >レビューを書く</NuxtLink
              >
            </div>
            <div class="mx-2">
              <BootstrapIcon icon="chevron-right" size="sm" />
            </div>
            <div>レビュー内容の確認</div>
          </div>
          <div class="page-preview-text flex items-end">
            <div class="title-main">レビューを書く</div>
            <small class="text-[#5E5C5C]"
              >Confirmation of review contents</small
            >
          </div>
        </div>
      </b-col>

      <b-col cols="12" class="flex">
        <div
          v-if="preloadList"
          class="sd-preloads flex justify-center items-center"
        >
          <div class="snippet" data-title=".dot-flashing">
            <div class="stage">
              <div class="dot-flashing"></div>
            </div>
          </div>
        </div>
        <div class="mb-5 flex flex-col">
          <div class="page-preview-post flex items-center w-full">
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
                <div class="rating flex mb-2">
                  <div
                    class="waper-image mr-2"
                    v-for="(image, i) in parseInt(avg_reviews)"
                    :key="i"
                  >
                    <img
                      src="@/assets/images/star1.png"
                      style="width: unset; height: fit-content"
                    />
                  </div>
                </div>
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
        <div class="page-preview-star mb-5 flex flex-col">
          <div class="page-preview-title">このサービスの評価</div>
          <div
            class="
              page-preview-star-rating
              flex
              justify-center
              relative
              items-center
              flex-row-reverse
            "
          >
            <div class="text-right mx-3 text-[24px] decoration-orange-800">
              {{ star }}
            </div>
            <input
              type="radio"
              name="rating"
              id="rating-5"
              checked
              v-if="star == 5"
            />
            <label for="rating-5"></label>
            <input
              type="radio"
              name="rating"
              id="rating-4"
              checked
              v-if="star == 4"
            />
            <label for="rating-4"></label>
            <input
              type="radio"
              name="rating"
              id="rating-3"
              checked
              v-if="star == 3"
            />
            <label for="rating-3"></label>
            <input
              type="radio"
              name="rating"
              id="rating-2"
              checked
              v-if="star == 2"
            />
            <label for="rating-2"></label>
            <input
              type="radio"
              name="rating"
              id="rating-1"
              checked
              v-if="star == 1"
            />
            <label for="rating-1"></label>
          </div>
        </div>
      </b-col>

      <b-col cols="12" class="flex">
        <div class="page-preview-review mb-5 flex flex-col">
          <div class="page-preview-title">レビュー内容</div>
          <div class="page-preview-textSpecial flex flex-col">
            <b-form-textarea
              id="textarea-rows"
              placeholder="ここに説明文が入ります。"
              rows="6"
              v-model="description"
              :disabled="true"
            ></b-form-textarea>
          </div>
          <div
            class="item-comment-content-node-bottom-rules-top font-bold mt-4"
          >
            ・投稿されたコメントは、当社が取得し、<a
              @click="redirectToTerm"
              class="item-comment-content-node-bottom-rules-sub text-[#E79C3A]"
              >subsQ 利用規約</a
            >
            に基づき取り扱います。違反する内容が含まれていた場合、非公開とします。
            <br />・お客様や第三者の個人情報（氏名、メールアドレス、電話番号等）及びプライバシー権や著作権等の権利を侵害する可能性がある投稿はしないでください。
          </div>
        </div>
      </b-col>

      <b-col cols="12" class="flex" v-if="url1 || url2 || url3 || url4">
        <div class="page-preview-image mb-5 flex flex-col">
          <div class="page-preview-title">画像</div>
          <div class="page-preview-image-list flex justify-between">
            <b-container>
              <b-row>
                <b-col cols="3">
                  <div
                    :style="'background-image: url(' + url1 + ')'"
                    class="img-main"
                    v-if="url1"
                  ></div>
                </b-col>
                <b-col cols="3">
                  <div
                    :style="'background-image: url(' + url2 + ')'"
                    class="img-main"
                    v-if="url2"
                  ></div>
                </b-col>
                <b-col cols="3">
                  <div
                    :style="'background-image: url(' + url3 + ')'"
                    class="img-main"
                    v-if="url3"
                  ></div>
                </b-col>
                <b-col cols="3">
                  <div
                    :style="'background-image: url(' + url4 + ')'"
                    class="img-main"
                    v-if="url4"
                  ></div>
                </b-col>
              </b-row>
            </b-container>
          </div>
          <div class="page-preview-description mt-4">
            ・投稿されたレビュー及び画像は、当社が取得し、
            <span style="color: #e79c3a">subsQ 利用規約</span>
            に基づき取り扱います。違反する内容が含まれていた場合、レビュー及び画像を非公開（画像はデータ自体も削除）とします。
            <br />・お客様ご自身や第三者の個人情報（氏名、メールアドレス、電話番号等）及びプライバシー権や著作権等の権利を侵害する可能性がある投稿はしないでください。
            <br />・アカウント名は、投稿者名としてサイト上に表示されます。
            <br />・投稿されますと、投稿内容、お客様の氏名、利用情報などが当社と施設側で確認可能となります。
          </div>
        </div>
      </b-col>

      <b-col cols="12">
        <div class="page-preview-button flex flex-col">
          <b-button
            class="button-submit w-full"
            v-on:click="createComment()"
            v-if="Object.keys(detailCommentBuyer).length === 0"
            >利用規約に同意して投稿する</b-button
          >
          <b-button
            class="button-submit w-full"
            v-on:click="editComment()"
            v-else
            >利用規約に同意して投稿する</b-button
          >
          <b-button class="button-preview w-full" v-on:click="goToBack()"
            >入力画面に戻る</b-button
          >
          <div class="page-preview-description">
            ※事実の誇大表現・他人を罵倒し蔑む表現等、第三者が不快になるであろう内容でのご投稿が増えております。ご投稿の際には、第三者・施設へ与える影響等をご考慮の上、責任をもってご投稿いただきますようお願い申し上げます。内容によっては、公開を見送らせていただく場合もございます。
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import imgDefault from "@/assets/images/detail1.png";
import { buyerStore } from "@/store/buyer";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import Cookies from "js-cookie";

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
      // text: "ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。",
      remaining: "",
      imgDefault,
      description: "",
      star: "",
      url1: null,
      url2: null,
      url3: null,
      url4: null,
      file1: null,
      file2: null,
      file3: null,
      file4: null,
      detailCommentBuyer: {},
      detailService: {},
      listServiceImage: [],
      hash_id: this.$route.params.id,
      preloadList: false,
      avg_reviews: 0,
      // checked: 0,
      account_id: null,
    };
  },
  created() {
    window.scrollTo(0, 0);
    if (Object.keys(this.listFiles).length === 0) {
      this.$router.push({ path: `/buyer/comment/post/${this.hash_id}` });
    }

    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
      this.user_type = localStorage.getItem("type");
    } else {
      this.account_id = Cookies.get("account_id");
      this.user_type = Cookies.get("type");
    }
    const request = {
      hash_id: this.hash_id,
      buyer_id: this.account_id,
    };
    this.store.getDetailComment(request);
    this.store.getDetailServiceByHashId(this.hash_id);
    if (this.listFiles.star) {
      this.star = this.listFiles.star;
    }
    if (this.listFiles.description) {
      this.description = this.listFiles.description;
    }
    if (this.listFiles.dataImage) {
      this.listFiles.dataImage.forEach((item, index) => {
        if (item && item.path) {
          this["url" + (index + 1)] = item.path;
        } else if (item) {
          this["url" + (index + 1)] = URL.createObjectURL(item);
        } else {
          this["url" + (index + 1)] = null;
        }
      });
    }
  },
  computed: {
    ...mapState(buyerStore, [
      "success",
      "message",
      "error",
      "detailComment",
      "listFiles",
      "detailServiceByHashId",
      "listDeleteImage",
    ]),
  },
  watch: {
    detailComment() {
      this.detailCommentBuyer = this.detailComment;
    },
    detailServiceByHashId() {
      this.detailService = this.detailServiceByHashId;
      this.avg_reviews = this.detailService.avg_reviews;
    },
    success() {
      this.preloadList = false;
      if (this.store.success === true) {
        this.toast.success(this.store.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
        this.store.listFiles = {}
        localStorage.setItem("id_service", this.detailService.hash_id);
        this.$router.push({ path: `/buyer/comment/post/completed` });
      }
    },
    error() {
      this.preloadList = false;
      if (this.store.error === true) {
        this.toast.error(this.store.message, this.optionToast);
        this.store.error = "";
        this.store.message = "";
      }
    },
  },
  mounted() {
    window.addEventListener("beforeunload", (event) => {
      this.$router.push({ path: `/buyer/comment/post/${this.hash_id}` });
    });
  },
  methods: {
    redirectToTerm() {
      window.open("/term", "_blank", "noreferrer");
    },
    onChangeTextarea() {
      this.remaining = 250 - this.text.length;
    },

    goToBack() {
      this.$router.push({ path: `/buyer/comment/post/${this.hash_id}` });
    },

    async createComment() {
      const service_id = this.detailService.id;
      const dataForm = new FormData();
      dataForm.append("buyer_id", this.account_id);
      dataForm.append("service_id", service_id);
      dataForm.append("description", this.description);
      dataForm.append("rating", this.star);
      (this.listFiles.dataImage || []).forEach((item, index) => {
        if (item) {
          dataForm.append("images[" + index + "]", item);
        }
      });
      localStorage.setItem("id_service", this.hash_id);
      await this.store.createComment(dataForm);
    },

    async editComment() {
      this.preloadList = true;
      const dataForm = new FormData();
      const id_delete = [];
      dataForm.append("description", this.description);
      dataForm.append("rating", this.star);
      (this.listFiles.dataImage || []).forEach((item, index) => {
        if (item && !item.path) {
          dataForm.append("images[" + index + "]", item);
        }
      });
      (this.listDeleteImage || []).forEach((item, index) => {
        dataForm.append("id_review_image_deletes[" + index + "]", item);
      });
      localStorage.setItem("id_service", this.hash_id);
      await this.store.editComment(this.detailCommentBuyer.id, dataForm);
    },
  },
};
definePageMeta({
  layout: "buyer",
});
</script>

<style lang="scss" scoped>
.page-preview {
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
    .title-main {
      font-size: 22px;
      font-weight: 600;
      color: $gray-800;
      margin-right: 30px;
    }
    @include screen(991) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &-link {
    font-size: 14px;
    font-weight: 600;
    color: $gray-800;
    margin-bottom: 50px;
    margin-top: 30px;
  }
  &-post {
    .post-info {
      width: 80%;
      @include screen(480) {
        flex-direction: column;
      }
      &-image {
        width: 180px;
        height: 180px;
        max-width: unset;
        img {
          width: 180px;
          height: 180px;
          object-fit: cover;
        }
      }
      &-text {
        width: calc(100% - 180px);
        margin-left: 30px;
        color: $gray-800;
        @include screen(480) {
          margin-left: unset;
          margin-top: 20px;
          width: 100%;
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
  }
  &-textSpecial {
    color: $orange;
    font-size: 12px;
    margin: 5px 0;
    .description-textarea {
      font-size: 14px;
      color: #7e7d7d;
      text-align: right;
      margin: 10px 0;
    }
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
      padding: 20px 0;
      .img-main {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        background-position: center center;
        background-size: cover;
      }
    }
  }
  &-button {
    height: 100%;
    width: 60%;
    @include screen(991) {
      width: 100%;
    }
    margin: 50px 0;
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