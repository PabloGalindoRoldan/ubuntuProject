import Carousel from 'react-material-ui-carousel';
import PropTypes from 'prop-types';
import "./ImageCarousel.css"

function ImageCarousel({ images }) {
    return (
        <Carousel
        interval={5000}
        autoPlay={true}
        navButtonsAlwaysVisible={true}
        navButtonsProps={{
            style: {
                backgroundColor: 'transparent',
            }
        }}
        navButtonsWrapperProps={{
            style: {
                top: '-2vh',
            }
        }}
        >
            {images.map((item, i) => (
                <img key={i} src={item} alt={`Img nro ${i}`} className="carousel-image" />
            ))}
        </Carousel>
    );
}

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageCarousel;