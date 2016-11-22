/*
 * @fileOverview  小说首页
*/
var React = require("react");

class BookIndex extends React.Component{
    constructor(){
        super();
        this.state={
            title: '',
            show: true
        };
    }

    hide(){
        this.setState({
            show: !this.state.show
        })
    }

    componentWillMount(){
    }

    render(){
        return(
            <div>
                <ul style={{"display":this.state.show?"block":"none"}}>
                    {
                        this.props.list.map((item,index)=>{
                            return(<li key={index}><a href={item.href}>{item.text}</a></li>)
                        })
                    }
                    
                </ul>
                {/* <a href="#" onClick={this.hide.bind(this)}>显示隐藏</a> */}
            </div>
        )
    }
}


module.exports = BookIndex;
