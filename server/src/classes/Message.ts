// @ts-nocheck
import shortId from 'shortid';

/**
 * TODO:
 * DeckitRoom extends Room
 * Store instances of the rooms in io.deckitRoom
 * or not?
 * DeckitRoom could have methods only for particular game
 * easy scaling
 */
export default class Message {
  message: string;

  constructor(message, {
    id, username, color, avatar,
  }) {
    this.message = message;
    this.ownerId = id;
    this.id = shortId();
    this.timestamp = Date.now();
    this.ownerName = username;
    this.color = color;
    this.avatar = avatar;
  }
}
