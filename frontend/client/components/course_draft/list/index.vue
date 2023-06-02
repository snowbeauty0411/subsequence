<template>
  <div class="col col-12">
    <PreLoad :preload="preload" />
    <div class="ed-service flex flex-col justify-between">
      <div class="ed-service-content">
        <div class="ed-service-content-form">
          <div class="form-cource w-100">
            <div class="my-3 row gy-5 gx-5">
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
              <div
                class="col-xl-6"
                v-for="(item, index) in listCourseService"
                :key="index"
              >
                <div class="item-content flex mb-[20px] relative">
                  <div
                    v-if="this.listCourseService.length > 1"
                    class="absolute btn-remove-step"
                    v-on:click="
                      removeCourse(item.course_id, item.is_use_course)
                    "
                    style="
                      left: -40px;
                      top: 50%;
                      transform: translateY(-50%);
                      cursor: pointer;
                    "
                  >
                    <img src="@/assets/images/iconMinus.png" alt="" />
                  </div>
                  <img
                    v-if="item.is_use_course == 0"
                    :src="imgPen"
                    alt=""
                    class="absolute imgPen"
                    v-on:click="editCourse(item)"
                  />
                  <img
                    v-if="item.is_use_course == 0"
                    :src="imgPen"
                    alt=""
                    class="absolute imgPen"
                    v-on:click="editCourse(item)"
                  />
                  <div
                    class="item-content-left"
                    :style="'background-image: url(' + item.course_images + ')'"
                  ></div>
                  <div class="item-content-right flex">
                    <div>
                      <BootstrapIcon
                        icon="check"
                        size="2x"
                        style="color: #5e5c5c"
                        class="mx-2"
                      />
                    </div>
                    <div class="flex flex-col w-full justify-between">
                      <div class="flex flex-col">
                        <div class="courseName">{{ item.name }}</div>
                        <div class="courseDescription">
                          {{ item.content }}
                        </div>
                      </div>
                      <div class="flex flex-col">
                        <div
                          class="textPrice flex justify-end"
                          v-if="serviceDetail.service_type_id === 1"
                        >
                          (送料・税込)
                        </div>
                        <div class="textPrice flex justify-end" v-else>
                          (税込)
                        </div>
                        <div class="coursePrice flex justify-end">
                          {{
                            item.price === null
                              ? formatPrice(0)
                              : formatPrice(parseInt(item.price))
                          }}
                          <span v-if="item.cycle_format"
                            >/{{ item.cycle_format }}</span
                          >
                          <span v-else>/月</span>
                        </div>
                        <div class="textNotComplete flex justify-end mr-5" v-if="item.name === null || item.content === null || item.price === 0 || item.course_images === null">
                          ※ 未完成のため商品ページには表示されません。
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="btn-add-step flex items-center mt-3"
                v-on:click="addCourse()"
              >
                <img src="@/assets/images/iconAdd.png" alt="" />
                <div class="btn-add-step-text mx-2">プランを追加する</div>
              </div>
              <SDPagination
                v-if="totalPage > 1"
                :totalpage="totalPage"
                :currentPage="currentPage"
                v-on:update-page="updatePage"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="text-danger" style="padding: 0px 22px; margin-bottom: 20px">
          <span
            >※あとから編集不可の項目はコースに契約者が存在する場合変更することができません。</span
          ><br /><span>お間違えのないよう確認してご入力ください。</span>
        </div>
        <div class="edit-service-button flex">
          <b-button
            v-on:click="backStep()"
            :disabled="isLoading"
            class="btn-public"
          >
            戻る
          </b-button>
          <b-button v-on:click="nextStep()" class="btn-nextPage">
            次へ
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { ServiceStore } from "@/store/service/index.ts";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import Cookies from "js-cookie";
import PreLoad from "../../../components/SDPreLoad";
import SDPagination from "@/components/SDPagination";
import imgTrash from "@/assets/images/iconTrash.png";
import imgPen from "@/assets/images/iconPen.png";
import { sellerStore } from "@/store/seller";
import { Message } from "@/utils/message";

