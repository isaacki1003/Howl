import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getSingleBusiness, editBusiness } from '../../store/business';

const EditBusiness = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zip_code, setZipCode] = useState('');
    const [description, setDescription] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [hours, setHours] = useState('');
    const [business_type, setBusinessType] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const user = useSelector((state) => state.session.user);
    const business = useSelector((state) => state.business.singleBusiness);
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const getBusiness = async () => {
            const business = await dispatch(getSingleBusiness(businessId));
            if (business) {
                setName(business.name);
                setAddress(business.address);
                setCity(business.city);
                setState(business.state);
                setCountry(business.country);
                setZipCode(business.zip_code);
                setDescription(business.description);
                setPhoneNumber(business.phone_number);
                setHours(business.hours);
                setBusinessType(business.business_type);
                setPrice(business.price);
                setUrl(business.url);
            }
        };
        getBusiness();
    }, [businessId]);

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
            business_type,
            price: Number(price),
            url,
            // might not need line above since nullable
        };

        const business2 = await dispatch(editBusiness(payload, businessId));
        await dispatch(getSingleBusiness(businessId));
        history.push(`/${businessId}`);
        }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <label className="">
                    Hello! Let’s start with your business name
                </label>
                <label className="">
                    We’ll use this information to help you claim your Yelp page.
                </label>
                <label className="">Your business name</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="e.g. Mario's Plumber"
                    onChange={(e) => setName(e.target.value)}
                />

                <label className="">
                    Give customers a phone number so they can call your business
                </label>
                <label className="">
                    Add your phone number to help customers connect with you.
                </label>
                <label className="">
                    Business phone number
                </label>
                <input
                    type="text"
                    name="phone"
                    value={phone_number}
                    placeholder="e.g. 555 555-5555"
                    onChange={(e) =>
                        setPhoneNumber(e.target.value)
                    }
                />

                <label className="">
                    Do you have a business website?
                </label>
                <label className="">
                    Tell your customers where they can find more information about your business.
                </label>
                <label className="">
                    Website
                </label>
                <input
                    type="text"
                    name="url"
                    value={url}
                    placeholder="e.g. https://www.your-website.com"
                    onChange={(e) => setUrl(e.target.value)}
                />

                <label className="">
                    What kind of business are you in?
                </label>
                <label className="">
                    Help customers find your product and service. You can add up to 3 categories that best describe what your core business is.
                </label>
                <label className="">Categories</label>
                <input
                    type="text"
                    name="business_type"
                    value={business_type}
                    placeholder="e.g. Cajun/Creole, Seafood, Soup"
                    onChange={(e) => setBusinessType(e.target.value)}
                />

                <label className="">
                    What is your business address?
                </label>
                <label className="">
                    Enter the address for where your customers can find you.
                </label>
                <label className="">
                    Business Address
                </label>
                <label className="">
                    Address
                </label>
                <input
                    type="text"
                    name="address"
                    value={address}
                    placeholder="e.g. 123 Main Street"
                    onChange={(e) => setAddress(e.target.value)}
                />

                <label className="">
                    City
                </label>
                <input
                    type="text"
                    name="city"
                    value={city}
                    placeholder="e.g. San Francisco"
                    onChange={(e) => setCity(e.target.value)}
                />

                <label className="">
                    State
                </label>
                <select
                    type="text"
                    name="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                >
                </select>

                <label className="">
                    Zip
                </label>
                <input
                    type="text"
                    name="zip_code"
                    value={zip_code}
                    placeholder="e.g. 94103"
                    onChange={(e) => setZipCode(e.target.value)}
                />


                <label className="">
                    What is your average price?
                </label>
                <label className="">
                    How much does each customer normally spend at your
                    establishment.
                </label>
                <label className="">
                    Price
                </label>
                <input
                    type="number"
                    min={1}
                    name="price"
                    placeholder="$24"
                    onChange={(e) => setPrice(e.target.value)}
                />

                <label className="">
                    What is your business like?
                </label>
                <label className="">
                    Please provide a description about your business.
                </label>
                <label className="">
                    Description
                </label>
                <textarea
                    name="description"
                    placeholder='e.g. "We are a family owned and operated restaurant that has been serving the community for over 30 years. We pride ourselves on our authentic Italian cuisine and our friendly staff. We are open for lunch and dinner and offer a full bar. We also have a private dining room that can accommodate up to 50 people. We look forward to serving you!"'
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">
                    Next
                </button>
            </form>
        </div>
    )

};

export default EditBusiness;
