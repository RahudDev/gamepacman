var draw_asteroid = function (ctx, radius, shape, options) {
	options = options || {};
	ctx.strokeStyle = options.stroke || "white";
	ctx.fillStyle = options.fill || "black";
	ctx.save();
	ctx.translate(200,200);
	ctx.beginPath();
	for(var i = 0; i< shape.length; i++) {
		ctx.rotate(2* Math.PI/ shape.length);
		ctx.lineTo(radius+ radius*options.noise* shape[i],0);
	}
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	if (options.bimbing) {
		ctx.lineWidth = 0.5;
		ctx.beginPath();
		ctx.arc(0,0,radius,0,2*Math.PI);
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = 0.2;
		ctx.arc(0,0, radius + radius * options.noise,0,2 *Math.PI);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0,0, radius - radius * options.noise,0 , 2*Math.PI);
		ctx.stroke();
		
	}
	ctx.restore();
};


function draw_ship1(ctx, radius, options) {
 options = options || {};
 var angle = (options.angle || 0.5 * Math.PI) / 2;
 ctx.save();
 ctx.translate(200, 200);
 if(options.guide) {
 ctx.strokeStyle = "white";
 ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
 ctx.lineWidth = 0.5;
 ctx.beginPath();
 ctx.arc(0, 0, radius, 0, 2 * Math.PI);
 ctx.stroke();
 ctx.fill();
 }
 if(options.thruster) {
	 ctx.strokeStyle = "yellow";
	 ctx.fillStyle = "red";
	 ctx.lineWidth = 3;
	 ctx.beginPath();
	 ctx.moveTo(
	 Math.cos(Math.PI + angle * 0.8) * radius/2,
	 Math.sin(Math.PI + angle * 0.8) * radius/2);
	 ctx.quadraticCurveTo(-radius *2, 0, 
	 Math.cos(Math.PI - angle * 0.8) * radius/2,
	 Math.sin(Math.PI - angle * 0.8) * radius/2);
	 ctx.stroke();
	 ctx.fill();
 }
 ctx.lineWidth = options.lineWidth || 2;
 ctx.strokeStyle = options.stroke || "white";
 ctx.fillStyle = options.fill || "black";
 ctx.beginPath();
 ctx.moveTo(radius, 0);
 ctx.lineTo(
 Math.cos(Math.PI - angle) * radius,
 Math.sin(Math.PI - angle) * radius
 );
 ctx.lineTo(
 Math.cos(Math.PI + angle) * radius,
 Math.sin(Math.PI + angle) * radius
 );
 ctx.closePath();
 ctx.fill();
 ctx.stroke();
 ctx.restore();
}

var draw_grid = function (ctx, minor, major, stroke, fill) {
	minor = minor || 10;
	major = major || minor * 5;
	stroke = stroke || "#00FF00";
	fill = fill || "#009900";
	ctx.save();
	ctx.strokeStyle = stroke;
	ctx.fillStyle = fill;
	var width = ctx.canvas.width, height = ctx.canvas.height
	for (var x= 0; x < width; x += minor) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, height);
		ctx.lineWidth = (x % major == 0) ? 0.5 : 0.25;
		ctx.stroke();
		if (x % major == 0) {ctx.fillText(x,x,10);}
	}
	for (var y = 0; y< height; y += minor) {
		ctx.beginPath();
		ctx.moveTo(0,y);
		ctx.lineTo(width, y);
		ctx.lineWidth = (y % major ==0) ? 0.5 : 0.25;
		ctx.stroke();
		if (y % major == 0) {ctx.fillText(y,0,y+10);}
	}
	ctx.restore();
};

var polo = document.getElementById("pacman").getContext("2d");
draw_grid(polo);

