/**
 * @fileOverview 首页
 * @author subying
 * @description 首页执行模块
 */
import BookIndex from '../../../../components/index.jsx';
import '../../less/index.less';

const indexPad = {
    init(){
        ReactDOM.render(<BookIndex list={window.list} />,document.getElementById('indexCon'));
    }
};

indexPad.init();
