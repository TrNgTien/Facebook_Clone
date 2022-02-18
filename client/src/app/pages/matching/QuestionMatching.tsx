import React from "react";
import NavigationBar from "../../components/sidebar-navigation/NavigationBar";
import { getCookie } from "../../utils/CookieUtil";
import "./styles/QuestionMatching.scss";
export default function QuestionMatching(props: any) {
  const userNameCookie = getCookie("userName");
  const imageUrlCookie = getCookie("imageUrl");

  return (
    <div className="question-matching__wrapper">
      <NavigationBar
        imageUrl={imageUrlCookie}
        name={userNameCookie}
        history={props.history}
      />
      <div className="question-zone">
        <h2 className="title-question">Question Matching</h2>
      </div>
    </div>
  );
}
