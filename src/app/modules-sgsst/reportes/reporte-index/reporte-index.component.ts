import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { LANGUAGE_DATATABLE } from 'src/app/config/consts/datatable.language';
import { DatatableParameter } from 'src/app/config/interfaces/datatable-parameter';
import { BackendService } from 'src/app/config/services/backend.service';
import { HelperService } from 'src/app/config/services/helper.service';

@Component({
  selector: 'app-reporte-index',
  templateUrl: './reporte-index.component.html',
  styleUrls: ['./reporte-index.component.css']
})
export class ReporteIndexComponent implements OnInit {
  
  @Input() urlDatatable = '';
  @ViewChild(DataTableDirective) dtElement: DataTableDirective | undefined;
  public optionsDatatable: any = {};
  public dtTrigger: Subject<any> = new Subject();
  private _datatableParameter: DatatableParameter = {} as DatatableParameter;

  constructor(private _helperService: HelperService, private _backendService: BackendService) {
  }

  ngOnInit(): void {
    this.loadTable();
  }

  ngAfterViewInit() {
    this.dtTrigger.next(void 0);
  }
  
  refreshTable() {
    if(typeof this.dtElement!.dtInstance != 'undefined'){
      this.dtElement!.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
      });
    }
  }
  
  loadTable() {
    const that = this;
    this.optionsDatatable = {
      serverSide: true,
      processing: true,
      ordering: true,
      responsive: true,
      paging: true,
      searching: false,
      order: [0, 'asc'],
      ajax: (parameters: any, callback: any) => {
        this._datatableParameter.page = (parameters.start / parameters.length) ?? 0;
        this._datatableParameter.size =  parameters.length;
        this._datatableParameter.column_order = parameters.columns[parameters.order[0].column].data.toString();
        this._datatableParameter.column_direction = parameters.order[0].dir;
        this._datatableParameter.search = parameters.search.value


        this._backendService.getDatatable(this.urlDatatable, this._helperService.convertToQueryParams(this._datatableParameter)).subscribe(res => {
          callback({
            recordsTotal: res.data.totalElements,
            recordsFiltered: res.data.numberOfElements,
            draw: parameters.draw,
            data: res.data
          });
        }, error => {
          callback({
            recordsTotal: 0,
            recordsFiltered: 0,
            draw: parameters.draw,
            data: []
          });
          this._helperService.showMessageError(error);
        })
      },
      language: LANGUAGE_DATATABLE,
      columns: [
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
              return `Ahorro`;
            }
            return `Corriente`;
          }
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
          title: 'Saldo inicial',
          data: 'saldoInicial'
        },
        {
          title: 'Valor Transacción',
          data: 'valor'
        },
        {
          title: 'Nuevo Saldo',
          data: 'saldo'
        },
        {
          title: 'Fecha',
          data: 'fecha'
        },
      ],
    };
  }

}
