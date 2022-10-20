import { GalleryListItem, GalleryImg } from "./ImageGalleryItem.styled"
export const ImageGalleryItem = (({ webformatURL, id, tags, toggleModal }) => {
  return (
    <GalleryListItem onClick={() => toggleModal(id)}>
  <GalleryImg src={webformatURL} alt={tags} />
</GalleryListItem>)
})