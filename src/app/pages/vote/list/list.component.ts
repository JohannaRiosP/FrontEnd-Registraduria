
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VotesService } from '../../../services/votes.service';
import { VoteModule } from '../vote.module';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Numero de Mesa', 'Candidato', 'Opciones'];
  votes: VoteModule[];

  constructor(private votesServices: VotesService,
    private router: Router) { }

  ngOnInit(): void {
    this.list();
  }
  list(): void{
    this.votesServices.list().subscribe(
      data => {
        this.votes = data;
      },
      error => {
        console.log(error);
      }
    );

  }
  create(): void{
    this.router.navigate(["pages/votos/crear"]);

  }
  edit(id: string): void{
    this.router.navigate(["pages/votos/actualizar"+id]);
  }
  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar Voto',
      text: 'Esta seguro que quiere eliminar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085DG',
      cancelButtonColor: '#033',
      confirmButtonText: 'Si, eliminar',

    }).then((result) => {
      if(result.isConfirmed){
        this.votesServices.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado!',
              'El voto ha sido eLiminado',
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

