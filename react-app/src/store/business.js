const GET_ALL_BUSINESSES = 'business/GET_ALL_BUSINESSES';
const GET_SINGLE_BUSINESS = 'business/GET_SINGLE_BUSINESS';
const CLEAR_BUSINESS = 'business/CLEAR_BUSINESS';

const initialState = { allBusinesses: {}, singleBusiness: {} };

const normalize = (data) => {
	const obj = {};
	data.forEach((each) => (obj[each.id] = each));
	return obj;
};

const loadAllBusinesses = (businesses) => {
	console.log(businesses); // add this line
	return {
	  type: GET_ALL_BUSINESSES,
	  businesses
	};
  };

const loadSingleBusiness = (business) => {
	return {
		type: GET_SINGLE_BUSINESS,
		business
	};
};

export const getAllBusinesses = () => async (dispatch) => {
	const response = await fetch('/api/business/');
	console.log("response IN getALLBusinesses: ", response);

	if (response.ok) {
		const data = await response.json();
		console.log("data IN getALLBusinesses: ", data);
		dispatch(loadAllBusinesses(data.businesses));
		return data.businesses;
	}
};

export const getSingleBusiness = (businessId) => async (dispatch) => {
	const response = await fetch(`/api/business/${businessId}`);

	if (response.ok) {
		const data = await response.json();
		dispatch(loadSingleBusiness(data.business));
		return data.business;
	}
};

export const createBusiness = (businessInfo) => async (dispatch) => {
	const response = await fetch(`/api/business`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(businessInfo)
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

export const editBusiness = (businessInfo, businessId) => async () => {
	const response = await fetch(`/api/business/${businessId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(businessInfo)
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

export const deleteBusiness = (id) => async () => {
	const response = await fetch(`/api/business/${id}`, {
		method: 'DELETE'
	});

	if (response.ok) {
		return true;
	}
	return false;
};

export const cleanUpBusiness = () => ({
	type: CLEAR_BUSINESS
});

export default function businessReducer(state = initialState, action) {
	const newState = { ...state };
	switch (action.type) {
		case GET_ALL_BUSINESSES:
			newState.allBusinesses = normalize(action.businesses);
			console.log("IN REDUCER: ", newState); // add this line
			return newState;
		case GET_SINGLE_BUSINESS:
			newState.singleBusiness = action.business;
			return newState;
		case CLEAR_BUSINESS:
			newState.singleBusiness = {};
			return newState;
		default:
			return state;
	}
}
