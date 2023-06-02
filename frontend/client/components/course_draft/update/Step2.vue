<template>
  <div class="editService-step5">
    <b-container fluid
      ><b-row
        ><b-col cols="12" xl="6" class="g-0"
          ><div
            class="editService-step5-left h-full flex flex-col justify-between"
          >
            <div class="editService-step5-left-form">
              <div class="d-flex">
                <div class="step-title">コースの内容を教えてください。</div>
                <span class="mt-4 step-note text-danger">※</span>
              </div>
              <div class="step5-form">
                <div class="form-label">コース内容の説明</div>
                <div class="relative validate-form">
                  <b-form-textarea
                    id="textarea-rows"
                    placeholder="ここに説明文が入ります。"
                    rows="9"
                    maxlength="300"
                    v-bind:change="onChangeTextarea()"
                    v-model="v$.content.$model"
                    v-bind:class="{ 'is-invalid': v$.content.$error }"
                  ></b-form-textarea>
                  <div v-if="v$.content.$error" class="error-text">
                    <p v-if="v$.content.required.$invalid">
                      {{ message.course_content }}
                    </p>
                  </div>
                </div>
                <div class="description-textarea text-end">
                  残り{{ remaining }}文字
                </div>
              </div>
            </div>
            <div
              class="
                editService-step5-footer
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
              <div class="editService-step5-left-btn flex">
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
            class="editService-step5-right flex flex-col items-center h-full"
          >
            <div
              class="editService-step5-right-title text-white flex items-end"
            >
              プレビュー <span class="mx-2">preview</span>
            </div>
            <div
              class="
                editService-step5-right-content
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
                        {{ formatPrice(parseInt(coursePrice)) }} /<span
                          class="text-[18px]"
                        >
                        {{ this.detailCourse.cycle_format === "" ? "月" : this.detailCourse.cycle_format  }}</span

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
import { required, minLength } from "@vuelidate/validators";

export default {
  name: "step5",

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

  data() {
    return {
      content: "",
      courseName: "",
      url: null,
      remaining: 300,
      message: Message.SELLER,
      queryData: null,
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      coursePrice: 0,
      cycle: 1,
      detailCourse: {},
      listCourseNew: {},
    };
  },

  validations: {
    content: {
      required,
      minLength: minLength(1),
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
      if (Number(this.detailCourse.cycle) == 1) {
        this.cycle = 1 + this.detailCourse.cycle_format;
      } else {
        this.cycle = Number(this.detailCourse.cycle);
      }
    } else {
      this.cycle = 1;
    }
    this.coursePrice =
      this.detailCourse.price === null ? 0 : this.detailCourse.price;
    this.content = this.detailCourse.content;
    if (this.store.listImgCourse.length > 0) {
      // this.store.imgCourseService.map((item) => {
      // if (item.course_id === this.detailCourse.course_id) {
      this.url = URL.createObjectURL(this.store.imgCourseService);
      // }
      // });
    } else {
      this.url =
        this.detailCourse.course_images !== ""
          ? this.detailCourse.course_images
          : null;
    }
  },

  components: {
    BootstrapIcon,
  },

  computed: {
    ...mapState(sellerStore, ["imgCourseService", "imgCourseEdit"]),
  },

  watch: {
    "$route.query.step"() {
      this.queryData = Number(this.$route.query.step);
    },

    content() {
      this.detailCourse.content = this.content;
      if (this.detailCourse.isUpdate === true) {
        localStorage.setItem("detailCourse", JSON.stringify(this.detailCourse));
      } else {
        localStorage.setItem("list-course", JSON.stringify(this.detailCourse));
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

    async nextStep() {
      const result = await this.v$.$validate();
      if (!result) {
      } else {
        this.detailCourse.content = this.content;
        if (this.detailCourse.isUpdate === true) {
          localStorage.setItem(
            "detailCourse",
            JSON.stringify(this.detailCourse)
          );
        } else {
          this.listCourseNew.content = this.content;
          localStorage.setItem(
            "list-course",
            JSON.stringify(this.listCourseNew)
          );
        }
        this.$router.push("/seller/service/service-course-draft/update?step=3");
      }
    },

    backStep() {
      this.$router.push("/seller/service/service-course-draft/update?step=1");
    },

    onChangeTextarea() {
      if (this.content) {
        this.remaining = 300 - this.content.length;
      }
    },
  },
};
</script>

<style></style>
