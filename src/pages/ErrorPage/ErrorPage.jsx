import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col gap-3 justify-center items-center h-screen">
            <Helmet>
                <title>Travel Guru | 404</title>
            </Helmet>
            <img src="/oops.png" alt="error" className="w-[30%]" />
            <h3 className="font-bold text-2xl">404 - PAGE NOT FOUND</h3>
            <p className="max-w-md text-center text-[#6A6A6A]">
                The page you are looking for might have been removed had its
                name changed or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="btn bg-[#0145d4] border-0 hover:bg-[#4577e2] text-white rounded-full px-8 shadow-lg shadow-[#4577e25d]"
            >
                GO TO HOMEPAGE
            </Link>
        </div>
    );
};

export default ErrorPage;
