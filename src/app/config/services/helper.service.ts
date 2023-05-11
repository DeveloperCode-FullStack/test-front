import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MESSAGE_TYPE } from '../consts/message.type';
import Swal from 'sweetalert2';
import { DatatableParameter } from '../interfaces/datatable-parameter';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(public toastService: ToastrService, private _router: Router) { }

  showAlert(type: string, message: string, title: string = "Mensaje del sistema") {
    switch (type){
      case MESSAGE_TYPE.SUCCESS:
        this.toastService.success(message, title);
        break;
      case MESSAGE_TYPE.WARNING:
        this.toastService.warning(message, title);
        break;
      case MESSAGE_TYPE.ERROR:
        this.toastService.error(message, title);
        break;
    }
  }

  discoveryErrors(controls: any) {
    
  }

  redirectApp(url: string) {
    this._router.navigateByUrl(url);
  }

  showMessageError(response: any) {
    if (response && response.status == 500) {
      this.showAlert(MESSAGE_TYPE.ERROR, response.error.message);
    } else {
      this.showAlert(MESSAGE_TYPE.ERROR, response.message);
    }
  }

  confirmDelete(callback: (result: boolean) => any) {
    Swal.fire({
      title: '¿Está seguro de realizar esta acción?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5c65df',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminelo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        callback(true);
      } else {
        callback(false);
      }
    })
  }

  convertToQueryParams(params: DatatableParameter) {
    let queryParams = '';
    Object.keys(params).forEach((key: string, index: number) => {
      const value = params[key];
      if (value !== undefined && value !== null && value.toString() != "") {
        queryParams += `${key}=${encodeURIComponent(value)}`;
        if (index !== Object.keys(params).length - 1) {
          queryParams += '&';
        }
      }
    });
    return queryParams;
  }


}



