export default interface IUser {
	username: String;
	hash: String;
	token: String;
	friends: Array<String>;
	email: String;
	avatar: String;
	activeGames: Array<Number>;
	ranking: Number;
	createdAt: Number;
	emailConsent: Boolean;
	privacyConsent: Boolean;
	notifications?: Array<String>;
	createdCards?: Array<Object>;
	createdDecks?: Array<Object>;
	achievements?: Array<Object>;
}
