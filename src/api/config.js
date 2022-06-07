import axios from 'axios';

// node 服务
export const baseUrl = 'http://192.168.1.8:3000';

// axios的实例及拦截器配置
const axiosInstance = axios.create({
  baseURL: baseUrl
});

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, "网络错误");
  }
);

export {
  axiosInstance
};