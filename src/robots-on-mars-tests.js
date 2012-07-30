window.onerror = function (error) {//now that is lazy
	alert("Test failed:\n"+error);
}
	var robotsOnMarsTest = new RobotsOnMars();
robotsOnMarsTest.createGrid("5 3"); //things are better when you pay attention

//putting back in grid testing (a bit sneaky to have it here as it really is a 'unit' test for grids not robotsOnMarsTest)
//over doing it a bit but logged as Issue #1;

if (!robotsOnMarsTest.grid.hasPosition(0,0) || robotsOnMarsTest.grid.hasPosition(6,4)) {
	throw "robots on mars grid is not sized correctly";
}

robotsOnMarsTest.insertRobot("1 1 E");
robotsOnMarsTest.instructRobot("RFRFRFRF"); //I'll never really get into chaining properly

if (robotsOnMarsTest.getOutput()!="1 1 E") {
	throw "Unexpected result [1 1 E,RFRFRFRF]->"+robotsOnMars.getOutput();
}

robotsOnMarsTest
	.insertRobot("3 2 N");
//check that we have a 'clean state' now that a new robot is in play
if (robotsOnMarsTest.getOutput()) {
	throw "Inserted new robot but output is not clean ("+robotsOnMars.getOutput()+")";
}

robotsOnMarsTest.instructRobot("FRRFLLFFRRFLL")

if (robotsOnMarsTest.getOutput()!="3 3 N LOST") {
	throw "Unexpected result [3 2 N,FRRFLLFFRRFLL]->"+robotsOnMars.getOutput();
}
robotsOnMarsTest.insertRobot("0 3 W");
robotsOnMarsTest.instructRobot("LLFFFLFLFL")
if (robotsOnMarsTest.getOutput()!="2 3 S") {
	throw "Unexpected result [0 3 W,LLFFFLFLFL]->"+robotsOnMars.getOutput();
}
window.onerror = null;