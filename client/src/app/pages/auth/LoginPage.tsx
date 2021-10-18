import React, { ChangeEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import GoogleButton from "../../components/google-button/GoogleButton";
import "./styles/LoginPage.scss";

export default function LoginPage(props: any) {
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profileInfo, setProfileInfo] = useState<any>({});
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginNavigate = ({ history }: any): void => {
    if (password === "tien" && userName === "tien") {
      setTimeout(() => {
        history.push("/profile");
      }, 2000);
    } else {
      alert("Wrong username or password");
    }
  };
  const successResponse = (response: any): void => {
    const { profileObj } = response;
    setProfileInfo(profileObj);
    setTimeout(() => {
      props.history.push("/profile", profileObj);
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
        <div className="wrapper__user-name">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
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
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
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
      </div>

      <button className="button-login" onClick={() => loginNavigate(props)}>
        Login
      </button>

      <Link className="register-link" to="/register">
        Don't have account? Sign up!
      </Link>
    </div>
  );
}
interface GoogleLoginProps {
  clientId: any;
  buttonText: string;
  accessType: string;
  responseType: string;
  onSuccess: (response: any) => void;
  onFailure: (response: any) => void;
  cookiePolicy: string;
}
