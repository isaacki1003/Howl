const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS';
const GET_REVIEW = 'review/GET_REVIEW';
const GET_SINGLE_BUSINESS_REVIEWS = 'reviews/GET_SINGLE_BUSINESS_REVIEWS';

const initialstate = { allReviews: {}, singleReview: {}, businessReviews: {} };

const normalize = (data) => {
	const obj = {};
	data.forEach((each) => (obj[each.id] = each));
	return obj;
  };

const loadAllReviews = (reviews) => ({
	type: GET_ALL_REVIEWS,
	reviews
});

const loadSingleReview = (review) => ({
	type: GET_REVIEW,
	review
});

const loadBusinessReviews = (reviews) => ({
	type: GET_SINGLE_BUSINESS_REVIEWS,
	reviews
});

export const getAllReviews = () => async (dispatch) => {
	const response = await fetch('/api/reviews');

	if (response.ok) {
		const data = await response.json();
		dispatch(loadAllReviews(data.reviews));
		return data.reviews;
	}
};

export const getSingleReview = (review_id) => async (dispatch) => {
	const response = await fetch(`/api/reviews/${review_id}`);

	if (response.ok) {
		const data = await response.json();
		dispatch(loadSingleReview(data));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.messsage) {
			return data;
		}
	}
};

export const deleteReview = (review_id) => async (dispatch) => {
	const response = await fetch(`/api/reviews/${review_id}`, {
		method: 'DELETE'
	});

	if (response.ok) {
		return true;
	} else return false;
};

export const DeleteReviewImage = (image_id) => async () => {
	const response = await fetch(`/api/reviews/images/${image_id}`, {
		method: 'DELETE'
	});

	if (response.ok) {
		return true;
	} else {
		return false;
	}
};

export const getSingleBusinessReviews = (businessId) => async (dispatch) => {
	const response = await fetch(`/api/business/${businessId}/reviews`);

	if (response.ok) {
		const data = await response.json();
		dispatch(loadBusinessReviews(data.reviews));
		console.log(data.reviews)
		return data.reviews;
	}
};

export const updateReview = (reviewInfo, reviewId) => async () => {
	const response = await fetch(`/api/reviews/${reviewId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(reviewInfo)
	});

	if (response.ok) {
		const data = await response.json();
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	}
};

export const postNewReview = (reviewInfo) => async (dispatch) => {
	const { Business_id } = reviewInfo;
	const response = await fetch(`/api/business/${Business_id}/reviews`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(reviewInfo)
	});
	console.log(response)
	if (response.ok) {
		const data = await response.json();
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	}
};

export const postNewReviewImage = (imageData) => async (dispatch) => {
	const { review_id } = imageData;
	const response = await fetch(`/api/reviews/${review_id}/images`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(imageData)
	});

	if (response.ok) {
		const data = await response.json();
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	}
};

export default function reviewReducer(state = initialstate, action) {
	const newState = { ...state };
	switch (action.type) {
		case GET_ALL_REVIEWS:
			newState.allReviews = normalize(action.reviews);
			return newState;
		case GET_SINGLE_BUSINESS_REVIEWS:
			newState.businessReviews = normalize(action.reviews);
			return newState;
		case GET_REVIEW:
			newState.singleReview = action.review;
			return newState;
		default:
			return state;
	}
}
