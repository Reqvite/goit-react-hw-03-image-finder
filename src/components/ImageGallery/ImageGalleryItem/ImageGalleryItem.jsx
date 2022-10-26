import PropTypes from 'prop-types';
import { GalleryListItem, GalleryImg } from "./ImageGalleryItem.styled"
export const ImageGalleryItem = (({ webformatURL, id, tags, toggleModal }) => {
  return (
    <GalleryListItem onClick={() => toggleModal(id)}>
  <GalleryImg src={webformatURL} alt={tags} />
</GalleryListItem>)
})

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
}