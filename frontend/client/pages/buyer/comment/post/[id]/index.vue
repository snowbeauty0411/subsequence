<template>
  <b-container fluid class="page-comment w-full">
    <b-row class="w-full">
      <b-col cols="12" class="flex">
        <div class="mb-5 flex flex-col">
          <div class="page-comment-link flex items-center flex-wrap">
            <div>
              <NuxtLink to="/buyer/service/management">サービス管理</NuxtLink>
            </div>
            <div class="mx-2">
              <BootstrapIcon icon="chevron-right" size="sm" />
            </div>
            <div>
              <NuxtLink
                v-bind:to="
                  '/buyer/service/service-manage/' + serviceDetail.hash_id
                "
                >{{ serviceDetail.name }}</NuxtLink
              >
            </div>
            <div class="mx-2">
              <BootstrapIcon icon="chevron-right" size="sm" />
            </div>
            <div>レビューを書く</div>
          </div>
          <div class="page-comment-text flex items-end">
            <div class="title-main">レビューを書く</div>
            <small class="text-[#5E5C5C]">Write a review</small>
          </div>
        </div>
      </b-col>

      <b-col cols="12" class="flex">
        <div class="mb-5 flex flex-col">
          <div class="page-comment-post flex items-center w-full">
            <div class="post-info flex">
              <div class="post-info-image">
                <img
                  :src="
                    serviceDetail.images.length > 0
                      ? serviceDetail.images[0].path
                      : imgDefault
                  "
                  alt=""
                  v-if="serviceDetail.images"
                />
              </div>
              <div class="post-info-text flex flex-col">
                <div class="post-info-text-top">
                  {{ serviceDetail.service_content }}
                </div>
                <div class="post-info-text-bottom font-medium">
                  {{ serviceDetail.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>

      <b-col cols="12" class="flex">
        <div class="page-comment-star mb-5 flex flex-col">
          <div class="page-comment-title">このサービスの評価</div>
          <div
            class="
              page-comment-star-rating
              flex
              justify-center
              relative
              items-center
              flex-row-reverse
            "
          >
            <input
              type="radio"
              name="rating"
              id="rating-5"
              value="5"
              v-model="star"
            />
            <label for="rating-5"></label>
            <input
              type="radio"
              name="rating"
              id="rating-4"
              value="4"
              v-model="star"
            />
            <label for="rating-4"></label>
            <input
              type="radio"
              name="rating"
              id="rating-3"
              value="3"
              v-model="star"
            />
            <label for="rating-3"></label>
            <input
              type="radio"
              name="rating"
              id="rating-2"
              value="2"
              v-model="star"
            />
            <label for="rating-2"></label>
            <input
              type="radio"
              name="rating"
              id="rating-1"
              value="1"
              v-model="star"
            />
            <label for="rating-1"></label>
          </div>
        </div>
      </b-col>

      <b-col cols="12" class="flex">
        <div class="page-comment-review mb-5 flex flex-col">
          <div class="page-comment-title">レビューの記入</div>
          <div class="page-comment-description">
            レビューは、サイトをご利用いただく方の参考になる情報です。そのため誹謗中傷・過剰な表現等、第三者が不快になる内容と
            ならないよう、ご考慮の上、ご投稿いただきますようお願い申し上げます。
          </div>
          <div class="page-comment-textSpecial flex items-center justify-end">
            <BootstrapIcon
              icon="info-circle-fill"
              size="sm"
              class="mx-1 exclamation-triangle-fill"
              variant="warning"
            />
            <a class="text-[#E79C3A]" @click="redirectToTerm()"
              >ガイドラインはこちら</a
            >
          </div>
          <div
            class="
              page-comment-textSpecial
              flex flex-col
              relative
              validate-form
            "
          >
            <b-form-textarea
              id="textarea-rows"
              placeholder="ここにコメントが入ります。"
              rows="6"
              v-bind="onChangeTextarea()"
              v-model.trim="v$.description.$model"
              v-bind:class="{ 'is-invalid': v$.description.$error }"
              maxlength="250"
            ></b-form-textarea>
            <div v-if="v$.description.$error" class="error-text">
              <p v-if="v$.description.required.$invalid">
                {{ Message.comment_is_required }}
              </p>
            </div>
            <div
              class="description-textarea flex justify-end my-2 text-gray-600"
            >
              残り{{ remaining }}文字
            </div>
          </div>
        </div>
      </b-col>

      <b-col cols="12" class="flex">
        <div class="page-comment-image mb-5 flex flex-col">
          <div class="page-comment-title">画像を追加</div>
          <div class="page-comment-description">
            画像は４枚まで追加できます。
          </div>
          <div class="page-comment-image-list flex justify-between">
            <b-overlay
              :show="loadingImg1"
              class="relative page-comment-image-list-item cursor-pointer"
            >
              <label for="img1">
                <div for="img1">
                  <img
                    src="@/assets/images/iconCamera.png"
                    alt=""
                    class="absolute img-icon"
                    v-if="!url1"
                  />
                  <img :src="url1" alt="" class="absolute img-main" v-else />
                </div>
              </label>
              <BootstrapIcon
                style="
                  z-index: 2147483646;
                  position: absolute;
                  top: -6px;
                  right: -11px;
                  color: black;
                "
                icon="x-circle-fill"
                size="sm"
                class="mx-1 exclamation-triangle-fill"
                v-on:click="deleteImage(0)"
                v-if="url1"
              />
              <input
                type="file"
                class="hidden"
                id="img1"
                accept="image/png, .jpeg, .jpg, .gif"
                v-on:change="onFileChangeImg1"
              />
            </b-overlay>
            <b-overlay
              :show="loadingImg2"
              class="relative page-comment-image-list-item cursor-pointer"
            >
              <label for="img2">
                <div for="img2">
                  <img
                    src="@/assets/images/iconCamera.png"
                    alt=""
                    class="absolute img-icon"
                    v-if="!url2"
                  />
                  <img :src="url2" alt="" class="absolute img-main" v-else />
                </div>
              </label>
              <BootstrapIcon
                style="
                  z-index: 2147483646;
                  position: absolute;
                  top: -6px;
                  right: -11px;
                  color: black;
                "
                icon="x-circle-fill"
                size="sm"
                class="mx-1 exclamation-triangle-fill"
                v-on:click="deleteImage(1)"
                v-if="url2"
              />
              <input
                type="file"
                class="hidden"
                id="img2"
                accept="image/png, .jpeg, .jpg, .gif"
                v-on:change="onFileChangeImg2"
              />
            </b-overlay>
            <b-overlay
              :show="loadingImg3"
              class="relative page-comment-image-list-item cursor-pointer"
            >
              <label for="img3">
                <div for="img3">
                  <img
                    src="@/assets/images/iconCamera.png"
                    alt=""
                    class="absolute img-icon"
                    v-if="!url3"
                  />
                  <img :src="url3" alt="" class="absolute img-main" v-else />
                </div>
              </label>
              <BootstrapIcon
                style="
                  z-index: 2147483646;
                  position: absolute;
                  top: -6px;
                  right: -11px;
                  color: black;
                "
                icon="x-circle-fill"
                size="sm"
                class="mx-1 exclamation-triangle-fill"
                v-on:click="deleteImage(2)"
                v-if="url3"
              />
              <input
                type="file"
                class="hidden"
                id="img3"
                accept="image/png, .jpeg, .jpg, .gif"
                v-on:change="onFileChangeImg3"
              />
            </b-overlay>
            <b-overlay
              :show="loadingImg4"
              class="relative page-comment-image-list-item cursor-pointer"
            >
              <label for="img4">
                <div for="img4">
                  <img
                    src="@/assets/images/iconCamera.png"
                    alt=""
                    class="absolute img-icon"
                    v-if="!url4"
                  />
                  <img :src="url4" alt="" class="absolute img-main" v-else />
                </div>
              </label>
              <BootstrapIcon
                style="
                  z-index: 2147483646;
                  position: absolute;
                  top: -6px;
                  right: -11px;
                  color: black;
                "
                icon="x-circle-fill"
                size="sm"
                class="mx-1 exclamation-triangle-fill"
                v-on:click="deleteImage(3)"
                v-if="url4"
              />
              <input
                type="file"
                class="hidden"
                id="img4"
                accept="image/png, .jpeg, .jpg, .gif"
                v-on:change="onFileChangeImg4"
              />
            </b-overlay>
          </div>
          <div class="page-comment-description mt-4">
            下記画像の投稿はお控えください。 <br />
            ・プライバシー権や著作権等の権利を侵害する可能性がある画像<br />
            ※権利を侵害した場合、責任を問われる可能性がありますのでご注意ください。<br />
            ※個人（お客様自身を含む）を特定できる可能性がある画像（人物、身体の一部、氏名等）は、非公開とします。<br />
            ・利用されたサービスと関わりのない画像<br />
          </div>
          <div class="page-comment-textSpecial flex items-center justify-end">
            <BootstrapIcon
              icon="info-circle-fill"
              size="sm"
              class="mx-1 exclamation-triangle-fill"
              variant="warning"
            />
            <a class="text-[#E79C3A]" @click="redirectToTerm()"
              >ガイドラインはこちら</a
            >
          </div>
        </div>
      </b-col>

      <b-col cols="12">
        <div class="page-comment-button">
          <b-button class="button-submit w-full" v-on:click="confirm()"
            >入力内容を確認する</b-button
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
import useVuelidate from "@vuelidate/core";
import Cookies from "js-cookie";
import { required, minLength } from "@vuelidate/validators";
import { Message } from "@/utils/message";
import imgDefault from "@/assets/images/detail1.png";
import { useToast } from "vue-toastification";

export default {
  name: "BuyerComment",
  setup() {
    const store = buyerStore();
    const v$ = useVuelidate();
    const toast = useToast();
    return {
      toast,
      v$,
      store,
    };
  },
  components: {
    BootstrapIcon,
  },

  validations: {
    description: {
      required,
      minLength: minLength(1),
    },
  },

  data() {
    return {
      Message: Message.COMMENT,
      text: "",
      star: "",
      description: "",
      remaining: "",
      url1: null,
      url2: null,
      url3: null,
      url4: null,
      file: null,
      detailCommentBuyer: {},
      serviceDetail: {},
      listServiceImage: [],
      dataImage: [],
      img1: null,
      img2: null,
      img3: null,
      img4: null,
      hash_id: this.$route.params.id,
      imgDefault,
      account_id: null,
      loadingImg1: false,
      loadingImg2: false,
      loadingImg3: false,
      loadingImg4: false,
    };
  },
  async created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.account_id = localStorage.getItem("account_id");
      this.user_type = localStorage.getItem("type");
    } else {
      this.account_id = Cookies.get("account_id");
      this.user_type = Cookies.get("type");
    }
    window.scrollTo(0, 0);
    const request = {
      hash_id: this.hash_id,
      buyer_id: this.account_id,
    };
    if (Object.keys(this.listFiles).length === 0) {
      await this.store.getDetailComment(request);
    } else {
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
            this["img" + (index + 1)] = item;
          } else if (item) {
            this["url" + (index + 1)] = URL.createObjectURL(item);
            this["img" + (index + 1)] = item;
          }
        });
      }
    }
    this.store.getDetailServiceByHashId(this.hash_id);
  },
  computed: {
    ...mapState(buyerStore, [
      "success",
      "message",
      "error",
      "detailComment",
      "detailServiceByHashId",
      "listFiles",
      "listDeleteImage",
    ]),
  },
  watch: {
    detailComment() {
      if (Object.keys(this.listFiles).length > 0) {
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
              this["img" + (index + 1)] = item;
            } else if (item) {
              this["url" + (index + 1)] = URL.createObjectURL(item);
              this["img" + (index + 1)] = item;
            }
          });
        }
      } else {
        this.detailCommentBuyer = this.detailComment;
        this.star = this.detailCommentBuyer.rating;
        this.description = this.detailCommentBuyer.description;
        if (this.detailCommentBuyer.images) {
          this.detailCommentBuyer.images.forEach((item, index) => {
            if (item) {
              this["url" + (index + 1)] = item.path;
              this["img" + (index + 1)] = item;
            }
          });
        }
      }
    },
    detailServiceByHashId() {
      this.serviceDetail = this.detailServiceByHashId;
    },
  },
  methods: {
    redirectToTerm() {
      window.open("/term", "_blank", "noreferrer");
    },
    onChangeTextarea() {
      if (this.description !== undefined) {
        this.remaining = 250 - this.description.length;
      }
    },

    onFileChangeImg1(e) {
      const file = e.target.files[0];
      if (e.target.files[0].size / 1024 / 1024 > 10) {
        this.toast.error(this.Message.max_size_file, this.optionToast);
      } else {
        this.loadingImg1 = true;
        setTimeout(() => {
          this.loadingImg1 = false;
          this.url1 = URL.createObjectURL(file);
          this.img1 = file;
          if (
            this.detailCommentBuyer.images &&
            this.detailCommentBuyer.images[0]
          ) {
            if (
              !this.listDeleteImage.includes(
                this.detailCommentBuyer.images[0].id
              )
            ) {
              this.listDeleteImage.push(this.detailCommentBuyer.images[0].id);
            }
          } else {
            if (this.listFiles.dataImage && this.listFiles.dataImage[0]) {
              if (
                !this.listDeleteImage.includes(this.listFiles.dataImage[0].id)
              ) {
                this.listDeleteImage.push(this.listFiles.dataImage[0].id);
              }
            }
          }
        }, 1000);
      }
    },

    onFileChangeImg2(e) {
      const file = e.target.files[0];
      if (e.target.files[0].size / 1024 / 1024 > 10) {
        this.toast.error(this.Message.max_size_file, this.optionToast);
      } else {
        this.loadingImg2 = true;
        setTimeout(() => {
          this.loadingImg2 = false;
          this.url2 = URL.createObjectURL(file);
          this.img2 = file;
          if (
            this.detailCommentBuyer.images &&
            this.detailCommentBuyer.images[1]
          ) {
            if (
              !this.listDeleteImage.includes(
                this.detailCommentBuyer.images[1].id
              )
            ) {
              this.listDeleteImage.push(this.detailCommentBuyer.images[1].id);
            }
          } else {
            if (this.listFiles.dataImage && this.listFiles.dataImage[1]) {
              if (
                !this.listDeleteImage.includes(this.listFiles.dataImage[1].id)
              ) {
                this.listDeleteImage.push(this.listFiles.dataImage[1].id);
              }
            }
          }
        }, 1000);
      }
    },

    onFileChangeImg3(e) {
      const file = e.target.files[0];
      if (e.target.files[0].size / 1024 / 1024 > 10) {
        this.toast.error(this.Message.max_size_file, this.optionToast);
      } else {
        this.loadingImg3 = true;
        setTimeout(() => {
          this.loadingImg3 = false;
          this.url3 = URL.createObjectURL(file);
          this.img3 = file;
          if (
            this.detailCommentBuyer.images &&
            this.detailCommentBuyer.images[2]
          ) {
            if (
              !this.listDeleteImage.includes(
                this.detailCommentBuyer.images[2].id
              )
            ) {
              this.listDeleteImage.push(this.detailCommentBuyer.images[2].id);
            }
          } else {
            if (this.listFiles.dataImage && this.listFiles.dataImage[2]) {
              if (
                !this.listDeleteImage.includes(this.listFiles.dataImage[2].id)
              ) {
                this.listDeleteImage.push(this.listFiles.dataImage[2].id);
              }
            }
          }
        }, 1000);
      }
    },

    onFileChangeImg4(e) {
      const file = e.target.files[0];
      if (e.target.files[0].size / 1024 / 1024 > 10) {
        this.toast.error(this.Message.max_size_file, this.optionToast);
      } else {
        this.loadingImg4 = true;
        setTimeout(() => {
          this.loadingImg4 = false;
          this.url4 = URL.createObjectURL(file);
          this.img4 = file;
          if (
            this.detailCommentBuyer.images &&
            this.detailCommentBuyer.images[3]
          ) {
            if (
              !this.listDeleteImage.includes(
                this.detailCommentBuyer.images[3].id
              )
            ) {
              this.listDeleteImage.push(this.detailCommentBuyer.images[3].id);
            }
          } else {
            if (this.listFiles.dataImage && this.listFiles.dataImage[3]) {
              if (
                !this.listDeleteImage.includes(this.listFiles.dataImage[3].id)
              ) {
                this.listDeleteImage.push(this.listFiles.dataImage[3].id);
              }
            }
          }
        }, 1000);
      }
    },

    deleteImage(index) {
      if (
        this.detailCommentBuyer.images &&
        this.detailCommentBuyer.images[index]
      ) {
        if (
          !this.listDeleteImage.includes(
            this.detailCommentBuyer.images[index].id
          )
        ) {
          this.listDeleteImage.push(this.detailCommentBuyer.images[index].id);
        }
      } else {
        if (this.listFiles.dataImage && this.listFiles.dataImage[index]) {
          if (
            !this.listDeleteImage.includes(this.listFiles.dataImage[index].id)
          ) {
            this.listDeleteImage.push(this.listFiles.dataImage[index].id);
          }
        }
      }
      this["url" + (index + 1)] = null;
      this["img" + (index + 1)] = null;
    },

    async confirm() {
      this.dataImage = [];
      for (let index = 0; index < 4; index++) {
        this.dataImage.push(this["img" + (index + 1)]);
      }
      const { star, description, dataImage } = this;
      const data = {
        star,
        description,
        dataImage,
      };
      if (!data.star) {
        this.toast.error(this.Message.star_is_required, this.optionToast);
      } else {
        const result = await this.v$.$validate();
        this.store.setFiles(data);
        if (result) {
          this.$router.push({
            path: `/buyer/comment/post/${this.hash_id}/confirm`,
          });
        }
      }
    },
  },
};
definePageMeta({
  layout: "buyer",
});
</script>

