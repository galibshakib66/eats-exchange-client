import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Container from "../../components/Container/Container";
import ModalForm from "./ModalForm";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const FoodDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const { data: food, isPending } = useQuery({
        queryKey: ["food", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/foods/${id}`);
            return res.data;
        },
    });

    const handleModal = () => {
        if (user) {
            document.getElementById("request-food").showModal();
        } else {
            navigate("/login", { state: location.pathname });
        }
    };

    if (isPending) {
        return <Loader />;
    }

    return (
        <section className="text-gray-600 body-font overflow-hidden min-h-[calc(100vh-116px)]">
            <Helmet>
                <title>Eats Exchange | Food Details</title>
            </Helmet>
            <Container>
                <div className="py-12">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                                {food.FoodName}
                            </h1>
                            <p className="leading-relaxed mb-4">
                                {food.AdditionalNotes}
                            </p>
                            <div className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-500">Quantity</span>
                                <span className="ml-auto text-gray-900">
                                    {food.FoodQuantity}
                                </span>
                            </div>
                            <div className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-500">
                                    Pickup Location
                                </span>
                                <span className="ml-auto text-gray-900">
                                    {food.PickupLocation}
                                </span>
                            </div>
                            <div className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-500">
                                    Expired Date/Time
                                </span>
                                <span className="ml-auto text-gray-900">
                                    {new Date(
                                        food.ExpiredDateTime
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                <span className="text-gray-500">Donator</span>
                                <span className="ml-auto text-gray-900">
                                    {food.Donator.Name}
                                </span>
                            </div>
                            <button
                                onClick={handleModal}
                                className="text-white bg-indigo-500 hover:bg-indigo-600 border-0 py-2 px-6 focus:outline-none rounded w-fit"
                            >
                                Request
                            </button>
                        </div>
                        <img
                            alt="food"
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src={food.FoodImage}
                        />
                    </div>
                </div>
            </Container>
            <dialog id="request-food" className="modal">
                <div className="modal-box">
                    <ModalForm food={food} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </section>
    );
};

export default FoodDetails;
