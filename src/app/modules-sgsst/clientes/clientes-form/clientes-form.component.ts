import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MESSAGE_TYPE } from 'src/app/config/consts/message.type';
import { MESSAGES } from 'src/app/config/consts/messages';
import { BackendService } from 'src/app/config/services/backend.service';
import { HelperService } from 'src/app/config/services/helper.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  public id: number = 0;
  public title: string = "Nuevo";
  public arrayButtons: string[] = ['btn-guardar',  'btn-cancelar'];
  public frmClientes: FormGroup;
  public listGenders = [
    { id: true, name: "Masculino" },
    { id: false, name: "Femenino" }
  ];

  constructor(private _modalActive: NgbActiveModal, private _service: BackendService, private _helperService: HelperService) { 
    this.frmClientes = new FormGroup({
      identificacion: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      genero: new FormControl(null, Validators.required),
      edad: new FormControl(null, Validators.required),
      direccion: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      contrasenia: new FormControl(null, Validators.required),
      estado: new FormControl(true, Validators.required)
    });
  }

  ngOnInit(): void {
    if (this.id && this.id != 0) {
      this.getData();
      this.title = "Editar Cliente";
    } else {
      this.title = "Nuevo Cliente";
    }
  }

  getData() {
    this._service.getById("cliente", this.id).subscribe(
      res => {
        this.frmClientes.patchValue({
          identificacion: res.data.identificacion,
          nombre: res.data.nombre,
          genero: res.data.genero,
          edad: res.data.edad,
          direccion: res.data.direccion,
          telefono: res.data.telefono,
          contrasenia: res.data.contrasenia,
          estado: res.data.estado
        });
      },
      error => {
        this._helperService.showMessageError(error)
      }
    )
  }

  save() {
    let data = {
      id: this.id,      
      ...this.frmClientes.value
    }

    this._service.save("cliente", this.id, data).subscribe(
      res => {
        this._helperService.showAlert(MESSAGE_TYPE.SUCCESS, MESSAGES.SAVED);
        this._modalActive.close(true);
      },
      error => {
        this._helperService.showMessageError(error)
      }
    )
  }

  cancel() {
    this._modalActive.close(false);
  }

}
