<template>
  <div class="editService-step11">
    <b-container fluid
      ><b-row
        ><b-col cols="12" xl="6" class="g-0"
          ><div class="editService-step1-left flex flex-col justify-between">
            <div class="editService-step1-left-form">
              <div class="step-title">
                料金コースが完了しました。別のコースも追加しますか？
              </div>
              <div class="step1-form" style="margin-bottom: 55px">
                <div class="step1-form-data relative">
                  <b-form-radio-group
                    v-model="selected"
                    :options="options"
                    stacked
                    class="w-full form-raido-custom"
                  ></b-form-radio-group>
                  <div
                    class="absolute descriptionYellow-absolute"
                    style="left: 150px; top: 50%; margin-bottom: 40px"
                  >
                    <div class="form-checkbox">
                      <b-form-checkbox
                        :value="true"
                        :nchecked-value="false"
                        v-model="checkbox"
                        class="form-checkbox-select"
                        >入力内容をコピーして追加する場合はチェック</b-form-checkbox
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="
                editService-step4-footer
                col col-12 col-xl-6
                g-0
                position-absolute
              "
            >
              <div class="editService-step11-left-btn flex">
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
            class="editService-step11-right flex flex-col items-center h-full"
          >
            <div
              class="editService-step11-right-title text-white flex items-end"
            >
              プレビュー <span class="mx-2">preview</span>
            </div>
            <div
              class="
                editService-step11-right-content
                flex
                items-center
                justify-center
              "
              style="margin-bottom: 80px"
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
                        {{ courseContent }}
                      </div>
                    </div>
                    <div class="flex flex-col">
                      <div class="textPrice flex justify-end">(送料・税込)</div>
                      <div class="coursePrice flex justify-end items-baseline">
                        {{ formatPrice(parseInt(coursePrice)) }} /<span
                          class="text-[18px]"
                        >
                          {{ cycle === 0 ? "月" : cycleFormat }}</span
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
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import { Message } from "@/utils/message";

export default {
  name: "Step11",

  setup() {
    const store = sellerStore();
    const toast = useToast();
    return {
      store,
      toast,
    };
  },

  components: {
    BootstrapIcon,
  },

  created() {
    let serviceName = localStorage.getItem("data-step-1");
    if (serviceName == null) {
      this.$router.push("/seller/service/create?step=1");
    }
    this.index = Number(this.$route.query.index);
    this.listCourse = JSON.parse(localStorage.getItem("list-course"));
    this.courseName = this.listCourse[this.index].name;
    this.courseContent = this.listCourse[this.index].content;
    this.coursePrice = this.listCourse[this.index].price;
    this.cycle = this.listCourse[this.index].cycle;
    if (this.listCourse[this.index].cycle_format === "") {
      this.cycleFormat = "月";
    } else {
      this.cycleFormat = this.listCourse[this.index].cycle_format;
    }
    if (this.store.listImgCourse.length > 0) {
      this.store.listImgCourse.forEach((item, index) => {
        if (this.index === index) {
          this.url = URL.createObjectURL(item.file);
        }
      });
    }
  },

  data() {
    return {
      courseName: "",
      selected: "1",
      options: [
        { text: "追加しない", value: "1" },
        { text: "追加する", value: "2" },
      ],
      dataImageCourse: [],
      coursePrice: 0,
      courseContent: "",
      checkbox: false,
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      listCourse: [],
      listCourseCreating: [],
      message: Message.SELLER,
      cycle: 1,
      copyCourse: "",
      detailCopyCourse1: {},
      cycleFormat: "",
    };
  },

  watch: {
    "$route.query.step"() {
      this.queryData = Number(this.$route.query.step);
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

  methods: {
    reloadPage(e) {
      return (e.returnValue = "終了してよろしいですか？");
    },

    formatPrice(value) {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(value);
    },

    nextStep() {
      let data_step_4 = localStorage.getItem("data-step-4");
      if (this.selected === "1") {
        for (let i = 0; i < this.listCourse.length; i++) {
          if (this.index < this.listCourse[i].index) {
            this.listCourse.splice(i, 1);
            this.store.listImgCourse.splice(this.index + 1, 1);
          }
        }
        localStorage.setItem("list-course", JSON.stringify(this.listCourse));

        if (data_step_4 == 1) {
          this.$router.push("/seller/service/delivery");
        } else if (data_step_4 == 2 || data_step_4 == 3) {
          this.$router.push("/seller/service/reserve");
        } else if (data_step_4 == 4 || data_step_4 == 5) {
          this.$router.push("/seller/service/create?step=8");
        }
      } else {
        if (!this.checkbox) {
          let lastItem = this.listCourse[this.listCourse.length - 1];
          if (lastItem.name !== "") {
            for (let i = 0; i < this.listCourse.length; i++) {
              if (this.index !== this.listCourse[i].index) {
                this.listCourse.splice(this.index + 1, 1);
                // this.store.listImgCourse.splice(0, 1);
              }
            }
            let listCourseData = {
              index: this.index + 1,
              name: "",
              price: null,
              cycle: 1,
              age_confirm: 0,
              gender_restrictions: null,
              content: "",
              max: null,
              firstPr: 0,
              course_images: "",
              isUpdate: false,
              cycle_format: "",
            };
            this.listCourse.push(listCourseData);
            localStorage.setItem(
              "list-course",
              JSON.stringify(this.listCourse)
            );
          }
        } else {
          let lastItem = this.listCourse[this.listCourse.length - 1];
          if (lastItem.name === "") {
            this.listCourse.splice(lastItem.index, 1);
          }
          lastItem = this.listCourse[this.listCourse.length - 1];
          if (lastItem.index === this.listCourse[this.index].index) {
            let copyCourse = {
              index: this.index + 1,
              name: lastItem.name,
              price: lastItem.price,
              cycle: lastItem.cycle,
              age_confirm: lastItem.age_confirm,
              gender_restrictions: lastItem.gender_restrictions,
              content: lastItem.content,
              max: null,
              firstPr: lastItem.firstPr,
              course_images: "",
              isUpdate: false,
              cycle_format: lastItem.cycle_format,
            };
            this.listCourse.push(copyCourse);
            let lastImg =
              this.store.listImgCourse[this.store.listImgCourse.length - 1];
            var img = {
              index: this.index + 1,
              file: lastImg.file,
            };
            this.store.setImageCourseService(img);
          }

          localStorage.setItem("list-course", JSON.stringify(this.listCourse));
        }
        this.$router.push(
          `/seller/service/service-course/create?step=1&index=${this.index + 1}`
        );
      }
    },

    backStep() {
      this.$router.push(
        `/seller/service/service-course/create?step=6&index=${this.index}`
      );
    },
  },
};
</script>

<style></style>
