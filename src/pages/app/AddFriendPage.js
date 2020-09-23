/**
 * Contributor: Nhân
 * Day:21/9/2020
 * Main function: render Add friend page in Fb screen
 */

//Packages
import React from "react";


//Styles
import "../styles/AddFriendStyles.css";

const AddFriendPage = ()=>{
    return(
        <div className="page">
            <div className="nav-bar">
                <img
                    className="Fb"
                    alt=""
                    src={require("../../assets/images/Facebook logo.png")}
                />
                
                <input
                    className="input"
                    type="text"
                    placeholder="Tìm kiếm trên Fb..."
                />
                <img
                    className="Home"
                    alt=""
                    src={require("../../assets/images/Home icon.png")}
                />
                <img
                    className="Friend"
                    alt=""
                    src={require("../../assets/images/Friends icon.png")}
                />

            </div>
        </div>

    );
}
export default AddFriendPage;