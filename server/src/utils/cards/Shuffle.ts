/* eslint-disable no-param-reassign */
/**
 * @description Shuffling function using Fisher-Yates Shuffle algorithm
 * @param {Array} array Unshuffled array
 * @returns {Array} Shuffled array
 */

export default function (array: any) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
