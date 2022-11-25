import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RolesService } from '../../../services/roles.service';
import { RolModule } from '../rol.module';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Nombre', 'Opciones'];
  roles: RolModule[];

  constructor(private rolesServices: RolesService,
    private router: Router) { }

  ngOnInit(): void {
    this.list();
  }
  list(): void{
    this.rolesServices.list().subscribe(
      data => {
        this.roles = data;
      },
      error => {
        console.log(error);
      }
    );

  }
  create(): void{
    this.router.navigate(["pages/roles/crear"]);

  }
  edit(id: string): void{
    this.router.navigate(["pages/roles/actualizar"+id]);
  }
  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar Rol',
      text: 'Esta seguro que quiere eliminar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085DG',
      cancelButtonColor: '#033',
      confirmButtonText: 'Si, eliminar',

    }).then((result) => {
      if(result.isConfirmed){
        this.rolesServices.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado!',
              'El Rol ha sido eLiminado',
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

