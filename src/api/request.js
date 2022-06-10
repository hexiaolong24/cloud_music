import { axiosInstance } from "./config";

// 获取banner列表
export const getBannerRequest = () => {
  return axiosInstance.get("/banner");
};

// 获取推荐歌单列表
export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized");
};

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

export const getSingerListRequest = (category, alpha, count) => {
  return axiosInstance.get(
    `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`
  );
};
