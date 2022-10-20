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