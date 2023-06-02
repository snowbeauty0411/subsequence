<template>
  <div class="editService-step4">
    <b-container fluid
      ><b-row
        ><b-col cols="12" xl="6" class="g-0"
          ><div
            class="editService-step4-left h-full flex flex-col justify-between"
          >
            <div class="editService-step4-left-form">
              <div class="d-flex">
                <div class="step-title">
                  サービスの料金コースを設定していきましょう。
                </div>
                <span class="ml-2 mt-4">※あとから編集不可</span>
              </div>
              <div class="step4-form">
                <div class="form-label">料金コース名</div>
                <div class="relative validate-form">
                  <b-form-input
                    v-model.trim="v$.courseName.$model"
                    placeholder="コース名"
                    class="custom-input"
                    maxlength="50"
                    v-bind:class="{ 'is-invalid': v$.courseName.$error }"
                    v-bind:change="onChangeInput()"
                  />
                  <div class="description-textarea text-end">
                    残り{{ remaining }}文字
                  </div>
                  <div v-if="v$.courseName.$error" class="error-text">
                    <p v-if="v$.courseName.required.$invalid">
                      {{ message.course_name_required }}
                    </p>
                    <p v-if="v$.courseName.maxLength.$invalid">
                      {{ message.course_name_maxlength }}
                    </p>
                    <p v-if="v$.courseName.minLength.$invalid">
                      {{ message.course_name_minlength }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="step-title m3-5">画像を追加しましょう。</div>
              <div class="data-image-left w-1/2 relative">
                <b-overlay :show="loadingImg">
                  <label for="img1" class="w-full">
                    <div
                      class="data-image-left-item relative"
                      :class="url == null ? 'cursor-pointer' : 'cursor-default'"
                    >
                      <img
                        src="@/assets/images/iconCamera.png"
                        alt=""
                        class="absolute img-icon"
                        v-if="!url"
                      />
                      <img :src="url" alt="" class="absolute img-main" v-else />
                    </div>
                  </label>
                  <input
                    type="file"
                    class="hidden"
                    id="img1"
                    @change="onFileChangeImg1"
                    accept="image/png, .jpeg, .jpg"
                    :disabled="url"
                  />
                  <img
                    src="@/assets/images/iconTrash.png"
                    alt=""
                    v-if="url"
                    class="absolute img-trash"
                    v-on:click="removeImage()"
                  />
                </b-overlay>
              </div>
              <!-- <div
                class="text-danger"
                style="margin-bottom: 30px; margin-top: 10px"
              >
                <span
                  >※あとから編集不可の項目はコースに契約者が存在する場合変更することができません。</span
                ><br />
                <span>お間違えのないよう確認してご入力ください。</span>
              </div> -->
            </div>
            <div
              class="
                editService-step4-footer
                col col-12 col-lg-6
                g-0
                position-absolute
              "
            >
              <div class="editService-step4-left-btn">
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
            </div>
          </div></b-col
        ><b-col cols="12" xl="6" class="g-0"
          ><div
            class="editService-step4-right flex flex-col items-center h-full"
          >
            <div
              class="editService-step4-right-title text-white flex items-end"
            >
              プレビュー <span class="mx-2">preview</span>
            </div>
            <div
              class="
                editService-step4-right-content
                flex
                items-center
                justify-center
              "
            >
              <div class="item-content flex w-full">
                <div
                  class="item-content-left relative mb-[50px]"
                  :style="'background-image: url(' + url + ')'"
                >
                  <img
                    src="@/assets/images/iconCamera.png"
                    alt=""
                    class="absolute img-icon"
                    style="
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    "
                    v-if="!url"
                  />
                </div>
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
                        style="overflow: hidden"
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
import { required, minLength, maxLength } from "@vuelidate/validators";

export default {
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

  name: "Step1Course",

  data() {
    return {
      remaining: 50,
      courseName: "",
      url: null,
      message: Message.SELLER,
      queryData: null,
      optionToast: {
        position: "top-right",
        duration: 1000,
      },
      dataImageCourse: [],
      coursePrice: 0,
      courseContent: "",
      dataEditService: [],
      cycle: 0,
      amountCourse: 0,
      loadingImg: false,
      detailCourse: {},
      index: 1,
      hashID: "",
      serviceId: "",
      listCourseNew: {
        service_id: this.serviceId,
        hash_id: this.hashID,
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
      },
    };
  },

  validations: {
    courseName: {
      required,
      maxLength: maxLength(50),
      minLength: minLength(1),
    },
  },

  created() {
    window.scrollTo(0, 0);
    localStorage.removeItem("isEditService");
    this.queryData = Number(this.$route.query.step);
    let isReloadPage = localStorage.getItem("reloadPage");
    this.hashID = localStorage.getItem("idService");
    this.hash_id = localStorage.getItem("hash_id-step-8");
    this.serviceId = localStorage.getItem("service_id");
    if (isReloadPage === "true") {
      this.$router.push(
        `/seller/service/service-course-draft/list?hash_id=${this.hash_id}`
      );
    }
    this.index = Number(this.$route.query.index);
    let courseDetail = localStorage.getItem("detailCourse");
    this.detailCourse = JSON.parse(courseDetail);
    let listCourseNew = JSON.parse(localStorage.getItem("list-course"));
    if (this.detailCourse === null && listCourseNew === null) {
      this.detailCourse = this.listCourseNew;
    } else if (this.detailCourse === null) {
      this.detailCourse = listCourseNew;
    } else {
      this.detailCourse = JSON.parse(courseDetail);
    }
    this.courseName = this.detailCourse.name;

    if (this.detailCourse.cycle !== null) {
      if (Number(this.detailCourse.cycle) == 1) {
        this.cycle = 1;
      } else {
        this.cycle = Number(this.detailCourse.cycle);
      }
    } else {
      this.cycle = 1;
    }

    if (this.store.listImgCourse.length > 0) {
      // this.store.imgCourseService.forEach((item, index) => {
      // if (this.index === index) {
      this.url = URL.createObjectURL(this.store.imgCourseService);
      // }
      // });
    } else {
      this.url =
        this.detailCourse.course_images !== ""
          ? this.detailCourse.course_images
          : null;
    }

    this.coursePrice =
      this.detailCourse.price === null ? 0 : this.detailCourse.price;
    this.courseContent = this.detailCourse.content;
  },

  watch: {
    "$route.query.step"() {
      this.queryData = Number(this.$route.query.step);
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

  computed: {
    ...mapState(sellerStore, [
      "imgCourseService",
      "imgCourseEdit",
      "listCourse",
    ]),
  },

  components: {
    BootstrapIcon,
  },

  methods: {
    reloadPage(e) {
      localStorage.setItem("reloadPage", true);
      localStorage.setItem("idService", this.hashID);
      return (e.returnValue = "終了してよろしいですか？");
    },

    formatPrice(value) {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(value);
    },

    removeImage() {
      this.url = null;
      this.dataImageCourse.splice(
        this.dataImageCourse[this.dataImageCourse.length - 1],
        1
      );

      if (this.dataEditService.length > 0) {
        this.store.editImageCourseService(this.dataEditService);
      }
    },

    onFileChangeImg1(e) {
      if (this.url == null) {
        if (e.target.files[0].size / 1024 / 1024 > 10) {
          this.toast.error(this.message.max_size_image, this.optionToast);
        } else {
          this.loadingImg = true;
          setTimeout(() => {
            this.loadingImg = false;
            const file1 = e.target.files[0];
            this.url = URL.createObjectURL(file1);
            if (this.listCourseNew.isUpdate !== true) {
              this.dataEditService.push({
                course_id: this.detailCourse.course_id,
                file: file1,
              });
            } else {
              this.dataEditService.push({
                file: file1,
              });
            }
            this.store.setImageCourseService(file1);
          }, 1000);
        }
      }
    },

    async nextStep() {
      const result = await this.v$.$validate();
      if (!result) {
      } else {
        if (this.url == null) {
          this.toast.error(this.message.image_required, this.optionToast);
        } else {
          this.detailCourse.name = this.courseName;
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
          if (this.dataEditService.length > 0) {
            this.store.editImageCourseService(this.dataEditService);
          }

          this.$router.push(
            "/seller/service/service-course-draft/update?step=2"
          );
        }
      }
    },

    backStep() {
      localStorage.removeItem("detailCourse");
      localStorage.removeItem("course-price");
      localStorage.removeItem("idService");
      localStorage.removeItem("course-name");
      localStorage.removeItem("list-course");
      this.store.listImgCourse = [];
      this.$router.push(
        `/seller/service/service-course-draft/list?hash_id=${this.hashID}`
      );
    },

    onChangeInput() {
      if (this.courseName != null) {
        this.remaining = 50 - this.courseName.length;
      }
    },
  },
};
</script>

<style></style>
