<template>
  <div class="editService-step6">
    <b-container fluid
      ><b-row
        ><b-col cols="12" xl="6" class="g-0"
          ><div
            class="editService-step6-left h-full flex flex-col justify-between"
          >
            <div class="editService-step6-left-form">
              <div class="d-flex">
                <div class="step-title">
                  料金の請求サイクルを設定しましょう。
                </div>
                <span class="mt-4 step-note text-danger">※</span>
              </div>
              <div class="step6-form-data relative">
                <div class="form-label">請求サイクル</div>
                <b-form-select
                  v-model="cycle"
                  :options="options"
                  size="sm"
                  class="form-select-custom"
                  :disabled="disabledCycle"
                ></b-form-select>
              </div>
              <div class="step-title mt-5">料金を入力してください。</div>
              <div class="text-[#7E7D7D] text-[14px] mb-3 font-semibold">
                売上金額は料金価格からサービス手数料（5％）を減じた額になります。
              </div>
              <div class="step6-form">
                <div class="form-label">価格（送料、税込）</div>
                <div class="relative validate-form">
                  <b-form-input
                    v-model.trim="v$.price.$model"
                    placeholder="コース料金"
                    class="custom-input"
                    v-bind:class="{ 'is-invalid': v$.price.$error }"
                    maxlength="7"
                    id="priceCourse"
                    @blur="formatNumber()"
                    @keypress="onlyNumber($event)"
                  />
                  <div class="step-description text-end">10円単位</div>
                  <div v-if="v$.price.$error" class="error-text">
                    <p v-if="v$.price.required.$invalid">
                      {{ message.price_required }}
                    </p>
                    <p v-if="v$.price.regexNumber.$invalid">
                      {{ message.price_value }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="
                editService-step6-footer
                col col-12 col-lg-6
                g-0
                position-absolute
              "
            >
              <div
                class="text-danger"
                style="padding: 0 30px; margin-bottom: 10px"
              >
                <b-row>
                  <b-col cols="2" class="col-start"
                    ><span class="step-note">※</span></b-col
                  >
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
              <div class="editService-step6-left-btn flex">
                <b-button
                  class="
                    btn-return
                    flex
                    justify-center
                    items-center
                    btn-step-common
                  "
                  v-on:click="backStep()"
                >
                  戻る
                </b-button>
                <b-button
                  class="
                    btn-next
                    flex
                    items-center
                    justify-center
                    btn-step-common
                  "
                  v-on:click="nextStep()"
                >
                  次へ
                </b-button>
              </div>
            </div>
          </div></b-col
        ><b-col cols="12" xl="6" class="g-0"
          ><div
            class="editService-step6-right flex flex-col items-center h-full"
          >
            <div
              class="editService-step6-right-title text-white flex items-end"
            >
              プレビュー <span class="mx-2">preview</span>
            </div>
            <div
              class="
                editService-step6-right-content
                flex
                items-center
                justify-center
              "
            >
              <div class="item-content flex w-full">
                <div
                  class="item-content-left mb-[50px]"
                  :style="'background-image: url(' + url + ')'"
                ></div>
                <div class="item-content-right flex">
                  <div class="w-[50px]">
                    <BootstrapIcon
                      icon="check"
                      size="2x"
                      style="color: #5e5c5c"
                      class="mx-2"
                      v-if="courseName !== ''"
                    />
                  </div>
                  <div
                    class="flex flex-col w-full justify-between"
                    style="width: calc(100% - 50px)"
                  >
                    <div class="flex flex-col">
                      <div class="courseName">{{ courseName }}</div>
                      <div
                        class="courseDescription white-space"
                        style="height: 70px; overflow: hidden"
                      >
                        {{ content }}
                      </div>
                    </div>
                    <div class="flex flex-col">
                      <div class="textPrice flex justify-end">(送料・税込)</div>
                      <div class="coursePrice flex justify-end items-baseline">
                        {{ formatPrice(coursePrice) }}
                        /<span class="text-[18px]">
                          {{
                            cycle === 1 ? "月" : this.detailCourse.cycle_format
                          }}</span
                        >
                      </div>
                      <div
                        class="
                          btn-buy
                          flex
                          items-center
                          w-full
                          justify-center
                          py-2
                        "
                      >
                        <BootstrapIcon
                          icon="cart"
                          size="sm"
                          class="mx-2"
                        /><span>サブスクする</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></b-col
        ></b-row
      ></b-container
    >
  </div>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { Message } from "@/utils/message";
import { useToast } from "vue-toastification";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const regexNumber = (value) => {
  let isNotFullWidth = true;
  if (value) {
    const regex = /^[0-9]*[1-9][0-9]*$/;
    const found = regex.test(value);
    if (found && Number(value) % 10 == 0) {
      isNotFullWidth = true;
    } else {
      isNotFullWidth = false;
    }
  }
  return isNotFullWidth;
};

export default {
  name: "step6",

  data() {
    return {
      courseName: "",
      url: null,
      cycle: 1,
      options: [
        { text: "1ヶ月（30日）", value: 1, textValue: "月" },
        { text: "2ヶ月（60日）", value: 2, textValue: "2ヶ月" },
        { text: "3ヶ月（90日）", value: 3, textValue: "3ヶ月" },
        { text: "4ヶ月（120日）", value: 4, textValue: "4ヶ月" },
      ],
      content: "",
      message: Message.SELLER,
      queryData: null,
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      content: "",
      price: null,
      coursePrice: 0,
      isNotFullWidth: true,
      disabledCycle: false,
      detailCourse: {},
      copyCourse: "",
      detailCopyCourse1: {},
      listCourseNew: {},
    };
  },

  setup() {
    const toast = useToast();
    const store = sellerStore();
    const v$ = useVuelidate();
    return {
      toast,
      store,
      v$,
    };
  },

  validations: {
    price: {
      required,
      regexNumber,
    },
  },

  created() {
    window.scrollTo(0, 0);
    this.queryData = Number(this.$route.query.step);
    let isReloadPage = localStorage.getItem("reloadPage");
    this.idService = localStorage.getItem("idService");
    this.hash_id = localStorage.getItem("hash_id-step-8");
    if (isReloadPage === "true") {
      this.$router.push(
        `/seller/service/service-course-draft/list?hash_id=${this.hash_id}`
      );
    }
    this.detailCourse = JSON.parse(localStorage.getItem("detailCourse"));
    this.listCourseNew = JSON.parse(localStorage.getItem("list-course"));
    if (this.detailCourse === null) {
      this.detailCourse = this.listCourseNew;
    }

    this.courseName = this.detailCourse.name;
    if (this.detailCourse.cycle !== null) {
      if (Number(this.detailCourse.cycle) === 1) {
        this.cycle = 1;
      } else {
        this.cycle = Number(this.detailCourse.cycle);
      }
    } else {
      this.cycle = null;
    }
    this.price = this.detailCourse.price;
    this.content = this.detailCourse.content;
    if (this.store.listImgCourse.length > 0) {
      this.url = URL.createObjectURL(this.store.imgCourseService);
    } else {
      this.url =
        this.detailCourse.course_images !== ""
          ? this.detailCourse.course_images
          : null;
    }
    let typeServiceId = localStorage.getItem("data-step-4");
    let typeServiceIdInit = localStorage.getItem("data-step-4");
    if (typeServiceId != null) {
      if (Number(typeServiceId) == 1) {
        this.disabledCycle = true;
      } else {
        this.disabledCycle = false;
      }
    } else {
      if (Number(typeServiceIdInit) == 1) {
        this.disabledCycle = true;
      } else {
        this.disabledCycle = false;
      }
    }
  },

  watch: {
    "$route.query.step"() {
      this.queryData = Number(this.$route.query.step);
    },

    price() {
      if (this.price != "" && this.price != null) {
        if (this.price) {
          const regex = /^[0-9]*[1-9][0-9]*$/;
          const found = regex.test(this.price);
          if (found) {
            this.coursePrice = this.price;
            this.detailCourse.price = this.price;
            if (this.detailCourse.isUpdate === true) {
              localStorage.setItem(
                "detailCourse",
                JSON.stringify(this.detailCourse)
              );
            } else {
              localStorage.setItem(
                "list-course",
                JSON.stringify(this.detailCourse)
              );
            }
          } else {
            this.coursePrice = 0;
          }
        }
      }
    },

    cycle() {
      this.detailCourse.cycle = this.cycle;
      this.detailCourse.cycle_format = this.filterCycle(this.cycle);
      if (this.detailCourse.isUpdate === true) {
        localStorage.setItem("detailCourse", JSON.stringify(this.detailCourse));
      } else {
        localStorage.setItem("list-course", JSON.stringify(this.detailCourse));
      }
    },
  },

  computed: {
    ...mapState(sellerStore, ["imgCourseService"]),
  },

  mounted() {
    window.addEventListener("beforeunload", this.reloadPage, { capture: true });
  },

  beforeUnmount() {
    window.removeEventListener("beforeunload", this.reloadPage, {
      capture: true,
    });
  },

  components: {
    BootstrapIcon,
  },

  methods: {
    reloadPage(e) {
      localStorage.setItem("reloadPage", true);
      localStorage.setItem("idService", this.idService);
      return (e.returnValue = "終了してよろしいですか？");
    },

    formatPrice(value) {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(value);
    },

    formatNumber() {
      if (/^0/.test(this.price) || /^０/.test(this.price)) {
        this.price = this.price.replace(/^0/, "").replace(/^０/, "");
      }
    },

    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },

    priceFormat() {
      String.prototype.splice = function (idx, rem, str) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
      };
      var text = this.price;
      document.getElementById("priceCourse").blur();
      document.getElementById("priceCourse").focus();
      if (text) {
        text = text
          .toString()
          .replace(/[^0-9０-９]/g, "")
          .replace(/(\..*)\./g, "$1");
        text = text.replaceAll(",", "");
      }
      this.price = text;
    },

    async nextStep() {
      if (/^[０-９]/.test(this.price)) {
        this.toast.error(this.message.enter_halfwidth, this.optionToast);
        return;
      }
      const result = await this.v$.$validate();

      if (!result) {
      } else {
        if (Number(this.price) < 500 || Number(this.price) > 9999999) {
          this.toast.error(this.message.price_invalid, this.optionToast);
        } else {
          this.detailCourse.cycle = this.cycle;
          this.detailCourse.price = this.price;
          this.detailCourse.cycle_format = this.filterCycle(this.cycle);
          if (this.detailCourse.isUpdate === true) {
            localStorage.setItem(
              "detailCourse",
              JSON.stringify(this.detailCourse)
            );
          } else {
            localStorage.setItem(
              "list-course",
              JSON.stringify(this.detailCourse)
            );
          }
          this.$router.push(
            "/seller/service/service-course-draft/update?step=4"
          );
        }
      }
    },

    backStep() {
      this.$router.push("/seller/service/service-course-draft/update?step=2");
    },

    filterCycle(cycle) {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].value === cycle) {
          return this.options[i].textValue;
        }
      }
    },
  },
};
</script>

<style></style>
