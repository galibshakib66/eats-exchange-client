import Container from "../../components/Container/Container";
import SectionHeading from "../../components/SectionHeading/SectionHeading";

const awarenessItems = [
    {
        id: 1,
        subtitle: "Composting",
        title: "Turn Waste into Wealth",
        description:
            "Learn how to transform your kitchen scraps into nutrient-rich compost for your garden.",
    },
    {
        id: 2,
        subtitle: "Mindful Shopping",
        title: "Buy What You Need",
        description:
            "Tips on making a shopping list that aligns with your meal planning to reduce excess purchases.",
    },
    {
        id: 3,
        subtitle: "Leftover Recipes",
        title: "Get Creative with Leftovers",
        description:
            "Discover delicious recipes that give your leftovers a delightful second act.",
    },
    {
        id: 4,
        subtitle: "Proper Storage",
        title: "Keep Food Fresh Longer",
        description:
            "Effective ways to store different types of food to extend their shelf life and taste.",
    },
    {
        id: 5,
        subtitle: "Portion Control",
        title: "Serve Just Right",
        description:
            "Understanding portion sizes can help prevent waste and promote healthier eating habits.",
    },
    {
        id: 6,
        subtitle: "Community Sharing",
        title: "Share the Abundance",
        description:
            "Connect with your community to share surplus food and reduce waste collectively.",
    },
];

const AwarenessGallery = () => {
    return (
        <section className="text-gray-600 body-font py-10">
            <Container>
                <SectionHeading
                    heading="Food Waste Awareness"
                    subHeading="Every small step can make a big difference. Explore our
                        resources and learn how you can help reduce food waste."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                    {awarenessItems.map((item) => (
                        <div
                            key={item.id}
                            className="border-4 border-gray-200 px-8 py-10"
                        >
                            <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                                {item.subtitle}
                            </h2>
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                {item.title}
                            </h1>
                            <p className="leading-relaxed grow">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default AwarenessGallery;
