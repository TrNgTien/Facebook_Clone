import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

function NotFound() {
  return (
    <div className='notfound-container'>
      <img
        className='notfound-img'
        src='https://images.ui8.net/uploads/6_1632688928415.png'
        alt=''
      />
      <div className='container-content'>
        <h1 className='notfound-title'>Oops</h1>
        <h2 className='notfound-content'>404, page not found</h2>
        <Link className='link-homepage' to={"/"}>
          &#60; Return to homepage.
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
