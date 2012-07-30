//rushing headlong in again
function RemoteGrid(width,height) {
	this.width = width;//lower right
	this.height = height;//upper right
	//be lazy and store positions on points of grid as x_y?
	this.lookup = {};
	//do we pre-populate the grid with positions - I think so;
	this.populateLookup();
}
//properties
RemoteGrid.prototype.width = 0;
RemoteGrid.prototype.height = 0;
RemoteGrid.prototype.lookup = void (Object) || null;
//methods
RemoteGrid.prototype.populateLookup = function remoteGrid_populateLookup() {
	for (var lookup = this.lookup,width = this.width, x = 0; x!=width; x++) {
		for (var y = 0, height = this.height; y!=height; y++) {
			lookup[x+"_"+y] = new GridPosition(new GridCoordinate(x,y));//did you say not to over engineer this?
		}
	}
}
RemoteGrid.prototype.hasPosition = function remoteGrid_hasPosition() {
	
}

function GridCoordinate(x,y) {
	this.x = x;
	this.y = y;
}
function GridPosition(coordinate) {
	this.coordinate = coordinate;
	this.items = []; //okay so according to the document it looks like a position will only have one item at a time (Robot or Scent);
}

