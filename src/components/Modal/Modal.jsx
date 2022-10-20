import { Component } from "react"
import { createPortal } from "react-dom"
import { Overlay, ModalStyled } from "./Modal.styled"

const modalRoot = document.querySelector('#modal-root')
export class Modal extends Component {

  componentDidMount() {
    window.addEventListener ('keydown', this.closeModal)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal)
  }

  closeModal = (e) => {
    if (e.code === 'Escape') {
      this.props.toggleModal()
    }
  }


  render() {
    const { data, id } = this.props
      return createPortal(
        <Overlay>
  <ModalStyled >
    <img src={data[id].largeImageURL} alt={data[id].tags} />
  </ModalStyled>
        </Overlay>,
        modalRoot
    )
   }
 
}