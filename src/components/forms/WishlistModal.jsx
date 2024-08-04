import Modal from "react-modal";

export const WishlistModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add to Wishlist Modal"
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      {children}
      <button className="cancel-button" type="button" onClick={onClose}>
        Cancel
      </button>
    </Modal>
  );
};
