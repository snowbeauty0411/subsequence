<template>
  <NuxtLayout name="seller">
    <div class="seller-service flex flex-col">
      <SDPreLoad :preload="preload" />
      <div class="seller-service-content">
        <div class="seller-service-content-link flex items-center flex-wrap sm-d-none">
          <NuxtLink
            to="/seller/service/management"
            class="cursor-pointer link-back font-bold"
            >サービス管理</NuxtLink
          >
          <div class="mx-3">
            <BootstrapIcon icon="chevron-right" size="sm" />
          </div>
          <NuxtLink
            :to="`/seller/service/comment/reply/${this.$route.params.id}?buyer_id=${this.$route.query.buyer_id}`"
            class="cursor-pointer link-back font-bold"
            >レビューの返信</NuxtLink
          >
          <div class="mx-3">
            <BootstrapIcon icon="chevron-right" size="sm" />
          </div>
          <div class="font-bold">返信内容の確認</div>
        </div>

        <div class="seller-service-content-title flex items-end flex-wrap sm-d-none">
          <div class="title-main">返信内容の確認</div>
          <div class="title-description">Confirmation of reply contents</div>
        </div>

        <div class="list-by-comment">
          <div
            class="
              list-by-comment-list
              mt-16
              mb-20
              ml-7
              w-full
              flex
              items-start
              flex-col
            "
          >
            <div class="item-comment flex">
              <div class="item-comment-content flex flex-col w-4/5">
                <div class="item-comment-content-top flex">
                  <div class="item-comment-img flex items-start">
                    <img
                      :src="
                        commentDetail.service_image[0]
                          ? commentDetail.service_image[0]
                          : imgDefault
                      "
                    />
                  </div>
                  <div class="text-left flex flex-col">
                    <div class="item-comment-content-top-info mb-2.5 font-bold">
                      {{ commentDetail.service_content }}
                    </div>
                    <div class="item-comment-content-top-name font-semibold">
                      {{ commentDetail.service_name }}
                    </div>
                  </div>
                </div>

                <div class="item-comment-content-mid mb-3 mt-24">
                  <div class="flex justify-between mb-2.5 mt-2 md:mt-10">
                    <div
                      class="item-comment-content-mid-left flex items-center"
                    >
                      <div class="mr-11">
                        <img
                          :src="
                            commentDetail.buyer_avatar
                              ? commentDetail.buyer_avatar
                              : avatarDefault
                          "
                          alt=""
                          style="width: 50px; height: 50px; border-radius: 50%"
                        />
                      </div>
                      <div class="text-start flex flex-col mt-1">
                        <div class="list-star flex">
                          <img :src="imgStar" v-if="commentDetail.rating > 0" />
                          <img :src="imgStar" v-if="commentDetail.rating > 1" />
                          <img :src="imgStar" v-if="commentDetail.rating > 2" />
                          <img :src="imgStar" v-if="commentDetail.rating > 3" />
                          <img :src="imgStar" v-if="commentDetail.rating > 4" />
                        </div>
                        <div
                          class="
                            item-comment-content-mid-left-name
                            mt-2
                            font-semibold
                            text-left
                          "
                        >
                          {{ commentDetail.buyer.account_name }}
                        </div>
                      </div>
                    </div>
                    <div class="item-comment-content-mid-right">
                      <div class="text-right">
                        {{
                          commentDetail.time === null
                            ? "-"
                            : $moment(commentDetail.time).format(
                                "YYYY-MM-DD HH:mm"
                              )
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="font-semibold item-comment-content-mid-des">
                    <div
                      v-if="commentDetail.description"
                      v-html="replaceText(commentDetail.description)"
                    ></div>
                  </div>
                </div>

                <div class="item-comment-content-bottom">
                  <b-container>
                    <b-row>
                      <b-col cols="3">
                        <img
                          :src="commentDetail.list_image[0].path"
                          alt=""
                          v-if="commentDetail.list_image[0]"
                        />
                      </b-col>
                      <b-col cols="3">
                        <img
                          :src="commentDetail.list_image[1].path"
                          alt=""
                          v-if="commentDetail.list_image[1]"
                        />
                      </b-col>
                      <b-col cols="3">
                        <img
                          :src="commentDetail.list_image[2].path"
                          alt=""
                          v-if="commentDetail.list_image[2]"
                        />
                      </b-col>
                      <b-col cols="3">
                        <img
                          :src="commentDetail.list_image[3].path"
                          alt=""
                          v-if="commentDetail.list_image[3]"
                        />
                      </b-col>
                    </b-row>
                  </b-container>
                </div>
                <!-- node -->
                <div class="item-comment-content-node mt-10">
                  <div class="flex justify-between mb-2.5">
                    <div class="flex items-center">
                      <div class="item-comment-content-node-left font-semibold">
                        返信コメントの記入
                      </div>
                    </div>
                  </div>
                </div>

                <b-form-textarea
                  class="resize-none rounded-md p-7 mt-10 focus:outline-none"
                  rows="6"
                  placeholder="ここにコメントが入ります。"
                  v-model="reply_seller"
                  :disabled="true"
                ></b-form-textarea>
                <div
                  class="
                    text-right
                    mt-2
                    item-comment-content-node-area
                    font-semibold
                  "
                >
                  残り{{ 250 - reply_seller.length }}文字
                </div>
                <div class="item-comment-content-node-bottom mt-20">
                  <div
                    class="
                      item-comment-content-node-bottom-rules-top
                      font-bold
                      mb-20
                    "
                  >
                    ・投稿されたコメントは、当社が取得し、<a @click="redirectToTerm"
                      class="item-comment-content-node-bottom-rules-sub text-[#E79C3A]"
                      >subsQ 利用規約</a
                    >
                    に基づき取り扱います。違反する内容が含まれていた場合、非公開とします。
                    <br />・お客様や第三者の個人情報（氏名、メールアドレス、電話番号等）及びプライバシー権や著作権等の権利を侵害する可能性がある投稿はしないでください。
                  </div>

                  <button
                    class="
                      item-comment-content-node-bottom-btn-submit
                      btn btn-secondary
                      mb-3
                    "
                    v-on:click="createReplyComment()"
                  >
                    同意して返信する
                  </button>

                  <button
                    class="
                      item-comment-content-node-bottom-btn-back
                      btn btn-secondary
                    "
                    v-on:click="$router.back()"
                  >
                    入力画面に戻る
                  </button>

                  <div
                    class="
                      item-comment-content-node-bottom-rules
                      mt-20
                      font-semibold
                    "
                  >
                    ※事実の誇大表現・他人を罵倒し蔑む表現等、第三者が不快になるであろう内容でのご投稿が増えております。ご投稿の際には、第三者・施設へ与える影響等をご考慮の上、責任をもってご投稿いただきますようお願い申し上げます。内容によっては、公開を見送らせていただく場合もございます。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></NuxtLayout
  >
</template>

<script>
import { useToast } from "vue-toastification";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import imgDefault from "@/assets/images/detail1.png";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import SDIcon from "@/components/SDIcon";
import SDPreLoad from "@/components/SDPreLoad";
import imgStar from "@/assets/images/star1.png";
import { Message } from "@/utils/message";
import avatarDefault from "@/assets/images/ellipse.png";

export default {
  name: "PageService",
  setup() {
    const store = sellerStore();
    const toast = useToast();
    return {
      store,
      toast,
    };
  },
  created() {
    window.scrollTo(0, 0);
    this.idComment = this.$route.params.id;
    const buyer_id = this.$route.query.buyer_id;
    const dataForm = {
      buyer_id: buyer_id,
      service_hash_id: this.idComment,
    };
    this.store.getDetailComment(dataForm);
    const reply = localStorage.getItem("data-reply");
    if (reply != null) {
      this.reply_seller = reply;
    } else {
      this.$router.push("/seller/service/management");
    }
  },
  computed: {
    ...mapState(sellerStore, ["detailComment", "success", "message", "error"]),
  },
  mounted() {
    window.addEventListener("beforeunload", (event) => {
      localStorage.removeItem("data-reply");
    });
  },
  data() {
    return {
      avatarDefault,
      imgStar,
      idComment: "",
      preload: true,
      imgDefault,
      commentDetail: {
        service_content: "",
        service_name: "",
        rating: "",
        service_image: [],
        buyer_name: "",
        buyer_avatar: null,
        description: "",
        list_image: [],
        time: null,
        reply: "",
        buyer: {},
        profile_image_url_seller: null,
      },
      message: Message.COMMENT,
      remaining: 250,
      reply_seller: "",
      id: "",
    };
  },
  components: {
    BootstrapIcon,
    SDPreLoad,
    SDIcon,
  },
  watch: {
    success() {
      if (this.store.success) {
        this.toast.success(this.store.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
        this.$router.push("/seller/service/comment/reply/completed");
      }
    },

    error() {
      if (this.store.error) {
        this.toast.error(this.store.message, this.optionToast);
        this.store.success = "";
        this.store.message = "";
      }
    },

    detailComment() {
      this.preload = true;
      const {
        service,
        rating,
        updated_at,
        description,
        seller_reply,
        images,
        seller,
        id,
      } = this.detailComment;
      this.commentDetail.description = description;
      this.commentDetail.service_name = service.name;
      this.commentDetail.service_content = service.service_content;
      this.commentDetail.rating = rating;
      this.commentDetail.service_image = service.images;
      this.commentDetail.list_image = images;
      this.commentDetail.time = updated_at;
      this.commentDetail.reply = seller_reply;
      this.commentDetail.seller = seller;
      this.commentDetail.profile_image_url_seller =
        this.commentDetail.seller.profile_image_url_seller;
      this.id = id;
      this.preload = false;
    },
  },
  methods: {
    redirectToTerm() {
      window.open("/term", "_blank", "noreferrer");
    },

    replaceText(data) {
      return data.replace(/(?:\r\n|\r|\n)/g, "<br>");
    },

    async createReplyComment() {
      const dataForm = {
        id: this.id,
        seller_reply: this.reply_seller,
      };
      localStorage.removeItem("data-reply");
      await this.store.replyComment(dataForm);
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.seller-service {
  &-content {
    .sm-d-none{
      @include screen(480){
        display: none;
      }
    }
    padding: 30px 100px;
    @include screen(767) {
      padding: 30px;
    }

    &-link {
      font-size: 12px;
      color: $gray-500;
      margin-bottom: 93px;
      a {
        &:hover {
          color: $orange;
        }
      }
      @include screen(991) {
        margin-bottom: 20px;
      }
      @include screen(480){
        display: none;
      }
    }

    &-title {
      color: $gray-800;
      @include screen(480){
        display: none;
      }
      .title-main {
        font-size: 22px;
        font-weight: 600;
        @include screen(480) {
          font-size: 16px;
        }
      }
      .title-description {
        margin-left: 20px;
        font-size: 14px;
        @include screen(480) {
          font-size: 12px;
        }
      }
    }

    .list-by-comment {
      &-header {
        padding: 20px 0;
        border-bottom: 1px solid $gray-600;
        .text-name {
          color: $gray-500;
          font-size: 16px;
          font-weight: 700;
        }
      }

      &-list {
        @include screen(767) {
          margin-left: 0;
        }
        .item-comment {
          width: 95%;
          margin-bottom: 80px;
          @include screen(1365) {
            flex-direction: column;
            width: 100%;
          }

          @include screen(12001599) {
            flex-direction: column;
            width: 100%;
          }

          @include screen(991) {
            margin-bottom: 20px;
          }

          &-img {
            margin-right: 30px;

            @include screen(12001599) {
              margin-right: 60px;
              margin-bottom: 20px;
            }

            @include screen(1365) {
              margin-right: 60px;
              margin-bottom: 20px;
            }

            img {
              width: 121px;
              height: 110px;
              max-width: unset;
            }
          }

          &-content {
            @include screen(767) {
              width: 100%;
            }
            &-top {
              @include screen(991) {
                flex-direction: column;
                width: 100%;
              }
              &-info {
                color: $lightblack;
              }
              &-name {
                color: $gray-500;
              }
            }

            &-mid {
              @include screen(991) {
                margin-top: 20px;
              }
              &-left {
                &-avatar {
                  background: $lightblack;
                  background-size: 50px 50px;
                  border: none;
                  border-radius: 50px;
                  cursor: pointer;
                  height: 60px;
                  width: 60px;
                }

                &-name {
                  color: $gray-800;
                }
              }

              &-des {
                color: $gray-500;
              }

              &-right {
                color: $gray-500;
                .text-right {
                  @include screen(767) {
                    display: none;
                  }
                }
              }

              .btn-secondary {
                background: unset !important;
                border-radius: 50px;
              }
            }

            &-bottom {
              margin-right: 10px !important;
              width: unset !important;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                margin-right: 10px !important;
              }
              @include screen(767) {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }

            &-node {
              &-left {
                color: $gray-800;
                font-size: 18px;
              }

              &-des {
                color: $gray-500;
                font-size: 14px;
              }

              &-area {
                font-size: 14px;
                color: $gray-500;
              }

              &-guide {
                color: $orange;
                cursor: pointer;
                font-weight: 600;
              }

              &-bottom {
                width: 100%;
                margin-bottom: 90px;
                @include screen(991) {
                  margin-bottom: 0px;
                }

                &-rules {
                  color: $gray-500;
                  font-size: 14px;
                  @include screen(480) {
                    margin-top: 20px;
                  }
                  &-top {
                    color: $gray-500;
                    font-size: 14px;
                    @include screen(480) {
                      margin-bottom: 20px;
                    }
                  }

                  &-sub {
                    color: $orange;
                  }

                  &-node {
                    color: $gray-500;
                    font-size: 14px;
                  }
                }

                &-btn {
                  &-submit {
                    background: $orange 0% 0% no-repeat padding-box;
                    border: unset;
                    border-radius: 8px;
                    box-shadow: 0px 3px 6px #00000029;
                    color: $body-bg;
                    cursor: pointer;
                    font-weight: 600;
                    padding: 15px 0;
                    width: 100%;
                    text-align: center;
                    font-size: 18px;
                  }

                  &-back {
                    background: $gray-300 0% 0% no-repeat padding-box;
                    border: unset;
                    border-radius: 8px;
                    box-shadow: 0px 3px 6px #00000029;
                    color: $body-bg;
                    cursor: pointer;
                    font-weight: 600;
                    padding: 15px 0;
                    width: 100%;
                    text-align: center;
                    font-size: 18px;
                  }
                }
              }
            }

            &-sp {
              &-left {
                display: none;
                @include screen(767) {
                  display: block;
                  color: $gray-500;
                }
              }

              &-right {
                display: none;
                @include screen(767) {
                  display: block;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
