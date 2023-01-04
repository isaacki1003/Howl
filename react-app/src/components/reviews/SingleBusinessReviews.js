import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getSingleBusinessReviews } from '../../store/review';
import Stars from './Stars';

const SingleBusinessReviews = ({ business }) => {
    const { businessId } = useParams();
    const user = useSelector(state => state.session.user);
    const reviews = business.all_reviews;
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const execute = async () => {
    //         await dispatch(getSingleBusinessReviews(businessId));
    //     };
    //     execute();
    // }, []);

    let one = 0;
	let two = 0;
	let three = 0;
	let four = 0;
	let five = 0;
	reviews?.forEach((review) => {
		if (review.stars == 5) five++;
		if (review.stars == 4) four++;
		if (review.stars == 3) three++;
		if (review.stars == 2) two++;
		if (review.stars == 1) one++;
	});
	if (one !== 0) one = (one / business.num_reviews) * 100;
	if (two !== 0) two = (two / business.num_reviews) * 100;
	if (three !== 0) three = (three / business.num_reviews) * 100;
	if (four !== 0) four = (four / business.num_reviews) * 100;
	if (five !== 0) five = (five / business.num_reviews) * 100;

    if (!reviews?.length) return <div>Be the first to review this business!</div>;
	return (
		<div className="business-reviews-wrapper">
			<div className="business-overall-review-bar">
				<div className="overall-review-stars">
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
				<div className="business-over-bar-wrapper">
					<div className="stars-bar-container">
						<div className="stars-bar-title">5 stars</div>
						<div className="stars-bar-gray">
							<div
								className="b-fiveStars stars-bar-color"
								style={{ width: `${five}%` }}
							></div>
						</div>
					</div>
					<div className="stars-bar-container">
						<div className="stars-bar-title">4 stars</div>
						<div className="stars-bar-gray">
							<div
								className="b-fourStars stars-bar-color"
								style={{ width: `${four}%` }}
							></div>
						</div>
					</div>
					<div className="stars-bar-container">
						<div className="stars-bar-title">3 stars</div>
						<div className="stars-bar-gray">
							<div
								className="b-threeStars stars-bar-color"
								style={{ width: `${three}%` }}
							></div>
						</div>
					</div>
					<div className="stars-bar-container">
						<div className="stars-bar-title">2 stars</div>
						<div className="stars-bar-gray">
							<div
								className="b-twoStars stars-bar-color"
								style={{ width: `${two}%` }}
							></div>
						</div>
					</div>
					<div className="stars-bar-container">
						<div className="stars-bar-title  onestar-div">1 star</div>
						<div className="stars-bar-gray">
							<div
								className="b-oneStar stars-bar-color"
								style={{ width: `${one}%` }}
							></div>
						</div>
					</div>
				</div>
			</div>
			{reviews?.reverse().map((review) => {
				const reviewDate = new Date(review.created_at).toLocaleDateString();
				const show = review?.user_id == user?.id;
				return (
					<div className="business-review-card-container">
						<div id="card-reviewer-name">
							<div className="user-review-icon">
								<img
									src="https://www.pngrepo.com/png/296664/180/alien-avatar.png"
									alt="self logo"
									style={{ height: '40px', width: '40px' }}
								/>
							</div>
							<div className='format-name-review'>
								{review.reviewer?.first_name} {review.reviewer?.last_name}
							</div>
							{show && (
								<NavLink
									to={`/business/${businessId}/reviews/${review.id}/edit`}
									className="nav-link edit-review-link"
								>
									<i class="fa-solid fa-ellipsis"></i>
								</NavLink>
							)}
						</div>
						<div id="card-review-stars">
							<Stars rating={review.stars} />{' '}
							<p id="card-review-date">{reviewDate}</p>
						</div>
						<div id="card-review-review">{review.review}</div>
						{review.reviewImages?.length > 0 && (
							<div id="card-review-images">
								{review.reviewImages.map((image, i) => {
									if (i < 4) {
										return (
											<img
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
