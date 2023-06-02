import { APISettings } from "../../utils/fetch-api";
import { Message } from "../../utils/message";
import { defineStore } from "pinia";
import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";

interface State {
  message: string;
  success: string;
  messageService: string;
  successService: string;
  updateDeliverySuccess: string;
  updateDeliveryMessage: string;
  dataAccount: {};
  error: string;
  errorAddress: string;
  errorSystem: string;
  errorService: string;
  checkPermissionService: string;
  dataServiceCreate: {};
  dataServiceSelling: {};
  dataAccountInfo: {};
  listCategory: {};
  listArea: {};
  listHashtag: {};
  listFiles: [];
  listDeliveryForSeller: [];
  imgCourseService: [];
  listImgCourse: [];
  dataAddress: {};
  dataHashID: {};
  listCustomerForSeller: [];
  listDateSelected: [];
  listCourseSelected: [];
  listComment: [];
  detailComment: {};
  detailService: {};
  imgCourseEdit: [];
  listCourse: [];
  listMonthOfStatistical: [];
  listYearOfStatistical: [];
  listGraphOfStatistical: [];
  listService: [];
  transferHistory: {};
  listTransferHistory: [];
  cardFlg: boolean;
  cardInfo: {};
  createTransferFlg: boolean;
  createSuccess: string;
  createError: string;
  createMessage: string;
  infoWithdrawal: {};
  successDraft: string;
  errorDraft: string;
  listHashTag: [];
  listApproved: [];
  updateQRSuccess: boolean;
  imgCourseDraft: {};
  createCourseSuccess: boolean;
  messageCourse: string;
  latLngAddress: {};
}

