export interface IAction<T = any> {
  icon: string;
  toolTip: string;
  execute: (row: T) => void;
  color?: string;
}
