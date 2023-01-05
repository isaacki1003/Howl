import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [haveErrors, setHaveErrors] = useState(false);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setHaveErrors(true);
			setErrors(data);
		}
	};

	const loginDemo = async (e) => {
		await dispatch(login('demo@aa.io', 'password'));
	};

	const switchToSignUp = () => {
		history.push('/signup');
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
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
						<div key={ind}>{error}</div>
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
							<div className="form-title">Log in to Howl</div>

						</div>
						<button className="login-demo form-button" onClick={loginDemo}>
							Demo User
						</button>
						<div className="login-sep">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</div>
						<form onSubmit={onLogin}>
							<div>
								<input
									name="email"
									type="text"
									placeholder="Email"
									value={email}
									onChange={updateEmail}
									className="inp-bxs"
								/>
							</div>
							<div>
								<input
									name="password"
									type="password"
									placeholder="Password"
									value={password}
									onChange={updatePassword}
									className="inp-bxs"
								/>
							</div>
							<button type="submit" className="login-demo form-button">
								Login
							</button>
						</form>
						<div className="switch-form-bottom">
							<p id="p1-bottom">New to Howl? </p>{' '}
							<p id="p2" onClick={switchToSignUp}>
								{' '}
								Sign up
							</p>
						</div>
					</div>
				</div>
				<div className="login-col-right">
					<img
						style={{ height: '250px', width: '350px' }}
						alt="login-illustration"
						src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png"
					/>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
