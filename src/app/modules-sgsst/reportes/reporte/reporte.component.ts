import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { LANGUAGE_DATATABLE } from 'src/app/config/consts/datatable.language';
import { MESSAGE_TYPE } from 'src/app/config/consts/message.type';
import { DatatableParameter } from 'src/app/config/interfaces/datatable-parameter';
import { BackendService } from 'src/app/config/services/backend.service';
import { HelperService } from 'src/app/config/services/helper.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  public urlDatatable = '';
  public listAccounts = [];
  public frmFiltros;
  public busqueda = false;
  public arrayButtons = ['btn-buscar']
  public listData = []

  constructor(private _helperService: HelperService, private _backendService: BackendService) { 
    this.frmFiltros = new FormGroup({
      fechaInicio: new FormControl(null, Validators.required),
      fechaFin: new FormControl(null, Validators.required),
      cuentaId: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this._backendService.getAll('cuenta').subscribe(
      res => {
        this.listAccounts = res.data;
      }
    )
  }

  buscar() {
    // if (this.busqueda) {
    //   this.busqueda = false;
    // }
    if (this.frmFiltros.invalid) {
      this._helperService.showAlert(MESSAGE_TYPE.ERROR, "Debe llenar todos los campos")
      return;
    }

    let fechaInicio = `${this.frmFiltros.controls.fechaInicio.value}T00:00:00`;
    let fechaFin = `${this.frmFiltros.controls.fechaFin.value}T23:59:59`;

    this.urlDatatable = `movimiento/reportMovement/${this.frmFiltros.controls.cuentaId.value}/${fechaInicio}/${fechaFin}`;

    this.busqueda = !this.busqueda;    
  }

}
