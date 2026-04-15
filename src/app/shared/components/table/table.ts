import { Component, Input } from '@angular/core';
import { IColumn } from '../../interfaces/column.interface';
import { IAction } from '../../interfaces/action.interface';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() data: any[] = [];

  @Input() columns: IColumn[] = [];

  @Input() actions: IAction[] = [];

  getProperty(item: any, key: string): any {
    return key.split('.').reduce((obj, i) => obj?.[i], item);
  }
  
  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }
}
