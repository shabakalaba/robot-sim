import { useEffect, useState } from 'react'
import './App.css'
import TablePlace from "./components/TablePlace/TablePlace.jsx";
import { getLatest, createRow } from "./api/robotMovement";

function App() {
  // Define Variables
  let [robotPosition, setRobotPosition] = useState({x:null, y:null});
  let [robotDirection, setRobotDirection] = useState(0);
  const [grid, setGrid] = useState([]);

  // Grid Creation: Can set a different size for the table here.
  const tableSize = 5;

  // Re-render the grid each time the robot position or direction changes & save the movement to the database..
  useEffect(() => {
    setGrid(renderGrid());
    if (robotPosition.x !== null) {
      createRow(robotPosition.x, robotPosition.y, robotDirection).catch((e) => console.warn('createRow failed:', e.message));
    }
  }, [robotPosition, robotDirection]);

  // Get the latest movement from the database. (For position retention on refresh)
  useEffect(() => {
    getLatest()
      .then((row) => {
        if (row != null && Number.isInteger(row.x_position) && Number.isInteger(row.y_position)) {
          setRobotPosition({ x: row.x_position, y: row.y_position });
          setRobotDirection(row.direction ?? 0);
        }
      })
      .catch((err) => console.warn('getLatest failed:', err.message));
  }, []);

  // Handle key strokes for moving the robot.
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        move(-90);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        move(90);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        move(0);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        move(180);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [robotPosition, robotDirection, left, right, move]);

  // Render the table grid.
  function renderGrid() {
    const newGrid = [];
    for (let y = tableSize - 1; y > -1; y--) { // Create the table for rendering
      const row = [];
      for (let x = 0; x < tableSize; x++ ) {
        row.push(<TablePlace key={`${x}-${y}`} xLabel={x} yLabel={y} robotX={robotPosition.x} robotY={robotPosition.y} robotDirection={robotDirection} newPosition={setRobotPosition} newDirection={setRobotDirection}/>)
      }
      newGrid.push(<div className='x-row' key={`row-${y}`}>{row}</div>);
    }

    return newGrid;
  }

  // Rotate the robot to the right 90degrees.
  function right() {
    if (!checkMoved()) {return;}
    const newDir = (robotDirection + 90) % 360;
    setRobotDirection(newDir);
  }

  // Rotate the robot to the left 90degrees.
  function left() {
    if (!checkMoved()) {return;}
    const newDir = (robotDirection - 90) % 360;
    setRobotDirection(newDir);
  }

  // Reposition the robot 1 space in the direction it is facing.
  function move(overrideDirection) {
    if (!checkMoved()) {return;}

    // Add override in direction to accomodate key stroke movements.
    const dir = overrideDirection !== undefined ? overrideDirection : robotDirection;
    if (overrideDirection !== undefined) setRobotDirection(overrideDirection);

    let moveX = robotPosition.x;
    let moveY = robotPosition.y;

    // Determine the direction to move in
    switch (dir){
      case 0: // north
        if (moveY !== 4) {
          moveY += 1; 
        }
        break;
      case 90: // east
      case -270:
        if (moveX !== 4) {
          moveX += 1;
        }
        break;
      case 180: // south
      case -180:
        if (moveY !== 0) {
          moveY -= 1;
        }
        break;
      case 270: // west
      case -90:
        if (moveX !== 0) {
          moveX -= 1;
        }
        break;
    }
    // Update the robot position.
    setRobotPosition({ x:moveX, y:moveY });
  }


  // Check if the robot has been moved from init.
  function checkMoved() {
    if (robotPosition.x === null) {
      alert("Please choose a position.");
      return false;
    }
    return true;
  }

  // Report the robot's current position and direction.
  function report() {
    if (!checkMoved()) {return;}
    const directionMap = {
      0: 'NORTH',
      90: 'EAST',
      180: 'SOUTH',
      270: 'WEST',
    };
    const normalized = ((robotDirection % 360) + 360) % 360;
    const dir = directionMap[normalized] ?? robotDirection;
    alert(`Current Position: (${robotPosition.x},${robotPosition.y},${dir})`);
  }
  
  // Render the app.
  return (
    <>
      <div className='instructions'>Click to place the robot, use buttons or arrows to move</div>
      {grid}
      <div>
        <button onClick={left}>Left</button>
        <button onClick={() => move()}>Move</button>
        <button onClick={right}>Right</button>
      </div>
      <button onClick={report}>Report</button>
    </>
  )
}

export default App
