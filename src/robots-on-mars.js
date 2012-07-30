function RobotsOnMars() {}
	RobotsOnMars.prototype.createGrid = function robotsOnMars_createGrid(gridDefinition) {
		this.definitionString = gridDefinition;
		this.definitionArray = gridDefinition.split(" ");
		this.grid = new RemoteGrid(+this.definitionArray[0],+this.definitionArray[1]);
		this.grid.setBoundaries(50,50);
		this.robots = [];
		this.lostRobots = [];
		return this;
	}
	//Properties
	RobotsOnMars.prototype.definitionString = "";
	RobotsOnMars.prototype.definitionArray = void (Array) || null;
	RobotsOnMars.prototype.grid = void (RemoteGrid) || null;
	RobotsOnMars.prototype.robots = void (Array(Robot)) || null;
	RobotsOnMars.prototype.currentOutput = "";
	
	
	//Methods
	RobotsOnMars.prototype.insertRobot = function robotsOnMars_insertRobot(robotDefinition) {
		delete this.currentOutput;
		var robotDefinitionArray = robotDefinition.split(" "),
			x = +robotDefinitionArray[0],
			y = +robotDefinitionArray[1],
			robot = new Robot(x,y,robotDefinitionArray[2],this.grid);
		this.grid.getPosition(x,y).addItem(robot);
		robot.onMoveForward = this.getRobotOnMoveForwardHandler();
		robot.onProcessInstructionEnd = this.getRobotOnProcessInstructionEndHandler();
		this.robots.push(robot);
	}
	RobotsOnMars.prototype.getRobotOnMoveForwardHandler = function robotsOnMars_getRobotOnMoveForwardHandler() {
		var robotsOnMars = this;
		return function robotsOnMars_getRobotOnMoveForwardHandler_Closure() {
			//this is starting to feel  wrong see Issue #6 - too circular
			robotsOnMars.checkRobotStatus(this);
			
		}
	}
	RobotsOnMars.prototype.checkRobotStatus =  function (robot) {
		if (this.robotIsLost(robot)) {
			robot.lost = true;
		}
	}
	RobotsOnMars.prototype.robotIsLost = function (robot) {
		return !this.grid.hasPosition(robot.coordinate.x,robot.coordinate.y)
	}
	RobotsOnMars.prototype.getRobotOnProcessInstructionEndHandler = function robotsOnMars_getRobotOnProcessInstructionEndHandler() {
		var robotsOnMars = this;
		return function robotsOnMars_getRobotOnProcessInstructionEndHandler_Closure() {
			//this is totally the wrong approach I think see Issue #5
			robotsOnMars.buildOutputFromRobot(this);
		}
	}
	RobotsOnMars.prototype.buildOutputFromRobot = function robots_buildOutputFromRobot(robot) {
		if (robot.lost) {
			this.currentOutput = robot.scent.coordinate.x + " " + robot.scent.coordinate.y +" "+robot.orientation + " LOST"
		} else {
		this.currentOutput = robot.coordinate.x+" "+robot.coordinate.y+" "+robot.orientation;
		}
	
	}
	RobotsOnMars.prototype.instructRobot = function robotsOnMars_instructRobot(instruction) {
		if (instruction.length >= 100){//validate here as there is no reason for robots to care about how long their instructions are
		//ALSO see Issue #3
			throw "Illegal instruction length for a robotsOnMars Robot";
		}
		//for the moment a robot instruction will ALWAYS go to the newest robot;
		var robot = this.robots[this.robots.length-1];
		robot.processInstruction(instruction);
	}
	RobotsOnMars.prototype.getOutput = function robotsOnMars_getOutput() {
		return this.currentOutput;
	}
	RobotsOnMars.prototype.renderOutput = function robotsOnMars_renderOutput() {
		alert(this.currentOutput);
	}