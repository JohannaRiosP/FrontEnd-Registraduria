import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/users.service';


@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; // true= create false= update
  userId: string = "";
  user: User = {
    nickname: "",
    email: "",
    password: "",
    token: "",
    rol: {_id:""},
  };
  sendingAttemp: boolean = false;


  constructor(private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.userId){
      //update
      this.creationMode = false;
      this.userId = this.activatedRoute.snapshot.params.userId;
      this.getUser(this.userId);
    }
    else //create
      this.creationMode = true;
  }

  getUser(id: string): void {
    this.usersService.getOne(id).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log(error);

      }
    )
  }

    validateMAndatoryData(): boolean {
      this.sendingAttemp = true;
      if(this.user.nickname=="" || this.user.email=="" || this.user.password=="")
        return false;
      else
        return true;
    }

  create(): void{
    if(this.validateMAndatoryData()){
      this.usersService.create(this.user).subscribe(
        data => {
          Swal.fire({
            title: 'Creado',
            text: 'El usuario se ha creado correctamente',
            icon: 'success',
          });
        },
        error =>{
          console.log(error);
          Swal.fire({
            title: 'Falla en el servidor',
            text: 'El usuario no ha podido ser creado. Intente de nueo mas tarde',
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
      let user_: User = {...this.user }
      delete user_.id
      this.usersService.edit(this.user.id, user_).subscribe(
        data => {
          Swal.fire({
            title: 'Actualizado',
            text: 'El usuario ha sido actualizada correctamente',
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
