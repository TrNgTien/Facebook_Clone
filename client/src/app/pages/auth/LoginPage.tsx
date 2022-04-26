import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import CircleLoading from "../../components/loading-component/CircleLoading";
import "./styles/LoginPage.scss";
import { LoginReq } from "../../services/AuthService";
import internal from "stream";

export default function LoginPage(props: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFocusPass, setIsFocusPass] = useState<boolean>(false);
  const [isFocusUser, setIsFocusUser] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  interface MyToken {
    iat: number;
    id: string;
    role: number;
  }
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const RenderIcon = ({ showPassword }: any) => {
    if (!showPassword) return <AiFillEyeInvisible />;
    else return <AiFillEye />;
  };

  const loginEnterAccept = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      let userData = {
        userName: userName,
        password: password,
      };
      LoginReq(userData)
        .then((res: any) => {
          const { token } = res;
          localStorage.setItem("token", token);
          const token_decoded = jwt_decode<MyToken>(token);

          setIsLoadingLogin(true);
          setTimeout(() => {
            setIsLoadingLogin(false);
            navigate("feeds", {
              state: {
                id: token_decoded.id,
                iat: token_decoded.iat,
                role: token_decoded.role,
              },
            });
          }, 2000);
        })
        .catch((err: any) => {
          alert(`${err}`);
        });
    }
  };
  const onPressLogin = (): void => {
    let userData = {
      userName: userName,
      password: password,
    };
    LoginReq(userData)
      .then((res: any) => {
        const { token } = res;
        localStorage.setItem("token", token);
        setIsLoadingLogin(true);
        setTimeout(() => {
          setIsLoadingLogin(false);
          navigate("feeds", { state: { userData } });
        }, 2000);
      })
      .catch((err: any) => {
        alert(`${err}`);
      });
  };

  return (
    <div className='login-page'>
      {isLoadingLogin ? <CircleLoading /> : null}
      <div className='login-container'>
        <div className='container-slogan'>
          <p className='logo-title'>facebook</p>
          <p className='slogan-content'>
            Facebook helps you to connect and share with the people in your life.&nbsp;
            <em style={{ color: "dodgerblue" }}>
              But Clone Team helps you improve your skills.
            </em>
          </p>
        </div>
        <div className='wrapper-input'>
          <form className='input-form'>
            <input
              className={
                isFocusUser ? "login-input__user-name--clicked" : "login-input__user-name"
              }
              placeholder='User Account'
              value={userName}
              type='text'
              autoComplete='on'
              onFocus={() => setIsFocusUser(true)}
              onBlur={() => setIsFocusUser(false)}
              onChange={onChangeUserName}
            />
            <div className={isFocusPass ? "wrapper-pass--clicked " : "wrapper-pass"}>
              <input
                className={
                  isFocusPass ? "login-input__password--clicked" : "login-input__password"
                }
                autoComplete='off'
                type={showPassword ? "text" : "password"}
                value={password}
                onKeyDown={(e) => loginEnterAccept(e)}
                onBlur={() => setIsFocusPass(false)}
                onFocus={() => setIsFocusPass(true)}
                onChange={onChangePassword}
                placeholder='Password'
                size={6}
              />
              {password.length > 0 ? (
                <i
                  className='icon-password--hidden'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <RenderIcon showPassword={showPassword} />
                </i>
              ) : null}
            </div>
          </form>
          <div className='wrapper-button'>
            <button className='button-login' onClick={() => onPressLogin()}>
              Log In
            </button>
            <div className='hr-login'></div>
            <div className='button-register'>
              <Link
                className='register-link__login'
                to='/register'
                state={{ backgroundLocation: location }}
              >
                <button className='button-register'>Create New Account</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
