//rushing headlong in again
function RemoteGrid(width,height) {
	this.width = width;//lower right
	this.height = height;//upper right
	//be lazy and store positions on points of grid as x_y?
	this.lookup = {};
	//do we pre-populate the grid with positions - I think so;
}
function GridCoordinate(x,y) {
	this.x = x;
	this.y = y;
}
function GridPosition(coordinate) {
	this.coordinate = coordinate;
	this.items = []; //okay so according to the document it looks like a position will only have one item at a time (Robot or Scent);
}
