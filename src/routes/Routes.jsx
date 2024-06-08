import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AddFood from "../pages/AddFood/AddFood";
import AvailableFoods from "../pages/AvailableFoods/AvailableFoods";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import PrivateRoute from "./PrivateRoute";
import ManageMyFoods from "../pages/ManageMyFoods/ManageMyFoods";
import UpdateFood from "../pages/AddFood/UpdateFood";
import ManageSingleFood from "../pages/ManageSingleFood/ManageSingleFood";
import MyFoodRequest from "../pages/MyFoodRequest/MyFoodRequest";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "add-food",
                element: (
                    <PrivateRoute>
                        <AddFood />
                    </PrivateRoute>
                ),
            },
            {
                path: "available-foods",
                element: <AvailableFoods />,
            },
            {
                path: "food/:id",
                element: <FoodDetails />,
            },
            {
                path: "manage-my-foods",
                element: (
                    <PrivateRoute>
                        <ManageMyFoods />
                    </PrivateRoute>
                ),
            },
            {
                path: "update-food/:id",
                element: (
                    <PrivateRoute>
                        <UpdateFood />
                    </PrivateRoute>
                ),
            },
            {
                path: "manage-food/:foodId",
                element: (
                    <PrivateRoute>
                        <ManageSingleFood />
                    </PrivateRoute>
                ),
            },
            {
                path: "my-food-request",
                element: (
                    <PrivateRoute>
                        <MyFoodRequest />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

export default router;
