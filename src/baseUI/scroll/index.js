import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from 'styled-components';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
// 用forwardRef方法包住整个组件
const Scroll = forwardRef((props, ref) => {
  // bscroll 实例
  const [bScroll, setBScroll] = useState();
  // 外层dom
  const scrollContaninerRef = useRef();

  const { direction, click, refresh,  bounceTop, bounceBottom } = props;

  const { pullUp, pullDown, onScroll } = props;

  useEffect(() => {
    // init 实例
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    // 赋值实例
    setBScroll(scroll);
    // 组件销毁时将实例置为null
    return () => {
      setBScroll(null);
    }
    // eslint-disable-next-line
    // [] 只执行一次 模拟componentDidMount
  }, []);

  useEffect(() => {
    // 绑定onscroll 监听
    if(!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    })
    // 解绑
    return () => {
      bScroll.off('scroll');
    }
  }, [onScroll, bScroll]);

  useEffect(() => {
    if(!bScroll || !pullUp) return;
    bScroll.on('scrollEnd', () => {
      //判断是否滑动到了底部
      if(bScroll.y <= bScroll.maxScrollY + 100){
        pullUp();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    }
  }, [pullUp, bScroll]);

  useEffect(() => {
    if(!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (pos) => {
      //判断用户的下拉动作
      if(pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off('touchEnd');
    }
  }, [pullDown, bScroll]);

  // 每次重新渲染都刷新一下 防止不能滑动
  useEffect(() => {
    if(refresh && bScroll){
      bScroll.refresh();
    }
  });
  // 返回一个对象 提供给父组件需要调用的方法
  useImperativeHandle(ref, () => ({
    // 刷新
    refresh() {
      if(bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    // 获取实例
    getBScroll() {
      if(bScroll) {
        return bScroll;
      }
    }
  }));


  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
    </ScrollContainer>
  );
})

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,//是否支持向上吸顶
  bounceBottom: PropTypes.bool//是否支持向上吸顶
};

export default Scroll;
