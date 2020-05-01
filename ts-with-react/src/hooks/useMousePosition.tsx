import React, { useState, useEffect } from 'react'

const useMousePosition = () => {
  const [positions, setPositions] = useState({x: 0, y: 0})

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setPositions({x: e.clientX, y: e.clientY})
    }

    console.log("Add effect")

    document.addEventListener("mousemove", updateMouse);

    return () => {
      console.log("Remove effect")
      document.removeEventListener("mousemove", updateMouse);
    }
  }, [])

  return positions
}

export default useMousePosition;