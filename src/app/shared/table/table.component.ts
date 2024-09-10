import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  
  @Input() headList: any[];
  @Input() gridList: any;
  @Output() actionClick = new EventEmitter<{
    action: string;
    item: any;
  }>();

  gridData: any = [];

  sortedBy: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gridList'] && changes['gridList'].currentValue) {
      this.gridData = this.gridList.data;
    }
  }

  getNestedProperty( obj: any, key: string ) {
    // ['project' , 'manager' , 'userName']
    // obj{project: {manger: {username: ""}}}
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  handleAction(action: string, item: any) {
    this.actionClick.emit({ action, item });
  }

  sortData(key: string, direction: 'asc' | 'desc') {
    this.sortedBy = key;
    this.sortDirection = direction;
    this.gridData.sort((a: any, b: any) => {
      if (key === 'date') {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return direction === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
      if (key === 'task') {
        return direction === 'asc'
          ? a[key].length - b[key].length
          : b[key].length - a[key].length;
      }
      return direction === 'asc'
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    });
  }

}
