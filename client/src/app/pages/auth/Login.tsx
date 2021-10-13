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
  cookiePolicy: any;
}
const GoogleLoginButton = (props: GoogleLoginProps) => {
  return (
    <GoogleLogin
      clientId={props.clientId}
      buttonText={props.buttonText}
      onSuccess={props.onSuccess}
      onFailure={props.onFailure}
      cookiePolicy={props.cookiePolicy}
    />
  );
};
function Login() {
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

      <input type="text" className="input-field" />
      <input type="password" className="input-field" />
    </div>
  );
}

export default Login;
