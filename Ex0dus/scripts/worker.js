var Worker = function(posX, posY) {
	this.spritesheet = 'Img/m1/worker.png';
	this.spritesheet_selected = 'Img/m1/worker_selected.png';
	this.selected = false;
	this.health = 100;
	this.position = {
		x : posX,
		y : posY
	};
	this.targetPosition = {
		x : 0,
		y : 0
	};
	this.sprite = new Sprite(this.spritesheet, 67.5, 90, 0, 0, 21, 200, this);
	this.currentDirection = 0;
	this.currentAction = 0;
	this.speed = 0.02;
	this.isMoving = false;
};

Worker.prototype.setPosition = function(posX, posY) {
	this.position.x = posX;
	this.position.y = posY;
};

Worker.prototype.setTarget = function(posX, posY) {
	this.targetPosition.x = posX;
	this.targetPosition.y = posY;
};

Worker.prototype.move = function(interpol, game) {
	if ((this.targetPosition.x > 0 && this.targetPosition.x < game.map.grid.width - 0.5) && (this.targetPosition.y > 0 && this.targetPosition.y < game.map.grid.height - 0.5)) {
		if ((this.targetPosition.x - this.position.x) > 0.02 && (this.targetPosition.y - this.position.y) > 0.02) {
			/*this.position.x += ((this.speed * interpol) / 2);
			 this.position.y += ((this.speed * interpol) / 2);*/
			this.moveDirection("down", interpol);
		} else if ((this.targetPosition.x - this.position.x) < -0.02 && (this.targetPosition.y - this.position.y) < -0.02) {
			/*this.position.x -= ((this.speed * interpol) / 2);
			 this.position.y -= ((this.speed * interpol) / 2);*/
			this.moveDirection("up", interpol);
		} else if ((this.targetPosition.x - this.position.x) > 0.02 && (this.targetPosition.y - this.position.y) < -0.02) {
			/*this.position.x += ((this.speed * interpol) / 2);
			 this.position.y -= ((this.speed * interpol) / 2);*/
			this.moveDirection("right", interpol);
		} else if ((this.targetPosition.x - this.position.x) < -0.02 && (this.targetPosition.y - this.position.y) > 0.02) {
			/*this.position.x -= ((this.speed * interpol) / 2);
			 this.position.y += ((this.speed * interpol) / 2);*/
			this.moveDirection("left", interpol);
		} else if ((this.targetPosition.x - this.position.x) > 0.02) {
			//this.position.x += (this.speed * interpol);
			this.moveDirection("downRight", interpol);

		} else if ((this.targetPosition.x - this.position.x) < -0.02) {
			//this.position.x -= (this.speed * interpol);
			this.moveDirection("upLeft", interpol);

		} else if ((this.targetPosition.y - this.position.y) > 0.02) {
			//this.position.y += (this.speed * interpol);
			this.moveDirection("downLeft", interpol);

		} else if ((this.targetPosition.y - this.position.y) < -0.02) {
			//this.position.y -= (this.speed * interpol);
			this.moveDirection("upRight", interpol);
		} else
			this.isMoving = false;
	}

	if (this.selected && game.debug)
		document.getElementById("pos1").innerHTML = "Entitie PosX. " + this.position.x + " Entitie PosY. " + this.position.y + " Target PosX. " + this.targetPosition.x + " Target PosY. " + this.targetPosition.y;

};

Worker.prototype.moveDirection = function(dir, interpol) {
	this.isMoving = true;
	switch (dir) {
		case "left":
			this.position.x -= ((this.speed * interpol) / 2);
			this.position.y += ((this.speed * interpol) / 2);
			this.setDirection("left");
			this.currentDirection = 7;
			break;
		case "upLeft":
			this.position.x -= (this.speed * interpol);
			this.setDirection("upLeft");
			this.currentDirection = 0;
			break;
		case "up":
			this.position.x -= ((this.speed * interpol) / 2);
			this.position.y -= ((this.speed * interpol) / 2);
			this.setDirection("up");
			this.currentDirection = 1;
			break;
		case "upRight":
			this.position.y -= (this.speed * interpol);
			this.setDirection("upRight");
			this.currentDirection = 2;
			break;
		case "right":
			this.position.x += ((this.speed * interpol) / 2);
			this.position.y -= ((this.speed * interpol) / 2);
			this.setDirection("right");
			this.currentDirection = 3;
			break;
		case "downRight":
			this.position.x += (this.speed * interpol);
			this.setDirection("downRight");
			this.currentDirection = 4;
			break;
		case "down":
			this.position.x += ((this.speed * interpol) / 2);
			this.position.y += ((this.speed * interpol) / 2);
			this.setDirection("down");
			this.currentDirection = 5;
			break;
		case "downLeft":
			this.position.y += (this.speed * interpol);
			this.setDirection("downLeft");
			this.currentDirection = 6;
			break;
	}
};

Worker.prototype.setDirection = function(dir) {
	switch (dir) {
		case "left":
			this.setAction(0, 7);
			this.currentDirection = 7;
			break;
		case "upLeft":
			this.setAction(0, 6);
			this.currentDirection = 6;
			break;
		case "up":
			this.setAction(0, 5);
			this.currentDirection = 5;
			break;
		case "upRight":
			this.setAction(0, 4);
			this.currentDirection = 4;
			break;
		case "right":
			this.setAction(0, 3);
			this.currentDirection = 3;
			break;
		case "downRight":
			this.setAction(0, 2);
			this.currentDirection = 2;
			break;
		case "down":
			this.setAction(0, 1);
			this.currentDirection = 1;
			break;
		case "downLeft":
			this.setAction(0, 0);
			this.currentDirection = 0;
			break;
	}
};

Worker.prototype.setAction = function(action, dir) {
	this.sprite.setAction(action, dir);
};

Worker.prototype.mapToScreen = function(game) {
	var point = {
		x : 0,
		y : 0
	};
	point.x = game.map.MapToScreen(game.scroll.x + this.position.x, game.scroll.y + this.position.y, game).x + (game.map.MapImage["tile"].width / 2 - (this.sprite.width / 2));
	point.y = game.map.MapToScreen(game.scroll.x + this.position.x, game.scroll.y + this.position.y, game).y - (this.sprite.height / 2);

	return point;
};

Worker.prototype.screenToMap = function(x, y, game) {
	var point = {
		x : 0,
		y : 0
	};
	point.x = (game.map.ScreenToMap((x - ((game.map.MapImage["tile"].width) + (this.sprite.width/2))), y, game).x - game.scroll.x);
	point.y = (game.map.ScreenToMap(x - (game.map.MapImage["tile"].width / 2), y - (this.sprite.height / 2), game).y - game.scroll.y);

	return point;
};

Worker.prototype.draw = function(game) {
	if (this.selected) {
		this.sprite.setSpritesheet(this.spritesheet_selected);
	} else {
		this.sprite.setSpritesheet(this.spritesheet);
	}
	this.sprite.setPosition(this.mapToScreen(game).x, this.mapToScreen(game).y);
	this.sprite.draw(game.ctx);

};
