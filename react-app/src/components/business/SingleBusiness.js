import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SingleBusinessBody from './SingleBusinessBody';

import { cleanUpBusiness, getSingleBusiness } from '../../store/business';

const SingleBusiness = () => {
    const [businessImages, setBusinessImages] = useState([]);

    const { businessId } = useParams();
    const business = useSelector(state => state.business.singleBusiness);
    const dispatch = useDispatch();

    useEffect(() => {
        const execute = async () => {
            const results = await dispatch(getSingleBusiness(businessId));
            console.log(results)
            if (results) {
                setBusinessImages(results.images);
              }
        }
        execute();
        return () => {
            dispatch(cleanUpBusiness());
        };
    }, [businessId]);

    return (
        <div className="business-details-page-wrapper center">
                <div className="business-details-images-container">
                    <div className="business-detail-faded-background"></div>
                    {businessImages.map((url1) => (
                        <img
                            src={url1.url}
                            // key={url}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src =
                                    'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000';
                            }}
                        />
                    ))}
                </div>
                <div className="business-details-header-wrapper">
				    <h1 className="business-details-name">{business.name}</h1>
                    <div className={`business-details-total-reviews`}>
					<div className="total-reviews">{business.num_reviews} reviews</div>
				</div>
                    <SingleBusinessBody business={business} />
                </div>

        </div>
    )
}

export default SingleBusiness;
