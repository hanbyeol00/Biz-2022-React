import { usePuzzleContext } from "../Context/PuzzleContext";
import PuzzleItem from "./PuzzleItem";

const PuzzleImage = () => {
  const { imgFile, setImgFile, piece, setPiece, puzzleShuffle, puzzlePiece } =
    usePuzzleContext();

  const imgOnChangeHandler = (e) => {
    const uploadImgFile = {
      url: URL.createObjectURL(e.target.files[0]),
      fileName: e.target.files[0].name,
    };
    setImgFile(uploadImgFile);
  };

  const pieceOnChangeHandler = (e) => {
    setPiece(e.target.value);
  };

  const imgOnclickHandler = (e) => {
    puzzleShuffle();
  };

  const PuzzleShuffleList = puzzlePiece.map((item) => {
    return <PuzzleItem item={item} />;
  });

  return (
    <div className="puzzle-wrap">
      <ul className="image-wrap">
        {puzzlePiece.length > 0 ? (
          PuzzleShuffleList
        ) : imgFile?.url ? (
          <img src={imgFile.url} alt={imgFile.fileName} width="500px" />
        ) : (
          <div>이미지를 선택하세요</div>
        )}
      </ul>
      <div>
        <input type="file" accept="images/*" onChange={imgOnChangeHandler} />
      </div>
      <div>
        <input
          type="number"
          placeholder="조각개수"
          value={piece}
          onChange={pieceOnChangeHandler}
        />
        <button onClick={imgOnclickHandler}>게임 시작</button>
      </div>
    </div>
  );
};
export default PuzzleImage;
