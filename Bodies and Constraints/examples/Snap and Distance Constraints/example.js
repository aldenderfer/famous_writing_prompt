/* Snap and Distance Constraints example
 * Author: Kristof Aldenderfer
 * The "dist" variable is the only part of this lesson I am unsatisfied with;
 * the math is sloppy, and the sleekness of the example code suffers because of it.
 */

var Engine            = famous.core.Engine;
var Surface           = famous.core.Surface;
var Modifier          = famous.core.Modifier;
var PhysicsEngine     = famous.physics.PhysicsEngine;
var Circle            = famous.physics.bodies.Circle;
var Distance          = famous.physics.constraints.Distance;
var Snap              = famous.physics.constraints.Snap;

var context = Engine.createContext();
var physics = new PhysicsEngine();

context.setPerspective(100);
var centeringNode = context.add(new Modifier({align: [0, 0.5], origin: [0.5, 0.5]}));

var message = "famous";

function makeBall(x,ch) {
	var ball = {};
	var dist = window.innerWidth/(message.length+1);
	ball.surface = new Surface ({
		size: [dist/2, dist/2],
		content: ch,
		properties: {
			border: '2px solid green',
			borderRadius: '50%',
			backgroundColor: 'lightGreen',
			fontSize: dist/3+'px',
			lineHeight: dist/2+'px',
			textAlign: 'center'
		}
	});
	ball.circle = new Circle({
		radius: dist/4,
		position: [dist*x, 0, -10],
	});
	ball.home = new Snap({
		anchor: [dist*x, 0, 0],
		period: 1000,
		dampingRatio: 0.1
	});
	ball.rope = new Distance({
		anchor: ball.circle,
		length: dist/2,
		period: 500,
		dampingRatio: 0.2
	});
	return ball;
}

var balls = [];
for (var i=0 ; i<message.length ; i++) {
	balls[i] = makeBall(i+1, message[i]);
}

balls.forEach(function(ball, index) {

	physics.addBody(ball.circle);
	centeringNode.add(ball.circle).add(ball.surface);

	physics.attach(ball.home, ball.circle);
	if (index!=(message.length-1)) physics.attach(ball.rope, balls[index+1].circle);
	if (index!=0) physics.attach(ball.rope, balls[index-1].circle);

	ball.surface.on('click', function() {
		ball.circle.setVelocity([0,-1,-1]);
	});

});