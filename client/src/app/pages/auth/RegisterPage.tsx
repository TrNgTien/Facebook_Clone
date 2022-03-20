import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircleLoading from "../../components/loading-component/CircleLoading";
import "./styles/RegisterPage.scss";
import { dates, months, years } from "./DateModels";
import { RegisterReq } from "../../services/AuthService";

export default function RegisterPage(props: any) {
  let navigate = useNavigate();
  const IMG_ICON_CLOSE = "https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png";
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [dayBirth, setDayBirth] = useState<string>("");
  const [monthBirth, setMonthBirth] = useState<string>("");
  const [yearBirth, setYearBirth] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const onChangeFirstName = (
    e: ChangeEvent<{
      value: string;
    }>
  ) => {
    setFirstName(e.target.value);
  };
  const onChangeLastName = (
    e: ChangeEvent<{
      value: string;
    }>
  ) => {
    setLastName(e.target.value);
  };
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
  const onChangeDayBirth = (e: ChangeEvent<{ value: string }>) => {
    setDayBirth(e.target.value);
  };
  const onChangeMonthBirth = (e: ChangeEvent<{ value: string }>) => {
    setMonthBirth(e.target.value);
  };
  const onChangeYearBirth = (e: ChangeEvent<{ value: string }>) => {
    setYearBirth(e.target.value);
  };
  const onChangeGender = (
    e: ChangeEvent<{
      value: string;
    }>
  ) => {
    setGender(e.target.value);
  };
  const finishSignUp = (): void => {
    let userRegister = {
      gender: gender,
      userName: userName,
      password: password,
      firstName: firstName,
      lastName: lastName,
      day: dayBirth,
      month: monthBirth,
      year: yearBirth,
    };
    setIsRegistering(true);
    setTimeout(() => navigate(-1), 3000);
  };

  function cancelSignUp() {
    navigate(-1);
  }
  return (
    <div className='register-page'>
      {isRegistering ? <CircleLoading /> : null}
      <div className='container-form'>
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
          <form>
            <div className='register-page__wrapper__name'>
              <input
                type='text'
                className='input__firstname'
                placeholder='First name'
                onChange={onChangeFirstName}
              />
              <input
                type='text'
                className='input__surname'
                placeholder='Surname'
                onChange={onChangeLastName}
              />
            </div>
            <div className='register-page__wrapper__username'>
              <input
                type='text'
                id='userName'
                value={userName}
                onChange={onChangeUserName}
                placeholder='Your Account'
                className='register-input__username'
              />
            </div>
            <div className='register-page__wrapper-password'>
              <input
                id='password'
                type={showPassword ? "text" : "password"}
                value={password}
                autoComplete='off'
                onChange={onChangePassword}
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
                <select
                  name='dates'
                  id='date-select'
                  className='date-selection'
                  onChange={onChangeDayBirth}
                >
                  {dates.map((date, index) => (
                    <option value={date} key={date}>
                      {date}
                    </option>
                  ))}
                </select>
                <select
                  name='dates'
                  id='date-select'
                  className='date-selection date-selection--months'
                  onChange={onChangeMonthBirth}
                >
                  {months.map((month, index) => (
                    <option value={month} key={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name='dates'
                  id='date-select'
                  className='date-selection'
                  onChange={onChangeYearBirth}
                >
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
                    onChange={onChangeGender}
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
                    onChange={onChangeGender}
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
                    onChange={onChangeGender}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className='bottom-register-container'>
          <button className='button-register' onClick={() => finishSignUp()}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
