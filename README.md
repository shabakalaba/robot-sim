Requirements: 

- Node v24 or higher

To start: 

1. From the root folder use `npm install` to install all required packages.
2. Use `npm audit fix --force` if necessary
3. In terminal, use `npm start` from the root folder.
4. On browser, navigate to [http://localhost:5173/](http://localhost:5173/)
5. If link doesn't work due to used port, check terminal for correct port.

---

To reset the db:

1. In terminal, use `npm run db:reset`

---

User Test Cases:

1. (When DB is empty): Loading the page, the robot should be facing north and positioned at the bottom left.
2. Pressing the move, left, right and report buttons should produce a popup that prompts the user to choose a position.
3. Click on the most bottom left square (0,0) position (the robot should be there) to set the position
4. Click left once, should rotate the robot & arrow 90 degrees to the left (now facing west)
5. Click right once, should rotate the robot & arrow 90 degrees to the right (now facing north)
6. Click move once, robot should be facing north in the 0,1 position
7. Click move 5 times, robot should be halted at 0,4 position facing north (as limit has been reached)
8. Use Up, Right, Down, Left on keyboard. Robot should move 1 space in chosen direction. Robot should not move if it is on the edge of the table already.
9. No errors should appear in the console

---

Notes:

- Assumption: if no action can be taken, the robot stays in the same position and does nothing
- Assumption: Direction is north(top), east(right), south(bottom), west(left) in accordance to a compass. Robot and arrow needs to face in the desired direction, so both are rotated for clarity
- On the point: "The first valid command is a PLACE command." 
  - The assumption is if the database is empty. Although (0,0) is the starting position, if there are no database entries there should be some error that appears if the first command wasn't PLACE
  - However, on saving to the database, this gets overwritten as the position needs to retain on refresh. So this looks like it only happens once. 
  - I added a reset db command through terminal in the event someone needed to see this function again but on TODO list for clarification then actions.
- On the point: "A robot not on the table ignores commands"
  - The robot is never not on the table due to the other constraints, so this is automatically satisfied
- On the point: "Commands can be issued via buttons on the page or arrow keys"
  - for best ui/ux it assumption is to make the robot move as you change the direction. So this has been implemented (i.e. pressing up key will move the robot up 1 and make it face north regardless of it's current direction)
  - this is due to the limited number of keys, since theres only the 4 directions changing the direction was an option but then there would a more complex action for moving.
- I didn't have enough time write in test cases or optimize the keystrokes save, so I just have my user test cases and my todo action for optimizing saving to the database.

My TO DO list: 

- need clarification on whether the "first valid command" resets on refresh as well. If so, need to revise to retain position but prevent moving when actions are not PLACE
- need clarification on whether the robot is supposed to stay unrotated. If so, adjust css to only make the arrow rotate
- implement test cases for backend & frontend
- need to optimize keystroke creation to the database as there's a lag preventing rapid keystroke movements from saving properly. Change to a queue system to ensure all records are stored

