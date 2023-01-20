import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAllBusinesses } from '../../store/business';
// import GoogleMapAllBusiness from '../GoogleMapMultipleBusinesses';
import SearchCard from './SearchCard';

const SearchResultPage = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const params = new URLSearchParams(location.search);
	const keyword = params.get('desc');
	const loc = params.get('loc');

    const [allBusinesses, setAllBusinesses] = useState([]);
	const [filteredBusinesses, setFilteredBusinesses] = useState([]);
	const [foundBusinesses, setFoundBusinesses] = useState([]);
	const [page, setPage] = useState(0);
	const [numPage, setNumPage] = useState([]);

	useEffect(() => {
		const test = async () => {
            let res = await dispatch(getAllBusinesses());
            setAllBusinesses(res);
        }
        test();
	}, []);

	useEffect(() => {
		if (allBusinesses.length) {
			let foundBusinessses = allBusinesses.filter((business) => {
				if (keyword) {
					if (
						business.name.toLowerCase().includes(keyword.toLowerCase()) ||
						business.business_type
							.toLowerCase()
							.includes(keyword.toLowerCase())
					)
						return business;
				} else if (loc) {
					if (
						loc.includes(business.city) ||
						loc.includes(business.state) ||
						loc.includes(business.zip_code)
					)
						return business;
				}
			});
			let uniqueBusinesses = foundBusinessses.reduce((acc, curr) => {
				if (!acc.find(item => item.name === curr.name)) {
					acc.push(curr);
				}
				return acc;
			}, []);
			let numPage = Math.ceil(uniqueBusinesses.length / 4);
			setFilteredBusinesses(uniqueBusinesses.slice(0, 4));
			setNumPage(new Array(numPage).fill(null));
			setFoundBusinesses(uniqueBusinesses);
		}
	}, [allBusinesses.length, keyword, loc]);

	useEffect(() => {
        if (foundBusinesses.length) {
            if (page * 4 >= foundBusinesses.length) {
                setFilteredBusinesses([]);
            } else {
                const start = page * 4;
                const end = start + 4;
                setFilteredBusinesses(foundBusinesses.slice(start, end));
            }
        }
    }, [page, foundBusinesses]);

    const handlePrevPage = (event) => {
        if (page <= 0) {
            event.preventDefault();
		} else {
            setPage(Math.max(0, page - 1));
        }
    }

    const handleNextPage = (event) => {
        if (page * 4 >= foundBusinesses.length) {
            event.preventDefault();
        } else {
            setPage(Math.min(Math.ceil(foundBusinesses.length/4)-1, page + 1));
        }
    }

    useEffect(() => {
        setPage(0);
    }, []);


	return (
        <div className="search-result-page-wrapper">
            <div className="search-result-left-col">
                <div>
                    <h1 className="search-result-page-title">
                        {keyword ? `Best "${keyword}"` : 'Businesses'} {loc ? 'in' : 'matches'}{' '}
                        {loc}
                    </h1>
                    <div className="search-result-found-wrapper">
                        {filteredBusinesses.length == 0 ? (
                            <div className="search-result-not-found">No Results Found</div>
                        ) : (
                            filteredBusinesses.map((business) => (
                                <SearchCard key={business.id} business={business} />
                            ))
                        )}
                    </div>
                    <div className="search-result-pagination">
                        <button
                            className="search-result-pagination-prev"
                            onClick={handlePrevPage}
                            disabled={page <= 0}
                        >
                            Prev
                        </button>
                        {numPage.map((_, i) => (
                            <button
                                key={i}
                                className={`search-result-pagination-page ${
                                    i === page ? 'active' : ''
                                }`}
                                onClick={() => setPage(i)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className="search-result-pagination-next"
                            onClick={handleNextPage}
                            disabled={page * 4 >= foundBusinesses.length}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
			{/* <div className="search-result-right-col">
				<GoogleMapAllBusiness
					businesses={filteredBusinesses}
					selectedBusiness={selectedBusiness}
				/>
			</div> */}
		</div>
	);
};

export default SearchResultPage;
