import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { googleLogin, signInWithPassword } = useAuth();

    const successTask = (result) => {
        console.log(result.user);
        toast.success("Login Successful");
        location.state ? navigate(location.state) : navigate("/");
    };

    const handlePasswordLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");
        signInWithPassword(email, password)
            .then((result) => {
                successTask(result);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };
    const handleSignInWithGoogle = () => {
        googleLogin()
            .then((result) => {
                successTask(result);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };
    return (
        <>
            <Helmet>
                <title>Eats Exchange | Login</title>
            </Helmet>
            <section className="min-h-[calc(100vh-116px)] flex flex-col justify-center gap-3 w-full max-w-sm mx-auto">
                <h1 className="text-center text-4xl mb-5">Login</h1>
                <form onSubmit={handlePasswordLogin}>
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
                        <Button>Login</Button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <button
                        type="button"
                        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 w-fit"
                        onClick={handleSignInWithGoogle}
                    >
                        <svg
                            className="w-4 h-4 me-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 19"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Sign in with Google
                    </button>
                </div>
                <p className="text-center">
                    New here?{" "}
                    <Link to="/register" className="text-indigo-600">
                        Register
                    </Link>
                </p>
            </section>
        </>
    );
};

export default Login;
