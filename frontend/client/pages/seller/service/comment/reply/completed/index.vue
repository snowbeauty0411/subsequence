<template>
  <NuxtLayout name="seller">
    <div class="seller-service flex flex-col">
      <div class="seller-service-content">
        <div class="seller-service-content-link flex items-center flex-wrap">
          <NuxtLink
            to="/seller/service/management"
            class="cursor-pointer link-back font-bold"
            >サービス管理</NuxtLink
          >
          <div class="mx-3">
            <BootstrapIcon icon="chevron-right" size="sm" />
          </div>
          <div class="font-bold">レビューの返信</div>

          <div class="mx-3">
            <BootstrapIcon icon="chevron-right" size="sm" />
          </div>
          <div class="font-bold">返信内容の確認</div>
          <div class="mx-3">
            <BootstrapIcon icon="chevron-right" size="sm" />
          </div>
          <div class="font-bold">返信完了</div>
        </div>

        <div class="seller-service-content-title flex items-end flex-wrap">
          <div class="title-main">返信完了</div>
          <div class="title-description">Reply Completed</div>
        </div>

        <div class="list-by-comment col-8 ml-7">
          <div
            class="list-by-comment-list my-20 w-full flex items-left flex-col"
          >
            <div class="list-by-comment-list-header font-bold">
              ありがとうございます。 <br />
              レビューへの返信が完了しました。
            </div>

            <div class="list-by-comment-list-mid font-semibold mb-20">
              ・返信内容は審査させていただくため、公開までに通常2～10日程度のお時間を頂戴しております。また、繁忙期等は更にお時間を要する場合もございます。
              <br />・内容によっては、公開を見送らせていただく場合もございます。
            </div>

            <div class="list-by-comment-list-bottom">
              <button
                class="
                  list-by-comment-list-bottom-btnCompleted
                  btn btn-secondary
                  mb-3
                "
                v-on:click="$router.push(`/seller/service/management`)"
              >
                サービス管理TOPへ戻る
              </button>
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
import Cookies from "js-cookie";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import SDIcon from "@/components/SDIcon";

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
  data() {
    return {
      imgDefault,
      dataComment: [
        {
          id: "1",
          name: "BASE FOOD",
          namUser: "アカウント名",
          time: "2021-12-31 00:00",
          description:
            "ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。ここにコメントが入ります。",
        },
      ],
    };
  },
  components: {
    BootstrapIcon,
    SDIcon,
  },
  created() {
    window.scrollTo(0, 0);
  },
};
</script>

<style lang="scss" scoped>
.seller-service {
  &-content {
    padding: 30px 100px;
    @include screen(767) {
      padding: 30px;
    }
    @include screen(480){
      padding-inline: 20px;
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
      @include screen(480) {
        margin-left: 0;
        width: 100%;
      }
      &-list {
        &-header {
          margin-bottom: 51px;
          font-size: 22px;
          color: $gray-800;
          @include screen(480) {
            margin-bottom: 20px;
            font-size: 18px;
          }
        }

        &-mid {
          color: $gray-500;
          font-size: 16px;
          @include screen(480) {
            margin-bottom: 50px;
            font-size: 14px;
          }
        }

        &-bottom {
          &-btnCompleted {
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
            letter-spacing: 0.9;
            font-size: 18px;
            @include screen(480){
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
