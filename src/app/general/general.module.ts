import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { ButtonbarComponent } from './buttonbar/buttonbar.component';
import { DataTablesModule } from 'angular-datatables';
import { ValidationComponent } from './validation/validation.component';



@NgModule({
  declarations: [
    FooterComponent,
    TopbarComponent,
    SidebarComponent,
    HeaderComponent,
    TableComponent,
    ButtonbarComponent,
    ValidationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DataTablesModule,
    HttpClientModule
  ],
  exports: [
    FooterComponent,
    TopbarComponent,
    SidebarComponent,
    HeaderComponent,
    TableComponent,
    ButtonbarComponent,
    ValidationComponent
  ]
})
export class GeneralModule { }
