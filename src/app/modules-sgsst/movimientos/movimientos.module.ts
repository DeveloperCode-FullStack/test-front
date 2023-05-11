import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientosRoutingModule } from './movimientos-routing.module';
import { MovimientosIndexComponent } from './movimientos-index/movimientos-index.component';
import { MovimientosFormComponent } from './movimientos-form/movimientos-form.component';
import { GeneralModule } from 'src/app/general/general.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    MovimientosIndexComponent,
    MovimientosFormComponent
  ],
  imports: [
    CommonModule,
    MovimientosRoutingModule,
    GeneralModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    NgSelectModule
  ]
})
export class MovimientosModule { }
