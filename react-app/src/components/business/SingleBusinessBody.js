import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { deleteBusiness } from "../../store/business";
import SingleBusinessReviews from "../reviews/SingleBusinessReviews";

const SingleBusinessBody = ({ business }) => {
    const user = useSelector(state => state.session.user);

    const { businessId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

	if (!business) {
		return <div>Loading...</div>;
	  }

    const handleDelete = async (e) => {
        if (
			window.confirm(
				'Once deleted, this business will be gone forever. Are you sure you want to delete this business?'
			)
		) {
			const deleted = await dispatch(deleteBusiness(businessId));
			if (deleted) history.push('/');
		}
	};

    const theOwner = user?.id == business.owner_id;

    return (
		<div className="business-details-body-wrapper">
			<div className="business-details-container">
				{!theOwner && (
					<div className="create-reviews-wrapper">
						<NavLink
							to={`/business/${businessId}/create-review`}
							className="create-new-review-link"
						>
							<i className="fa-regular fa-star" /> Write a review
						</NavLink>
					</div>
				)}
				{theOwner && (
					<div className="create-reviews-wrapper">
						<NavLink
							to={`/business/${businessId}/edit`}
							className="create-new-review-link"
						>
							<i className="fa-regular fa-star" /> Edit Business
						</NavLink>
						<button
							className="create-new-review-link-button"
							onClick={handleDelete}
						>
							<i class="fa-solid fa-x"></i>  ‎
							Delete Business
						</button>
					</div>
				)}
				<div className="business-details-block">
					<h1>About the business</h1>
					<div className="business-details-description">
						{business.description}
					</div>
				</div>

				<div className="business-details-block">
					<h1>Reviews</h1>
					<SingleBusinessReviews business={business} />
				</div>

			</div>
			<div className="business-details-right-Col">
				<div className="additional-details-box">
					{business.business_web_page && (
						<div className="business-right-details">
							<a
								href={business.business_web_page}
								style={{ color: '#49B1CB' }}
								target="__blank"
							>
								{business.business_web_page}
							</a>
							<i className="fa-solid fa-arrow-up-right-from-square"></i>
						</div>
					)}
					<div className="business-right-details">
						{business.phone_number}
						<i className="fa-solid fa-phone-volume"></i>
					</div>
					<div className="business-right-details no-border">
						<div>
							{business.address} {business.city}, {business.state}{' '}
							{business.zip}
						</div>
						<i className="fa-solid fa-location-dot"></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleBusinessBody;
