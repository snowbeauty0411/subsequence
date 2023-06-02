import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";

import { defineStore } from "pinia";
interface State {
  message: string;
  messageDeleteCouse: string;
  success: string;
  successDeleteCouse: [];
  error: string;
  errorDeletCouse: string;
  detailService: {};
  listCategory: [];
  listServiceOther: [];
  listServiceFavorite: [];
  listServiceHistory: [];
  listServiceCategory: [];
  listReview: [];
  listReviewByService: [];
  listCourse: [];
  successDelete: string;
  listCourseAll: [];
}
export const ServiceStore = defineStore("serviceStore", {
  // arrow function recommended for full type inference
  state: (): State => ({
    message: "",
    success: "",
    error: "",
    messageDeleteCouse: "",
    successDeleteCouse: [],
    errorDeletCouse: "",
    detailService: {},
    listCategory: [],
    listServiceOther: [],
    listServiceFavorite: [],
    listServiceHistory: [],
    listServiceCategory: [],
    listReview: [],
    listReviewByService: [],
    listCourse: [],
    successDelete: "",
    listCourseAll: [],
  }),

  actions: {
    async getDetailServiceById(request) {
      await Api.requestServer
        .get(`${Urls.SERVICE}/${Urls.DETAIL}/${request}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.detailService = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getDetailServiceByIdLogined(request) {
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.DETAIL}/${request.hash_id}?buyer_id=${request.buyer_id}&is_guest=${request.is_guest}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.detailService = data.data;
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
          this.success = false;
        });
    },

    async getListServiceOther(request) {
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.DETAIL}/${request.id}/${Urls.OTHER_LIST}?limit=${request.limit}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listServiceOther = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListServiceOtherLogined(request) {
      const buyer_id = request.buyer_id;
      const limit = request.limit;
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.DETAIL}/${request.id}/${Urls.OTHER_LIST}?limit=${limit}&buyer_id=${buyer_id}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listServiceOther = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListServiceFavorite(request) {
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.DETAIL}/${request.id}/${Urls.RANDOM_SERVICE}?buyer_id=${request.buyer_id}&limit=${request.limit}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listServiceFavorite = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListServiceHistoryLogined(request) {
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${request.id}/${Urls.BROWSER_HISTORY}?buyer_id=${request.buyer_id}&limit=${request.limit}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listServiceHistory = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListServiceHistory(request) {
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${request.id}/${Urls.BROWSER_HISTORY}?limit=${request.limit}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listServiceHistory = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListServiceCategory(request) {
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.DETAIL}/${request.id}/${Urls.SAME_CATEGORY_SERVICE}?limit=${request.limit}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listServiceCategory = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListServiceCategoryLogined(request) {
      const buyer_id = request.buyer_id;
      const limit = request.limit;
      const page = 1;
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.DETAIL}/${request.id}/${Urls.SAME_CATEGORY_SERVICE}?limit=${limit}&page=${page}&buyer_id=${buyer_id}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listServiceCategory = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListReviewService(request) {
      const per_page = request.per_page;
      const id = request.id;
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.DETAIL}/${id}/${Urls.LIST_REVIEW}?per_page=${per_page}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listReview = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListReviewByService(request) {
      const per_page = request.per_page;
      const id = request.id;
      const page = request.page;
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.DETAIL}/${id}/${Urls.LIST_REVIEW}?per_page=${per_page}&page=${page}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listReviewByService = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListCourseByHashId(request) {
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.DETAIL}/${request.hash_id}/${Urls.LIST_COURSE}?per_page=100&page=${request.page}&user_type=${request.user_type}&user_id=${request.user_id}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listCourse = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListCourseDraftByHashId(request) {
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.DETAIL}/${request.hash_id}/${Urls.LIST_COURSE}?per_page=${request.per_page}&page=${request.page}&user_type=${request.user_type}&user_id=${request.user_id}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listCourse = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListCourseAll(request) {
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.DETAIL}/${request.hash_id}/${Urls.LIST_COURSE}?per_page=100&page=${request.page}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listCourseAll = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async deleteServiceById(request) {
      await Api.requestServer
        .delete(`${Urls.SERVICE}/${Urls.DELETE}/${request}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.successDelete = true;
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

    async deleteCourse(request) {
      await Api.requestServer
        .post(`${Urls.SERVICE}/${Urls.DELETE_COURSE}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.successDeleteCouse = [{ status: true, time: Date.now() }];
            this.messageDeleteCouse = data.message;
          } else {
            this.errorDeleteCouse = true;
            this.messageDeleteCouse = data.message;
          }
        })
        .catch((error) => {
          this.messageDeleteCouse = false;
        });
    },
  },
});
