import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import {
	getSingleReview,
	DeleteReviewImage,
	deleteReview,
	postNewReviewImage,
	updateReview
} from '../../store/review';
import { getSingleBusiness, singleBusinessCleanUp } from '../../store/business';
import { FaStar } from 'react-icons/fa';
// import './ReviewEditForm.css';

const starsColor = (rating) => {
	if (rating < 2) return 'rgb(255, 204, 75)';
	if (rating < 3) return 'rgb(255, 173, 72)';
	if (rating < 4) return 'rgb(255, 135, 66)';
	if (rating < 5) return 'rgb(255, 100, 61)';
	else return 'rgb(251, 67, 60)';
};


const EditReview = () => {
	const { reviewId, businessId } = useParams();
	const user = useSelector((state) => state.session.user);
	const thisReview = useSelector((state) => state.review.singleReview);
	const business = useSelector((state) => state.business.singleBusiness);

	const dispatch = useDispatch();
	const history = useHistory();

	const [stars, setStars] = useState(0);
	const [hover, setHover] = useState(null);
	const [review, setReview] = useState('');
	const [reviewErrors, setReviewErrors] = useState([]);
	const [urls, setUrls] = useState('');
	const [reviewImages, setReviewImages] = useState([]);
	const [imageError, setImageError] = useState('');

	useEffect(() => {
		const getReview = async () => {
			await dispatch(getSingleBusiness(businessId));
			const review = await dispatch(getSingleReview(reviewId));
			setReview(review.review);
			setStars(review.stars);
			setReviewImages(review.reviewImages);
		};

		getReview();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const reviewdata = {
			stars,
			review
		};

		const editedReview = await dispatch(updateReview(reviewdata, reviewId));
		if (editedReview.errors) {
			setReviewErrors(editedReview.errors);
		} else {
			history.push(`/business/${businessId}`);
		}
	};

	const HandleDeleteReview = async (e) => {
		e.preventDefault();

		const deleted = await dispatch(deleteReview(reviewId));

		if (deleted) history.push(`/business/${businessId}`);
	};
	const handleAddPhoto = async (e) => {
		e.preventDefault();


		const image = {
			review_id: Number(reviewId),
			url: urls
		};

		const newImage = await dispatch(postNewReviewImage(image));
		let images = reviewImages;
		images.push(newImage);
		setReviewImages(images);
		setUrls('');
		setImageError('');
	};

	const handleRemovePhoto = async (id) => {
		let images = reviewImages;
		images = images.filter((image) => image.id !== id);
		const deletePhoto = await dispatch(DeleteReviewImage(id));
		if (deletePhoto) setReviewImages(images);
	};
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
							<div className="stars-rat">
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
												className="stars-rat"
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
							Add/Remove Photos
						</div>
						<div className="rev-form-inps">
							<div id="rev-img-errs">{imageError}</div>
							<input
								type="url"
								placeholder="image url"
								className="inp-url"
								onChange={(e) => setUrls(e.target.value)}
								value={urls}
							/>
							<button
								type="add"
								className="add-a-image"
								onClick={handleAddPhoto}
							>
								Add photo
							</button>
							<div className="review-preview-image">
								{reviewImages.map((image) => (
									<div className="review-image-wrapper center">
										<img
											className="review-single-image"
											src={image.url}
											onError={({ currentTarget }) => {
												currentTarget.onerror = null;
												currentTarget.src =
													'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000';
											}}
										/>
										<div
											className="delete-review-image"
											onClick={() => handleRemovePhoto(image.id)}
										>
											remove
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="button-seperator">
							<button
								className="rev-submit"
								type="delete"
								onClick={HandleDeleteReview}
							>
								Delete Review
							</button>
							<button
								className="complete-review rev-submit"
								type="submit"
							>
								Complete
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default EditReview;
