import { Component } from '@angular/core';
import { Heading } from '../../../../shared/components/heading/heading';
import { ActivatedRoute } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { TableColumn, TableComponent } from "../../../../shared/components/table/table";
import Table from '@mui/material/Table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-roles',
  imports: [Heading, MatTableModule, TableComponent, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './roles.html',
  styleUrl: './roles.scss',
})
export class Roles {
  title : string = "";
  constructor(private route : ActivatedRoute){
    const data = route.snapshot.data;
    this.title = data['title'];
  }

  data: any[] = [
  {weight: 1.0079, symbol: 'H'},
  {weight: 4.0026, symbol: 'He'},
  {weight: 6.941, symbol: 'Li'},
  {weight: 9.0122, symbol: 'Be'},
  {weight: 10.811, symbol: 'B'},
  {weight: 12.0107, symbol: 'C'},
  {weight: 14.0067, symbol: 'N'},
  {weight: 15.9994, symbol: 'O'},
  {weight: 18.9984, symbol: 'F'},
  {weight: 20.1797, symbol: 'Ne'},
]
columns : TableColumn[] = [
  {
    columnDef: "weight",
    header: "Weight"
  },
  {
    columnDef: "symbol",
    header: "Symbol"
  }
]
}
