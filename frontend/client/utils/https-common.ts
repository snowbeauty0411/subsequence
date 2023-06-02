import axios from "axios";
import { Urls } from "../utils/urls";
import { Constants } from "../utils/constants";
import Cookies from "js-cookie";


const requestServer = axios.create({
    baseURL: Urls.BASE_URL_SERVER,
    timeout: 600000,
    headers: {
        "Content-type": "application/json",
    },
});

requestServer.interceptors.request.use(
    (config) => {
        let rememberLogin = localStorage.getItem("rememberLogin");
        let type = ""
        let href = window.location.href;
        if (href.includes("/admin")) {
            type = "ADMIN";
        } else {
            if (rememberLogin === 'true') {
                type = localStorage.getItem('type');
            } else {
                type = Cookies.get('type');
            }
        }

        let token = "";
        if (type) {
            if (type === "ADMIN") {
                token = localStorage.getItem("token_admin")
            } else {
                let rememberLogin = localStorage.getItem("rememberLogin");
                if (rememberLogin === 'true') {
                    token = localStorage.getItem("token_user");
                } else {
                    token = Cookies.get("token_user");
                }
            }
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete requestServer.defaults.headers.common.Authorization;
        }
        return config;
    },

    (error) => Promise.reject(error)
);

requestServer.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response);
                    
    if (response.data.code === 401) {
        if (window.location.pathname.includes('admin')) {
            localStorage.removeItem('token_admin');
            window.location.replace('/admin/login')
        } else {
            Cookies.remove("token_user");
            localStorage.removeItem("token_user");
            window.location.replace('/login')
        }
    } else {
        return response;
    }
    
  },async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error);
    
    return Promise.reject(error);
  });

const requestImage = axios.create({
    baseURL: Urls.BASE_URL_SERVER,
    timeout: 10000,
    headers: {
        "Content-type": "application/json",
    },
    responseType: "blob"
});

requestImage.interceptors.request.use(
    (config) => {
        let rememberLogin = localStorage.getItem("rememberLogin");
        let type = ""
        let href = window.location.href;
        if (href.includes("/admin")) {
            type = "ADMIN";
        } else {
            if (rememberLogin === 'true') {
                type = localStorage.getItem('type');
            } else {
                type = Cookies.get('type');
            }
        }

        let token = "";
        if (type) {
            if (type === "ADMIN") {
                token = localStorage.getItem("token_admin")
            } else {
                let rememberLogin = localStorage.getItem("rememberLogin");
                if (rememberLogin === 'true') {
                    token = localStorage.getItem("token_user");
                } else {
                    token = Cookies.get("token_user");
                }
            }
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete requestServer.defaults.headers.common.Authorization;
        }
        return config;
    },

    (error) => Promise.reject(error)
);

export const Api = {
    requestServer,
    requestImage
};
