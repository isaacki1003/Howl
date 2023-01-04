import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { deleteBusiness } from "../../store/business";
import SingleBusinessReviews from "../reviews/SingleBusinessReviews";

const SingleBusinessBody = ({ business, operatingHours }) => {
    const user = useSelector(state => state.session.user);
	const reviews = business.all_reviews;

    const { businessId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

	let operating = business.hours?.split(',');
	operating = operating?.map((eachDay) => {
		eachDay = eachDay.split('-');
		if (eachDay[1] !== 'Closed') {
			const openHour = eachDay[1].split(':'); //  ['11', '30']
			const closeHour = eachDay[2].split(':'); // ['21', '30']
			openHour[1] =
				Number(openHour[0]) > 11 ? openHour[1] + ' PM' : openHour[1] + ' AM';
			closeHour[1] =
				Number(closeHour[0]) > 11 ? closeHour[1] + ' PM' : closeHour[1] + ' AM';
			openHour[0] = ((Number(openHour[0]) + 11) % 12) + 1;
			closeHour[0] = ((Number(closeHour[0]) + 11) % 12) + 1;
			eachDay[1] = openHour.join(':') + ' - ' + closeHour.join(':');
			return eachDay.slice(0, 2);
		}
		return eachDay;
	});

	const date = new Date();
	const todayDay = date.toString().split(' ')[0]; // Mon, Tue, Wed....

	if (!business) {
		return <div>Loading...</div>;
	  }

    const handleDelete = async (e) => {
        if (
			window.confirm(
				'Once deleted, this business will be gone forever. Are you sure you want to delete this business?'
			)
		) {
			const deleted = await dispatch(deleteBusiness(businessId));
			if (deleted) history.push('/');
		}
	};

    const theOwner = user?.id == business.owner_id;

    for (let i = 0; i < reviews?.length; i++) {
		const review = reviews[i];
		if (review.user_id === user?.id) {
			return (
				<div className="business-details-body-wrapper">
					<div className="business-details-container">
						{!theOwner && (
							<div className="create-reviews-wrapper">
								<NavLink
									to={`/business/${businessId}/reviews/${review.id}/edit`}
									className="create-new-review-link"
								>
									<i class="fa-regular fa-star"></i> Edit your review
								</NavLink>
							</div>
						)}

						{theOwner && (
							<div className="create-reviews-wrapper">
								<NavLink
									to={`/business/${businessId}/edit`}
									className="create-new-review-link"
								>
									<i className="fa-solid fa-star" /> Edit Business
								</NavLink>
								<button
									className="create-new-review-link-button"
									onClick={handleDelete}
								>
									<i class="fa-solid fa-x"></i>  ‎
									Delete Business
								</button>
							</div>
						)}
						<div className="business-details-block-map">
						<div className="hours-wrapper">
								<h1 className="title-business-smaller1">Hours</h1>
								<div id="operation-hours-container">
									<div id="each-day">
										{operating?.map((day) => (
											<div id="day-of-week">{day[0]}</div>
										))}
									</div>
									<div id="each-day">
										{operating?.map((day) => (
											<div id="hours-of-operation">
												<div>{day[1]}</div>
												{day[0] == todayDay && (
													<div
														className={`business-open-close ${
															operatingHours[0] ? 'open' : 'close'
														}`}
													>
														{operatingHours[0] ? 'Open now' : 'Closed'}
													</div>
												)}
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						<div className="business-details-block">
							<h1 className="title-business-smaller1">About the Business</h1>
							<div className="business-details-description">
								{business.description}
							</div>
						</div>

						<div className="business-details-block">
							<h1 className="title-business-smaller1">Recommended Reviews</h1>
							<SingleBusinessReviews business={business} />
						</div>

					</div>
					<div className="business-details-right-Col">
						<div className="additional-details-box">
							{business.url && (
								<div className="business-right-details">
									<a
										href={business.url}
										style={{ color: '#49B1CB', textDecoration: 'none', fontFamily: 'Josefin Sans' }}
										target="_blank"
									>
										{business.url}
									</a>
									<a
										href={business.url}
										style={{ color: '#49B1CB' }}
										target="_blank"
									>
										<img
											src="https://www.pngrepo.com/png/452341/180/redirect-to-url.png"
											alt="self logo"
											style={{ height: '29px', width: '29px' }}
										/>
									</a>
								</div>
							)}
							<div className="business-right-details">
								{business.phone_number}
								<img
									src="https://www.pngrepo.com/png/46219/180/phone.png"
									alt="self logo"
									style={{ height: '26px', width: '26px' }}
								/>
							</div>
							<div className="business-right-details no-border">
								<div>
									{business.address} {business.city}, {business.state}{' '}
									{business.zip}
								</div>
								<img
									src="https://www.pngrepo.com/png/360338/180/direction.png"
									alt="self logo"
									style={{ height: '29px', width: '29px' }}
								/>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}

	return (
		<div className="business-details-body-wrapper">
			<div className="business-details-container">
				{!theOwner && (
					<div className="create-reviews-wrapper">
						<NavLink
							to={`/business/${businessId}/create-review`}
							className="create-new-review-link"
						>
							<i className="fa-regular fa-star" /> Write a review
						</NavLink>
					</div>
				)}

				{theOwner && (
					<div className="create-reviews-wrapper">
						<NavLink
							to={`/business/${businessId}/edit`}
							className="create-new-review-link"
						>
							<i className="fa-solid fa-star" /> Edit Business
						</NavLink>
						<button
							className="create-new-review-link-button"
							onClick={handleDelete}
						>
							<i class="fa-solid fa-x"></i>  ‎
							Delete Business
						</button>
					</div>
				)}
				<div className="business-details-block-map">
				<div className="hours-wrapper">
						<h1 className="title-business-smaller1">Hours</h1>
						<div id="operation-hours-container">
							<div id="each-day">
								{operating?.map((day) => (
									<div id="day-of-week">{day[0]}</div>
								))}
							</div>
							<div id="each-day">
								{operating?.map((day) => (
									<div id="hours-of-operation">
										<div>{day[1]}</div>
										{day[0] == todayDay && (
											<div
												className={`business-open-close ${
													operatingHours[0] ? 'open' : 'close'
												}`}
											>
												{operatingHours[0] ? 'Open now' : 'Closed'}
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="business-details-block">
					<h1 className="title-business-smaller1">About the Business</h1>
					<div className="business-details-description">
						{business.description}
					</div>
				</div>

				<div className="business-details-block">
					<h1 className="title-business-smaller1">Recommended Reviews</h1>
					<SingleBusinessReviews business={business} />
				</div>

			</div>
			<div className="business-details-right-Col">
				<div className="additional-details-box">
					{business.url && (
						<div className="business-right-details">
							<a
								href={business.url}
								style={{ color: '#49B1CB', textDecoration: 'none', fontFamily: 'Josefin Sans' }}
								target="_blank"
							>
								{business.url}
							</a>
							<a
								href={business.url}
								style={{ color: '#49B1CB' }}
								target="_blank"
							>
								<img
									src="https://www.pngrepo.com/png/452341/180/redirect-to-url.png"
									alt="self logo"
									style={{ height: '29px', width: '29px' }}
								/>
							</a>
						</div>
					)}
					<div className="business-right-details">
						{business.phone_number}
						<img
							src="https://www.pngrepo.com/png/46219/180/phone.png"
							alt="self logo"
							style={{ height: '26px', width: '26px' }}
						/>
					</div>
					<div className="business-right-details no-border">
						<div>
							{business.address} {business.city}, {business.state}{' '}
							{business.zip}
						</div>
						<img
							src="https://www.pngrepo.com/png/360338/180/direction.png"
							alt="self logo"
							style={{ height: '29px', width: '29px' }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleBusinessBody;
