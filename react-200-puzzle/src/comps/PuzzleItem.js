import { usePuzzleContext } from "../Context/PuzzleContext";
const PuzzleItem = ({ item }) => {
  console.log(item);
  const { puzzlePiece, imgFile, piece } = usePuzzleContext();
  console.log(puzzlePiece);
  const imgStyle = {
    background: `url(${imgFile.url})`,
    backgroundSize: "500px 400px",
    backgroundPositionX: `${item.posX}px`,
    backgroundPositionY: "0",
    width: `${500 / (piece / 2)}px`,
    height: `${500 / (piece / 2)}px`,
  };
  return (
    <li>
      <img style={imgStyle}></img>
    </li>
  );
};
export default PuzzleItem;
