import { MatTableModule } from '@angular/material/table';
import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
export interface TableColumn {
  columnDef: string;   // id interne
  header: string;      // texte du header
}




@Component({
  selector: 'app-table',
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
  standalone: true,
  imports: [MatTableModule]
})
export class TableComponent  {

  displayedColumns : string[] = [];
  dataSource = new MatTableDataSource<any>();

  @Input({required: true}) columns!: TableColumn[];
  @Input({required: true}) data !: any[];
  @Input() emptyMessage : string = "No data available"
  @Input() loading = false;

  ngOnInit() {
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.dataSource.data = this.data;
  }


}

