import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { postNewReview, postNewReviewImage } from '../../store/review';
import { getAllBusinesses } from '../../store/business';
import { FaStar } from 'react-icons/fa';

const starsColor = (rating) => {
	if (rating < 2) return 'rgb(255, 204, 75)';
	if (rating < 3) return 'rgb(255, 173, 72)';
	if (rating < 4) return 'rgb(255, 135, 66)';
	if (rating < 5) return 'rgb(255, 100, 61)';
	else return 'rgb(251, 67, 60)';
};

const CreateReview = () => {
	const { businessId } = useParams();
    const business = useSelector((state) => state.business.singleBusiness);

	const user = useSelector((state) => state.session.user);
	const businessReviews = useSelector((state) =>
		Object.values(state.review.businessReviews)
	);
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		if (!business) {
			business = dispatch(getAllBusinesses());
		}
	}, []);

	const [stars, setStars] = useState(0);
	const [hover, setHover] = useState(null);
	const [review, setReview] = useState('');
	const [reviewErrors, setReviewErrors] = useState([]);
	const [urls, setUrls] = useState('');
	const [reviewImages, setReviewImages] = useState([]);
	const [imageError, setImageError] = useState('');
	const [showLoginModal, setShowLoginModal] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user) {
			setShowLoginModal(true);
		}

		if (user) {
			const alreadyHaveReview = businessReviews.filter(
				(review) => review.reviewer.id == user.id
			);
			if (alreadyHaveReview.length > 0) {
				window.alert(
					'You already have a review for this business. Please consider editing your original review instead.'
				);
				return history.push(`/${businessId}`);
			}
			const reviewdata = {
				Business_id: Number(businessId),
				user_id: user.id,
				stars,
				review
			};
			// post review
			const newReview = await dispatch(postNewReview(reviewdata));
			// if (newReview.errors) {
			// 	setReviewErrors(newReview.errors);
			// } else {
				/// post images for review
				reviewImages.forEach(async (url) => {
					const imageData = {
						review_id: newReview && newReview.id,
						url
					};
					await dispatch(postNewReviewImage(imageData));
				});

				history.push(`/business/${businessId}`);
			// }
		}
	};

	const handleAddPhoto = (e) => {
		e.preventDefault();

		let images = reviewImages;
		images.push(urls);
		setReviewImages(images);
		setUrls('');
		setImageError('');
	};
	if (!business) return null;
	return (
		<>
			<div className="red-top-bar center">
				<NavLink className="nav-link logo-name" to="/">
					FLUM
				</NavLink>
			</div>
			<div className="new-rev-frm-wrap center">
				<div className="review-form-container">
					<NavLink
						to={`/${businessId}`}
						className="nav-link ret-bus-frm-rev"
					>
						{business.name}
					</NavLink>
					<form className="" onSubmit={handleSubmit}>
						<div className="rev-form-inps">
							<div className="star-rat">
								{[...Array(5)].map((star, i) => {
									const ratingValue = i + 1;
									return (
										<label key={i} style={{ cursor: 'pointer' }}>
											<input
												className="star-inp"
												type="radio"
												name="rating"
												value={ratingValue}
												onClick={() => setStars(ratingValue)}
											/>
											<FaStar
												className="star-rat"
												class="fa-solid fa-star"
												color={
													ratingValue <= (hover || stars)
														? starsColor(hover || stars)
														: '#e4e5e9'
												}
												size={35}
												onMouseEnter={() => setHover(ratingValue)}
												onMouseLeave={() => setHover(null)}
											/>
										</label>
									);
								})}
							</div>
							<div className="rev-errs">{reviewErrors.stars}</div>
							<textarea
								className="review-text"
								name="review-text"
								value={review}
								onChange={(e) => setReview(e.target.value)}
								placeholder='I recently visited a pizza place in Los Angeles called "Papas Pies" and I was blown away by the quality of their pizzas. The crust was perfectly crispy and the toppings were fresh and flavorful. I particularly enjoyed the "Meat Lovers" pizza, which was loaded with an assortment of meats and cheeses. The service was also top-notch - the staff was friendly and efficient, and the atmosphere was casual and inviting. Overall, I highly recommend Papas Pies for anyone in search of delicious, high-quality pizza in Los Angeles.'
							/>
							<div className="rev-errs">{reviewErrors.review}</div>
						</div>
						<div className="ret-bus-frm-rev add-a-photo">
							Add Some Photos
						</div>
						<div className="rev-form-inps">
							<div id="rev-img-errs">{imageError}</div>
							<input
								type="url"
								placeholder="Image URL"
								className="inp-url"
								onChange={(e) => setUrls(e.target.value)}
								value={urls}
							/>
							<button type="add" className="add-a-image" onClick={handleAddPhoto}>
								Add photo
							</button>
							<div className="rev-prev-imge">
								{reviewImages.map((url) => (
									<img
										className="rev-sing-img"
										src={url}
										onError={({ currentTarget }) => {
											currentTarget.onerror = null;
											currentTarget.src =
												'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000';
										}}
									/>
								))}
							</div>
						</div>
						<button className="rev-submit" type="submit">
							Post Review
						</button>
					</form>
				</div>
			</div>

		</>
	);
};

export default CreateReview;
