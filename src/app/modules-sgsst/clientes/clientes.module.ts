import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesIndexComponent } from './clientes-index/clientes-index.component';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { GeneralModule } from 'src/app/general/general.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ClientesIndexComponent,
    ClientesFormComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    GeneralModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    NgSelectModule
  ]
})
export class ClientesModule { }
