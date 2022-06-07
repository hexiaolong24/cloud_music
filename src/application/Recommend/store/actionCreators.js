import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

// 同步action banner列表
export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data)
});

// 同步action 推荐歌单列表
export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
});

// 同步action 是否展示loading
export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
});

// 异步action 获取banner
export const getBannerList = () => {
  console.log(1111);
  return (dispatch) => {
    getBannerRequest().then(data => {
      const action = changeBannerList(data.banners);
      dispatch(action);
    }).catch(() => {
      console.log("轮播图数据传输错误");
    })
  }
};
export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest().then(data => {
      dispatch(changeRecommendList(data.result));
      dispatch(changeEnterLoading(false));//改变loading
    }).catch(() => {
      console.log("推荐歌单数据传输错误");
    });
  }
};