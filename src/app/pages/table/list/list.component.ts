import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TablesService } from '../../../services/tables.service';
import { TableModule } from '../table.module';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  columnNames: string[] = ['Numero de Mesa', 'Cantidad de Inscritos', 'Opciones'];
  tables: TableModule[];

  constructor(private tablesServices: TablesService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }
  list(): void{
    this.tablesServices.list().subscribe(
      data => {
        this.tables = data;
      },
      error => {
        console.log(error);
      }
    );

  }
  create(): void{
    this.router.navigate(["pages/mesas/crear"]);

  }
  edit(id: string): void{
    this.router.navigate(["pages/mesas/actualizar"+id]);
  }
  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar Mesa',
      text: 'Esta seguro que quiere eliminar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085DG',
      cancelButtonColor: '#033',
      confirmButtonText: 'Si, eliminar',

    }).then((result) => {
      if(result.isConfirmed){
        this.tablesServices.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminada!',
              'La Mesa ha sido eLiminada',
              'success'
            )
          },
          error => {
            console.log(error);
          }
        )
      }
    })
  }

}
