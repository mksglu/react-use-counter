import React, { useRef } from "react";
import useCounter from "./useCounter";
const App = () => {
  const intervalIdRef = useRef();
  const { onMouseClickLeft, onMouseClick, countValue } = useCounter({ intervalIdRef });

  return (
    <div>
      <button onMouseDown={onMouseClick} onMouseLeave={onMouseClickLeft} onClick={onMouseClickLeft}>
        Click
      </button>
      <h1>{countValue}</h1>
    </div>
  );
};

export default App;
