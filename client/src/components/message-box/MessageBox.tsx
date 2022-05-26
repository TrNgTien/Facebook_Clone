import React from "react";
import "./styles/MessageBox.scss";
const MessageBox = () => {
  return (
    <div className="mess-box">
      <input
        type="text"
        className="input-mess"
        placeholder="Type your message here..."
      />
      <button className="send-mess">Send</button>
    </div>
  );
};

export default MessageBox;
