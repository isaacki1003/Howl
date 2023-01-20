import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AddBusinessImage, getSingleBusiness, DeleteBusinessImage } from '../../store/business';

const AddImagesBusiness = ({ businessId }) => {
    const [urls, setUrls] = useState('');
	const [reviewImages, setReviewImages] = useState([]);
	const [imageError, setImageError] = useState('');
	const [hasError, setHasError] = useState(false);
	const [error, setError] = useState(false);
	const [imagesFetched, setImagesFetched] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const getBusiness = async () => {
			if (!imagesFetched) {
				const business123 = await dispatch(getSingleBusiness(businessId));
				let newArray = [];
				for (let i = 0; i < business123?.images.length; i++) {
					newArray.push(business123?.images[i].url);
				}
				setReviewImages(newArray);
				setImagesFetched(true);
			}
		};
		getBusiness();
	}, []);

    const checkPhoto = (e) => {
		e.preventDefault();

		if (!urls) {
		  setImageError('Please enter an valid image URL (ending in .jpg or .png).');
		  setHasError(true);
		  return;
		}

		if (!urls.endsWith('.jpg') && !urls.endsWith('.png')) {
		  setImageError('Please enter an image URL that ends in .jpg or .png');
		  setHasError(true);
		  return;
		}

		const img = new Image();
		img.src = urls;
		img.onload = () => {
		  let images = reviewImages;
		  images.push(urls);
		  setReviewImages(images);
		  setUrls('');
		  setImageError('');
		};
		img.onerror = () => {
		  setImageError('There was an error loading the image. Please try a different URL.');
		  setHasError(true);
		};
	}

	// const deletePhoto = async (e, index) => {
	// 	e.preventDefault();
	// 	const updatedImages = reviewImages.filter((image, i) => i !== index);
	// 	const response = await dispatch(DeleteBusinessImage(index, businessId));
	// 	if(response.message === 'Image deleted') {
	// 		setReviewImages(updatedImages);
	// 	} else {
	// 		console.log(response)
	// 	}
	// };

    const submitImages = async (e) => {
		e.preventDefault();

		const business = await dispatch(getSingleBusiness(businessId));
		for (let i = 0; i < business.images.length; i++) {
			const imageId = business.images[i].id;
			await dispatch(DeleteBusinessImage(imageId, businessId));
    	}
		console.log('reviewImages ------------------>', reviewImages)
		reviewImages.forEach(async (url, i) => {
			const imageData = {
				url,
				preview: i === 0 ? true : false,
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
			{hasError && (
				<div className="center err-bx1">{imageError}</div>
			)}
			<form
				className="business-images-form center"
				onSubmit={submitImages}
			>
				<div>
				<label className="business-large-text1">
					Let's add some images to your business profile.
                </label>
				<input
					type="url"
					placeholder="image url"
					className="bus-img-inp-xy"
					onChange={(e) => setUrls(e.target.value)}
					value={urls}
				/>
				<button type="add" className="rev-submit1" onClick={checkPhoto}>
					Add photo
				</button>
				<button className="rev-submit1 complete" type="submit">
					{reviewImages.length > 0 ? 'Complete' : "I'll add it later"}
				</button>
				</div>
				<div className="bus-prev-img-x">
					{reviewImages.map((url, index) => (
						<div>
						<img
							alt={url}
							className="add-bus-one-img"
							src={url}
							onError={({ currentTarget }) => {
								currentTarget.onerror = null;
								currentTarget.src =
									'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000';
							}}
						/>
						{/* <button className="delete-photo-button" onClick={(e) => deletePhoto(e, index)}>Delete</button> */}
					</div>
					))}
				</div>
			</form>
		</>
	);
};

export default AddImagesBusiness;
