import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ButtonbarComponent } from '../buttonbar/buttonbar.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatableParameter } from 'src/app/config/interfaces/datatable-parameter';
import { HelperService } from 'src/app/config/services/helper.service';
import { BackendService } from 'src/app/config/services/backend.service';
import { LANGUAGE_DATATABLE } from 'src/app/config/consts/datatable.language';
import { MESSAGE_TYPE } from 'src/app/config/consts/message.type';
import { MESSAGES } from 'src/app/config/consts/messages';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild('botonesDatatable') buttonsDatatable: ButtonbarComponent | undefined;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective | undefined;
  public optionsDatatable: any = {};
  public dtTrigger: Subject<any> = new Subject();

  @Input() arrayButtonsDatatable: string[] = [];
  @Input() columns: any[] = [];
  @Input() hasActions: boolean = true;
  @Input() urlDatatable: string = '';
  @Output() eventDataExport = new EventEmitter<DatatableParameter>();
  @Output() eventEdit = new EventEmitter<string>();

  private _datatableParameter: DatatableParameter = {} as DatatableParameter;

  constructor(private _helperService: HelperService, private _backendService: BackendService) { 
  }

  ngOnInit(): void {

    if (this.hasActions) {
      this.columns.push({
        title: "Acciones",
        orderable: false,
        width: '5%',
        data: "id",
        render: (id: any) => {
          const boton = this.buttonsDatatable!;
          return boton.botonesDropdown!.nativeElement.outerHTML.split('$id').join(id);
        },
        className: "pl-1 pr-0 text-center",
        responsivePriority: 1
      })
    }

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

        this.eventDataExport.emit(this._datatableParameter);

        this._backendService.getDatatable(`${this.urlDatatable}/datatable`, this._helperService.convertToQueryParams(this._datatableParameter)).subscribe(res => {
          callback({
            recordsTotal: res.data.totalElements,
            recordsFiltered: res.data.numberOfElements,
            draw: parameters.draw,
            data: res.data.content
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
      columns: that.columns,
      drawCallback: (settings: any) => {
        $('.btn-dropdown-eliminar').off().on('click', (event) => {
          this.openConfirmationModal(event.target.dataset['id']);
        });
        $('.btn-dropdown-modificar').off().on('click', (event) => {
          this.eventEdit.emit(event.target.dataset['id'])
        });
      }
    };
  }

  openConfirmationModal(id: any) {
    this._helperService.confirmDelete(res => {
      if (res) {
        this._backendService.delete(this.urlDatatable, id).subscribe({
          next: _ => {
            this._helperService.showAlert(MESSAGE_TYPE.SUCCESS, MESSAGES.DELETED);
            this.refreshTable();
          },
          error: e => this._helperService.showMessageError(e)
        });
      }
    });
  }

}
