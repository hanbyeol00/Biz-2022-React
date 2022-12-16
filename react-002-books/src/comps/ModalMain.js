import "../css/ModalMain.css";
const ModalMain = (props) => {
  const { children, open, width, close } = props;

  return (
    <div className={open ? "Modal openModal" : "Modal"}>
      <section className={`section-${width}`}>
        <header>
          <h1>Header</h1>
          <button onClick={close} className="close">
            &times;
          </button>
        </header>
        <main>{children}</main>
        <footer>
          <button onClick={close} className="close">
            닫기
          </button>
        </footer>
      </section>
    </div>
  );
};
export default ModalMain;
