import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { Router } from '@angular/router';


import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    login: 'rariverar@gmail.com.co',
    password: 'rariverar@gmail.com.co'
  }


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signUp() {

    this.authService.signUp(this.user)
      .subscribe(
        response => {
          let data = JSON.parse(JSON.stringify(response));

          if (!data.esExito || data.esError) {
            if (!data.esExito && data.esError) {
              let resp = data.errorMensaje;
              console.log(data.errorMensaje);
              swal('Autenticacion', data.errorMensaje, 'error'); 
            }
            else {
              let resp = data.mensajes;
              console.log(resp[0]);
              swal('Autenticacion', resp[0], 'error');
            }
          }else {
            let resp = data.respuesta;
            console.log(resp.token);
            //console.log(resp.nombres + ' '+ resp.apellidos);            
            localStorage.setItem('token', resp.token);
            //console.log(localStorage.getItem('usu'));

            this.router.navigate(['/home']);
          }



        },
        error => {
          console.log(error)
        }
      )
     
  }


}
