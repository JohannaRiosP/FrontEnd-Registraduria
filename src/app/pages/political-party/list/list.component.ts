import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PoliticalPartiesService } from '../../../services/political-parties.service';
import { PoliticalPartyModule } from '../political-party.module';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Nombre', 'Lema', 'Opciones'];
  politicalparty: PoliticalPartyModule[];

  constructor(private politicalpartiesServices: PoliticalPartiesService,
    private router: Router) { }

  ngOnInit(): void {
    this.list();
  }
  list(): void{
    this.politicalpartiesServices.list().subscribe(
      data => {
        this.politicalparty = data;
      },
      error => {
        console.log(error);
      }
    );

  }
  create(): void{
    this.router.navigate(["pages/partidospoliticos/crear"]);

  }
  edit(id: string): void{
    this.router.navigate(["pages/partidospoliticos/actualizar"+id]);
  }
  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar Partido Politico',
      text: 'Esta seguro que quiere eliminar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085DG',
      cancelButtonColor: '#033',
      confirmButtonText: 'Si, eliminar',

    }).then((result) => {
      if(result.isConfirmed){
        this.politicalpartiesServices.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado!',
              'El Partido Politico ha sido eLiminado',
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
