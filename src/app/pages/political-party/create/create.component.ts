import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Politicalparty } from '../../../models/politicalparty.model';
import { PoliticalPartiesService } from '../../../services/political-parties.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; // true= create false= update
  politicalpartyId: string = "";
  politicalparty: Politicalparty = {
    name: "",
    motto: "",
  };
  sendingAttemp: boolean = false;

  constructor(private politicalpartiesService: PoliticalPartiesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

 
  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.politicalPartyId){
      //update
      this.creationMode = false;
      this.politicalpartyId = this.activatedRoute.snapshot.params.politicalPartyId;
      this.getPoliticalParty(this.politicalpartyId);
    }
    else //create
      this.creationMode = true;
  }

  getPoliticalParty(id: string): void {
    this.politicalpartiesService.getOne(id).subscribe(
      data => {
        this.politicalparty = data;
      },
      error => {
        console.log(error);

      }
    )
  }

    validateMAndatoryData(): boolean {
      this.sendingAttemp = true;
      if(this.politicalparty.name=="" || this.politicalparty.motto=="")
        return false;
      else
        return true;
    }

  create(): void{
    if(this.validateMAndatoryData()){
      this.politicalpartiesService.create(this.politicalparty).subscribe(
        data => {
          Swal.fire({
            title: 'Creado',
            text: 'El partido politico se ha creado correctamente',
            icon: 'success',
          });
        },
        error =>{
          console.log(error);
          Swal.fire({
            title: 'Falla en el servidor',
            text: 'El partido politico no ha podido ser creado. Intente de nueo mas tarde',
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
      let politicalParty_:Politicalparty = {...this.politicalparty }
      delete politicalParty_._id
      this.politicalpartiesService.edit(this.politicalparty._id, politicalParty_).subscribe(
        data => {
          Swal.fire({
            title: 'Actualizado',
            text: 'El partido politico ha sido actualizado correctamente',
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

