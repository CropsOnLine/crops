import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CombosService {
  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  getPredios() {
    return this._http.get(this.url + 'combos/CargarPredios');
  }

  getCultivos() {
    return this._http.get(this.url + 'combos/CargarCultivos');
  }

  getOperaciones() {
    return this._http.get(this.url + 'combos/CargarOperaciones');
  }

  getActividades() {
    return this._http.get(this.url + 'combos/CargarActividades');
  }




}
