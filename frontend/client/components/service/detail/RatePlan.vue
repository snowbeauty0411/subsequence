<template>
  <div class="page-service-rate flex flex-col">
    <SDPreLoad :preload="preload" />
    <div class="page-service-rate-title">料金プラン</div>
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
    <div class="page-service-rate-list flex flex-col">
      <div
        class="page-service-rate-list-item flex flex-col"
        v-for="(item, index) in courseList"
        :key="index"
      >
        <div class="item-top flex">
          <div class="item-top-image">
            <img :src="item.course_images" alt="" />
          </div>
          <div class="flex flex-col w-full justify-between">
            <div class="item-top-content flex">
              <!-- <BootstrapIcon icon="check" size="2x" /> -->
              <SDIcon icon="check" style=" font-size: 30px" />
              <div class="flex flex-col" style="width: calc(100% - 50px)">
                <div class="item-top-content-title">{{ item.name }}</div>
                <div class="pc-content">
                  <div class="item-top-content-description">
                    {{ item.content }}
                  </div>
                  <div
                    class="my-3"
                    style="font-size: 15px; color: #e79c3a"
                    v-if="item.message"
                  >
                  {{ item.message }}
                </div>
                </div>
              </div>
            </div>
            <div class="item-top-content sp-content">
              <div class="flex flex-col" style="width: calc(100% - 50px)">
                <div class="item-top-content-title">{{ item.name }}</div>
                <div class="item-top-content-description">
                  {{ item.content }}
                </div>
                <div
                  class="my-3"
                  style="font-size: 15px; color: #e79c3a"
                  v-if="item.message"
                >
                  {{ item.message }}
                </div>
              </div>
            </div>
            <div class="item-top-price flex flex-col items-end">
              <div
                class="item-top-price-text"
                v-if="this.detailService.service_type_id === 1"
              >
                （送料・税込）
              </div>
              <div class="item-top-price-text" v-else>（税込）</div>
              <div class="item-top-price-number">
                {{ $setComma(item.price) }} /<span style="font-size: 18px">{{
                  item.cycle_format
                }}</span>
              </div>
              <span class="item-top-price-note">※1ヶ月＝30日として決済されます</span>
            </div>
          </div>
        </div>
        <div
          class="item-bottom w-full flex justify-end my-2"
          v-if="
            user_type !== 'SELLER' && account_id != seller_id && !item.message
          "
        >
          <button
          style="background: #b5b5b5"
            class="flex items-center justify-center"
            disabled
            v-if="typeContent && serviceUsed"
          >
            <BootstrapIcon size="2x" class="mx-2" /><span
              >同サービス契約中のため申込みできません</span
            >
          </button>
          <button
            class="flex items-center justify-center"
            :disabled="isLoading"
            v-on:click="payment(item.course_id)"
            v-else-if="typeContent && !serviceUsed"
          >
            <BootstrapIcon icon="cart" size="2x" class="mx-2" /><span
              >サブスクする</span
            >
          </button>
          <a
            :href="urlWebsite"
            v-else
            class="flex items-center justify-center btn-link"
          >
            <BootstrapIcon icon="cart" size="2x" class="mx-2" /><span
              >サブスクする</span
            >
          </a>
        </div>
      </div>
    </div>
    <!-- <SDPagination
      v-if="totalPage > 1"
      :totalpage="totalPage"
      :currentPage="currentPage"
      v-on:update-page="updatePage"
    /> -->
  </div>
</template>
<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import SDIcon from "@/components/SDIcon";
import SDPreLoad from "@/components/SDPreLoad";
import { ServiceStore } from "@/store/service/index.ts";
import { mapState } from "pinia";
import imgDefault from "@/assets/images/detail2.png";
import imgDefault1 from "@/assets/images/detail1.png";
import SDPagination from "@/components/SDPagination";
import Cookies from "js-cookie";
import { buyerStore } from "@/store/buyer";
import { Message } from "@/utils/message";
import { useToast } from "vue-toastification";

