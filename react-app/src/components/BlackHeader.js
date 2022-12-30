import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/session';
// import SearchBar from './SearchBar';


const BlackHeader = () => {
	const user = useSelector((state) => state.session.user);
	const [showMenu, setShowMenu] = useState(false);
	const dispatch = useDispatch();

	const onLogout = async (e) => {
		await dispatch(logout());
	};

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	return (
		<div className="top-nav-wrapper">
			<div className="top-nav-navlink-logo center">
				<NavLink
					to="/"
					exact={true}
					className={`nav-link logo-name black`}
				>
					HOWL
				</NavLink>
			</div>
			{/* <SearchBar /> */}
			<div className="top-nav-nav-wrap">
				<NavLink
					to={`/${user ? 'create-business' : 'login'}`}
					className={`nav-link link-redir black-color`}
				>
					For Businesses
				</NavLink>
				<NavLink
					to="/writeareview"
					className={`nav-link link-redir black-color`}
				>
					Write a Review
				</NavLink>
				{!user && (
					<>
						<NavLink
							to="/login"
							exact={true}
							className={`but-login center nav-link top-nav-nav-butt black-color`}
						>
							Log In
						</NavLink>
						<NavLink
							to="/signup"
							exact={true}
							className="nav-link but-signup center top-nav-nav-butt black-color"
						>
							Sign Up
						</NavLink>
					</>
				)}
				{user && (
					<>
						<div className="prof-user" onClick={openMenu}>
							<i class="fa-solid fa-circle-user icon-user"></i>
						</div>
						{showMenu && (
							<div className="down-nav">
                                <div className='move-welcome-right'>
                                    Welcome, {user.first_name} {user.last_name}
                                </div>
								<div id="logout" onClick={onLogout}>
									<i class="fa-solid fa-arrow-right-from-bracket" />
									<div id="logout-div">Logout</div>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default BlackHeader;
