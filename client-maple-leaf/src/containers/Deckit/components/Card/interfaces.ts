export type pickedByType = {
  id: string;
  avatar: string;
  color: string;
}

export interface IPickedBy {
  pickedBy?: pickedByType[];
}

export type cardType = {
  id?: string;
  url?: string;
}

export type cardStateType = 'hinter' | 'picker' | 'chooser' | 'summary' | '';

export interface ICard {
  state: cardStateType;
  pickedBy?: pickedByType[];
  card: cardType;
}
