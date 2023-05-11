import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MESSAGE_TYPE } from 'src/app/config/consts/message.type';
import { MESSAGES } from 'src/app/config/consts/messages';
import { BackendService } from 'src/app/config/services/backend.service';
import { HelperService } from 'src/app/config/services/helper.service';

@Component({
  selector: 'app-cuentas-form',
  templateUrl: './cuentas-form.component.html',
  styleUrls: ['./cuentas-form.component.css']
})
export class CuentasFormComponent implements OnInit {

  public id: number = 0;
  public title: string = "Nuevo";
  public arrayButtons: string[] = ['btn-guardar',  'btn-cancelar'];
  public frmCuenta: FormGroup;
  public listTypeAccount = [
    { id: true, name: "Corriente" },
    { id: false, name: "Ahorro" }
  ];
  public listClients = [];

  constructor(private _modalActive: NgbActiveModal, private _service: BackendService, private _helperService: HelperService) { 
    this.frmCuenta = new FormGroup({
      numeroCuenta: new FormControl(null, Validators.required),
      tipoCuenta: new FormControl(null, Validators.required),
      saldoInicial: new FormControl(null, Validators.required),
      clienteId: new FormControl(null, Validators.required),
      estado: new FormControl(true, Validators.required)
    });
  }

  ngOnInit(): void {
    if (this.id && this.id != 0) {
      this.getData();
      this.title = "Editar Cuenta";
    } else {
      this.title = "Nuevo Cuenta";
    }
    this._service.getAll('cliente').subscribe(
      res => {
        this.listClients = res.data;
      }
    )
  }

  getData() {
    this._service.getById("cuenta", this.id).subscribe(
      res => {
        this.frmCuenta.patchValue({
          numeroCuenta: res.data.numeroCuenta,
          tipoCuenta: res.data.tipoCuenta,
          saldoInicial: res.data.saldoInicial,
          clienteId: res.data.id
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
      numeroCuenta: this.frmCuenta.controls['numeroCuenta'].value,
      tipoCuenta: this.frmCuenta.controls['tipoCuenta'].value,
      saldoInicial: this.frmCuenta.controls['saldoInicial'].value,
      clienteId: {id: this.frmCuenta.controls['clienteId'].value},
      estado: this.frmCuenta.controls['estado'].value
    }

    this._service.save("cuenta", this.id, data).subscribe(
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
