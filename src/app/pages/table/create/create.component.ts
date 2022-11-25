import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Table } from '../../../models/table.model';
import { TablesService } from '../../../services/tables.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; // true= create false= update
  tableId: string = "";
  table: Table = {
    tableNumber: "",
    peopleRegistered: "",
  };
  sendingAttemp: boolean = false;

  constructor(private tablesService: TablesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.tableId){
      //update
      this.creationMode = false;
      this.tableId = this.activatedRoute.snapshot.params.tableId;
      this.getTable(this.tableId);
    }
    else //create
      this.creationMode = true;
  }

  getTable(id: string): void {
    this.tablesService.getOne(id).subscribe(
      data => {
        this.table = data;
      },
      error => {
        console.log(error);

      }
    )
  }

    validateMAndatoryData(): boolean {
      this.sendingAttemp = true;
      if(this.table.tableNumber=="" || this.table.peopleRegistered=="")
        return false;
      else
        return true;
    }

  create(): void{
    if(this.validateMAndatoryData()){
      this.tablesService.create(this.table).subscribe(
        data => {
          Swal.fire({
            title: 'Creado',
            text: 'La mesa se ha creado correctamente',
            icon: 'success',
          });
        },
        error =>{
          console.log(error);
          Swal.fire({
            title: 'Falla en el servidor',
            text: 'La mesa no ha podido ser creada. Intente de nuevo mas tarde',
            icon: 'error',
            timer: 5000
          })
        }
      )
      }
      else{
        Swal.fire({
          title: 'Campos obligatorios',
          text: 'Por favor diligencie todos los campos obligatorios',
          icon: 'warning',
          timer: 5000
      })
    }
  }

  edit(): void{
    if(this.validateMAndatoryData()){
      let table_: Table = {...this.table }
      delete table_._id
      this.tablesService.edit(this.table._id, table_).subscribe(
        data => {
          Swal.fire({
            title: 'Actualizado',
            text: 'La mesa ha sido actualizada correctamente',
            icon: 'success',
        })
        },
        error =>{
          console.log(error);
        }
      )
    }
    else{
      Swal.fire({
        title: 'Campos obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios',
        icon: 'warning',
        timer: 5000
    })
  }

  }

}
