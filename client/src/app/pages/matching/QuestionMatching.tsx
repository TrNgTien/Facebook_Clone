import React, { useState, useEffect } from "react";
import NavigationBar from "../../components/sidebar-navigation/NavigationBar";
import { getCookie } from "../../utils/CookieUtil";
import "./styles/QuestionMatching.scss";
export default function QuestionMatching(props: any) {
  const userNameCookie = getCookie("userName");
  const imageUrlCookie = getCookie("imageUrl");
  const [counterTime, setCounterTime] = useState<any>(59);
  const answerList: string[] = ["1", "2", "3", "4"];
  const QuestionList = (answerList: string[]) => {
    return answerList.map((answers: string, index: number) => {
      return (
        <p className="question-box__answer-text" key={index} id={answers}>
          {answers}
        </p>
      );
    });
  };
  useEffect(() => {
    counterTime >= 0
      ? setTimeout(() => setCounterTime(counterTime - 1), 1000)
      : setCounterTime(59);
    return () => {
      clearTimeout(counterTime);
    };
  }, [counterTime]);
  return (
    <div className="question-matching__wrapper">
      <NavigationBar
        imageUrl={imageUrlCookie}
        name={userNameCookie}
        history={props.history}
      />
      <div className="question-zone">
        <h2 className="title-question__page">Question Matching</h2>
        <div className="question-box">
          <div className="question-box__container">
            <p className="question-box__counter">
              Next question in: &nbsp;
              {counterTime >= 0 && counterTime < 10
                ? `0:0 ${counterTime}`
                : `0: ${counterTime}`}
            </p>
            <h2 className="question-box__title">
              What is your favourte fruit ?
            </h2>
            <div>{QuestionList(answerList)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
