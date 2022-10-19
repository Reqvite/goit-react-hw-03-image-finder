import { ImageGalleryList } from "./ImageGallery.styled"

import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem"
export const ImageGallery = (({ data }) => {
    return (
        <ImageGalleryList >
            {data.map(({id, ...otherProps}) => 
                <ImageGalleryItem key={id} {...otherProps} />
            )}
         </ImageGalleryList>
    )
})