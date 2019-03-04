import React,{Component} from 'react';

export default class Header extends Component{
    render(){
        return(
		<div className="header">
        <div className="header-top">
            <div className="container">
                {/* <div className="lang_list">
                    <select tabindex="4" className="dropdown1">
                        <option value="" className="label" value="">En</option>
                        <option value="1">English</option>
                        <option value="2">French</option>
                        <option value="3">German</option>
                    </select>
                </div> */}
                <div className="top-right">
                    <ul>
                        <li className="text"><a href="javascript:void(0)">+92 302 2881405</a></li>
                        <li>
                            <div className="cart box_1">
                                <a href="checkout.html">
                                    <span className="simpleCart_total"> info@pinksaltworks.com </span>
                                </a>
                                <div className="clearfix"> </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="clearfix"></div>
            </div>
        </div>
    </div>
        )
    }
}