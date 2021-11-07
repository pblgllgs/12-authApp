import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import  Swal  from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  public miFormulario :FormGroup = this.fb.group({
    email :['test4@test.com',[Validators.required,Validators.email]],
    password: ['123456',[Validators.required,Validators.minLength(6)]]
  });

  constructor(private fb:FormBuilder,
              private router:Router,
              private authService:AuthService) { }

  login(){
    console.log(this.miFormulario.value);
    const {email , password} = this.miFormulario.value;

    this.authService.login(email, password)
      .subscribe( ok =>{
        if(ok === true){
          this.router.navigateByUrl('/dashboard');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Acceso consedido!!',
            showConfirmButton: false,
            timer: 1000
          });
        }else{
          Swal.fire('Error',ok, 'error');
        }
      })
    //
  }



}
