import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { createBusiness } from '../../store/business';
import AddImagesBusiness from './AddImagesBusiness';


const CreateBusiness = () => {
    const [businessId, setBusinessId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zip_code, setZipCode] = useState('');
    const [description, setDescription] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [hours, setHours] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState([]);


    const user = useSelector((state) => state.session.user);


    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            owner_id: user.id,
            name,
            address,
            city,
            state,
            country,
            zip_code,
            description,
            phone_number,
            hours,
            type,
            price: Number(price),
            url,
            // might not need line above since nullable
        };

        const business = await dispatch(createBusiness(payload));
        if (business.errors) {
            setErrors(business.errors);
        } else {
            setBusinessId(business.id);
            console.log(payload)
            history.push(`/business/${business.id}`);
        }
    };

    return (
        <div>
            <div className="red-top-bar center">
				<NavLink className="nav-link logo-name" to="/">
					HOWL
				</NavLink>
			</div>
            <div className="create-business-container">
				<div className="left-side">

                    <form onSubmit={handleSubmit}>

                            <label className="business-large-text">
                                Hello! Let’s start with your business name.
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
                                Give customers a phone number so they can call your business.
                            </label>
                            <label className="business-small-text">
                                Add your phone number to help customers connect with you.
                            </label>
                            <input
                                type="text"
                                className="business-label-short"
                                name="phone"
                                value={phone_number}
                                placeholder="e.g. 555 555-5555"
                                onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                }
                            />

                            <label className="business-large-text">
                                Do you have a business website?
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
                                name="type"
                                className="business-label-short"
                                value={type}
                                placeholder="e.g. Cajun/Creole, Seafood, Soup"
                                onChange={(e) => setType(e.target.value)}
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
                                className="business-label-short-state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            >
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
                                name="price"
                                className="business-label-short"
                                placeholder="$24"
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <label className="business-large-text">
                                What is your business like?
                            </label>
                            <label className="business-small-text">
                                Please provide a description about your business.
                            </label>
                            <textarea
                                name="description"
                                className="business-label-long"
                                placeholder='e.g. "We are a family owned and operated restaurant that has been serving the community for over 30 years. We pride ourselves on our authentic Italian cuisine and our friendly staff. We are open for lunch and dinner and offer a full bar. We also have a private dining room that can accommodate up to 50 people. We look forward to serving you!"'
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <button className="create-business-button" type="submit">
                                Next
                            </button>
                    </form>
                    {<AddImagesBusiness businessId={businessId} />}
                </div>
            </div>
            <div>
                <img className='calcifer-create' src="https://i.redd.it/jjr3eurvhzt71.jpg" alt="calcifer photo" />
            </div>
        </div>
    )
}

export default CreateBusiness;
