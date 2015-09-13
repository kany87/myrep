var MyCanvas = function() {
	this.started = false;
	this.mousevec = {
		x : 0,
		y : 0
	};
	this.lastpos = {
		x : 0,
		y : 0
	};
	this.speed = {
		x : 0,
		y : 0
	};
	this.mouseLBDown = false;
	this.mouseMBDown = false;
	this.mouseRBDown = false;

	this.lastMousePos = {
		x : 0,
		y : 0
	};
	this.moveMousePos = {
		x : 0,
		y : 0
	};
	this.mapsize = {
		x : 40,
		y : 40
	};
	this.canvas = document.getElementById('myCanvas');
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
	this.game = new Game(this.canvas);
	this.game.debug = true;
	this.worker = new Worker();
	this.worker1 = new Worker(1,1);
	this.map = new Map(this.mapsize.x, this.mapsize.y);
	this.game.setMap(this.map);
	this.game.addEntitie({x: 2, y: 2});
	this.game.addEntitie({x: 4, y: 4});
	this.game.scroll.x = 0;
	this.game.scroll.y = 0;
	this.loaded = true;

	this.run = function() {
		if (this.game.debug)
			x = "StartCol: " + this.game.map.startCol + " ColCount: " + this.game.map.colCount + " StartRow: " + this.game.map.startRow + " RowCount: " + this.game.map.rowCount;

		this.game.run(new Date().getTime());
	};

	this.mousedown = function(event) {

		if (event.button == 0) {
			this.mouseLBDown = true;
			this.game.mouseLBClickPos.x = event.clientX;
			this.game.mouseLBClickPos.y = event.clientY;
		}

		if (event.button == 1) {
			this.mouseMBDown = true;
			this.lastMousePos.x = event.clientX;
			this.lastMousePos.y = event.clientY;
		}

		if (event.button == 2) {
			this.mouseRBDown = true;
			this.game.mouseRBClickPos.x = event.clientX;
			this.game.mouseRBClickPos.y = event.clientY;
		}

	};

	this.mouseup = function(event) {

		if (event.button == 1) {
			this.mouseMBDown = false;
		}

	};

	this.mousemove = function(event) {
		if (this.mouseMBDown == true) {

			this.moveMousePos.x = event.clientX - this.lastMousePos.x;
			this.moveMousePos.y = event.clientY - this.lastMousePos.y;
			this.lastMousePos.x = event.clientX;
			this.lastMousePos.y = event.clientY;
		}
		this.game.scroll.x += this.moveMousePos.x / 20;
		this.game.scroll.y += this.moveMousePos.y / 20;
		this.moveMousePos.x = 0;
		this.moveMousePos.y = 0;

		if (this.game.scroll.x > 0)
			this.game.scroll.x = 0;
		if (this.game.scroll.y > 0)
			this.game.scroll.y = 0;
		if (this.game.scroll.x < (this.mapsize.x * -1))
			this.game.scroll.x = (this.mapsize.x * -1);
		if (this.game.scroll.y < (this.mapsize.y * -1))
			this.game.scroll.y = (this.mapsize.y * -1);

		if (this.game.debug) {
			var workerstartX = this.game.map.MapToScreen(this.game.scroll.x + this.worker.position.x, this.game.scroll.y + this.worker.position.y, this.game).x + (this.worker.sprite.width / 2);
			var workerstartY = this.game.map.MapToScreen(this.game.scroll.x + this.worker.position.x, this.game.scroll.y + this.worker.position.y, this.game).y - (this.worker.sprite.height / 2);
			var workerendX = this.game.map.MapToScreen(this.game.scroll.x + this.worker.position.x, this.game.scroll.y + this.worker.position.y, this.game).x + (this.worker.sprite.width);
			var workerendY = this.game.map.MapToScreen(this.game.scroll.x + this.worker.position.x, this.game.scroll.y + this.worker.position.y, this.game).y + (this.worker.sprite.height / 2);
			document.getElementById("pos").innerHTML = "Client X " + event.clientX + " Client Y " + event.clientY + " WorkerStart X " + workerstartX + " WorkerStart Y " + workerstartY + " WorkerEnd X " + workerendX + " WorkerEnd Y " + workerendY;
		}
	};

	/*document.addEventListener('mousemove', function(event) {

	 mousevec = {
	 x: game.canvas.width,
	 y: game.canvas.height
	 };

	 var newmouse = {
	 x: event.clientX + game.canvas.width / 2,
	 y: event.clientY + game.canvas.height / 2
	 };

	 var angle = game.getAngle(newmouse, mousevec);

	 if (angle < 45 && angle > 0) {
	 worker.setDirection("left");
	 } else if (angle > 45 && angle < 90) {
	 worker.setDirection("upLeft");
	 } else if (angle > 90 && angle < 135) {
	 worker.setDirection("up");
	 } else if (angle > 135 && angle < 180) {
	 worker.setDirection("upRight");
	 } else if (angle > -180 && angle < -135) {
	 worker.setDirection("right");
	 } else if (angle > -135 && angle < -90) {
	 worker.setDirection("downRight");
	 } else if (angle > -90 && angle < -45) {
	 worker.setDirection("down");
	 } else if (angle > -45 && angle < 0) {
	 worker.setDirection("downLeft");
	 }

	 document.getElementById("mouseinfo").innerHTML = "MouseX: " + newmouse.x + " " + " MouseY: " + newmouse.y + " Angle: " + angle;

	 }, false);*/

};
