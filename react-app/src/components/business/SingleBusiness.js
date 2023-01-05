import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SingleBusinessBody from './SingleBusinessBody';

import { cleanUpBusiness, getSingleBusiness } from '../../store/business';

function setPriceDollarSign(price) {
	if (price < 11) return '$';
	else if (price > 11 && price < 31) return '$$';
	else if (price > 31 && price < 61) return '$$$';
	else if (price > 60) return '$$$$';
}

function getColorForRating(rating) {
	if (rating < 2) return 'oneStar';
	if (rating < 3) return 'twoStars';
	if (rating < 4) return 'threeStars';
	if (rating < 5) return 'fourStars';
	else return 'fiveStars';
}

const SingleBusiness = () => {
    const [businessImages, setBusinessImages] = useState([]);
	const [categories, setCategories] = useState([]);
	const [priceRange, setPriceRange] = useState('');
	const [operatingHours, setOperatingHours] = useState([]);

    const { businessId } = useParams();
    const business = useSelector(state => state.business.singleBusiness);
    const dispatch = useDispatch();

    useEffect(() => {
        const execute = async () => {
            const results = await dispatch(getSingleBusiness(businessId));
            setBusinessImages(results?.images)

            const businessCategories = results?.business_type.split(',');
			setCategories(businessCategories);

            setPriceRange(setPriceDollarSign(Number(results.price)));

            const date = new Date();
			const todayDay = date.toString().split(' ')[0]; // Mon, Tue, Wed....
			const currentHour = date.getHours();
			const operationHoursEachDay = results.hours.split(','); //['Mon-11:30-21:30', 'Tue-11:30-21:30', 'Wed-11:30-21:30'....
			const todayHours = operationHoursEachDay // ['Thu', '11:30', '21:30']
				.filter((day) => day.slice(0, 3) == todayDay)[0]
				.split('-');
			if (todayHours[1] !== 'Closed') {
				const openHour = todayHours[1].split(':'); //  ['11', '30']
				const closeHour = todayHours[2].split(':'); // ['21', '30']
				const openNow =
					Number(openHour[0]) <= currentHour &&
					Number(closeHour[0]) >= currentHour;

				openHour[1] =
					Number(openHour[0]) > 11 ? openHour[1] + ' PM' : openHour[1] + ' AM';
				closeHour[1] =
					Number(closeHour[0]) > 11
						? closeHour[1] + ' PM'
						: closeHour[1] + ' AM';
				openHour[0] = ((Number(openHour[0]) + 11) % 12) + 1;
				closeHour[0] = ((Number(closeHour[0]) + 11) % 12) + 1;
				setOperatingHours([openNow, openHour.join(':'), closeHour.join(':')]);
        }
    };
        execute();
        return () => {
            dispatch(cleanUpBusiness());
        };
    }, [businessId]);

    let rating = business.averageRating;
	const color = getColorForRating(rating);


    return (
        <div className="dets-bus-page-wrapper center">
                <div className="dets-bus-img-cont">
                    <div className="bus-det-back"></div>
                    {businessImages?.map((url1) => (
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
                <div className="dets-bus-wrap-head">
				    <h1 className="dets-bus-name">{business.name}</h1>
                    <div className={`dets-bus-tot-revs ${color}`}>
                        {[...Array(5)].map((star, i) => {
                            if (i < Math.floor(rating)) return <i class="fa-solid fa-star" />;
                            else if (rating % Math.floor(rating) >= 0.5) {
                                rating = 0;
                                return <i class="fa-regular fa-star-half-stroke" />;
                            } else return <i class="fa-regular fa-star" />;
                        })}
					<div className="tot-revs">{business.num_reviews} reviews</div>
				</div>
                <div className="dets-bus-p-cat">
					<div style={{ fontWeight: '400' }}>{priceRange} • </div>
					{categories?.map((category) => (
						<>
							<NavLink
								to={`/search/?desc=${category.replace(/^\s+|\s+$/g, '')}&loc=`}
								className="nav-link dets-bus-cat-redir"
							>
								{category},
							</NavLink>
						</>
					))}
				</div>
				<div className="dets-bus-hours">
					<div
						className={`business-open-close ${
							operatingHours[0] ? 'open' : 'close'
						}`}
					>
						{operatingHours[0] ? 'Open' : 'Closed'}
					</div>
					<div className="business-operating-hours">
						{operatingHours[1]}{' '}
						{operatingHours[2] ? '- ' + operatingHours[2] : ''}
					</div>
				</div>
                    <SingleBusinessBody business={business} operatingHours={operatingHours} />
                </div>

        </div>
    )
}

export default SingleBusiness;
