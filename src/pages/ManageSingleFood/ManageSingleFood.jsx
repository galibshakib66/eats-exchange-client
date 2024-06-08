import { useQuery } from "@tanstack/react-query";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Container/Container";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const columnHelper = createColumnHelper();

const ManageSingleFood = () => {
    const axiosSecure = useAxiosSecure();

    const { foodId } = useParams();

    const {
        data: requestData,
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["food-requests", foodId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/${foodId}`);
            return res.data;
        },
    });

    const handleStatusChange = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to mark this request as delivered?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, mark as delivered!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/requests/${id}`, { Status: "Delivered" })
                    .then((res) => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Updated!",
                                text: "The request status has been updated to Delivered.",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 2000,
                            });
                            refetch();
                        }
                    });
            }
        });
    };

    const columns = [
        columnHelper.accessor("Requester.Name", {
            header: () => "Requester Name",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("Requester.Image", {
            header: () => "Requester Image",
            cell: (info) => (
                <img
                    src={info.getValue()}
                    alt="Requester"
                    className="w-10 h-10 rounded-full"
                />
            ),
        }),
        columnHelper.accessor("Requester.Email", {
            header: () => "Requester Email",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("RequestDate", {
            header: () => "Request Time and Date",
            cell: (info) => new Date(info.getValue()).toLocaleString(),
        }),
        columnHelper.accessor("Status", {
            header: () => "Status",
            cell: (info) => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor("_id", {
            header: () => "Actions",
            cell: (info) => (
                <button
                    onClick={() => handleStatusChange(info.row.original._id)}
                    className="btn btn-sm"
                    disabled={info.row.original.Status === "Delivered"}
                >
                    {info.row.original.Status === "Delivered"
                        ? "Delivered"
                        : "Mark as Delivered"}
                </button>
            ),
        }),
    ];

    const table = useReactTable({
        data: requestData || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isPending) return <Loader />;

    return (
        <Container>
            <Helmet>
                <title>Eats Exchange | Manage Single Food</title>
            </Helmet>
            <div className="min-h-[calc(100vh-116px)] py-8">
                <SectionHeading
                    heading="Summary of Requests for Your Food"
                    subHeading="Manage requests efficiently"
                />
                {requestData?.length ? (
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
                    <div className="h-[50vh] flex justify-center items-center">
                        <p>No requests found for this food item.</p>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default ManageSingleFood;
