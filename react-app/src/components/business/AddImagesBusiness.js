import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AddBusinessImage, getSingleBusiness } from '../../store/business';

const AddImagesBusiness = ({ businessId }) => {
    const [urls, setUrls] = useState('');
	const [reviewImages, setReviewImages] = useState([]);
	const [imageError, setImageError] = useState('');
	const [error, setError] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

    const checkPhoto = (e) => {
        e.preventDefault();

        let images = reviewImages;
        images.push(urls);
        setReviewImages(images);
        setUrls('');
        setImageError('');
    }

    const submitImages = async (e) => {
        e.preventDefault();

        reviewImages.forEach(async (url, i) => {
			const imageData = {
				url,
				preview: i == 0 ? true : false,
				business_id: businessId
			};

			const newImage = await dispatch(AddBusinessImage(imageData, businessId));
			if (newImage.error) setError(true);
		});

		if (!error) {
			await dispatch(getSingleBusiness(businessId));
			history.push(`/business/${businessId}`);
		}
	};

    return (
		<>
			<form
				className="business-images-form center"
				onSubmit={submitImages}
			>
				<h2>Lets add some images for your business.</h2>
				<div id="rev-img-errs">{imageError}</div>
				<input
					type="url"
					placeholder="image url"
					className="business-images-input-field"
					onChange={(e) => setUrls(e.target.value)}
					value={urls}
				/>
				<button type="add" className="add-a-image" onClick={checkPhoto}>
					Add photo
				</button>
				<div className="business-preview-image">
					{reviewImages.map((url) => (
						<img
							className="add-business-single-image"
							src={url}
							onError={({ currentTarget }) => {
								currentTarget.onerror = null;
								currentTarget.src =
									'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000';
							}}
						/>
					))}
				</div>

				<button className="submit-business-form complete" type="submit">
					{reviewImages.length > 0 ? 'Complete' : "I'll add it later"}
				</button>
			</form>
		</>
	);
};

export default AddImagesBusiness;
