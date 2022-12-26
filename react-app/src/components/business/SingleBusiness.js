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
            setBusinessImages(results.images);
        }
        execute();
        // return () => dispatch(cleanUpBusiness());
    }, [businessId]);

    return (
        <div>
            <div>
                <div>
                    {businessImages.map((url) => (
                        <img
                            src={url}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src =
                                    'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000';
                            }}
                        />
                    ))}
                </div>
                <div>
                    <SingleBusinessBody business={business} />
                </div>
            </div>
        </div>
    )
}

export default SingleBusiness;
