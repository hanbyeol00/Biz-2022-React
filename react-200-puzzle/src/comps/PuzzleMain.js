import { PuzzleContextProvider } from "../Context/PuzzleContext";
import PuzzleImage from "./PuzzleImage";
import "../css/Puzzle.css";
const PuzzleMain = () => {
  return (
    <PuzzleContextProvider>
      <PuzzleImage />
    </PuzzleContextProvider>
  );
};
export default PuzzleMain;
