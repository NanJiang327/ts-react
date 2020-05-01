import React, { useState, useEffect, useRef, useContext } from 'react';
import useMousePosition from "../hooks/useMousePosition"
import { ThemeContext } from "../App";

const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0);
  const [on, setOn] = useState(true);
  const positions = useMousePosition();
  // ref是唯一引用, ref的修改是不会触发组件的重新渲染
  const likeRef = useRef(0);
  const didMountRef = useRef(false);
  const domRef = useRef<HTMLInputElement>(null);

  const theme = useContext(ThemeContext)

  const style = {
    background: theme.background,
    color: theme.color
  }

  useEffect(() => {
    document.title = `点击了 ${like} 次`;
  }, [like])

  const handleAlertClick = () => {
    setTimeout(() => {
      alert("You clicked on" + likeRef.current)
    }, 3000)
  }

  useEffect(() => {
    if (didMountRef.current) {
      console.log("This is updated")
    } else {
      didMountRef.current = true
    }
  })

  useEffect(() => {
    if (domRef && domRef.current) {
      domRef.current.focus();
    }
  })

  return ( 
    <>
      <input type="text" ref={domRef} />
      <h1>x: {positions.x}, y: {positions.y}</h1>
      <button style={style} onClick={() => {setLike(like + 1); likeRef.current++}} >
        {like} 👍
      </button>
      <button onClick={() => {setOn(!on)}} >
        {on ? "ON" : "OFF"}
      </button>
      <button onClick={handleAlertClick}>
        Alert!
      </button>
    </>
  )
}

export default LikeButton;