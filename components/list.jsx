/*
 * @fileOverview  小说分类列表
*/
//var React = require("react");
import React from "react";

class BookList extends React.Component{
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


module.exports = BookList;
