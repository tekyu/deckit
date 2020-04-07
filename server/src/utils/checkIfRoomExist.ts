import chalk from 'chalk';
import IGameRooms from '../interfaces/IGameRooms';

export default function(id: string, gameRooms: IGameRooms) {
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
