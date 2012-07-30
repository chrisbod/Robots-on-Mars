function RemoteGrid(width,height) {
	this.width = width;//lower right
	this.height = height;//upper right
	//be lazy and store items on points of grid as x_y?
	this.lookup = {};
}