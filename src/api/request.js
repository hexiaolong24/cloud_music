import { axiosInstance } from "./config";

// 获取banner列表
export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
}

// 获取推荐歌单列表
export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
}