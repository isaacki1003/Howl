import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { signUp, login } from '../../store/session';

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [haveErrors, setHaveErrors] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState('');
	const user = useSelector((state) => state.session.user);
	const history = useHistory();
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		const userData = {
			first_name: firstName,
			last_name: lastName,
			email,
			password
		};
		if (password !== confirmPassword) {
			setHaveErrors(true);
			setErrors({ comfirmPassword: 'Passwords do not match!' });
			return;
		}
		const data = await dispatch(signUp(userData));
		if (data) {
			setHaveErrors(true);
			setErrors(data);
		}
	};

	const loginDemo = async (e) => {
		await dispatch(login('demo@aa.io', 'password'));
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateConfirmPassword = (e) => {
		setConfirmPassword(e.target.value);
	};
	const switchToLogin = () => {
		history.push('/login');
	};
	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="login-wrap center">
			<div className="red-top-bar center">
				<NavLink className="nav-link logo-name" to="/">
					HOWL
				</NavLink>
			</div>
			{haveErrors && (
				<div className="err-bx center">
					{Object.values(errors).length > 0 && (
						<div className="login-form-error">
							<span className="unable-to-login">
								{errors.comfirmPassword
									? errors.comfirmPassword
									: errors['first_name']
									? errors['first_name']
									: errors['last_name']
									? errors['last_name']
									: errors.email
									? errors.email
									: errors.password}
							</span>
						</div>
					)}
					<p
						className="close-err-msg"
						onClick={() => setHaveErrors(false)}
					>
						X
					</p>
				</div>
			)}
			<div className="center login-inner-wrap">
				<div className="login-col-left">
					<div className="login-form-wrapper">
						<div className="text-above-form">
            <div className="form-title1">Sign Up For Howl</div>
						</div>
						<form onSubmit={onSignUp}>
							<div>
								<input
									type="text"
									name="firstName"
									onChange={(e) => setFirstName(e.target.value)}
									value={firstName}
									placeholder="First Name"
									className="inp-bxs"
								></input>
							</div>
							<div>
								<input
									type="text"
									name="lastName"
									onChange={(e) => setLastName(e.target.value)}
									value={lastName}
									placeholder="Last Name"
									className="inp-bxs"
								></input>
							</div>
							<div>
								<input
									type="text"
									name="email"
									onChange={updateEmail}
									value={email}
									placeholder="Email"
									className="inp-bxs"
								></input>
							</div>
							<div>
								<input
									type="password"
									name="password"
									onChange={updatePassword}
									value={password}
									placeholder="Password"
									className="inp-bxs"
								></input>
							</div>
							<div>
								<input
									type="password"
									name="confirm-password"
									onChange={updateConfirmPassword}
									value={confirmPassword}
									placeholder="Confirm Password"
									className="inp-bxs"
								></input>
							</div>

							<button type="submit" className="login-demo form-button">
								Sign Up
							</button>
						</form>
						<div className="switch-form-bottom">
							<p id="p1-bottom">Already on Howl? </p>{' '}
							<p id="p2" onClick={switchToLogin}>
								{' '}
								Log in
							</p>
						</div>
					</div>
				</div>
				<div className="login-col-right">
					<img
						style={{ height: '250px', width: '350px' }}
						src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png"
					/>
				</div>
			</div>
		</div>
	);
};

export default SignUpForm;
