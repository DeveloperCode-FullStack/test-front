import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesIndexComponent } from './clientes-index/clientes-index.component';

const routes: Routes = [{path: "", component: ClientesIndexComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
