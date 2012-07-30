//rushing headlong in again
function RemoteGrid(width,height) {
	this.width = width;//lower right
	this.height = height;//upper right
	//be lazy and store positions on points of grid as x_y?
	this.lookup = {};
	//do we pre-populate the grid with positions - I think so;
	this.populateLookup();
	this.validate()
}
//properties
RemoteGrid.prototype.width = 0;
RemoteGrid.prototype.height = 0;
RemoteGrid.prototype.maxWidth = -1;
RemoteGrid.prototype.maxHeight = -1;
RemoteGrid.prototype.lookup = void (Object) || null;
//methods
RemoteGrid.prototype.populateLookup = function remoteGrid_populateLookup() {
	for (var lookup = this.lookup,width = this.width, x = 0; x!=width; x++) {
		for (var y = 0, height = this.height; y!=height; y++) {
			lookup[x+"_"+y] = new GridPosition(new GridCoordinate(x,y));//did you say not to over engineer this?
		}
	}
}
RemoteGrid.prototype.hasPosition = function remoteGrid_hasPosition(x,y) {
	return this.lookup[x+"_"+y] ? true : false;
}
RemoteGrid.prototype.getPosition = function remoteGrid_getPosition(x,y) {
	return this.lookup[x+"_"+y]||null;
}
RemoteGrid.prototype.setBoundaries = function remoteGrid_setBoundaries(maxWidth,maxHeight) {
	this.maxWidth = maxWidth;
	this.maxHeight = maxHeight;
	this.validate();
}
RemoteGrid.prototype.validate = function remoteGrid_validate() {//see Issue #3
	if ((typeof this.maxWidth) != "number" || typeof this.maxHeight != "number" || typeof this.width !=  "number" || typeof this.height != "number") {
		throw "Illegal dimensions set on grid";
	}
	if (this.maxWidth != -1 && this.maxHeight != -1) {
		if (this.width>this.maxWidth || this.height>this.maxHeight) {
			throw "Illegal boundaries set for remoteGrid";
		}
	}
}

function GridCoordinate(x,y) {
	this.x = x;
	this.y = y;
}
function GridPosition(coordinate) {
	this.coordinate = coordinate;
	this.items = []; 
}
GridPosition.prototype.addItem = function (item) {
	item.coordinate.x = this.coordinate.x;
	item.coordinate.y = this.coordinate.y;
	this.items.push(item);
	return item;
}
GridPosition.prototype.removeItem = function (item) {
	for (var i=0;i!=this.items.length;i++) {
		if (this.items[i]==item) {
			this.items.splice(i,1);
			delete item.coordinate.x;
			delete item.coordinate.y;
			return item;
		}
	}
	return null;
}

