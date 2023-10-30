import { IShowError } from "./types";

interface IModal {
  errorMsg: IShowError;
  closeModal: () => void;
  navigateToHome: () => void;
}

const Modal: React.FC<IModal> = ({ errorMsg, closeModal, navigateToHome }) => {
  return (
    <dialog open>
      <article>
        <a
          href="#close"
          aria-label="Close"
          className="close"
          onClick={() => closeModal()}
        ></a>
        <h3>{errorMsg.action}</h3>
        <p>{errorMsg.msg}</p>
        <footer>
          <a
            href="#confirm"
            role="button"
            data-target="modal-example"
            onClick={() => navigateToHome()}
          >
            Confirm
          </a>
        </footer>
      </article>
    </dialog>
  );
};

export default Modal;