export const sellerStore = defineStore("seller", {
  // arrow function recommended for full type inference
  state: (): State => ({
    message: "",
    success: "",
    messageService: "",
    successService: "",
    dataAccount: {},
    error: "",
    errorAddress: "",
    errorSystem: "",
    errorService: "",
    checkPermissionService: "",
    dataServiceCreate: {},
    dataServiceSelling: {},
    dataAccountInfo: {},
    listCategory: {},
    listArea: {},
    listHashtag: {},
    listFiles: [],
    listDeliveryForSeller: [],
    imgCourseService: [],
    listImgCourse: [],
    dataAddress: {},
    dataHashID: {},
    listCustomerForSeller: [],
    listDateSelected: [],
    listCourseSelected: [],
    listComment: [],
    detailComment: {},
    detailService: {},
    imgCourseEdit: [],
    listCourse: [],
    listMonthOfStatistical: [],
    listYearOfStatistical: [],
    listGraphOfStatistical: [],
    listService: [],
    transferHistory: {},
    listTransferHistory: [],
    cardFlg: false,
    cardInfo: {},
    createTransferFlg: false,
    createSuccess: "",
    createError: "",
    createMessage: "",
    infoWithdrawal: {},
    successDraft: "",
    errorDraft: "",
    listHashTag: [],
    listApproved: [],
    updateQRSuccess: false,
    imgCourseDraft: {},
    createCourseSuccess: false,
    messageCourse: "",
    latLngAddress: {},
    updateDeliverySuccess: "",
    updateDeliveryMessage: ""
  }),

  actions: {
    setFiles(data) {
      this.listFiles = data;
    },

    createHashID() {
      Api.requestServer
        .get(`${Urls.SERVICE}/${Urls.HASH_ID}/`)
        .then((response) => {
          const { data } = response;
          this.dataHashID = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getAddress(request) {
      Api.requestServer
        .get(`${Urls.SERVICE}/${Urls.PREFECTURES}/${request}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.dataAddress = data.data;
          } else {
            this.errorAddress = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getAccount(request) {
      Api.requestServer
        .get(`${Urls.SELLER}/${Urls.ACCOUNT}/${request}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.dataAccount = data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editProfile(request) {
      Api.requestServer
        .put(
          `${Urls.SELLER}/${Urls.PROFILE}/${Urls.EDIT}/${request.account_id}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.success = "true";
            this.message = data.message;
          } else {
            this.error = "true";
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    uploadAvatar(request) {
      Api.requestServer
        .post(
          `${Urls.SELLER}/${Urls.PROFILE}/${Urls.AVATAR}/${Urls.EDIT}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
          } else {
            this.error = "true";
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    uploadIdentification(request) {
      Api.requestServer
        .post(`${Urls.IDENTITY}/${Urls.UPLOAD_FILE}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.success = "true";
            this.message = data.message;
          } else {
            this.error = "true";
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getServiceCreating(request) {
      Api.requestServer
        .post(
          `${Urls.SELLER}/${Urls.SERVICE}/${Urls.CREATING_OR_SELLING}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.dataServiceCreate = data.data;
          } else {
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getServiceSelling(request) {
      Api.requestServer
        .post(
          `${Urls.SELLER}/${Urls.SERVICE}/${Urls.CREATING_OR_SELLING}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.dataServiceSelling = data.data;
          } else {
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getAccountInfo() {
      Api.requestServer
        .get(`${Urls.ACCOUNT_SETTING}/${Urls.INFO_SELLER}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.dataAccountInfo = data.data;
          } else {
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async updateSettingAccount(request) {
      await Api.requestServer
        .patch(`${Urls.ACCOUNT}/${Urls.SELLER}/${Urls.SETTING}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.success = true;
            this.message = data.message;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async updateEmail(request) {
      await Api.requestServer
        .post(`${Urls.MAIL}/${Urls.INPUT}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.success = true;
            this.message = data.message;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListCategory() {
      await Api.requestServer
        .get(`${Urls.SERVICE_CATEGORY_LIST}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listCategory = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async createService(request) {
      await Api.requestServer
        .post(`${Urls.CREATE_SERVICE}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.success = true;
            this.message = data.message;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          this.errorSystem = true;
          console.log(error);
        });
    },

    async createNewServiceDraft(request) {
      await Api.requestServer
        .post(`${Urls.CREATE_SERVICE}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.successDraft = true;
            this.message = data.message;
          } else {
            this.errorDraft = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          this.errorSystem = true;
          console.log(error);
        });
    },

    async editServiceById(request, hash_id) {
      await Api.requestServer
        .post(`${Urls.SERVICE}/${Urls.EDIT}/${hash_id}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.success = true;
            this.message = data.message;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          this.errorSystem = true;
          this.success = false;
        });
    },

    async editServiceDraftById(request, hash_id) {
      await Api.requestServer
        .post(`${Urls.SERVICE}/${Urls.EDIT}/${hash_id}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.successDraft = true;
            this.message = data.message;
          } else {
            this.errorDraft = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          this.errorSystem = true;
          this.success = false;
        });
    },

    async getListArea() {
      await Api.requestServer
        .get(`${Urls.AREA_INFO}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listArea = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListTag() {
      await Api.requestServer
        .get(`${Urls.HASH_TAG}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listHashtag = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListDelivery(request) {
      await Api.requestServer
        .post(
          `${Urls.SELLER}/${Urls.SERVICE}/${request.idService}/${Urls.DELIVERY_LIST}?page=${request.page}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listDeliveryForSeller = data.data;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    setImageCourseService(data) {
      this.imgCourseService = data;
      this.listImgCourse.push(data);
    },

    editImageCourseService(data) {
      this.imgCourseEdit = data;
    },

    editImageCourseDraft(data) {
      this.imgCourseDraft = data;
    },

    async getListCustomer(request) {
      await Api.requestServer
        .post(
          `${Urls.SELLER}/${Urls.SERVICE}/${request.idService}/${Urls.LIST_CUSTOMER}?page=${request.page}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listCustomerForSeller = data.data;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getDateSelected(request) {
      await Api.requestServer
        .get(
          `${Urls.SELLER}/${Urls.SERVICE}/${request.idService}/${Urls.LIST_CUSTOMER}/${Urls.DATA_SELECT}?type_select=${request.type_select}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listDateSelected = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getCourseSelected(request) {
      await Api.requestServer
        .get(
          `${Urls.SELLER}/${Urls.SERVICE}/${request.idService}/${Urls.LIST_CUSTOMER}/${Urls.DATA_SELECT}?type_select=${request.type_select}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listCourseSelected = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListComment(request) {
      const per_page = request.per_page;
      const page = request.page;
      const seller_id = request.seller_id;
      await Api.requestServer
        .get(
          `${Urls.COMMENT}/${Urls.SELLER}/${seller_id}?per_page=${per_page}&page=${page}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listComment = data.data;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async replyComment(request) {
      const id = request.id;
      await Api.requestServer
        .post(`${Urls.COMMENT}/${id}/${Urls.REPLY}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.success = true;
            this.message = data.message;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getDetailComment(request) {
      await Api.requestServer
        .get(
          `${Urls.COMMENT}/${Urls.DETAIL}/${request.service_hash_id}?buyer_id=${request.buyer_id}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.detailComment = data.data;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async updateDeliveryStatus(id, type) {
      const request = {
        delivery_status: type,
      };
      Api.requestServer
        .patch(
          `${Urls.SELLER}/${Urls.DELIVERY}/${id}/${Urls.DELIVERY_STATUS}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.updateDeliverySuccess = true;
            this.updateDeliveryMessage = data.message;
          } else {
            this.error = true;
            this.updateDeliveryMessage = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getListCourse(request) {
      await Api.requestServer
        .get(`${Urls.SERVICE}/${Urls.DETAIL}/${request}/${Urls.LIST_COURSE}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listCourse = data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getMonthOfStatistical(idService) {
      Api.requestServer
        .get(`${Urls.SELLER}/${Urls.STATISTICAL_MONTH}/${idService}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.success = true;
            this.listMonthOfStatistical = data.data;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getYearOfStatistical(sellerID, page, request) {
      Api.requestServer
        .post(
          `${Urls.SELLER}/${Urls.STATISTICAL_YEAR}/${sellerID}?page=${page}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.success = true;
            this.listYearOfStatistical = data.data;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getGraphOfStatistical(idService, request) {
      Api.requestServer
        .post(`${Urls.SELLER}/${Urls.STATISTICAL_GRAPH}/${idService}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.success = true;
            this.listGraphOfStatistical = data.data;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getListServiceOfSeller(sellerID) {
      Api.requestServer
        .get(`${Urls.SELLER}/${Urls.STATISTICAL_LIST_SERVICE}/${sellerID}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.success = true;
            this.listService = data.data;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getTransferHistory(sellerID) {
      Api.requestServer
        .get(`${Urls.SELLER}/${sellerID}/${Urls.TRANSFER_HISTORY}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.transferHistory = data.data;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getListTransferHistory(sellerID, perPage, page) {
      Api.requestServer
        .get(
          `${Urls.SELLER}/${sellerID}/${Urls.TRANSFER_LIST}?per_page=${perPage}&page=${page}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listTransferHistory = data.data;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addCreditCard(request) {
      Api.requestServer
        .post(`/${Urls.SELLER_CARD_CREATE}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.success = true;
            this.message = data.message;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateCreditCard(sellerId, request) {
      Api.requestServer
        .put(`/${Urls.SELLER_CARD_EDIT}/${sellerId}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.success = true;
            this.message = data.message;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getDetailCard(sellerID) {
      Api.requestServer
        .get(`${Urls.SELLER_CARD_INFO}/${sellerID}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.cardInfo = data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    createTransfer(sellerID, request) {
      Api.requestServer
        .post(`${Urls.SELLER}/${sellerID}/${Urls.TRANSFER_CREATE}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.createSuccess = true;
            this.createMessage = data.message;
            this.createTransferFlg = true;
          } else {
            this.createTransferFlg = false;
            this.createError = true;
            this.createMessage = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getInfoWithdrawalAccount(request) {
      Api.requestServer
        .get(`${Urls.ACCOUNT}/${request}/${Urls.INFO_WITHDRAWAL}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.infoWithdrawal = data.data;
            this.message = data.message;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    withdrawalAccount(request, account_id) {
      Api.requestServer
        .patch(`${Urls.ACCOUNT}/${account_id}/${Urls.WITHDRAWAL}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.success = true;
            this.message = data.message;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getHashTagList(request) {
      await Api.requestServer
        .get(`${Urls.HASHTAG_LIST}?name=${request}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listHashTag = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListServiceApproved(request) {
      await Api.requestServer
        .post(`${Urls.SELLER}/${Urls.SERVICE}/${Urls.APPROVED}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listApproved = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getDetailServiceById(request) {
      await Api.requestServer
        .get(`${Urls.SELLER}/${Urls.SERVICE}/${request}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.successService = true;
            if (data.message == "アクセス権限がありません") {
              this.messageService = data.message;
              this.checkPermissionService = true;
            } else {
              this.detailService = data.data;
            }
          } else {
            this.errorService = true;
            this.messageService = data.message;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async updateByQRCode(request) {
      await Api.requestServer
        .post(`${Urls.SELLER}/${Urls.SERVICE}/${Urls.UPDATE_QRCODE}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.updateQRSuccess = true;
            this.message = data.message;
          } else {
            this.updateQRSuccess = false;
            this.message = data.message;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async createCourse(request) {
      await Api.requestServer
        .post(`${Urls.SERVICE}/${Urls.CREATE_COURSE}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.createCourseSuccess = true;
            this.messageCourse = data.message;
          } else {
            this.createCourseSuccess = false;
            this.messageCourse = data.message;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async requestSupport() {
      await Api.requestServer
        .get(`${Urls.SELLER}/${Urls.SUPPORT}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.message = data.message;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getLatLngFromAddress(request) {
      await Api.requestServer
        .post(`${Urls.SELLER}/${Urls.SERVICE}/${Urls.GET_LAT_LNG}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.latLngAddress = data.data;
          } else {
            this.latLngAddress = null;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },
  },
});
