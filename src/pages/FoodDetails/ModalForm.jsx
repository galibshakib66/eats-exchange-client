import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ModalForm = ({ food }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const AdditionalNotes = form.get("AdditionalNotes");
        const DonationMoney = form.get("DonationMoney");

        const data = {
            AdditionalNotes,
            DonationMoney,
            FoodName: food.FoodName,
            FoodImage: food.FoodImage,
            FoodId: food._id,
            PickupLocation: food.PickupLocation,
            ExpiredDateTime: food.ExpiredDateTime,
            Donator: {
                Email: food.Donator?.Email,
                Name: food.Donator?.Name,
                Image: food.Donator?.Image,
            },
            Requester: {
                Email: user?.email,
                Name: user?.displayName,
                Image: user?.photoURL,
            },
            RequestDate: new Date(),
            Status: "Pending",
        };

        axiosSecure.post("/requests", data).then((res) => {
            console.log(res.data);
            document.getElementById("request-food").close();
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Request Accepted!",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="px-3 space-y-4">
            <label className="form-control w-ful">
                <div className="label">
                    <span className="label-text">Additional Notes</span>
                </div>
                <input
                    type="text"
                    placeholder="Additional Notes"
                    className="input input-bordered w-full"
                    name="AdditionalNotes"
                />
            </label>
            <label className="form-control w-ful">
                <div className="label">
                    <span className="label-text">Donation Money</span>
                </div>
                <input
                    type="text"
                    placeholder="Donation Money"
                    className="input input-bordered w-full"
                    name="DonationMoney"
                />
            </label>
            <Button>Request</Button>
        </form>
    );
};

ModalForm.propTypes = {
    food: PropTypes.object.isRequired,
};

export default ModalForm;
