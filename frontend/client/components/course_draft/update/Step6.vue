<template>
  <div class="editService-step9">
    <SDPreLoad :preload="preload" />
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="editService-step9-left flex flex-col justify-between">
            <div class="editService-step9-left-form">
              <div class="d-flex">
                <div class="step-title">
                  このコースには性別制限が必要ですか？
                </div>
                <span class="mt-4 step-note text-danger">※</span>
              </div>
              <div class="step9-form">
                <div class="step9-form-data">
                  <b-form-radio-group
                    v-model="gender_restrictions"
                    :options="options"
                    stacked
                    class="w-full form-raido-custom"
                  ></b-form-radio-group>
                </div>
              </div>
            </div>
            <div class="editService-step9-left-btn">
              <div
                class="text-danger"
                style="padding: 22px; margin-bottom: 10px"
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
              <div class="flex">
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
                  v-on:click="complete()"
                >
                  完了
                </b-button>
              </div>
            </div>
          </div></b-col
        ><b-col cols="12" lg="6" class="g-0"
          ><div
            class="
              editService-step9-right
              flex flex-col
              items-center
              justify-between
              h-full
            "
          ></div></b-col></b-row
    ></b-container>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { sellerStore } from "@/store/seller";
import SDPreLoad from "@/components/SDPreLoad";
import Cookies from "js-cookie";

export default {
  name: "Step9",
  components: {
    SDPreLoad,
  },
  setup() {
    const store = sellerStore();
    return {
      store,
    };
  },

  data() {
    return {
      gender_restrictions: "0",
      options: [
        { text: "不要", value: "0" },
        { text: "女性のみ利用可能", value: "1" },
        { text: "男性のみ利用可能", value: "2" },
      ],
      isEditDraftService: false,
      isEditServiceOnly: "",
      detailCourse: {},
      copyCourse: "",
      listCourseNew: {},
      preload: false,
    };
  },

  created() {
    window.scrollTo(0, 0);
    this.queryData = Number(this.$route.query.step);
    let isReloadPage = localStorage.getItem("reloadPage");
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
    let gender_restrictions = this.detailCourse.gender_restrictions;
    if (
      gender_restrictions &&
      gender_restrictions != "null" &&
      gender_restrictions != "0"
    ) {
      this.gender_restrictions = gender_restrictions;
    } else {
      this.gender_restrictions = "0";
    }

    if (this.store.listImgCourse.length > 0) {
      this.detailCourse.course_images = this.store.imgCourseService;
    }
  },

  computed: {
    ...mapState(sellerStore, ["createCourseSuccess", "messageCourse"]),
  },

  watch: {
    gender_restrictions() {
      this.detailCourse.gender_restrictions = Number(this.gender_restrictions);
      if (this.detailCourse.isUpdate === true) {
        localStorage.setItem("detailCourse", JSON.stringify(this.detailCourse));
      } else {
        localStorage.setItem("list-course", JSON.stringify(this.detailCourse));
      }
    },

    createCourseSuccess() {
      if (this.createCourseSuccess) {
        this.preload = true;
        this.store.createCourseSuccess = false;
        this.store.listImgCourse = [];
        localStorage.setItem("CRUDCourseSuccess", true);
        this.hash_id = localStorage.getItem("hash_id-step-8");
        this.$router.push(
          `/seller/service/service-course-draft/list?hash_id=${this.hash_id}`
        );
      } else {
        if (this.store.createCourseSuccess) {
          this.preload = false;
        }
      }
    },
  },

  methods: {
    reloadPage(e) {
      localStorage.setItem("reloadPage", true);
      localStorage.setItem("hashID", this.hashID);
      return (e.returnValue = "終了してよろしいですか？");
    },

    complete() {
      this.preload = true;
      this.detailCourse.gender_restrictions = Number(this.gender_restrictions);
      const listCourse = JSON.parse(localStorage.getItem("list-course"));
      if (this.detailCourse.isUpdate === true) {
        listCourse.map((item, index) => {
          if (item.course_id === this.detailCourse.course_id) {
            listCourse[index] = this.detailCourse;
          }
        });
      } else {
        // listCourse.push(this.detailCourse);
      }

      const dataForm = new FormData();
      dataForm.append("service_id", localStorage.getItem("service_id"));
      dataForm.append("hash_id", localStorage.getItem("idService"));
      dataForm.append(
        "seller_id",
        localStorage.getItem("account_id") !== null
          ? localStorage.getItem("account_id")
          : Cookies.get("account_id")
      );
      dataForm.append(
        "course_id",
        this.detailCourse.isUpdate === true ? this.detailCourse.course_id : null
      );

      dataForm.append("name", this.detailCourse.name);
      dataForm.append("price", this.detailCourse.price);
      dataForm.append("cycle", this.detailCourse.cycle);
      dataForm.append("content", this.detailCourse.content);
      dataForm.append("firstPr", this.detailCourse.firstPr);
      if (typeof this.detailCourse.course_images === "object") {
        dataForm.append("image", this.detailCourse.course_images);
      }
      dataForm.append(
        "gender_restrictions",
        this.detailCourse.gender_restrictions
      );
      dataForm.append("age_confirm", this.detailCourse.age_confirm);
      this.store.createCourse(dataForm);
      localStorage.removeItem("idService");
      localStorage.removeItem("detailCourse");
    },

    backStep() {
      this.$router.push("/seller/service/service-course-draft/update?step=5");
    },
  },
};
</script>

<style></style>
