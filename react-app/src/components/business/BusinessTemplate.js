import React from 'react';
import { NavLink } from 'react-router-dom';

const BusinessTemplate = ({ business }) => {
    const descriptionHelper = business.description.split(' ').slice(0, 40).join(' ');
    return (
        <div className="business-card-card box">
            <NavLink to={`/business/${business.id}`} className='nav-link nav-card-bus'>
                {business.name}
            </NavLink>
            <div className="busser-name-card">
                {business.business_type}
            </div>
            <div className="bus-container-12">
				<div className="business-card-business">
                    {descriptionHelper}
                </div>
                <div className='bring-down'>
                    <img
                        alt={`${business.images[0]?.url}`}
                        src={business.images[0]?.url ? `${business.images[0].url}` : 'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000'}
                        style={{height: '230px', width: '90%'}}
                        onError={(e) => {
                            e.target.src = 'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000'
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default BusinessTemplate;
