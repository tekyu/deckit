import chalk from 'chalk';

interface IRoomList {
  id: string;
}

interface IGameRooms {
  fast: Array<IRoomList>;
  public: Array<IRoomList>;
  private: Array<IRoomList>;
}

export default function (id: string, gameRooms: IGameRooms) {
  if (gameRooms.public[id]) {
    return 'public';
  } if (gameRooms.private[id]) {
    return 'private';
  } if (gameRooms.fast[id]) {
    return 'fast';
  }
  console.log(chalk.bgRedBright(`Room with id of ${id} doesn't exist`));
  return '';
}
