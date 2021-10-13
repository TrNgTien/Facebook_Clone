import React from "react";
import GoogleLogin from "react-google-login";
import "./styles/Login.scss";

interface GoogleLoginProps {
  clientId: any;
  buttonText: string;
  accessType: string;
  responseType: string;
  onSuccess: (response: any) => void;
  onFailure: (response: any) => void;
  cookiePolicy: string;
}
const GoogleLoginButton = (props: GoogleLoginProps) => {
  return (
    <div className="wrapper-btn">
      <GoogleLogin
      className="btn-google"
        clientId={props.clientId}
        buttonText={props.buttonText}
        onSuccess={props.onSuccess}
        onFailure={props.onFailure}
        cookiePolicy={props.cookiePolicy}
      />
    </div>
  );
};
const loginNavigate = ({ history }: any): void => {
  history.push("/login");
};
function Login(props: any) {
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const successResponse = (response: any): void => {
    const { profileObj } = response;
    console.log("sucess", response);
  };
  const errorResponse = (response: any): void => {
    console.log("error", response);
  };
  return (
    <div className="login-page">
      <h1>Matching</h1>
      {GoogleLoginButton({
        clientId: GOOGLE_API_KEY,
        buttonText: "Đăng nhập với Google",
        accessType: "offline",
        responseType: "code",
        onSuccess: successResponse,
        onFailure: errorResponse,
        cookiePolicy: "single_host_origin",
      })}

      <div className="wrapper-input">
        <input
          type="text"
          placeholder="Your user name..."
          className="input__user-name"
        />
        <input
          type="password"
          placeholder="Your password..."
          className="input__password"
        />
      </div>

      <button className="button-login" onClick={() => loginNavigate(props)}>
        Login
      </button>
    </div>
  );
}

export default Login;
