import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../../models/rol.model';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; // true= create false= update
  rolId: string = "";
  rol: Rol = {
    name: "",
    description: "",
  };
  sendingAttemp: boolean = false;

  constructor(private rolesService: RolesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.rolId){
      //update
      this.creationMode = false;
      this.rolId = this.activatedRoute.snapshot.params.rolId;
      this.getRol(this.rolId);
    }
    else //create
      this.creationMode = true;
  }

  getRol(id: string): void {
    this.rolesService.getOne(id).subscribe(
      data => {
        this.rol = data;
      },
      error => {
        console.log(error);

      }
    )
  }

    validateMAndatoryData(): boolean {
      this.sendingAttemp = true;
      if(this.rol.name=="" || this.rol.description=="")
        return false;
      else
        return true;
    }

  create(): void{
    if(this.validateMAndatoryData()){
      this.rolesService.create(this.rol).subscribe(
        data => {
          Swal.fire({
            title: 'Creado',
            text: 'El rol se ha creado correctamente',
            icon: 'success',
          });
        },
        error =>{
          console.log(error);
          Swal.fire({
            title: 'Falla en el servidor',
            text: 'El rol no ha podido ser creado. Intente de nueo mas tarde',
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
      let rol_: Rol = {...this.rol }
      delete rol_._id
      this.rolesService.edit(this.rol._id, rol_).subscribe(
        data => {
          Swal.fire({
            title: 'Actualizado',
            text: 'El rol ha sido actualizada correctamente',
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
