import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AllBusinesses from '../business/AllBusinesses';
import { getAllBusinesses } from '../../store/business';

const Landing = () => {
	const [selected, setSelected] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const get = async () => {
			let data = await dispatch(getAllBusinesses());
			data = data.filter((business) => business.images.length > 0);
			let shuffled = data.sort(function () {
				return 0.5 - Math.random();
			});
			setSelected(shuffled.slice(0, 1));
		};
		get();
	}, [dispatch]);

	return (
		<div className="">
			<div className="landing-img-wrapper">
				{selected.map((each, i) => {
					const previewImage = each.images.filter(
						(image) => image.preview === true
					);
					return (
						<>
							<div className="landing-wrapper" key={i}>
								<img
									alt={previewImage[0].url}
									src={previewImage[0].url}
									onError={({ currentTarget }) => {
										currentTarget.onerror = null;
										currentTarget.src =
											'https://img.freepik.com/free-vector/red-grunge-style-coming-soon-design_1017-26691.jpg?w=2000';
									}}
								/>
								<NavLink
									to={`/business/${each.id}`}
									className="nav-link prev-img-nav-link"
								>
									{each.name} <br></br>
                                    {each.description}
								</NavLink>
							</div>
						</>
					);
				})}
			</div>
            <div>
                <AllBusinesses />
            </div>
			<div className='center format-footer'>
				Yelp Replica by Isaac Ki
			</div>
			<footer className='center format-footer1'>
				<a href="https://github.com/isaacki1003" target="_blank">GitHub</a> ‎ | ‎  <a href="https://www.linkedin.com/in/isaac-ki-973894111/" target="_blank">LinkedIn</a>
			</footer>
        </div>
    )
}

export default Landing;
