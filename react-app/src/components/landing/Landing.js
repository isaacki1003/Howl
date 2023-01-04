import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AllBusinesses from '../business/AllBusinesses';
import { getAllBusinesses } from '../../store/business';

const Landing = () => {
    const allBusinesses = useSelector((state) => state.business.allBusinesses);
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
	}, []);

	return (
		<div className="">
			<div className="landing-img-wrapper">
				{selected.map((each, i) => {
					const previewImage = each.images.filter(
						(image) => image.preview == true
					);
					return (
						<>
							<div className="landing-wrapper" key={i}>
								<img
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
        </div>
    )
}

export default Landing;
