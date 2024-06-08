import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import Loader from "../../components/Loader/Loader";

const ProductGallery = ({ foods, isPending }) => {
    if (isPending) {
        return <Loader />;
    }

    return (
        <div className="text-gray-600 body-font">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {foods.map((food) => (
                    <div key={food._id}>
                        <div className="block relative h-56 overflow-hidden">
                            <img
                                alt={food.FoodName}
                                className="object-cover object-center rounded-lg w-full h-full block"
                                src={food.FoodImage}
                            />
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center gap-3">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                    Donated by {food.Donator.Name}
                                </h3>
                                <img
                                    src={food.Donator.Image}
                                    alt={food.Donator.Name}
                                    className="w-8 aspect-square rounded-full"
                                />
                            </div>
                            <h2 className="text-gray-900 title-font text-lg font-medium">
                                {food.FoodName}
                            </h2>
                            <p className="mt-1">
                                Quantity: {food.FoodQuantity}
                            </p>
                            <p className="mt-1">
                                Pickup Location: {food.PickupLocation}
                            </p>
                            <p className="mt-1">
                                Expires on:{" "}
                                {moment(food.ExpiredDateTime).format(
                                    "DD MMMM, YYYY"
                                )}
                            </p>
                            <p className="mt-1">
                                Notes: {food.AdditionalNotes}
                            </p>
                            <Link
                                to={`/food/${food._id}`}
                                className="inline-block mt-3"
                            >
                                <Button>View Details</Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ProductGallery.propTypes = {
    foods: PropTypes.array.isRequired,
    isPending: PropTypes.bool.isRequired,
};

export default ProductGallery;
