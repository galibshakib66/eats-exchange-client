import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import ProductGallery from "../../shared/ProductGallery/ProductGallery";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Container from "../../components/Container/Container";

const FeaturedFoods = () => {
    const axiosPublic = useAxiosPublic();

    const { data: foods, isPending } = useQuery({
        queryKey: ["featured-foods"],
        queryFn: async () => {
            const res = await axiosPublic.get(
                "/foods?sortByQuantity=true&limit=6"
            );
            return res.data;
        },
    });

    return (
        <Container>
            <section className="space-y-5 py-8">
                <SectionHeading
                    heading="Discover Delights: Curated Cuisine for a Cause"
                    subHeading="Explore our handpicked selection of delectable dishes shared by generous hearts in our community"
                />
                <ProductGallery foods={foods} isPending={isPending} />
            </section>
        </Container>
    );
};

export default FeaturedFoods;
