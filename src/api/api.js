// @Time  : 2023/06/06 10:38:02
// @Author: wy
import axios from "axios";

axios.defaults.xsrfHeaderName = 'x-csrftoken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true

const apiClient = axios.create(
    {
        baseURL: 'http://127.0.0.1:8000'
    }
)
// 请求拦截器
apiClient.interceptors.request.use(
    config => {

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
apiClient.interceptors.response.use(
    response => {
        // 在响应返回之前的处理，例如解析响应数据等
        return response.data;
    },
    error => {
        // 处理响应错误
        return Promise.reject(error);
    }
);


const apiClientA = axios.create(
    {
        baseURL: 'http://127.0.0.1:8001'
    }
)
// 请求拦截器
apiClientA.interceptors.request.use(
    config => {

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
apiClientA.interceptors.response.use(
    response => {
        // 在响应返回之前的处理，例如解析响应数据等
        return response.data;
    },
    error => {
        // 处理响应错误
        return Promise.reject(error);
    }
);

export default {
    // GET 请求示例
    get(url, params) {
        return apiClient.get(url, { params });
    },

    // POST 请求示例
    post(url, data) {
        return apiClient.post(url, data);
    },
    // GET 请求示例
    getA(url, params) {
        return apiClientA.get(url, { params });
    },

    // POST 请求示例
    postA(url, data) {
        return apiClientA.post(url, data);
    },
}
