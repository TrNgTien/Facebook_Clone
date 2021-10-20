import React, { useState } from "react";
import "./styles/GeneralChat.scss";
const GeneralChat = () => {
  const [counter, setCounter] = useState<number>(0);
  return (
    <div>
      <div style={{ display: "flex", marginLeft: "45%", marginTop: "10%" }}>
        <button
          style={{
            marginRight: "10px",
            width: "100px",
            fontSize: "2rem",
            height: "50px",
          }}
          onClick={() => setCounter(counter - 1)}
        >
          -
        </button>
        <p style={{ marginRight: "10px", fontSize: "2rem" }}>{counter}</p>
        <button
          style={{ width: "100px", height: "50px", fontSize: "2rem" }}
          onClick={() => setCounter(counter + 1)}
        >
          +
        </button>
      </div>
      <p style={{ marginLeft: "50%", marginTop: "10%", fontSize: "2rem" }}>
        State {counter}
      </p>
    </div>
  );
};

export default GeneralChat;
