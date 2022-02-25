import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import GoogleButton from "../../components/google-button/GoogleButton";
import CircleLoading from "../../components/loading-component/CircleLoading";
import "./styles/LoginPage.scss";
import { setCookie } from "../../utils/CookieUtil";

export default function LoginPage(props: any) {
  const GOOGLE_API_KEY :  string | undefined  = (process.env.REACT_APP_GOOGLE_KEY_API as string);
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginEnterAccept = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      if (password === "tien" && userName === "tien") {
        setIsLoadingLogin(true);
        setTimeout(() => {
          setIsLoadingLogin(false);
          props.history.push("/feeds");
        }, 2000);
      } else {
        alert("Wrong username or password");
      }
    }
  };
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
  const errorResponse = (response: any): void => {
    console.log("error", response);
  };
  const renderIcon = (showPassword: boolean) => {
    if (showPassword) return <AiFillEyeInvisible />;
    else return <AiFillEye />;
  };
  return (
    <div className="login-page">
      {isLoadingLogin ? <CircleLoading /> : null}
      <h1>Matching</h1>
      <h2 className="authen-type">Login</h2>
      <GoogleButton
        clientId={GOOGLE_API_KEY}
        accessType={"offline"}
        responseType={"code"}
        onSuccess={successResponse}
        onFailure={errorResponse}
        cookiePolicy={"single_host_origin"}
        authenType={"login"}
      />

      <div className="wrapper-input">
        <form>
          <div className="wrapper__user-name">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              id="userName"
              autoComplete="on"
              value={userName}
              onChange={onChangeUserName}
              placeholder="Your user name..."
              className="input__user-name"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="wrapper-password">
              <input
                autoComplete="off"
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onKeyDown={(e) => loginEnterAccept(e)}
                onChange={onChangePassword}
                placeholder="Your password..."
                className="input__password"
                size={8}
              />
              <i
                className="icon-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {renderIcon(showPassword)}
              </i>
            </div>
          </div>
        </form>
      </div>

      <button className="button-login" onClick={() => onPressLogin(props)}>
        Login
      </button>

      <Link className="register-link__login" to="/register">
        Don't have account? Sign up!
      </Link>
    </div>
  );
}
