

import "./css/watchlist-stock.webflow.css"
import React from 'react';
// import pen from './images/pen';


class WatchListComp extends React.Component{




    render(){
        return(

<div  onClick={ () => { this.props.changeFocus(this.props.number) } } className="list active_list_in_line">
    <div className="text_list">TURNOVER OSEBX</div>
    <div className="text_extra">Last seen: 17/08/18</div>
    <a href="#" className="button_remove_list w-button"></a><a href="#"
                                                               className="button_rename_list w-button"></a>
</div>


        )}
}
export default WatchListComp;