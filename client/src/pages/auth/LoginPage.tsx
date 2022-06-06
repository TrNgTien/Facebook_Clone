import { KeyboardEvent, useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CircleLoading from "@components/common/loading-delay/CircleLoading";
import { LoginReq } from "@services/AuthService";
import { useAppDispatch } from "@hooks/useStore";
import { setLoginSuccess } from "@slices/AuthenSlice";
import { IShowPass } from "@constants/InterfaceModel";
import { setLocalStorage } from "@utils/LocalStorageUtil";
import "./styles/LoginPage.scss";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFocusPass, setIsFocusPass] = useState<boolean>(false);
  const [isFocusUser, setIsFocusUser] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === `/`) {
      document.title = `Facebook Clone`;
    }
  }, [pathname]);
  const RenderIcon = ({ showPassword }: IShowPass) => {
    if (!showPassword) return <AiFillEyeInvisible />;
    else return <AiFillEye />;
  };

  const loginEnterAccept = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsLoadingLogin(true);
      let userData = {
        userName: userName,
        password: password,
      };
      await LoginReq(userData)
        .then((res) => {
          setLocalStorage("token", res.data.dataUser.token);
          setLocalStorage("refreshToken", res.data.dataUser.refreshToken);
          dispatch(setLoginSuccess(res.data.dataUser));
          setIsLoadingLogin(false);
          navigate("/feeds");
        })
        .catch(() => {
          setIsLoadingLogin(false);
          alert("Wrong username or password!");
        });
    }
  };
  const onPressLogin = async () => {
    setIsLoadingLogin(true);
    let userData = {
      userName: userName,
      password: password,
    };
    await LoginReq(userData)
      .then((res) => {
        setLocalStorage("token", res.data.dataUser.token);
        setLocalStorage("refreshToken", res.data.dataUser.refreshToken);
        dispatch(setLoginSuccess(res.data.dataUser));
        setIsLoadingLogin(false);
        navigate("/feeds");
      })
      .catch(() => {
        setIsLoadingLogin(false);
        alert("Wrong username or password!");
      });
  };

  return (
    <div className='login-page'>
      {isLoadingLogin && <CircleLoading />}
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
              onChange={(e) => setUserName(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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