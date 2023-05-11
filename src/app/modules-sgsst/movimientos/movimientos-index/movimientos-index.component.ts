import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from 'src/app/general/table/table.component';
import { MovimientosFormComponent } from '../movimientos-form/movimientos-form.component';

@Component({
  selector: 'app-movimientos-index',
  templateUrl: './movimientos-index.component.html',
  styleUrls: ['./movimientos-index.component.css']
})
export class MovimientosIndexComponent implements OnInit {

  @ViewChild('datatable') datatable: TableComponent | undefined;

  public columns = [
    {
      title: 'Cliente',
      data: 'nombre'
    },
    {
      title: 'Tipo Cuenta',
      data: 'tipoCuenta',
      render: (data: boolean) => {
        if (data) {
          return `Ahorro`;
        }
        return `Corriente`;
      }
    },
    {
      title: 'Fecha Transacción',
      data: 'fecha'
    },
    {
      title: 'Numero Cuenta',
      data: 'numeroCuenta'
    },
    {
      title: 'Valor Transacción',
      data: 'valor'
    },
    {
      title: 'Tipo Movimiento',
      data: 'tipoMovimiento',
      render: (data: boolean) => {
        if (data) {
          return `Retiro`;
        }
        return `Deposito`;
      }
    },
    {
      title: 'Nuevo Saldo',
      data: 'saldo'
    },
  ];
  public arrayButtonsDatatable = ['btn-eliminar'];
  public arrayButtons = ['btn-nuevo'];
  public urlDatatable = 'movimiento';

  constructor(private _modal: NgbModal) { }

  ngOnInit(): void {
  }

  new() {
    let modalRoleForm = this._modal.open(MovimientosFormComponent, {size: 'lg', keyboard: false, backdrop: "static", backdropClass: "backdrop-modal"})
    modalRoleForm.result.then(result => result ? this.datatable?.refreshTable() : null);
  }

  edit(id: any) {
    let modalRoleForm = this._modal.open(MovimientosFormComponent, {size: 'lg', keyboard: false, backdrop: "static", backdropClass: "backdrop-modal"})
    modalRoleForm.componentInstance.id = id;

    modalRoleForm.result.then(result => result ? this.datatable?.refreshTable() : null);
  }

}
