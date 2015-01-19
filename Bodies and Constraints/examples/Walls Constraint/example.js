/* Walls Constraint example
 * Author: Kristof Aldenderfer
 * Physics engine Walls attach workaround from:
 *		https://gist.github.com/dai-shi/6ea9d681c299aa44cbc0
 */

var Engine          = famous.core.Engine;
var Surface         = famous.core.Surface;
var Modifier        = famous.core.Modifier;
var PhysicsEngine   = famous.physics.PhysicsEngine;
var Circle          = famous.physics.bodies.Circle;
var Walls           = famous.physics.constraints.Walls;

var context = Engine.createContext();
var physics = new PhysicsEngine();

var centeringNode = context.add(new Modifier({align: [0.5, 0.5], origin: [0.5, 0.5]}));

var surface = new Surface ({
	size: [100, 100],
	properties: {
		backgroundColor: 'green',
		borderRadius: '50%'
	}
});
var circle = new Circle({
	size: [100, 100],
	velocity: [(Math.random()-0.5)*2, (Math.random()-0.5)*2]
});

physics.addBody(circle);
centeringNode.add(circle).add(surface);

var walls = new Walls({
	size : [500, 500],
	align: [0.5, 0.5]
});

for (var wall in walls.components) {
	physics.attach(walls.components[wall], circle);
}