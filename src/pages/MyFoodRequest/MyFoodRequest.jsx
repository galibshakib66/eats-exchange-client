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
import Loader from "../../components/Loader/Loader";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import moment from "moment";

const columnHelper = createColumnHelper();

const MyFoodRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {
        data: requestData,
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["my-requests", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests?email=${user?.email}`);
            return res.data;
        },
    });

    const handleCancelRequest = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel this request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/requests/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Cancelled!",
                            text: "The request has been cancelled.",
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
        columnHelper.accessor("Donator.Name", {
            header: () => "Donor Name",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("PickupLocation", {
            header: () => "Pickup Location",
            cell: (info) => info.row.original.PickupLocation || "Unknown",
        }),
        columnHelper.accessor("ExpiredDateTime", {
            header: () => "Expire Date",
            cell: (info) => moment(info.getValue()).format("DD MMMM, YYYY"),
        }),
        columnHelper.accessor("RequestDate", {
            header: () => "Request Date",
            cell: (info) =>
                moment(info.getValue()).format("DD MMMM, YYYY, h:mm:ss a"),
        }),
        columnHelper.accessor("DonationMoney", {
            header: () => "Your Donation Amount",
            cell: (info) => info.getValue() || "N/A",
        }),
        columnHelper.accessor("Status", {
            header: () => "Status",
            cell: (info) => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor("_id", {
            header: () => "Cancel Request",
            cell: (info) => (
                <button
                    onClick={() => handleCancelRequest(info.row.original._id)}
                    className="btn btn-sm"
                    disabled={info.row.original.Status !== "Pending"}
                >
                    Cancel Request
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
                <title>Eats Exchange | My Food Request</title>
            </Helmet>
            <div className="min-h-[calc(100vh-116px)] py-8">
                <SectionHeading
                    heading="Summary of Your Requests"
                    subHeading="Manage your requests efficiently"
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
                        <p>No requests found.</p>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default MyFoodRequest;
