import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import ProductGallery from "../../shared/ProductGallery/ProductGallery";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AvailableFoods = () => {
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("dec");

    const url = `/foods?sortByDate=${sort}${search ? `&search=${search}` : ""}`;

    const { data: foods, isPending } = useQuery({
        queryKey: ["available-foods", sort, search],
        queryFn: async () => {
            const res = await axiosPublic.get(url);
            return res.data;
        },
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const search = form.get("search");
        setSearch(search);
    };

    const handleSort = () => {
        if (sort == "dec") {
            setSort("acc");
        } else {
            setSort("dec");
        }
    };

    return (
        <section className="py-12 min-h-[calc(100vh-116px)]">
            <Helmet>
                <title>Eats Exchange | Available Foods</title>
            </Helmet>
            <Container>
                <div className="space-y-5 py-8">
                    <SectionHeading
                        heading="Feast of Generosity: Browse Our Bounty"
                        subHeading="Select from a diverse array of nourishing foods, kindly shared by members of our community"
                    />
                    <div className="flex flex-col gap-5 lg:flex-row justify-between items-center">
                        <form onSubmit={handleSearch} className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Search here"
                                className="input input-bordered w-full max-w-xs"
                                name="search"
                            />
                            <Button>Search</Button>
                        </form>
                        <div>
                            <button
                                onClick={handleSort}
                                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                            >
                                {sort == "acc"
                                    ? " Sort by Descending  Expired Date"
                                    : "Sort by Ascending Expired Date"}
                            </button>
                        </div>
                    </div>
                    <ProductGallery foods={foods} isPending={isPending} />
                </div>
            </Container>
        </section>
    );
};

export default AvailableFoods;
