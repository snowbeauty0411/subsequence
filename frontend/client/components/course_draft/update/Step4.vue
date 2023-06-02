<template>
  <div class="editService-step7">
    <b-container fluid
      ><b-row
        ><b-col cols="12" lg="6" class="g-0"
          ><div class="editService-step7-left flex flex-col justify-between">
            <div class="editService-step7-left-form">
              <div class="d-flex">
                <div class="step-title">初月無料にしますか？</div>
                <span class="mt-4 step-note text-danger">※</span>
              </div>
              <div class="form-label">
                初月無料とした場合、2回目からの請求となります。
              </div>
              <div class="step7-form">
                <div class="step7-form-data">
                  <b-form-radio-group
                    v-model="firstPr"
                    :options="options"
                    stacked
                    class="w-full form-raido-custom"
                  ></b-form-radio-group>
                </div>
              </div>
            </div>
            <div class="editService-step7-left-btn">
              <div
                class="text-danger"
                style="padding: 0 22px; margin-bottom: 20px"
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
                  v-on:click="nextStep()"
                >
                  次へ
                </b-button>
              </div>
            </div>
          </div></b-col
        ><b-col cols="12" lg="6" class="g-0"
          ><div
            class="
              editService-step7-right
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
export default {
  name: "Step7",

  data() {
    return {
      firstPr: "0",
      options: [
        { text: "しない", value: "0" },
        { text: "する", value: "1" },
      ],
      queryData: null,
      detailCourse: {},
      listCourseNew: {},
    };
  },

  created() {
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
    this.firstPr = this.detailCourse.firstPr;
  },

  watch: {
    firstPr() {
      this.detailCourse.firstPr = this.firstPr;
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

    nextStep() {
      this.detailCourse.firstPr = this.firstPr;
      if (this.detailCourse.isUpdate === true) {
        localStorage.setItem("detailCourse", JSON.stringify(this.detailCourse));
      } else {
        localStorage.setItem("list-course", JSON.stringify(this.detailCourse));
      }
      this.$router.push("/seller/service/service-course-draft/update?step=5");
    },

    backStep() {
      this.$router.push("/seller/service/service-course-draft/update?step=3");
    },
  },
};
</script>

<style></style>
