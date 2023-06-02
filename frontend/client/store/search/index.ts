import { Urls } from "../../utils/urls";
import { Api } from "../../utils/https-common";

import { defineStore } from "pinia";
interface State {
  message: string;
  messageFavorite: string;
  success: string;
  error: string;
  successFavorite: string;
  errorFavorite: string;
  listCategory: [];
  listServiceByCategory: [];
  listServiceByKeyword: [];
  listServiceByArea: [];
  detailCategory: {};
  listArea: [];
  listServiceByStation: [];
  listServiceByHashTag: [];
  listStation: [];
  favoriteFlag: boolean;
}
export const SearchStore = defineStore("SearchStore", {
  // arrow function recommended for full type inference
  state: (): State => ({
    message: "",
    messageFavorite: "",
    success: "",
    error: "",
    successFavorite: "",
    errorFavorite: "",
    listCategory: [],
    listServiceByCategory: [],
    listServiceByKeyword: [],
    listServiceByArea: [],
    detailCategory: {},
    listArea: [],
    listServiceByStation: [],
    listServiceByHashTag: [],
    listStation: [],
    favoriteFlag: false,
  }),

  actions: {
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

    async getDetaiCategory(request) {
      await Api.requestServer
        .get(`${Urls.SERVICE_CATEGORY_DETAIL}/${request}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.detailCategory = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListCategoryByCategory(request) {
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.SEARCH_CATEGORY}/9?page=${request.page}&category_id=${request.category_id}&sort=${request.sort}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listServiceByCategory = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListCategoryByCategoryLogined(request) {
      const page = request.page;
      const category_id = request.category_id;
      const sort = request.sort;
      const buyer_id = request.buyer_id;
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.SEARCH_CATEGORY}/9?page=${page}&category_id=${category_id}&sort=${sort}&buyer_id=${buyer_id}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listServiceByCategory = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListCategoryByKeyword(request) {
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.SEARCH_KEYWORD}/9?page=${request.page}&keyword=${request.keyword}&sort=${request.sort}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listServiceByKeyword = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListCategoryByKeywordLogined(request) {
      const page = request.page;
      const keyword = request.keyword;
      const sort = request.sort;
      const buyer_id = request.buyer_id;
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.SEARCH_KEYWORD}/9?page=${page}&keyword=${keyword}&sort=${sort}&buyer_id=${buyer_id}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listServiceByKeyword = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListCategoryByArea(request) {
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.SEARCH_AREA}/9?page=${request.page}&area=${request.area}&sort=${request.sort}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listServiceByArea = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListCategoryByAreaLogined(request) {
      const page = request.page;
      const area = request.area;
      const sort = request.sort;
      const buyer_id = request.buyer_id;
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.SEARCH_AREA}/9?page=${page}&area=${area}&sort=${sort}&buyer_id=${buyer_id}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listServiceByArea = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListServiceByHashTag(request) {
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.SEARCH_TAG}/9?page=${request.page}&tag_name=${request.tag_name}&sort=${request.sort}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listServiceByHashTag = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListServiceByHashTagLogined(request) {
      const page = request.page;
      const tag_name = request.tag_name;
      const sort = request.sort;
      const buyer_id = request.buyer_id;
      await Api.requestServer
        .get(
          `${Urls.SERVICE}/${Urls.SEARCH_TAG}/9?page=${page}&tag_name=${tag_name}&sort=${sort}&buyer_id=${buyer_id}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listServiceByHashTag = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListCategoryByStation(request) {
      await Api.requestServer
        .get(`${Urls.EKISPERT_STATION}?name=${request}&limit=10`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listServiceByStation = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async registerFavoriteService(request) {
      await Api.requestServer
        .post(`${Urls.SERVICE}/${request.id}/${Urls.FAVORITE}`, request)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.successFavorite = true;
            this.messageFavorite = data.message;
            this.favoriteFlag = true;
          } else {
            this.errorFavorite = true;
            this.messageFavorite = data.message;
          }
        })
        .catch((error) => {
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

    async getListServiceByStation(request) {
      const page = request.page;
      const lat = request.lat;
      const lng = request.lng;
      const sort = request.sort;
      await Api.requestServer
        .get(
          `${Urls.EKISPERT_STATION_AREA}/9?page=${page}&lat=${lat}&lng=${lng}&sort=${sort}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            if (data.data !== undefined) {
              this.listStation = data.data;
            } else {
              this.listStation = [];
            }
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },

    async getListServiceByStationLogined(request) {
      const page = request.page;
      const lat = request.lat;
      const lng = request.lng;
      const sort = request.sort;
      const buyer_id = request.buyer_id;
      await Api.requestServer
        .get(
          `${Urls.EKISPERT_STATION_AREA}/9?page=${page}&lat=${lat}&lng=${lng}&sort=${sort}&buyer_id=${buyer_id}`
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            this.listStation = data.data;
          }
        })
        .catch((error) => {
          this.success = false;
        });
    },
  },
});
