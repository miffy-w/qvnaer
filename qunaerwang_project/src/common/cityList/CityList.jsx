import React,{useState,useCallback,useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './CityList.css';
import { actions } from '../../index/store/actions';

// 这里引入工具函数，为了在输入框输入内容时防抖
import { debounce } from '../tools/timeTools';

// 顶部搜索部分 ***************************************************************************>
function CitySearch(props){
    const { backPrevPage, searchIptVal, clearSearchVal } = props;

    return (
        <div className="topWrapper">
            <i onClick={() => backPrevPage(false)} className="iconfont back">&#xeb99;</i>
            <div className="searchWrapper">
                <i className="iconfont search">&#xe6de;</i>
                <input
                    id="citySearchIpt"
                    onInput={(e) => searchIptVal(e.target.value)}
                    type="text"
                    placeholder="城市、车站的中文或拼音"
                />
                {/* previousSibling: 获取到上一个兄弟节点 */}
                <i onClick={(e) => clearSearchVal(e.target.previousSibling) } className="iconfont delete">&#xe606;</i>
            </div>
        </div>
    );
}
CitySearch.propTypes = {
    backPrevPage: PropTypes.func,
    searchIptVal: PropTypes.func,
    clearSearchVal: PropTypes.func
}

// 搜索提示列表 ***********************************************************************>
function SearchList(props){
    const { searchList, selectorCity } = props;
    return (
        <ul className="searchListWrapper">
            {
                searchList.length ? searchList.map(
                    item => <li 
                        onClick={(e) => selectorCity(item.key) }
                        key={item.key} 
                        className="search-item"
                    >{item.display}</li>
                ) : ''
            }
        </ul>
    );
}
SearchList.propTypes = {
    searchList: PropTypes.array,
    selectorCity: PropTypes.func
}

// 侧边字母组件 ***********************************************************************>
function SideAlphabetBar(props){
    const { comeAlphaView } = props;

    var codeNum = 65,arr = [];
    for(let i = 0;i < 26;i ++){
        // fromCharCode 方法会找到 ASCII 码序号对应的字符（65 对应 大写字母A）
        arr.push(String.fromCharCode(codeNum ++));
    }

    arr.unshift("热门");

    return arr.map(item => {
        return (
            <li onClick={(e) => comeAlphaView(e.target.textContent)} key={item} className="alphabet-bar">{item}</li>
        );
    })
}
SideAlphabetBar.propTypes = {
    comeAlphaView: PropTypes.func
}

// ************************ 提示选择的是侧边字母表中的哪一个字母 *************************>
function RemainLetter(props) {
    const { letter } = props;
    return (
        <div className={letter ? "remain-letter" : "remain-letter-hidden"}>{ letter }</div>
    );
}
RemainLetter.propTypes = {
    letter: PropTypes.string
}

// 热门城市 ***************************************************************************>
function HotCity(props){
    const { name, selectorCity } = props;
    return (
        <li onClick={() => selectorCity(name) } className="hot-city">{name}</li>
    );
}
HotCity.propTypes = {
    name: PropTypes.string,
    selectorCity: PropTypes.func,
}

// 热门城市外层 ************************************************************************>
function HotCityWrap(props){

    const { hotCitys, selectorCity } = props;

    const renderHotCitys = useCallback(function (array){
        return array.map(item => {
            let { name } = item;
            return (<HotCity selectorCity={selectorCity} key={name} name={name} />);
        });
    },[selectorCity]);

    return (
        <ul className="hotCitysWrapper" data-alphabet="热门">
            {
                hotCitys.length !== 0 ? renderHotCitys(hotCitys) : ''
            }
        </ul>
    );
}
HotCityWrap.propTypes = {
    hotCitys: PropTypes.array,
    selectorCity: PropTypes.func
}

// **************************** 渲染每个字母对应城市的列表外壳 *****************************>
function renderCitysWrapper(array,selectorCity){
    return array.map(item => {
        return (
            <ul key={item.title} className="list-wrapper-ul" data-alphabet={item.title}>
                {
                    item.citys ? renderCityItem(item.citys,selectorCity) : ''
                }
            </ul>
        );
    })
}
// **************************** 渲染每个字母对应的城市 *****************************>
function renderCityItem(citys,selectorCity){
    return citys.map(item => {
        return <li 
            onClick={() => selectorCity(item.name)}
            key={ item.name }
            className="city-item"
        >{ item.name }</li>
    });
}

// **************************** 城市列表组件容器组件 *****************************>
function ListWrapper (props){
    const { cityList, selectorCity } = props;
    return (
        <div className="list-wrapper">
            {
                cityList.length ? renderCitysWrapper(cityList, selectorCity) : <div className="loading">Loading...</div>
            }
        </div>
    );
}
ListWrapper.propTypes = {
    cityList: PropTypes.array,
    selectorCity: PropTypes.func
}

// 最外层的容器 ***************************************************************************>
function CityList(props) {
    // 声明一个 state，用于存放点中的字母，点中后，会跳到相应的城市列表
    let [letter,setLetter] = useState('');

    // 这个 state 存入搜索框中的值
    let [searchVal,setSearchVal] = useState('');
    // 这个 state 存入异步获取到的搜索结果
    let [searchList,setSearchList] = useState([]);

    const { dispatch, hotCitys, cityList, fromOrTo, from, to } = props;

    // 得到索搜的值，然后进行 AJAX 请求 ********************************************************>
    const debounceSearchIpt = useCallback((searchVal) => {
        var newVal = searchVal.replace(/\s*/g,'');
        setSearchVal(newVal);
        if(newVal){
            fetch(`/queryCity.json?keyword=${newVal}`)
            .then(res => res.json()).then(data => {
                setSearchList(data.dataMap.result);
            })
        }
    },[]);

    // 因为 React 中的时间对象是封装后的，使用防抖应注意
    const searchIptVal = debounce(debounceSearchIpt);

    // 这个方法用于顶部搜索组件的清空搜索内容部分
    const clearSearchVal = useCallback((target) => {
        setSearchVal('');
        // 清空输入框内容并自动聚焦
        target.value = '';
        target.focus();
    },[]);

    // 该方法用来展示选好的城市
    const selectorCity = useCallback((name) => {
        if(fromOrTo){
            dispatch(actions.exchangeCity(to,name));
            sessionStorage.setItem("city-party",JSON.stringify({
                from: name,
                to: to,
            }));
        }else{
            dispatch(actions.exchangeCity(name,from));
            sessionStorage.setItem("city-party", JSON.stringify({
                from: from,
                to: name,
            }));
        }
        // 选好后 清空搜索空中的值：
        if(searchVal){
            setSearchVal('');
            document.querySelector('#citySearchIpt').value = '';
        }
    }, [dispatch, fromOrTo, from, to, searchVal]);

    // 这个方法会返回到程序的上一页
    const backPrevPage = useCallback(function (bool) {
        dispatch(actions.backPrevPage(bool));
        if (searchVal) {        // 选好后 清空搜索空中的值：
            setSearchVal('');
            document.querySelector('#citySearchIpt').value = '';
        }
    }, [dispatch,searchVal]);

    // 该方法用来让当前的元素滚动到浏览器窗口的可视区域内
    const comeAlphaView = useCallback(function(value) {
        // scrollIntoView 这个方法会让当前的元素滚动到浏览器窗口的可视区域内
        // true 表示 元素的顶端将和其所在滚动区的可视区域的顶端对齐；
        // false 表示 元素的底端将和其所在滚动区的可视区域的底端对齐；
        setLetter(value);
        document.querySelector(`[data-alphabet='${value}']`).scrollIntoView(true);
        setTimeout(() => {
            setLetter('');      // 显示一段时间后再隐藏
        },500);
    },[]);

    // 发起 ajax 请求，渲染城市列表
    useEffect(() => {
        const listData = localStorage.getItem('city_list');
        const hotData = localStorage.getItem('hot_city');
        if(!listData || !hotData || listData === '[]' || hotData === '[]'){
            // 本地存储中没有再去进行异步请求
            dispatch(actions.getCityList());
        }else{
            // 有的话就直接订阅
            dispatch(actions.getCitysData(JSON.parse(listData),JSON.parse(hotData)));
        }
    },[dispatch]);

    useEffect(() => {
        // 两个数据一有变动就重新设置缓存数据
        localStorage.setItem('city_list',JSON.stringify(cityList));
        localStorage.setItem('hot_city',JSON.stringify(hotCitys));
    },[cityList,hotCitys]);

    return (
        <div className="cityListWrapper">
            <CitySearch
                clearSearchVal={clearSearchVal}
                searchIptVal={searchIptVal}
                backPrevPage={ backPrevPage } 
            />

            <div className={searchVal ? "searchList-show" : "searchList-hidden"}>
                {/* 判断输入的值是否有效，有效就渲染 使用 CSS 做判断是为了避免多次重新渲染 */}
                <SearchList selectorCity={selectorCity} searchList={searchList} />
            </div>
            
            {/* 判断搜索框内容是否为空，不为空时 就隐藏掉搜索框下面的组件 */}
            <div className={searchVal ? 'dataList-hidden' : 'dataList-show'}>
                <div className="colorWrapper">
                    <HotCityWrap selectorCity={selectorCity} hotCitys={hotCitys} />
                </div>
                <ListWrapper cityList={cityList} selectorCity={selectorCity} />
                <ul className="side-bar-wrapper">
                    <SideAlphabetBar comeAlphaView={comeAlphaView} />
                </ul>
                <RemainLetter letter={letter} />
            </div>
            
        </div>
    )
}


// ******************************* Redux props 部分 ***************************************>
const mapStateToProps = (state) => ({
    hotCitys: state.cityListReducer.hotCitys,
    cityList: state.cityListReducer.cityList,

    // 这里是为了确认是点击的哪一方的选择城市
    fromOrTo: state.stationReducer.fromOrTo,
    from: state.stationReducer.from,
    to: state.stationReducer.to
});

const mapDispatchToPorps = (dispatch) => ({
    dispatch
});

export default connect(mapStateToProps,mapDispatchToPorps)(CityList);
