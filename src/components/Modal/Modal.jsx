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

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal()
    }
  }
  render() {
      return createPortal(
        <Overlay onClick={this.handleBackdropClick}>
  <ModalStyled >
{this.props.children}
  </ModalStyled>
        </Overlay>,
        modalRoot
    )
   }
 
}