import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const Modal = ({
  title,
  footer,
  children,
  onClose,
  width,
  height, 
  closeBtn,
  ...props
}: any) => {
  return (
    <div className="z-[99] fixed top-0 right-0 bottom-0 left-0 h-screen w-screen">
      <div
        id="modal"
        className="bg-[white]  text-black-200 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg px-4 flex flex-col  "
        style={{ width, height }}
        {...props}
      >
        <header className="flex items-center justify-between py-2">
          {typeof title === "string" ? (
            <div className="text-2xl font-semibold">{title}</div>
          ) : (
            title
          )}
          {closeBtn && (
            <div
              id="close-btn"
              className="font-mono text-3xl font-semibold text-gray-400 p-1.5 hover:text-red-700 hover:bg-white rounded-lg text-center align-middle leading-4 cursor-pointer"
              onClick={() => onClose()}
            >
              &times;
            </div>
          )}
        </header>
        <main className="py-4">{children}</main>
        {footer !== null && <footer>{footer}</footer>}
      </div>
    </div>
  );
};

Modal.defaultProps = {
  title: "Modal",
  footer: "",
  children: (
    <>
      <p>Content</p>
    </>
  ),
  onClose: () => {},

  closeBtn: true,
};

Modal.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  closeBtn: PropTypes.bool.isRequired,
};

export default Modal;
