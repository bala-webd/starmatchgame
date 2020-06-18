import React, { useState } from "react";

//external components
import StarMatch from "./components/StarMatch";

function App() {
  const [gameId, setGameId] = useState(1);
  return <StarMatch key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
}

export default App;
