class Player {
	constructor(data) {
		this.id = data.id;
		this.uuid = data.uuid;
		this.username = data.username;
		this.gameProperties = {};
		this.status = false;
		this.color = data.color;
		this.progress = 0;
		this.picked = false;
		this.pickedCard = null;
		this.score = 0;
		this.deck = [];
	}
}

module.export = Player;
