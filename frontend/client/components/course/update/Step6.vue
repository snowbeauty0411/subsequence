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
                <span class="ml-2 mt-4">※あとから編集不可</span>
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
                style="padding: 0 22px; margin-bottom: 20px"
              >
                <span
                  >※あとから編集不可の項目はコースに契約者が存在する場合変更することができません。</span
                ><br />
                <span>お間違えのないよう確認してご入力ください。</span>
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
import { useToast } from "vue-toastification";
import Cookies from "js-cookie";

export default {
  name: "Step9",
  components: {
    SDPreLoad,
  },
  setup() {
    const store = sellerStore();
    const toast = useToast();
    return {
      store,
      toast
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
      optionToast: {
        type: "error",
        position: "top-right",
        duration: 3000,
        keepOnHover: true,
        singleton: true,
        theme: "toasted-primary",
        iconPack: "material",
        fitToScreen: true,
      },
    };
  },

  created() {
    this.queryData = Number(this.$route.query.step);
    let isReloadPage = localStorage.getItem("reloadPage");
    this.idService = localStorage.getItem("idService");
    if (isReloadPage === "true") {
      this.$router.push(`/seller/service/${this.idService}/edit`);
    }
    this.detailCourse = JSON.parse(localStorage.getItem("detailCourse"));
    this.listCourseNew = JSON.parse(localStorage.getItem("listCourseNew"));
    if (this.detailCourse === null) {
      this.detailCourse = this.listCourseNew;
    }
    this.idService = localStorage.getItem("idService");
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

    if (this.store.imgCourseEdit.length > 0) {
      this.store.imgCourseEdit.map((item) => {
        this.detailCourse.course_images = item.file;
      });
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
        localStorage.setItem(
          "listCourseNew",
          JSON.stringify(this.detailCourse)
        );
      }
    },

    createCourseSuccess() {
      if (this.createCourseSuccess) {
        this.preload = false;
        this.store.createCourseSuccess = false;
        localStorage.setItem("CRUDCourseSuccess", true);
        if(this.detailCourse.isUpdate === true) {
          this.toast.success("サービス更新に成功しました。");
        } else {
          this.toast.success("コース追加に成功しました");
        }
        this.$router.push(`/seller/service/${this.idService}/edit`)
      } else {
        this.preload = false;
      }
    },
  },

  // mounted() {
  //   window.addEventListener("beforeunload", this.reloadPage, { capture: true });
  // },

  // beforeUnmount() {
  //   window.removeEventListener("beforeunload", this.reloadPage, {
  //     capture: true,
  //   });
  // },

  methods: {
    reloadPage(e) {
      localStorage.setItem("reloadPage", true);
      localStorage.setItem("idService", this.idService);
      return (e.returnValue = "終了してよろしいですか？");
    },

    complete() {
      this.preload = true;
      this.detailCourse.gender_restrictions = Number(this.gender_restrictions);
      const listCourse = JSON.parse(localStorage.getItem("listCourse"));
      if (this.detailCourse.isUpdate === true) {
        listCourse.map((item, index) => {
          if (item.course_id === this.detailCourse.course_id) {
            listCourse[index] = this.detailCourse;
          }
        });
      } else {
        listCourse.push(this.detailCourse);
      }

      const dataForm = new FormData();
      dataForm.append("service_id", localStorage.getItem("service_id"));
      dataForm.append("hash_id", localStorage.getItem("idService"));
      dataForm.append("seller_id", localStorage.getItem("account_id") !== null ? localStorage.getItem("account_id") : Cookies.get("account_id"));
      dataForm.append(
        "course_id",
        this.detailCourse.isUpdate === true ? this.detailCourse.course_id : null
      );

      dataForm.append("name", this.detailCourse.name);
      dataForm.append("price", this.detailCourse.price);
      dataForm.append("cycle", this.detailCourse.cycle);
      dataForm.append("content", this.detailCourse.content);
      dataForm.append("firstPr", this.detailCourse.firstPr);
      if (typeof this.detailCourse.course_images === 'object') {
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
      this.$router.push("/seller/service/service-course/update?step=5");
    },
  },
};
</script>

<style></style>
