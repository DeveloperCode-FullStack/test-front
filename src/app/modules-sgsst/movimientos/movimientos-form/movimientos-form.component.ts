import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MESSAGE_TYPE } from 'src/app/config/consts/message.type';
import { MESSAGES } from 'src/app/config/consts/messages';
import { BackendService } from 'src/app/config/services/backend.service';
import { HelperService } from 'src/app/config/services/helper.service';

@Component({
  selector: 'app-movimientos-form',
  templateUrl: './movimientos-form.component.html',
  styleUrls: ['./movimientos-form.component.css']
})
export class MovimientosFormComponent implements OnInit {
  [x: string]: any;

  public id: number = 0;
  public title: string = "Nuevo";
  public arrayButtons: string[] = ['btn-guardar',  'btn-cancelar'];
  public frmMovimientos: FormGroup;
  public listTypeMovement = [
    { id: true, name: "Retiro" },
    { id: false, name: "Deposito" }
  ];
  public listAccounts = [];

  constructor(private _modalActive: NgbActiveModal, private _service: BackendService, private _helperService: HelperService) { 
    this.frmMovimientos = new FormGroup({      
      fecha: new FormControl(null, Validators.required),
      tipoMovimiento: new FormControl(null, Validators.required),
      valor: new FormControl(null, Validators.required),
      saldo: new FormControl(null, Validators.required),
      cuentaId: new FormControl(true, Validators.required)
    });
  }

  ngOnInit(): void {
    if (this.id && this.id != 0) {
      this.getData();
      this.title = "Editar Movimiento";
    } else {
      this.title = "Nuevo Movimiento";
    }
    this._service.getAll('cuenta').subscribe(
      res => {
        this.listAccounts = res.data;
      }
    )
  }

  getData() {
    this._service.getById("movimiento", this.id).subscribe(
      res => {
        this.frmMovimientos.patchValue({
          fecha: res.data.fecha,          
          tipoMovimiento: res.data.tipoMovimiento,
          valor: res.data.valor,
          saldo: res.data.saldo,
          cuentaId: res.data.cuentaId
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
      fecha:new Date(),    
      tipoMovimiento:this.frmMovimientos.controls['tipoMovimiento'].value,
      valor: this.frmMovimientos.controls['valor'].value,      
      cuentaId: {id: this.frmMovimientos.controls['cuentaId'].value}      
    }

    this._service.save("movimiento", this.id, data).subscribe(
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
