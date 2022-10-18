import { GalleryListItem, GalleryImg } from "./ImageGalleryItem.styled"
export const ImageGalleryItem = (({webformatURL, largeImageURL, tags}) => {
    
    return(<GalleryListItem>
  <GalleryImg src={webformatURL} alt={tags} />
</GalleryListItem>)
})