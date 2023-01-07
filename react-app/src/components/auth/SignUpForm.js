import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirm_password, setConfirmPassword] = useState('');
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [haveErrors, setHaveErrors] = useState(false);
	const user = useSelector((state) => state.session.user);
	const history = useHistory();
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		const userInfo = {
			first_name,
			last_name,
			email,
			password,
			confirm_password
		};
		console.log(userInfo)
		const data = await dispatch(signUp(userInfo));
		if (data) {
			setHaveErrors(true);
			setErrors(data);
		}
	};

	const updateFirstName = (e) => {
		setFirstName(e.target.value);
	};

	const updateLastName = (e) => {
		setLastName(e.target.value);
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
					{errors.map((error, ind) => (
						<div>{error}</div>
					))}
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
									name="first_name"
									onChange={updateFirstName}
									value={first_name}
									placeholder="First Name"
									className="inp-bxs"
								></input>
							</div>
							<div>
								<input
									type="text"
									name="last_name"
									onChange={updateLastName}
									value={last_name}
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
									name="confirm_password"
									onChange={updateConfirmPassword}
									value={confirm_password}
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
						alt='signup-illustration'
						src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png"
					/>
				</div>
			</div>
		</div>
	);
};

export default SignUpForm;
