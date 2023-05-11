import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-buttonbar',
  templateUrl: './buttonbar.component.html',
  styleUrls: ['./buttonbar.component.css']
})
export class ButtonbarComponent implements OnInit {

  @ViewChild('botonesDropdown') botonesDropdown: ElementRef | undefined;
  @ViewChild('botonesNormal') botonesNormal: ElementRef | undefined;

  @Input() dropdown: Boolean = false;
  @Input() botones: String[] = [];
  @Output() eventSave = new EventEmitter<any>();
  @Output() eventEdit = new EventEmitter<any>();
  @Output() eventDelete = new EventEmitter<any>();
  @Output() eventCancel = new EventEmitter<any>();
  @Output() eventNew = new EventEmitter<any>();
  @Output() eventClean = new EventEmitter<any>();
  @Output() eventSearch = new EventEmitter<any>();
  @Output() eventExport = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  validateIfExists(boton: string) : Boolean {
    if (this.botones.find(i => i == boton)) {
      return true
    }

    return false;
  }

}
