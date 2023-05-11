import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentasIndexComponent } from './cuentas-index/cuentas-index.component';

const routes: Routes = [{path: "", component: CuentasIndexComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentasRoutingModule { }
