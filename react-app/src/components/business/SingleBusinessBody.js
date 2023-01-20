import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { deleteBusiness } from "../../store/business";
import SingleBusinessReviews from "../reviews/SingleBusinessReviews";
import MapHelper from "../MapHelper";

const SingleBusinessBody = ({ business, operatingHours }) => {
    const user = useSelector(state => state.session.user);
	const reviews = business.all_reviews;

    const { businessId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

	let operating = business.hours?.split(',');
	console.log(business.hours)
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

    const theOwner = user?.id === business.owner_id;

    for (let i = 0; i < reviews?.length; i++) {
		const review = reviews[i];
		if (review.user_id === user?.id) {
			return (
				<div className="dets-bus-bd-wrap">
					<div className="dets-bus-cont">
						{!theOwner && (
							<div className="new-rev-wrap-x">
								<NavLink
									to={`/business/${businessId}/reviews/${review.id}/edit`}
									className="new-rev-lnk-1"
								>
									<i class="fa-regular fa-star"></i> Edit your review
								</NavLink>
							</div>
						)}

						{theOwner && (
							<div className="new-rev-wrap-x">
								<NavLink
									to={`/business/${businessId}/edit`}
									className="new-rev-lnk-1"
								>
									<i className="fa-solid fa-star" /> Edit Business
								</NavLink>
								<button
									className="new-rev-lnk-1-butt"
									onClick={handleDelete}
								>
									<i class="fa-solid fa-x"></i>  ‎
									Delete Business
								</button>
							</div>
						)}
						<div className="dets-bus-blk-map">
							<div>
								<MapHelper business={business} />
							</div>
						<div className="hrs-wrap">
								<h1 className="title-business-smaller1">Hours</h1>
								<div id="op-hr-cont">
									<div id="ev-day-1">
										{operating?.map((day) => (
											<div id="day-wk">{day[0]}</div>
										))}
									</div>
									<div id="ev-day-1">
										{operating?.map((day) => (
											<div id="hrs-op">
												<div className="hours-smaller">{day[1]}</div>
												{day[0] === todayDay && (
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

						<div className="dets-bus-blk">
							<h1 className="title-business-smaller1">About the Business</h1>
							<div className="dets-bus-desc">
								{business.description}
							</div>
						</div>

						<div className="dets-bus-blk">
							<h1 className="title-business-smaller1">Recommended Reviews</h1>
							<SingleBusinessReviews business={business} />
						</div>

					</div>
					<div className="dets-bus-right-Col">
						<div className="more-dets-box-1">
							{business.url && (
								<div className="bus-dets-right">
									<a
										href={business.url}
										style={{ color: '#49B1CB', textDecoration: 'none', fontFamily: 'Josefin Sans' }}
										target="_blank"
										rel="noreferrer"
									>
										{business.url}
									</a>
									<a
										href={business.url}
										style={{ color: '#49B1CB' }}
										target="_blank"
										rel="noreferrer"
									>
										<img
											src="https://www.pngrepo.com/png/452341/180/redirect-to-url.png"
											alt="self logo"
											style={{ height: '29px', width: '29px' }}
										/>
									</a>
								</div>
							)}
							<div className="bus-dets-right">
								{business.phone_number}
								<img
									src="https://www.pngrepo.com/png/46219/180/phone.png"
									alt="self logo"
									style={{ height: '26px', width: '26px' }}
								/>
							</div>
							<div className="bus-dets-right no-border">
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
		<div className="dets-bus-bd-wrap">
			<div className="dets-bus-cont">
				{!theOwner && (
					<div className="new-rev-wrap-x">
						<NavLink
							to={`/business/${businessId}/create-review`}
							className="new-rev-lnk-1"
						>
							<i className="fa-regular fa-star" /> Write a review
						</NavLink>
					</div>
				)}

				{theOwner && (
					<div className="new-rev-wrap-x">
						<NavLink
							to={`/business/${businessId}/edit`}
							className="new-rev-lnk-1"
						>
							<i className="fa-solid fa-star" /> Edit Business
						</NavLink>
						<button
							className="new-rev-lnk-1-butt"
							onClick={handleDelete}
						>
							<i class="fa-solid fa-x"></i>  ‎
							Delete Business
						</button>
					</div>
				)}
				<div className="dets-bus-blk-map">
					<div>
						<MapHelper business={business} />
					</div>
				<div className="hrs-wrap">
						<h1 className="title-business-smaller1">Hours</h1>
						<div id="op-hr-cont">
							<div id="ev-day-1">
								{operating?.map((day) => (
									<div id="day-wk">{day[0]}</div>
								))}
							</div>
							<div id="ev-day-1">
								{operating?.map((day) => (
									<div id="hrs-op">
										<div>{day[1]}</div>
										{day[0] === todayDay && (
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

				<div className="dets-bus-blk">
					<h1 className="title-business-smaller1">About the Business</h1>
					<div className="dets-bus-desc">
						{business.description}
					</div>
				</div>

				<div className="dets-bus-blk">
					<h1 className="title-business-smaller1">Recommended Reviews</h1>
					<SingleBusinessReviews business={business} />
				</div>

			</div>
			<div className="dets-bus-right-Col">
				<div className="more-dets-box-1">
					{business.url && (
						<div className="bus-dets-right">
							<a
								href={business.url}
								style={{ color: '#49B1CB', textDecoration: 'none', fontFamily: 'Josefin Sans' }}
								target="_blank"
								rel="noreferrer"
							>
								{business.url}
							</a>
							<a
								href={business.url}
								style={{ color: '#49B1CB' }}
								target="_blank"
								rel="noreferrer"
							>
								<img
									src="https://www.pngrepo.com/png/452341/180/redirect-to-url.png"
									alt="self logo"
									style={{ height: '29px', width: '29px' }}
								/>
							</a>
						</div>
					)}
					<div className="bus-dets-right">
						{business.phone_number}
						<img
							src="https://www.pngrepo.com/png/46219/180/phone.png"
							alt="self logo"
							style={{ height: '26px', width: '26px' }}
						/>
					</div>
					<div className="bus-dets-right no-border">
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
