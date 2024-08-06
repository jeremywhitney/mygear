// import Modal from "react-modal";

// export const WishlistModal = ({ isOpen, onClose, children }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Add to Wishlist Modal"
//       className="ReactModal__Content"
//       overlayClassName="ReactModal__Overlay"
//     >
//       {children}
//       <button className="cancel-button" type="button" onClick={onClose}>
//         Cancel
//       </button>
//     </Modal>
//   );
// };


// BOOTSTRAP //
import Modal from "react-modal";

export const WishlistModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add to Wishlist Modal"
      className="modal-dialog"
      overlayClassName="modal-backdrop show"
      ariaHideApp={false} // This can be set to true if you're setting the app element elsewhere
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add to Wishlist</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
