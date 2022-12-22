import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const BusinessTemplate = ({ business }) => {
    const descriptionHelper = business.description.split(' ').slice(0, 40).join(' ');
    return (
        <div className="business-card-card box">
            <NavLink to={`/business/${business.id}`} className='nav-link business-card-nav-link'>
                {business.name}
            </NavLink>
            <div className="businesser-card-name">
                {business.type}
            </div>
            <div className="business-card-business-container">
				<div className="business-card-business">
                    {descriptionHelper}
                </div>
            </div>
        </div>
    )
}

export default BusinessTemplate;
