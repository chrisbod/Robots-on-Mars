//uses GridCoordinate(grid.js)
function Robot(x,y,orientation,ownerGrid) {
	this.coordinate = new GridCoordinate(x,y);
	this.scent = new RobotScent(-1,-1);
	this.ownerGrid = ownerGrid;
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
Robot.prototype.lost = false;

//methods
Robot.prototype.processInstruction = function robot_processInstruction(instruction) {
	for (var i=0;i!=instruction.length && !this.lost;i++) {
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
	var coordinate = this.coordinate,
		currentX = coordinate.x, //store these to move the scent correctly
		currentY = coordinate.y,
		currentPosition = this.ownerGrid.getPosition(currentX,currentY),
		currentScentPosition = this.ownerGrid.getPosition(this.scent.coordinate.x,this.scent.coordinate.y),
		newPosition;
	switch (this.orientation) {
		case this.NORTH: {
			coordinate.y++;//remember origin is bottom left not top left;
			break;
		}
		case this.EAST: {
			coordinate.x++;
			break;
		}
		case this.SOUTH: {
			coordinate.y--;
			break;
		}
		case this.WEST: {
			coordinate.x--;
			break;
		}
		default: {
			throw "Unknown orientation for robot";
		}
	}
	newPosition = this.ownerGrid.getPosition(coordinate.x,coordinate.y);
	
	if (newPosition == null) {//owner grid does not contain new position
		this.lost = true;
	} else {
		currentPosition.removeItem(this);
		newPosition.addItem(this);
	}
	if (currentScentPosition) {
		currentScentPosition.removeItem(this.scent);
	}
	currentPosition.addItem(this.scent);
	if (this.onMoveForward) {
		this.onMoveForward()
	}
}

function RobotScent(x,y,ownerGrid) {
	this.coordinate = new GridCoordinate(x,y);
}


