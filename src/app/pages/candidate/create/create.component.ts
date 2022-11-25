import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { Politicalparty } from '../../../models/politicalparty.model';
import { CandidatesService } from '../../../services/candidates.service';
import { PoliticalPartiesService } from '../../../services/political-parties.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; // true= create false= update
  candidateId: string = "";
  candidate: Candidate = {
    personalId: "",
    resolutionNumber: "",
    name: "",
    lastname: "",
    politicalParty: {_id:""},
  };
  sendingAttemp: boolean = false;
  politicalParty: Politicalparty[];

  constructor(private candidatesService: CandidatesService,
              private politicalpartiesServices: PoliticalPartiesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.candidateId){
      //update
      this.creationMode = false;
      this.candidateId = this.activatedRoute.snapshot.params.candidateId;
      this.getCandidate(this.candidateId);
    }
    else //create
      this.creationMode = true;
  }

  getCandidate(id: string): void {
    this.candidatesService.getOne(id).subscribe(
      data => {
        this.candidate = data;
      },
      error => {
        console.log(error);

      }
    )
  }

    validateMAndatoryData(): boolean {
      this.sendingAttemp = true;
      if(this.candidate.personalId=="" || this.candidate.resolutionNumber=="" || this.candidate.name=="" || this.candidate.lastname=="")
        return false;
      else
        return true;
    }

  create(): void{
    if(this.validateMAndatoryData()){
      this.candidatesService.create(this.candidate).subscribe(
        data => {
          Swal.fire({
            title: 'Creado',
            text: 'El candidato se ha creado correctamente',
            icon: 'success',
          });
        },
        error =>{
          console.log(error);
          Swal.fire({
            title: 'Falla en el servidor',
            text: 'El candidato no ha podido ser creado. Intente de nueo mas tarde',
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
      let candidate_: Candidate = {...this.candidate }
      delete candidate_._id
      this.candidatesService.edit(this.candidate._id, candidate_).subscribe(
        data => {
          Swal.fire({
            title: 'Actualizado',
            text: 'El candidato ha sido actualizado correctamente',
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

