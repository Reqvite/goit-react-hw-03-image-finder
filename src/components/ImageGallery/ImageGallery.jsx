import PropTypes from 'prop-types';
import { ImageGalleryList } from "./ImageGallery.styled"

import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem"
export const ImageGallery = (({ data, toggleModal }) => {
    return (      
        <ImageGalleryList >
            {data.map(({id, ...otherProps}) => 
                <ImageGalleryItem key={id} id={id} {...otherProps} toggleModal={toggleModal}/>
            )}
         </ImageGalleryList>
    )
})

ImageGallery.propTypes = {
    data: PropTypes.array.isRequired,
    toggleModal: PropTypes.func.isRequired,
}
