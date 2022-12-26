const GET_ALL_BUSINESSES = 'business/GET_ALL_BUSINESSES';
const GET_SINGLE_BUSINESS = 'business/GET_SINGLE_BUSINESS';
const CLEAR_BUSINESS = 'business/CLEAR_BUSINESS';

const initialState = { allBusinesses: {}, singleBusiness: {} };

const normalize = (data) => {
	if (!data || !Array.isArray(data)) {
	  return {};
	}
	const obj = {};
	data.forEach((each) => (obj[each.id] = each));
	return obj;
  };


const loadAllBusinesses = (buss) => {
	return {
	  type: GET_ALL_BUSINESSES,
	  buss
	};
};

const loadSingleBusiness = (bus) => {
	return {
		type: GET_SINGLE_BUSINESS,
		bus
	};
};

export const getAllBusinesses = () => async (dispatch) => {
	const response = await fetch('/api/business');

	if (response.ok) {
		const data = await response.json();
		dispatch(loadAllBusinesses(data.businesses));
		return data.businesses;
	}
};

export const getSingleBusiness = (business_id) => async (dispatch) => {
	const response = await fetch(`/api/business/${business_id}`);

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

export const editBusiness = (business_info, business_id) => async () => {
	const response = await fetch(`/api/business/${business_id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(business_info)
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

export const deleteBusiness = (business_id) => async () => {
	const response = await fetch(`/api/business/${business_id}`, {
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
