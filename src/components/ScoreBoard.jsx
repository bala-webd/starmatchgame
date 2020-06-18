import React from "react";

const ScoreBoard = (props) => (
  <>
    <p>
      You've Scored{" "}
      <span
        style={{
          color: "green",
          fontWeight: "bold",
        }}
      >
        {props.secondsLeft * 100}
      </span>{" "}
      Points
    </p>
  </>
);

export default ScoreBoard;