export default {
  name: "RatePlan",
  setup() {
    const serviceStore = ServiceStore();
    const storeBuyer = buyerStore();
    const toast = useToast();
    return {
      serviceStore,
      storeBuyer,
      toast,
    };
  },
  computed: {
    ...mapState(ServiceStore, ["listCourse", "detailService"]),
    ...mapState(buyerStore, ["dataAccountBuyer"]),
  },
  created() {
    let rememberLogin = localStorage.getItem("rememberLogin");
    if (rememberLogin === "true") {
      this.user_type = localStorage.getItem("type");
      this.account_id = localStorage.getItem("account_id");
    } else {
      this.user_type = Cookies.get("type");
      this.account_id = Cookies.get("account_id");
    }
    this.getListCourse();
  },
  components: { BootstrapIcon, SDPagination, SDIcon, SDPreLoad },
  data() {
    return {
      preloadList: false,
      preload: true,
      courseList: [],
      imgDefault,
      imgService: null,
      imgDefault1,
      page: 1,
      totalPage: 1,
      currentPage: 1,
      isLoading: false,
      user_type: "",
      account_id: "",
      dataUser: {},
      statusIdentity: "",
      typeContent: true,
      urlWebsite: "",
      seller_id: "",
      serviceUsed: false,
      messagePayment: Message.PAYMENT,
      optionToast: {
        type: "error",
        position: "top-right",
        duration: 1,
        keepOnHover: true,
        singleton: true,
        theme: "toasted-primary",
        iconPack: "material",
        fitToScreen: true,
      },
    };
  },
  watch: {
    listCourse() {
      this.preloadList = false;
      if (this.listCourse.data.length > 0) {
        for (let i = 0; i < this.listCourse.data.length; i++) {
          if (this.listCourse.data[i].course_draft === false) {
            this.courseList.push(this.listCourse.data[i]);
          }
        }
      }
      this.totalPage = this.listCourse.last_page;
      this.currentPage = this.listCourse.current_page;
      if (this.courseList.length > 0) {
        for (let i = 0; i < this.courseList.length; i++) {
          if (
            this.courseList[i].service_store_buyer.length > 0 &&
            this.courseList[i].service_store_buyer !== undefined
          ) {
            for (
              let j = 0;
              j < this.courseList[i].service_store_buyer.length;
              j++
            ) {
              if (
                Number(this.courseList[i].service_store_buyer[j].buyer_id) ===
                  Number(this.account_id) &&
                this.courseList[i].service_store_buyer[j].status === 1
              ) {
                this.serviceUsed = true;
              }
            }
          }
        }
      }
    },

    dataAccountBuyer() {
      this.preload = true;
      this.dataUser = this.dataAccountBuyer.buyers;
      if (
        this.dataAccountBuyer.identity_verification_status === 1 ||
        this.dataAccountBuyer.identity_verification_status === 3
      ) {
        this.statusIdentity = "未確認";
      } else if (this.dataAccountBuyer.identity_verification_status === 2) {
        this.statusIdentity = "認証待ちです";
      } else if (this.dataAccountBuyer.identity_verification_status === 4) {
        this.statusIdentity = "本人確認済み";
      }
      this.preload = false;
    },

    detailService() {
      this.preload = true;
      if (this.detailService.service_type_id != 4) {
        this.typeContent = true;
      } else {
        this.typeContent = false;
        this.urlWebsite = this.detailService.url_website;
      }
      this.seller_id = this.detailService.seller_id;
      this.preload = false;
    },
  },
  methods: {
    getListCourse() {
      const request = {
        hash_id: this.$route.params.idService === null ? localStorage.getItem("hash_id_detail") : this.$route.params.idService === undefined ? localStorage.getItem("hash_id_detail") : this.$route.params.idService,
        user_type: this.user_type,
        page: this.page,
        user_id: this.account_id,
      };
      this.serviceStore.getListCourseByHashId(request);
      localStorage.removeItem("hash_id_detail")
    },

    updatePage(page) {
      this.preloadList = true;
      (this.page = page), this.getListCourse();
      window.scrollTo(0, 1200);
    },

    payment(course_id) {
      if (this.serviceUsed) {
        this.toast.error(this.messagePayment.used_service, this.optionToast);
      } else {
        this.isLoading = true;
        if (this.detailService.service_type_id != 4) {
          if (this.statusIdentity == "本人確認済み") {
            this.$router.push(`/payment/${course_id}`);
          } else {
            this.$router.push(`/account/identity/verify`);
          }
        }
        this.isLoading = false;
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
