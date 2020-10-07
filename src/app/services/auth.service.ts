import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

public usuario: string;

  private URL = 'http://localhost/srvAuth/api/entry'
  constructor(
    private http: HttpClient,
    private router:Router
  ) { }

  signUp(user) {

    return this.http.post<any>(this.URL + '/Login', user);
  }


  loggenIn(): Boolean {
    return !!localStorage.getItem('token')  //si el token existe retorna true si no retorna false
  }

getToke(){
  return localStorage.getItem('token');
}

logOut(){
  localStorage.removeItem('token');
  localStorage.removeItem('usu');
  localStorage.removeItem('idUsuario');
  
  
  this.router.navigate(['/home']);

}
getUser(){
  return localStorage.getItem('usu');
}




}
