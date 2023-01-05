import React from "react";
import { NavLink } from "react-router-dom";

const ComingSoon = () => {
    return (
        <div>
            <div className="red-top-bar center">
				<NavLink className="nav-link logo-name" to="/">
					HOWL
				</NavLink>
			</div>
            <div className="rev-create-wrapper1 center">
                <div className="cent-rev-create-nav-div">
                        <div className="">
                            <div className="write-review-title1">
                                Search Feature Coming Soon!
                            </div>
                        </div>
                </div>
                <div>
                    <img src="https://s3-media0.fl.yelpcdn.com/assets/public/first_to_review_375x200_v2.yji-df81b4f3f809d02f4d8f.svg" />
                </div>
            </div>

        </div>
    );
}

export default ComingSoon;
