import { MatTableModule } from '@angular/material/table';
import { Component, Input, ViewChild, AfterViewInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

export interface TableColumn {
  columnDef: string;
  header: string;
  format?: (value: any, row?: any) => string;
  actions? : TableActions[]
}

export interface TableActions{
  label?: string
  icon?: string
  visible?: (row: any) => boolean;
  action: (row: any) => void;       
}




@Component({
  selector: 'app-table',
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule, MatMenuModule,     MatButtonModule // ✅ REQUIRED
]
})
export class TableComponent  {

  displayedColumns : string[] = [];
  dataSource = new MatTableDataSource<any>();

  @Input({required: true}) columns!: TableColumn[];
  @Input({required: true}) data !: any[];
  @Input() emptyMessage : string = "No data available"
  @Input() loading = false;

  ngOnChanges(changes: SimpleChanges) {

    if (changes['columns'] && this.columns) {
      this.displayedColumns = this.columns.map(c => c.columnDef);
    }

    if (changes['data']) {
      this.dataSource.data = this.data || [];
    }
  }


}

