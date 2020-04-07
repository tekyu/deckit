import IRoom from './IRoom';

export default interface IGameRooms {
  fast: Array<IRoom>;
  public: Array<IRoom>;
  private: Array<IRoom>;
}
