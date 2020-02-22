import chalk from 'chalk';

export default function(id: String, gameRooms: Object) {
  console.log(
    'getRoomNamespace',
    gameRooms.public[id],
    gameRooms.private[id],
    gameRooms.fast[id]
  );
  if (gameRooms.public[id]) {
    return 'public';
  } else if (gameRooms.private[id]) {
    return 'private';
  } else if (gameRooms.fast[id]) {
    return 'fast';
  } else {
    console.log(chalk.bgRedBright(`Room with id of ${id} doesn't exist`));
    return '';
  }
}
