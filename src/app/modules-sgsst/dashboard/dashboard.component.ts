import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/config/services/helper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _helperService: HelperService) { }

  ngOnInit(): void {
  }

  onClickSecurityModule() {
    this._helperService.redirectApp('/security');
  }

  onClickSelectionEntry() {
    this._helperService.redirectApp('/selection-entry');
  }

}
