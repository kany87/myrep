var Game = function(canvas) {
	this.fps = 60;
	this.fpsCount = 0;
	this.lastTime = 0;
	this.timer = 0;
	this.ctx = canvas.getContext('2d');
	this.canvas = canvas;
	this.map = new Map(0, 0);
	this.scroll = {
		x : 0,
		y : 0,
		lastX : 1,
		lastY : 1
	};
	this.mouseLBClickPos = {
		x : null,
		y : null,
		clear : function() {
			this.x = null;
			this.y = null;
		}
	};
	this.mouseRBClickPos = {
		x : null,
		y : null,
		clear : function() {
			this.x = null;
			this.y = null;
		}
	};
	this.workers = new Array();
	this.space = new Array();
	this.renderer = 0;
	this.renderorder = 0;
	this.key = 0;
	this.dir = 0;
	this.debug = false;
	this.hover = {
		x : 0,
		y : 0
	};
	this.w1 = {
		targetX : 0,
		targetY : 0
	};
	this.w2 = {
		targetX : 10,
		targetY : 10
	};
	this.walk = false;
	this.render = false;
};

Game.prototype.doResize = function() {

	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;

	this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

};

Game.prototype.setMap = function(map) {

	this.map = map;
	this.map.MapConstructor();
};

Game.prototype.addEntitie = function(pos) {
	this.workers.push(new Worker(pos.x, pos.y));
};

Game.prototype.getAngle = function(a, b) {
	var angle = Math.atan2(b.y - a.y, b.x - a.x);
	angle = angle * (180 / Math.PI);
	return angle;
};

Game.prototype.draw = function(interpol) {

	var curTime = new Date().getSeconds();
	if (this.timer !== curTime) {
		this.timer = curTime;
		this.fps = this.fpsCount;
		this.fpsCount = 0;
	} else {
		this.fpsCount++;
	}

	/*if (this.scroll.lastX != this.scroll.x || this.scroll.lastY != this.scroll.y)
	 this.render = true;*/

	this.move(interpol);

	//if(this.render)
	this.Render();

	if (this.debug) {
		document.getElementById("fps").innerHTML = this.fps;
		document.getElementById("interpol").innerHTML = interpol;
	}

};

Game.prototype.move = function(interpol) {

	this.renderorder = new Array();

	for (var i = 0; i < this.workers.length; i++) {

		if (this.mouseLBClickPos.x != null && this.mouseLBClickPos.y != null) {

			var workerstartX = this.workers[i].sprite.posX;
			var workerstartY = this.workers[i].sprite.posY;
			var entitieEndX = this.workers[i].sprite.posX + this.workers[i].sprite.width;
			var entitieEndY = this.workers[i].sprite.posY + this.workers[i].sprite.height;

			if (this.mouseLBClickPos.x >= workerstartX && this.mouseLBClickPos.x <= entitieEndX && this.mouseLBClickPos.y >= workerstartY && this.mouseLBClickPos.y <= entitieEndY) {
				if (this.workers[i].selected)
					this.workers[i].selected = false;
				else
					this.workers[i].selected = true;
			} else
				this.workers[i].selected = false;
		}

		if (this.mouseRBClickPos.x != null && this.mouseRBClickPos.y != null) {
			if (this.workers[i].selected == true) {
				var targetX = this.workers[i].screenToMap(this.mouseRBClickPos.x, this.mouseRBClickPos.y, this).x;
				var targetY = this.workers[i].screenToMap(this.mouseRBClickPos.x, this.mouseRBClickPos.y, this).y;
				this.workers[i].setTarget(targetX, targetY);
			}
			//this.walk = true;
		}

		/*if (this.walk) {
		 if (i == 0) {
		 if (this.w1.targetX == 0) {
		 this.w1.targetX = 10;
		 this.w1.targetY = 10;
		 this.workers[0].setTarget(this.w1.targetX, this.w1.targetY);
		 }
		 }

		 if (i == 1) {
		 if (this.workers[1].position.x > 9.98) {
		 this.workers[1].setTarget(this.w2.targetX, this.w2.targetY);
		 } else
		 this.workers[1].setTarget(this.w2.targetX, 0);

		 }
		 }*/

		if (this.workers[i].selected && this.debug) {
			var oldx = this.workers[i].position.x;
			var oldy = this.workers[i].position.y;
			document.getElementById("pos2").innerHTML = "Speed X: " + (this.workers[i].position.x - oldx).toFixed(4) + "  Speed Y: " + (this.workers[i].position.y - oldy).toFixed(4);

		}

		this.workers[i].move(interpol, this);

		this.renderorder[i] = (this.workers[i].position.x + this.workers[i].position.y);

		/*if (this.workers[i].isMoving) {
		 this.render = true;
		 }*/
	}

	this.renderorder.sort(function(a, b) {
		return a - b;
	});

	this.mouseLBClickPos.clear();
	this.mouseRBClickPos.clear();

	this.scroll.lastX = this.scroll.x;
	this.scroll.lastY = this.scroll.y;

};

Game.prototype.Render = function() {

	this.doResize();
	this.map.draw(this);
	this.renderer = new Array();

	for (var i = 0; i < this.workers.length; i++) {
		for (var j = 0; j < this.renderorder.length; j++) {
			if ((this.workers[i].position.x + this.workers[i].position.y) == this.renderorder[j]) {
				if (this.renderer[j] == null) {
					this.renderer[j] = new Array();
				}

				this.renderer[j].push(this.workers[i]);

				this.ctx.strokeStyle = "#FFF";
				this.ctx.strokeRect(this.workers[i].sprite.posX, this.workers[i].sprite.posY, this.workers[i].sprite.width, this.workers[i].sprite.height);
			}
		}
	}

	if (this.debug)
		document.getElementById("pos3").innerHTML = "";

	for (var i = 0; i < this.renderer.length; i++) {
		for (var j = 0; j < this.renderer[i].length; j++) {
			if (this.debug)
				document.getElementById("pos3").innerHTML += "<br/> renderer[" + i + "][" + j + "] = " + (this.renderer[i][j].position.x + this.renderer[i][j].position.y);

			this.renderer[i][j].draw(this);
		}
	}

	//this.render = false;
};

Game.prototype.run = function(nowTime) {
	this.draw((nowTime - this.lastTime) / 10);
	this.lastTime = nowTime;
};
