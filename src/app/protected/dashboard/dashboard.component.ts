import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      *{
        margin: 15px;
      }
    `
  ]
})
export class DashboardComponent {

  get usuario(){
    return this.authService.usuario;
  }

  constructor(private router:Router,
              private authService:AuthService) { }

  logout(){
    Swal.fire({
    title: 'Seguro que deseas salir?',
    text: "Cerrar sesión!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Deseo salir!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Sesión cerrada!',
        'Has cerrado sesión.',
        'success'
      );
      this.router.navigateByUrl('/auth/login');
      this.authService.logout();
    }
  })
    

  }


}