export default {
  name: "EditService",
  components: {
    BootstrapIcon,
    PreLoad,
    SDPagination,
  },
  data() {
    return {
      showModalDeleteService: false,
      preload: true,
      preloadList: false,
      isLoading: false,
      listTag: [],
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
      selected: null,
      url1: null,
      url2: null,
      url3: null,
      url4: null,
      url0: null,
      idUrl1: null,
      idUrl2: null,
      idUrl3: null,
      idUrl4: null,
      idUrl0: null,
      file1: null,
      file2: null,
      file3: null,
      file4: null,
      file0: null,
      dataHashTag: [],
      dataHashTagNew: [],
      index: null,
      dataStep: [],
      categoryList: [],
      listTagDelete: [],
      listCourseService: [],
      page: 1,
      totalPage: 1,
      currentPage: 1,
      isLimit: false,
      imgTrash,
      imgPen,
      id_private: null,
      hash_id_Private: null,
      hashtag: "",

      // Data Service
      serviceDetail: {
        id: null,
        name: "",
        service_content: "",
        url_private: "",
        caption: "",
        privateValue: "",
        service_cat_id: null,
        hash_id: "",
        address: "",
        zipcode: "",
        area: "",
        urlWebsite: "",
        max: "",
        service_type_id: "",
        is_reserves: "",
        is_draft: "",
        is_use: 0,
        url: "",
      },

      //Area
      checkNational: false,
      listAreas: [],
      listSubAreas: [],
      checkAreas: [],
      listData: [],
      checkListPrefectures: [],
      isActive: [],
      checkAllFlag: false,
      amountAreas: null,
      isFull: [],
      listClick: [],
      listPre: [],
      listTitle: [
        { value: "自由入力", text: "自由入力" },
        { value: "商品を受け取る", text: "商品を受け取る" },
        { value: "予約する", text: "予約する" },
        { value: "来店する", text: "来店する" },
      ],
      service_images: [],
      listCourseNew: [],
      listImageEdit: [],
      messageNoti: Message.SELLER,
      service_reserve_setting: [],
      service_hours: [],
      service_delivery: [],
      dataStepDelete: [],
      dataCourseDelete: [],
      id_service_image_deletes: [],
      listImageService: [],
      dataImage: [],
      deliveryNull: [],
      options: [
        { text: "女性のみ利用可能", value: 0 },
        { text: "男性のみ利用可能", value: 1 },
      ],
      listCourseFull: [],
      host: "",
      urlHost: "",
      loadingImg1: false,
      loadingImg2: false,
      loadingImg3: false,
      loadingImg4: false,
      loadingImg5: false,
      listTagRecommend: [],
      showModalSearch: false,
      arrowCounter: -1,
      dataActive: "",
      messageShippingInfo: Message.DELIVERY,
      listImgUpdate: [],
      listImgNew: [],
    };
  },
  setup() {
    const serviceStore = ServiceStore();
    const store = sellerStore();
    const toast = useToast();
    return {
      serviceStore,
      toast,
      store,
    };
  },
  computed: {
    ...mapState(ServiceStore, [
      "detailService",
      "listCategory",
      "success",
      "message",
      "error",
      "listCourse",
      "successDelete",
      "successDeleteCouse",
    ]),
    ...mapState(sellerStore, [
      "listArea",
      "imgCourseService",
      "listImgCourse",
      "imgCourseEdit",
      "dataAddress",
      "errorAddress",
      "message",
      "listHashTag",
    ]),
  },
  created() {
    localStorage.setItem("isEditService", true);
    let checkReload = localStorage.getItem("reloadPage");
    if (checkReload === "true") {
      localStorage.setItem("reloadPage", false);
    }

    let checkCRUDSuccess = localStorage.getItem("CRUDCourseSuccess");
    if (checkCRUDSuccess === "true") {
      localStorage.removeItem("CRUDCourseSuccess");
      if (process.client) {
        this.$router.go();
      }
    }

    this.serviceStore.getDetailServiceById(this.$route.query.hash_id);
    this.host = window.location.origin;
    this.store.getListArea();
    this.serviceStore.getListCategory();
    const request = {
      hash_id: this.$route.query.hash_id,
      per_page: 4,
      page: 1,
    };
    this.serviceStore.getListCourseDraftByHashId(request);
    this.store.getListArea();
    // const course = JSON.parse(localStorage.getItem("list-course"));

    // if (this.store.listImgCourse.length > 0) {
    //   this.store.listImgCourse.forEach((item) => {
    //     // item.forEach((value) => {
    //       this.listImgNew.push(item);
    //       const url = URL.createObjectURL(item);
    //       this.listImageEdit.push(url);
    //     // });
    //   });
    // }
  },
  watch: {
    listHashTag() {
      this.listTagRecommend = [];
      this.listTagRecommend = this.listHashTag.map((item) => item.name);
    },
    detailService() {
      this.preload = true;
      const {
        id,
        name,
        service_content,
        url_private,
        caption,
        service_cat_id,
        hash_id,
        address,
        zipcode,
        area,
        links,
        max,
        tags,
        steps,
        service_areas,
        service_type_id,
        is_reserves,
        service_reserve_setting,
        service_hours,
        service_delivery,
        is_draft,
        is_use,
        url_website,
      } = this.detailService;
      this.serviceDetail.id = id;
      this.serviceDetail.name = name;
      this.serviceDetail.service_content = service_content;
      this.serviceDetail.url_private = url_private;
      if (this.serviceDetail.url_private == null) {
        this.urlHost = this.host + "/service/detail/" + hash_id;
      } else {
        this.urlHost = this.host + "/" + this.serviceDetail.url_private;
      }
      this.serviceDetail.caption = caption;
      this.serviceDetail.service_cat_id = service_cat_id;
      this.serviceDetail.service_type_id = service_type_id;
      localStorage.setItem("typeServiceId", service_type_id);
      this.serviceDetail.hash_id = hash_id;
      this.serviceDetail.address = address;
      this.serviceDetail.url_website = url_website;
      this.serviceDetail.url = links ? links.url : null;
      this.serviceDetail.max = max;
      if (zipcode) {
        this.serviceDetail.zipcode = zipcode;
      }
      this.serviceDetail.area = area;
      this.serviceDetail.is_draft = is_draft;
      this.serviceDetail.is_reserves = is_reserves;
      this.serviceDetail.is_use = is_use;
      this.serviceDetail.privateValue = this.detailService.private.toString();
      tags.map((item) => {
        this.dataHashTag.push(item.name);
      });

      this.dataStep = steps;
      this.service_reserve_setting = service_reserve_setting;
      this.service_hours = service_hours;
      if (service_delivery == null) {
        this.service_delivery = service_delivery;
      } else {
        this.service_delivery.push(service_delivery);
      }
      if (this.detailService.images) {
        const _this = this;
        _this.dataImage = [];
        _this.detailService.images.map((item, index) => {
          _this.dataImage.push({ id: item.id, status: 0, file: item.path });
        });

        _this.dataImage.map((item, index) => {
          _this["url" + index] = item.file;
          _this["idUrl" + index] = item.id;
        });
      }
      if (this.detailService.max === 0 || this.detailService.max === null) {
        this.isLimit = true;
        this.serviceDetail.max = 0;
      } else {
        this.isLimit = false;
        this.serviceDetail.max = this.detailService.max;
      }

      if (this.listArea.length > 0) {
        this.listSubAreas = this.listArea.map((item) => ({
          area_id: item.id,
          list: [],
        }));
      }

      this.listSubAreas.map((item) => {
        service_areas.map((item1) => {
          if (item.area_id === item1.area_id) {
            item.list.push(item1.pref_id);
          }
        });
      });
      service_areas.map((item) => {
        if (item.pref_id !== 1) {
          this.checkListPrefectures.push(item.pref_id);
        }
      });

      if (this.listArea.length > 0) {
        this.listArea.map((item) => {
          this.listSubAreas.map((item1) => {
            if (item1.list.length === item.prefectures.length) {
              const isExist1 = this.isFull.indexOf(item1.area_id);
              if (isExist1 === -1) {
                this.isFull.push(item1.area_id);
              }
              const isExist2 = this.checkAreas.indexOf(item1.area_id);
              if (isExist2 === -1) {
                this.checkAreas.push(item1.area_id);
              }
            }
          });
        });
      }

      if (this.checkAreas.length === 8) {
        this.checkAllFlag = true;
        this.checkNational = true;
      }
      this.preload = false;
    },

    listCourse() {
      // localStorage.setItem("list-course", JSON.stringify(this.listCourse.data));
      this.preloadList = false;
      this.listCourseService = this.listCourse.data;
      // if(this.listCourseService.price === null) {
      //   this.listCourseService.price = 0
      // }
      this.totalPage = this.listCourse.last_page;
      this.currentPage = this.listCourse.current_page;

      // const listCourseEdited = JSON.parse(localStorage.getItem("list-course"));
      // if (listCourseEdited === "null" || listCourseEdited === null) {
      // } else {
      //   this.listCourseService = listCourseEdited;
      // }

      if (this.store.imgCourseEdit.length > 0) {
        this.store.imgCourseEdit.map((item1) => {
          this.listCourseService.map((item) => {
            if (
              this.store.imgCourseEdit.length === this.listCourseService.length
            ) {
              item.course_images = URL.createObjectURL(item1.file);
            } else {
              if (item.course_id === item1.course_id) {
                item.course_images = URL.createObjectURL(item1.file);
              }
            }

            if (item.course_images === "") {
              item.course_images = URL.createObjectURL(item1.file);
            }
          });
        });
      }
    },

    listCategory() {
      this.categoryList = this.listCategory.map((item) => ({
        text: item.name,
        value: item.id,
      }));
    },

    success() {
      if (this.serviceStore.success === true) {
        this.toast.success(this.serviceStore.message, this.optionToast);
        this.serviceStore.success = "";
        this.serviceStore.message = "";
        // const hash_id = this.$route.query.hash_id;
        // this.$router.push(`/seller/service/service-course-draft/list?hash_id=${hash_id}`);
        this.clearData();
      }
    },

    successDelete() {
      if (this.serviceStore.successDelete === true) {
        this.toast.success(this.serviceStore.message, this.optionToast);
        this.serviceStore.successDelete = "";
        this.serviceStore.message = "";
        const hash_id = this.$route.query.hash_id;
        this.$router.push(
          `/seller/service/service-course-draft/list?hash_id=${hash_id}`
        );
        this.clearData();
      }
    },

    error() {
      if (this.serviceStore.error === true) {
        this.toast.error(this.serviceStore.message, this.optionToast);
        this.serviceStore.error = "";
        this.serviceStore.message = "";
      }
    },

    errorAddress() {
      if (this.store.errorAddress === true) {
        this.toast.error(this.store.message, this.optionToast);
        this.store.errorAddress = "";
        this.store.message = "";
      }
    },

    listArea() {
      if (this.listArea.length > 0) {
        this.listAreas = this.listArea.map((item) => ({
          name: item.name,
          value: item.id,
          prefectures: item.prefectures,
        }));
      }

      this.amountAreas = this.listAreas.length;
    },

    listImgCourse() {
      this.listImageEdit = this.store.listImgCourse;
    },

    // "serviceDetail.zipcode"() {
    //   this.store.getAddress(this.serviceDetail.zipcode);
    // },

    dataAddress() {
      this.serviceDetail.address = this.dataAddress.address_2;
      this.serviceDetail.area = this.dataAddress.area;
    },

    "serviceDetail.privateValue"() {
      if (this.serviceDetail.privateValue == 1) {
        this.serviceDetail.url_private =
          "service/detail/" + this.serviceDetail.hash_id;
      }
    },
    successDeleteCouse() {
      // this.preloadList = true;
      const request = {
        hash_id: this.$route.query.hash_id,
        per_page: 4,
        page: 1,
      };
      this.serviceStore.getListCourseDraftByHashId(request);
    },
  },
  mounted() {
    window.addEventListener("beforeunload", (event) => {
      localStorage.removeItem("idService");
      // localStorage.removeItem("isEditService");
      localStorage.removeItem("isEditServiceOnly");
      localStorage.removeItem("detailCourse");
      localStorage.removeItem("list-course");
      localStorage.removeItem("isEditCourseId");
    });
    // document.addEventListener("click", this.handleClickOutside);
  },
  // destroyed() {
  //   document.removeEventListener("click", this.handleClickOutside);
  // },
  methods: {
    filterCycle(cycle) {
      // for (let i = 0; i < this.options.length; i++) {
      //   if (this.options[i].value === cycle) {
      //     return this.options[i].text;
      //   }
      // }
    },

    formatPrice(value) {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(value);
    },

    updatePage(page) {
      const request = {
        hash_id: this.$route.query.hash_id,
        per_page: 4,
        page: page,
      };
      this.preloadList = true;
      this.serviceStore.getListCourseDraftByHashId(request);
    },

    async updateService() {
      if (/^[０-９]/.test(this.serviceDetail.zipcode)) {
        this.toast.error(
          this.messageShippingInfo.zipcode_haflwidth,
          this.optionToast
        );
        return;
      }
      let rememberLogin = localStorage.getItem("rememberLogin");
      if (rememberLogin === "true") {
        this.account_id = localStorage.getItem("account_id");
      } else {
        this.account_id = Cookies.get("account_id");
      }
      this.isLoading = true;
      const dataForm = new FormData();
      dataForm.append("service_id", this.serviceDetail.id);
      dataForm.append("hash_id", this.serviceDetail.hash_id);
      dataForm.append("seller_id", this.account_id);
      dataForm.append("service_cat_id", this.serviceDetail.service_cat_id);
      dataForm.append("service_type_id", this.serviceDetail.service_type_id);
      dataForm.append("name", this.serviceDetail.name);
      dataForm.append("address", this.serviceDetail.address);
      dataForm.append("zipcode", this.serviceDetail.zipcode);
      dataForm.append("area", this.serviceDetail.area);
      dataForm.append("caption", this.serviceDetail.caption);
      dataForm.append("service_content", this.serviceDetail.service_content);
      dataForm.append("private", this.serviceDetail.privateValue);
      dataForm.append("is_reserves", this.detailService.is_reserves);
      dataForm.append("is_draft", this.detailService.is_draft);
      if (this.isLimit) {
        this.serviceDetail.max = null;
        dataForm.append("max", 0);
      } else {
        dataForm.append("max", this.serviceDetail.max);
      }
      dataForm.append("url", this.serviceDetail.url);
      dataForm.append("url_website", this.serviceDetail.url_website);
      this.url_private = null;
      if (this.serviceDetail.privateValue == 0) {
        dataForm.append("url_private", null);
      } else {
        dataForm.append("url_private", this.serviceDetail.url_private);
      }
      this.dataHashTagNew.forEach((item) => {
        dataForm.append("tags[]", item);
      });
      if (this.listTagDelete.length > 0) {
        this.listTagDelete.forEach((item) => {
          dataForm.append("tag_deletes[]", item);
        });
      }

      if (this.service_reserve_setting === null) {
        // dataForm.append("service_reserve_setting", null);
      } else {
        if (
          this.service_reserve_setting.max != null &&
          this.service_reserve_setting.max != undefined
        ) {
          dataForm.append(
            "service_reserve_setting" + "[max]",
            this.service_reserve_setting.max
          );
        }
        dataForm.append(
          "service_reserve_setting" + "[time_distance]",
          this.service_reserve_setting.time_distance != undefined
            ? this.service_reserve_setting.time_distance
            : null
        );
        dataForm.append(
          "service_reserve_setting" + "[duration_before]",
          this.service_reserve_setting.duration_before != undefined
            ? this.service_reserve_setting.duration_before
            : null
        );
        dataForm.append(
          "service_reserve_setting" + "[duration_after]",
          this.service_reserve_setting.duration_after != undefined
            ? this.service_reserve_setting.duration_after
            : null
        );
      }

      if (this.service_hours[0] === null) {
        // dataForm.append("service_hours", null);
      } else {
        this.service_hours.forEach((item, index) => {
          dataForm.append(
            "service_hours[" + index + "]" + "[day_of_week]",
            item.day_of_week
          );
          JSON.parse(item.work_hour).map((item1, index1) => {
            dataForm.append(
              "service_hours[" +
                index +
                "]" +
                "[work_hour][" +
                index1 +
                "][start]",
              item1.start
            );
            dataForm.append(
              "service_hours[" +
                index +
                "]" +
                "[work_hour][" +
                index1 +
                "][end]",
              item1.end
            );
          });
          dataForm.append(
            "service_hours[" + index + "]" + "[status]",
            item.status == true ? 1 : 0
          );
        });
      }

      if (this.service_delivery === null) {
        // dataForm.append("service_delivery", this.deliveryNull);
      } else {
        this.service_delivery.forEach((item) => {
          dataForm.append("service_delivery" + "[interval]", item.interval);
          dataForm.append(
            "service_delivery" + "[month_delivery]",
            item.month_delivery
          );
          dataForm.append("service_delivery" + "[skip]", item.skip);
          dataForm.append("service_delivery" + "[with_skip]", item.with_skip);
        });
      }

      this.dataStep.forEach((item, index) => {
        if (item.id) {
          dataForm.append("service_steps[" + index + "]" + "[id]", item.id);
        }
        dataForm.append("service_steps[" + index + "]" + "[number]", index + 1);
        dataForm.append("service_steps[" + index + "]" + "[title]", item.title);
        if (item.content) {
          dataForm.append(
            "service_steps[" + index + "]" + "[content]",
            item.content
          );
        }
      });

      this.dataStepDelete.forEach((item) => {
        dataForm.append("id_step_deletes[]", item);
      });
      this.listSubAreas.forEach((item, index) => {
        if (item.list.length > 0) {
          dataForm.append(
            "service_areas[" + index + "]" + "[area_id]",
            item.area_id
          );
          dataForm.append(
            "service_areas[" + index + "]" + "[pref_id]",
            item.list
          );
        }
      });

      this.listCourseService.forEach((item, index) => {
        if (item.course_id !== undefined) {
          dataForm.append(
            "service_courses[" + index + "]" + "[course_id]",
            item.course_id
          );
        }

        dataForm.append("service_courses[" + index + "]" + "[name]", item.name);
        dataForm.append(
          "service_courses[" + index + "]" + "[price]",
          Number(item.price)
        );

        if (item.cycle !== null) {
          dataForm.append(
            "service_courses[" + index + "]" + "[cycle]",
            item.cycle
          );
        }
        dataForm.append(
          "service_courses[" + index + "]" + "[content]",
          item.content
        );
        dataForm.append(
          "service_courses[" + index + "]" + "[firstPr]",
          item.firstPr
        );
        dataForm.append(
          "service_courses[" + index + "]" + "[gender_restrictions]",
          item.gender_restrictions === 0
            ? 0
            : item.gender_restrictions === 1
            ? 1
            : 2
        );
        dataForm.append(
          "service_courses[" + index + "]" + "[age_confirm]",
          item.age_confirm === null ? 0 : Number(item.age_confirm)
        );
      });

      if (this.listCourseNew.length > 0) {
        const lengthListCourse = this.listCourseService.length;
        this.listCourseNew.forEach((item, index) => {
          dataForm.append(
            "service_courses[" + (index + lengthListCourse) + "]" + "[name]",
            item.course_name
          );
          dataForm.append(
            "service_courses[" + (index + lengthListCourse) + "]" + "[price]",
            Number(item.course_price)
          );

          if (item.course_cycle !== null) {
            dataForm.append(
              "service_courses[" + (index + lengthListCourse) + "]" + "[cycle]",
              item.course_cycle
            );
          }

          dataForm.append(
            "service_courses[" + (index + lengthListCourse) + "]" + "[content]",
            item.course_content
          );
          dataForm.append(
            "service_courses[" + (index + lengthListCourse) + "]" + "[firstPr]",
            item.course_firstPr
          );
          dataForm.append(
            "service_courses[" +
              (index + lengthListCourse) +
              "]" +
              "[gender_restrictions]",
            item.gender_restrictions
          );
          dataForm.append(
            "service_courses[" +
              (index + lengthListCourse) +
              "]" +
              "[age_confirm]",
            item.course_age_confirm === "null"
              ? 0
              : Number(item.course_age_confirm)
          );
        });
      }

      // ListImageCourse
      if (this.store.listImgCourse.length > 0) {
        const lengthListCourse = this.listCourseService.length;
        // this.store.listImgCourse.splice(-1)

        this.listImgNew.forEach((item, index) => {
          // item.forEach((value, index) => {
          dataForm.append(
            "service_courses[" + (index + lengthListCourse) + "]" + "[image]",
            item
          );
          // })
        });
      }

      if (this.store.imgCourseEdit.length > 0) {
        this.listCourseService.map((item, index) => {
          this.store.imgCourseEdit.map((item1) => {
            if (item.course_id === item1[index].course_id) {
              dataForm.append(
                "service_courses[" + index + "]" + "[image]",
                item1[index].file
              );
            }
          });
        });
      }

      if (this.dataCourseDelete.length > 0) {
        this.dataCourseDelete.map((item) => {
          dataForm.append("id_service_courses_deletes[]", item);
        });
      }
      this.dataImage.map((item, index) => {
        if (item.status === 0) {
          dataForm.append("service_images[" + index + "]" + "[id]", item.id);
          dataForm.append(
            "service_images[" + index + "]" + "[status]",
            item.status
          );
          dataForm.append("service_images[" + index + "]" + "[file]", "");
        } else {
          dataForm.append("service_images[" + index + "]" + "[id]", item.id);
          dataForm.append(
            "service_images[" + index + "]" + "[status]",
            item.status
          );

          if (item.file !== null) {
            dataForm.append(
              "service_images[" + index + "]" + "[file]",
              item.file
            );
          }
        }
      });
      if (this.serviceDetail.zipcode && this.serviceDetail.zipcode.length < 8) {
        this.toast.error(
          this.messageNoti.zipcode_step11_minLength,
          this.optionToast
        );
      } else {
        await this.serviceStore.editServiceById(
          dataForm,
          this.serviceDetail.id
        );
      }
      // this.isLoading = false;
      // window.location.reload()
    },

    addStep() {
      this.dataStep.push({
        title: "",
        content: "",
      });
    },

    removeCourse(event, isUse) {
      if (isUse == 1) {
        this.toast.error("契約者が存在するコースは削除できません");
        return;
      }
      this.listCourseService.map((item, index) => {
        if (item.course_id == event) {
          this.dataCourseDelete.push(event);
          this.listCourseService.splice(index, 1);
        }
      });
      const request = {
        service_id: this.serviceDetail.id,
        hash_id: this.$route.query.hash_id,
        seller_id: localStorage.getItem("account_id"),
        course_id: event,
      };
      this.preloadList = true;
      this.serviceStore.deleteCourse(request);
    },

    removeCourseNew(value) {
      this.listCourseNew.splice(value, 1);
      this.listImageEdit.map((item, index) => {
        if (value === index) {
          this.listImageEdit.splice(index, 1);
        }
      });
    },

    addCourse() {
      localStorage.removeItem("detailCourse");
      localStorage.removeItem("listCourseNew");
      this.store.imgCourseService = [];
      localStorage.setItem("idService", this.serviceDetail.hash_id);
      localStorage.setItem("service_id", this.serviceDetail.id);
      localStorage.setItem("isEditService", true);
      this.$router.push("/seller/service/service-course-draft/update?step=1");
    },

    editCourse(value) {
      // localStorage.setItem("dataUpdate-step-1", this.serviceDetail.name);
      localStorage.setItem("idService", this.serviceDetail.hash_id);
      localStorage.setItem("service_id", this.serviceDetail.id);
      localStorage.setItem("isEditService", true);
      value.isUpdate = true;
      localStorage.setItem("detailCourse", JSON.stringify(value));
      localStorage.setItem(
        "list-course",
        JSON.stringify(this.listCourseService)
      );
      this.$router.push("/seller/service/service-course-draft/update?step=1");
    },

    async deleteService() {
      const idService = this.serviceDetail.id;
      await this.serviceStore.deleteServiceById(idService);
      this.showModalDeleteService = false;
    },

    formatNumber() {
      var text = this.serviceDetail.zipcode;
      if (
        /^[a-z]/.test(text) ||
        /^[A-Z]/.test(text) ||
        /^[ａ-ｚ]/.test(text) ||
        /^[Ａ-Ｚ]/.test(text) ||
        /^[ぁ-ん]/.test(text) ||
        /^[ァ-ン]/.test(text) ||
        /^[一-龥]/.test(text)
      ) {
        text = text
          .replace(/^[a-z]/, "")
          .replace(/^[A-Z]/, "")
          .replace(/^[ａ-ｚ]/, "")
          .replace(/^[Ａ-Ｚ]/, "")
          .replace(/^[ぁ-ん]/, "")
          .replace(/^[ァ-ン]/, "")
          .replace(/^[一-龥]/, "");
      }
      this.serviceDetail.zipcode = text;
    },

    clearData() {
      localStorage.removeItem("data-step-1");
      localStorage.removeItem("id-step-2");
      // localStorage.removeItem("data-step-area_id-3");
      // localStorage.removeItem("data-step-4");
      localStorage.removeItem("data-step-5-catchCopy");
      localStorage.removeItem("data-step-6");
      // localStorage.removeItem("data-step-7");
      localStorage.removeItem("isPrivate-step-8");
      localStorage.removeItem("data-step-10-max");
      localStorage.removeItem("list-course");
      localStorage.removeItem("data-step-9");
      localStorage.removeItem("skip");
      localStorage.removeItem("with_skip");
      localStorage.removeItem("interval");
      localStorage.removeItem("month_delivery");
      localStorage.removeItem("url-step-8");
      localStorage.removeItem("id-step-8");
      localStorage.removeItem("hash_id-step-8");
      localStorage.removeItem("service_reserve_setting");
      localStorage.removeItem("service_hours");
      localStorage.removeItem("is_reserves");
      localStorage.removeItem("urlType4");
      localStorage.removeItem("data-step-11-websiteUrl");
      localStorage.removeItem("data-step-11-address");
      localStorage.removeItem("zipCode");
      localStorage.removeItem("listAreaStep11");
    },

    refreshTitle(value) {
      this.dataStep.map((item, index) => {
        if (index === value) {
          item.title = "";
        }
      });
    },

    backStep() {
      localStorage.setItem("isEditService", false);
      this.$router.push(
        `/seller/service/create?step=7&hash_id=${this.serviceDetail.hash_id}`
      );
    },

    nextStep() {
      localStorage.setItem("isEditService", false);
      localStorage.setItem(
        "list-course",
        JSON.stringify(this.listCourseService)
      );
      let data_step_4 = localStorage.getItem("data-step-4");
      let data_step_4_init = localStorage.getItem("data-step-4-init");
      if(data_step_4 === null) {
        data_step_4 = data_step_4_init
      }
      if (data_step_4 == 1) {
        this.$router.push(
          `/seller/service/delivery?hash_id=${this.serviceDetail.hash_id}`
        );
      } else if (data_step_4 == 2 || data_step_4 == 3) {
        this.$router.push(
          `/seller/service/reserve?hash_id=${this.serviceDetail.hash_id}`
        );
      } else if (data_step_4 == 4 || data_step_4 == 5) {
        this.$router.push(
          `/seller/service/create?step=8&hash_id=${this.serviceDetail.hash_id}`
        );
      }
    },
  },
};
</script>

