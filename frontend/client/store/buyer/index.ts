import { defineStore } from "pinia";
import { Message } from "../../utils/message";
import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";
interface State {
  message: string;
  messageComment: string;
  success: string;
  deleteCommentSuccess: string;
  dataAccountBuyer: {};
  error: string;
  checkPermissionService: string;
  detailInvoice: {};
  dataServiceBought: {};
  dataServiceFavorite: {};
  dataServiceStop: {};
  listComment: [];
  listCommentBuyer: [];
  detailComment: {};
  detailService: {};
  detailServiceByHashId: {};
  detailServiceStop: {};
  listFiles: {};
  listDeliveryForBuyer: [];
  listPaymentForBuyer: [];
  detailPayment: {};
  listDeleteImage: [];
  listStatisticReservation: [];
  infoWithdrawal: {};
  updateQRSuccess: false;
  stopSuccess: string;
  deliverySuccess: string;
  deliveryError: string;
  deliveryMessage: string;
  stopMessage: string;
}

export const buyerStore = defineStore("buyer", {
  // arrow function recommended for full type inference
  state: (): State => ({
    message: "",
    messageComment: "",
    success: "",
    deleteCommentSuccess: "",
    dataAccountBuyer: {},
    error: "",
    checkPermissionService: "",
    detailInvoice: {},
    dataServiceBought: {},
    dataServiceFavorite: {},
    dataServiceStop: {},
    listComment: [],
    listCommentBuyer: [],
    detailComment: {},
    detailService: [],
    detailServiceByHashId: {},
    detailServiceStop: {},
    listFiles: {},
    listDeliveryForBuyer: [],
    listPaymentForBuyer: [],
    detailPayment: {},
    listDeleteImage: [],
    listStatisticReservation: [],
    infoWithdrawal: {},
    updateQRSuccess: false,
    stopSuccess: '',
    stopMessage: '',
    deliverySuccess: '',
    deliveryError: '',
    deliveryMessage: ''
  }),

  actions: {
    setFiles(data) {
      this.listFiles = data;
    },

    getAccount(request) {
      Api.requestServer
        .get(`${Urls.BUYER}/${Urls.ACCOUNT}/${request}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.dataAccountBuyer = data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editProfile(request) {
      Api.requestServer
        .put(
          `${Urls.BUYER}/${Urls.PROFILE}/${Urls.EDIT}/${request.account_id}`,
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
          `${Urls.BUYER}/${Urls.PROFILE}/${Urls.AVATAR}/${Urls.EDIT}`,
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

    getDetailInvoice(request) {
      Api.requestServer
        .get(`${Urls.BUYER}/${Urls.SERVICE}/${Urls.INVOICE}/${request}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.detailInvoice = data.data;
            this.success = "true";
          } else {
            this.success = "false";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getServiceBought(request) {
      Api.requestServer
        .post(
          `${Urls.BUYER}/${Urls.SERVICE}/${Urls.BUYING_OR_BOUGHT}?page=${request.page}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.dataServiceBought = data.data;
          } else {
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getServiceFavorite(request) {
      Api.requestServer
        .post(
          `${Urls.BUYER}/${Urls.SERVICE}/${Urls.FAVORITE}?page=${request.page}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.dataServiceFavorite = data.data;
          } else {
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getListComment(request) {
      const id = request.buyer_id,
        limit = request.limit,
        page = request.page;
      Api.requestServer
        .get(`${Urls.COMMENT}/${Urls.BUYER}/${id}?limit=${limit}&page=${page}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listComment = data.data;
          } else {
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getListCommentByServiceId(request) {
      const id = request.buyer_id,
      serviceId = request.service_id,
        limit = request.limit,
        page = request.page;
      Api.requestServer
        .get(`${Urls.COMMENT}/${Urls.BUYER}/${serviceId}/${Urls.LIST}/${id}?limit=${limit}&page=${page}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listCommentBuyer = data.data;
          } else {
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getDetailComment(request) {
      Api.requestServer
        .get(
          `${Urls.COMMENT}/${Urls.DETAIL}/${request.hash_id}?buyer_id=${request.buyer_id}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.detailComment = data.data;
          } else {
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getServiceStop(request) {
      Api.requestServer
        .post(
          `${Urls.BUYER}/${request.buyer_id}/${Urls.SERVICE}/${Urls.LIST_STOP}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.dataServiceStop = data.data;
          } else {
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteComment(id) {
      Api.requestServer
        .delete(`${Urls.COMMENT}/${Urls.DELETE}/${id}`)
        .then((response) => {
          const { data } = response;
          if (data.success == true) {
            this.success = true;
            this.deleteCommentSuccess = true;
            this.message = data.message;
            this.messageComment = data.message;
          } else {
            this.error = true;
            this.deleteCommentSuccess = false;
            this.message = data.message;
            this.messageComment = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    createComment(formData) {
      Api.requestServer
        .post(`${Urls.COMMENT}/${Urls.CREATE}`, formData)
        .then((response) => {
          const { data } = response;
          if (data.success == true) {
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

    editComment(id, formData) {
      Api.requestServer
        .post(`${Urls.COMMENT}/${Urls.EDIT}/${id}`, formData)
        .then((response) => {
          const { data } = response;
          if (data.success == true) {
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

    getDetailService(id) {
      Api.requestServer
        .get(`${Urls.SERVICE}/${Urls.DETAIL}/${id}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.detailService = data.data;
          } else {
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getDetailServiceByHashId(hash_id) {
      Api.requestServer
        .get(`${Urls.BUYER}/${Urls.SERVICE}/${hash_id}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            if (data.message == "アクセス権限がありません") {
              this.message = data.message;
              this.checkPermissionService = true;
            } else {
              this.detailServiceByHashId = data.data;
            }
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getDetailServiceStop(hash_id) {
      Api.requestServer
        .get(`${Urls.BUYER}/${Urls.SERVICE}/${Urls.DELETED}/${hash_id}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            if (data.message == "アクセス権限がありません") {
              this.message = data.message;
              this.checkPermissionService = true;
            } else {
              this.detailServiceStop = data.data;
            }
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getListDelivery(request) {
      await Api.requestServer
        .post(
          `${Urls.BUYER}/${Urls.SERVICE}/${request.hash_id}/${Urls.DELIVERY_LIST}?page=${request.page}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listDeliveryForBuyer = data.data;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListPayment(request) {
      await Api.requestServer
        .post(
          `${Urls.BUYER}/${Urls.SERVICE}/${request.hash_id}/${Urls.PAYMENT}/${Urls.LIST}?page=${request.page}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listPaymentForBuyer = data.data;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getDetailPayment(id) {
      await Api.requestServer
        .get(`${Urls.BUYER}/${Urls.PAYMENT}/${Urls.DETAIL}/${id}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.detailPayment = data.data;
          } else {
            this.error = true;
            this.message = data.message;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async stopService(id) {
      await Api.requestServer
        .get(`${Urls.BUYER}/${Urls.SERVICE}/${Urls.STOP}/${id}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.stopSuccess = true;
            this.stopMessage = data.message;
          } else {
            this.stopMessage = data.message;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async updateSettingAccount(request) {
      await Api.requestServer
        .patch(`${Urls.ACCOUNT}/${Urls.BUYER}/${Urls.SETTING}`, request)
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

    async getListStatisticReservation(buyer_id) {
      await Api.requestServer
        .get(`${Urls.BUYER}/${buyer_id}/${Urls.STATISTIC_RESERVATION}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listStatisticReservation = data.data;
          } else {
            this.error = true;
            this.message = data.message;
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

    async updateByQRCode(request) {
      await Api.requestServer
        .post(`${Urls.BUYER}/${Urls.SERVICE}/${Urls.UPDATE_QRCODE}`, request)
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

    async updateDeliveryStatus(id) {
      const request = {
        delivery_status: 0,
      };
      Api.requestServer
        .patch(
          `${Urls.SELLER}/${Urls.DELIVERY}/${id}/${Urls.DELIVERY_STATUS}`,
          request
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.deliverySuccess = true;
            this.deliveryMessage = data.message;
          } else {
            this.deliveryError = true;
            this.deliveryMessage = data.message;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
