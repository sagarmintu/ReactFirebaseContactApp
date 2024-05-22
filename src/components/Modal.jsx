import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="grid absolute top-0 z-40 backdrop-blur h-screen w-screen place-items-center">
          <div className="z-50 relative min-h-[200px] min-w-[80%] bg-white p-4 m-auto">
            <div className="flex justify-end">
              <AiOutlineClose onClick={onClose} className="text-2xl self-end" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  , document.getElementById('modal-root'));
};

export default Modal;
