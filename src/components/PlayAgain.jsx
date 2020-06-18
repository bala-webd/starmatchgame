import React from "react";
import ScoreBoard from "./ScoreBoard";

const PlayAgain = (props) => (
  <div className="game-done">
    <div
      className="message"
      style={{ color: props.gameStatus === "lost" ? "red" : "green" }}
    >
      {props.gameStatus === "lost" ? "Game Over" : "Nice"}
    </div>
    {props.gameStatus === "lost" ? (
      ""
    ) : (
      <ScoreBoard secondsLeft={props.secondsLeft} />
    )}
    <button onClick={props.onClick}>Play Again</button>
  </div>
);

export default PlayAgain;
