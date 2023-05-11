import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public idMenuTemporal: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  removeClass(elem: HTMLElement, cls: string) {
    var str = " " + elem.className + " ";
    elem.className = str.replace(" " + cls + " ", " ").replace(/^\s+|\s+$/g, "");
  }

  closeMenu(id: string){
    if(this.idMenuTemporal != id){
      let element = document.getElementById(this.idMenuTemporal);
      if(element) {
        this.removeClass(element, "menu-is-opening menu-open");
        if(this.idMenuTemporal != 'panel'){
          document.getElementById(this.idMenuTemporal + '-menu')?.style.setProperty("display", "nonde");
        }
      }
    }

    this.idMenuTemporal = id
  }

}
