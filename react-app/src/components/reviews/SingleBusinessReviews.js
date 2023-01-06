import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Stars from './Stars';

const SingleBusinessReviews = ({ business }) => {
    const { businessId } = useParams();
    const user = useSelector(state => state.session.user);
    const reviews = business.all_reviews;

    let one = 0;
	let two = 0;
	let three = 0;
	let four = 0;
	let five = 0;
	reviews?.forEach((review) => {
		if (review.stars === 5) five++;
		if (review.stars === 4) four++;
		if (review.stars === 3) three++;
		if (review.stars === 2) two++;
		if (review.stars === 1) one++;
	});
	if (one !== 0) one = (one / business.num_reviews) * 100;
	if (two !== 0) two = (two / business.num_reviews) * 100;
	if (three !== 0) three = (three / business.num_reviews) * 100;
	if (four !== 0) four = (four / business.num_reviews) * 100;
	if (five !== 0) five = (five / business.num_reviews) * 100;

    if (!reviews?.length) return <div>Be the first to review this business!</div>;
	return (
		<div className="business-reviews-wrapper">
			<div className="bus-rev-bar-xx">
				<div className="rev-stars-xxx">
					<div style={{ fontWeight: 'bold', fontSize: '14px' }}>
						Overall Rating
					</div>
					<div style={{ fontSize: '30px' }}>
						<Stars rating={business.averageRating} />
					</div>
					<div style={{ fontWeight: 'bold', fontSize: '18px' }}>
						{business.num_reviews} reviews
					</div>
				</div>
				<div className="bus-over-wrap">
					<div className="cont-str-bar">
						<div className="tit-str-bar">5 stars</div>
						<div className="grey-str-bar">
							<div
								className="b-fiveStars clr-str-bar"
								style={{ width: `${five}%` }}
							></div>
						</div>
					</div>
					<div className="cont-str-bar">
						<div className="tit-str-bar">4 stars</div>
						<div className="grey-str-bar">
							<div
								className="b-fourStars clr-str-bar"
								style={{ width: `${four}%` }}
							></div>
						</div>
					</div>
					<div className="cont-str-bar">
						<div className="tit-str-bar">3 stars</div>
						<div className="grey-str-bar">
							<div
								className="b-threeStars clr-str-bar"
								style={{ width: `${three}%` }}
							></div>
						</div>
					</div>
					<div className="cont-str-bar">
						<div className="tit-str-bar">2 stars</div>
						<div className="grey-str-bar">
							<div
								className="b-twoStars clr-str-bar"
								style={{ width: `${two}%` }}
							></div>
						</div>
					</div>
					<div className="cont-str-bar">
						<div className="tit-str-bar  one-str-1">1 star</div>
						<div className="grey-str-bar">
							<div
								className="b-oneStar clr-str-bar"
								style={{ width: `${one}%` }}
							></div>
						</div>
					</div>
				</div>
			</div>
			{reviews?.reverse().map((review) => {
				const reviewDate = new Date(review.created_at).toLocaleDateString();
				const show = review?.user_id === user?.id;
				return (
					<div className="bus-rev-crd-cont">
						<div className="rev-name-correct">
							<div className="user-rev-icn-1">
								<img
									src="https://www.pngrepo.com/png/296664/180/alien-avatar.png"
									alt="self logo"
									style={{ height: '40px', width: '40px' }}
								/>

‎ {review.reviewer?.first_name} {review.reviewer?.last_name}‎

							{show && (
								<NavLink
									to={`/business/${businessId}/reviews/${review.id}/edit`}
									className="nav-link edit-rev-lnk-1"
								>
									<i class="fa-solid fa-ellipsis"></i>
								</NavLink>
							)}
							</div>
						</div>
						<div id="card-rev-strs-1">
							<Stars rating={review.stars} />{' '}
							<p id="card-rev-dt-1">{reviewDate}</p>
						</div>
						<div id="card-rev-rev">{review.review}</div>
						{review.reviewImages?.length > 0 && (
							<div id="card-rev-imgs-x">
								{review.reviewImages.map((image, i) => {
									if (i < 4) {
										return (
											<img
												alt={i}
												className="card-rev-sing-img"
												src={image.url}
												onError={({ currentTarget }) => {
													currentTarget.onerror = null;
													currentTarget.src =
														'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000';
												}}
											/>
										);
									}
									else {
										return null;
									}
								})}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);

}

export default SingleBusinessReviews;
