import { Helmet } from "react-helmet-async";
import FeaturedFoods from "../FeaturedFoods/FeaturedFoods";
import AwarenessGallery from "./AwarenessGallery";
import HeroSection from "./HeroSection";
import Testimonials from "./Testimonials";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Eats Exchange | Home</title>
            </Helmet>
            <HeroSection />
            <FeaturedFoods />
            <AwarenessGallery />
            <Testimonials />
        </>
    );
};

export default Home;