<style lang="scss" scoped>
.page-comment {
  padding: 0 100px;
  background-color: $lightwhite !important;

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

    a {
      &:hover {
        color: $orange;
      }
    }
  }

  &-post {
    .post-info {
      width: 80%;

      @include screen(480) {
        width: 100%;
      }

      @include screen(480) {
        flex-direction: column;
      }

      &-image {
        width: 180px;
        height: 180px;
        max-width: unset;

        img {
          width: 200px;
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

          @include screen(480) {
            font-size: 16px;
          }
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
      padding: 30px;
      @include screen(480){
        padding: 0px 5px;
        display: flex;
        flex-wrap:wrap
      }

      &-item {
        background: #cccccc;
        padding-top: calc(25% - 10px);
        width: 25%;
        margin: 0 5px;
        height: 0;

        @include screen(991) {
          width: 100%;
        }
        @include screen(480){
          margin: 5px 0px;
          width: 25%;
          min-width: calc(50% - 5px);
          width: 30%;
          height: auto;
        }

        img {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: auto;
        }

        .img-icon {
          cursor: pointer;
          width: 40px;
          height: auto;

          @include screen(480) {
            width: 20px;
          }
        }

        .img-main {
          height: 100% !important;
          width: 100% !important;
          object-fit: cover;
        }
      }
    }
  }

  &-button {
    height: 100%;
    width: 60%;
    margin: 50px 0;

    @include screen(991) {
      width: 100%;
    }

    .button-submit {
      padding: 10px 0;
      background: $orange;
      color: $white;
      border: none;
    }
  }
}
</style>