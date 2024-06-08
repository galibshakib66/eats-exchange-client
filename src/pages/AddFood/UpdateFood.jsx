import Swal from "sweetalert2";
import Container from "../../components/Container/Container";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";

const UpdateFood = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: foodData, isPending } = useQuery({
        queryKey: ["foods", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/foods/${id}`);
            return res.data;
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("updating");
        const form = new FormData(e.currentTarget);
        const FoodName = form.get("FoodName");
        const FoodImage = form.get("FoodImage");
        const FoodQuantity = form.get("FoodQuantity");
        const PickupLocation = form.get("PickupLocation");
        const ExpiredDateTime = form.get("ExpiredDateTime");
        const AdditionalNotes = form.get("AdditionalNotes");

        const data = {
            FoodName,
            FoodImage,
            FoodQuantity: parseInt(FoodQuantity),
            PickupLocation,
            ExpiredDateTime,
            AdditionalNotes,
            Donator: {
                Name: user?.displayName,
                Image: user?.photoURL,
                Email: user?.email,
            },
        };

        axiosSecure.put(`/foods/${id}`, data).then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount) {
                Swal.fire({
                    icon: "success",
                    title: "Food Updated!",
                    text: "The Food has been added successfully.",
                    showConfirmButton: false,
                    timer: 2000,
                });
                navigate("/manage-my-foods");
            }
        });
    };

    if (isPending) {
        return <Loader />;
    }

    return (
        <section className="py-12 min-h-[calc(100vh-116px)]">
            <Helmet>
                <title>Eats Exchange | Update Food</title>
            </Helmet>
            <Container>
                <SectionHeading
                    heading="Share Your Harvest: Add Your Contribution"
                    subHeading="Got extra? List your surplus food here and turn waste into wellness"
                />
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="FoodName"
                                id="FoodName"
                                defaultValue={foodData.FoodName}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="FoodName"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Food Name
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="url"
                                name="FoodImage"
                                id="FoodImage"
                                defaultValue={foodData.FoodImage}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="FoodImage"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Food Image URL
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="FoodQuantity"
                                id="FoodQuantity"
                                defaultValue={foodData.FoodQuantity}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="FoodQuantity"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Food Quantity
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="date"
                                name="ExpiredDateTime"
                                id="ExpiredDateTime"
                                defaultValue={foodData.ExpiredDateTime}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="ExpiredDateTime"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Expired Date
                            </label>
                        </div>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="PickupLocation"
                            id="PickupLocation"
                            defaultValue={foodData.PickupLocation}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="PickupLocation"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Pickup Location
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="AdditionalNotes"
                            id="AdditionalNotes"
                            defaultValue={foodData.AdditionalNotes}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="AdditionalNotes"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Additional Notes
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Update Donation
                    </button>
                </form>
            </Container>
        </section>
    );
};

export default UpdateFood;
