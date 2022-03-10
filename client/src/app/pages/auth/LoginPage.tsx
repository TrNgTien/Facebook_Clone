import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Link } from "react-router-dom";
import CircleLoading from "../../components/loading-component/CircleLoading";
import "./styles/LoginPage.scss";
import { setCookie } from "../../utils/CookieUtil";

export default function LoginPage(props: any) {
  
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // const loginEnterAccept = (e: KeyboardEvent<HTMLInputElement>): void => {
  //   if (e.key === "Enter") {
  //     if (password === "tien" && userName === "tien") {
  //       setIsLoadingLogin(true);
  //       setTimeout(() => {
  //         setIsLoadingLogin(false);
  //         props.history.push("/feeds");
  //       }, 2000);
  //     } else {
  //       alert("Wrong username or password");
  //     }
  //   }
  // };
  const onPressLogin = (props: any): void => {
    if (password === "tien" && userName === "tien") {
      setIsLoadingLogin(true);
      setTimeout(() => {
        setIsLoadingLogin(false);
        props.history.push("/feeds");
      }, 2000);
    } else {
      alert("Wrong username or password");
    }
  };
  const successResponse = (response: any): void => {
    const { profileObj } = response;
    setIsLoadingLogin(true);
    setTimeout(() => {
      setIsLoadingLogin(false);
      setCookie("imageUrl", profileObj.imageUrl);
      setCookie("userName", profileObj.name);
      props.history.push("/feeds", profileObj);
    }, 2000);
  };

  return (
    <div className="login-page">
      {isLoadingLogin ? <CircleLoading /> : null}
      <div className="login-container">
        <div className="container-slogan">
          <p className="logo-title">facebook</p>
          <p className="slogan-content">
            Facebook helps you to connect and share with the people in your life.
          </p>  
        </div>
        <div className="wrapper-input">
          <form>
            
              <input
                type="text"
                id="userName"
                autoComplete="on"
                value={userName}
                onChange={onChangeUserName}
                placeholder="Email address or phone number"
                className="input__user-name"
              />
                <input
                  autoComplete="off"
                  id="password"
                  type="password"
                  value={password}
                  // onKeyDown={(e) => loginEnterAccept(e)}
                  onChange={onChangePassword}
                  placeholder="Password"
                  className="input__password"
                  size={8}
                />
          </form>
          <button className="button-login" onClick={() => onPressLogin(props)}>
            Log In
          </button>
          <p>Forgotten password?</p>
          <hr className="hr-login"/>
          <button className="button-register">
            <Link className="register-link__login" to="/register">
              Create New Account
            </Link>
          </button>
          
        </div>  
      </div>
    </div>
  );
}
