<template>
  <div class="createService-header flex flex-col w-full">
    <SDPreLoad :preload="preload" />
    <div class="createService-header-top flex items-center justify-between">
      <div
        class="createService-header-top-logo flex cursor-pointer"
        v-on:click="topPage()"
      >
        <img src="@/assets/images/subsQ_logo3.svg" alt="" />
      </div>
      <div
        class="createService-header-top-link flex items-center"
        v-on:click="createServiceDraft()"
        :disabled="isLoading"
        v-if="!isEditService"
      >
        <BootstrapIcon icon="download" size="sm" class="mx-3" />
        <div>ここまでを保存する</div>
      </div>
    </div>
    <div class="createService-header-bottom flex w-full">
      <div
        class="createService-header-bottom-left"
        :class="
          Number(queryData) === 1
            ? 'w-1/12'
            : Number(queryData) === 2
            ? 'w-2/12'
            : Number(queryData) === 3
            ? 'w-3/12'
            : Number(queryData) === 4
            ? 'w-4/12'
            : Number(queryData) === 5
            ? 'w-5/12'
            : Number(queryData) === 6
            ? 'w-6/12'
            : Number(queryData) === 7
            ? 'w-7/12'
            : Number(queryData) === 8
            ? 'w-9/12'
            : Number(queryData) === 9
            ? 'w-10/12'
            : Number(queryData) === 10
            ? 'w-11/12'
            : Number(queryData) === 11
            ? 'w-full'
            : Number(queryData) === 12
            ? 'w-8/12'
            : ''
        "
      ></div>
      <div
        class="createService-header-bottom-right"
        :class="
          Number(queryData) === 1
            ? 'w-11/12'
            : Number(queryData) === 2
            ? 'w-10/12'
            : Number(queryData) === 3
            ? 'w-9/12'
            : Number(queryData) === 4
            ? 'w-8/12'
            : Number(queryData) === 5
            ? 'w-7/12'
            : Number(queryData) === 6
            ? 'w-6/12'
            : Number(queryData) === 7
            ? 'w-6/12'
            : Number(queryData) === 8
            ? 'w-3/12'
            : Number(queryData) === 9
            ? 'w-2/12'
            : Number(queryData) === 10
            ? 'w-1/12'
            : Number(queryData) === 11
            ? ''
            : Number(queryData) === 12
            ? 'w-4/12'
            : ''
        "
      ></div>
    </div>
  </div>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { sellerStore } from "@/store/seller";
import { mapState } from "pinia";
import { useToast } from "vue-toastification";
import Cookies from "js-cookie";
import { Message } from "@/utils/message";
import { ServiceStore } from "@/store/service/index.ts";
import SDPreLoad from "@/components/SDPreLoad";

