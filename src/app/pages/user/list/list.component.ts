import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';
import { UserModule } from '../user.module';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Seudonimo', 'Correo', 'Contraseña','Opciones'];
  users: UserModule[];

  constructor(private usersServices: UsersService,
    private router: Router) { }

  ngOnInit(): void {
    this.list();
  }
  list(): void{
    this.usersServices.list().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error);
      }
    );

  }
  create(): void{
    this.router.navigate(["pages/usuarios/crear"]);

  }
  edit(id: string): void{
    this.router.navigate(["pages/usuarios/actualizar"+id]);
  }
  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar Usuario',
      text: 'Esta seguro que quiere eliminar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085DG',
      cancelButtonColor: '#033',
      confirmButtonText: 'Si, eliminar',

    }).then((result) => {
      if(result.isConfirmed){
        this.usersServices.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado!',
              'El usuario ha sido eLiminado',
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

