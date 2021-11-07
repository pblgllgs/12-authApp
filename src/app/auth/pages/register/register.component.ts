import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent{

  public miFormulario :FormGroup = this.fb.group({
    name :['toki',[Validators.required,Validators.minLength(4)]],
    email :['pbl.gllgs@gmail.com',[Validators.required,Validators.email]],
    password: ['123123',[Validators.required,Validators.minLength(6)]]
  });

  constructor(private fb:FormBuilder,
              private router:Router) { }


  register(){
    console.log(this.miFormulario.value);
    //console.log(this.miFormulario.valid);
    this.router.navigateByUrl('/dashboard');
  }


}
