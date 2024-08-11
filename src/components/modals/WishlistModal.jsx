import Modal from "react-modal";

export const WishlistModal = ({ isOpen, onClose, children, footerButtons }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add to Wishlist Modal"
      className="modal-dialog"
      ariaHideApp={false} // This can be set to true if you're setting the app element elsewhere
    >
      <div className="modal-content">
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        ></button>

        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          {footerButtons}
          <button className="btn btn-secondary" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
