/*
 * @fileOverview  小说首页
*/
var React = require("react");

class BookIndex extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <ul>
                {
                    this.props.list.map((item,index)=>{
                        return(<li key={index}><a href={item.href}>{item.text}</a></li>)
                    })
                }
            </ul>
        )
    }
}


module.exports = BookIndex;
