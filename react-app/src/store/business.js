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


const loadAllBusinesses = (bussinesses) => {
	return {
	  type: GET_ALL_BUSINESSES,
	  bussinesses
	};
};

const loadSingleBusiness = (business) => {
	return {
		type: GET_SINGLE_BUSINESS,
		business
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
	// console.log(response)

	if (response.ok) {
		const data = await response.json();
		dispatch(loadSingleBusiness(data.business));
		return data.business;
	}
};

export const createBusiness = (businessInfo) => async (dispatch) => {
	console.log(businessInfo)
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

export const editBusiness = (businessInfo, id) => async () => {
	console.log(businessInfo)
	console.log(id)
	const response = await fetch(`/api/business/${id}`, {
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

export const deleteBusiness = (business_id) => async () => {
	const response = await fetch(`/api/business/${business_id}`, {
		method: 'DELETE'
	});

	if (response.ok) {
		return true;
	}
	return false;
};

export const AddBusinessImage = (imagedata, businessId) => async () => {
	const response = await fetch(`/api/business/${businessId}/images`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(imagedata)
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

export const DeleteBusinessImage = (imageId, businessId) => async () => {
	try {
	  const response = await fetch(`/api/business/${businessId}/images/${imageId}`, {
		method: 'DELETE'
	  });

	  if (response.ok) {
		  const data = await response.json();
		  return data;
	  }else {
		  throw new Error(response.statusText);
	  }
	} catch (error) {
	  console.error(error);
	  return error;
	}
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
