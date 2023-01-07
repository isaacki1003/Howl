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

function validateUrl(url) {
	const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:jpg|png|jpeg|gif)$/;
	if (!urlRegex.test(url)) {
	  return 'Invalid URL';
	}
  }

const CreateReview = () => {
	const { businessId } = useParams();
    let business = useSelector((state) => state.business.singleBusiness);

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
	const [haveErrors, setHaveErrors] = useState(false);
	const [reviewErrors, setReviewErrors] = useState([]);
	const [urls, setUrls] = useState('');
	const [reviewImages, setReviewImages] = useState([]);
	const [imageError, setImageError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (user) {
			const alreadyHaveReview = businessReviews.filter(
				(review) => review.reviewer.id === user.id
			);
			if (alreadyHaveReview.length > 0) {
				window.alert(
					'You already have a review for this business. Please edit your review instead.'
				);
				return history.push(`/business/${businessId}`);
			}
			const reviewInfo = {
				user_id: user.id,
				business_id: Number(businessId),
				stars,
				review
			};
			// post review
			const newReview = await dispatch(postNewReview(reviewInfo));
			if (newReview?.errors) {
				setReviewErrors(newReview.errors);
				setHaveErrors(true);
			} else {
				/// post images for review
				reviewImages.forEach(async (url) => {
					const imageData = {
						review_id: newReview?.id,
						url
					};
					await dispatch(postNewReviewImage(imageData));
				});

				history.push(`/business/${businessId}`);
			}
		}
	};

	const handleAddPhoto = (e) => {
		e.preventDefault();

		const urlError = validateUrl(urls);
		if (urlError) {
			return setImageError(urlError);
		}

		let images = reviewImages;
		images.push(urls);
		setReviewImages(images);
		setUrls('');
		setImageError('');
	};
	if (!business) return null;
	return (
		<div className=''>
			<div className="red-top-bar center">
				<NavLink className="nav-link logo-name" to="/">
					FLUM
				</NavLink>
			</div>
			<div className='center'>
				{haveErrors && (
					<div className="center err-bx1">
						{reviewErrors.map((error, ind) => (
							<div>{error} ‎   </div>
						))}
						<p
							className="close-err-msg"
							onClick={() => setReviewErrors(false)}
						>
							‎ ‎ X
						</p>
					</div>
				)}
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
							<textarea
								className="review-text"
								name="review-text"
								value={review}
								onChange={(e) => setReview(e.target.value)}
								placeholder='I recently visited a pizza place in Los Angeles called "Papas Pies" and I was blown away by the quality of their pizzas. The crust was perfectly crispy and the toppings were fresh and flavorful. I particularly enjoyed the "Meat Lovers" pizza, which was loaded with an assortment of meats and cheeses. The service was also top-notch - the staff was friendly and efficient, and the atmosphere was casual and inviting. Overall, I highly recommend Papas Pies for anyone in search of delicious, high-quality pizza in Los Angeles.'
							/>
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
										alt='url'
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

		</div>
	);
};

export default CreateReview;
