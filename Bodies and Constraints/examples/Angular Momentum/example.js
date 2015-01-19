/* Rectanglar Bodies and Angular Momentum
 * Author: Kristof Aldenderfer
 */

var Engine          = famous.core.Engine;
var Surface         = famous.core.Surface;
var Modifier        = famous.core.Modifier;
var PhysicsEngine   = famous.physics.PhysicsEngine;
var Rectangle       = famous.physics.bodies.Rectangle;

var context = Engine.createContext();
var physics = new PhysicsEngine();

context.setPerspective(1000);
var centeringNode = context.add(new Modifier({align: [0.5, 0.5], origin: [0.5, 0.5]}));

var xSurface = new Surface({
	size: [50, 50],
	content: "X",
	properties: {
		border: '2px solid red',
		backgroundColor: 'pink',
		backfaceVisibility: 'visible',
		fontSize: '20px',
		lineHeight: '50px',
		textAlign: 'center'
	}
});
var xRectangle = new Rectangle({
	size: [50, 50],
	mass: 1,
	position: [-120, 0, 0]
});
physics.addBody(xRectangle);
centeringNode.add(xRectangle).add(xSurface);

var ySurface = new Surface({
size: [100, 100],
	content: "Y",
	properties: {
		border: '2px solid green',
		backgroundColor: 'lightGreen',
		backfaceVisibility: 'visible',
		fontSize: '20px',
		lineHeight: '100px',
		textAlign: 'center'
	},
});
var yRectangle = new Rectangle({
	size: [100, 100],
	mass: 1,
	position: [0, 0, 0]
});
physics.addBody(yRectangle);
centeringNode.add(yRectangle).add(ySurface);

var zSurface = new Surface({
	size: [100,100],
	content: "Z",
	properties: {
		border: '2px solid blue',
		backgroundColor: 'lightBlue',
		backfaceVisibility: 'visible',
		fontSize: '20px',
		lineHeight: '100px',
		textAlign: 'center'
	}
});
var zRectangle = new Rectangle({
	size: [100, 100],
	mass: 10,
	position: [120, 0, 0]
});
physics.addBody(zRectangle);
centeringNode.add(zRectangle).add(zSurface);

xRectangle.setAngularMomentum([2, 0, 0]);
yRectangle.setAngularMomentum([0, 2, 0]);
zRectangle.setAngularMomentum([0, 0, 2]);