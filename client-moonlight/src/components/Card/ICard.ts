export interface ICard {
  id: string;
  title: string;
  url: string;
  showButton: boolean;
  showButtonHandler: (id: string) => void;
  className?: string;
}
