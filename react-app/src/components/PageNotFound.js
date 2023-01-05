import React from 'react';
import { NavLink } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div>
            <div className="red-top-bar center">
				<NavLink className="nav-link logo-name" to="/">
					HOWL
				</NavLink>
			</div>
            <div className="create-business-container center">
                <h1>Page Not Found</h1>
            </div>
        </div>
    );
}

export default PageNotFound;