var draw_ghost = function (ctx, radius, options) {
  options = options || {};
  var feet = options.feet || 4;
  var head_radius = radius * 0.9;
  var foot_radius = head_radius / feet;
  ctx.save();
  ctx.translate(200,200);
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "red";
  ctx.lineWidth = options.lineWidth || radius * 0.05;
  ctx.beginPath();
  for (var foot= 0; foot< feet; foot++) {
    ctx.arc((2 * foot_radius *(feet - foot))- head_radius-foot_radius, radius - foot_radius, foot_radius, 0, Math.PI);
  }
  ctx.lineTo(-head_radius, radius - foot_radius);
  ctx.arc(0, head_radius - radius, head_radius, Math.PI, 2* Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(40,-50, 25,0, 2*Math.PI);
  ctx.arc(-40, -50, 25,0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(30, -40, 10,0, 2*Math.PI);
  ctx.arc(-50, -40, 10,0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};
draw_ghost(polo, 100, {feet: 8, stroke: "white", fill: "red", lineWidth : 0.5 });

var draw_pacman = function (ctx, radius, mouth) {
 var angle = 0.2 * Math.PI * mouth;
  ctx.save();
  ctx.translate(50,50);
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(0,0, radius, angle, -angle);
  ctx.lineTo(0,0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};
draw_pacman(polo, 50, 0.9);

var polonia = document.getElementById("pacman2").getContext("2d");
draw_grid(polonia);

var pacman = new PacMan(150, 150, 50, 120);
function draw(ctx, guide) {
draw_grid(ctx);
 pacman.draw(ctx);
 }
function update(elapsed) {
 pacman.update(elapsed, 300, 300);
 }
 
 function PacMan(x, y, radius, speed) {
 this.x = x;
 this.y = y;
 this.radius = radius;
 this.speed = speed;
 this.angle = 0;
 this.x_speed = speed;
 this.y_speed = 0;
 this.time = 0;
 this.mouth = 0;
};
PacMan.prototype.draw = function(ctx) {
 ctx.save();
 ctx.translate(this.x, this.y);
 ctx.rotate(this.angle);
 draw_pacman(ctx, this.radius, this.mouth);
 ctx.restore();
}
PacMan.prototype.turn = function(direction) {
 if(this.y_speed) {
 // if we are travelling vertically
 // set the horizontal speed and apply the direction
 this.x_speed = -direction * this.y_speed;
 // clear the vertical speed and rotate
 this.y_speed = 0;
 this.angle = this.x_speed > 0 ? 0 : Math.PI;
 } else {
 // if we are travelling horizontally
 // set the vertical speed and apply the direction
 this.y_speed = direction * this.x_speed;
		
	this.x_speed = 0;
 this.angle = this.y_speed > 0 ? 0.5 * Math.PI : 1.5 * Math.
PI;
 }
}
PacMan.prototype.turn_left = function() {
 this.turn(-1);
}
PacMan.prototype.turn_right = function() {
 this.turn(1);
}
PacMan.prototype.update = function(elapsed, width, height) {
 // an average of once per 100 frames
 if(Math.random() <= 0.0001) {
 if(Math.random() < 0.10) {
 this.turn_left();
 } else {
 this.turn_right();
 }
 }
 if(this.x - this.radius + elapsed * this.x_speed > width) {
 this.x = -this.radius;
 }
 if(this.x + this.radius + elapsed * this.x_speed < 0) {
 this.x = width + this.radius;
 }
 if(this.y - this.radius + elapsed * this.y_speed > height) {
 this.y = -this.radius;
 }
 if(this.y + this.radius + elapsed * this.y_speed < 0) {
 this.y = height + this.radius;
 }
 this.x += this.x_speed * elapsed;
 this.y += this.y_speed * elapsed;
 this.time += elapsed;
 this.mouth = Math.abs(Math.sin(2 * Math.PI * this.time));
}

PacMan.prototype.move_right = function () {
  this.x_speed = this.speed;
  this.y_speed = 0;
  this.angle = 0;
}
PacMan.prototype.move_down = function () {
  this.x_speed = 0;
  this.Y_speed = this.speed;
  this.angle = 0.5 * Math.PI;
}
PacMan.prototype.move_left = function () {
  this.x_speed = -this.speed;
  this.y_speed = 0;
  this.angle = Math.PI;
}
PacMan.prototype.move_up = function () {
  this.x_speed = 0;
  this.y_speed = -this.speed;
  this.angle = 1.5 * Math.PI;
}

window.onkeydown = function (e) {
  var key = e.key || e.keyCode;
  var nothing_handled = false;
  switch(key) {
    case "ArrowLeft" :
    case 37 :
    pacman.move_left();
    break;
    case "ArrowUp" :
    case 38 :
    pacman.move_up();
     break;
    case "ArrowRight" :
    case 39 :
    pacman.move_right();
     break;
    case "ArrowDown" :
    case 40 :
    pacman.move_down();
     break;
    default:
      nothing_handled : true; 
  }
  
}

function isMobileDevice() {
  return ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);
}

function createMobileControls() {
  const controlsContainer = document.createElement('div');
  controlsContainer.id = 'mobile-controls';
  controlsContainer.style.position = 'fixed';
  controlsContainer.style.bottom = '20px';
  controlsContainer.style.left = '50%';
  controlsContainer.style.transform = 'translateX(-50%)';
  controlsContainer.innerHTML = `
      <button id="left-btn"> ← </button>
      <button id="up-btn"> ↑ </button>
      <button id="right-btn"> → </button>
      <button id="down-btn"> ↓ </button>
  `;
  document.body.appendChild(controlsContainer);

  // Event listeners for the buttons
  document.getElementById('left-btn').addEventListener('touchstart', function(e) { e.preventDefault(); pacman.move_left(); });
  document.getElementById('up-btn').addEventListener('touchstart', function(e) { e.preventDefault(); pacman.move_up(); });
  document.getElementById('right-btn').addEventListener('touchstart', function(e) { e.preventDefault(); pacman.move_right(); });
  document.getElementById('down-btn').addEventListener('touchstart', function(e) { e.preventDefault(); pacman.move_down(); });
}

if (isMobileDevice()) {
  createMobileControls();
}


//animation ghost {pacman}
var draw_ghost_2 = function (ctx, radius, options) {
  options = options || {};
  var feet = options.feet || 4;
  var head_radius = radius * 0.9;
  var foot_radius = head_radius / feet;
  ctx.save();
  //ctx.translate(200,200);
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "red";
  ctx.lineWidth = options.lineWidth || radius * 0.05;
  ctx.beginPath();
  for (var foot= 0; foot< feet; foot++) {
    ctx.arc((2 * foot_radius *(feet - foot))- head_radius-foot_radius, radius - foot_radius, foot_radius, 0, Math.PI);
  }
  ctx.lineTo(-head_radius, radius - foot_radius);
  ctx.arc(0, head_radius - radius, head_radius, Math.PI, 2* Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(7,-5, 5,0, 2*Math.PI);
  ctx.arc(-7, -5, 5,0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(6, -4, 3,0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.arc(-8, -4, 3,0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};
 var Ghost = function (x, y, radius, speed, colour) {
 this.x = x;
 this.y = y;
 this.radius = radius;
 this.speed = speed;
 this.colour = colour;
}
Ghost.prototype.draw = function(ctx) {
 ctx.save();
 ctx.translate(this.x, this.y);
 draw_ghost_2(ctx, this.radius, {
 fill: this.colour, feet: 7
 });
 ctx.restore();
}
var pacman = new PacMan(150, 300, 20, 100);
 var ghosts = [
 new Ghost(Math.random() * 300, Math.random() * 300, 20,
120, 'red'),
 new Ghost(Math.random() * 300, Math.random() * 300, 20,
60, 'pink'),
 new Ghost(Math.random() * 300, Math.random() * 300, 20,
50, 'cyan'),
 new Ghost(Math.random() * 300, Math.random() * 300, 20,
40, 'orange')
 ]
 function draw(ctx, guide) {
 draw_grid(ctx);
 pacman.draw(ctx);
 ghosts.forEach(function(ghost) {
 ghost.draw(polonia, guide);
 });
 }
 function update(elapsed) {
 pacman.update(elapsed, 700, 350);
 ghosts.forEach(function(ghost) {
 ghost.update(pacman, elapsed);
 });
 }
Ghost.prototype.update = function(target, elapsed) {
 var angle = Math.atan2(target.y - this.y, target.x - this.x);
 var x_speed = Math.cos(angle) * this.speed;
 var y_speed = Math.sin(angle) * this.speed;
 this.x += x_speed * elapsed;
 this.y += y_speed * elapsed;
}

// Define the animation frame variable globally
var previous, elapsed;
// Your game code here


