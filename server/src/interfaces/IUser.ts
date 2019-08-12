export default interface IUser {
	username: String;
	hash: String;
	token: String;
	friends: Array<String>;
	email: String;
	avatar: String;
	activeGames: Array<Number>;
	ranking: Number;
	notifications?: Array<String>;
	emailConsent: Boolean;
	privacyConsent: Boolean;
	createdCards?: Array<Object>;
	createdDecks?: Array<Object>;
	achievements?: Array<Object>;
	createdAt: Number;
}
