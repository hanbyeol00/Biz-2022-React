const CustomContextMenu = ({
  style,
  onClose,
  audioPlay,
  audioID,
  onDeleteHandler,
}) => {
  document.addEventListener("click", onClose);
  return (
    <nav className="customContextMenu" style={style}>
      <ul>
        <li onClick={() => audioPlay(audioID)}>음성 재생</li>
        <li onClick={onDeleteHandler}>삭제</li>
      </ul>
    </nav>
  );
};

export default CustomContextMenu;
