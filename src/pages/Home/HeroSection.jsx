import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";

const HeroSection = () => {
    return (
        <section className="text-gray-600 body-font py-12">
            <Container>
                <div className="  flex px-5  md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                        <img
                            className="object-cover object-center rounded w-full"
                            alt="hero"
                            src="https://www.henryford.com/-/media/project/hfhs/henryford/henry-ford-blog/images/mobile-interior-banner-images/2020/06/food-bank-what-to-give.jpg"
                        />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                            Join the Movement: Share a Meal, Nourish Hope
                        </h1>
                        <p className="mb-8 leading-relaxed">
                            Every plate of food has the power to transform
                            lives. In our community, surplus meets need through
                            the simple act of sharing. Your contribution creates
                            a ripple of kindness that reaches far beyond a
                            single meal. Tap ‘Donate Now’ and become a part of
                            the change that begins with generosity
                        </p>
                        <div className="flex justify-center">
                            <Link to="/add-food">
                                <Button>Donate now</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default HeroSection;
