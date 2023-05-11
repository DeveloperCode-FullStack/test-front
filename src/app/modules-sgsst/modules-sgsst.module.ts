import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesSgsstRoutingModule } from './modules-sgsst-routing.module';
import { ModuleContainerComponent } from './layout/module-container/module-container.component';
import { GeneralModule } from '../general/general.module';


@NgModule({
  declarations: [
    ModuleContainerComponent
  ],
  imports: [
    CommonModule,
    ModulesSgsstRoutingModule,
    GeneralModule
  ]
})
export class ModulesSgsstModule { }
