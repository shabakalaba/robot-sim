import robotImg from "../../assets/robot.jpg";

function TablePlace(props) {
  // Each space knows what x and y it is.
  const x = props.xLabel
  const y = props.yLabel

  // set new direction and position when the space is clicked on.
  function place() {
    props.newDirection(0)
    props.newPosition({ x, y });
  }

  // Dynamically rotate the robot based on it's current direction.
  let styles = {
    transform: `rotate(${props.robotDirection}deg)`
  }

  // Used a button for simplicity. Each button has the robot image with an arrow, using css to hide/show when it's actually active in the square.
  return (
    <>
      <button onClick={place} className={`table-place ${(x === props.robotX && y === props.robotY) || (props.robotX === null && props.robotX === null && x === 0 && y === 0) ? "active" : ""}`} style={styles}>
        <img src={robotImg} width="60" height="75"/>
      </button>
    </>
  );
}

export default TablePlace;