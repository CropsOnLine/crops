import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CultivoService {
  public url: string;
  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }


  getCultivosUsuario(idUsu: string): Observable<any> {   
    
    return this._http.get(this.url + 'Cultivo/CargarCultivoByUsu?IdUsu='+idUsu);   


    //return this._http.get('https://localhost:44301/api/cultivo/CargarCultivoByUsu?IdUsu=' + idUsu.toString());
  }




}
