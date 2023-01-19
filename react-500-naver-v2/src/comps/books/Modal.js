const Modal = (props) => {
  const { children, open, close } = props;

  return (
    <div className={open ? "Modal openModal" : "Modal"}>
      <section className="content">
        {children}
        <div>
          <button onClick={close} className="close">
            닫기
          </button>
        </div>
      </section>
    </div>
  );
};
export default Modal;
