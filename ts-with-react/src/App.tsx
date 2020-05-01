import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LikeButton from "./components/LikeButton";
import MouseTracker from "./components/MouseTracker";
import useMousePosition from "./hooks/useMousePosition"
import useURLLoader from "./hooks/useURLLoader"

interface IShowResult {
  message: string;
  status: string;
}

interface IThemeProps {
  [key: string]: {color: string; background: string}
}

const themes: IThemeProps = {
  'light': {
    color: "#000",
    background: "#eee"
  },
  'dark': {
    color: "#fff",
    background: "#222"
  }
}

export const ThemeContext = React.createContext(themes.light);

const App: React.FC = () => {
  const [show, setShow] = useState(true)
  const positions = useMousePosition();
  const [data, loading] = useURLLoader("https://dog.ceo/api/breeds/image/random", [show])
  const dogResult = data as IShowResult
  return (
    <div className="App">
      <ThemeContext.Provider value={themes.light}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          <button onClick={() => {setShow(!show)}}> Toggle button </button>
          </p>
          <p>x: {positions.x}, y: {positions.y}</p>
          {loading ? <p>🐩 加载中</p> : <img src={dogResult && dogResult.message} />}
          <LikeButton />
          {show && <MouseTracker />}
        </header>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
