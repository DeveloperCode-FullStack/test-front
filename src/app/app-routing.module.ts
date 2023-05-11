import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleContainerComponent } from './modules-sgsst/layout/module-container/module-container.component';
import { MODULE_LAYOUT } from './modules-sgsst/layout/routes/modules-sgsst-routing';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '', component: ModuleContainerComponent, children: MODULE_LAYOUT},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
