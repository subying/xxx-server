/**
 * @fileOverview 首页
 * @author subying
 * @description 首页执行模块
 */
import BookIndex from "../../../../components/index.jsx";
import "../../less/index.less";

var indexPad = {
    init(){
        ReactDOM.render(<BookIndex list={list} />,document.getElementById('indexCon'));
    }
};

indexPad.init();