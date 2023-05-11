import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DatatableParameter } from '../interfaces/datatable-parameter';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private URL = environment.urlBackend;
  private httpHeaders : HttpHeaders;

  constructor(private _http: HttpClient) { 
    this.httpHeaders = new HttpHeaders();
    this.httpHeaders.append("Content-Type", "application/json");
  }

  getDatatable(parameter: string, data: string) {
    return this._http.get<any>(`${this.URL}${parameter}?${data}`, {headers: this.httpHeaders});
  }

  getAll(parameter: string) {
    return this._http.get<any>(`${this.URL}${parameter}`, {headers: this.httpHeaders})
  }

  getById(parameter: string, id: number) {
    return this._http.get<any>(`${this.URL}${parameter}/${id}`, {headers: this.httpHeaders})
  }

  save(parameter: string, id: number, data: any) {
    if (id && id != 0) {
      return this._http.put<any>(`${this.URL}${parameter}/${id}`, data, {headers: this.httpHeaders})
    } else {
      return this._http.post<any>(`${this.URL}${parameter}`, data, {headers: this.httpHeaders})
    }
  }

  delete(parameter: string, id: number) : Observable<any> {
    return this._http.delete(`${this.URL}${parameter}/${id}`, {headers: this.httpHeaders});
  }

}
