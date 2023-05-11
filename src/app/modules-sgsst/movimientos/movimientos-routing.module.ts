import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimientosIndexComponent } from './movimientos-index/movimientos-index.component';

const routes: Routes = [{path: "", component: MovimientosIndexComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
