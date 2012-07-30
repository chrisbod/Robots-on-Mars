//uses GridCoordinate(grid.js)
function Robot(x,y,orientation) {
	this.coordinate = new GridCoordinate(x,y);
	this.orientation = orientation;
}
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