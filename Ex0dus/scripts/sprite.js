var Sprite = function(src, width, height, offsetX, offsetY, frames, duration, owner) {
	this.spritesheet = null;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.offsetDir = 0;
	this.width = width;
	this.height = height;
	this.frames = frames;
	this.currentFrame = 0;
	this.duration = duration;
	this.posX = 0;
	this.posY = 0;
	this.shown = true;
	this.zoomLevel = 1;
	this.setSpritesheet(src);
	this.timer = new Date();
	this.myOwner = owner;
};
Sprite.prototype.setSpritesheet = function(src) {
	if ( src instanceof Image) {
		this.spritesheet = src;
	} else {
		this.spritesheet = new Image();
		this.spritesheet.src = src;
	}
};
Sprite.prototype.setPosition = function(x, y) {
	this.posX = x;
	this.posY = y;
};
Sprite.prototype.setOffset = function(x, y) {
	this.offsetX = x;
	this.offsetY = y;
};
Sprite.prototype.setFrames = function(fcount) {
	this.currentFrame = 0;
	this.frames = fcount;
};
Sprite.prototype.setDuration = function(duration) {
	this.duration = duration;
};

Sprite.prototype.setAction = function(action, dir) {

	switch(dir) {
		case 0:
			this.offsetDir = 0;
			break;
		case 1:
			this.offsetDir = 1 * (this.frames * this.width);
			break;
		case 2:
			this.offsetDir = 2 * (this.frames * this.width);
			break;
		case 3:
			this.offsetDir = 3 * (this.frames * this.width);
			break;
		case 4:
			this.offsetDir = 4 * (this.frames * this.width);
			break;
		case 5:
			this.offsetDir = 5 * (this.frames * this.width);
			break;
		case 6:
			this.offsetDir = 6 * (this.frames * this.width);
			break;
		case 7:
			this.offsetDir = 7 * (this.frames * this.width);
			break;
		default :
			this.offsetDir = 0;
			break;
	}

	this.offsetY = this.height * action;
};
Sprite.prototype.nextFrame = function() {
	document.getElementById("timer").innerHTML = "Timer: " + ((new Date()) - this.timer) + " Dur: " + (this.duration / this.frames);
	if (this.myOwner.isMoving) {
		if (((new Date()) - this.timer) > (this.duration / this.frames)) {
			this.offsetX = this.offsetDir + (this.width * this.currentFrame);

			if (this.currentFrame === (this.frames - 1)) {
				this.currentFrame = 0;
			} else {
				this.currentFrame++;
			}

			this.timer = new Date();
		}
	} else {
		this.currentFrame = 0;
		this.offsetX = this.offsetDir + (this.width * this.currentFrame);
	}
};
Sprite.prototype.draw = function(c) {
	if (this.shown) {
		this.nextFrame();
		c.drawImage(this.spritesheet, this.offsetX, this.offsetY, this.width, this.height, this.posX, this.posY, this.width * this.zoomLevel, this.height * this.zoomLevel);
	}
};
