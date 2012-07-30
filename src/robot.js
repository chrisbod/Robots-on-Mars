//uses GridCoordinate(grid.js)
function Robot(x,y,orientation) {
	this.coordinate = new GridCoordinate(x,y);
	this.orientation = orientation;
}
//constants
Robot.prototype.NORTH = "N";
Robot.prototype.EAST = "E";
Robot.prototype.SOUTH = "S";
Robot.prototype.WEST = "W";
Robot.prototype.ORIENTATION_LOOKUP = {
	N: 0,
	E: 1,
	S: 2,
	W: 3,
	0: "N",
	1: "E",
	2: "S",
	3: "W"
}

//remember left and right are simply orientation changes not movement
//should probably be named CLOCKWISE and ANTICLOCKWISE ;-) see Issue #4
Robot.prototype.LEFT = "L";
Robot.prototype.RIGHT ="R";

Robot.prototype.FORWARD = "F";

//properties
Robot.prototype.coordinate = void (GridCoordinate) || null;
Robot.prototype.orientation = "";

//methods
Robot.prototype.processInstruction = function robot_processInstruction(instruction) {
	for (var i=0;i!=instruction.length;i++) {
		switch (instruction.charAt(i)) {
			case this.LEFT: {
				this.turnLeft();
				break;
			}
			case this.RIGHT: {
				this.turnRight();
				break;
			}
			case this.FORWARD: {
				this.moveForward();
				break;
			}
			default: {
				throw "Unrecognized instruction ("+instruction.charAt(i)+") given to robot";
			}
		}
	}
	if (this.onProcessInstructionEnd) {
		this.onProcessInstructionEnd();
	}
}
Robot.prototype.turnLeft = function robot_turnLeft() {
	var currentOrientationInt = this.ORIENTATION_LOOKUP[this.orientation];
	currentOrientationInt--;
	if (currentOrientationInt == -1) {
		currentOrientationInt = 3;
	}
	this.orientation = this.ORIENTATION_LOOKUP[currentOrientationInt];
}
Robot.prototype.turnRight = function robot_turnRight() {
	var currentOrientationInt = this.ORIENTATION_LOOKUP[this.orientation];
	currentOrientationInt++;
	if (currentOrientationInt == 4) {
		currentOrientationInt = 0;
	}
	this.orientation = this.ORIENTATION_LOOKUP[currentOrientationInt];
}
Robot.prototype.moveForward = function robot_moveForward() {
	switch (this.orientation) {
		case this.NORTH: {
			this.coordinate.y++;//remember origin is bottom left not top left;
			break;
		}
		case this.EAST: {
			this.coordinate.x++;
			break;
		}
		case this.SOUTH: {
			this.coordinate.y--;
			break;
		}
		case this.WEST: {
			this.coordinate.x--;
			break;
		}
		default: {
			throw "Unknown orientation for robot";
		}
	}
	if (this.onMoveForward) {
		this.onMoveForward()
	}
}