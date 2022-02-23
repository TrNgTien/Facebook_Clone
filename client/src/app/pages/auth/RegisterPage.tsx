import React, { ChangeEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import CircleLoading from "../../components/loading-component/CircleLoading";
import GoogleButton from "../../components/google-button/GoogleButton";
import "./styles/RegisterPage.scss";

export default function RegisterPage(props: any) {
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const onChangeUserName = (
    e: ChangeEvent<{
      value: string;
    }>
  ) => {
    setUserName(e.target.value);
  };
  const onChangePassword = (
    e: ChangeEvent<{
      value: string;
    }>
  ) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (
    e: ChangeEvent<{
      value: string;
    }>
  ) => {
    setConfirmPassword(e.target.value);
  };
  const loginNavigate = ({ history }: any): void => {
    if (true) {
      // history.push("/generalChat");
    }
  };
  const successResponse = (response: any): void => {
    // const { profileObj } = response;
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      props.history.push("/");
    }, 2000);
  };
  const errorResponse = (response: any): void => {
    console.log("error", response);
  };
  const renderIcon = (showPassword: boolean) => {
    if (showPassword) return <AiFillEyeInvisible />;
    else return <AiFillEye />;
  };
  const renderIconConfirm = (showPassword: boolean) => {
    if (showPassword) return <AiFillEyeInvisible />;
    else return <AiFillEye />;
  };
  return (
    <div className="register-page">
      {isRegistering ? <CircleLoading /> : null}
      <h1>Matching</h1>
      <h2 className="register-page__authen-type">Sign Up</h2>
      <GoogleButton
        clientId={GOOGLE_API_KEY}
        accessType={"offline"}
        responseType={"code"}
        onSuccess={successResponse}
        onFailure={errorResponse}
        cookiePolicy={"single_host_origin"}
        authenType={"register"}
      />
      <div className="register-page__wrapper-input">
        <form>
          <div className="register-page__wrapper__user-name">
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
            <div className="register-page__wrapper-password">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                autoComplete="off"
                onChange={onChangePassword}
                placeholder="Your password..."
                className="input__password"
                size={8}
              />
              <i
                className="register-page__icon-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {renderIcon(showPassword)}
              </i>
            </div>
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="register-page__wrapper-password">
              <input
                id="confirm-password"
                autoComplete="off"
                type={showPasswordConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
                placeholder="Your confirm password..."
                className="input__password"
                size={8}
              />
              <i
                className="register-page__icon-password"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              >
                {renderIconConfirm(showPasswordConfirm)}
              </i>
            </div>
          </div>
        </form>
      </div>

      <button className="button-register" onClick={() => loginNavigate(props)}>
        Sign Up
      </button>

      <Link className="register-link__register" to="/">
        I've already have an account!
      </Link>
    </div>
  );
}
