import React, { useEffect, useState } from "react";

const MouseTracker: React.FC = () => {
  const [positions, setPositions] = useState({x: 0, y: 0})

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setPositions({x: e.clientX, y: e.clientY})
    }

    console.log("Add effect")

    document.addEventListener("click", updateMouse);

    return () => {
      console.log("Remove effect")
      document.removeEventListener("click", updateMouse);
    }
  }, []) // 数组中只监听props或者state的变化

  console.log("Before render")

  return (
    <p>x: {positions.x}, y: {positions.y}</p>
  )
}

export default MouseTracker;