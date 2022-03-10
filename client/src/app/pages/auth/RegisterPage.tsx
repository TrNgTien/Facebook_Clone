import React, { ChangeEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import CircleLoading from "../../components/loading-component/CircleLoading";
import "./styles/RegisterPage.scss";

export default function RegisterPage(props: any) {
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
			<div className="container-form">
				<div className="register-form__header">
					<h1>Sign Up</h1>
					<i></i>
					<p className="register-page__authen-slogan">It's quick and easy</p>
				</div>

				<hr />
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
								placeholder="surname"
							/>
						</div>
						<div className="register-page__wrapper__username">
							<input
								type="text"
								id="userName"
								autoComplete="on"
								value={userName}
								onChange={onChangeUserName}
								placeholder="Your user name..."
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
								placeholder="Your password..."
								className="register-input__password"
								size={8}
							/>
						</div>
						<div className="register-page__wrapper-date-of-birth">
							<label htmlFor="date-select" className="label-container">
								Date of birth:
							</label>
							<div className="date-selections">
								<select name="dates" id="date-select">
									<option value="">--Please choose an option--</option>
								</select>
								<select name="dates" id="date-select">
									<option value="">--Please choose an option--</option>
								</select>
								<select name="dates" id="date-select">
									<option value="">--Please choose an option--</option>
								</select>
							</div>
						</div>
						<div className="register-page__wrapper-gender">
							<label htmlFor="date-select" className="label-container">
								Gender:
							</label>
							<div className="gender-selections">
								<label htmlFor="Female" className="gender-label">
									Female
								</label>
								<input type="radio" id="Female" name="gender" value="female" />

								<label htmlFor="Male" className="gender-label">
									Male
								</label>
								<input type="radio" id="Male" name="gender" value="Male" />

								<label htmlFor="Custom" className="gender-label">
									Custom
								</label>
								<input type="radio" id="Custom" name="gender" value="Custom" />
							</div>
						</div>
					</form>
				</div>
				<button
					className="button-register"
					onClick={() => loginNavigate(props)}
				>
					Sign Up
				</button>

				{/* <Link className="register-link__register" to="/">
					I've already have an account!
				</Link> */}
			</div>
		</div>
	);
}
