# 查询页

从查询也开始，redux 管理 store 的方式发生了一些变化。index 页的 `reducer` 函数有些乱七八糟，一个 reducer 管理过个状态，这不好控制，在对数据做更改时需要对数据做拷贝操作，这是很繁杂的一件事情。  

在 query 以及之后的页面中，一个 reducer 只管理一个状态，各司其职，这样逻辑更加清晰。在 createStore 中对每一个状态进行初始化，在 action 和 reducer 中都是样板代码。  

## 实现思路

首先会解析 url，吧 url 中的参数存入 store，接着利用 url 参数发起网络请求，获得火车发车信息列表。顶部导航、车次列表逻辑性不强，渲染出来即可。

顶部的日期导航是一个公共组件，它主要是对 date（日期）这个状态做变更，设定范围是 20 天，也就是最远可以查询到 20 之后的数据。使用自定义的 hook 做了一点代码复用，它接受四个参数：  

- `dispatch` redux 的 dispatch 函数；
- `departDate` 出发日期，这是一个状态数据，初始是在 url 参数中获取的；
- `prevDate` 是一个 action creator，它可以派发 action，把 store 中的日期更新成它前一天的日期；
- `nextDate` 一个 action creator，可以派发 action，把 store 中的日期更新成它后一天的日期；  

这个 hook 内部会判断距离今天这个日期多少断定还可不可以向前或向后点击（两个布尔值）。最后返回向前、向后点击的回调函数和是否能向后、是否能向前点击的布尔变量。  

详细代码：  

```js
export default function useNav(dispatch, departDate, prevDate, nextDate){
    // 前一天、后一天的逻辑
    const isPrevDisable = getTodayFirstTime(departDate.time).time <= getTodayFirstTime().time;
    // 后一天是否禁用（20天时间）
    const isNextDisable = getTodayFirstTime(departDate.time).time - getTodayFirstTime().time > 20 * 86400 * 1000;
    const prev = useCallback(() => {
        if(isPrevDisable)   return;
        dispatch(prevDate());
    },[isPrevDisable,dispatch, prevDate]);
    const next = useCallback(() => {
        if(isNextDisable)   return;
        dispatch(nextDate());
    },[dispatch, isNextDisable, nextDate]);
    
    return {
        isNextDisable,
        isPrevDisable,
        prev,
        next
    };
}
```

## 筛选逻辑

底部的综合筛选模态框是这个页面最复杂的功能。尤其是最下面出发时间、到达时间那两个滑动条。  

### 思路

综合筛选只有在点击右上角的“确定”按钮后才会发起网络请求获取筛选数据。这就需要在组件内部先缓存筛选的条件数据，当点击确定后，把这些数据发给 store，更新状态。重置按钮比较容易实现，就是把缓存中的数据清空即可。  

缓存数据由两部分组成，一部分是按钮方式的类型选取，这些让以实现，使用了 `useReducer` 存储状态。下面的出发时间和到达时间则是使用了 `useState` 存储状态。  

这两个时间滑块由 `Slider` 组件实现，参数有缓存中的开始时间、结束时间状态和更新它们的 setState 函数。  

在 Slider 组件内部，两个滑块只能在 X 轴运动，并且左边的滑块不能滑到右边滑块的右侧，当两者相差两个小时时，会一起滑动，就像一个推着另一个做运动一样，而且它们不能超出滑动条范围。  

首先需要需要获取到滑动条的宽度，这就需要使用 `useRef` 获取 DOM 元素。在滑动滑块时就需要注册两个事件：`touchstart` 和 `touchmove`，鼠标滑动时记录 X 轴位置坐标，计算差值。差值是动态的，可以使用 `useRef` 进行保存。
