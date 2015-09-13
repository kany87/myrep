var Map = function(width, height) {
	this.MapImage = {
	"tile": new Image(),
	"tile_hover": new Image(),
	"border_left": new Image(),
	"border_left_corner" : new Image(),
	"border_right": new Image(),
	"border_right_corner": new Image(),
	"corner": new Image()};
	
	this.MapImage["tile"].src = 'Img/world/tile1.png';
	this.MapImage["tile_hover"].src = 'Img/world/tile1_hover.png';
	this.MapImage["border_left"].src = 'Img/world/border_left.png';
	this.MapImage["border_right"].src = 'Img/world/border_right.png';
	this.MapImage["corner"].src = 'Img/world/corner.png';
	this.MapImage["border_left_corner"].src = 'Img/world/border_left_corner.png';
	this.MapImage["border_right_corner"].src = 'Img/world/border_right_corner.png';
	
	this.tileMap = [];
	this.grid = {
		width : width,
		height : height
	};
	this.startCol = 0;
	this.colCount = 0;
	this.startRow = 0;
	this.rowCount = 0;
};

Map.prototype.MapConstructor = function() {
	this.tileMap = new Array(this.grid.height);
	for (var i = 0; i <= this.grid.height; i++) {
		this.tileMap[i] = new Array(this.grid.width);
		for (var j = 0; j <= this.grid.width; j++) {
			if (i == this.grid.height && j == this.grid.width) {
				this.tileMap[i][j] = 3;
				continue;
			}

			if (i == this.grid.height) {
				if (j == 0){
					this.tileMap[i][j] = 4;
					continue;
				}

				this.tileMap[i][j] = 1;
				continue;
			}

			if (j == this.grid.width) {
				if (i == 0){
					this.tileMap[i][j] = 5;
					continue;
				}
					
				this.tileMap[i][j] = 2;
				continue;
			}
		}
	}
};

Map.prototype.MapToScreen = function(mapX, mapY, game) {

	var point = {
		x : 0,
		y : 0
	};

	point.x = (mapX - mapY) * (this.MapImage["tile"].width / 2);
	point.x += (game.canvas.width / 2) - (this.MapImage["tile"].width / 2);
	point.y = (mapX + mapY) * (this.MapImage["tile"].height / 2);
	point.y += (game.canvas.height / 2);

	return point;
};

Map.prototype.ScreenToMap = function(screenX, screenY, game) {
	var point = {
		x : 0,
		y : 0
	};

	screenX -= ((game.canvas.width / 2) - (this.MapImage["tile"].width / 2));
	screenY -= (game.canvas.height / 2) - (this.MapImage["tile"].height);
	point.x = (screenX / (this.MapImage["tile"].width / 2) + screenY / (this.MapImage["tile"].height / 2)) / 2;
	point.y = (screenY / (this.MapImage["tile"].height / 2) - (screenX / (this.MapImage["tile"].width / 2))) / 2;

	return point;
};

Map.prototype.draw = function(game) {

	//var pos_startRow = this.ScreenToMap(1, 1, game);
	var pos_colCount = this.ScreenToMap(1, game.canvas.height, game);
	//var pos_startCol = this.ScreenToMap(game.canvas.width, 1, game);
	var pos_rowCount = this.ScreenToMap(game.canvas.width, game.canvas.height, game);

	this.startRow = game.scroll.x;
	this.startCol = game.scroll.y;
	this.rowCount = Math.floor(pos_rowCount.x + 1);
	this.colCount = Math.floor(pos_colCount.y + 1);

	/*this.startRow = (this.startRow < 0) ? 0 : this.startRow;
	 this.startCol = (this.startCol < 0) ? 0 : this.startCol;*/
	this.rowCount = (this.rowCount > (this.grid.width + game.scroll.x + 1)) ? (this.grid.width + game.scroll.x + 1) : this.rowCount;
	this.colCount = (this.colCount > (this.grid.height + game.scroll.y + 1)) ? (this.grid.height + game.scroll.y + 1) : this.colCount;

	for (var col = this.startCol; col < this.colCount; col++) {
		for (var row = this.startRow; row < this.rowCount; row++) {
			var point = this.MapToScreen(row, col, game);
			//var txt = "C:" + Math.round((col - game.scroll.y)) + " R:" + Math.round((row-game.scroll.x));
			//var txtmt = game.ctx.measureText(txt);
			//var txtpoint = this.MapToScreen((row + 1), col, game);
			if (this.tileMap[Math.floor(col - game.scroll.y)] != null && this.tileMap[Math.floor(col - game.scroll.y)][Math.floor(row - game.scroll.x)] != null) {
				switch(this.tileMap[Math.floor(col - game.scroll.y)][Math.floor(row - game.scroll.x)]) {
					case 1:
						game.ctx.drawImage(this.MapImage["border_left"], Math.floor(point.x),Math.floor(point.y), this.MapImage["border_left"].width, this.MapImage["border_left"].height);
						break;
					case 2:
						game.ctx.drawImage(this.MapImage["border_right"], Math.floor(point.x), Math.floor(point.y), this.MapImage["border_right"].width, this.MapImage["border_right"].height);
						break;
					case 3:
						game.ctx.drawImage(this.MapImage["corner"], Math.floor(point.x), Math.floor(point.y), this.MapImage["corner"].width, this.MapImage["corner"].height);
						break;
					case 4:
						game.ctx.drawImage(this.MapImage["border_left_corner"], Math.floor(point.x), Math.floor(point.y), this.MapImage["border_left_corner"].width, this.MapImage["border_left_corner"].height);
						break;
					case 5:
						game.ctx.drawImage(this.MapImage["border_right_corner"], Math.floor(point.x), Math.floor(point.y), this.MapImage["border_right_corner"].width, this.MapImage["border_right_corner"].height);
						break;
				}

			} else {
					game.ctx.drawImage(this.MapImage["tile"], Math.floor(point.x), Math.floor(point.y), this.MapImage["tile"].width, this.MapImage["tile"].height);
			}

			//game.ctx.fillStyle = '#000000';
			//game.ctx.fillText(txt, Math.round(txtpoint.x - txtmt.width / 2), Math.round(txtpoint.y));
		}
	}
};
