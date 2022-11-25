
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Vote } from '../../../models/vote.model';
import { VotesService } from '../../../services/votes.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; // true= create false= update
  voteId: string;
  vote: Vote ={
    tableNumber: "",
    candidateId: "",
    politicalpartyId: "",
  };
  sendingAttemp: boolean = false;

  constructor(private votesService: VotesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.voteId){
      //update
      this.creationMode = false;
      this.voteId = this.activatedRoute.snapshot.params.voteId;
      this.getVote(this.voteId);
    }
    else //create
      this.creationMode = true;
  }

  getVote(id: string): void {
    this.votesService.getOne(id).subscribe(
      data => {
        this.vote = data;
      },
      error => {
        console.log(error);

      }
    )
  }

    validateMAndatoryData(): boolean {
      this.sendingAttemp = true;
      if(this.vote.tableNumber=="" || this.vote.candidateId=="" || this.vote.politicalpartyId=="")
        return false;
      else
        return true;
    }

  create(): void{
    if(this.validateMAndatoryData()){
      this.votesService.create(this.vote).subscribe(
        data => {
          Swal.fire({
            title: 'Creado',
            text: 'El voto se ha creado correctamente',
            icon: 'success',
          });
        },
        error =>{
          console.log(error);
          Swal.fire({
            title: 'Falla en el servidor',
            text: 'El voto no ha podido ser creado. Intente de nueo mas tarde',
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
      let vote_: Vote = {...this.vote }
      delete vote_._id
      this.votesService.edit(this.vote._id, vote_).subscribe(
        data => {
          Swal.fire({
            title: 'Actualizado',
            text: 'El voto ha sido actualizado correctamente',
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

