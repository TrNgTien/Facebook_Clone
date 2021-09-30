import React from "react";
import "./styles/NavigationBar.scss";
function NavigationBar() {
  return (
    <div className="wrapper__nav-bar">
      <div className="nav-bar__content">content nav</div>
      <div className="wrapper-btn">
        <i className="btn-nav">btn</i>
      </div>
    </div>
  );
}

export default NavigationBar;
