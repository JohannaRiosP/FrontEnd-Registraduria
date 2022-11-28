import { Component, OnInit } from '@angular/core';
import { Table } from '../../../models/table.model';
import { TablesService } from '../../../services/tables.service';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'ngx-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  dataTables: Object;
  dataTable: Object = {
    tableNumber: "",
    peopleRegistered: "",
    votes: "",
  }
  tables: Table[];
  tableId: string = "";
  totalMode: boolean = true; // true=all false=one

  constructor(private reportsService: ReportsService,
    private tablesService: TablesService) { }

  ngOnInit(): void {
    this.getTables();
    if(this.totalMode)
      this.getDataFull();
  }

  getTables(): void{
    this.tablesService.list().subscribe(
      data => {
        this.tables = data;
      },
      error => {
        console.log(error)
      }
    );
  }

  getDataFull(): void {
    this.totalMode = true
    this.reportsService.tablesReport().subscribe(
      data => {
        this.dataTables = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  getDataOne(): void {
    this.totalMode = false
    this.reportsService.tablesReport().subscribe(
      data => {
        this.dataTables = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  change(): void{
    if(this.tableId!="")
      this.getDataOne();
    else
      this.getDataFull();
      this.ngOnInit();
    }
}
