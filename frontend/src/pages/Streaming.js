import React from 'react';
import Chessboard from "chessboardjsx";
import StockFish from "../integrations/Stockfish.js";

function Streaming(props) {
    return (
      <div className="container  separe-margin">
        <div className="separe-margin">
                <h2 className="separe-margin">Chess with Stockfish</h2>
          <div style={boardsContainer}>
          <StockFish>
            {({ position, onDrop }) => (
              <Chessboard
                id="stockfish"
                position={position}
                width={500}
                onDrop={onDrop}
                
                boardStyle={boardStyle}
                orientation="white"
              />
            )}
          </StockFish>
          </div>
        </div>
      </div>
      );
}

export default Streaming;

const boardsContainer = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  };
  const boardStyle = {
    borderRadius: "5px",
    boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
  };
  