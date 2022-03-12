import React, { ChangeEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import CircleLoading from "../../components/loading-component/CircleLoading";
import "./styles/RegisterPage.scss";
import { dates, months, years } from "./DateModels";

export default function RegisterPage(props: any) {
	let navigate = useNavigate();
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

	function onDismiss() {
		navigate(-1);
	}
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
			<div className="container-form">
				<div className="register-form__header">
					<h1 className="title-signup">Sign Up</h1>
					<p className="register-page__authen-slogan">It's quick and easy</p>
				</div>
				<img
					className="close-btn-img"
					src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png"
					alt=""
					onClick={() => onDismiss()}
				></img>
				<hr className="register-hr" />
				<div className="register-page__wrapper-input">
					<form>
						<div className="register-page__wrapper__name">
							<input
								type="text"
								className="input__firstname"
								placeholder="First name"
							/>
							<input
								type="text"
								className="input__surname"
								placeholder="Surname"
							/>
						</div>
						<div className="register-page__wrapper__username">
							<input
								type="text"
								id="userName"
								value={userName}
								onChange={onChangeUserName}
								placeholder="Your username"
								className="register-input__username"
							/>
						</div>
						<div className="register-page__wrapper-password">
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								value={password}
								autoComplete="off"
								onChange={onChangePassword}
								placeholder="New password"
								className="register-input__password"
								size={8}
							/>
						</div>
						<div className="register-page__wrapper-date-of-birth">
							<label htmlFor="date-select" className="label-container">
								Date of birth:
							</label>
							<div className="date-selections">
								<select
									name="dates"
									id="date-select"
									className="date-selection"
								>
									{dates.map((date, index) => (
										<option value={date} key={date}>
											{date}
										</option>
									))}
								</select>
								<select
									name="dates"
									id="date-select"
									className="date-selection date-selection--months"
								>
									{months.map((month, index) => (
										<option value={month} key={month}>
											{month}
										</option>
									))}
								</select>
								<select
									name="dates"
									id="date-select"
									className="date-selection"
								>
									{years.map((year, index) => (
										<option value={year} key={year}>
											{year}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="register-page__wrapper-gender">
							<label htmlFor="date-select" className="label-container">
								Gender:
							</label>
							<div className="gender-selections">
								<div className="gender-selection">
									<label htmlFor="Female" className="gender-label">
										Female
									</label>
									<input
										type="radio"
										id="Female"
										name="gender"
										value="female"
										className="radio-button__gender"
									/>
								</div>

								<div className="gender-selection gender-selection--male">
									<label htmlFor="Male" className="gender-label">
										Male
									</label>
									<input
										type="radio"
										id="Male"
										name="gender"
										value="Male"
										className="radio-button__gender"
									/>
								</div>

								<div className="gender-selection">
									<label htmlFor="Custom" className="gender-label">
										Custom
									</label>
									<input
										type="radio"
										id="Custom"
										name="gender"
										value="Custom"
										className="radio-button__gender"
									/>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div className="bottom-register-container">
					<p className="license-paragraph">
						Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính sách dữ
						liệu và Chính sách cookie của chúng tôi. Bạn có thể nhận được thông
						báo của chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.
					</p>
					<button
						className="button-register"
						onClick={() => loginNavigate(props)}
					>
						Sign Up
					</button>
				</div>

				{/* <Link className="register-link__register" to="/">
					I've already have an account!
				</Link> */}
			</div>
		</div>
	);
}
