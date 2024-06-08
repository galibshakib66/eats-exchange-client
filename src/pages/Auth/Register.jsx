import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Register = () => {
    const { createUser, updateInfo } = useAuth();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get("name");
        const image = form.get("image");
        const email = form.get("email");
        const password = form.get("password");

        createUser(email, password)
            .then((result) => {
                const profile = {
                    displayName: name,
                    photoURL: image,
                };
                updateInfo(result.user, profile)
                    .then(() => {
                        console.log("profile updated", result.user);
                        navigate("/");
                        toast.success("Register Successful");
                    })
                    .catch((error) => {
                        toast.error(error.message);
                    });
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    return (
        <div>
            <Helmet>
                <title>Eats Exchange | Register</title>
            </Helmet>
            <section className="min-h-[calc(100vh-116px)] flex flex-col justify-center gap-3 w-full">
                <h1 className="text-center text-4xl mb-5">Register</h1>
                <form
                    onSubmit={handleRegister}
                    className="w-full max-w-sm mx-auto"
                >
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="name"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="image"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Photo URL
                        </label>
                        <input
                            type="text"
                            id="image"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="image"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="email"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="password"
                            required
                        />
                    </div>
                    <div className="text-center">
                        <Button>Register</Button>
                    </div>
                </form>
                <p className="text-center">
                    Already have account?{" "}
                    <Link to="/login" className="text-indigo-600">
                        Login
                    </Link>
                </p>
            </section>
        </div>
    );
};

export default Register;
