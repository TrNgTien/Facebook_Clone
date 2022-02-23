import React from 'react'
import "./feed.scss";
import { AiOutlineHeart } from 'react-icons/ai';

const Feed = () => {
  return (
    <div className="container">
        <div className="container__author">
            <h4>Tran Ngoc Tien</h4>
        </div>
        <div className="container__content">
            <p>
                So after I did step 1.1|2 it was not working, then I found the above issue/solution. 
            </p>
            <img src="https://picjumbo.com/wp-content/uploads/woman-holding-an-american-flag-in-a-field-free-photo-1080x1620.jpg" alt="img" />
        </div>
        <div className="container__features">
            <div className="container__like">
                <AiOutlineHeart/>
            </div>
        </div>
    </div>
  )
}

export default Feed