<style lang="scss">
.ed-service {
  min-height: calc(100vh - 100px);
  &-content {
    padding: 30px 100px;
    @include screen(991) {
      padding: 20px 50px;
    }
    &-form {
      .form-label {
        color: #7e7d7d;
        font-weight: 600;
        font-size: 16px;
      }
      margin: 50px 0;
      .item-content {
        border: 1px solid #4d4d4d33;
      }

      .btn-add-step {
        cursor: pointer;

        img {
          width: 30px;
          height: 30px;
        }

        &-text {
          font-size: 16px;
          color: #7e7d7d;
          font-weight: 600;
        }
      }
      .icon-delete-step9 {
        cursor: pointer;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .edit-service-button {
    @include screen(480) {
      // flex-direction: column;
      button {
        // margin-bottom: 10px;
      }
    }
    button {
      width: 100%;
      background: $orange;
      color: $white;
      font-size: 18px;
      padding: 10px 0;
      border: none;
      border-radius: 0;
      background: #b2b2b2;
    }
    .btn-nextPage {
      background: #e79c3a;
    }
  }
}

.backdropEdit {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
.list-data-search {
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
  box-shadow: 0px 0px 6px #44444333;
  z-index: 1001;
  &-item {
    padding: 10px 20px;
    background: $white;
    cursor: pointer;
    &:hover {
      color: $orange;
    }
    &-active {
      background: #f5f5f5;
      color: $orange;
      font-weight: 600;
    }
  }
}
.list-data-search::-webkit-scrollbar {
  display: none;
}
</style>
