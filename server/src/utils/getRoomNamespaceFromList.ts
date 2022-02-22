import chalk from 'chalk';
import IO from '../classes/IO';

export default function (id: string) {
  if (IO.getInstance().io.gameRooms.public[id]) {
    return 'public';
  } if (IO.getInstance().io.gameRooms.private[id]) {
    return 'private';
  } if (IO.getInstance().io.gameRooms.fast[id]) {
    return 'fast';
  }
  console.log(chalk.bgRedBright(`Room with id of ${id} doesn't exist`));
  return '';
}
