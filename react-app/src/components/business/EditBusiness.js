import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getSingleBusiness, editBusiness } from '../../store/business';
import states from '../../UsStates';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function formatPhoneNumber(value) {
	if (!value) return value;
	const phoneNumber = value.replace(/[^\d]/g, '');
	const phoneNumberLength = phoneNumber.length;
	if (phoneNumberLength < 4) return phoneNumber;

	if (phoneNumberLength < 7) {
		return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
	}
	return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}
-${phoneNumber.slice(6, 10)}`;
}

const EditBusiness = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zip_code, setZipCode] = useState('');
    const [description, setDescription] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [hours, setHours] = useState([]);
    const [day, setDay] = useState('Mon');
    const [openHour, setOpenHour] = useState('');
	const [closeHour, setCloseHour] = useState('');
    const [displayHours, setDisplayHours] = useState([]);
    const [hourError, setHourError] = useState('');
    const [haveErrors, setHaveErrors] = useState(false);
    const [business_type, setBusinessType] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const user = useSelector((state) => state.session.user);
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const getBusiness = async () => {
            const business = await dispatch(getSingleBusiness(businessId));
            let OpHours = business.hours;
				OpHours = OpHours.split(',');
				setHours(OpHours);
				let operating = OpHours.map((eachDay) => {
                    eachDay = eachDay.split('-');
                    if (eachDay[1] !== 'Closed') {
                        const openHour = eachDay[1].split(':'); //  ['11', '30']
                        const closeHour = eachDay[2].split(':'); // ['21', '30']
                        openHour[1] =
                            Number(openHour[0]) > 11
                                ? openHour[1] + ' PM'
                                : openHour[1] + ' AM';
                        closeHour[1] =
                            Number(closeHour[0]) > 11
                                ? closeHour[1] + ' PM'
                                : closeHour[1] + ' AM';
                        openHour[0] = ((Number(openHour[0]) + 11) % 12) + 1;
                        closeHour[0] = ((Number(closeHour[0]) + 11) % 12) + 1;
                        eachDay[1] = openHour.join(':') + ' - ' + closeHour.join(':');
                        return eachDay.slice(0, 2);
                    }
                    return eachDay;
                });
                setDisplayHours(operating)
            if (business) {
                setName(business.name);
                setAddress(business.address);
                setCity(business.city);
                setState(business.state);
                setCountry(business.country);
                setZipCode(business.zip_code);
                setDescription(business.description);
                setPhoneNumber(business.phone_number);
                setBusinessType(business.business_type);
                setPrice(business.price);
                setUrl(business.url);
            }
        };
        getBusiness();
    }, [businessId, dispatch]);

    const addHours = (e) => {
        e.preventDefault();

        if (openHour >= closeHour) {
            return setHourError('Open hour must be before close hour.');
        }

        const dayIndex = days.indexOf(day);

        const dayAlreadyExists = hours.some((existingHour) => existingHour.startsWith(day));
        if (dayAlreadyExists) {
            return setHourError('Operation hours for that day have already been set.');
        }

        // split openHour and closeHour into hours and minutes
        const openHourSplit = openHour.split(':');
        const closeHourSplit = closeHour.split(':');

        // add AM or PM to the minutes
        const openHourAMPM = Math.floor(Number(openHourSplit[0]) / 12) >= 1 ? 'PM' : 'AM';
        const closeHourAMPM = Math.floor(Number(closeHourSplit[0]) / 12) >= 1 ? 'PM' : 'AM';

        // convert the hours to 12-hour format
        const openHour12 = (Number(openHourSplit[0]) % 12) || 12;
        const closeHour12 = (Number(closeHourSplit[0]) % 12) || 12;

        // combine the hours and minutes with AM/PM
        const openHourFormatted = `${openHour12}:${openHourSplit[1]} ${openHourAMPM}`;
        const closeHourFormatted = `${closeHour12}:${closeHourSplit[1]} ${closeHourAMPM}`;

        // join the day, open hour, and close hour with hyphens
        const formattedHour = `${day}-${openHourSplit[0]}:${openHourSplit[1]}-${closeHourSplit[0]}:${closeHourSplit[1]}`;

        setHours([
            ...hours.slice(0, dayIndex),
            formattedHour,
            ...hours.slice(dayIndex),
        ]);
        setDisplayHours([
            ...displayHours.slice(0, dayIndex),
            [day, `${openHourFormatted} - ${closeHourFormatted}`],
            ...displayHours.slice(dayIndex),
        ]);
    }

	const removeHour = (index) => {
        const day = displayHours[index][0];
        setHours(hours.filter((hour) => !hour.startsWith(day)));
        setDisplayHours(displayHours.filter((hour) => !hour[0].startsWith(day)));
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === '' || name.length > 200) {
            setErrors([...errors, 'Name must be between 1 and 200 characters.']);
            setHaveErrors(true);
        }
        if (address === '' || address.length > 150) {
            setErrors([...errors, 'Address must be between 1 and 150 characters.']);
            setHaveErrors(true);
        }
        if (city === '' || city.length > 50) {
            setErrors([...errors, 'City must be between 1 and 50 characters.']);
            setHaveErrors(true);
        }
        if (state === '' || state.length > 50) {
            setErrors([...errors, 'State must be between 1 and 50 characters.']);
            setHaveErrors(true);
        }
        if (country === '' || country.length > 50) {
            setErrors([...errors, 'Country must be between 1 and 50 characters.']);
            setHaveErrors(true);
        }
        if (zip_code === '' || zip_code.length > 15 || !/^[\d-]+$/.test(zip_code)) {
            setErrors([...errors, 'Postal code must contain only numbers and the character "-"']);
            setHaveErrors(true);
        }
        if (description === '' || description.length > 250) {
            setErrors([...errors, 'Description must be between 1 and 250 characters.']);
            setHaveErrors(true);
        }
        if (phone_number === '' || phone_number.length !== 14) {
            setErrors([...errors, 'Phone number must be 10 characters.']);
            setHaveErrors(true);
        }
        if (hours.length === 0 || hours.length > 400) {
            setErrors([...errors, 'Business hours must be between 1 and 400 characters.']);
            setHaveErrors(true);
        }
        if (business_type === '' || business_type.length > 250) {
            setErrors([...errors, 'Business type must be between 1 and 250 characters.']);
            setHaveErrors(true);
        }
        if (price === '' || price < 1 || price > 5000) {
            setErrors([...errors, 'Price must be between $1 and $5,000.']);
            setHaveErrors(true);
        }
        if (url !== '' && (!/^https?:\/\/[^\s]+$/.test(url) || url.length > 250)) {
            setErrors([...errors, 'Business page URL must be a valid URL and must be less than 250 characters.']);
            setHaveErrors(true);
        }
            let res_opHours = hours;
            let closedDays = days.filter(
                (day) => !hours.join(',').includes(day)
            );
            closedDays = closedDays.map((day) => day + '-Closed');
            res_opHours = res_opHours.concat(closedDays);
            const businessInfo = {
                owner_id: user.id,
                name,
                address,
                city,
                state,
                country,
                zip_code,
                description,
                phone_number: String(phone_number),
                hours: res_opHours.join(','),
                business_type,
                price: Number(price),
                url,
        };
            console.log(businessInfo)
            console.log(businessId)
            const business2 = await dispatch(editBusiness(businessInfo, businessId));

            if (business2.errors) {
			setErrors(business2.errors);
		    } else {
			await dispatch(getSingleBusiness(businessId));
			history.push(`/business/${businessId}`);
		}
    }

    return (
        <div>
            <div className="red-top-bar center">
				<NavLink className="nav-link logo-name" to="/">
					HOWL
				</NavLink>
			</div>
            <div className='center'>
				{haveErrors && (
					<div className="center err-bx1">
						{errors?.map((error, ind) => (
							<div>{error} ‎   </div>
						))}
						<p
							className="close-err-msg"
							onClick={() => setErrors(false)}
						>
							‎ ‎ X
						</p>
					</div>
				)}
			</div>
            <div className="create-business-container">
				<div className="left-side">

                    <form onSubmit={handleSubmit}>

                        <label className="business-large-text">
                            Hello! Let’s update your business name.
                        </label>
                        <label className="business-small-text">
                            We’ll use this information to help you claim your Howl page.
                        </label>
                        <input
                            type="text"
                            className="business-label-short"
                            name="name"
                            value={name}
                            placeholder="e.g. Mario's Plumber"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label className="business-large-text">
                            Give customers a phone number so they can call your business
                        </label>
                        <label className="business-small-text">
                            Update your phone number to help customers connect with you.
                        </label>
                        <input
                            type="text"
                            className="business-label-short"
                            name="phone"
                            value={phone_number}
                            placeholder="e.g. 555 555-5555"
                            onChange={(e) =>
                                setPhoneNumber(formatPhoneNumber(e.target.value))
                            }
                        />

                        <label className="business-large-text">
                            Want to update your business website?
                        </label>
                        <label className="business-small-text">
                            Tell your customers where they can find more information about your business.
                        </label>
                        <input
                            type="text"
                            name="url"
                            className="business-label-short"
                            value={url}
                            placeholder="e.g. https://www.your-website.com"
                            onChange={(e) => setUrl(e.target.value)}
                        />

                        <label className="business-large-text">
                            What kind of business are you in?
                        </label>
                        <label className="business-small-text">
                            Help customers find your product and service. You can add up to 3 categories that best describe what your core business is.
                        </label>
                        <input
                            type="text"
                            name="business_type"
                            className="business-label-short"
                            value={business_type}
                            placeholder="e.g. Cajun/Creole, Seafood, Soup"
                            onChange={(e) => setBusinessType(e.target.value)}
                        />

                        <label className="business-large-text">
                            What is your business address?
                        </label>
                        <label className="business-small-text1">
                            Enter the address for where your customers can find you.
                        </label>
                        <label className="business-label-address-small">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            className="business-label-short-address"
                            value={address}
                            placeholder="e.g. 123 Main Street"
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <label className="business-label-address-small">
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            className="business-label-short-address"
                            value={city}
                            placeholder="e.g. San Francisco"
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <label className="business-label-address-small">
                            State
                        </label>
                        <select
                            type="text"
                            name="state"
                            className="business-label-short-address"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        >
                        {states.map((state) => (
                            <option value={state.value}>{state.label}</option>
                        ))}
                        </select>

                        <label className="business-label-address-small">
                            Zip
                        </label>
                        <input
                            type="text"
                            name="zip_code"
                            className="business-label-short-address1"
                            value={zip_code}
                            placeholder="e.g. 94103"
                            onChange={(e) => setZipCode(e.target.value)}
                        />


                        <label className="business-large-text">
                            What is your average price?
                        </label>
                        <label className="business-small-text">
                            How much does each customer normally spend at your
                            establishment?
                        </label>
                        <input
                            type="number"
                            min={1}
                            className="business-label-short"
                            name="price"
                            placeholder="$24"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label className="business-large-text">
                            What are your business hours?
                        </label>
                        <label className="business-small-text">
                            Please do not add for days you are closed.
                        </label>
                        <div className="business-frm-err">{hourError}</div>
						<div className="add-hours-wrapper">
							<select
								type="text"
								name="day"
								value={day}
								onChange={(e) => setDay(e.target.value)}
							>
								{' '}
								{days.map((day) => (
									<option value={day}>{day}</option>
								))}
							</select>
							<input
								className="business-input-field-hour"
								type="time"
								value={openHour}
								name="openHour"
								onChange={(e) => setOpenHour(e.target.value)}
							/>
							<input
								className="business-input-field-hour"
								type="time"
								value={closeHour}
								name="closeHour"
								onChange={(e) => setCloseHour(e.target.value)}
							/>
							<button type="add-hour" onClick={addHours}>
								Add Hours
							</button>
						</div>
                        <div className="display-hours-container">
							{displayHours.map((each, i) => (
								<div className="display-single-hour">
									<div>{each[0]}</div>
									<div>{each[1]}</div>
									<div
										className="remove-display-hour"
										onClick={() => removeHour(i)}
									>
										remove
									</div>
								</div>
							))}
						</div>

                        <label className="business-large-text">
                            What is your business like?
                        </label>
                        <label className="business-small-text">
                            Please provide a description about your business.
                        </label>
                        <textarea
                            name="description"
                            className="business-label-long"
                            value={description}
                            placeholder='e.g. "We are a family owned and operated restaurant that has been serving the community for over 30 years. We pride ourselves on our authentic Italian cuisine and our friendly staff. We are open for lunch and dinner and offer a full bar. We also have a private dining room that can accommodate up to 50 people. We look forward to serving you!"'
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button className="create-business-button" type="submit">
                            Next
                        </button>
                    </form>
                </div>
            </div>
            <div>
                <img className='calcifer-create' src="https://i.redd.it/jjr3eurvhzt71.jpg" alt="calcifer-img-1" />
            </div>
        </div>
    )
};

export default EditBusiness;
