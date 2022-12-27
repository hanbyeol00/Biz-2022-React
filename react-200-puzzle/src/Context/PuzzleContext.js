import { createContext, useContext, useState } from "react";

const PuzzleContext = createContext();

const usePuzzleContext = () => {
  return useContext(PuzzleContext);
};

const PuzzleContextProvider = ({ children }) => {
  const [puzzlePiece, setPuzzlePiece] = useState([]);
  const [imgFile, setImgFile] = useState({});
  const [piece, setPiece] = useState(4);

  const puzzleShuffle = () => {
    if (!imgFile.url) {
      alert("이미지를 먼저 선택해주세요");
      return false;
    }

    const pieceArray = Array(piece)
      .fill(0)
      .map((_, index) => {
        const pieceInfo = {
          posX: ((index % piece) + 1) * -100,
          posY: 0,
        };
        return pieceInfo;
      });
    setPuzzlePiece([...pieceArray]);

    // for (let i = 0; i < piece; i++) {
    //   const pieceInfo = {
    //     posX: ((i % piece) + 1) * -100,
    //   };
    //   console.log(pieceInfo);
    //   setPuzzlePiece([...puzzlePiece, { pieceInfo }]);
    // }
  };

  const props = {
    imgFile,
    setImgFile,
    piece,
    setPiece,
    puzzlePiece,
    puzzleShuffle,
  };

  return (
    <PuzzleContext.Provider value={props}>{children}</PuzzleContext.Provider>
  );
};

export { PuzzleContextProvider, usePuzzleContext };
