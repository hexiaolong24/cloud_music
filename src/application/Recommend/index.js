import React, { useEffect } from "react";
import Slider from "../../components/slider/";
import { connect } from "react-redux";
import { forceCheck } from "react-lazyload";
import * as actionTypes from "./store/actionCreators";
import RecommendList from "../../components/list/";
import Scroll from "../../baseUI/scroll/index";
import { Content } from "./style";
import Loading from "../../baseUI/loading/index";

function Recommend(props) {
  const { bannerList, recommendList, enterLoading } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
    // eslint-disable-next-line
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];
  return (
    <Content>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {<Loading show={enterLoading}></Loading>}
    </Content>
  );
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  // 不要再这里将数据toJS,不然每次diff比对props的时候都是不一样的引用，还是导致不必要的重渲染, 属于滥用immutable
  bannerList: state.getIn(["recommend", "bannerList"]),
  recommendList: state.getIn(["recommend", "recommendList"]),
  enterLoading: state.getIn(["recommend", "enterLoading"]), //简单数据类型不需要调用toJS
});
// 写法一  传递一个函数 返回一个对象 自己调用dispatch
// 映射dispatch到props上
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getBannerDataDispatch() {
//       dispatch(actionTypes.getBannerList());
//     },
//     getRecommendListDataDispatch() {
//       dispatch(actionTypes.getRecommendList());
//     },
//   }
// };
// 写法二 直接返回一个对象 一一对应需要的action即可 自动调用dispatch
const mapDispatchToProps = {
  getBannerDataDispatch: actionTypes.getBannerList,
  getRecommendListDataDispatch: actionTypes.getRecommendList,
};

// 将ui组件包装成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
