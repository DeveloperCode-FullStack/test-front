import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from 'src/app/general/table/table.component';
import { CuentasFormComponent } from '../cuentas-form/cuentas-form.component';

@Component({
  selector: 'app-cuentas-index',
  templateUrl: './cuentas-index.component.html',
  styleUrls: ['./cuentas-index.component.css']
})
export class CuentasIndexComponent implements OnInit {

  @ViewChild('datatable') datatable: TableComponent | undefined;

  public columns = [
    {
      title: 'Cliente',
      data: 'nombre'
    },
    {
      title: 'Numero Cuenta',
      data: 'numeroCuenta'
    },
    {
      title: 'Tipo Cuenta',
      data: 'tipoCuenta',
      render: (data: boolean) => {
        if (data) {
          return `Corriente`;
        }
        return `Ahorro`;
      }
    },
    {
      title: 'Saldo Inicial',
      data: 'saldoInicial'
    },
    {
      title: 'Estado',
      data: 'estado',
      render: (data: boolean) => {
        if (data) {
          return `<span class="badge bg-success">Activo</span>`;
        }
        return `<span class="badge bg-danger">Inactivo</span>`;
      }
    },
  ];
  public arrayButtonsDatatable = ['btn-modificar', 'btn-eliminar'];
  public arrayButtons = ['btn-nuevo'];
  public urlDatatable = 'cuenta';

  constructor(private _modal: NgbModal) { }

  ngOnInit(): void {
  }

  new() {
    let modalRoleForm = this._modal.open(CuentasFormComponent, {size: 'lg', keyboard: false, backdrop: "static", backdropClass: "backdrop-modal"})
    modalRoleForm.result.then(result => result ? this.datatable?.refreshTable() : null);
  }

  edit(id: any) {
    let modalRoleForm = this._modal.open(CuentasFormComponent, {size: 'lg', keyboard: false, backdrop: "static", backdropClass: "backdrop-modal"})
    modalRoleForm.componentInstance.id = id;

    modalRoleForm.result.then(result => result ? this.datatable?.refreshTable() : null);
  }

}
