import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AllBusinesses from '../business/AllBusinesses';
import { getSingleBusiness } from '../../store/business';

const Landing = () => {
    const [chosen, setChosen] = useState([]);
    const dispatch = useDispatch();
    const businesses = useSelector((state) => state.business.allBusinesses);

    useEffect(() => {
        const test = async () => {
            let res = await dispatch(getSingleBusiness(1));
            setChosen(res);
        };
        test();
    }, []);

    return (
        <div>
            <div>

            </div>

            <div>
                <AllBusinesses />
            </div>
        </div>
    )
}

export default Landing;
