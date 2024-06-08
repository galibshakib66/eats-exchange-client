import { useQuery } from "@tanstack/react-query";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Container from "../../components/Container/Container";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const columnHelper = createColumnHelper();

const ManageMyFoods = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {
        data: foodData,
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["my-foods", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/foods?email=${user?.email}`);
            return res.data;
        },
    });

    const handleDelete = (id) => {
        console.log(`Delete food with id: ${id}`);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/foods/${id}`).then((res) => {
                    console.log(res.data);
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The Food has been deleted.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        //remove from UI
                        refetch();
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelled",
                    text: "The Food remains safe",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    };

    const columns = [
        columnHelper.accessor("FoodName", {
            header: () => "Food Name",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("_id", {
            header: () => "Update",
            cell: (info) => (
                <Link
                    to={`/update-food/${info.row.original._id}`}
                    className="btn btn-sm"
                >
                    Update
                </Link>
            ),
        }),
        columnHelper.accessor("_id", {
            header: () => "Manage",
            cell: (info) => (
                <Link
                    to={`/manage-food/${info.row.original._id}`}
                    className="btn btn-sm"
                >
                    Manage
                </Link>
            ),
        }),
        columnHelper.accessor("_id", {
            header: () => "Delete",
            cell: (info) => (
                <button
                    onClick={() => handleDelete(info.row.original._id)}
                    className="btn btn-sm"
                >
                    Delete
                </button>
            ),
        }),
    ];

    const table = useReactTable({
        data: foodData || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isPending) return <Loader />;

    return (
        <Container>
            <Helmet>
                <title>Eats Exchange | Manage My Foods</title>
            </Helmet>
            <div className="min-h-[calc(100vh-116px)] py-8">
                <SectionHeading
                    heading="Summary of your listed foods"
                    subHeading="Quick actions and statistics"
                />
                {foodData?.length ? (
                    <div className="py-12">
                        <table className="table">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row) => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="h-4" />
                    </div>
                ) : (
                    <div className="h-[50vh] flex justify-center items-center ">
                        <p>You Don&apos;t added any foods</p>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default ManageMyFoods;
