import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CandidatesService } from '../../../services/candidates.service';
import { CandidateModule } from '../candidate.module';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Cedula', 'Numero de Resolucion', 'Nombre', 'Apellido', 'Opciones'];
  candidates: CandidateModule[];

  constructor(private candidatesServices: CandidatesService,
    private router: Router) { }

  ngOnInit(): void {
    this.list();
  }
  list(): void{
    this.candidatesServices.list().subscribe(
      data => {
        this.candidates = data;
      },
      error => {
        console.log(error);
      }
    );

  }
  create(): void{
    this.router.navigate(["pages/candidatos/crear"]);

  }
  edit(id: string): void{
    this.router.navigate(["pages/candidates/actualizar"+id]);
  }
  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar Candidato',
      text: 'Esta seguro que quiere eliminar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085DG',
      cancelButtonColor: '#033',
      confirmButtonText: 'Si, eliminar',

    }).then((result) => {
      if(result.isConfirmed){
        this.candidatesServices.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado!',
              'El Candidato ha sido eLiminado',
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
