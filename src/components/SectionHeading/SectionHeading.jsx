import PropTypes from "prop-types";

const SectionHeading = ({ heading, subHeading }) => {
    return (
        <div className="text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                {heading}
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
                {subHeading}
            </p>
            <div className="flex mt-6 justify-center">
                <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
        </div>
    );
};

SectionHeading.propTypes = {
    heading: PropTypes.string.isRequired,
    subHeading: PropTypes.string.isRequired,
};

export default SectionHeading;
