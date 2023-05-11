import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path: "cuentas", loadChildren: () => import('./cuentas/cuentas.module').then(m => m.CuentasModule) },
  {path: "clientes", loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule) },
  {path: "movimientos", loadChildren: () => import('./movimientos/movimientos.module').then(m => m.MovimientosModule) },
  {path: "reportes", loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesSgsstRoutingModule { }
