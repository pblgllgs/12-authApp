import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { catchError, map, tap } from "rxjs/operators";
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario!: Usuario;
  private baseUrl = environment.baseUrl;

  get usuario(){
    return {...this._usuario};
  }

  constructor(private http:HttpClient) { }

  login(email:string, password:string){

    const url = `${this.baseUrl}/auth`;

    const body = {email, password};

    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap(resp =>{
          if(resp.ok){
            localStorage.setItem('token',resp.token!);
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!
            }
          }
        }),
        map( valid => valid.ok),
        catchError(err => of(err.error.msg))
      );
  }


  validarToken():Observable<boolean>{
    const url = `${this.baseUrl}/auth/renew`;
    const headers =  new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url,{headers})
      .pipe(
        map( resp => {
          localStorage.setItem('token',resp.token!);
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!
            }
          return resp.ok;
        }),
        catchError(err => of(false))
        );
  }

}
