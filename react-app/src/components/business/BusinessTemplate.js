import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const BusinessTemplate = ({ business }) => {
    const descriptionHelper = business.description.split(' ').slice(0, 40).join(' ');
    return (
        <div className="business-card-card box">
            <NavLink to={`/business/${business.id}`} className='nav-link nav-card-bus'>
                {business.name}
            </NavLink>
            <div className="busser-name-card">
                {business.type}
            </div>
            <div className="bus-container-12">
				<div className="business-card-business">
                    {descriptionHelper}
                </div>
                <div className='bring-down'>
                    <img src={`${business.images[0].url}`} style={{height: '40%', width: '60%'}}/>
                </div>
            </div>
        </div>
    )
}

export default BusinessTemplate;
