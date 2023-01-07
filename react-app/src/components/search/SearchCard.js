import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Stars from '../reviews/Stars';

function setPriceDollarSign(price) {
	if (price < 11) return '$';
	else if (price > 11 && price < 31) return '$$';
	else if (price > 31 && price < 61) return '$$$';
	else if (price > 60) return '$$$$';
}

const SearchCard = ({ business, loc, setSelectedBusiness }) => {
	const previewImage = business.images.filter((image) => image.preview == true);
	const history = useHistory();
	const categories = business.business_type.split(',');

    console.log(business)

	let price = setPriceDollarSign(Number(business.price));
	return (
		<div
			className="search-result-found-card"
			onMouseOver={() => setSelectedBusiness(business.id)}
			onMouseLeave={() => setSelectedBusiness(0)}
		>
			<div
				className="search-result-found-image"
				onClick={() => history.push(`/business/${business.id}`)}
			>
				<img
					src={previewImage[0].url}
					onError={({ currentTarget }) => {
						currentTarget.onerror = null;
						currentTarget.src =
							'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000';
					}}
				/>
			</div>
			<div className="search-result-found-details">
				<div
					className="search-result-found-name"
					onClick={() => history.push(`/business/${business.id}`)}
				>
					{business.name}
				</div>
				<div
					className="search-result-found-stars"
					onClick={() => history.push(`/business/${business.id}`)}
				>
					<Stars rating={business.averageRating} />{' '}
					{business.num_reviews} reviews
				</div>
				<div className="search-result-found-categories">
					{categories.map((category) => (
						<NavLink
							to={`/search/?desc=${category.replace(
								/^\s+|\s+$/g,
								''
							)}&loc=${loc}`}
							className="nav-link result-category-link"
						>
							{category}
						</NavLink>
					))}{' '}
					{price}
				</div>

			</div>
		</div>
	);
};

export default SearchCard;
