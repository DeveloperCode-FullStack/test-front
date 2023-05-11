import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteComponent } from './reporte/reporte.component';
import { GeneralModule } from 'src/app/general/general.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { ReporteIndexComponent } from './reporte-index/reporte-index.component';


@NgModule({
  declarations: [
    ReporteComponent,
    ReporteIndexComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    GeneralModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    NgSelectModule,
    DataTablesModule
  ]
})
export class ReportesModule { }
