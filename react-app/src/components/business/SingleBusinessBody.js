import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { deleteBusiness } from "../../store/business";

const SingleBusinessBody = ({ business }) => {
    const user = useSelector(state => state.session.user);
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

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
							to={`/${businessId}/new-review`}
							className="create-new-review-link"
						>
							<i class="fa-regular fa-star" /> Write a review
						</NavLink>
					</div>
				)}
				{theOwner && (
					<div className="create-reviews-wrapper">
						<NavLink
							to={`/business/${businessId}/edit`}
							className="create-new-review-link"
						>
							<i class="fa-regular fa-star" /> Edit Business
						</NavLink>
						<button
							className="create-new-review-link-button"
							onClick={handleDelete}
						>
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

				 {/* INSERT REVIEWS HERE  */}

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
							<i class="fa-solid fa-arrow-up-right-from-square"></i>
						</div>
					)}
					<div className="business-right-details">
						{business.phone_number}
						<i class="fa-solid fa-phone-volume"></i>
					</div>
					<div className="business-right-details no-border">
						<div>
							{business.address} {business.city}, {business.state}{' '}
							{business.zip}
						</div>
						<i class="fa-solid fa-location-dot"></i>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleBusinessBody;
