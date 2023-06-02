<template>
  <NuxtLayout name="artboard">
    <div class="artboard-page w-full">
      <!-- Recommend Art -->
      <div class="artboard-page-recommend flex">
        <div class="service-left">
          <SDServiceCard
            :idService="dataServiceTest.id"
            :id="dataServiceTest.hash_id"
            :name="dataServiceTest.name"
            :imgUrl="dataServiceTest.images[0]"
            :area="dataServiceTest.address"
            :caption="dataServiceTest.caption"
            :price="dataServiceTest.price"
            :star="dataServiceTest.avg_reviews"
            :tags="dataServiceTest.favorite_tags"
            :cycle="item.cycle"
          />
        </div>
        <div class="service-right flex justify-end flex-col">
          <div class="service-right-title">あなたへのおすすめサービス</div>
          <div class="service-right-tag flex">
            <div
              class="service-right-tag-item"
              v-for="(item, index) in favorite_tags"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>

      <!-- Course Art -->
      <div class="artboard-page-course">
        <div
          class="artboard-page-course-item"
          v-for="(item, index) in listCourse"
          :key="index"
        >
          <div class="course-item-top flex">
            <div class="course-item-top-image">
              <img :src="item.images" alt="" />
            </div>
            <div class="flex flex-col w-full">
              <div class="course-item-top-content flex">
                <div>
                  <BootstrapIcon icon="check" size="2x" class="mx-2" />
                </div>
                <div class="flex flex-col">
                  <div class="course-item-top-content-title">
                    {{ item.name }}
                  </div>
                  <div class="course-item-top-content-description">
                    {{ item.content }}
                  </div>
                </div>
              </div>
              <div class="course-item-top-price flex flex-col items-end">
                <div class="course-item-top-price-text">（送料・税込）</div>
                <div class="course-item-top-price-number">
                  ￥{{ item.price }} /<span style="font-size: 18px">月</span>
                </div>
              </div>
            </div>
          </div>
          <div class="course-item-bottom w-full flex justify-end my-2">
            <button class="flex items-center justify-center">
              <BootstrapIcon icon="cart" size="2x" class="mx-2" /><span
                >サブスクする</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="artboard-page-footer flex">
      <div
        class="artboard-page-footer-item"
        v-for="(item, index) in listBackground"
        :key="index"
        :style="`background: ${item}`"
      ></div>
    </div>
  </NuxtLayout>
</template>

<script>
import SDServiceCard from "@/components/SDServiceCard";
import imgDefault from "@/assets/images/imgDefault.png";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";

export default {
  components: {
    SDServiceCard,
    BootstrapIcon,
  },

  data() {
    return {
      imgDefault,
      dataServiceTest: {
        id: 1,
        name: "WorldLibrary Personal",
        caption:
          "定額で賢くクラフトビールを楽しもう冬から始める上質な楽しみのある暮らし",
        address: "対象地域",
        price: 5000,
        images: imgDefault,
        avg_reviews: "4.3",
        favorite_tags: [{ id: 1, name: "H4Phuon9" }],
      },
      listCourse: [
        {
          id: 1,
          images: imgDefault,
          name: "クッキー&パン10食セット",
          content:
            "・BASE BREAD プレーン、チョコレート、メープル、シナモン 各2食（4袋） ・BASE Cookies™ ココア、アールグレイ 各1食（4袋） ＋BASE Cookies™ アールグレイ1袋無料プレゼント ＋BASE Cookies™ アールグレイ1袋無料プレゼント ＋BASE Cookies™ アールグレイ1袋無料プレゼント",
          price: 5180,
        },
      ],
      favorite_tags: ["H4Phuon9", "iPhuon9"],
      listBackground: ["#FE9078", "#E79C3A", "#FAF9F3", "#C0DB5B", "#7E7D7D"],
    };
  },
};
</script>

<style lang="scss" scoped>
.artboard-page {
  width: 100%;
  padding: 50px 70px;
  @include screen(480) {
    padding: 50px 20px;
  }
  &-recommend {
    padding: 50px 0;
    width: 100%;
    @include screen(991) {
      flex-direction: column !important;
    }
    .service-left {
      width: 35%;
      @include screen(991) {
        width: 300px;
      }
    }
    .service-right {
      padding: 0 0 40px 40px;
      @include screen(991) {
        padding: unset;
        margin-top: 30px;
      }
      &-title {
        color: $gray-800;
        font-weight: 600;
        font-size: 22px;
      }
      &-tag {
        margin-top: 10px;
        &-item {
          border: 2px solid #e79c3a;
          border-radius: 22px;
          color: #e79c3a;
          cursor: pointer;
          font-weight: 600;
          margin-right: 20px;
          padding: 5px 20px;
        }
      }
    }
  }
  &-course {
    width: 85%;
    @include screen(991) {
      width: 100%;
    }
    &-item {
      width: 100%;
      background: white;
      height: 100%;
      border-radius: 14.78px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 2px 2px 2px #4d4d4d33;
      border-radius: 15px;
      opacity: 1;
      .course-item-top {
        @include screen(480) {
          flex-direction: column !important;
        }
        &-image {
          img {
            width: 200px;
            height: 200px;
            max-width: unset;
          }
        }
        &-content {
          margin-left: 20px;
          @include screen(480) {
            margin-left: unset;
            margin-top: 20px;
          }
          &-title {
            color: #333333;
            font-size: 20px;
            font-weight: 600;

            @include screen(480) {
              font-size: 16px;
            }
          }
          &-description {
            font-size: 14px;
            color: $gray-800;
          }
        }
        &-price {
          &-text {
            font-size: 15px;
            color: $orange;
            font-weight: 600;
          }
          &-number {
            font-size: 35px;
            color: $orange;
            font-weight: 600;
            @include screen(480) {
              font-size: 22px;
            }
          }
        }
      }
      .course-item-bottom {
        button {
          border: none;
          background: #c0db5b;
          box-shadow: 3px 3px 6px #0000004f;
          opacity: 1;
          padding: 8px 0;
          color: white;
          font-weight: 600;
          width: calc(100% - 250px);
          @include screen(480) {
            width: unset;
            padding: 8px 20px;
          }
        }
      }
    }
  }
  &-footer {
    padding: 50px 0;
    @include screen(480) {
      padding: 30px 0;
    }
    &-item {
      margin-left: 20px;
      height: 120px;
      width: 120px;
      flex-wrap: wrap;
      cursor: pointer;
      @include screen(480) {
        height: 40px;
        width: 40px;
      }
    }
  }
}
</style>