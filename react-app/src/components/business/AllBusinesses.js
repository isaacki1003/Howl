import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllBusinesses } from '../../store/business';
import BusinessTemplate from './BusinessTemplate';

const AllBusinesses = () => {
    const dispatch = useDispatch();
    const [chosen, setChosen] = useState([]);

    useEffect(() => {
        const test = async () => {
          let res = await dispatch(getAllBusinesses());
          if (res) {
            setChosen(res.slice(0, res.length));
          } else {
            console.error('Error fetching businesses');
          }
        };
        test();
      }, [dispatch]);

    return (
        <div className="rec-bus-wrapper center">
          <h2 className='font-howl'>
            All Businesses
          </h2>
          <div className="cont-rec-bus">
            {chosen ? (
              chosen.map((business, i) => (
                <BusinessTemplate key={i} business={business} />
              ))
            ) : (
              <p>Loading businesses...</p>
            )}
          </div>
        </div>
      )

}

export default AllBusinesses;
