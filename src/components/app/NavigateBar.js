/**
 * Contributor: Tien 24th September
 * Main Function: Render Navigate bar 
 */

//Packages
import React from "react";

//Styles
import "../styles/NavigateBarStyles.css";


const NavigateBar = (props) =>{
    return(
        console.log("props",props),
            <div className="nav-bar">
                <img
                    className="icon"
                    alt=""
                    src={require("../../assets/images/fb-icon.png")}
                />
                <input
                className="input"
                placeholder="Tìm Kiếm trên Facebook.."
                type="text"
                />
                <img
                    className="icon home"
                    alt=""
                    src={require("../../assets/images/home.png")}
                />
                <img
                    className="icon home"
                    alt=""
                    src={require("../../assets/images/friends.png")}
                />
                <img
                    className="icon home"
                    alt=""
                    src={require("../../assets/images/watch-icon.png")}
                    onClick={()=> props.history.push({pathname:"/watchpage"})}
                />
                <img
                    className="icon home"
                    alt=""
                    src={require("../../assets/images/market.png")}
                />
                <img
                    className="icon home"
                    alt=""
                    src={require("../../assets/images/group.png")}
                />
                <img
                    className="icon-r"
                    alt=""
                    src={require("../../assets/images/cb1575de43e5bcbbe5f4.jpg")}
               />
                 <i class="large material-icons">add</i>
                
            </div>

    );
}
export default NavigateBar;

