//uses GridCoordinate(grid.js)
function Robot(x,y,orientation) {
	this.coordinate = new GridCoordinate(x,y);
	this.orientation = orientation;
}
//constants
Robot.prototype.NORTH = new String("N");
Robot.prototype.EAST = new String("E");
Robot.prototype.SOUTH = new String("S");
Robot.prototype.WEST = new String("W");

//remember left and right are simply orientation changes not movement
//should probably be named CLOCKWISE and ANTICLOCKWISE ;-) see Issue #4
Robot.prototype.LEFT = new String("L");
Robot.prototype.RIGHT = new String("R");

Robot.prototype.FORWARD = new String("F");

Robot.prototype.LOST = new String("LOST");

//properties
Robot.prototype.coordinate = void (GridCoordinate) || null;
Robot.prototype.orientation = "";




//methods
Robot.prototype.turnLeft = function robot_turnLeft() {

}
Robot.prototype.turnRight = function robot_turnRight() {

}
Robot.prototype.moveForward = function robot_moveForward() {

}