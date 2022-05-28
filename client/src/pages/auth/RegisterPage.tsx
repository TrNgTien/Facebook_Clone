import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircleLoading from "../../components/common/loading-component/CircleLoading";
import "./styles/RegisterPage.scss";
import { dates, months, years } from "./DateModels";
import { RegisterReq } from "../../services/AuthService";

export default function RegisterPage(props: any) {
  let navigate = useNavigate();
  const initial_form = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    day: "1",
    month: "1",
    year: "2022",
    gender: "",
  };
  const IMG_ICON_CLOSE = "https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png";
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [form, setForm] = useState<any>(initial_form);

  const onChangeForm = (e: ChangeEvent<any>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const finishSignUp = (e: any): void => {
    e.preventDefault();
    if (
      form.firstName === "" ||
      form.lastName === "" ||
      form.userName === "" ||
      form.password === "" ||
      form.gender === ""
    ) {
      console.log("Please fill all the infomation.");
      return;
    }

    RegisterReq(form)
      .then((res: any) => {
        setIsRegistering(true);
        setTimeout(() => {
          setIsRegistering(false);
          navigate(-1);
        }, 2000);
      })
      .catch((err: any) => {
        alert(`${err}`);
      });
  };

  function cancelSignUp() {
    navigate(-1);
  }
  return (
    <div className='register-page'>
      {isRegistering ? <CircleLoading /> : null}
      <div className='container-form'>
        <form onSubmit={finishSignUp}>
          <div className='register-form__header'>
            <h1 className='title-signup'>Sign Up</h1>
            <p className='register-page__authen-slogan'>It's quick and easy</p>
          </div>
          <img
            className='close-btn-img'
            src={IMG_ICON_CLOSE}
            alt=''
            onClick={() => cancelSignUp()}
          ></img>
          <div className='register-hr'></div>
          <div className='register-page__wrapper-input'>
            <div className='register-page__wrapper__name'>
              <input
                type='text'
                name='firstName'
                className='input__firstname'
                placeholder='First name'
                onChange={onChangeForm}
              />

              <input
                type='text'
                name='lastName'
                className='input__surname'
                placeholder='Surname'
                onChange={onChangeForm}
              />
            </div>
            <div className='register-page__wrapper__username'>
              <input
                type='text'
                id='userName'
                name='userName'
                onChange={onChangeForm}
                placeholder='Your Account'
                className='register-input__username'
              />
            </div>
            <div className='register-page__wrapper-password'>
              <input
                id='password'
                name='password'
                type={showPassword ? "text" : "password"}
                autoComplete='off'
                onChange={onChangeForm}
                placeholder='New password'
                className='register-input__password'
                size={8}
              />
            </div>
            <div className='register-page__wrapper-date-of-birth'>
              <label htmlFor='date-select' className='label-container'>
                Date of birth:
              </label>
              <div className='date-selections'>
                <select name='day' className='date-selection' onChange={onChangeForm}>
                  {dates.map((date, index) => (
                    <option value={date} key={date}>
                      {date}
                    </option>
                  ))}
                </select>
                <select
                  name='month'
                  className='date-selection date-selection--months'
                  onChange={onChangeForm}
                >
                  {months.map((month, index) => (
                    <option value={months.indexOf(month) + 1} key={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select name='year' className='date-selection' onChange={onChangeForm}>
                  {years.map((year, index) => (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='register-page__wrapper-gender'>
              <label htmlFor='date-select' className='label-container'>
                Gender:
              </label>
              <div className='gender-selections'>
                <div className='gender-selection'>
                  <label htmlFor='Female' className='gender-label'>
                    Female
                  </label>
                  <input
                    type='radio'
                    id='Female'
                    name='gender'
                    value='female'
                    className='radio-button__gender'
                    onChange={onChangeForm}
                  />
                </div>

                <div className='gender-selection gender-selection--male'>
                  <label htmlFor='Male' className='gender-label'>
                    Male
                  </label>
                  <input
                    type='radio'
                    id='Male'
                    name='gender'
                    value='male'
                    className='radio-button__gender'
                    onChange={onChangeForm}
                  />
                </div>

                <div className='gender-selection'>
                  <label htmlFor='Custom' className='gender-label'>
                    Custom
                  </label>
                  <input
                    type='radio'
                    id='Custom'
                    name='gender'
                    value='custom'
                    className='radio-button__gender'
                    onChange={onChangeForm}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='bottom-register-container'>
            <input className='button-register' type='submit' value='Sign Up' />
          </div>
        </form>
      </div>
    </div>
  );
}
