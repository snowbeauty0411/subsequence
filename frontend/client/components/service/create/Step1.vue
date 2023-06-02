<template>
  <div class="createService-step1">
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="createService-step1-left flex flex-col justify-between">
            <div class="createService-step1-left-form">
              <div class="d-flex">
                <div class="step-title">
                  まずは新しいサービス名を入力しましょう。
                </div>
                <span class="text-danger mt-3 step-note">※</span>
              </div>
              <div class="step1-form">
                <div class="form-label">サービス名</div>
                <div class="relative validate-form">
                  <b-form-input
                    v-model.trim="v$.serviceName.$model"
                    placeholder="サービス名"
                    class="custom-input"
                    v-bind:class="{ 'is-invalid': v$.serviceName.$error }"
                  />
                  <div v-if="v$.serviceName.$error" class="error-text">
                    <p v-if="v$.serviceName.required.$invalid">
                      {{ message.service_name_required }}
                    </p>
                    <p v-if="v$.serviceName.maxLength.$invalid">
                      {{ message.service_name_maxlength }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="createService-step1-left-btn">
              <div
                class="text-danger"
                style="padding: 0 22px; margin-bottom: 20px"
              >
                <b-row>
                  <b-col cols="2" class="col-start"><span class="step-note">※</span></b-col>
                  <b-col cols="10" class="col-text-note">
                    <span
                      >この項目は、契約者が存在する場合変更することができません。</span
                    ><br />
                    <span class=""
                      >お間違えのないよう確認してご入力ください。</span
                    >
                  </b-col>
                </b-row>
              </div>
              <div class="flex">
                <b-button
                  v-on:click="backStep()"
                  class="
                    btn-return
                    flex
                    justify-center
                    items-center
                    btn-step-common
                  "
                >
                  戻る
                </b-button>
                <b-button
                  v-on:click="nextStep()"
                  class="
                    btn-next
                    flex
                    items-center
                    justify-center
                    btn-step-common
                  "
                >
                  次へ
                </b-button>
              </div>
            </div>
          </div></b-col
        ><b-col cols="12" lg="6" class="g-0"
          ><div
            class="createService-step1-right"
            :style="'background-image: url(' + bgCreate + ')'"
          ></div></b-col></b-row
    ></b-container>
    <!-- <b-modal v-model="refreshPage">sss</b-modal> -->
  </div>
</template>

<script>
import bgCreate from "@/assets/images/bgCreateService.png";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { Message } from "@/utils/message";
import { ServiceStore } from "@/store/service/index.ts";
import { mapState } from "pinia";
import { sellerStore } from "@/store/seller";

export default {
  setup() {
    const v$ = useVuelidate();
    const store = ServiceStore();
    const storeSeller = sellerStore();

    return {
      v$,
      store,
      storeSeller,
    };
  },
  name: "Step1",

  data() {
    return {
      message: Message.SELLER,
      serviceName: "",
      bgCreate,
      queryData: this.$route.query.step,
      isEditDraftService: false,
    };
  },

  validations: {
    serviceName: {
      required,
      maxLength: maxLength(30),
      minLength: minLength(1),
    },
  },

  created() {
    this.queryData = Number(this.$route.query.step);
    let serviceName = localStorage.getItem("data-step-1");
    if (serviceName !== "" || serviceName !== null) {
      this.serviceName = serviceName;
    }
    if (serviceName === null && !this.$route.query.hash_id) {
      // this.$router.go();
      this.serviceName = "";
      localStorage.setItem("data-step-1", this.serviceName);
      localStorage.removeItem("typeSelected");
    }
    if (this.$route.query.hash_id !== undefined) {
      this.isEditDraftService = true;
      localStorage.setItem("isNewService", false);
    }
  },

  computed: {
    ...mapState(sellerStore, ["listFiles", "imgCourseService", "dataAddress"]),
    ...mapState(ServiceStore, ["detailService"]),
  },

  watch: {
    "$route.query.step"() {
      this.queryData = Number(this.$route.query.step);
    },

    detailService() {
      this.serviceName = this.detailService.name;
    },

    serviceName() {
      if (this.isEditDraftService) {
        const serviceName = localStorage.getItem("data-step-1");
        if (serviceName != null) {
          localStorage.setItem("data-step-1", this.serviceName);
        }
      } else {
        localStorage.setItem("data-step-1", this.serviceName);
      }
    },
  },

  mounted() {
    window.addEventListener("beforeunload", this.reloadPage, { capture: true });
  },

  beforeUnmount() {
    window.removeEventListener("beforeunload", this.reloadPage, {
      capture: true,
    });
  },

  methods: {
    reloadPage(e) {
      return (e.returnValue = "終了してよろしいですか？");
    },

    async nextStep() {
      const result = await this.v$.$validate();
      if (!result) {
      } else if (this.isEditDraftService) {
        localStorage.setItem("data-step-1", this.serviceName);
        const hash_id = this.$route.query.hash_id;
        this.$router.push(`/seller/service/create?step=2&hash_id=${hash_id}`);
      } else {
        localStorage.setItem("data-step-1", this.serviceName);
        this.$router.push("/seller/service/create?step=2");
      }
    },

    backStep() {
      this.clearData();
      this.$router.push("/seller/service/management");
    },

    clearData() {
      localStorage.removeItem("data-step-1");
      localStorage.removeItem("data-step-2");
      localStorage.removeItem("id-step-2");
      localStorage.removeItem("checkListPrefectures");
      localStorage.removeItem("isActive");
      localStorage.removeItem("isFull");
      localStorage.removeItem("checkAreas");
      localStorage.removeItem("checkAllFlag");
      localStorage.removeItem("data-step-area_id-3");
      localStorage.removeItem("data-step-5-catchCopy");
      localStorage.removeItem("checkNational");
      localStorage.removeItem("data-step-4");
      localStorage.removeItem("imageDraftService");
      localStorage.removeItem("data-step-6");
      localStorage.removeItem("data-step-7");
      localStorage.removeItem("list-course-add");
      localStorage.removeItem("hash_id");
      localStorage.removeItem("id");
      localStorage.removeItem("interval");
      localStorage.removeItem("skip");
      localStorage.removeItem("with_skip");
      localStorage.removeItem("month_delivery");
      localStorage.removeItem("listTagDelete");
      localStorage.removeItem("isPrivate-step-8");
      localStorage.removeItem("id-step-8");
      localStorage.removeItem("data-step-10");
      localStorage.removeItem("data-step-9");
      localStorage.removeItem("data-step-9-error");
      localStorage.removeItem("hash_id-step-8");
      localStorage.removeItem("changeData");
      localStorage.removeItem("list-course");
      localStorage.removeItem("data-step-7-new");
      localStorage.removeItem("data-step-5-image");
      localStorage.removeItem("data-step-11-websiteUrl");
      localStorage.removeItem("zipCode");
      localStorage.removeItem("data-step-10-max");
      localStorage.removeItem("data-step-11-address");
      localStorage.removeItem("listAreaStep11");
      localStorage.removeItem("service_reserve_setting");
      localStorage.removeItem("is_reserves");
      localStorage.removeItem("course-name");
      localStorage.removeItem("course-price");
      localStorage.removeItem("course-cycle");
      localStorage.removeItem("course-content");
      localStorage.removeItem("course-firstPr");
      localStorage.removeItem("course-age_confirm");
      localStorage.removeItem("course-gender_restrictions");
      localStorage.removeItem("next-step-9");
      localStorage.removeItem("addedImage");
      localStorage.removeItem("copyCourse");
      localStorage.removeItem("moreCourse");
      localStorage.removeItem("detailCopyCourse");
      localStorage.removeItem("backCourse1");
      localStorage.removeItem("area");
      localStorage.removeItem("service_hours");
      this.storeSeller.listFiles = [];
      this.storeSeller.imgCourseService = [];
      this.storeSeller.dataAddress = {};
    },
  },
};
</script>
<style lang="scss">
@import "~/assets/scss/seller/index.scss";
</style>
