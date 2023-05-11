import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentasRoutingModule } from './cuentas-routing.module';
import { CuentasIndexComponent } from './cuentas-index/cuentas-index.component';
import { CuentasFormComponent } from './cuentas-form/cuentas-form.component';
import { GeneralModule } from 'src/app/general/general.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    CuentasIndexComponent,
    CuentasFormComponent
  ],
  imports: [
    CommonModule,
    CuentasRoutingModule,
    GeneralModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    NgSelectModule
  ]
})
export class CuentasModule { }
