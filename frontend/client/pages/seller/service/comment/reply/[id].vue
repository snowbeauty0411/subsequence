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
          <div class="font-bold">レビューの返信</div>
        </div>

        <div class="seller-service-content-title flex items-end flex-wrap sm-d-none">
          <div class="title-main">レビューの返信</div>
          <div class="title-description">Reply to review</div>
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
                            commentDetail.buyer.profile_image_url_buyer
                              ? commentDetail.buyer.profile_image_url_buyer
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
                  <div class="item-comment-content-node-des font-semibold">
                    返信コメントは、サイトをご利用いただく方の参考になる情報です。そのため誹謗中傷・過剰な表現等、第三者が不快になる内容とならないよう、ご考慮の上、ご投稿いただきますようお願い申し上げます。
                  </div>
                </div>

                <div
                  class="
                    item-comment-content-node-guide
                    flex
                    justify-end
                    items-center
                    text-xs
                  "
                >
                  <SDIcon icon="question-circle" class="mr-1" />
                  <a class="text-[#E79C3A]" @click="redirectToTerm()"
                    >ガイドラインはこちら</a
                  >
                </div>

                <b-form-textarea
                  class="resize-none rounded-md p-7 mt-10 focus:outline-none"
                  rows="6"
                  placeholder="ここにコメントが入ります。"
                  v-model="commentDetail.reply"
                  v-bind:change="onChangeTextarea()"
                  maxlength="250"
                ></b-form-textarea>
                <div
                  class="
                    text-right
                    mt-2
                    item-comment-content-node-area
                    font-semibold
                  "
                >
                  <div>残り{{ remaining }}文字</div>
                </div>
                <div class="item-comment-content-node-bottom mt-20">
                  <button
                    class="
                      item-comment-content-node-bottom-btn-submit
                      btn btn-secondary
                    "
                    v-on:click="comfirmReply()"
                  >
                    入力内容を確認する
                  </button>
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
    let reply = localStorage.getItem("data-reply");
    if (reply != null) {
      this.commentDetail.reply = reply;
    } else {
      this.store.getDetailComment(dataForm);
    }
    this.store.getDetailComment(dataForm);
  },
  computed: {
    ...mapState(sellerStore, ["detailComment"]),
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
      },
      message: Message.COMMENT,
      remaining: 250,
    };
  },
  components: {
    BootstrapIcon,
    SDIcon,
    SDPreLoad,
  },
  watch: {
    detailComment() {
      this.preload = true;
      const {
        service,
        rating,
        updated_at,
        description,
        seller_reply,
        images,
        buyer,
      } = this.detailComment;
      this.commentDetail.description = description;
      this.commentDetail.service_name = service.name;
      this.commentDetail.service_content = service.service_content;
      this.commentDetail.rating = rating;
      this.commentDetail.service_image = service.images;
      this.commentDetail.list_image = images;
      this.commentDetail.time = updated_at;
      this.commentDetail.reply = seller_reply;
      this.commentDetail.buyer = buyer;
      let reply = localStorage.getItem("data-reply");
      if (reply != null) {
        this.commentDetail.reply = reply;
      } else {
        this.commentDetail.reply = seller_reply;
      }
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

    comfirmReply() {
      const buyer_id = this.$route.query.buyer_id;
      if (
        this.commentDetail.reply === "" ||
        this.commentDetail.reply === null
      ) {
        this.toast.error(this.message.comment_is_required, this.optionToast);
      } else {
        localStorage.setItem("data-reply", this.commentDetail.reply);
        this.$router.push(
          `/seller/service/comment/reply/confirm/${this.idComment}?buyer_id=${buyer_id}`
        );
        window.scrollTo(0, 0);
      }
    },

    onChangeTextarea() {
      if (this.commentDetail.reply != "" && this.commentDetail.reply != null) {
        this.remaining = 250 - this.commentDetail.reply.length;
      } else {
        this.remaining = 250;
      }
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
      @include screen(480){
        display: none;
      }
      a {
        &:hover {
          color: $orange;
        }
      }
      @include screen(991) {
        margin-bottom: 20px;
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
              margin-bottom: 20px;
            }

            @include screen(1365) {
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
                .text-start {
                  &-name {
                    color: $gray-800;
                  }
                  img {
                    width: 20px;
                    margin-right: 5px;
                  }
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
                margin-bottom: 90px;
                @include screen(991) {
                  margin-bottom: 0px;
                  width: 100%;
                }

                &-btn-submit {
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