export default {
  name: "Header",
  setup() {
    const toast = useToast();
    const store = sellerStore();
    const serviceStore = ServiceStore();
    return {
      toast,
      store,
      serviceStore,
    };
  },
  components: {
    BootstrapIcon,
    SDPreLoad,
  },
  data() {
    return {
      queryData: null,
      messageNoti: Message.SELLER,
      messageErrSys: Message.ERROR_SYSTEM,
      listTag: [],
      listDelivery: [],
      listStep: [],
      id: "",
      hash_id: "",
      service_reserve_setting: [],
      service_hours: [],
      isEditDraftService: false,
      listAreas: [],
      listSubAreas: [],
      addLocalStorage: false,
      changeData: false,
      isLoading: false,
      dataStepDelete: [],
      service_reserve_setting: {},
      preload: false,
      listCourseAdd: [],
      isEditService: false,
    };
  },
  created() {
    const isEditService = localStorage.getItem("isEditService");
    if (isEditService === "true") {
      this.isEditService = true;
    } else {
      this.isEditService = false;
    }
    if (
      this.$route.path == "/seller/service/create" ||
      this.$route.path == "/seller/service/create/"
    ) {
      this.queryData = Number(this.$route.query.step);
    } else {
      this.queryData = 12;
    }
    let id = localStorage.getItem("id");
    let hash_id = localStorage.getItem("hash_id-step-8");
    if (id === null || hash_id === null) {
      this.store.createHashID();
    }

    let isNewService = localStorage.getItem("isNewService");
    if (this.$route.query.hash_id !== undefined) {
      this.hash_id = this.$route.query.hash_id;
      let serviceName = localStorage.getItem("data-step-1");
      if (
        serviceName == null &&
        this.$route.name !== "seller-service-service-course-draft-list"
      ) {
        this.store.listFiles = [];
        this.store.imgCourseService = [];
        this.$router.push(
          `/seller/service/create?step=1&hash_id=${this.hash_id}`
        );
      }
      this.isEditDraftService = true;
      this.serviceStore.getDetailServiceById(this.hash_id);
      this.store.getListArea();
    } else {
      if (isNewService === "false") {
        this.isEditDraftService = true;
        this.hash_id = hash_id;
        this.store.getListArea();
        this.serviceStore.getDetailServiceById(this.hash_id);
      } else {
        this.isEditDraftService = false;
      }
    }
  },
  computed: {
    ...mapState(sellerStore, [
      "listFiles",
      "imgCourseService",
      "successDraft",
      "errorDraft",
      "message",
      "dataHashID",
      "listArea",
      "errorSystem",
      "imgCourseDraft",
    ]),
    ...mapState(ServiceStore, ["detailService"]),
  },
  mounted() {
    window.addEventListener("beforeunload", (event) => {
      // on the navigation type checking refresh or close tab/browser for logout
      localStorage.removeItem("data-step-1");
      localStorage.removeItem("data-step-2");
      localStorage.removeItem("id-step-2");
      localStorage.removeItem("checkListPrefectures");
      localStorage.removeItem("isActive");
      localStorage.removeItem("isFull");
      localStorage.removeItem("checkAreas");
      localStorage.removeItem("checkAllFlag");
      // localStorage.removeItem("data-step-area_id-3");
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
      // localStorage.removeItem("hash_id-step-8");
      localStorage.removeItem("changeData");
      localStorage.removeItem("list-course");
      localStorage.removeItem("data-step-7-new");
      // localStorage.removeItem("data-step-5-image");
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
      localStorage.removeItem("lengthListCourse");
      localStorage.removeItem("listClick");
      localStorage.removeItem("url-step-8");
      localStorage.removeItem("data-step-9-delete");
      localStorage.removeItem("urlType4");
      localStorage.removeItem("course_images");
      localStorage.removeItem("isCourseDraft");
      localStorage.removeItem("course_id");
      localStorage.removeItem("course_images");
    });
  },
  watch: {
    listArea() {
      this.listAreas = this.listArea.map((item) => ({
        name: item.name,
        value: item.id,
        prefectures: item.prefectures,
      }));
      this.listSubAreas = this.listArea.map((item) => ({
        area_id: item.id,
        list: [],
      }));
    },

    successDraft() {
      if (this.store.successDraft === true) {
        this.preload = false;
        this.toast.success(this.store.message, this.optionToast);
        this.store.successDraft = "";
        this.store.message = "";
        this.$router.push("/seller/account");
        this.store.listFiles = [];
        this.store.imgCourseService = [];
        this.isLoading = false;
        this.service_reserve_setting = [];
        this.service_hours = [];
        this.listStep = [];
        this.listDelivery = [];
        this.listArea = [];
        this.listCourse = [];
        this.listCourseAdd = [];
        this.listTag = [];
        this.clearData();
      }
    },

    errorDraft() {
      if (this.store.errorDraft === true) {
        this.preload = false;
        this.toast.error(this.store.message, this.optionToast);
        this.store.errorDraft = "";
        this.store.message = "";
        this.isLoading = false;
      }
    },

    errorSystem() {
      if (this.store.errorSystem === true) {
        this.preload = false;
        this.toast.error(this.messageErrSys, this.optionToast);
        this.store.errorSystem = "";
      }
    },

    dataHashID() {
      this.id = this.store.dataHashID.id;
      this.hash_id = this.store.dataHashID.hash_id;
    },

    detailService() {
      this.id = this.detailService.id;
      const dataImageService = [];
      if (this.detailService.images.length > 0) {
        this.detailService.images.map((item) => {
          dataImageService.push({ id: item.id, status: 0, file: item.path });
        });
      }

      localStorage.setItem("data-step-1", this.detailService.name);
      localStorage.setItem("hash_id", this.detailService.hash_id);
      localStorage.setItem("id", this.detailService.id);
      if (this.detailService.categories != null) {
        localStorage.setItem("data-step-2", this.detailService.categories.name);
        localStorage.setItem("id-step-2", this.detailService.categories.id);
      } else {
        localStorage.setItem(
          "data-step-2",
          "コンピューター・Web・IT・AI・通信関連"
        );
        localStorage.setItem("id-step-2", 1);
      }
      // if (this.detailService.service_type_id != null) {
      //   localStorage.setItem("data-step-4", this.detailService.service_type_id);
      // }

      if (this.detailService.caption != null) {
        localStorage.setItem(
          "data-step-5-catchCopy",
          this.detailService.caption
        );
      }
      if (dataImageService.length > 0) {
        localStorage.setItem(
          "imageDraftService",
          JSON.stringify(dataImageService)
        );
      }

      // const listTag = [];
      // if (this.detailService.tags.length > 0) {
      //   this.detailService.tags.map((item) => {
      //     listTag.push(item);
      //   });
      // }

      if (this.detailService.service_content != null) {
        localStorage.setItem("data-step-6", this.detailService.service_content);
      }
      const delivery = this.detailService.service_delivery;
      if (delivery !== null) {
        localStorage.setItem("interval-init", delivery.interval);
        localStorage.setItem("month_delivery", delivery.month_delivery);
        localStorage.setItem("skip", delivery.skip);
        localStorage.setItem("with_skip", delivery.with_skip);
      }
      localStorage.setItem("isPrivate-step-8-init", this.detailService.private);
      localStorage.setItem("id-step-8", this.detailService.id);
      localStorage.setItem("hash_id-step-8", this.detailService.hash_id);
      if (this.detailService.url_private != null) {
        localStorage.setItem("url-step-8", this.detailService.url_private);
      }
      if (this.detailService.address != null) {
        localStorage.setItem(
          "data-step-11-address",
          this.detailService.address
        );
      }
      if (this.detailService.links !== null) {
        localStorage.setItem(
          "data-step-11-websiteUrl",
          this.detailService.links.url
        );
      }
      if (this.detailService.zipcode != null) {
        localStorage.setItem("zipCode", this.detailService.zipcode);
      }

      if (this.detailService.url_website != null) {
        localStorage.setItem("urlType4", this.detailService.url_website);
      }

      const checkListPrefectures = [];
      const isActive = [];
      const isFull = [];

      if (this.detailService.service_areas.length > 0) {
        this.detailService.service_areas.map((item) => {
          if (item.pref_id !== 1) {
            checkListPrefectures.push(item.pref_id);
          }
        });
        const area_id_2 = this.detailService.service_areas.reduce(
          (group, area) => {
            const { area_id } = area;
            group[area_id] = group[area_id] ?? [];
            group[area_id].push(area);
            return group;
          },
          []
        );

        area_id_2.map((item, index) => {
          item.map((item1) => {
            if (item1.area == "北海道" && item.length == 1) {
              if (isFull.indexOf(index) === -1) {
                isFull.push(index);
              }
            }

            if (item1.area == "東北" && item.length == 6) {
              if (isFull.indexOf(index) === -1) {
                isFull.push(index);
              }
            }
            if (item1.area == "関東" && item.length == 7) {
              if (isFull.indexOf(index) === -1) {
                isFull.push(index);
              }
            }
            if (item1.area == "中部" && item.length == 7) {
              if (isFull.indexOf(index) === -1) {
                isFull.push(index);
              }
            }
            if (item1.area == "関西" && item.length == 6) {
              if (isFull.indexOf(index) === -1) {
                isFull.push(index);
              }
            }
            if (item1.area == "中国" && item.length == 5) {
              if (isFull.indexOf(index) === -1) {
                isFull.push(index);
              }
            }
            if (item1.area == "四国" && item.length == 4) {
              if (isFull.indexOf(index) === -1) {
                isFull.push(index);
              }
            }
            if (item1.area == "九州" && item.length == 8) {
              if (isFull.indexOf(index) === -1) {
                isFull.push(index);
              }
            }
          });
        });
      }
      localStorage.setItem("isActive", JSON.stringify(isActive));
      localStorage.setItem("isFull", JSON.stringify(isFull));
      localStorage.setItem("checkAreas", JSON.stringify(isFull));
      localStorage.setItem("checkNational", isFull.length === 8 ? true : false);
      localStorage.setItem("checkAllFlag", isFull.length === 8 ? true : false);
      localStorage.setItem(
        "checkListPrefectures",
        JSON.stringify(checkListPrefectures)
      );

      if (this.$route.fullPath.includes("service/create?step=1")) {
        this.listSubAreas.map((item) => {
          this.detailService.service_areas.map((item1) => {
            if (item.area_id == item1.area_id) {
              item.list.push(item1.pref_id);
            }
          });
        });
        localStorage.setItem(
          "data-step-area_id-3",
          JSON.stringify(this.listSubAreas)
        );
      }
      localStorage.setItem(
        "data-step-4-init",
        JSON.stringify(this.detailService.service_type_id)
      );
      localStorage.setItem(
        "data-step-7-init",
        JSON.stringify(this.detailService.tags)
      );

      if (this.detailService.steps.length > 0) {
        localStorage.setItem(
          "data-step-9",
          JSON.stringify(this.detailService.steps)
        );
      }

      const dataStep = this.detailService.steps;
      const dataStep9 = [];
      if (dataStep !== null) {
        dataStep.map((item, index) => {
          if (index == 0) {
            dataStep9.push({
              title: item.title,
              error: false,
              id: item.id,
            });
          } else {
            dataStep9.push({
              title: item.title,
              content: item.content,
              error: false,
              id: item.id,
            });
          }
        });
      }
      if (dataStep9.length > 0) {
        localStorage.setItem("data-step-9-error", JSON.stringify(dataStep9));
      }
      if (this.detailService.max != null) {
        localStorage.setItem("data-step-10-max", this.detailService.max);
        localStorage.setItem("data-step-10", 1);
      } else {
        localStorage.setItem("data-step-10", 0);
      }
      localStorage.setItem("is_reserves-init", this.detailService.is_reserves);
      if (
        this.detailService.is_reserves == 1 &&
        this.detailService.service_reserve_setting != null
      ) {
        localStorage.setItem(
          "service_reserve_setting-init",
          JSON.stringify(this.detailService.service_reserve_setting)
        );
      }
      if (this.detailService.service_hours.length > 0) {
        const service_hours = [];
        this.detailService.service_hours.map((item) => {
          service_hours.push({
            day_of_week: item.day_of_week,
            status: item.status,
            work_hour: JSON.parse(item.work_hour),
          });
        });
        localStorage.setItem("service_hours", JSON.stringify(service_hours));
      }
      // }
    },

    "$route.query.step"() {
      if (
        this.$route.path == "/seller/service/create" ||
        this.$route.path == "/seller/service/create/"
      ) {
        this.queryData = Number(this.$route.query.step);
      } else {
        this.queryData = 12;
      }
    },
  },
  methods: {
    topPage() {
      this.clearData();
      this.$router.push("/");
    },

    async createServiceDraft() {
      if (this.isEditDraftService) {
        this.preload = true;
        let account_id = null;
        let rememberLogin = localStorage.getItem("rememberLogin");
        if (rememberLogin === "true") {
          account_id = localStorage.getItem("account_id");
        } else {
          account_id = Cookies.get("account_id");
        }
        let serviceName = localStorage.getItem("data-step-1");
        let serviceCategoryId = localStorage.getItem("id-step-2");
        let serviceTypeId = localStorage.getItem("data-step-4");
        let catchCopy = localStorage.getItem("data-step-5-catchCopy");
        let area = localStorage.getItem("data-step-area_id-3");
        let serviceContent = localStorage.getItem("data-step-6");
        let isPrivate = localStorage.getItem("isPrivate-step-8");
        let max = localStorage.getItem("data-step-10-max");
        let course = localStorage.getItem("list-course");
        let data_step = localStorage.getItem("data-step-9");
        let skip = localStorage.getItem("skip");
        let with_skip = localStorage.getItem("with_skip");
        let interval = localStorage.getItem("interval");
        let month_delivery = localStorage.getItem("month_delivery");
        let listTagDelete = JSON.parse(localStorage.getItem("listTagDelete"));
        let urlPrivate = localStorage.getItem("url-step-8");
        if (this.$route.query.hash_id !== undefined) {
          this.hash_id = this.$route.query.hash_id;
        } else {
          this.hash_id = localStorage.getItem("hash_id");
        }
        let service_reserve_setting = localStorage.getItem(
          "service_reserve_setting"
        );
        let areaStep11 = localStorage.getItem("area");
        let service_hours = localStorage.getItem("service_hours");
        let is_reserves = localStorage.getItem("is_reserves");
        let address = localStorage.getItem("data-step-11-address");
        let zipCode = localStorage.getItem("zipCode");
        let websiteUrl = localStorage.getItem("data-step-11-websiteUrl");
        let dataImage = JSON.parse(localStorage.getItem("imageDraftService"));
        let changeData = localStorage.getItem("changeData");
        let dataStepDelete = JSON.parse(
          localStorage.getItem("data-step-9-delete")
        );
        let urlType4 = localStorage.getItem("urlType4");

        if (dataStepDelete != null) {
          if (dataStepDelete.length > 0) {
            this.dataStepDelete = dataStepDelete;
          } else {
            this.dataStepDelete = [];
          }
        }
        if (changeData === null) {
          this.changeData = false;
        } else {
          if (changeData == "false" || changeData == false) {
            this.changeData = false;
          } else {
            this.changeData = true;
          }
        }

        let listImgStorage = JSON.parse(
          localStorage.getItem("data-step-5-image")
        );

        let dataImageService = [];
        if (
          this.detailService.images.length >= 0 &&
          this.store.listFiles.length === 0
        ) {
          if (listImgStorage !== null) {
            listImgStorage.map((item) => {
              if (item.id === undefined) {
                dataImageService.push({
                  status: 1,
                  file: this.base64toBlob(item.file),
                });
              } else {
                dataImageService.push({
                  id: item.id,
                  status: 0,
                  file:
                    item.status === 0
                      ? item.file
                      : item.status === 1 && item.file !== ""
                      ? this.base64toBlob(item.file)
                      : item.file,
                });
              }
            });
          } else {
            this.detailService.images.map((item) => {
              dataImageService.push({
                id: item.id,
                status: 0,
                file:
                  item.status === 1 && item.file !== ""
                    ? this.base64toBlob(item.file)
                    : item.file,
              });
            });
          }

          this.store.setFiles(dataImageService);
        }

        if (
          service_reserve_setting !== "null" ||
          service_reserve_setting !== null
        ) {
          this.service_reserve_setting = JSON.parse(service_reserve_setting);
        }
        if (service_hours !== "null" || service_hours !== null) {
          this.service_hours = JSON.parse(service_hours);
        } else {
          this.service_hours = [];
        }

        if (Number(serviceTypeId) === 1) {
          if (month_delivery === "null") {
            month_delivery = null;
          } else {
            month_delivery = Number(month_delivery);
          }
          if (with_skip === "null") {
            with_skip = 0;
          } else {
            with_skip = Number(with_skip);
          }
          if (month_delivery === "null") {
            month_delivery = 0;
          } else {
            month_delivery = Number(month_delivery);
          }
          const service_delivery = {
            interval: interval != null ? interval : 0,
            month_delivery: month_delivery,
            skip: skip != null ? skip : 0,
            with_skip: with_skip,
          };
          this.listDelivery.push(service_delivery);
        }

        let service_steps = data_step;
        if (service_steps !== null) {
          service_steps = JSON.parse(service_steps);
          service_steps.map((item) => this.listStep.push(item));
        } else {
          service_steps = [];
        }

        course = JSON.parse(course);
        if (course && course !== null) {
          course.map((item) => {
            this.listCourseAdd.push(item);
          });
        } else {
          course = [];
        }

        let areas = JSON.parse(area);
        if (areas !== null) {
          areas.map((item) => {
            this.listArea.push(item);
          });
        } else {
          areas = [];
        }

        let hashTagUpdate = JSON.parse(localStorage.getItem("data-step-7"));
        if (hashTagUpdate !== null) {
          hashTagUpdate.map((item) => {
            this.listTag.push(item);
          });
        }
        let id = localStorage.getItem("id");
        const dataForm = new FormData();
        dataForm.append("service_id", Number(id));
        if (this.hash_id !== undefined) {
          dataForm.append("hash_id", this.hash_id);
        } else {
          dataForm.append("hash_id", this.hash_id);
        }
        dataForm.append("seller_id", account_id);
        dataForm.append(
          "service_cat_id",
          serviceCategoryId !== null ? Number(serviceCategoryId) : 1
        );

        let serviceTypeId_init = localStorage.getItem("data-step-4-init");
        if (serviceTypeId_init !== null && serviceTypeId === null) {
          serviceTypeId = serviceTypeId_init;
        }
        dataForm.append(
          "service_type_id",
          serviceTypeId === 'null' ? 1 : serviceTypeId
        );
        if (Number(serviceTypeId) == 4) {
          dataForm.append("url_website", urlType4);
        }
        dataForm.append("name", serviceName);
        if (address != null) {
          dataForm.append("address", address);
        }
        if (catchCopy != null) {
          dataForm.append("caption", catchCopy);
        }
        if (zipCode != null) {
          dataForm.append("zipcode", zipCode);
        }
        if (serviceContent != null) {
          dataForm.append("service_content", serviceContent);
        }
        if (isPrivate === null) {
          dataForm.append("private", 0);
        } else {
          dataForm.append("private", isPrivate);
        }

        if (max != null) {
          dataForm.append("max", max == "null" ? 0 : max);
        }
        if (areaStep11 != null) {
          dataForm.append("area", areaStep11);
        }
        if (websiteUrl != null) {
          dataForm.append("url", websiteUrl);
        }
        dataForm.append("is_reserves", Number(is_reserves));
        if (isPrivate == 1) {
          dataForm.append("url_private", urlPrivate);
        }
        dataForm.append("is_draft", 1);
        // ListImageService
        if (this.store.listFiles.length > 0) {
          this.store.listFiles.forEach((item, index) => {
            if (item.status === 0) {
              dataForm.append(
                "service_images[" + index + "]" + "[id]",
                item.id
              );
              dataForm.append(
                "service_images[" + index + "]" + "[status]",
                item.file === "" ? 0 : 1
              );

              if (typeof item.file === "object") {
                dataForm.append(
                  "service_images[" + index + "]" + "[file]",
                  item.file
                );
              } else {
                dataForm.append(
                  "service_images[" + index + "]" + "[file]",
                  item.file === "" ? "" : item.file
                );
              }
            } else {
              if (item.id !== undefined) {
                dataForm.append(
                  "service_images[" + index + "]" + "[id]",
                  item.id
                );
                dataForm.append(
                  "service_images[" + index + "]" + "[status]",
                  item.file === "" ? 0 : item.status
                );
                if (item.file !== "") {
                  if (typeof item.file === "object") {
                    dataForm.append(
                      "service_images[" + index + "]" + "[file]",
                      item.file
                    );
                  } else if (item.file.includes("data:image")) {
                    dataForm.append(
                      "service_images[" + index + "]" + "[file]",
                      this.base64toBlob(item.file)
                    );
                  } else {
                    dataForm.append(
                      "service_images[" + index + "]" + "[file]",
                      item.file
                    );
                  }
                } else {
                  dataForm.append(
                    "service_images[" + index + "]" + "[file]",
                    ""
                  );
                }
              } else {
                if (item.file !== "") {
                  if (typeof item.file !== "object") {
                    dataForm.append(
                      "service_images[" + index + "]" + "[file]",
                      this.base64toBlob(item.file)
                    );
                  } else {
                    dataForm.append(
                      "service_images[" + index + "]" + "[file]",
                      item.file
                    );
                  }
                } else {
                  dataForm.append(
                    "service_images[" + index + "]" + "[file]",
                    ""
                  );
                }
                dataForm.append(
                  "service_images[" + index + "]" + "[status]",
                  item.file === "" ? 0 : item.status
                );
              }
            }
          });
        } else {
          if (dataImage != null && dataImage.length > 0) {
            dataImage.forEach((item, index) => {
              if (item.status === 0) {
                dataForm.append(
                  "service_images[" + index + "]" + "[id]",
                  item.id
                );
                dataForm.append(
                  "service_images[" + index + "]" + "[status]",
                  item.status
                );
                dataForm.append("service_images[" + index + "]" + "[file]", "");
              }
            });
          }
        }

        this.listTag.forEach((item) => {
          if (item.id == undefined) {
            dataForm.append("tags[]", item.name);
          }
        });
        if (listTagDelete !== null) {
          if (listTagDelete.length > 0) {
            listTagDelete.forEach((item) => {
              dataForm.append("tag_deletes[]", item);
            });
          }
        }

        // ListArea
        areas = areas.filter((item) => item.list.length > 0);
        if (areas.length > 0) {
          areas.forEach((item, index) => {
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
        }

        // ListCourse
        if (this.listCourseAdd.length > 0) {
          this.listCourseAdd.forEach((item, index) => {
            if (item.course_id != undefined) {
              dataForm.append(
                "service_courses[" + index + "]" + "[course_id]",
                item.course_id
              );
            }
            if (
              (item.name !== null && this.store.listImgCourse.length > 0) ||
              (item.name !== null && this.store.listImgCourse.length === 0)
            ) {
              // ListImageCourse
              if (this.store.listImgCourse.length > 0) {
                this.store.listImgCourse.forEach((item, index) => {
                  dataForm.append(
                    "service_courses[" + index + "]" + "[image]",
                    item.file
                  );
                });
              }

              dataForm.append(
                "service_courses[" + index + "]" + "[name]",
                item.name === undefined ? item.course_name : item.name
              );
              dataForm.append(
                "service_courses[" + index + "]" + "[price]",
                Number(item.name === undefined ? item.course_price : item.price)
              );
              if (item.cycle != null && item.cycle != "null") {
                dataForm.append(
                  "service_courses[" + index + "]" + "[cycle]",
                  item.cycle === undefined ? item.course_cycle : item.cycle
                );
              }
              dataForm.append(
                "service_courses[" + index + "]" + "[content]",
                item.content === undefined ? item.course_content : item.content
              );
              dataForm.append(
                "service_courses[" + index + "]" + "[firstPr]",
                item.firstPr === undefined ? item.course_firstPr : item.firstPr
              );
              if (item.gender_restrictions != null) {
                dataForm.append(
                  "service_courses[" + index + "]" + "[gender_restrictions]",
                  item.gender_restrictions
                );
              } else {
                dataForm.append(
                  "service_courses[" + index + "]" + "[gender_restrictions]",
                  ""
                );
              }
              if (item.age_confirm === undefined) {
                dataForm.append(
                  "service_courses[" + index + "]" + "[age_confirm]",
                  item.course_age_confirm === "null"
                    ? 0
                    : Number(item.course_age_confirm)
                );
              } else {
                dataForm.append(
                  "service_courses[" + index + "]" + "[age_confirm]",
                  item.age_confirm === "null" ? 0 : Number(item.age_confirm)
                );
              }
            }
          });
        }

        // ListStep
        if (this.listStep.length > 0) {
          this.listStep.forEach((item, index) => {
            if (item.id !== undefined) {
              dataForm.append("service_steps[" + index + "]" + "[id]", item.id);
              dataForm.append(
                "service_steps[" + index + "]" + "[number]",
                index + 1
              );
              dataForm.append(
                "service_steps[" + index + "]" + "[title]",
                item.title === "" ? "" : item.title
              );
              if (item.content) {
                dataForm.append(
                  "service_steps[" + index + "]" + "[content]",
                  item.content
                );
              }
            } else {
              dataForm.append(
                "service_steps[" + index + "]" + "[number]",
                index + 1
              );
              dataForm.append(
                "service_steps[" + index + "]" + "[title]",
                item.title === "" ? "" : item.title
              );
              if (item.content) {
                dataForm.append(
                  "service_steps[" + index + "]" + "[content]",
                  item.content
                );
              }
            }
          });
        }
        if (this.dataStepDelete.length > 0) {
          this.dataStepDelete.forEach((item) => {
            dataForm.append("id_step_deletes[]", item);
          });
        }

        // ListDelivery
        if (this.listDelivery.length > 0) {
          this.listDelivery.forEach((item) => {
            dataForm.append("service_delivery" + "[interval]", item.interval);
            if (item.interval === 1) {
              dataForm.append(
                "service_delivery" + "[month_delivery]",
                item.month_delivery
              );
            }

            dataForm.append("service_delivery" + "[skip]", item.skip);
            dataForm.append("service_delivery" + "[with_skip]", item.with_skip);
          });
        }

        // service_reserve_setting
        if (Number(serviceTypeId == 2) || Number(serviceTypeId == 3)) {
          if (this.service_reserve_setting != null) {
            if (this.service_reserve_setting.max != null) {
              dataForm.append(
                "service_reserve_setting" + "[max]",
                this.service_reserve_setting.max
              );
            }
            dataForm.append(
              "service_reserve_setting" + "[is_enable]",
              this.service_reserve_setting.is_enable === true ? "1" : "0"
            );
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
            dataForm.append(
              "service_reserve_setting" + "[type_duration_after]",
              this.service_reserve_setting.type_duration_after != undefined
                ? this.service_reserve_setting.type_duration_after
                : null
            );
          }
        }
        // service_reserve_setting

        // service_hours
        if (Number(serviceTypeId == 2) || Number(serviceTypeId == 3)) {
          if (this.service_hours != null) {
            if (this.service_hours.length > 0) {
              this.service_hours.forEach((item, index) => {
                dataForm.append(
                  "service_hours[" + index + "]" + "[day_of_week]",
                  item.day_of_week
                );

                item.work_hour.map((item1, index1) => {
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
          }
        }
        let serviceId = localStorage.getItem("id");
        await this.store.editServiceDraftById(dataForm, Number(serviceId));
      } else {
        let serviceName = localStorage.getItem("data-step-1");
        if (serviceName === "" || serviceName === null) {
          this.toast.error(this.messageNoti.save_step1, this.optionToast);
        } else {
          this.preload = true;
          let id = localStorage.getItem("id-step-8");
          let hash_id = localStorage.getItem("hash_id-step-8");
          let account_id = null;
          let rememberLogin = localStorage.getItem("rememberLogin");
          if (rememberLogin === "true") {
            account_id = localStorage.getItem("account_id");
          } else {
            account_id = Cookies.get("account_id");
          }
          let serviceName = localStorage.getItem("data-step-1");
          let serviceCategoryId = localStorage.getItem("id-step-2");
          let area = localStorage.getItem("data-step-area_id-3");
          let serviceTypeId = localStorage.getItem("data-step-4");
          let catchCopy = localStorage.getItem("data-step-5-catchCopy");
          let serviceContent = localStorage.getItem("data-step-6");
          let hashTag = localStorage.getItem("data-step-7");
          let isPrivate = localStorage.getItem("isPrivate-step-8");
          let max = localStorage.getItem("data-step-10-max");
          let course = localStorage.getItem("list-course");
          let data_step = localStorage.getItem("data-step-9");
          let skip = localStorage.getItem("skip");
          let with_skip = localStorage.getItem("with_skip");
          let interval = localStorage.getItem("interval");
          let month_delivery = localStorage.getItem("month_delivery");
          let urlPrivate = localStorage.getItem("url-step-8");
          let url = localStorage.getItem("data-step-11-websiteUrl");
          let zipCode = localStorage.getItem("zipCode");
          let address = localStorage.getItem("data-step-11-address");
          let areaStep11 = localStorage.getItem("area");
          let service_reserve_setting = localStorage.getItem(
            "service_reserve_setting"
          );
          let service_hours = localStorage.getItem("service_hours");
          let is_reserves = localStorage.getItem("is_reserves");
          let urlType4 = localStorage.getItem("urlType4");

          if (
            service_reserve_setting !== "null" ||
            service_reserve_setting !== null
          ) {
            this.service_reserve_setting = JSON.parse(service_reserve_setting);
          }

          if (service_hours !== "null" || service_hours !== null) {
            this.service_hours = JSON.parse(service_hours);
          }

          if (month_delivery === "null") {
            month_delivery = null;
          } else {
            month_delivery = Number(month_delivery);
          }
          if (with_skip === "null") {
            with_skip = 0;
          } else {
            with_skip = Number(with_skip);
          }
          if (month_delivery === "null") {
            month_delivery = 0;
          } else {
            month_delivery = Number(month_delivery);
          }
          course = JSON.parse(course);
          if (course) {
            course.map((item) => {
              this.listCourseAdd.push(item);
            });
          } else {
            this.listCourseAdd = [];
          }
          let service_steps = data_step;
          service_steps = JSON.parse(service_steps);
          if (service_steps) {
            service_steps.map((item) => this.listStep.push(item));
          }

          let areas = JSON.parse(area);
          if (areas) {
            this.listArea = [];
            areas.map((item) => {
              this.listArea.push(item);
            });
          }

          if (interval !== null) {
            let service_delivery = {
              interval: interval,
              month_delivery: month_delivery,
              skip: skip,
              with_skip: with_skip,
            };
            this.listDelivery.push(service_delivery);
          }

          let tags = JSON.parse(hashTag);
          if (tags) {
            tags.map((item) => {
              this.listTag.push(item);
            });
          }

          const dataForm = new FormData();
          // dataForm.append("service_id", id === null ? this.id : Number(id));
          // dataForm.append(
          //   "hash_id",
          //   hash_id === null ? this.hash_id : hash_id
          // );
          dataForm.append("seller_id", account_id);

          if (serviceCategoryId !== null) {
            dataForm.append("service_cat_id", Number(serviceCategoryId));
          }

          if (Number(serviceTypeId) == 4) {
            dataForm.append("url_website", urlType4);
          }

          if (serviceTypeId !== null) {
            dataForm.append("service_type_id", Number(serviceTypeId));
          }

          dataForm.append("name", serviceName !== null ? serviceName : "");

          if (url !== null) {
            dataForm.append("url", url);
          }

          if (address !== null) {
            dataForm.append("address", address);
          }

          if (zipCode !== null) {
            dataForm.append("zipcode", zipCode);
          }

          if (catchCopy !== null) {
            dataForm.append("caption", catchCopy);
          }

          if (serviceContent !== null) {
            dataForm.append("service_content", serviceContent);
          }

          if (isPrivate !== null) {
            dataForm.append("private", isPrivate);
          }

          if (max !== null) {
            dataForm.append("max", max == "null" ? 0 : max);
          }

          if (areaStep11 !== null) {
            dataForm.append("area", areaStep11);
          }
          if (is_reserves !== null) {
            dataForm.append("is_reserves", is_reserves);
          }

          dataForm.append("is_draft", 1);

          if (isPrivate == 1) {
            if (urlPrivate !== null) {
              dataForm.append("url_private", urlPrivate);
            }
          }

          // ListImageService

          if (this.store.listFiles.length > 0) {
            this.store.listFiles.forEach((item, index) => {
              dataForm.append("service_images[" + index + "]", item.file);
            });
          }
          if (this.listTag.length > 0) {
            this.listTag.forEach((item) => {
              dataForm.append("tags[]", item);
            });
          }

          // ListArea
          if (areas != null) {
            if (areas.length > 0) {
              areas.forEach((item, index) => {
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
            }
          }

          // ListCourse
          if (this.listCourseAdd.length > 0) {
            this.listCourseAdd.forEach((item, index) => {
              if (item.name !== "" || this.store.listImgCourse.length > 0) {
                dataForm.append(
                  "service_courses[" + index + "]" + "[name]",
                  item.name
                );
                dataForm.append(
                  "service_courses[" + index + "]" + "[price]",
                  Number(item.price)
                );
                if (item.cycle != null && item.cycle != "null") {
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
                  Number(item.gender_restrictions) == 0
                    ? 0
                    : Number(item.gender_restrictions) == 1
                    ? 1
                    : 2
                );
                dataForm.append(
                  "service_courses[" + index + "]" + "[age_confirm]",
                  item.age_confirm === "null" ? 0 : Number(item.age_confirm)
                );
              }
            });
          }

          // ListImageCourse
          if (this.store.listImgCourse.length > 0) {
            this.store.listImgCourse.forEach((item, index) => {
              dataForm.append(
                "service_courses[" + index + "]" + "[image]",
                item.file
              );
            });
          }

          // ListStep
          if (this.listStep.length > 0) {
            this.listStep.forEach((item, index) => {
              dataForm.append(
                "service_steps[" + index + "]" + "[number]",
                index
              );
              dataForm.append(
                "service_steps[" + index + "]" + "[title]",
                item.title
              );
              if (item.content) {
                dataForm.append(
                  "service_steps[" + index + "]" + "[content]",
                  item.content
                );
              }
            });
          }

          // ListStep

          // ListDelivery
          if (this.listDelivery.length > 0) {
            this.listDelivery.forEach((item) => {
              dataForm.append("service_delivery" + "[interval]", item.interval);
              if (item.interval === 1) {
                dataForm.append(
                  "service_delivery" + "[month_delivery]",
                  item.month_delivery
                );
              }
              dataForm.append(
                "service_delivery" + "[skip]",
                item.skip === null ? 0 : item.skip
              );
              dataForm.append(
                "service_delivery" + "[with_skip]",
                item.with_skip
              );
            });
          }

          // service_reserve_setting
          if (Number(serviceTypeId == 2) || Number(serviceTypeId == 3)) {
            if (this.service_reserve_setting != null) {
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
                "service_reserve_setting" + "[is_enable]",
                this.service_reserve_setting.is_enable === true ? "1" : "0"
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
              dataForm.append(
                "service_reserve_setting" + "[type_duration_after]",
                this.service_reserve_setting.type_duration_after != undefined
                  ? this.service_reserve_setting.type_duration_after
                  : null
              );
            }
          }
          // service_reserve_setting

          // service_hours
          if (Number(serviceTypeId == 2) || Number(serviceTypeId == 3)) {
            if (this.service_hours != null) {
              if (this.service_hours.length > 0) {
                this.service_hours.forEach((item, index) => {
                  dataForm.append(
                    "service_hours[" + index + "]" + "[day_of_week]",
                    item.day_of_week
                  );

                  item.work_hour.map((item1, index1) => {
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
            }
          }
          // service_hours
          // ListDelivery
          await this.store.createNewServiceDraft(dataForm);
          this.preload = true;
        }
      }
    },
    base64toBlob(dataurl) {
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      let newFile = new File([u8arr], {
        type: mime,
      });
      return newFile;
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
      localStorage.removeItem("url-step-8");
      localStorage.removeItem("lengthListCourse");
      localStorage.removeItem("data-step-9-delete");
      localStorage.removeItem("listClick");
      localStorage.removeItem("urlType4");
      this.store.listFiles = [];
      this.store.imgCourseService = [];
      this.store.listImgCourse = [];
      this.store.dataAddress = {};
      localStorage.removeItem("isCourseDraft");
      localStorage.removeItem("course_id");
      localStorage.removeItem("course_images");
      localStorage.removeItem("data-step-4-init");
      localStorage.removeItem("service_reserve_setting-init");
      localStorage.removeItem("data-step-7-init");
      localStorage.removeItem("isPrivate-step-8-init");
      localStorage.removeItem("service_id");
      localStorage.removeItem("typeServiceId");
      localStorage.removeItem("isNewService");
      localStorage.removeItem("is_reserves-init");
    },
  },
};
</script>

<style></style>
