import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from 'src/app/general/table/table.component';
import { ClientesFormComponent } from '../clientes-form/clientes-form.component';

@Component({
  selector: 'app-clientes-index',
  templateUrl: './clientes-index.component.html',
  styleUrls: ['./clientes-index.component.css']
})
export class ClientesIndexComponent implements OnInit {

  @ViewChild('datatable') datatable: TableComponent | undefined;

  public columns = [
    {
      title: 'Identificación',
      data: 'identificacion'
    },
    {
      title: 'Nombre',
      data: 'nombre'
    },
    {
      title: 'Género',
      data: 'genero',
      render: (data: boolean) => {
        if (data) {
          return `Masculino`;
        }
        return `Femenino`;
      }
    },
    {
      title: 'Edad',
      data: 'edad'
    },
    {
      title: 'Dirección',
      data: 'direccion'
    },
    {
      title: 'Teléfono',
      data: 'telefono'
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
  public urlDatatable = 'cliente';

  constructor(private _modal: NgbModal) { }

  ngOnInit(): void {
  }

  new() {
    let modalRoleForm = this._modal.open(ClientesFormComponent, {size: 'lg', keyboard: false, backdrop: "static", backdropClass: "backdrop-modal"})
    modalRoleForm.result.then(result => result ? this.datatable?.refreshTable() : null);
  }

  edit(id: any) {
    let modalRoleForm = this._modal.open(ClientesFormComponent, {size: 'lg', keyboard: false, backdrop: "static", backdropClass: "backdrop-modal"})
    modalRoleForm.componentInstance.id = id;

    modalRoleForm.result.then(result => result ? this.datatable?.refreshTable() : null);
  }

}
