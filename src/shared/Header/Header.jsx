import { Link, NavLink } from "react-router-dom";
import Container from "../../components/Container/Container";

import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const SingleNav = ({ pageTitle, path }) => {
    return (
        <NavLink
            className={({ isActive }) =>
                isActive
                    ? "text-indigo-700 dark:text-indigo-400"
                    : "text-black dark:text-gray-200"
            }
            to={path}
        >
            {pageTitle}
        </NavLink>
    );
};

const Header = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("LogOut Successful");
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const navLinks = (
        <>
            <SingleNav pageTitle="Home" path="/" />
            <SingleNav pageTitle="Available Foods" path="/available-foods" />
            <SingleNav pageTitle="Add Food" path="/add-food" />
            <SingleNav pageTitle="Manage My Foods" path="/manage-my-foods" />
            <SingleNav pageTitle="My Food Request" path="/my-food-request" />
        </>
    );

    return (
        <Container>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <nav
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {navLinks}
                        </nav>
                    </div>
                    <Link
                        to="/"
                        className="btn btn-ghost text-xl hover:bg-transparent"
                    >
                        <img src="/logo.png" alt="logo" className="h-full" />
                        Eats Exchange
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <nav className="menu menu-horizontal px-1 text-base gap-6">
                        {navLinks}
                    </nav>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <div className=" flex h-full items-center gap-3">
                            <div className="w-10 rounded-full overflow-hidden">
                                <img
                                    alt={user?.displayName || "User"}
                                    src={user?.photoURL}
                                />
                            </div>
                            <button onClick={handleLogOut} className="btn">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </Container>
    );
};

SingleNav.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default Header;
