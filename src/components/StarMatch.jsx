import React, { useState, useEffect } from "react";

import PlayNumber from "./PlayNumber";
import StarsDisplay from "./StarsDisplay";
import PlayAgain from "./PlayAgain";

import { utils } from "../configs/Utils";

import "../css/starmatch.css";

const useGameState = () => {
  const numbers = 9;
  const [stars, setStars] = useState(utils.random(1, numbers));
  const [availableNums, setAvailableNums] = useState(utils.range(1, numbers));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });
  const setGameState = (newCandidateNums) => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailabeNums = availableNums.filter(
        (n) => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailabeNums, 9));
      setAvailableNums(newAvailabeNums);
      setCandidateNums([]);
    }
  };
  return {
    numbers,
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
  };
};

const StarMatch = (props) => {
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
    numbers,
  } = useGameState();

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  //const gameIsWon = availableNums.length === 0;
  //const gameIsLost = secondsLeft === 0;
  const gameStatus =
    availableNums.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";

  // const resetGame = () => {
  //   setStars(utils.random(1, 9));
  //   setAvailableNums(utils.range(1, 9));
  //   setCandidateNums([]);
  // };

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return "used";
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  const onNumberClick = (number, currentStatus) => {
    if (gameStatus !== "active" || currentStatus === "used") {
      return;
    }
    const newCandidateNums =
      currentStatus === "available"
        ? candidateNums.concat(number)
        : candidateNums.filter((cn) => cn !== number);
    setGameState(newCandidateNums);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== "active" ? (
            <PlayAgain
              onClick={props.startNewGame}
              gameStatus={gameStatus}
              secondsLeft={secondsLeft}
            />
          ) : (
            <StarsDisplay count={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, numbers).map((numberId) => (
            <PlayNumber
              status={numberStatus(numberId)}
              key={numberId}
              number={numberId}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

export default StarMatch;
