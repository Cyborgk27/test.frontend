export interface IColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'date' | 'currency' | 'boolean';
}
